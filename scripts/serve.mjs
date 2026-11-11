import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { resolvePathRedirect } from './redirects.mjs';
import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';
import { resolveLocaleRoutingRedirect } from '../src/config/locale-routing.mjs';

import { SITE_DOMAIN as CANONICAL_HOST } from '../src/config/site-url.mjs';
const distDir = path.resolve('dist');
const port = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

const COMPRESSIBLE = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.svg',
  '.xml',
  '.txt',
  '.webmanifest',
]);

if (!fs.existsSync(distDir)) {
  console.error('Missing dist/ folder. Run npm run build before starting the server.');
  process.exit(1);
}

function getRequestHost(req) {
  const raw = req.headers['x-forwarded-host'] ?? req.headers.host ?? '';
  return raw.split(',')[0].trim().split(':')[0].toLowerCase();
}

function getCanonicalRedirect(req) {
  const host = getRequestHost(req);
  const isCanonicalCluster = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;
  if (!isCanonicalCluster) {
    return null;
  }

  const forwardedProto = (req.headers['x-forwarded-proto'] ?? '').split(',')[0].trim().toLowerCase();
  const needsHttps =
    forwardedProto === 'http' || (forwardedProto !== 'https' && !req.socket?.encrypted);
  const needsWwwStrip = host === `www.${CANONICAL_HOST}`;

  if (needsWwwStrip || needsHttps) {
    return `https://${CANONICAL_HOST}${req.url ?? '/'}`;
  }

  return null;
}

function splitUrl(url) {
  const [pathPart, hash = ''] = (url ?? '/').split('#');
  const [pathname, search = ''] = pathPart.split('?');
  const query = search ? `?${search}` : '';
  const fragment = hash ? `#${hash}` : '';
  return { pathname: pathname || '/', query, fragment };
}

function resolveFile(pathname) {
  let normalized = decodeURIComponent(pathname);
  if (normalized.endsWith('/')) normalized += 'index.html';
  if (!path.extname(normalized)) normalized += '.html';

  const filePath = path.normalize(path.join(distDir, normalized));
  if (!filePath.startsWith(distDir)) return null;
  return filePath;
}

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath);

  if (/_\w{6,}\./.test(basename) || basename.startsWith('_astro/')) {
    return 'public, max-age=31536000, immutable';
  }

  if (['.webp', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff2'].includes(ext)) {
    return 'public, max-age=31536000, immutable';
  }

  if (['.js', '.css'].includes(ext)) {
    return 'public, max-age=31536000, immutable';
  }

  if (ext === '.html') {
    return 'public, max-age=3600, must-revalidate';
  }

  if (ext === '.webmanifest' || ext === '.xml') {
    return 'public, max-age=86400';
  }

  return 'public, max-age=86400';
}

function pickEncoding(acceptEncoding = '') {
  const ae = acceptEncoding.toLowerCase();
  if (ae.includes('br')) return 'br';
  if (ae.includes('gzip')) return 'gzip';
  return null;
}

/** Precompressed bodies so the first byte is not waiting on the compressor. */
const compressed = new Map();

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

function storeCompressed(filePath, raw, mtimeMs) {
  compressed.set(filePath, {
    mtimeMs,
    raw,
    br: zlib.brotliCompressSync(raw, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 },
    }),
    gzip: zlib.gzipSync(raw, { level: 6 }),
  });
  return compressed.get(filePath);
}

function warmCompressed() {
  const files = walkFiles(distDir).filter((filePath) =>
    COMPRESSIBLE.has(path.extname(filePath).toLowerCase()),
  );
  for (const filePath of files) {
    const stat = fs.statSync(filePath);
    storeCompressed(filePath, fs.readFileSync(filePath), stat.mtimeMs);
  }
  return files.length;
}

function getCompressed(filePath) {
  const stat = fs.statSync(filePath);
  const hit = compressed.get(filePath);
  if (hit && hit.mtimeMs === stat.mtimeMs) return hit;
  return storeCompressed(filePath, fs.readFileSync(filePath), stat.mtimeMs);
}

function sendFile(req, res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': MIME[ext] ?? 'application/octet-stream',
    'Cache-Control': getCacheControl(filePath),
    Vary: 'Accept-Encoding',
  };

  if (!COMPRESSIBLE.has(ext)) {
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (res.headersSent) return;
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    });
    res.writeHead(statusCode, headers);
    stream.pipe(res);
    return;
  }

  let body;
  try {
    body = getCompressed(filePath);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const encoding = pickEncoding(req.headers['accept-encoding'] ?? '');
  let payload = body.raw;
  if (encoding === 'br' && body.br) {
    headers['Content-Encoding'] = 'br';
    payload = body.br;
  } else if (encoding === 'gzip' && body.gzip) {
    headers['Content-Encoding'] = 'gzip';
    payload = body.gzip;
  }

  headers['Content-Length'] = payload.length;
  res.writeHead(statusCode, headers);
  res.end(payload);
}

const server = http.createServer((req, res) => {
  const canonicalRedirect = getCanonicalRedirect(req);
  if (canonicalRedirect) {
    res.writeHead(301, { Location: canonicalRedirect });
    res.end();
    return;
  }

  const { pathname, query, fragment } = splitUrl(req.url);
  const checkoutRedirect = resolveCheckoutPathRedirect(pathname);
  if (checkoutRedirect) {
    const location =
      query && checkoutRedirect.includes('?')
        ? `${checkoutRedirect}${query.replace('?', '&')}`
        : `${checkoutRedirect}${query}`;
    res.writeHead(302, {
      Location: location,
      'X-Robots-Tag': 'noindex, nofollow',
    });
    res.end();
    return;
  }

  const pathRedirect = resolvePathRedirect(pathname);
  if (pathRedirect && pathRedirect !== pathname) {
    res.writeHead(301, { Location: `${pathRedirect}${query}${fragment}` });
    res.end();
    return;
  }

  const cleanPagePath = pathname.endsWith('/index.html')
    ? pathname.slice(0, -'index.html'.length)
    : !path.extname(pathname) && pathname !== pathname.toLowerCase()
      ? `${pathname.toLowerCase().replace(/\/?$/, '/')}`
      : null;
  if (cleanPagePath) {
    res.writeHead(301, { Location: `${cleanPagePath}${query}${fragment}` });
    res.end();
    return;
  }

  const localeRoute = resolveLocaleRoutingRedirect(pathname);
  if (localeRoute?.status === 301) {
    res.writeHead(301, { Location: `${localeRoute.location}${query}${fragment}` });
    res.end();
    return;
  }
  if (localeRoute?.status === 404) {
    const fallback = path.join(distDir, '404.html');
    if (fs.existsSync(fallback)) {
      sendFile(req, res, fallback, 404);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const filePath = resolveFile(pathname);
  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(req, res, filePath);
    return;
  }

  const fallback = path.join(distDir, '404.html');
  if (fs.existsSync(fallback)) {
    sendFile(req, res, fallback, 404);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

const warmed = warmCompressed();

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving ${distDir} on http://0.0.0.0:${port} (${warmed} files precompressed)`);
});

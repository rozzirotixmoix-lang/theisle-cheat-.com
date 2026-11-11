import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'dist');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function stripDomain(title) {
  return title
    .replace(/\s*[|–—:\-]\s*theisle-cheat\.com\s*$/i, '')
    .replace(/\s+on\s+theisle-cheat\.com\s*$/i, '')
  .trim();
}

const files = walk(root);
const titleH1 = [];
const missingCanonical = [];
const missingHreflang = [];
const h1Missing = [];
const titleNoKeyword = [];

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f).replace(/\\/g, '/');
  if (rel.includes('404') || rel.includes('/go/')) continue;

  const title = h.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
  const h1m = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const canon = h.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const hreflangCount = (h.match(/rel="alternate" hreflang/g) || []).length;

  if (!canon) missingCanonical.push(rel);
  if (hreflangCount < 4) missingHreflang.push({ rel, hreflangCount });
  if (!h1) h1Missing.push(rel);

  const tBase = stripDomain(title).toLowerCase().replace(/\s+/g, ' ');
  const hBase = h1.toLowerCase().replace(/\s+/g, ' ');
  if (h1 && tBase !== hBase && !tBase.startsWith(hBase) && !hBase.startsWith(tBase)) {
    titleH1.push({ rel, title: stripDomain(title).slice(0, 80), h1: h1.slice(0, 80) });
  }

  if (/forum|faq|support|product|blog/.test(rel) && !/cheat|isle|esp|hwid|faq|forum|support|product/i.test(title)) {
    titleNoKeyword.push({ rel, title });
  }
}

console.log(
  JSON.stringify(
    {
      pages: files.length,
      titleH1Mismatches: titleH1.length,
      titleH1Samples: titleH1.slice(0, 20),
      missingCanonical: missingCanonical.length,
      missingHreflang: missingHreflang.slice(0, 10),
      h1Missing: h1Missing.slice(0, 10),
    },
    null,
    2,
  ),
);

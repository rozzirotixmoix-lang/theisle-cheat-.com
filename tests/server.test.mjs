import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { resolveLocaleRoutingRedirect } from '../src/config/locale-routing.mjs';

test('English redirects match complete locale segments', () => {
  for (const pathname of ['/english/', '/enough/', '/engine/']) {
    assert.equal(resolveLocaleRoutingRedirect(pathname), null);
  }
  assert.deepEqual(resolveLocaleRoutingRedirect('/en/'), { status: 301, location: '/' });
  assert.deepEqual(resolveLocaleRoutingRedirect('/en/en/about/'), { status: 301, location: '/about/' });
  assert.deepEqual(resolveLocaleRoutingRedirect('/es/fr/about/'), { status: 404 });
});

test('server rejects invalid URLs and keeps serving subsequent requests', { timeout: 20000 }, async () => {
  const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'isle-server-test-'));
  let child;
  try {
    await fs.mkdir(path.join(fixture, 'dist'));
    await fs.writeFile(path.join(fixture, 'dist', 'index.html'), '<h1>Test home</h1>');
    await fs.writeFile(path.join(fixture, 'dist', '404.html'), '<h1>Not found</h1>');
    await fs.mkdir(path.join(fixture, 'dist-private'));
    await fs.writeFile(path.join(fixture, 'dist-private', 'secret.txt'), 'private');

    const probe = net.createServer();
    probe.listen(0, '127.0.0.1');
    await once(probe, 'listening');
    const { port } = probe.address();
    await new Promise((resolve) => probe.close(resolve));
    child = spawn(process.execPath, [fileURLToPath(new URL('../scripts/serve.mjs', import.meta.url))], {
      cwd: fixture,
      env: { ...process.env, PORT: String(port) },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let errors = '';
    child.stderr.on('data', (data) => { errors += data; });
    await Promise.race([
      once(child.stdout, 'data'),
      once(child, 'exit').then(() => { throw new Error(`Server exited: ${errors}`); }),
    ]);

    const request = (pathname) => new Promise((resolve, reject) => {
      const req = http.get({ host: '127.0.0.1', port, path: pathname }, (res) => {
        let body = '';
        res.on('data', (data) => { body += data; });
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      });
      req.on('error', reject);
      req.setTimeout(3000, () => req.destroy(new Error('Request timed out')));
    });

    for (const pathname of ['/%zz/', '/%ZZ', '/%e0%a4/', '/%']) {
      assert.equal((await request(pathname)).status, 400, pathname);
      assert.equal((await request('/')).status, 200);
    }
    for (const pathname of ['/english/', '/enough/', '/..%2fdist-private%2fsecret.txt']) {
      assert.equal((await request(pathname)).status, 404, pathname);
    }
    const redirect = await request('/en/about/?source=test');
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.location, '/about/?source=test');
    const checkout = await request('/go/the-isle/?plan=monthly');
    assert.equal(checkout.status, 302);
    assert.equal(new URL(checkout.headers.location).searchParams.get('plan'), 'monthly');
    assert.equal(checkout.headers['x-robots-tag'], 'noindex, nofollow');
  } finally {
    if (child && child.exitCode === null) {
      const stopped = once(child, 'exit');
      child.kill();
      await stopped;
    }
    const relative = path.relative(os.tmpdir(), fixture);
    assert.ok(relative.startsWith('isle-server-test-') && !relative.includes(path.sep));
    await fs.rm(fixture, { recursive: true, force: true });
  }
});

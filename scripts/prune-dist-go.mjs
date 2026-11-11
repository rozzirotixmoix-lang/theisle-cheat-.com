import fs from 'node:fs';
import path from 'node:path';

/** Checkout URLs are 302-only; static HTML confuses crawlers if it leaks into dist. */
const goDir = path.join(process.cwd(), 'dist', 'go');
if (!fs.existsSync(goDir)) {
  console.log('prune-dist-go: no dist/go (ok)');
  process.exit(0);
}
fs.rmSync(goDir, { recursive: true, force: true });
console.log('prune-dist-go: removed dist/go');

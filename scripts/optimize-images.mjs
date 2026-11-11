import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
/** Widths each directory's pages request (see `src/utils/responsiveImage.ts`). */
const dirs = [
  { dir: 'public/images/gameplay', widths: [400, 512, 640, 960] },
  { dir: 'public/images/hwid-spoofer', widths: [400, 640, 960] },
];
const brandWidths = [32, 64, 128, 512];

const logoResize = (size) =>
  sharp(path.join(root, 'public/images/brand/the-isle-cheats-logo.webp')).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

async function optimizeBrandLogo() {
  const master = path.join(root, 'public/images/brand/the-isle-cheats-logo.webp');
  if (!fs.existsSync(master)) return;

  for (const width of brandWidths) {
    const output = path.join(root, 'public/images/brand', `the-isle-cheats-logo-${width}.webp`);
    await logoResize(width).webp({ quality: 85, effort: 4 }).toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }
}

/** PNG-embedded ICO (16 + 32) for `public/favicon.ico`. */
function buildMultiPngIco(entries) {
  const count = entries.length;
  const headerSize = 6 + 16 * count;
  let bodySize = 0;
  for (const { buffer } of entries) bodySize += buffer.length;
  const out = Buffer.alloc(headerSize + bodySize);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);
  let offset = headerSize;
  entries.forEach(({ size, buffer }, index) => {
    const dirAt = 6 + index * 16;
    out[dirAt] = size >= 256 ? 0 : size;
    out[dirAt + 1] = size >= 256 ? 0 : size;
    out[dirAt + 2] = 0;
    out[dirAt + 3] = 0;
    out.writeUInt16LE(1, dirAt + 4);
    out.writeUInt16LE(32, dirAt + 6);
    out.writeUInt32LE(buffer.length, dirAt + 8);
    out.writeUInt32LE(offset, dirAt + 12);
    buffer.copy(out, offset);
    offset += buffer.length;
  });
  return out;
}

async function generateFavicons() {
  const master = path.join(root, 'public/images/brand/the-isle-cheats-logo.webp');
  if (!fs.existsSync(master)) return;

  const publicDir = path.join(root, 'public');
  await logoResize(16).png().toFile(path.join(publicDir, 'favicon-16.png'));
  await logoResize(32).png().toFile(path.join(publicDir, 'favicon-32.png'));
  await logoResize(180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  const buf16 = await logoResize(16).png().toBuffer();
  const buf32 = await logoResize(32).png().toBuffer();
  fs.writeFileSync(
    path.join(publicDir, 'favicon.ico'),
    buildMultiPngIco([
      { size: 16, buffer: buf16 },
      { size: 32, buffer: buf32 },
    ]),
  );

  console.log('Wrote public/favicon-16.png');
  console.log('Wrote public/favicon-32.png');
  console.log('Wrote public/apple-touch-icon.png');
  console.log('Wrote public/favicon.ico');
}

async function optimizeDir(relativeDir, widths) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((file) => {
    if (/-\d+\.webp$/i.test(file)) return false;
    return /\.png$/i.test(file) || /\.webp$/i.test(file);
  });

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|webp)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const { dir, widths } of dirs) {
  await optimizeDir(dir, widths);
}

await optimizeBrandLogo();
await generateFavicons();

console.log('Image optimization complete.');

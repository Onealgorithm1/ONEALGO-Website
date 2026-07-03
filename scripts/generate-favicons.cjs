/**
 * Regenerate every favicon / app icon from the master logo.
 * Source of truth: public/globe-logo.png (512x512, transparent).
 *
 * Run:  node scripts/generate-favicons.cjs
 *
 * Produces:
 *  - Browser icons (transparent):   favicon-16/32/96, android-icon-192, ms-icon-144, icon-192, icon-512
 *  - Apple touch icons (white bg):  apple-icon-57..180, apple-touch-icon
 *  - Maskable PWA icons (white bg + safe-zone padding): icon-192-maskable, icon-512-maskable
 *  - favicon.ico (multi-size 16/32/48)
 *  - favicon.svg (embeds the real logo so SVG-favicon browsers show the globe)
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUB = path.join(__dirname, "..", "public");
const SRC = path.join(PUB, "globe-logo.png");
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const transparentIcons = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["favicon-96x96.png", 96],
  ["android-icon-192x192.png", 192],
  ["ms-icon-144x144.png", 144],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];

const appleIcons = [
  ["apple-icon-57x57.png", 57],
  ["apple-icon-60x60.png", 60],
  ["apple-icon-72x72.png", 72],
  ["apple-icon-76x76.png", 76],
  ["apple-icon-114x114.png", 114],
  ["apple-icon-120x120.png", 120],
  ["apple-icon-144x144.png", 144],
  ["apple-icon-152x152.png", 152],
  ["apple-icon-180x180.png", 180],
  ["apple-touch-icon.png", 180],
];

const maskableIcons = [
  ["icon-192-maskable.png", 192],
  ["icon-512-maskable.png", 512],
];

async function makeTransparent(name, size) {
  await sharp(SRC)
    .resize(size, size, { fit: "contain", background: TRANSPARENT, kernel: "lanczos3" })
    .png()
    .toFile(path.join(PUB, name));
}

async function makeApple(name, size) {
  await sharp(SRC)
    .resize(size, size, { fit: "contain", background: WHITE, kernel: "lanczos3" })
    .flatten({ background: WHITE }) // iOS shows transparency as black — force white
    .png()
    .toFile(path.join(PUB, name));
}

async function makeMaskable(name, size) {
  const inner = Math.round(size * 0.78); // ~11% safe-zone padding each side
  const logo = await sharp(SRC)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT, kernel: "lanczos3" })
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, name));
}

function buildIco(entries /* [{size, buf}] */) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const bodies = [];
  entries.forEach((e, i) => {
    const o = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 0); // width
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1); // height
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // color planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(e.buf.length, o + 8); // size of PNG data
    dir.writeUInt32LE(offset, o + 12); // offset
    offset += e.buf.length;
    bodies.push(e.buf);
  });
  return Buffer.concat([header, dir, ...bodies]);
}

async function main() {
  if (!fs.existsSync(SRC)) throw new Error("Missing source: " + SRC);

  for (const [name, size] of transparentIcons) await makeTransparent(name, size);
  for (const [name, size] of appleIcons) await makeApple(name, size);
  for (const [name, size] of maskableIcons) await makeMaskable(name, size);

  // Multi-size .ico from transparent PNGs
  const icoEntries = [];
  for (const size of [16, 32, 48]) {
    const buf = await sharp(SRC)
      .resize(size, size, { fit: "contain", background: TRANSPARENT, kernel: "lanczos3" })
      .png()
      .toBuffer();
    icoEntries.push({ size, buf });
  }
  fs.writeFileSync(path.join(PUB, "favicon.ico"), buildIco(icoEntries));

  // SVG favicon that renders the real logo (embeds a crisp 256px PNG)
  const png256 = await sharp(SRC)
    .resize(256, 256, { fit: "contain", background: TRANSPARENT, kernel: "lanczos3" })
    .png()
    .toBuffer();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">\n` +
    `  <title>OneAlgorithm</title>\n` +
    `  <image width="512" height="512" href="data:image/png;base64,${png256.toString("base64")}"/>\n` +
    `</svg>\n`;
  fs.writeFileSync(path.join(PUB, "favicon.svg"), svg);

  const total =
    transparentIcons.length + appleIcons.length + maskableIcons.length + 2;
  console.log(`Generated ${total} icon files from globe-logo.png (incl. favicon.ico + favicon.svg).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

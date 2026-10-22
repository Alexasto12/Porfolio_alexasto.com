/* Builds public/photos/alejandro-cabrera.jpg from the original photo: removes
   the thin cable on the wall above the head (background only), crops to 4:5
   and maps the greys onto the site's own ink and paper (a duotone, so the
   photo reads as printed on the page). Metadata is not copied.
   The original is not in the repository; pass its path.
   Usage: node scripts/portrait.mjs <original.jpg> */
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "photos", "alejandro-cabrera.jpg");
const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/portrait.mjs <original.jpg>");
  process.exit(1);
}

/* Palette (CLAUDE.md): black goes to ink, white to paper. */
const INK = [0x14, 0x13, 0x0e];
const PAPER = [0xf4, 0xef, 0xe2];
/* Measured on the 2000×2000 original. */
const CABLE = { x0: 999, x1: 1016, y1: 152 };
const CROP = { left: 300, top: 75, width: 1400, height: 1750 };
const SIZE = { width: 1200, height: 1500 };

const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const C = info.channels;
if (W !== 2000 || info.height !== 2000) throw new Error(`expected the 2000×2000 original, got ${W}×${info.height}`);

// The cable: each row between x0 and x1 becomes a blend of the wall on either side.
for (let y = 0; y <= CABLE.y1; y++) {
  for (let x = CABLE.x0 + 1; x < CABLE.x1; x++) {
    const t = (x - CABLE.x0) / (CABLE.x1 - CABLE.x0);
    for (let c = 0; c < C; c++) {
      const a = data[(y * W + CABLE.x0) * C + c];
      const b = data[(y * W + CABLE.x1) * C + c];
      data[(y * W + x) * C + c] = Math.round(a + (b - a) * t);
    }
  }
}

const grey = await sharp(data, { raw: { width: W, height: info.height, channels: C } })
  .extract(CROP)
  .resize(SIZE.width, SIZE.height)
  .normalise({ lower: 1, upper: 99 })
  .grayscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const rgb = Buffer.alloc(SIZE.width * SIZE.height * 3);
for (let i = 0; i < grey.data.length; i++) {
  const t = grey.data[i] / 255;
  for (let c = 0; c < 3; c++) rgb[i * 3 + c] = Math.round(INK[c] + (PAPER[c] - INK[c]) * t);
}

mkdirSync(join(ROOT, "public", "photos"), { recursive: true });
const out = await sharp(rgb, { raw: { width: SIZE.width, height: SIZE.height, channels: 3 } })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);
console.log(`✓ ${OUT} ${out.width}×${out.height} ${(out.size / 1024).toFixed(0)} KB`);

/**
 * Image pipeline for the live-site windows on /services/website-development and the two local pages
 * (design-contract-webdev.md §1.8, §2 "images", §5). Runs after scripts/work-shots.mjs; reads the full-page
 * capture of every site in client/data/work.ts and writes, per slug, under public/work/:
 *
 *   {slug}-card.avif    + .webp   1280x800   the first screen (rest state of a window)        AVIF <= 60 KB
 *   {slug}-screen2.avif + .webp   1280x800   the second screen, cut from y = 800 CSS px        AVIF <= 45 KB
 *   {slug}-tall.avif    + .webp   1280x1600  screens 1+2 in one image (the desktop hover scroll) AVIF <= 90 KB
 *
 *     node scripts/work-second-screen.mjs            # all six
 *     node scripts/work-second-screen.mjs gorband    # one slug
 *
 * THIS IS THE RUNNABLE CHECK FOR THE IMAGE BUDGET: every output is asserted against its byte budget and the
 * script exits 1 the moment one cannot be met, so an over-budget capture never reaches the page by accident.
 * The quality loop steps down until the file fits; a site whose capture will not fit at q=28 is a problem to
 * look at (a photo-heavy first screen), not one to hide with a bigger budget.
 *
 * Source: {slug}-full.webp is captured at DPR 2 (2560 px wide), so 800 CSS px of page = 1600 source rows.
 * ponytail: the WebP fallback ceiling is 1.5x the AVIF budget. The contract budgets the AVIF (what every
 * current browser fetches); the WebP exists for the Safari 15 / old-Android tail and is asserted so it cannot
 * silently become a 400 KB file either.
 */
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "work");
const DPR = 2;
const W = 1280, H = 800;
const CROPS = [
  { name: "card", top: 0, rows: 1, avif: 60_000 },
  { name: "screen2", top: 1, rows: 1, avif: 45_000 },
  { name: "tall", top: 0, rows: 2, avif: 90_000 },
];

const workSrc = readFileSync(join(ROOT, "client", "data", "work.ts"), "utf8");
const slugs = [...workSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const only = process.argv[2];
const todo = slugs.filter((s) => !only || s === only);
assert.ok(todo.length, `no slug matches "${only}" in client/data/work.ts`);

/** Encode `img` as `fmt`, lowering quality until the file fits `budget`. Returns the buffer and the quality used. */
async function fit(img, fmt, budget) {
  for (let q = 62; q >= 28; q -= 4) {
    const buf = fmt === "avif"
      ? await img.clone().avif({ quality: q, effort: 6, chromaSubsampling: "4:2:0" }).toBuffer()
      : await img.clone().webp({ quality: q, effort: 6 }).toBuffer();
    if (buf.length <= budget) return { buf, q };
  }
  return null;
}

let total = 0;
for (const slug of todo) {
  const src = join(OUT, `${slug}-full.webp`);
  const meta = await sharp(src).metadata();
  assert.equal(meta.width, W * DPR, `${slug}-full.webp is ${meta.width}px wide, expected ${W * DPR} (DPR ${DPR} capture)`);
  for (const c of CROPS) {
    const height = H * DPR * c.rows, top = H * DPR * c.top;
    assert.ok(meta.height >= top + height, `${slug}-full.webp is only ${meta.height}px tall; ${c.name} needs ${top + height}`);
    const img = sharp(src).extract({ left: 0, top, width: W * DPR, height }).resize(W, H * c.rows, { kernel: "lanczos3" });
    for (const [fmt, budget] of [["avif", c.avif], ["webp", Math.round(c.avif * 1.5)]]) {
      const r = await fit(img, fmt, budget);
      assert.ok(r, `${slug}-${c.name}.${fmt}: cannot meet ${budget} B even at q=28`);
      const file = join(OUT, `${slug}-${c.name}.${fmt}`);
      writeFileSync(file, r.buf);
      const size = statSync(file).size;
      assert.ok(size <= budget, `${slug}-${c.name}.${fmt}: ${size} B > ${budget} B`);
      total += size;
      console.log(`  ok  ${slug}-${c.name}.${fmt}`.padEnd(42), `${String(size).padStart(6)} B  q${r.q}  (<= ${budget})`);
    }
  }
}
console.log(`work-second-screen: ${todo.length} site(s), ${todo.length * CROPS.length * 2} files, ${total} B total, every budget met`);

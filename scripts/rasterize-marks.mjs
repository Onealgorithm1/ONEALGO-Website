/**
 * Rasterise the footer platform marks to PNG at 3x display size.
 * Run after adding or changing an SVG:  node scripts/rasterize-marks.mjs
 *
 * ⛔ WHY BITMAPS, when the site has clean SVGs: two iOS Safari failure modes,
 * both shipped and both photographed on a real iPhone on 2026-08-30.
 *   1. SVG <img> riding a CSS transform animation is re-rasterised from
 *      vectors every frame -- the anti-aliasing is recomputed at each new
 *      sub-pixel position and the whole strip visibly shimmers.
 *   2. The "standard" fix, promoting each img to its own layer with
 *      translateZ(0), made Safari CULL the backing stores of the ~50 marks
 *      that started offscreen: the animation carried EMPTY layers into view
 *      (dead spots), and a tap forced the re-composite that painted them.
 * A decoded bitmap has neither problem: painting it is a blit of fixed
 * pixels, identical every frame, and it needs no layer of its own.
 *
 * 3x covers iPhone DPR exactly; desktop downsamples, which for marks this
 * small is indistinguishable. Heights come from TrustedPartnerships.tsx and
 * must be kept in sync with it -- the component asserts nothing, so a mark
 * missing here is a broken image in the footer.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, "..", "public", "media", "platforms");
const OUT = path.join(BASE, "png");

/* slug -> [sourceDir, displayHeightPx] — heights mirror PLATFORMS in
   client/components/TrustedPartnerships.tsx. notion is the one mark that must
   come from the originals (its black N sits on the logo's own white page). */
const MARKS = {
  salesforce: ["on-dark", 21.7], oracle: ["on-dark", 9.4], microsoft: ["on-dark", 12],
  "dynamics-365": ["on-dark", 18.5], servicenow: ["on-dark", 10], zendesk: ["on-dark", 22],
  hubspot: ["on-dark", 14.1], zoho: ["on-dark", 17.2], monday: ["on-dark", 10.5],
  quickbooks: ["on-dark", 14.5], docusign: ["on-dark", 11.7], twilio: ["on-dark", 14.2],
  zapier: ["on-dark", 17.6], "google-ads": ["on-dark", 29.1], "google-analytics": ["on-dark", 16.5],
  meta: ["on-dark", 11.7], instagram: ["on-dark", 26], linkedin: ["on-dark", 13.1],
  tiktok: ["on-dark", 10], cloudflare: ["on-dark", 16.5], wordpress: ["on-dark", 26],
  shopify: ["on-dark", 14.6], stripe: ["on-dark", 16.8], github: ["on-dark", 11],
  notion: [".", 22], ghost: ["on-dark", 18],
  claude: ["on-dark", 12], openai: ["on-dark", 13.5], "google-gemini": ["on-dark", 15.8],
  grok: ["on-dark", 13.7], deepseek: ["on-dark", 12],
};

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
let total = 0;
for (const [slug, [dir, h]] of Object.entries(MARKS)) {
  const svgPath = path.join(BASE, dir, slug + ".svg");
  const svg = fs.readFileSync(svgPath, "utf8");
  const vb = svg.match(/viewBox="([\d.\-\s]+)"/);
  let vw, vh;
  if (vb) [, , vw, vh] = vb[1].trim().split(/\s+/).map(Number);
  if (!vw || !vh) {
    // some files carry width/height attributes instead of a viewBox
    vw = parseFloat((svg.match(/\swidth="([\d.]+)/) || [])[1]);
    vh = parseFloat((svg.match(/\sheight="([\d.]+)/) || [])[1]);
  }
  if (!vw || !vh) throw new Error(slug + ": no usable dimensions");
  const ratio = vw / vh;
  const ph = Math.round(h * 3);
  const pw = Math.round(ph * ratio);
  await page.setViewport({ width: pw, height: ph, deviceScaleFactor: 1 });
  const b64 = Buffer.from(svg).toString("base64");
  await page.setContent(
    `<body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${b64}" style="width:${pw}px;height:${ph}px;display:block"></body>`,
  );
  await page.screenshot({ path: path.join(OUT, slug + ".png"), omitBackground: true, clip: { x: 0, y: 0, width: pw, height: ph } });
  const size = fs.statSync(path.join(OUT, slug + ".png")).size;
  total += size;
  console.log(slug.padEnd(18), `${pw}x${ph}`.padStart(9), String(size).padStart(7), "bytes");
}
await browser.close();
console.log("\ntotal:", Math.round(total / 1024) + "KB for", Object.keys(MARKS).length, "marks");

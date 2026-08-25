/**
 * Capture the client sites shown in the "work we built" carousel.
 *
 *     node scripts/work-shots.mjs
 *
 * WHY SCREENSHOTS AND NOT AN <iframe>. The obvious build is an iframe of the
 * live site in a modal. It cannot work: inspectthishomeinspections.com sends
 * `x-frame-options: SAMEORIGIN`, so a browser refuses to render it in our page
 * and the visitor gets a blank box with no error we can catch. Screenshots also
 * mean no third-party request on our page, nothing for the client's analytics
 * to log, and a preview that opens instantly.
 *
 * ⚠️ These are OTHER PEOPLE'S websites. Re-run this when a client redesigns, or
 * the carousel quietly shows work that no longer exists. The date each shot was
 * taken is written into WORK in client/data/work.ts — keep them in step.
 *
 * ponytail: two sizes per site, no responsive set, no CDN. A 1280-wide capture
 * downscales fine to a 420px card, and the full-page shot IS the preview.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import puppeteer from "puppeteer";

const OUT = join(process.cwd(), "public", "work");
mkdirSync(OUT, { recursive: true });

const SITES = [
  { slug: "boards-professor", url: "https://theboardsprofessor.com/" },
  { slug: "inspect-this-home", url: "https://inspectthishomeinspections.com/" },
];

const browser = await puppeteer.launch({ headless: "new" });
for (const s of SITES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  try {
    await page.goto(s.url, { waitUntil: "networkidle2", timeout: 60000 });
  } catch {
    // networkidle2 times out on sites with a polling widget; the paint is done.
    console.log(`  ${s.slug}: load timed out, capturing anyway`);
  }
  // Let the first paint and any entrance animation settle.
  await new Promise((r) => setTimeout(r, 2500));

  /* ⛔ SCROLL THE WHOLE PAGE BEFORE THE FULL-PAGE SHOT. Without this the
     fullPage capture came back as a tall blank white image: both of these sites
     lazy-load below the fold, and `fullPage: true` resizes the viewport and
     captures WITHOUT ever scrolling, so nothing below the first screen is asked
     to load. Walk it down a screen at a time, let the images decode, then walk
     back to the top so any sticky header is where it belongs. */
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 260));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));

  const card = join(OUT, `${s.slug}-card.webp`);
  await page.screenshot({ path: card, type: "webp", quality: 82 });

  const full = join(OUT, `${s.slug}-full.webp`);
  await page.screenshot({ path: full, type: "webp", quality: 80, fullPage: true });

  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`  ${s.slug}: card 1280x800, full 1280x${h}`);
  await page.close();
}
await browser.close();
console.log("\nWrote to public/work/");

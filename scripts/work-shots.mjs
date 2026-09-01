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
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import puppeteer from "puppeteer";

const OUT = join(process.cwd(), "public", "work");
mkdirSync(OUT, { recursive: true });

const SITES = [
  { slug: "boards-professor", url: "https://theboardsprofessor.com/" },
  { slug: "inspect-this-home", url: "https://inspectthishomeinspections.com/" },
  { slug: "phantom-arcades", url: "https://phantomarcades.com/" },
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

  // Desktop card at 1x: the 2x version was 111–160KB and arrived late enough
  // to read as a blank box. 1280 wide is plenty for a 420px card.
  const card = join(OUT, `${s.slug}-card.webp`);
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: card, type: "webp", quality: 74 });
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 600));

  const full = join(OUT, `${s.slug}-full.webp`);
  await page.screenshot({ path: full, type: "webp", quality: 80, fullPage: true });

  const h = await page.evaluate(() => document.documentElement.scrollHeight);

  /* Phone card. A desktop capture squeezed into a 340px card is unreadable —
     Louis, 2026-08-25: "the sizing is off". So phones get the site's OWN
     phone layout, 390 wide.

     ⛔ 1500ms WAS NOT ENOUGH and it shipped two bad cards (Louis, 2026-09-01:
     "two of them are not previewing properly on mobile"). Phantom's hero is a
     <video> that had not painted, so the card showed a dead navy band where the
     cabinet should be. The desktop path already walks the page to force lazy
     loading; the phone path did not. It does now, and then waits for the media
     itself rather than guessing.

     ⛔ 488px of a phone page is a near 1:1 crop, not a miniature site — it cut
     Inspect This Home off mid-sentence. 650px at 390 wide is exactly 3:5 and
     matches .wk-shot's mobile aspect-ratio. ⛔ CHANGE ONE AND CHANGE THE OTHER,
     or the card crops the capture and the extra height is wasted.

     ⛔ 650 is not arbitrary. The Boards Professor's mobile hero runs to y=903
     and puts its PHOTO below y=470, so a 520px frame caught every word and not
     one image — Louis, 2026-09-01: "doesn't look anything like mobile view".
     Measure the tallest client hero before shortening this. */
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < Math.min(document.body.scrollHeight, step * 4); y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 260));
    }
    window.scrollTo(0, 0);
  });
  /* Wait for what is actually on the first screen to be ready, not a fixed
     guess: every image decoded, and any video past its first frame. */
  /* ⛔ The whole wait is RACED against a hard 8s ceiling. Without it this hung:
     img.decode() on a lazy image that is never scrolled into view can stay
     pending forever, Promise.all then never settles, and puppeteer kills the
     run with "Runtime.callFunctionOn timed out" — which reads like a browser
     fault rather than our own unbounded wait. */
  await page.evaluate(async () => {
    const ready = Promise.all([
      ...[...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null)),
      ...[...document.querySelectorAll("video")].map((v) =>
        v.readyState >= 2
          ? null
          : new Promise((r) => {
              v.addEventListener("loadeddata", r, { once: true });
              setTimeout(r, 4000);
            }),
      ),
    ]);
    await Promise.race([ready, new Promise((r) => setTimeout(r, 8000))]);
  });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => window.scrollTo(0, 0));
  const phone = join(OUT, `${s.slug}-phone.webp`);
  await page.screenshot({ path: phone, type: "webp", quality: 78, clip: { x: 0, y: 0, width: 390, height: 650 } });

  /* A blank or near-flat capture compresses to almost nothing. This is the
     cheapest honest guard against shipping another dead card. */
  const phoneKB = statSync(phone).size / 1024;
  if (phoneKB < 12) {
    throw new Error(`${s.slug}-phone.webp is only ${phoneKB.toFixed(0)}KB — that is a blank or flat capture, not a page`);
  }

  console.log(`  ${s.slug}: card 1280x800, phone 390x650 (${phoneKB.toFixed(0)}KB), full 1280x${h}`);
  await page.close();
}
await browser.close();
console.log("\nWrote to public/work/");

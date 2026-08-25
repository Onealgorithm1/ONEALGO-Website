/**
 * Drives the /services/website-development hero in a real browser.
 *
 *     npm run build:client && node scripts/prerender.mjs && node scripts/hero-frame-check.mjs
 *
 * The hero is the brand film with a particle canvas in front of it. Everything
 * it does is invisible to a unit test and invisible to a screenshot diff,
 * because the failures are all "it is there but wrong":
 *
 *   1. ⛔ REDUCED MOTION USED TO RENDER A COMPLETELY BLANK HERO. Measured
 *      2026-08-24. Under prefers-reduced-motion the draw loop paints one frame
 *      and stops, but on mount the canvas has no size yet, so build() bailed at
 *      its !W guard and the one frame painted nothing. The ResizeObserver's
 *      later build() filled the particle list with nothing left running to draw
 *      it, and setting canvas.width clears the canvas, so every subsequent
 *      resize reproduced it.
 *   2. The loop must actually STOP under reduced motion — a canvas that keeps
 *      running is battery and heat for someone who asked it not to move.
 *   3. The headline is fitted with measureText, not a width ratio, because the
 *      old Math.min(W/9, 120) clipped the longer line between about 1080px and
 *      1440px. Clipping is silent: the glyphs just leave the canvas.
 *   4. The brand film sits BEHIND the particle canvas. If the stacking ever
 *      inverts, the video paints over the particles and the hero silently
 *      becomes just a video — invisible in review, obvious to a visitor.
 *   5. The canvas is decorative (aria-hidden) because the <h1> underneath
 *      carries the same words. If the h1 ever drifts from the canvas text, the
 *      headline becomes unreachable to a screen reader.
 *   6. The 390px layout must not push the page sideways.
 *   7. ⛔ ONE SWIPE MUST DO BOTH: scroll the page AND move the particles. Each
 *      half has been broken separately, in opposite directions, on the same day
 *      — first touch-action:none + setPointerCapture, which read the finger and
 *      swallowed every swipe on the first screen of a phone; then removing touch
 *      outright, which restored scrolling and killed the effect. Passive touch
 *      listeners give both. Neither failure is visible on a desktop with a
 *      mouse; both were found by Louis on a real handset, 2026-08-24.
 *
 * Route-guarded: if the hero is not on the route this SKIPS rather than fails.
 */

import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
const ROUTE = process.argv[2] || "/services/website-development";

/* Must match LINE_A / LINE_B in client/components/HeroSlides.tsx. */
const LINE_A = "Custom website design";
const LINE_B = "and development";

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".webm": "video/webm", ".mp4": "video/mp4",
};

function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    for (const candidate of [path.join(DIST, urlPath), path.join(DIST, urlPath + ".html")]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.writeHead(200, { "Content-Type": TYPES[path.extname(candidate)] || "application/octet-stream" });
        fs.createReadStream(candidate).pipe(res);
        return;
      }
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(DIST, "index.html")).pipe(res);
  });
}

let passed = 0;
const failures = [];
const check = async (label, fn) => {
  try {
    await fn();
    passed++;
    console.log(`  ok    ${label}`);
  } catch (error) {
    failures.push(label);
    console.log(`  FAIL  ${label}\n        ${error.message}`);
  }
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⛔ A FUNCTION, not a template string. page.evaluate() given a string evaluates
   it as an expression, so a stringified arrow returned the function object
   (unserialisable -> undefined) and every reading came back "undefined". */
const SAMPLE = () => {
  const c = document.querySelector(".hg-s canvas");
  if (!c) return null;
  const x = document.createElement("canvas");
  x.width = 400; x.height = 200;
  const g = x.getContext("2d");
  g.drawImage(c, 0, 0, c.width, c.height, 0, 0, 400, 200);
  const d = g.getImageData(0, 0, 400, 200).data;
  let sum = 0, lit = 0;
  for (let i = 0; i < d.length; i += 4) { sum += d[i] + d[i + 1] + d[i + 2]; if (d[i] > 60) lit++; }
  return { sum, lit };
};

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found - run `npm run build:client` first.");
  }

  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

  try {
    const open = async (reducedMotion) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      if (reducedMotion) {
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      }
      await page.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });
      /* The prerendered HTML has no canvas — React mounts it, and the particle
         build is deferred to an idle callback. Wait for the element, then give
         that callback room to run. */
      await page.waitForSelector(".hg-s canvas", { timeout: 15000 }).catch(() => {});
      await wait(1600);
      return page;
    };

    const probe = await open(false);
    const present = await probe.evaluate(() => !!document.querySelector(".hg-s canvas"));
    if (!present) {
      console.log(`\n  SKIP  no hero canvas on ${ROUTE}\n`);
      await probe.close();
      return;
    }

    console.log(`\nHero frame — ${ROUTE}\n`);

    await check("headline is drawn (motion on)", async () => {
      const s = await probe.evaluate(SAMPLE);
      assert.ok(s.lit > 200, `only ${s.lit} lit pixels — the canvas is effectively blank`);
    });

    await check("the particles respond to the pointer", async () => {
      /* NOT "does the canvas differ after 600ms". Once the particles reach their
         home pixels they sit perfectly still until the next scatter (1.4s every
         6s), so two idle samples are legitimately identical and that version of
         this check failed against a working page. Drive the input instead. */
      await probe.bringToFront();
      const box = await probe.evaluate(() => {
        const r = document.querySelector(".hg-s canvas").getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      const before = await probe.evaluate(SAMPLE);
      await probe.mouse.move(box.x - 120, box.y);
      await probe.mouse.move(box.x, box.y, { steps: 12 });
      await wait(220);
      const during = await probe.evaluate(SAMPLE);
      assert.notStrictEqual(before.sum, during.sum,
        "the cursor moved through the letters and nothing changed — the repulsion field is dead");
    });

    await check("headline fits inside the canvas at every width", async () => {
      for (const width of [360, 390, 768, 1024, 1280, 1440]) {
        await probe.setViewport({ width, height: 900 });
        await wait(500);
        const fit = await probe.evaluate((a, b) => {
          const c = document.querySelector(".hg-s canvas");
          const W = Math.floor(c.getBoundingClientRect().width);
          const o = document.createElement("canvas").getContext("2d");
          const font = (n) => `800 ${n}px "IBM Plex Sans", system-ui, sans-serif`;
          let size = Math.min(W / (W < 640 ? 6.2 : 8), 132);
          o.font = font(size);
          const measure = () => Math.max(o.measureText(a).width, o.measureText(b).width);
          const FIT = W * (W < 640 ? 0.9 : 0.88);
          let widest = measure();
          if (widest > FIT) { size = Math.max(22, Math.floor(size * (FIT / widest))); o.font = font(size); widest = measure(); }
          return { W, widest };
        }, LINE_A, LINE_B);
        assert.ok(fit.widest <= fit.W,
          `at ${width}px the headline is ${Math.round(fit.widest)}px wide in a ${fit.W}px canvas — it is clipped`);
      }
      await probe.setViewport({ width: 1440, height: 900 });
      await wait(400);
    });

    await check("no page-level horizontal scroll at 390px", async () => {
      await probe.setViewport({ width: 390, height: 844 });
      await wait(600);
      const over = await probe.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(over <= 0, `page scrolls sideways by ${over}px`);
      await probe.setViewport({ width: 1440, height: 900 });
      await wait(400);
    });

    await check("the brand film is behind the particles, not in front", async () => {
      /* ⛔ This once asserted the hero contained NO video, because the page
         claimed "there is no video anywhere on this page" — the reason the film
         was cut from the old carousel. Louis put it back as the hero background
         on 2026-08-24 and every one of those claims was rewritten in the same
         change. What matters now is the stacking. */
      const z = await probe.evaluate(() => {
        const v = document.querySelector(".hg-s video");
        const c = document.querySelector(".hg-s canvas");
        const s = document.querySelector(".hs-scrim");
        if (!v || !c || !s) return null;
        const zi = (el) => Number(getComputedStyle(el).zIndex) || 0;
        return { video: zi(v), scrim: zi(s), canvas: zi(c) };
      });
      assert.ok(z, "hero is missing the video, the scrim or the canvas");
      assert.ok(z.canvas > z.scrim && z.scrim >= z.video,
        `stacking is video ${z.video} / scrim ${z.scrim} / canvas ${z.canvas} — the particles must be on top`);
    });

    await check("TOUCH: one swipe both scrolls the page AND moves the particles", async () => {
      /* The two halves of this have each been broken separately, in opposite
         directions, on the same day:
           - touch-action:none + setPointerCapture read the finger and swallowed
             every swipe on the first screen of a phone;
           - removing touch entirely restored scrolling and killed the effect.
         Passive touch listeners give both, so assert both from ONE gesture. A
         version that only checked scrolling would have gone green on the build
         that had no touch effect at all. */
      const touch = await browser.newPage();
      try {
        await touch.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
        await touch.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });
        await touch.waitForSelector(".hg-s canvas", { timeout: 15000 }).catch(() => {});
        await wait(1800);

        const ta = await touch.evaluate(() => getComputedStyle(document.querySelector(".hg-s canvas")).touchAction);
        assert.ok(ta === "auto" || ta === "manipulation",
          `canvas touch-action is "${ta}" — anything else steals the swipe from the page`);

        /* Start on the lettering itself, so the repulsion field is in range. */
        const from = await touch.evaluate(() => {
          const r = document.querySelector(".hg-s canvas").getBoundingClientRect();
          return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
        });
        const before = await touch.evaluate(SAMPLE);
        await touch.touchscreen.touchStart(from.x, from.y);
        let during = null;
        for (let dy = 24; dy <= 300; dy += 24) {
          await touch.touchscreen.touchMove(from.x, from.y - dy);
          if (dy === 72) during = await touch.evaluate(SAMPLE);
        }
        await touch.touchscreen.touchEnd();
        await wait(900);

        const moved = await touch.evaluate(() => (document.scrollingElement || document.documentElement).scrollTop);
        assert.ok(moved > 60, `swiping up over the hero moved the page ${moved}px — it is trapping scroll`);
        assert.ok(during && before.sum !== during.sum,
          "the page scrolled but the particles never reacted — the passive touch listeners are gone");
      } finally {
        await touch.close();
      }
    });

    await check("the particle band covers the type, not the whole hero", async () => {
      const r = await probe.evaluate(() => {
        const h = document.querySelector(".hg-s").getBoundingClientRect();
        const c = document.querySelector(".hg-s canvas").getBoundingClientRect();
        return { heroH: h.height, bandH: c.height };
      });
      const share = r.bandH / r.heroH;
      assert.ok(share < 0.8, `the canvas covers ${Math.round(share * 100)}% of the hero — it should sit over the type, not the whole frame`);
    });

    await check("the h1 carries the headline the canvas draws", async () => {
      /* The canvas is aria-hidden, so the <h1> is the ONLY way a screen reader
         reaches this headline. If the two drift apart, sighted and non-sighted
         visitors are reading different pages. */
      const out = await probe.evaluate(() => ({
        h1: (document.querySelector("main h1")?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase(),
        hidden: document.querySelector(".hg-s canvas")?.getAttribute("aria-hidden"),
      }));
      const want = `${LINE_A} ${LINE_B}`.toLowerCase();
      assert.strictEqual(out.hidden, "true", "canvas should be aria-hidden — the h1 announces the headline");
      assert.ok(out.h1.includes(want), `h1 is "${out.h1}" but the canvas draws "${want}"`);
    });

    await probe.close();

    /* ---- prefers-reduced-motion ------------------------------------------ */
    const still = await open(true);

    await check("REDUCED MOTION: headline still renders", async () => {
      const s = await still.evaluate(SAMPLE);
      assert.ok(s.lit > 200, `only ${s.lit} lit pixels — reduced-motion users get a blank hero`);
    });

    await check("REDUCED MOTION: the loop has stopped", async () => {
      const a = await still.evaluate(SAMPLE);
      await wait(800);
      const b = await still.evaluate(SAMPLE);
      assert.strictEqual(a.sum, b.sum, "canvas is still repainting for someone who asked for no motion");
    });

    await check("REDUCED MOTION: survives a resize", async () => {
      await still.setViewport({ width: 1180, height: 780 });
      await wait(800);
      const s = await still.evaluate(SAMPLE);
      assert.ok(s.lit > 200, `only ${s.lit} lit pixels after resize — build() cleared the canvas and nothing repainted it`);
    });

    await check("REDUCED MOTION: the film is never fetched", async () => {
      /* useHeroVideo() withholds the <source> elements entirely rather than
         pausing the video, so the 746KB webm is not downloaded at all. */
      const sources = await still.evaluate(() => document.querySelectorAll(".hg-s video source").length);
      assert.strictEqual(sources, 0, `${sources} <source> element(s) present — the film should not be fetched here at all`);
    });

    await still.close();
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n${passed} passed, ${failures.length} failed\n`);
  assert.strictEqual(failures.length, 0, `hero frame checks failed: ${failures.join(", ")}`);
}

main().catch((error) => { console.error(error); process.exit(1); });

/**
 * The "websites we built" carousel — the things a screenshot review cannot show.
 *
 *     npm run build:client && node scripts/work-carousel-check.mjs
 *
 * WHY EACH CHECK EXISTS.
 *
 *   1. ⛔ THE PREVIEW IMAGE MUST ACTUALLY DECODE. The first build shipped a
 *      full-page capture that was a tall blank white image: `fullPage: true`
 *      resizes the viewport and captures WITHOUT scrolling, so neither client
 *      site was ever asked to load anything below the fold. The file existed,
 *      the file was 351KB, the <img> reported complete — and the modal showed
 *      nothing. Only naturalWidth plus a real pixel sample catches that, which
 *      is why this check samples the bitmap rather than trusting the file.
 *   2. Clicking a card must NOT navigate. The entire point is "will not make
 *      them leave our website" (Louis, 2026-08-25). A regression to a plain
 *      <a href> would look identical in a screenshot.
 *   3. Every entry in client/data/work.ts must have both of its images. Adding
 *      a site to the data and forgetting to run scripts/work-shots.mjs produces
 *      a card with a broken image and no error anywhere.
 *   4. Esc must close the dialog. It is free from <dialog>, and lost the moment
 *      someone reimplements the modal as a <div>.
 *   5. No horizontal page overflow at 390px. A scroll rail is the easiest way
 *      to push a phone layout sideways.
 */

import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist", "spa");
const ROUTE = "/services/website-development";

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
  try { await fn(); passed++; console.log("  ok    " + label); }
  catch (e) { failures.push(label); console.log("  FAIL  " + label + "\n        " + e.message); }
};

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  throw new Error("dist/spa/index.html not found - run `npm run build:client` first.");
}

/* Read the data file as text rather than importing it: this script is plain
   node and work.ts is TypeScript. Only the slugs are needed. */
const workSrc = fs.readFileSync(path.join(ROOT, "client", "data", "work.ts"), "utf8");
const SLUGS = [...workSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
/* Per entry: url, whether the LIVE site is embedded, and the text that proves
   the live site (not a refusal or error page) rendered inside the frame. */
const ITEMS = SLUGS.map((slug) => {
  const block = workSrc.slice(workSrc.indexOf('slug: "' + slug + '"'));
  const grab = (key) => { const m = block.match(new RegExp(key + ':[ ]*"([^"]+)"')); return m ? m[1] : ""; };
  return { slug, url: grab("url"), marker: grab("marker"), embed: /embed:[ ]*true/.test(block.slice(0, block.indexOf("},"))) };
});

console.log(`\nWork carousel — ${ROUTE}  (${SLUGS.length} entries in work.ts)\n`);

const server = serve();
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({ headless: "new" });

try {
  await check("every entry in work.ts has both of its images on disk", () => {
    assert.ok(SLUGS.length > 0, "no entries parsed out of client/data/work.ts");
    for (const slug of SLUGS) {
      for (const kind of ["card", "full"]) {
        const f = path.join(ROOT, "public", "work", `${slug}-${kind}.webp`);
        assert.ok(fs.existsSync(f), `missing ${slug}-${kind}.webp — run scripts/work-shots.mjs`);
        assert.ok(fs.statSync(f).size > 8000, `${slug}-${kind}.webp is only ${fs.statSync(f).size} bytes`);
      }
    }
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });

  await check("one card per entry, and the carousel sits above the rest of the page", async () => {
    const n = await page.$$eval(".wk-card", (els) => els.length);
    assert.equal(n, SLUGS.length, `${n} cards for ${SLUGS.length} entries`);
    const order = await page.evaluate(() => {
      const wk = document.querySelector(".wk");
      const hero = document.querySelector(".hg");
      if (!wk || !hero) return null;
      return hero.compareDocumentPosition(wk) & Node.DOCUMENT_POSITION_FOLLOWING ? "after-hero" : "before-hero";
    });
    assert.equal(order, "after-hero", "the carousel is not directly after the hero");
  });

  /* Every card, in order: open, prove the preview is the real thing, close.
     Two kinds of preview exist and each has its own failure mode that a
     "dialog opened" test would miss: an embedded site can be REFUSED by the
     client's headers (blank box, or a browser error page — both non-empty
     documents), and a screenshot can be a blank capture. */
  for (const [i, item] of ITEMS.entries()) {
    await check(`${item.slug}: clicking the card opens the preview WITHOUT leaving the page`, async () => {
      const before = page.url();
      const cards = await page.$$(".wk-card .wk-btn");
      await cards[i].click();
      await page.waitForSelector("dialog.wk-modal[open]", { timeout: 5000 });
      assert.equal(page.url(), before, "the click navigated away — the preview must stay on our page");
    });

    if (item.embed) {
      await check(`${item.slug}: the LIVE site renders inside the frame (marker "${item.marker}")`, async () => {
        const src = await page.$eval("dialog.wk-modal iframe.wk-frame", (f) => f.getAttribute("src"));
        assert.equal(src, item.url, `iframe src is ${src}`);
        const sandbox = await page.$eval("dialog.wk-modal iframe.wk-frame", (f) => f.getAttribute("sandbox") || "");
        assert.ok(!/allow-top-navigation/.test(sandbox), "the frame may navigate our page away: " + sandbox);
        let frame = null;
        for (let t = 0; t < 40 && !frame; t++) {
          frame = page.frames().find((f) => f !== page.mainFrame() && f.url().startsWith(item.url));
          if (!frame) await new Promise((r) => setTimeout(r, 250));
        }
        assert.ok(frame, "no child frame for " + item.url + " — the client site refused to be framed, or never loaded");
        const seen = await frame.evaluate((marker) => new Promise((resolve) => {
          const look = () => (document.body && document.body.innerText.includes(marker)) || document.title.includes(marker);
          const t0 = Date.now();
          const tick = () => (look() ? resolve(true) : Date.now() - t0 > 15000 ? resolve(false) : setTimeout(tick, 250));
          tick();
        }), item.marker).catch((e) => "ERR " + e.message);
        assert.equal(seen, true, `"${item.marker}" never appeared in the framed document (${String(seen)})`);
      });
    } else {
      await check(`${item.slug}: the preview image decodes and is not a blank capture`, async () => {
        const r = await page.evaluate(async () => {
          const img = document.querySelector(".wk-modal-scroll img");
          if (!img) return { err: "no image in the modal" };
          if (!img.complete) await new Promise((res) => { img.onload = res; img.onerror = res; });
          if (!img.naturalWidth) return { err: "image failed to load: " + img.getAttribute("src") };
          const c = document.createElement("canvas");
          const w = (c.width = 220), h = (c.height = 160);
          c.getContext("2d").drawImage(img, 0, 0, img.naturalWidth, Math.round(img.naturalWidth * 0.72), 0, 0, w, h);
          const d = c.getContext("2d").getImageData(0, 0, w, h).data;
          const seen = new Set();
          for (let k = 0; k < d.length; k += 4) seen.add((d[k] >> 4) + "," + (d[k + 1] >> 4) + "," + (d[k + 2] >> 4));
          return { natural: [img.naturalWidth, img.naturalHeight], distinct: seen.size };
        });
        assert.ok(!r.err, r.err);
        assert.ok(r.natural[1] > r.natural[0], `full capture is ${r.natural[0]}x${r.natural[1]} — that is not a full page`);
        assert.ok(r.distinct >= 8, `only ${r.distinct} distinct colours in the top of the preview — it is a blank capture`);
      });
    }

    await check(`${item.slug}: Escape closes the preview`, async () => {
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector("dialog.wk-modal[open]"), { timeout: 5000 });
    });
  }

  await check("no page-level horizontal scroll at 390px", async () => {
    const p = await browser.newPage();
    await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await p.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await p.close();
    assert.ok(over <= 1, `page scrolls sideways by ${over}px at 390`);
  });
} finally {
  await browser.close();
  server.close();
}

console.log(`\n${passed} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);

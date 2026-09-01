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
const ITEMS = SLUGS.map((slug, i) => {
  const from = workSrc.indexOf('slug: "' + slug + '"');
  /* Stop at the NEXT entry, not at the first "}," — entries now contain a
     nested `review` object and an unbounded slice would read the next client's
     fields as this one's. */
  const to = i + 1 < SLUGS.length ? workSrc.indexOf('slug: "' + SLUGS[i + 1] + '"') : workSrc.length;
  const block = workSrc.slice(from, to);
  const grab = (key, src = block) => { const m = src.match(new RegExp(key + ':[ ]*"([^"]+)"')); return m ? m[1] : ""; };
  const rm = block.match(/review:\s*\{([\s\S]*?)\s*\},/);
  const review = rm ? { author: grab("author", rm[1]), url: grab("url", rm[1]), disclosure: grab("disclosure", rm[1]) } : null;
  return { slug, url: grab("url"), marker: grab("marker"), review, embed: /embed:[ ]*true/.test(block) };
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
      for (const kind of ["card", "phone", "full"]) {
        const f = path.join(ROOT, "public", "work", `${slug}-${kind}.webp`);
        assert.ok(fs.existsSync(f), `missing ${slug}-${kind}.webp — run scripts/work-shots.mjs`);
        assert.ok(fs.statSync(f).size > 8000, `${slug}-${kind}.webp is only ${fs.statSync(f).size} bytes`);
      }
    }
  });

  /* --live: open PRODUCTION instead of the local build. A client site that
     allowlists only onealgorithm.com in frame-ancestors refuses a frame from
     localhost, so its live preview can only be proven from the real origin,
     after deploy. */
  const LIVE = process.argv.includes("--live");
  const BASE = LIVE ? "https://onealgorithm.com" : `http://localhost:${port}`;
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle0" });

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

  /* ⛔ THE REVIEW LINK IS THE ONE INTERACTIVE THING ON A CARD THAT IS NOT THE
     CARD. Three ways it silently goes wrong, none of which a screenshot shows:
     it drifts back INSIDE .wk-btn (an <a> in a <button> — invalid HTML, and
     axe's nested-interactive rule fails it); it loses target=_blank and starts
     throwing the visitor off our page, which is the exact thing this whole
     component exists to prevent; or someone adds stars to a client who never
     wrote a review, which is a fabricated endorsement. */
  await check("review links sit OUTSIDE the card button, open in a new tab, and match work.ts", async () => {
    const seen = await page.$$eval(".wk-card", (cards) => cards.map((c) => {
      const a = c.querySelector(".wk-stars");
      return a && {
        slug: (c.querySelector(".wk-shot img")?.getAttribute("src") || "").split("/").pop().replace("-card.webp", ""),
        href: a.getAttribute("href"),
        target: a.getAttribute("target"),
        rel: a.getAttribute("rel") || "",
        insideButton: !!a.closest("button"),
        label: a.getAttribute("aria-label") || "",
        box: Math.round(a.getBoundingClientRect().height),
      };
    }).filter(Boolean));

    const expected = ITEMS.filter((i) => i.review);
    assert.equal(seen.length, expected.length,
      `${seen.length} cards show stars, but work.ts declares ${expected.length} reviews — never show a review a client did not write`);

    for (const e of expected) {
      const got = seen.find((x) => x.slug === e.slug);
      assert.ok(got, `${e.slug} has a review in work.ts but no stars on the card`);
      assert.equal(got.insideButton, false, `${e.slug}: the review link is INSIDE the card <button> — invalid HTML (nested interactive)`);
      assert.equal(got.href, e.review.url, `${e.slug}: link points at ${got.href}, work.ts says ${e.review.url}`);
      assert.equal(got.target, "_blank", `${e.slug}: the review link would navigate our own page away`);
      assert.ok(/noopener/.test(got.rel), `${e.slug}: rel is "${got.rel}" — needs noopener`);
      assert.ok(got.label.includes(e.review.author), `${e.slug}: aria-label does not name the reviewer (${got.label})`);
      assert.ok(got.box >= 24, `${e.slug}: the link is only ${got.box}px tall — WCAG 2.2 target size minimum is 24px`);
    }
  });

  /* ⛔ FTC 16 CFR 255.5. Lou is Louis's father. A review from a family member
     presented as an ordinary client endorsement is an undisclosed material
     connection, and the disclosure has to be VISIBLE next to the stars — not in
     a title attribute, not in a footer, not only in work.ts. */
  await check("a reviewer with a material connection to us is disclosed on the card itself", async () => {
    const need = ITEMS.filter((i) => i.review && i.review.disclosure);
    const shown = await page.$$eval(".wk-vouch", (els) => els.map((e) => ({
      note: e.querySelector(".wk-vouch-note")?.textContent?.trim() || "",
      visible: !!e.querySelector(".wk-vouch-note")?.getBoundingClientRect().height,
    })));
    for (const e of need) {
      const hit = shown.find((x) => x.note === e.review.disclosure);
      assert.ok(hit, `"${e.review.disclosure}" (${e.slug}) is in work.ts but is not rendered on the card`);
      assert.ok(hit.visible, `the disclosure for ${e.slug} is in the DOM but has no height — it must be readable`);
    }
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
        if (!frame && !LIVE) {
          /* Refused from localhost. That is only acceptable if the site's own
             headers say it allowlists onealgorithm.com — then the refusal is
             the allowlist working, and --live is where this gets proven. */
          const res = await fetch(item.url, { method: "HEAD" }).catch(() => null);
          const csp = (res && res.headers.get("content-security-policy")) || "";
          assert.ok(/frame-ancestors[^;]*onealgorithm\.com/.test(csp),
            "no child frame for " + item.url + " and its headers do not allowlist onealgorithm.com (CSP: " + (csp || "none") + ")");
          console.log("        (allowlisted to onealgorithm.com — cannot be framed from localhost; run with --live after deploy)");
          return;
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
    await p.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle0" });
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

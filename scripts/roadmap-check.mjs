/**
 * The "how we get you found" roadmap — what a screenshot cannot show.
 *
 *     npm run build:client && node scripts/roadmap-check.mjs
 *
 * WHY EACH CHECK EXISTS.
 *
 *   1. The <ol> IS the content and the SVG is decoration. Three reviewers
 *      required it; the failure mode is someone moving the copy into the SVG
 *      for layout convenience, at which point a screen reader gets a road with
 *      no stops. Asserted directly: every SVG aria-hidden, no text or links in
 *      any of them, stops in DOM order.
 *   2. ⛔ ONE LINK PER STOP, and the first has none. The page must not become
 *      a service directory; a second link per stop is the first step back to
 *      one. Every link target must be a route that actually prerenders.
 *   3. ROAD_X must have exactly one more entry than ROADMAP, or the last
 *      segment has no exit and the road stops dead. Cheap to assert, silent
 *      when wrong.
 *   4. REDUCED MOTION renders the road fully drawn with no mask and no motion
 *      attributes — the motion reviewer's requirement was that this branch
 *      mounts nothing scroll-driven. Asserted on the served page.
 *   5. With motion ON, a segment that has been scrolled into view must finish
 *      drawing (pathLength reaches 1). A road that never draws is invisible in
 *      a screenshot taken before the reader scrolls.
 *   6. No page-level horizontal overflow at 390px; the alternating desktop
 *      layout must collapse cleanly.
 *   7. Every pin sits inside its lane. `--x` is a percentage of the lane; a
 *      typo puts a pin in the copy column and nothing errors.
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
    for (const c of [path.join(DIST, urlPath), path.join(DIST, urlPath + ".html")]) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        res.writeHead(200, { "Content-Type": TYPES[path.extname(c)] || "application/octet-stream" });
        fs.createReadStream(c).pipe(res);
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

/* Plain node cannot import the .ts data file; read the two things needed. */
const src = fs.readFileSync(path.join(ROOT, "client", "data", "roadmap.ts"), "utf8");
const STOPS = [...src.matchAll(/id:\s*"([a-z-]+)"/g)].map((m) => m[1]);
const LINKS = [...src.matchAll(/to:\s*"(\/[a-z/-]+)"/g)].map((m) => m[1]);
const ROAD_X = JSON.parse(src.match(/ROAD_X\s*=\s*(\[[^\]]+\])/)[1]);

console.log(`\nRoadmap — ${ROUTE}  (${STOPS.length} stops in roadmap.ts)\n`);

await check("ROAD_X has exactly one entry more than the stops (every segment has an exit)", () => {
  assert.equal(ROAD_X.length, STOPS.length + 1, `ROAD_X has ${ROAD_X.length} entries for ${STOPS.length} stops`);
  for (const x of ROAD_X) assert.ok(x >= 0 && x <= 100, `ROAD_X value ${x} is not a percentage`);
});

await check("every link target is a route that prerenders", () => {
  // Between one per linked stop and two: a stop that names two services links
  // to both (round two found a single Ads link under copy that promised
  // social), and no stop may carry more than two or it is a directory again.
  assert.ok(LINKS.length >= STOPS.length - 1 && LINKS.length <= 2 * (STOPS.length - 1),
    `${LINKS.length} links for ${STOPS.length} stops — expected between ${STOPS.length - 1} and ${2 * (STOPS.length - 1)}`);
  for (const l of LINKS) {
    const f = path.join(DIST, l.replace(/^\//, "") + ".html");
    const g = path.join(DIST, l.replace(/^\//, ""), "index.html");
    assert.ok(fs.existsSync(f) || fs.existsSync(g), `no prerendered page for ${l}`);
  }
});

const server = serve();
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({ headless: "new" });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });

  await check("the <ol> carries the stops in order and the SVGs are decoration only", async () => {
    const r = await page.evaluate(() => {
      const ol = document.querySelector("ol.rd-road");
      if (!ol) return { err: "no ol.rd-road" };
      const lis = [...ol.children];
      // .rd-seg, not `.rd svg`: the CTA button carries an arrow icon that is
      // also an <svg>, and it is not a road segment.
      const svgs = [...document.querySelectorAll(".rd svg.rd-seg")];
      return {
        items: lis.length,
        allLi: lis.every((n) => n.tagName === "LI"),
        titles: lis.map((li) => li.querySelector("h3")?.textContent?.trim() || ""),
        svgHidden: svgs.every((s) => s.getAttribute("aria-hidden") === "true"),
        svgHasText: svgs.some((s) => s.querySelector("text, a, foreignObject")),
        svgCount: svgs.length,
      };
    });
    assert.ok(!r.err, r.err);
    assert.equal(r.items, STOPS.length, `${r.items} <li> for ${STOPS.length} stops`);
    assert.ok(r.allLi, "a child of the <ol> is not an <li>");
    assert.ok(r.titles.every(Boolean), "a stop has no <h3>");
    assert.equal(r.svgCount, STOPS.length, `${r.svgCount} road segments for ${STOPS.length} stops`);
    assert.ok(r.svgHidden, "a road SVG is not aria-hidden");
    assert.ok(!r.svgHasText, "a road SVG contains text, a link or a foreignObject — copy must stay in the <ol>");
  });

  await check("one or two links per stop, none on the first, aria-current=step on the first <li>", async () => {
    const r = await page.evaluate(() => ({
      role: document.querySelector("ol.rd-road")?.getAttribute("role"),
      stops: [...document.querySelectorAll("ol.rd-road > li")].map((li) => ({
        links: li.querySelectorAll("a").length,
        // On the <li> itself — assistive tech reads aria-current on the item
        // in the set, not on a span inside it.
        here: li.getAttribute("aria-current") === "step",
        pinSr: /Stop/.test(li.querySelector(".rd-pin")?.textContent || ""),
      })),
    }));
    assert.equal(r.role, "list", "the <ol> needs role=list — Safari drops list semantics under list-style:none");
    assert.equal(r.stops[0].links, 0, "the first stop has a link; it is the reader's own page");
    assert.ok(r.stops[0].here, "the first <li> is not marked aria-current=step");
    for (let i = 1; i < r.stops.length; i++) {
      assert.ok(r.stops[i].links >= 1 && r.stops[i].links <= 2, `stop ${i + 1} has ${r.stops[i].links} links — one or two`);
      assert.ok(!r.stops[i].here, `stop ${i + 1} claims to be the current step`);
    }
    assert.ok(r.stops.every((s) => s.pinSr), "a pin has no screen-reader 'Stop' prefix");
  });

  await check("every pin sits inside its lane", async () => {
    const r = await page.evaluate(() =>
      [...document.querySelectorAll(".rd-lane")].map((lane) => {
        const l = lane.getBoundingClientRect();
        const p = lane.querySelector(".rd-pin").getBoundingClientRect();
        return { inside: p.left >= l.left - 1 && p.right <= l.right + 1, laneW: Math.round(l.width) };
      }),
    );
    assert.ok(r.every((x) => x.inside), "a pin is outside its lane: " + JSON.stringify(r));
  });

  await check("every road segment is exactly as tall as its stop", async () => {
    // The segment is absolutely positioned inside the lane cell; if the lane
    // stops stretching to the row height, the road breaks at every join and
    // nothing errors. Compare each SVG's box to its <li>'s.
    const r = await page.evaluate(() =>
      [...document.querySelectorAll("ol.rd-road > li")].map((li) => {
        const a = li.getBoundingClientRect();
        const b = li.querySelector("svg.rd-seg").getBoundingClientRect();
        return { li: Math.round(a.height), seg: Math.round(b.height) };
      }),
    );
    for (const [i, x] of r.entries()) {
      assert.ok(Math.abs(x.li - x.seg) <= 2, `stop ${i + 1}: li ${x.li}px but its road segment is ${x.seg}px`);
    }
  });

  await check("MOTION ON: EVERY segment finishes drawing once its stop has been scrolled into view", async () => {
    // ⛔ All of them, not one. The first build drew segments 2 and 4 and left
    // 1, 3 and 5 as stubs — a whileInView on a path inside <defs>, which has
    // no layout box for IntersectionObserver to see. Probing one segment
    // passed while the road was visibly broken.
    const n = await page.$$eval("ol.rd-road > li", (els) => els.length);
    for (let i = 1; i <= n; i++) {
      await page.evaluate((k) => document.querySelector(`ol.rd-road > li:nth-child(${k})`).scrollIntoView({ block: "center", behavior: "instant" }), i);
      await new Promise((r) => setTimeout(r, 250));
    }
    // ⛔ Read the DASHARRAY, not the dashoffset. Motion's undrawn state is
    // `stroke-dasharray: 0px 1px; stroke-dashoffset: 0px` and its drawn state
    // is `1px 1px; 0px` — the offset is 0 in BOTH, so a segment that never
    // received its variant passed the old offset test. The first value of the
    // dasharray is the fraction of the path that is visible.
    const drawn = () => [...document.querySelectorAll("ol.rd-road mask path")]
      .map((p) => parseFloat(getComputedStyle(p).strokeDasharray));
    await page.waitForFunction(() => {
      const v = [...document.querySelectorAll("ol.rd-road mask path")].map((p) => parseFloat(getComputedStyle(p).strokeDasharray));
      return v.length > 0 && v.every((x) => x > 0.98);
    }, { timeout: 8000 }).catch(async () => {
      const state = await page.evaluate(drawn);
      throw new Error("segments not fully drawn; visible fraction per segment = " + JSON.stringify(state));
    });
  });

  await check("no vector-effect on any mask path (the trap that halved the road)", async () => {
    // ⛔ A code-level guard, not a pixel one. Motion draws the road by
    // normalising the dash pattern to pathLength="1" in the path's own user
    // space; `vector-effect: non-scaling-stroke` moves stroke geometry into
    // screen space, where preserveAspectRatio="none" stretches the path
    // non-uniformly, and the two disagree about its length. Every segment
    // drew to roughly half and stopped short of the next pin while the
    // dasharray still read fully drawn. A pixel sampler was tried for this
    // and fought puppeteer's screenshot API for an hour on a page whose hero
    // canvas repaints every frame; the property that caused the bug is
    // cheaper to assert than the pixels it produced.
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll("ol.rd-road mask path")]
        .map((p, i) => ({ i: i + 1, ve: getComputedStyle(p).vectorEffect || p.getAttribute("vector-effect") || "none" }))
        .filter((x) => x.ve !== "none"),
    );
    assert.equal(bad.length, 0, "mask path carries vector-effect on stop(s) " + bad.map((b) => b.i).join(", "));
  });

  await check("REDUCED MOTION: fully drawn, no mask, nothing scroll-driven", async () => {
    const p = await browser.newPage();
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await p.setViewport({ width: 1440, height: 900 });
    await p.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "networkidle0" });
    const r = await p.evaluate(() => ({
      masks: document.querySelectorAll(".rd mask").length,
      hiddenStops: [...document.querySelectorAll("ol.rd-road > li")].filter((li) => getComputedStyle(li).opacity !== "1").length,
      surfaces: document.querySelectorAll(".rd-surface").length,
    }));
    await p.close();
    assert.equal(r.masks, 0, `${r.masks} masks mounted under reduced motion — the road should be plain`);
    assert.equal(r.hiddenStops, 0, `${r.hiddenStops} stops are not fully visible under reduced motion`);
    assert.equal(r.surfaces, STOPS.length, "road segments missing under reduced motion");
  });

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

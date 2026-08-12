/**
 * Drives SystemCanvas in a real browser.
 *
 *     npm run build:client && node scripts/system-canvas-check.mjs [route]
 *
 * The unit spec (client/components/SystemCanvas.spec.tsx) covers the geometry
 * and the SMIL timing lists. Three things it CANNOT cover, because they only
 * exist once a browser has the SVG:
 *
 *   1. The animation is an infinite loop, so WCAG 2.2.2 requires a way to stop
 *      it. That is the HOLD button, and "the button exists" is not the test -
 *      the test is that the SVG timeline actually stops advancing.
 *   2. The loop must not run off-screen. An animation nobody can see is heat
 *      and battery, and this failure is completely invisible in a screenshot.
 *   3. The 390px layout must not push the page sideways.
 *
 * The canvas is exported but deliberately not wired into any page, so if it is
 * not on the route this SKIPS rather than fails. Once it is mounted, this runs.
 */

import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
const ROUTE = process.argv[2] || "/";

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(DIST, urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, {
        "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
      return;
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

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found - run `npm run build:client` first.");
  }

  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (url.startsWith(`http://localhost:${port}`) || url.startsWith("data:")) req.continue();
    else req.abort();
  });
  // `load`, not `networkidle0`. The canvas is mounted on the homepage, and the
  // homepage streams a looping hero video, so the network never goes idle and
  // networkidle0 sat here until it timed out. `load` plus a settle wait is the
  // correct signal for a page that holds a media connection open by design.
  await page.goto(`http://localhost:${port}${ROUTE}`, { waitUntil: "load", timeout: 30000 });
  await wait(1500);

  const mounted = await page.$("svg[data-system-canvas]");
  if (!mounted) {
    console.log(`SKIPPED - SystemCanvas is not mounted on ${ROUTE}.`);
    console.log("It is exported from client/components/SystemCanvas.tsx but not wired into a page.");
    await browser.close();
    server.close();
    return;
  }

  console.log(`SystemCanvas on ${ROUTE}\n`);
  const clock = () => page.$eval("svg[data-system-canvas]", (e) => e.getCurrentTime());

  await check("the timeline runs while the canvas is on screen", async () => {
    await page.evaluate(() =>
      document.querySelector("svg[data-system-canvas]").scrollIntoView({ block: "center" }),
    );
    await wait(400);
    const a = await clock();
    await wait(600);
    assert.ok((await clock()) - a > 0.2, "SVG animations are not advancing at all");
  });

  await check("HOLD stops the timeline, and pressing it again resumes (WCAG 2.2.2)", async () => {
    const button = await page.evaluateHandle(() => {
      const svg = document.querySelector("svg[data-system-canvas]");
      return svg.closest("div").querySelector("button[aria-pressed]");
    });
    const el = button.asElement();
    assert.ok(el, "no pause control next to the canvas - an infinite animation must be stoppable");
    await el.click();
    assert.strictEqual(
      await el.evaluate((e) => e.getAttribute("aria-pressed")),
      "true",
      "aria-pressed must follow the held state",
    );
    const held = await clock();
    await wait(600);
    assert.strictEqual(await clock(), held, "the timeline kept running while held");
    await el.click();
    const resumed = await clock();
    await wait(600);
    assert.ok((await clock()) - resumed > 0.2, "the timeline did not restart after HOLD was released");
  });

  await check("scrolling the canvas out of view stops the timeline", async () => {
    await page.evaluate(() => {
      document.body.style.paddingBottom = "5000px";
      const svg = document.querySelector("svg[data-system-canvas]");
      window.scrollTo(0, svg.getBoundingClientRect().bottom + window.scrollY + 2000);
    });
    await wait(700);
    const off = await clock();
    await wait(600);
    assert.strictEqual(await clock(), off, "the animation is still running off-screen");
    await page.evaluate(() => {
      document.body.style.paddingBottom = "";
      window.scrollTo(0, 0);
    });
  });

  await check("the picture is hidden from assistive tech and replaced with text", async () => {
    const state = await page.$eval("svg[data-system-canvas]", (e) => ({
      hidden: e.getAttribute("aria-hidden") === "true",
      focusables: e.querySelectorAll("[tabindex]").length,
      alt: (e.closest("div").parentElement.querySelector(".sr-only")?.textContent || "").length,
    }));
    assert.ok(state.hidden, 'the canvas needs aria-hidden="true" - it is decorative-with-meaning');
    assert.strictEqual(state.focusables, 0, "a focusable node inside an aria-hidden svg is a keyboard trap");
    assert.ok(state.alt > 80, "the visually-hidden text alternative is missing or too thin");
  });

  await check("no horizontal overflow at 390px", async () => {
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.reload({ waitUntil: "networkidle0" });
    const box = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    assert.ok(
      box.scrollW <= box.clientW + 1,
      `page scrolls sideways: ${box.scrollW}px of content in ${box.clientW}px`,
    );
  });

  await browser.close();
  server.close();

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

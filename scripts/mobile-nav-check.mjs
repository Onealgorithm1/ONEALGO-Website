/**
 * Drives the mobile navigation drawer on a 390x844 viewport.
 *
 *     npm run build:client && node scripts/mobile-nav-check.mjs
 *
 * This exists because the drawer had been screenshotted but never opened, and
 * it was comprehensively broken in a way no screenshot of the closed page and
 * no type check could show:
 *
 *   The panel is `position: fixed; inset: 0`. It used to be a child of the
 *   sticky header, which carries `backdrop-blur-xl` - and an element with a
 *   backdrop-filter becomes the containing block for its fixed-position
 *   descendants. So `inset-0` resolved to the 64px header, not the viewport.
 *   Measured: the panel was 390x64, the scrolling link list was 24px tall, and
 *   elementFromPoint over the middle of the "About" row returned the orange
 *   Contact button sitting underneath it. A finger aiming at the first nav item
 *   opened the contact page.
 *
 * That failure mode is silent and it comes back the moment someone moves the
 * JSX back inside <nav>, or adds a transform / filter / `contain` to any
 * ancestor. Assertion 1 is the guard. The rest cover what was measured broken
 * alongside it: sub-44px hit areas, and focus escaping the open drawer to the
 * skip link and header behind it.
 */

import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
const VIEWPORT = { width: 390, height: 844, isMobile: true, hasTouch: true };

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(DIST, urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, {
        "Content-Type":
          TYPES[path.extname(file)] || "application/octet-stream",
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

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found - run `npm run build:client` first.");
  }

  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // Third-party requests are blocked, as in prerender.mjs: none of them affect
  // the layout under test and all of them make the run slower and flakier.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    if (url.startsWith(`http://localhost:${port}`) || url.startsWith("data:")) {
      req.continue();
    } else {
      req.abort();
    }
  });

  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0", timeout: 30000 });

  console.log("mobile navigation, 390x844\n");

  await check("the hamburger opens the drawer", async () => {
    const burger = await page.$('nav button[aria-controls="mobile-nav"]');
    assert.ok(burger, "no button controlling #mobile-nav");
    assert.strictEqual(
      await burger.evaluate((e) => e.getAttribute("aria-expanded")),
      "false",
      "aria-expanded should start false",
    );
    assert.ok(
      await burger.evaluate((e) => (e.getAttribute("aria-label") || "").trim().length > 0),
      "the icon-only trigger needs an accessible name",
    );
    await burger.click();
    await page.waitForSelector("#mobile-nav", { timeout: 5000 });
    assert.strictEqual(
      await burger.evaluate((e) => e.getAttribute("aria-expanded")),
      "true",
      "aria-expanded must follow the open state",
    );
  });

  // THE regression. Everything else in the drawer can be correct and the menu
  // still unusable if this one is wrong.
  await check("the drawer fills the viewport, not its nearest filtered ancestor", async () => {
    const box = await page.$eval("#mobile-nav", (e) => {
      const r = e.getBoundingClientRect();
      return { w: r.width, h: r.height, top: r.top, left: r.left };
    });
    // Exact match, not ">=". A containing block that is TALLER than the
    // viewport is the same bug wearing a different mask: the drawer stretches
    // to the height of the whole page, so the CTA pinned to its "bottom" ends
    // up thousands of pixels below the fold. Only the viewport itself gives
    // inset-0 the size of the screen.
    const off = (a, b) => Math.abs(a - b) > 1;
    assert.ok(
      !off(box.h, VIEWPORT.height) && !off(box.w, VIEWPORT.width) && !off(box.top, 0) && !off(box.left, 0),
      `panel is ${Math.round(box.w)}x${Math.round(box.h)} at (${Math.round(box.left)}, ${Math.round(box.top)}), ` +
        `expected exactly ${VIEWPORT.width}x${VIEWPORT.height} at the origin. An ancestor is ` +
        "applying a backdrop-filter, filter, transform or `contain`, which makes " +
        "it - not the viewport - the containing block for `position: fixed`.",
    );
  });

  await check("the first nav row is what a finger actually hits", async () => {
    const hit = await page.evaluate(() => {
      const link = document.querySelector('#mobile-nav a[href="/about"]');
      const r = link.getBoundingClientRect();
      const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return { isTheLink: !!(top && link.contains(top)), got: top ? top.textContent.trim().slice(0, 40) : "nothing" };
    });
    assert.ok(hit.isTheLink, `tapping the About row would hit "${hit.got}" instead`);
  });

  await check("the page behind is scroll-locked and does not chain", async () => {
    assert.strictEqual(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
      "body should be locked while the drawer is open",
    );
    const chaining = await page.$eval("#mobile-nav .overflow-y-auto", (e) =>
      getComputedStyle(e).overscrollBehavior,
    );
    assert.ok(
      chaining.startsWith("contain") || chaining.startsWith("none"),
      `the scrolling list has overscroll-behavior: ${chaining} - reaching the end hands the gesture to the page behind`,
    );
  });

  await check("both dropdowns open, and every row is at least 44px", async () => {
    for (const id of ["mobile-services", "mobile-industries"]) {
      const toggle = await page.$(`#mobile-nav button[aria-controls="${id}"]`);
      assert.ok(toggle, `no toggle for ${id}`);
      await toggle.click();
      await page.waitForSelector(`#${id}`, { timeout: 5000 });
    }
    const small = await page.$$eval("#mobile-nav a, #mobile-nav button", (nodes) =>
      nodes
        .map((n) => ({ h: n.getBoundingClientRect().height, label: (n.textContent || n.getAttribute("aria-label") || "").trim().slice(0, 30) }))
        .filter((n) => n.h < 44),
    );
    assert.strictEqual(
      small.length,
      0,
      "under 44px (WCAG 2.5.5): " + small.map((s) => `"${s.label}" ${s.h.toFixed(1)}px`).join(", "),
    );
  });

  await check("focus is trapped in the drawer", async () => {
    // 40 is comfortably more than one lap of the open drawer, so a single
    // escape anywhere in the cycle shows up.
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => {
        const menu = document.getElementById("mobile-nav");
        return !!(menu && document.activeElement && menu.contains(document.activeElement));
      });
      assert.ok(
        inside,
        `focus left the open drawer after ${i + 1} tabs - the page behind is reachable but invisible`,
      );
    }
  });

  await check("Escape closes it and hands focus back to the hamburger", async () => {
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.getElementById("mobile-nav"), { timeout: 5000 });
    const back = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-controls") === "mobile-nav",
    );
    assert.ok(back, "focus should return to the trigger, not fall to <body>");
    assert.strictEqual(
      await page.evaluate(() => document.body.style.overflow),
      "",
      "the scroll lock must be released on close",
    );
  });

  await check("crossing the lg breakpoint with it open does not freeze the page", async () => {
    // Rotating a tablet crosses 1024px. `lg:hidden` takes the drawer off
    // screen (the header moved from md to lg on 2026-08-25 because the desktop
    // nav overflowed at 768–1023px), and if the state does not follow, the
    // scroll lock and the `inert` on everything else stay on with nothing
    // visible to undo them. A phone in landscape (844px) now keeps the drawer,
    // which is the intended behaviour, so it is not the width used here.
    await page.click('nav button[aria-controls="mobile-nav"]');
    await page.waitForSelector("#mobile-nav", { timeout: 5000 });
    await page.setViewport({ width: 1180, height: 820, isMobile: true, hasTouch: true });
    await page.waitForFunction(() => !document.getElementById("mobile-nav"), { timeout: 5000 })
      .catch(() => { throw new Error("the drawer is still mounted past the lg breakpoint"); });
    const stuck = await page.evaluate(() => ({
      overflow: document.body.style.overflow,
      inert: document.querySelector("nav").hasAttribute("inert") || document.querySelector("main").hasAttribute("inert"),
    }));
    assert.strictEqual(stuck.overflow, "", "the page is still scroll-locked with no drawer on screen");
    assert.ok(!stuck.inert, "the page is still inert with no drawer on screen");
    await page.setViewport(VIEWPORT);
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

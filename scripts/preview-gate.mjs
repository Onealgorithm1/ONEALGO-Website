/**
 * Every Preview button opens something a visitor can SEE and SCROLL. Gate for the website-development pages.
 *
 *     node scripts/preview-gate.mjs https://<branch>.onealgo-builderio.pages.dev   (or https://onealgorithm.com)
 *     node scripts/preview-gate.mjs <base> /services/website-development /services/website-development/<town>
 *
 * WHY. 2026-10-29 Louis: "if you open every preview, they can't be previewed properly. I can't scroll." Phantom
 * had added X-Frame-Options SAMEORIGIN + frame-ancestors 'self'; its Preview painted the browser's blank error page,
 * and a swipe over it scrolled the page behind the dialog instead. A refused frame fires no error event, so nothing
 * in the page noticed. This opens every Preview at desktop and phone size and fails on:
 *   - a blank dialog (refused/errored iframe, or a capture image that did not decode),
 *   - content that does not scroll (wheel on desktop; scrollTop on the phone's touch layout),
 *   - the page behind the dialog moving while it is open,
 *   - Esc not closing it / focus not returning to the button.
 * It needs a base URL with Pages Functions (a deployed preview or `wrangler pages dev dist/spa`): the live frame
 * check is /api/frame-check. It also prints the header verdict per site (shared/frame-policy.js), so a client's
 * header change shows up here before a visitor finds it.
 */
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { frameAllowed } from "../shared/frame-policy.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const [BASE, ...argRoutes] = process.argv.slice(2);
if (!BASE) throw new Error("usage: node scripts/preview-gate.mjs <base-url> [routes...]");
const ROUTES = argRoutes.length ? argRoutes : ["/services/website-development"];

const workSrc = fs.readFileSync(path.join(ROOT, "client", "data", "work.ts"), "utf8");
const SITES = [...workSrc.matchAll(/slug:\s*"([a-z0-9-]+)"[\s\S]*?\burl:\s*"([^"]+)"/g)].map((m) => ({ slug: m[1], url: m[2] }));

let passed = 0;
const failures = [];
const check = async (label, fn) => {
  try { await fn(); passed++; console.log("  ok    " + label); }
  catch (e) { failures.push(label); console.log("  FAIL  " + label + "\n        " + e.message); }
};

console.log(`\nPreview gate — ${BASE}\n\nHeaders (framed from ${new URL(BASE).origin}):`);
for (const s of SITES) {
  const r = await fetch(s.url, { redirect: "follow" }).catch(() => null);
  const v = r ? frameAllowed(r.headers, new URL(BASE).origin) : { allowed: false, reason: "unreachable" };
  console.log(`  ${v.allowed ? "frames " : "capture"} ${s.slug.padEnd(18)} ${v.reason}`);
  assert.ok(fs.existsSync(path.join(ROOT, "public", "work", `${s.slug}-full.webp`)), `${s.slug}-full.webp missing: no fallback`);
}

const VIEWS = [
  { name: "desktop 1440", viewport: { width: 1440, height: 900 } },
  { name: "phone 390", viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true } },
];
const browser = await puppeteer.launch({ headless: "new" });
try {
  for (const route of ROUTES) for (const view of VIEWS) {
    console.log(`\n${route} @ ${view.name}`);
    const page = await browser.newPage();
    await page.setViewport(view.viewport);
    await page.goto(BASE + route, { waitUntil: "load", timeout: 60000 });
    await page.waitForSelector("button.wd-preview", { timeout: 20000 }).catch(() => {}); // a non-prerendered build renders after load
    const n = await page.$$eval("button.wd-preview", (b) => b.length);
    await check(`${route}: has Preview buttons`, () => assert.ok(n > 0, "no button.wd-preview on the page"));
    for (let i = 0; i < n; i++) {
      const btn = (await page.$$("button.wd-preview"))[i];
      const slug = await btn.evaluate((b) => b.dataset.preview);
      await btn.evaluate((b) => b.scrollIntoView({ block: "center" }));
      // The page smooth-scrolls (scroll-behavior): click only once scrollY holds still, or the click misses.
      await page.waitForFunction(() => new Promise((r) => { const y = scrollY; setTimeout(() => r(scrollY === y), 300); }), { timeout: 5000 }).catch(() => {});
      await btn.click();
      await page.waitForSelector("dialog.wk-modal[open]", { timeout: 5000 });
      // Settled = the capture image is decoded, or the iframe has fired load (data-loaded).
      await page.waitForFunction(() => {
        const d = document.querySelector("dialog.wk-modal[open]");
        const img = d?.querySelector(".wk-modal-scroll img");
        return (img && img.complete && img.naturalWidth > 0) || d?.querySelector(".wk-frame-wrap[data-loaded] iframe");
      }, { timeout: 20000 }).catch(() => {});
      const behind0 = await page.evaluate(() => scrollY);
      /* Desktop: a real mouse wheel over the dialog body, twice, the second far past the end, so a scroll that
         chains to the page behind fails the "page behind" assert. Phone: headless Chrome does not scroll on
         synthesized touch (CDP synthesizeScrollGesture and touchscreen.touchMove both no-op, tested 2026-10-29), so
         it scrolls programmatically and asserts the page lock instead. Real finger swipes: the Android emulator run
         (~/scripts/android-emu, `adb shell input swipe`), done by hand before a release. */
      const scrollDialog = async (sel) => {
        assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY), "hidden", "page behind the open dialog is not locked (html overflow)");
        if (view.viewport.hasTouch) {
          const fh2 = await page.$("dialog.wk-modal[open] iframe");
          if (fh2) await (await fh2.contentFrame()).evaluate(() => scrollBy(0, 600));
          else await page.$eval(sel, (e) => e.scrollBy(0, 600));
          await new Promise((r) => setTimeout(r, 500));
          return;
        }
        const at = await page.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height * 0.6) }; });
        for (const dy of [700, 100000]) {
          await page.mouse.move(at.x, at.y);
          await page.mouse.wheel({ deltaY: dy });
          await new Promise((r) => setTimeout(r, 700));
        }
      };
      await check(`${slug} #${i}: visible and scrolls`, async () => {
        const fh = await page.$("dialog.wk-modal[open] iframe");
        if (fh) {
          const fr = await fh.contentFrame();
          assert.ok(fr && !/^chrome-error|^about:blank/.test(fr.url()), `iframe is the browser's refusal page (${fr?.url()})`);
          // Client-rendered sites (Gorband, Starzi) paint text after the frame's load event.
          await fr.waitForFunction(() => (document.body?.innerText.length || 0) > 50, { timeout: 10000 }).catch(() => {});
          const t = await fr.evaluate(() => ({ text: document.body?.innerText.length || 0, h: document.documentElement.scrollHeight, vh: innerHeight }));
          assert.ok(t.text > 50, `iframe has ${t.text} characters of text: blank`);
          assert.ok(t.h > t.vh, `framed page is ${t.h}px in a ${t.vh}px frame: nothing to scroll`);
          await scrollDialog("dialog.wk-modal[open] iframe");
          assert.ok((await fr.evaluate(() => scrollY)) > 0, "the frame did not scroll");
        } else {
          const ok = await page.$eval("dialog.wk-modal[open] .wk-modal-scroll img", (img) => img.complete && img.naturalWidth > 0).catch(() => false);
          assert.ok(ok, "capture image did not decode");
          await scrollDialog("dialog.wk-modal[open] .wk-modal-scroll");
          const top = await page.$eval("dialog.wk-modal[open] .wk-modal-scroll", (e) => e.scrollTop);
          assert.ok(top > 0, `the capture did not scroll (scrollTop ${top})`);
        }
        assert.equal(Math.round(await page.evaluate(() => scrollY)), Math.round(behind0), "the page behind the dialog scrolled");
      });
      await page.keyboard.press("Escape");
      await check(`${slug} #${i}: Esc closes, focus returns to its Preview button`, async () => {
        await page.waitForFunction(() => !document.querySelector("dialog.wk-modal[open]"), { timeout: 3000 });
        assert.ok(await btn.evaluate((b) => document.activeElement === b), "focus did not return to the opener");
      });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);

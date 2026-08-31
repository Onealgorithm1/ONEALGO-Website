#!/usr/bin/env node
/**
 * Render the OneAlgorithm wordmark to a PNG for the email signature.
 *
 * ⛔ Why an image and not live text + an inline globe: the lockup has to survive being
 * copied out of a browser and pasted into the Outlook web signature editor. A run of
 * styled spans with an <img> sitting between them does not — the clipboard round-trip
 * re-flows the image and the globe drifts off the baseline. One PNG cannot drift.
 *
 * ⛔ And not the Brand_Assets "One Algo logo.png" either: that artwork sets Algorithm in
 * navy (#0c366b), while the live site renders it in brand blue #005eaa
 * (client/global.css --onealgo-blue-950). Recolouring old artwork would be guesswork, so
 * this composes the mark the same way the site does — real text in the real self-hosted
 * IBM Plex Sans, plus the real globe — and screenshots it at 2x.
 *
 *   node scripts/render-wordmark.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "sig", "wordmark.png");
const DISPLAY_H = 30; // the wordmark's display height in the signature

const font = readFileSync(join(ROOT, "public", "fonts", "ibm-plex-sans-latin-wght-normal.woff2")).toString("base64");
const globe = readFileSync(join(ROOT, "public", "globe-logo.png")).toString("base64");

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  @font-face {
    font-family: 'IBM Plex Sans';
    src: url(data:font/woff2;base64,${font}) format('woff2');
    font-weight: 100 700;
  }
  html, body { margin: 0; padding: 0; background: #fff; }
  /* Mirrors client/components/OneAlgorithmText.tsx: orange One, blue Alg + rithm, the
     globe standing in for the "o", vertically centred by the flex row (items-center). */
  #m {
    display: inline-flex; align-items: center; white-space: nowrap;
    font-family: 'IBM Plex Sans'; font-weight: 700; font-size: 26px;
    letter-spacing: -0.3px; line-height: 1; padding: 3px 2px;
  }
  #m .o { color: #ffa634; }
  #m .b { color: #005eaa; }
  #m img { width: 24px; height: 24px; display: block; }
</style></head><body><span id="m"><span class="o">One</span><span class="b">Alg</span><img src="data:image/png;base64,${globe}"><span class="b">rithm</span></span></body></html>`;

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
// 2x so the PNG stays crisp on a high-DPI screen at its 30px display height
await page.setViewport({ width: 600, height: 120, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluateHandle("document.fonts.ready");

const el = await page.$("#m");
mkdirSync(dirname(OUT), { recursive: true });
const shot = await el.screenshot({ omitBackground: false });
await browser.close();

writeFileSync(OUT, shot);
const { default: sharp } = await import("sharp");
const meta = await sharp(OUT).metadata();
console.log(`wordmark.png ${meta.width}x${meta.height} -> display ${Math.round(meta.width / 2)}x${Math.round(meta.height / 2)}`);
console.log(`set MARK_W/MARK_H in build-signatures.mjs to ${Math.round(meta.width / 2)} x ${Math.round(meta.height / 2)}`);

/**
 * Screenshots the top of one page per hero class, at 390 and 1440, so the
 * inner-page heroes can actually be looked at rather than reasoned about.
 *
 *     npm run build:client && node scripts/hero-shots.mjs
 *
 * Writes PNGs to build-artifacts/hero-shots/. Also asserts the two things a
 * screenshot cannot show: no horizontal overflow at 390, and every link in the
 * hero at least 44px tall.
 */
import assert from "node:assert";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
const OUT = path.join(__dirname, "..", "build-artifacts", "hero-shots");
// 0 lets the OS hand out a free port. A fixed 4181 meant a leaked server from
// an earlier failed run took the whole script down with EADDRINUSE - the same
// lesson scripts/prerender.mjs already learned.
const PORT = 0;

const ROUTES = [
  ["service-leaf", "/services/salesforce"],
  ["service-hub", "/services"],
  ["industry-leaf", "/industries/government"],
  ["industry-other", "/industries/construction"],
  ["company", "/about"],
  ["company-caps", "/capabilities"],
  ["utility", "/privacy"],
  ["company-contact", "/contact"],
  ["notfound", "/nope"],
];

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm",
  ".pdf": "application/pdf", ".txt": "text/plain", ".xml": "application/xml",
};

function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(DIST, urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(DIST, "index.html")).pipe(res);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: "new" });
  let failed = 0;

  for (const [width, tag, mobile] of [[390, "390", true], [1440, "1440", false]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: mobile ? 844 : 900, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
    for (const [name, route] of ROUTES) {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: "networkidle0" });
      await page.waitForSelector("h1", { timeout: 10000 });
      await sleep(350);
      await page.screenshot({ path: path.join(OUT, `${name}-${tag}.png`) });

      const doc = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        heroH: document.querySelector("main section")?.getBoundingClientRect().height ?? 0,
        // Links inside a <p> are inline prose links (the Services lede names
        // three industries mid-sentence). WCAG 2.5.5 exempts those; padding
        // them to 44px would break the line box they sit in.
        smallLinks: [...document.querySelectorAll("main section:first-of-type a")]
          .filter((a) => !a.closest("p"))
          .map((a) => [a.textContent.trim().slice(0, 28), Math.round(a.getBoundingClientRect().height)])
          .filter(([, h]) => h > 0 && h < 44),
      }));
      const overflow = doc.scrollW - doc.clientW;
      const bad = (mobile && overflow > 1) || doc.smallLinks.length > 0;
      if (bad) failed++;
      console.log(
        `${bad ? "FAIL" : "ok  "} ${tag.padStart(4)} ${route.padEnd(26)} hero ${String(Math.round(doc.heroH)).padStart(4)}px  overflow ${overflow}` +
          (doc.smallLinks.length ? `  under-44px: ${JSON.stringify(doc.smallLinks)}` : ""),
      );
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(failed === 0 ? "\nAll hero checks passed." : `\n${failed} check(s) failed.`);
  assert.equal(failed, 0, "hero layout checks failed");
}

main().catch((e) => { console.error(e); process.exit(1); });

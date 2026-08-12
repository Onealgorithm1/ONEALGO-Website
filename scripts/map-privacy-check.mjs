/**
 * The contact page must not talk to Google before a visitor asks it to.
 *
 * The map used to be a bare <iframe src="google.com/maps/embed">, which is not
 * a picture of a map -- it is a live connection that opens the instant the page
 * does, handing Google the visitor's IP and the page they were on, and letting
 * it set cookies, with no click and no way to decline. On the CONTACT page that
 * is every prospect the business has, disclosed to a third party they never
 * chose, and it is the wrong side of EU/UK rules that want consent BEFORE the
 * request rather than after.
 *
 * This is exactly the kind of regression nothing else would catch. It is
 * invisible on screen: put the iframe back and the page looks BETTER, because
 * the map is simply there. tsc, vitest and the build all stay green. The only
 * way to see it is to watch the network on a real page load, so that is what
 * this does.
 *
 *   node scripts/map-privacy-check.mjs [origin]
 *
 * Defaults to http://localhost:4223 and serves dist/spa itself, so it needs a
 * build but no separately-running server.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

/** Hosts the MAP would reach. This is what the gate is for. */
const MAP_HOSTS = /(^|\.)(google\.com|maps\.googleapis\.com|maps\.gstatic\.com)$/i;

/** Analytics is a SEPARATE, deliberate decision, disclosed in the privacy
 *  policy, and it is not what this check gates. It is still counted and
 *  printed, because it fires before any consent too, and under EU/UK ePrivacy
 *  that is arguably the same problem — see the open TKTK in Privacy.tsx. Kept
 *  visible rather than filtered out so nobody forgets it is there. */
const ANALYTICS_HOSTS = /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com)$/i;

/** Fonts. These MUST stay at zero: the faces are self-hosted from /fonts, and a
 *  request here would mean a third party is seeing visitor IPs again. */
const FONT_HOSTS = /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/i;

let passed = 0;
const failures = [];
const check = (label, fn) => {
  try {
    fn();
    passed++;
    console.log(`  ok    ${label}`);
  } catch (error) {
    failures.push(label);
    console.log(`  FAIL  ${label}\n        ${error.message}`);
  }
};

function serve() {
  return http.createServer((req, res) => {
    const clean = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(DIST, clean);
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      // SPA fallback, so /contact resolves without needing a prerender pass.
      file = path.join(DIST, "index.html");
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found — run `npm run build:client` first.");
  }

  const server = serve();
  await new Promise((r) => server.listen(4223, r));
  const origin = process.argv[2] || "http://localhost:4223";

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const map = [];
  const analytics = [];
  const fonts = [];
  page.on("request", (req) => {
    const { hostname } = new URL(req.url());
    if (MAP_HOSTS.test(hostname)) map.push(hostname);
    else if (ANALYTICS_HOSTS.test(hostname)) analytics.push(hostname);
    else if (FONT_HOSTS.test(hostname)) fonts.push(hostname);
  });

  console.log("contact page, third-party requests\n");

  await page.goto(`${origin}/contact`, { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4000));

  const mapBeforeClick = [...map];
  check("the map contacts Google only after the visitor asks", () => {
    if (mapBeforeClick.length)
      throw new Error(
        `${mapBeforeClick.length} request(s) to ${[...new Set(mapBeforeClick)].join(", ")} on load`,
      );
  });

  check("no third-party font request (the faces are self-hosted)", () => {
    if (fonts.length)
      throw new Error(`${[...new Set(fonts)].join(", ")} — visitor IPs are leaking to a font CDN`);
  });

  const button = await page.evaluateHandle(() =>
    [...document.querySelectorAll("button")].find((b) => /load the map/i.test(b.textContent || "")),
  );
  const el = button.asElement();
  if (!el) {
    failures.push("a Load-the-map control exists");
    console.log("  FAIL  a Load-the-map control exists");
  } else {
    passed++;
    console.log("  ok    a Load-the-map control exists");
    await el.click();
    await new Promise((r) => setTimeout(r, 4000));

    check("clicking it does load the map", () => {
      if (!map.length) throw new Error("clicked, but nothing was requested from Google");
    });
  }

  await browser.close();
  server.close();

  // Not pass/fail — a standing note. Analytics fires on load, before any
  // consent, on every page. That is a business and legal decision rather than a
  // defect, and it is an open question in Privacy.tsx. Printed rather than
  // filtered out so nobody forgets it is there.
  const seen = [...new Set(analytics)].join(", ") || "none";
  console.log(
    `\nnote: ${analytics.length} analytics request(s) before any consent (${seen}) — deliberate and disclosed, but ungated.`,
  );

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

/**
 * Prerender the built SPA into static HTML per route.
 * Run AFTER `pnpm build` (needs dist/spa to exist):  node scripts/prerender.mjs
 *
 * For each route it launches the built app in a headless browser, waits for React
 * to render + the per-page <title>/meta to apply, then writes the fully-rendered
 * HTML to dist/spa/<route>/index.html. Crawlers and social previews then get a
 * complete page instead of a blank shell. The client JS still boots and takes over.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist", "spa");
// 0 lets the OS hand out a free port, and the real one is read back from the
// listening server below. A fixed 5055 meant a stale process from an earlier run,
// or a second build on the same machine, failed the whole thing with EADDRINUSE.
const PORT = 0;

// ⛔ A route missing from this list is a 404 in production, not a slow page.
// Every route here becomes a static file; anything routed only in App.tsx has
// no file for Cloudflare to serve. /services/application-development shipped
// on 2026-08-29 routed but unlisted, and 404'd live while every neighbouring
// service page worked. When you add a page to App.tsx, add it here too.
const ROUTES = [
  "/", "/about", "/services", "/industries", "/contact", "/capabilities",
  "/ai-info", "/privacy", "/terms", "/services/website-development", "/services/marketing", "/services/seo",
  "/services/martech", "/services/google-ads", "/services/staff-augmentation",
  "/services/it-consulting", "/services/operations-technology",
  "/services/oracle-erp", "/services/salesforce", "/services/zendesk",
  "/services/application-development",
  "/industries/construction", "/industries/manufacturing", "/industries/ecommerce",
  "/industries/marketing", "/industries/website-development", "/industries/government",
];

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4",
  ".webm": "video/webm", ".pdf": "application/pdf", ".txt": "text/plain",
  ".xml": "application/xml", ".webmanifest": "application/manifest+json",
};

// Static server with SPA fallback so any route loads index.html.
function serve() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(DIST, urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
      return;
    }
    // fallback → index.html (client routing takes over)
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(DIST, "index.html")).pipe(res);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found — run `pnpm build` first.");
  }
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const port = server.address().port;

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let ok = 0, failed = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      // Third-party requests are blocked for the render. Waiting for
      // networkidle0 meant every page also waited on Google Analytics and
      // Unsplash, so build time and build reliability depended on services we
      // do not control - and none of it affects the HTML we capture.
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const url = req.url();
        if (url.startsWith(`http://localhost:${port}`) || url.startsWith("data:")) {
          req.continue();
        } else {
          req.abort();
        }
      });

      await page.goto(`http://localhost:${port}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      await sleep(300); // let the useSEO setTimeout(0) apply title/meta
      // sanity: #root should have real content
      const rootLen = await page.evaluate(() => document.getElementById("root")?.innerHTML.length || 0);
      const title = await page.title();

      // Actually act on that sanity check. rootLen was measured and printed but
      // never tested, so a route whose chunk failed to load was written out as a
      // blank page and counted as a success - the build passed while publishing
      // an empty document. The threshold is deliberately low; it is catching
      // "nothing rendered", not "rendered a bit less than usual".
      if (rootLen < 500) {
        throw new Error(`rendered only ${rootLen} chars of content — treating as a failed route`);
      }

      // Settle the scroll reveals before serialising.
      //
      // Sections animate in with framer-motion's whileInView, which sets an
      // inline `opacity: 0; transform: translateY(16px)` until the element is
      // scrolled into view. Puppeteer renders at one viewport height, so
      // everything below the fold was being captured mid-animation - 22 of 27
      // pages shipped static HTML whose main content was invisible, and the
      // whole point of prerendering is to serve content without JavaScript.
      //
      // Scrolling the page triggers every reveal; `once: true` means they stay
      // put. The final sweep is belt and braces for anything the scroll missed
      // (a lazily-mounted block, a reveal with a long delay).
      await page.evaluate(async () => {
        const step = window.innerHeight;
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await wait(60);
        }
        window.scrollTo(0, document.body.scrollHeight);
        // Long enough for the slowest chain to finish. The services hub
        // staggers 11 cards at 60ms plus a 350ms tween, so anything under a
        // second leaves the tail of that grid still at opacity 0.
        await wait(1200);
        window.scrollTo(0, 0);
        await wait(200);

        // Force anything still parked to its resting state, then do it again a
        // beat later: the animation loop can re-apply an inline style between
        // the sweep and serialisation, so a single pass is racy.
        const settle = () => {
          for (const el of document.querySelectorAll("[style]")) {
            const s = el.style;
            if (s.opacity === "0") s.opacity = "1";
            if (s.transform && /translateY\((?!0px)/.test(s.transform)) {
              s.transform = "none";
            }
          }
        };
        // ⛔ Poll, do not count. Two fixed passes still lost the race on
        // /about — 3 of 7 runs on 2026-08-25 tripped the gate below with one
        // element at opacity 0, because the animation loop re-applied its
        // inline style after the second sweep. So sweep until the DOM has no
        // inline `opacity: 0` left, or give up after ~2s and let the gate say
        // so; a flake that fails loudly beats one that ships hidden content.
        for (let pass = 0; pass < 12; pass++) {
          settle();
          await wait(150);
          if (!document.querySelector('[style*="opacity: 0"]')) break;
        }
      });

      /* Strip runtime-only UI before serialising.
         ⛔ page.content() returns the DOM as it stands AFTER scripts have run,
         so anything appended at runtime gets baked into the static file. The
         cookie banner did exactly that on 2026-08-29: every prerendered page
         shipped with a hard-coded <div id="oa-consent">, and because the
         runtime script returns early once a choice is stored, that copy never
         got its click handlers. The banner was visible and its buttons did
         nothing -- including for visitors who had already accepted.
         Anything injected by script rather than rendered by React belongs
         here. */
      await page.evaluate(() => {
        document.querySelectorAll("#oa-consent").forEach((n) => n.remove());
      });

      const html = "<!doctype html>\n" + (await page.content());

      // Write "/about" as about.html, not about/index.html — Cloudflare Pages serves
      // the former at /about directly, while the latter 308-redirects to /about/ and
      // would change every canonical URL on the site.
      const outFile = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html);

      // Fail the build if a page is about to ship content that is invisible
      // without JavaScript. This is not hypothetical: adding scroll reveals put
      // `opacity: 0` into the static HTML of 22 of these 27 pages at once, and
      // nothing caught it - the pages still built, still had the right title,
      // still passed the length check above. A prerendered page whose body is
      // transparent is worse than no prerender at all.
      const hiddenOpacity = (html.match(/opacity:\s*0(?![.\d])/g) || []).length;
      const hiddenShift = (html.match(/transform:\s*translateY\(\s*[1-9]\d*px/g) || []).length;
      if (hiddenOpacity || hiddenShift) {
        throw new Error(
          `ships content hidden without JS (opacity:0 ×${hiddenOpacity}, translateY ×${hiddenShift}) — ` +
            `a scroll reveal was captured mid-animation`,
        );
      }
      console.log(`✓ ${route.padEnd(38)} (${rootLen} chars) — "${title.slice(0, 50)}"`);
      ok++;
    } catch (e) {
      console.log(`✗ ${route}  — ${e.message}`);
      failed.push(route);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${ok}/${ROUTES.length} routes.` + (failed.length ? ` Failed: ${failed.join(", ")}` : ""));
  if (failed.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });

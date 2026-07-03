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
const PORT = 5055;

const ROUTES = [
  "/", "/about", "/services", "/industries", "/contact", "/capabilities", "/blog",
  "/ai-info", "/privacy", "/terms", "/careers", "/events",
  "/services/website-development", "/services/marketing", "/services/seo",
  "/services/martech", "/services/google-ads", "/services/staff-augmentation",
  "/services/it-consulting", "/services/operations-technology",
  "/services/oracle-erp", "/services/salesforce", "/services/zendesk",
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

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let ok = 0, failed = [];

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      await sleep(300); // let the useSEO setTimeout(0) apply title/meta
      // sanity: #root should have real content
      const rootLen = await page.evaluate(() => document.getElementById("root")?.innerHTML.length || 0);
      const title = await page.title();
      const html = "<!doctype html>\n" + (await page.content());

      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
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

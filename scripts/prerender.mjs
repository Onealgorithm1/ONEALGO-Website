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
import Beasties from "beasties";

/* Routes written with React hydration markers (client/App.tsx hydrateRoot): Salesforce + website-development set. */
/* The three website-development service pages (2026-10-24) are on the same v2 kit as the hub and the place pages. */
const WD_SERVICE = new Set(["/services/website-cost", "/services/small-business-website-design", "/services/website-redesign"]);
const hydrated = (r) => r.startsWith("/services/salesforce") || r.split("?")[0] === "/services/website-development" || r.startsWith("/services/web-design-") || WD_SERVICE.has(r);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// OA_DIST lets a gate run prerender a build that lives outside the repo (vite build --outDir X; OA_DIST=X).
const DIST = process.env.OA_DIST ? path.resolve(process.env.OA_DIST) : path.join(__dirname, "..", "dist", "spa");
const beasties = new Beasties({ path: DIST, publicPath: "/", preload: "swap", pruneSource: false, logLevel: "warn" });
// Beasties drops the metric-matched fallback @font-face rules (no src url), so text first paints in
// plain Arial and jumps when IBM Plex arrives (preview CLS up to 0.17). Re-inline them: CLS 0.
let fontFallbacks = null;
const withFallbacks = (html) => {
  fontFallbacks ??= [...new Set(fs.readdirSync(path.join(DIST, "assets")).filter((n) => n.endsWith(".css"))
    .flatMap((n) => fs.readFileSync(path.join(DIST, "assets", n), "utf8").match(/@font-face\{font-family:[^;}]*Fallback[^}]*\}/g) || []))].join("");
  return html.replace("<style>", `<style>${fontFallbacks}`);
};
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
  "/services/it-consulting",
  "/services/salesforce", "/services/zendesk",
  "/services/application-development",
  "/services/web-design-chester-county", "/services/web-design-philadelphia",
  "/services/seo-chester-county",
  "/services/google-ads-philadelphia",
  "/services/salesforce-consultant-philadelphia",
  "/services/salesforce-consultant-chester-county",
  "/services/salesforce-consulting-partner-pennsylvania",
  "/services/salesforce-implementation-cost",
  "/services/salesforce-data-migration",
  "/services/salesforce-integration",
  "/services/salesforce-managed-services",
  "/services/salesforce-health-check",
  "/services/salesforce-marketing-cloud-consulting",
  "/services/salesforce-consultant-new-york",
  "/services/salesforce-consultant-washington-dc",
  "/services/salesforce-consultant-dallas",
  "/services/salesforce-consultant-denver",
  "/services/salesforce-consultant-atlanta",
  "/services/salesforce-consultant-boston",
  "/services/salesforce-consultant-seattle",
  "/services/salesforce-consultant-san-francisco",
  "/services/salesforce-consultant-los-angeles",
  "/services/salesforce-consultant-austin",
  "/services/salesforce-consultant-miami",
  "/services/salesforce-consultant-chicago",
  "/services/salesforce-consultant-houston",
  "/services/operational-transformation-consulting",
  "/industries/construction", "/industries/manufacturing", "/industries/ecommerce",
  "/industries/marketing", /* /industries/website-development: 301 in _redirects (2026-10-24) */ "/industries/government",
  ...WD_SERVICE,
];
/* Generated web-design place pages (scripts/wd-local-gen.mjs): paths from client/data/wd-local/places.ts, the same index App.tsx maps. */
{
  const src = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "client", "data", "wd-local", "places.ts"), "utf8");
  for (const p of JSON.parse(src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1))) ROUTES.push(p.path);
}

const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4",
  ".webm": "video/webm", ".pdf": "application/pdf", ".txt": "text/plain",
  ".xml": "application/xml", ".webmanifest": "application/manifest+json",
};

// Static server with SPA fallback so any route loads index.html.
let SHELL = null;
function serve(feed) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/api/blog") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(feed);
      return;
    }
    let file = path.join(DIST, urlPath);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
      return;
    }
    // fallback → index.html (client routing takes over)
    res.writeHead(200, { "Content-Type": "text/html" });
    // Serve the ORIGINAL shell, captured before any route is written: prerendering "/" overwrites dist/index.html with
    // the home page (beasties-inlined CSS), and every later route would inherit that markup and its reveal rules.
    res.end(SHELL);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/spa/index.html not found — run `pnpm build` first.");
  }
  // Verification escape hatch: the sandbox has no network. Never read fixtures
  // in the production Pages Function; normal builds still use the live feed.
  const feed = process.env.BLOG_FEED_FIXTURE
    ? fs.readFileSync(path.resolve(process.env.BLOG_FEED_FIXTURE), "utf8")
    : await fetch(`${process.env.BLOGGER_URL || "https://onealgorithm-blog-test.blogspot.com"}/feeds/posts/default?alt=json&max-results=50`, {
        signal: AbortSignal.timeout(15000),
      }).then((response) => {
        if (!response.ok) throw new Error(`Blogger feed returned ${response.status}`);
        return response.text();
      });
  const parsedFeed = JSON.parse(feed);
  if (!parsedFeed.feed || !Array.isArray(parsedFeed.feed.entry ?? [])) {
    throw new Error("Blogger response is not a posts feed");
  }
  // /blog/author/<slug> is a fixed route (client/lib/authors.ts), not
  // discovered from the feed — seed it so it prerenders and so the discovery
  // regex below recognises it as known, not a leak.
  ROUTES.push("/blog", "/careers", "/blog/author/louis-rubino");
  /* Preview builds only (OA_HERO_PROPOSALS=1): the two hero proposals prerendered as their own files
     (website-development.hero-a.html / .hero-b.html) so ?hero=a|b hydrates cleanly and its LCP is measured as it would
     ship. Never set for a production build; the preview worker maps the query to the file. */
  if (process.env.OA_HERO_PROPOSALS) ROUTES.push("/services/website-development?hero=a", "/services/website-development?hero=b");
  SHELL = fs.readFileSync(path.join(DIST, "index.html"));
  const server = serve(feed);
  await new Promise((r) => server.listen(PORT, r));
  const port = server.address().port;

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let ok = 0, failed = [];

  /* ⛔ RENDER IN PARALLEL. This was a serial for-loop and it cost 135s for 27
     routes -- roughly 5s each, nearly all of it the fixed scroll-and-settle
     waits below rather than real work, and it dominated every Cloudflare build
     (the vite build beside it is ~12s). The routes are independent: each gets
     its own page, writes its own file and shares nothing but the browser and
     the static server, so there is no ordering to preserve.

     Concurrency is deliberately modest. CI build containers are memory-limited
     and every worker holds a live page with a full React app in it; 5 was
     comfortable locally and leaves headroom. Override with PRERENDER_CONCURRENCY.

     Log lines now interleave by completion rather than by route order, which is
     why each one still names its route. */
  const CONCURRENCY = Math.max(1, Number(process.env.PRERENDER_CONCURRENCY) || 5);
  const queue = [...ROUTES];
  const contentRoutes = new Set(["/blog", "/careers", "/blog/author/louis-rubino"]);

  const worker = async () => {
    let route;
    while ((route = queue.shift()) !== undefined) {
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

      /* Salesforce redesign v2 (2026-10-23): the motion runtime (client/lib/sfMotion.ts)
         does nothing when this flag is set, so the serialised DOM is exactly React's
         render output: no `.in` / `.js` classes, no GSAP inline transforms, no counter
         caught mid-tween and baked in as a wrong number. The static HTML IS the no-JS
         state (rules drawn, figures final, numbers real); the client replays from it. */
      if (route.startsWith("/services/salesforce") || route === "/contact" || route.split("?")[0] === "/services/website-development" || route.startsWith("/services/web-design-") || WD_SERVICE.has(route)) { // /contact is on the v2 kit too (2026-10-23)
        await page.evaluateOnNewDocument(() => { window.__oaPrerender = true; });
      }

      await page.goto(`http://localhost:${port}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      if (contentRoutes.has(route)) {
        const isIndexLike = route === "/blog" || route === "/careers" || route === "/blog/author/louis-rubino";
        await page.waitForSelector(isIndexLike ? "main h1" : "main article.oa-article", { timeout: 10000 });
        // Discover URLs from the rendered indexes, so KEEP_URL in blogger.ts
        // stays the single authority for migrated Ghost slugs.
        if (route === "/blog" || route === "/careers") {
          const links = await page.$$eval(`main a[href^="${route}/"]`, (anchors) =>
            [...new Set(anchors.map((a) => a.getAttribute("href")))],
          );
          for (const link of links) {
            if (!/^\/(blog|careers)\/[a-z0-9-]+$/.test(link) && !contentRoutes.has(link)) throw new Error(`Unsafe content URL: ${link}`);
            if (!contentRoutes.has(link)) {
              contentRoutes.add(link);
              ROUTES.push(link);
              queue.push(link);
            }
          }
        }
      }
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
        for (let pass = 0; pass < 24; pass++) {
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

        /* The hero film's <source> elements are rendered by React only once
           useHeroVideo opens every gate -- but puppeteer scrolls and paints
           above, so by serialisation time those gates ARE open and the sources
           are in the DOM. They were being written into all 27 static files,
           which handed the preload scanner a 728KB webm to fetch before the CSS
           and defeated the gate chain entirely for every real visitor. Measured
           2026-08-29: mobile LCP 7.4s, unmoved by a fix to the gate itself,
           because the gate was never what production ran.
           Removing them restores the intended behaviour: the poster paints, and
           the client re-adds the sources when the gates say so. */
        document
          .querySelectorAll("video > source")
          .forEach((n) => n.remove());

        /* Salesforce call bar (2026-10-23). It stays mounted and slides, and
           the sweep above scrolls the page, so it was being serialised in its
           SHOWN state. Hydration does not patch attribute mismatches, so that
           copy stayed on screen, focusable and not inert at the top of the
           page. Write it in the state the client's first render expects. */
        document.querySelectorAll("[data-sf-bar]").forEach((b) => {
          b.classList.replace("translate-y-0", "translate-y-full");
          b.setAttribute("aria-hidden", "true");
          b.setAttribute("inert", "");
        });
      });

      /* Hydration markers, Salesforce routes only (fix round PERF-1; the client
         side is in client/App.tsx). Two things React's own server renderer
         writes and a serialised live DOM does not:
         - <!-- --> between adjacent text nodes. React renders "read on " and
           "23 October 2026" as two text nodes; serialised, they parse back as
           one, and hydration would call that a text mismatch.
         - <!--$--> ... <!--/$--> around #root's content: the App-level
           <Suspense> boundary. Hydration expects it, and it is what keeps the
           static page on screen (no spinner) while the route chunk loads.
         ⛔ Keep the strip step above to things React did NOT render, or
         hydration sees a missing node and re-renders the page client-side. */
      if (hydrated(route)) {
        await page.evaluate(() => {
          const root = document.getElementById("root");
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          const texts = [];
          for (let n = walker.nextNode(); n; n = walker.nextNode()) texts.push(n);
          for (const t of texts) if (t.nextSibling?.nodeType === Node.TEXT_NODE) t.after(document.createComment(" "));
          /* ?hero=a|b (preview only): the proposal sits in its own <Suspense> (lazy); mark that boundary too. */
          const proposal = document.querySelector(".wd-hero-note")?.nextElementSibling;
          if (proposal) { proposal.before(document.createComment("$")); proposal.after(document.createComment("/$")); }
          root.prepend(document.createComment("$"));
          root.append(document.createComment("/$"));
        });
      }

      let html = "<!doctype html>\n" + (await page.content());
      /* Fix round PERF-3, hydrated (Salesforce) routes only: their first paint is
         the static HTML, so the app JS is not needed for it. At High priority the
         module entry and the modulepreloads shared bandwidth with the CSS and the
         fonts; low priority lets the page paint first. Routes that still
         createRoot() keep High: their content waits on the JS. */
      if (hydrated(route)) {
        html = html
          .replace(/<script type="module" /g, '<script type="module" fetchpriority="low" ')
          .replace(/<link rel="modulepreload" /g, '<link rel="modulepreload" fetchpriority="low" ');
      }

      // Write "/about" as about.html, not about/index.html — Cloudflare Pages serves
      // the former at /about directly, while the latter 308-redirects to /about/ and
      // would change every canonical URL on the site.
      const outFile = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route.replace("?hero=", ".hero-")}.html`);
      // Inline the CSS this page's first screen uses and load the full stylesheets
      // without blocking paint. Measured 2026-10-26 on web-design-chester-county,
      // devtools-throttled mobile: first paint 4.9s -> 1.4s; the settled page is
      // pixel-identical at 390 and 1440px.
      // Written copy only: the hidden-content guard below must keep scanning the page's own
      // markup, not the inlined stylesheet rules (.opacity-0, keyframes) beasties adds.
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, withFallbacks(await beasties.process(html)));

      // Fail the build if a page is about to ship content that is invisible
      // without JavaScript. This is not hypothetical: adding scroll reveals put
      // `opacity: 0` into the static HTML of 22 of these 27 pages at once, and
      // nothing caught it - the pages still built, still had the right title,
      // still passed the length check above. A prerendered page whose body is
      // transparent is worse than no prerender at all.
      // ⛔ A <source> in the static HTML is a fetch the gate chain cannot stop:
      // the preload scanner acts on it before any script runs. Fail the build
      // rather than ship it again.
      const bakedSources = (html.match(/<source[^>]*ssrc=/g) || []).length;
      if (bakedSources) {
        throw new Error(
          `ships ${bakedSources} baked <source> element(s) — the hero film would ` +
            `be fetched before the gate chain runs`,
        );
      }

      const hiddenOpacity = (html.match(/opacity:\s*0(?![.\d])/g) || []).length;
      const hiddenShift = (html.match(/transform:\s*translateY\(\s*[1-9]\d*px/g) || []).length;
      // 2026-10-23, Salesforce plate system: rails and nodes grow from
      // scale(0). They are CSS-only (no inline style), so this must stay 0; an
      // inline scale(0) in the static HTML means something was captured mid-grow.
      const hiddenScale = (html.match(/transform:\s*scale[XY]?\(\s*0\s*\)/g) || []).length;
      if (hiddenOpacity || hiddenShift || hiddenScale) {
        throw new Error(
          `ships content hidden without JS (opacity:0 ×${hiddenOpacity}, translateY ×${hiddenShift}, scale(0) ×${hiddenScale}) — ` +
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
  };
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, ROUTES.length) }, worker),
  );

  /* ⛔ RETRY ONCE, SERIALLY. The settle loop below races framer-motion's
     animation loop: it sweeps inline `opacity: 0` off revealed sections and
     gives up after a bounded number of passes. That race is winnable alone and
     losable under load, so parallelising made it flaky -- /industries/government
     failed exactly this way on a Cloudflare build container while passing three
     for three locally.

     The gate itself is right and stays: shipping a page whose content is
     invisible without JS is worse than failing. But a transient loss should not
     break a deploy, so failures get one more attempt with the queue drained and
     nothing else competing for CPU. A route that is genuinely broken still
     fails twice and still fails the build. */
  if (failed.length) {
    console.log(`
Retrying ${failed.length} route(s) serially: ${failed.join(", ")}`);
    queue.push(...failed);
    failed.length = 0;
    await worker();
  }

  await browser.close();
  server.close();
  if (contentRoutes.size !== (parsedFeed.feed.entry ?? []).length + 3) {
    throw new Error(`Discovered ${contentRoutes.size - 2} post/job URLs for ${(parsedFeed.feed.entry ?? []).length} feed entries`);
  }
  console.log(`\nPrerendered ${ok}/${ROUTES.length} routes.` + (failed.length ? ` Failed: ${failed.join(", ")}` : ""));
  if (failed.length) process.exit(1);

  // Dates, title and description for a content route come from the page we
  // just rendered (its JSON-LD and <meta>), so the sitemap and the feed can
  // never disagree with the page itself.
  const pageMeta = (route) => {
    const file = path.join(DIST, `${route}.html`);
    if (!fs.existsSync(file)) return {};
    const html = fs.readFileSync(file, "utf8");
    const g = (re) => (html.match(re) || [])[1];
    return {
      modified: g(/"dateModified":"([^"]+)"/) || g(/"datePosted":"([^"]+)"/),
      published: g(/"datePublished":"([^"]+)"/) || g(/"datePosted":"([^"]+)"/),
      title: (g(/<title>([^<]*)<\/title>/) || route).replace(/ — OneAlgorithm.*$/, ""),
      description: g(/<meta name="description" content="([^"]*)"/) || "",
    };
  };
  const today = new Date().toISOString().slice(0, 10);

  // public/sitemap.xml is the existing hand-maintained sitemap. Extend its
  // built copy using the same <url>/<loc> pattern, without freezing feed URLs.
  const sitemapFile = path.join(DIST, "sitemap.xml");
  let sitemap = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
  const additions = [...contentRoutes].filter((route) => !sitemap.includes(`<loc>https://onealgorithm.com${route}</loc>`));
  sitemap = sitemap.replace("</urlset>", additions.map((route) =>
    `  <url>\n    <loc>https://onealgorithm.com${route}</loc>\n    <lastmod>${(pageMeta(route).modified || today).slice(0, 10)}</lastmod>\n  </url>\n`,
  ).join("") + "</urlset>");
  fs.writeFileSync(sitemapFile, sitemap);
  console.log(`Sitemap: added ${additions.length} blog/careers URLs.`);

  // Atom feed of the posts (not jobs) at /blog/feed.xml — advertised from
  // index.html's <link rel="alternate">. Feed readers, LinkedIn/Zapier
  // auto-posting and Google all pick it up; the Blogger feed stays private.
  const posts = [...contentRoutes]
    .filter((r) => /^\/blog\/[^/]+$/.test(r))
    .map((r) => ({ route: r, ...pageMeta(r) }))
    .sort((a, b) => (b.published || "").localeCompare(a.published || ""));
  const atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>OneAlgorithm Blog</title>
  <subtitle>Case notes, measured results and straight answers from the Salesforce, website and SEO projects we run.</subtitle>
  <link href="https://onealgorithm.com/blog/feed.xml" rel="self"/>
  <link href="https://onealgorithm.com/blog"/>
  <id>https://onealgorithm.com/blog</id>
  <updated>${posts[0]?.modified || new Date().toISOString()}</updated>
${posts.map((p) => `  <entry>
    <title>${p.title}</title>
    <link href="https://onealgorithm.com${p.route}"/>
    <id>https://onealgorithm.com${p.route}</id>
    <published>${p.published || ""}</published>
    <updated>${p.modified || p.published || ""}</updated>
    <author><name>Louis Rubino</name></author>
    <summary>${p.description}</summary>
  </entry>`).join("\n")}
</feed>
`;
  fs.mkdirSync(path.join(DIST, "blog"), { recursive: true });
  fs.writeFileSync(path.join(DIST, "blog", "feed.xml"), atom);
  console.log(`Feed: ${posts.length} posts -> blog/feed.xml`);
}

main().catch((e) => { console.error(e); process.exit(1); });

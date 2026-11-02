// Gate for the 45 generated web-design place pages (scripts/wd-local-gen.mjs), measured on the RENDERED page.
//   node scripts/wd-local-check.mjs [--base http://127.0.0.1:5191] [--only chicago,denver] [--shots]
// Starts `vite --port 5191` in this worktree unless --base answers, writes client/wd-local-preview.html (index.html with
// client/components/wd/LocalPreview.tsx as the entry), renders every place + Philadelphia + Chester County + the hub,
// and FAILS LOUDLY (exit 1) on any page that misses a minimum of the 2026-10-24 bar (owner-decisions.md:76):
//   words >= 1,000 in <main> (metro/state) · >= 60% of sentences unique vs EVERY sibling (45 + PHL + CHE) and the hub ·
//   >= 8 Smart Brevity units (H2 <= 8 words, one-sentence lede <= 25, one bold lead-in, lead <= 25, <= 3 bullets of
//   <= 15 words, Go deeper <= 220 words in the HTML) · >= 6 Census readouts + the sources pop-up with years and the query
//   text (no key, no link) · the search readout (Semrush volumes + CPC + source line + pop-up) · >= 6 FAQ, answers
//   40-60 words in the HTML · photo banner with alt naming the place + credit pop-up (else TKTK-photo) · title <= 60
//   with the place + "web design" · meta <= 155 with place + phone · canonical · robots index · OG + Twitter with the
//   per-page 1200x630 JPEG < 300 KB · BreadcrumbList + Service(areaServed = place) + WebPage(dateModified) + the #org
//   reference, FAQPage only when the data says schema · links: showcase units, 3 service pages, state page (where one
//   exists), 3 sibling metros, all internal links routable · the remote-delivery sentence; in-person wording only on
//   PA/NJ/DE · CTA button to /contact#need=website · place-name density <= 1.5% · banned phrases · every figure in the
//   copy traceable (data `trace` or the allowlist) · every Census row verbatim in facts*.json with its key-free query.
// Writes build-wave12/place-check.json (+ shots/ with --shots). Uses headless playwright from scripts/playwright-mcp.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const REPO = process.env.OA_REPO || "C:/Users/louis/oa-sf-redesign";
const RUN = "C:/Users/louis/onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo";
const OUTDIR = `${RUN}/build-all`;
const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const BASE = arg("--base") || "http://127.0.0.1:5191";
const ONLY = arg("--only")?.split(",");
const SHOTS = args.includes("--shots") ? (arg("--shots-of") || "chicago,san-antonio,seattle,new-jersey").split(",") : [];
const { chromium } = createRequire(import.meta.url)("C:/Users/louis/scripts/playwright-mcp/node_modules/playwright");
const sharp = createRequire(`${REPO}/package.json`)("sharp");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const MAP = readJson(`${RUN}/page-map-webdev.json`);
const FACTS = [...readJson(`${RUN}/facts/economy/facts.json`), ...readJson(`${RUN}/facts/economy/facts-metros.json`), ...readJson(`${RUN}/facts/economy/facts-states.json`)];
const loadTs = (f) => { const s = fs.readFileSync(f, "utf8"); return JSON.parse(s.slice(s.indexOf("= {") + 2, s.lastIndexOf("};") + 1)); };
const INDEX = (() => { const s = fs.readFileSync(`${REPO}/client/data/wd-local/places.ts`, "utf8"); return JSON.parse(s.slice(s.indexOf("= [") + 2, s.lastIndexOf("];") + 1)); })();
const DATA = Object.fromEntries(INDEX.map((r) => [r.slug, loadTs(`${REPO}/client/data/wd-local/${r.slug}.ts`)]));
const SLUGS = INDEX.map((r) => r.slug).filter((s) => !ONLY || ONLY.includes(s));

// place names for the density measure: every place in the page map, the 50 states, the office town and its neighbours
const STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"];
const PROWS = MAP.rows.filter((r) => ["metro", "state", "city", "county", "town"].includes(r.kind));
const PLACE_NAMES = [...new Set([...PROWS.map((r) => r.place.replace(/ \/ .*/, "")), ...PROWS.map((r) => r.place.split(" / ")[1]).filter(Boolean), ...STATES, "Malvern", "Center City", "Chadds Ford", "Wilmington", "Fort Worth", "San Jose", "Lancaster", "Allentown", "Lehigh Valley"])]
  .flatMap((n) => [n, n.replace(/\./g, "")]).flatMap((n) => [n, n.toLowerCase()]).sort((a, b) => b.length - a.length);
const BANNED = /\baffordable\b|\bcheap(est)?\b|work fast|work quickly|years of experience|combined experience|WordPress sites|build (both|on) WordPress|\bWOSB\b|EDWOSB|woman-owned|minority-owned|award|\bguarantee|starting at|per hour|\/hr\b|\b\d+\s*(days?|weeks?)\b|24\/7|fastest|hand-coded|ADA certified|WCAG certified|100\/100|four people|Philadelphia clients|hundreds of|Price Is Right|20 years|thermal|BBB|Clutch|DesignRush|UpCity|since 20\d\d we/gi;
const ALLOW_NUM = new Set(["2018", "2019", "2023", "2024", "2025", "2026", "2027", "625", "19355", "610", "890", "9711", "5415", "541511", "541430", "541613", "541810", "10,000", "20", "99", "100", "499", "500", "13", "2.1", "5.0", "01", "02", "03", "04", "05", "16", "17410", "45", "49", "50"]);

/* ---------- dev server + harness ---------- */
const up = async () => { try { const r = await fetch(`${BASE}/client/components/wd/LocalPreview.tsx`); return r.ok; } catch { return false; } };
let vite = null;
if (!(await up())) {
  vite = spawn(process.execPath, [`${REPO}/node_modules/vite/bin/vite.js`, "--port", new URL(BASE).port, "--strictPort", "--host", "127.0.0.1"], { cwd: REPO, stdio: "ignore" });
  for (let i = 0; i < 60 && !(await up()); i++) await new Promise((r) => setTimeout(r, 1000));
  if (!(await up())) { console.error("vite did not start"); process.exit(2); }
}
const HARNESS = `${REPO}/client/wd-local-preview.html`;
fs.writeFileSync(HARNESS, fs.readFileSync(`${REPO}/index.html`, "utf8").replace('src="/client/App.tsx"', 'src="/client/components/wd/LocalPreview.tsx"'));
const cleanup = () => { try { fs.unlinkSync(HARNESS); } catch {} if (vite) vite.kill(); };
process.on("exit", cleanup);

/* ---------- render + extract ---------- */
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = {};
page.on("pageerror", (e) => (errors.cur ??= []).push(String(e)));
async function extract(slug) {
  errors.cur = [];
  await page.goto(`${BASE}/client/wd-local-preview.html?slug=${slug}`, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForSelector("main h1", { timeout: 60000 });
  await page.waitForTimeout(400);
  const res = await page.evaluate(() => {
    const main = document.querySelector("main");
    const clone = main.cloneNode(true);
    clone.querySelectorAll("script,style,svg,dialog,nav.sf-crumbs,.sr-only,.sf-credits,.wd-local-credit").forEach((e) => e.remove());
    const blocks = [...clone.querySelectorAll("h1,h2,h3,h4,p,li,td,th,figcaption,address span,summary,a.sf-lrow,.stamp span,caption")]
      .filter((e) => !e.querySelector("p,li,h1,h2,h3,h4,td,th"))
      .map((e) => e.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
    const tw = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT); const parts = []; while (tw.nextNode()) parts.push(tw.currentNode.nodeValue);
    const text = parts.join(" ").replace(/\s+/g, " ").trim();
    const units = [...main.querySelectorAll("h2.sf-h2")].filter((h) => !h.closest("dialog")).map((h) => {
      const u = h.closest(".sf-unit, article") || h.parentElement;
      const lede = u.querySelector(":scope > [data-lede]");
      const lead = u.querySelector(":scope > [data-lead]");
      const deep = u.querySelector(":scope > details.sf-deep .sf-deep-body") || u.querySelector("details.sf-deep .sf-deep-body");
      return {
        h2: h.textContent.trim(), lede: lede?.textContent.trim() ?? null, leadIns: u.querySelectorAll(":scope > [data-lead] .sf-lead-in").length,
        lead: lead ? lead.textContent.replace(lead.querySelector(".sf-lead-in")?.textContent ?? "", "").trim() : null,
        points: [...u.querySelectorAll(":scope > ul.sf-points > li")].map((l) => l.textContent.trim()), deeper: deep ? deep.textContent.replace(/\s+/g, " ").trim() : null,
      };
    });
    const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent); } catch { return { __bad: true }; } });
    const banner = document.querySelector(".wd-local-banner img");
    return {
      blocks, text, units, ld,
      h1: document.querySelector("main h1")?.textContent.trim(),
      title: document.title, description: meta('meta[name="description"]'), canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: meta('meta[name="robots"]'), og: { title: meta('meta[property="og:title"]'), description: meta('meta[property="og:description"]'), url: meta('meta[property="og:url"]'), image: meta('meta[property="og:image"]'), w: meta('meta[property="og:image:width"]'), h: meta('meta[property="og:image:height"]') },
      tw: { card: meta('meta[name="twitter:card"]'), image: meta('meta[name="twitter:image"]'), title: meta('meta[name="twitter:title"]') },
      hrefs: [...main.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      cta: [...main.querySelectorAll('a[href^="/contact#"]')].map((a) => a.getAttribute("href")),
      readouts: [...document.querySelectorAll("#figures .sf-readout")].map((r) => ({ num: r.querySelector(".sf-readout-num")?.textContent, src: r.querySelector(".sf-readout-src")?.textContent, chip: !!r.querySelector('[data-evidence="figures-src"]') })),
      figDialog: document.querySelector("#ev-figures-src")?.textContent ?? "",
      search: { rows: document.querySelectorAll("#search table tbody tr").length, src: document.querySelector("#search .wd-table-src")?.textContent ?? "", dialog: document.querySelector("#ev-search-src")?.textContent ?? "" },
      faq: [...main.querySelectorAll(".wd-faq-item")].map((f) => ({ q: f.querySelector(".wd-faq-q")?.textContent.trim(), a: f.querySelector(".wd-faq-a p")?.textContent.trim() ?? "" })),
      banner: banner ? { alt: banner.getAttribute("alt"), loaded: banner.complete && banner.naturalWidth > 0, w: banner.getAttribute("width"), h: banner.getAttribute("height") } : null,
      plateFallback: !!document.querySelector(".wd-local-banner-plate"),
      credit: document.querySelector("#ev-photo-credit")?.textContent ?? "",
      dialogs: [...document.querySelectorAll("dialog")].map((d) => d.id),
      offsite: [...main.querySelectorAll("a[href^='http']")].map((a) => a.getAttribute("href")),
      rawLinksInDialogs: [...document.querySelectorAll("dialog a[href*='api.census.gov'], dialog a[href*='semrush']")].length,
    };
  });
  res.errors = errors.cur;
  return res;
}

const ROUTES = new Set([...fs.readFileSync(`${REPO}/client/App.tsx`, "utf8").matchAll(/path="([^"]+)"/g)].map((m) => m[1]));
for (const r of INDEX) ROUTES.add(r.path);
// The 115 nationwide service place pages (2026-10-31) route from svc-local/index.ts, not a literal path= in App.tsx.
for (const m of fs.readFileSync(`${REPO}/client/data/svc-local/index.ts`, "utf8").matchAll(/"path": "([^"]+)"/g)) ROUTES.add(m[1]);
const PENDING = new Set(["/services/small-business-website-design", "/services/website-cost", "/services/website-redesign"]); // services agent, same wave
for (const p of PENDING) ROUTES.add(p);

const R = {};
const list = [...SLUGS, "philadelphia", "chester-county", "hub"];
for (const s of list) { process.stdout.write(`render ${s} `); R[s] = await extract(s); console.log(`${R[s].text.split(/\s+/).length} words`); }

/* ---------- screenshots (390 + 1440) ---------- */
if (SHOTS.length) {
  const dir = `${OUTDIR}/shots`; fs.mkdirSync(dir, { recursive: true });
  for (const s of SHOTS) for (const w of [390, 1440]) {
    const c = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, hasTouch: w === 390, isMobile: w === 390, deviceScaleFactor: 1 });
    const p = await c.newPage();
    await p.goto(`${BASE}/client/wd-local-preview.html?slug=${s}`, { waitUntil: "networkidle", timeout: 90000 });
    await p.waitForSelector("main h1");
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(700);
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: `${dir}/${s}-${w}-top.png` });
    await p.screenshot({ path: `${dir}/${s}-${w}-full.png`, fullPage: true });
    // open the sources pop-up once at 390 to shoot it
    if (w === 390) { const b = p.locator('[data-evidence="figures-src"]').first(); if (await b.count()) { await b.scrollIntoViewIfNeeded(); await b.click(); await p.waitForTimeout(300); await p.screenshot({ path: `${dir}/${s}-390-sources.png` }); } }
    (R[s].shots ??= {})[w] = { overflow: ov };
    await c.close();
  }
}
await browser.close();

/* ---------- measures ---------- */
const protect = (t) => t.replace(/\bSt\. /g, "St ").replace(/\b([ap])\.m\./g, "$1m").replace(/U\.S\./g, "US").replace(/(\d)\.(\d)/g, "$1·$2");
const sentSplit = (t) => protect(t).split(/(?<=[.!?])\s+(?=[A-Z0-9"“$])/).map((s) => s.trim()).filter(Boolean);
const norm = (s) => s.toLowerCase().replace(/[^\w\s·]/g, "").replace(/\s+/g, " ").trim();
const sentences = (blocks) => blocks.flatMap((b) => sentSplit(b)).map(norm).filter((s) => s.split(" ").length >= 4);
const wc = (t) => (t || "").split(/\s+/).filter(Boolean).length;
const SENT = Object.fromEntries(list.map((s) => [s, new Set(sentences(R[s].blocks))]));
const siblings = [...INDEX.map((r) => r.slug), "philadelphia", "chester-county"];
const fails = {}; const rows = [];
const F = (slug, m) => (fails[slug] ??= []).push(m);

for (const slug of SLUGS) {
  const d = DATA[slug], r = R[slug], name = d.name;
  const nm = name === "Washington, DC" ? "Washington" : name;
  // uniqueness vs the union of every sibling and the hub
  const others = new Set(); for (const o of [...siblings.filter((x) => x !== slug), "hub"]) for (const s of SENT[o] ?? []) others.add(s);
  const mine = [...SENT[slug]]; const shared = mine.filter((s) => others.has(s)); const unionUnique = 1 - shared.length / mine.length;
  // D2 as the Salesforce run and structure-spec D2 measure it: unique share against EACH sibling and against the hub; the
  // gate is the worst of those (min). The union figure (unique against all siblings at once) is reported as a diagnostic.
  const pair = (o) => { const O = SENT[o] ?? new Set(); return 1 - mine.filter((s) => O.has(s)).length / mine.length; };
  const pairs = [...siblings.filter((x) => x !== slug), "hub"].map((o) => [o, pair(o)]).sort((a, b) => a[1] - b[1]);
  const unique = pairs[0][1], worst = pairs[0][0];
  const words = wc(r.text);
  if (words < 1000) F(slug, `main words ${words} < 1000`);
  if (unique < 0.6) F(slug, `unique sentences ${(unique * 100).toFixed(1)}% vs ${worst} < 60%`);
  // Smart Brevity units
  // a unit with a lead-in is a Smart Brevity unit; the route board, FAQ and desk headers are not counted or graded
  const sb = r.units.filter((u) => u.lede != null && u.leadIns > 0).map((u) => {
    const issues = [];
    if (wc(u.h2) > 8) issues.push(`H2 ${wc(u.h2)} words`);
    if (sentSplit(u.lede).length !== 1) issues.push(`lede ${sentSplit(u.lede).length} sentences`);
    if (wc(u.lede) > 25) issues.push(`lede ${wc(u.lede)} words`);
    if (u.leadIns !== 1) issues.push(`${u.leadIns} lead-ins`);
    if (u.lead && wc(u.lead) > 25) issues.push(`lead ${wc(u.lead)} words`);
    if (u.points.length > 3) issues.push(`${u.points.length} bullets`);
    for (const p of u.points) if (wc(p) > 15) issues.push(`bullet ${wc(p)} words`);
    if (!u.deeper) issues.push("no Go deeper"); else if (wc(u.deeper) > 220) issues.push(`Go deeper ${wc(u.deeper)} words`);
    return { h2: u.h2, ok: !issues.length, issues };
  });
  const sbOk = sb.filter((u) => u.ok).length;
  for (const u of sb.filter((x) => !x.ok)) F(slug, `unit "${u.h2}": ${u.issues.join(", ")}`);
  if (sbOk < 8) F(slug, `${sbOk} Smart Brevity units < 8`);
  for (const u of r.units) if (wc(u.h2) > 8) F(slug, `H2 over 8 words: ${u.h2}`);
  // readouts + sources
  const ro = r.readouts.filter((x) => x.chip && /Census (CBP|ACS)/.test(x.src) && /20\d\d/.test(x.src));
  if (ro.length < 6) F(slug, `${ro.length} sourced Census readouts < 6`);
  const qs = (r.figDialog.match(/api\.census\.gov\/data\/20\d\d\//g) || []).length;
  if (qs < 6 || /key=/.test(r.figDialog)) F(slug, `sources pop-up: ${qs} queries${/key=/.test(r.figDialog) ? ", KEY PRESENT" : ""}`);
  if (r.rawLinksInDialogs) F(slug, `${r.rawLinksInDialogs} data links in pop-ups (must be text)`);
  // search readout
  if (r.search.rows < 3 || !/Semrush/.test(r.search.src) || !/Semrush/.test(r.search.dialog)) F(slug, `search readout: ${r.search.rows} rows, source ${/Semrush/.test(r.search.src)}, pop-up ${/Semrush/.test(r.search.dialog)}`);
  if (!d.search.rows.every((x) => x.phrase.includes(d.name.toLowerCase().replace(/\./g, "").replace(", dc", " dc")) || d.kind === "state")) F(slug, "search rows not the place's own phrasings");
  // FAQ
  const faqBad = r.faq.filter((f) => wc(f.a) < 40 || wc(f.a) > 60);
  if (r.faq.length < 6) F(slug, `${r.faq.length} FAQ < 6`);
  for (const f of faqBad) F(slug, `FAQ answer ${wc(f.a)} words: ${f.q}`);
  // photo
  let photo = "TKTK";
  if (r.banner) { photo = "yes"; if (!r.banner.alt?.includes(nm.split(",")[0])) F(slug, `banner alt does not name ${nm}`); if (!r.banner.loaded) F(slug, "banner image did not load"); if (!/License|Licence/i.test(r.credit)) F(slug, "photo credit pop-up missing"); }
  else if (!r.plateFallback) F(slug, "no banner and no plate fallback");
  // head
  if (!(r.title.length <= 60 && r.title.toLowerCase().includes("web design") && r.title.includes(nm.split(",")[0]))) F(slug, `title "${r.title}" (${r.title.length})`);
  if (!(r.description && r.description.length <= 155 && r.description.includes(nm.split(",")[0]) && r.description.includes("(610) 890-9711"))) F(slug, `meta "${r.description}" (${r.description?.length})`);
  if (r.canonical !== `https://onealgorithm.com${d.path}`) F(slug, `canonical ${r.canonical}`);
  if (!r.robots || /noindex/.test(r.robots) || !/index/.test(r.robots)) F(slug, `robots ${r.robots}`);
  const ogUrl = `https://onealgorithm.com${d.seo.ogImage}`;
  if (r.og.image !== ogUrl || r.tw.image !== ogUrl || r.tw.card !== "summary_large_image" || r.og.title !== d.seo.title || r.og.description !== d.seo.description || r.og.url !== `https://onealgorithm.com${d.path}` || r.og.w !== "1200" || r.og.h !== "630") F(slug, `OG/Twitter: ${JSON.stringify({ og: r.og, tw: r.tw })}`);
  const ogFile = `${REPO}/public${d.seo.ogImage}`;
  let ogOk = false;
  if (fs.existsSync(ogFile)) { const md = await sharp(ogFile).metadata(); const kb = fs.statSync(ogFile).size / 1024; ogOk = md.width === 1200 && md.height === 630 && kb < 300; if (!ogOk) F(slug, `og file ${md.width}x${md.height} ${kb.toFixed(0)} KB`); } else F(slug, `og file missing ${d.seo.ogImage}`);
  // schema
  const types = r.ld.map((x) => x["@type"]);
  const svc = r.ld.find((x) => x["@type"] === "Service"), wp = r.ld.find((x) => x["@type"] === "WebPage");
  const ldStr = JSON.stringify(r.ld);
  const schemaIssues = [];
  // The ProfessionalService node is emitted only on the office pages (StructuredData LB_PATHS); remote place pages
  // reference #org instead (checked below), so it is not required here.
  for (const t of ["BreadcrumbList", "Service", "WebPage"]) if (!types.includes(t)) schemaIssues.push(`no ${t}`);
  if (svc && !(String(svc.areaServed?.name) === (name === "Washington, DC" ? "Washington" : name))) schemaIssues.push(`areaServed ${JSON.stringify(svc?.areaServed)}`);
  if (svc && !String(svc.provider?.["@id"]).endsWith("/#org")) schemaIssues.push("provider @id");
  if (!r.ld.some((x) => String(x["@id"] ?? "").endsWith("/#org") || (x["@graph"] || []).some((g) => String(g["@id"]).endsWith("/#org")))) schemaIssues.push("no #org node on the page");
  if (wp && wp.dateModified !== d.seo.dateModified) schemaIssues.push("WebPage dateModified");
  const faqSec = d.sections.find((s) => s.kind === "faq");
  if (types.includes("FAQPage") !== !!faqSec?.schema) schemaIssues.push("FAQPage presence != data schema flag");
  if (/priceRange|AggregateRating|"Review"|__bad/.test(ldStr)) schemaIssues.push("forbidden schema property");
  const bc = r.ld.find((x) => x["@type"] === "BreadcrumbList");
  if (bc && !JSON.stringify(bc).includes(name)) schemaIssues.push("breadcrumb lacks the place");
  for (const i of schemaIssues) F(slug, `schema: ${i}`);
  // links
  const paths = r.hrefs.filter((h) => h.startsWith("/")).map((h) => h.split(/[?#]/)[0]);
  const unroutable = [...new Set(paths.filter((p) => !ROUTES.has(p)))];
  if (unroutable.length) F(slug, `unroutable links: ${unroutable.join(", ")}`);
  const need = ["/services/small-business-website-design", "/services/website-cost", "/services/website-redesign"];
  for (const n of need) if (!paths.includes(n)) F(slug, `missing link ${n}`);
  if (!r.hrefs.some((h) => h.startsWith("/services/website-development#"))) F(slug, "no showcase-unit link");
  const near = r.hrefs.filter((h) => /^\/services\/web-design-/.test(h) && h !== d.path).length;
  if (near < 3) F(slug, `${near} sibling place links < 3`);
  if (d.parent && !paths.includes(d.parent.to)) F(slug, "no link to its state page");
  const off = r.offsite.filter((h) => !/phantomarcades|inspectthishome|theboardsprofessor|thegorband|starzibros|atlas|maps\.app\.goo\.gl|creativecommons/.test(h));
  if (off.length) F(slug, `off-site links: ${off.join(", ")}`);
  if (!r.cta.some((h) => /need=website/.test(h) && /topic=/.test(h))) F(slug, "no CTA to /contact#need=website&topic=");
  // relationship sentence
  const low = r.text.toLowerCase();
  if (!low.includes(`we take on website work for ${name.toLowerCase()} businesses remotely from malvern, pa`)) F(slug, "remote-delivery sentence missing");
  const inPerson = /in[- ]person|on-site|onsite|visit us|meet you/i.test(r.text);
  if (inPerson && !["pennsylvania", "new-jersey", "delaware"].includes(slug)) F(slug, "in-person wording outside the Philadelphia region");
  // density
  let t = r.text, places = 0; const hits = {};
  for (const p of PLACE_NAMES) { const re = new RegExp(`(?<![\\w])${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w])`, "g"); const c = (t.match(re) || []).length; if (c) { hits[p] = (hits[p] || 0) + c; places += c; t = t.replace(re, " "); } }
  const density = places / words;
  if (density > 0.015) F(slug, `place-name density ${(density * 100).toFixed(2)}% > 1.5% (${places}: ${JSON.stringify(hits)})`);
  // banned phrases (page copy, head, page JSON-LD except the site-wide Organization node)
  const cpcs = new Set(Object.keys(d.trace).filter((k) => /^\d+\.\d\d$/.test(k)));
  const scan = [r.text, r.title, r.description, JSON.stringify(r.ld.filter((x) => x["@type"] !== "Organization").map(({ sameAs, ...x }) => x))].join(" \n ").replace(/\$(\d+\.\d\d)/g, (m, v) => (cpcs.has(v) ? "" : m));
  const banned = [...new Set(scan.match(BANNED) || [])];
  // 2026-11-01: a government fee quoted in the place-only rules section (traced to its official page URL) is not our price.
  const price = (scan.match(/\$\s?\d[\d,]*(?:\.\d+)?/g) || []).filter((x) => !/:\/\//.test(d.trace[x.replace(/[$\s]/g, "").replace(/[.,]$/, "")] ?? "")).filter(Boolean);
  if (banned.length) F(slug, `banned: ${banned.join(", ")}`);
  if (price.length) F(slug, `price-like figure: ${price.join(", ")}`);
  // traceable numbers (main copy; dialogs and the NAP's own figures are allowlisted or traced)
  const dated = r.text.replace(/\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec) \d{4}\b/g, " ").replace(/CC[ -]BY(-SA)?[ -]\d\.\d/g, " ").replace(/\d{1,2}:\d{2}/g, " ").replace(/\b\d{4}-\d{2}-\d{2}\b/g, " ");
  const nums = (dated.match(/\d[\d,]*(?:\.\d+)?/g) || []).map((n) => n.replace(/,$/, "")).filter((n) => n.replace(/\D/g, "").length >= 2 || n.includes("."));
  const untraced = [...new Set(nums.filter((n) => !d.trace[n] && !ALLOW_NUM.has(n)))];
  if (untraced.length) F(slug, `untraced figures: ${untraced.map((n) => { const i = dated.search(new RegExp(`(?<![\\d,.])${n.replace(/[.,]/g, "\\$&")}(?![\\d])`)); return `${n} [${dated.slice(Math.max(0, i - 40), i + 20)}]`; }).join(" | ")}`);
  // Census rows verbatim + key-free queries
  for (const row of d.facts.rows.filter((x) => !x.derived)) {
    const hit = FACTS.find((x) => x.geo_code === row.geo && x.fact === row.fact && x.period === row.period);
    if (!hit) F(slug, `fact not in facts*.json: ${row.fact} ${row.period}`);
    else if (hit.value !== row.value) F(slug, `fact value ${row.fact} ${row.period}: ${row.value} vs ${hit.value}`);
    else if (row.query?.[0] !== hit.url.replace(/[&?]key=[^&]*/g, "")) F(slug, `query mismatch ${row.fact}`);
  }
  if (r.errors.length) F(slug, `page errors: ${r.errors.slice(0, 2).join(" | ")}`);
  rows.push({ worstShared: mine.filter((s) => (SENT[worst] ?? new Set()).has(s)), sharedList: shared, densityHits: hits, slug, name, kind: d.kind, words, unique: +(unique * 100).toFixed(1), worstSibling: worst, unionUnique: +(unionUnique * 100).toFixed(1), sentences: mine.length, sharedWithAny: shared.length, units: sbOk, readouts: ro.length, faq: r.faq.length, photo, schema: schemaIssues.length ? "FAIL" : "ok", density: +(density * 100).toFixed(2), title: r.title.length, meta: r.description?.length, og: ogOk, fails: fails[slug]?.length ?? 0, sbUnits: sb });
}

const tot = { pages: rows.length, pass: rows.filter((x) => !x.fails).length, minWords: Math.min(...rows.map((x) => x.words)), minUnique: Math.min(...rows.map((x) => x.unique)), minUnionUnique: Math.min(...rows.map((x) => x.unionUnique)), minUnits: Math.min(...rows.map((x) => x.units)), minReadouts: Math.min(...rows.map((x) => x.readouts)), minFaq: Math.min(...rows.map((x) => x.faq)), photos: rows.filter((x) => x.photo === "yes").length, maxDensity: Math.max(...rows.map((x) => x.density)) };
fs.mkdirSync(OUTDIR, { recursive: true });
fs.writeFileSync(`${OUTDIR}/place-check.json`, JSON.stringify({ at: new Date().toISOString(), totals: tot, rows, fails, wave0: { philadelphia: { words: wc(R.philadelphia.text) }, "chester-county": { words: wc(R["chester-county"].text) } }, shots: Object.fromEntries(Object.entries(R).filter(([, v]) => v.shots).map(([k, v]) => [k, v.shots])) }, null, 1));
for (const x of rows) console.log(`${x.fails ? "✗" : "✓"} ${x.slug.padEnd(16)} words ${String(x.words).padStart(5)} unique ${String(x.unique).padStart(5)}% (union ${x.unionUnique}%) units ${x.units} readouts ${x.readouts} faq ${x.faq} photo ${x.photo} schema ${x.schema} density ${x.density}%`);
for (const [s, f] of Object.entries(fails)) { console.log(`\n${s}:`); for (const m of f.slice(0, 12)) console.log(`  ✗ ${m}`); if (f.length > 12) console.log(`  … ${f.length - 12} more`); }
console.log(`\nwd-local-check: ${tot.pass}/${tot.pages} pages pass · min words ${tot.minWords} · min unique ${tot.minUnique}% · min units ${tot.minUnits} · min readouts ${tot.minReadouts} · min FAQ ${tot.minFaq} · photos ${tot.photos}/${tot.pages} · max density ${tot.maxDensity}%`);
cleanup();
process.exit(tot.pass === tot.pages ? 0 : 1);

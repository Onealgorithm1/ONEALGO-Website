// Link policy for the Salesforce pages (owner rule 2026-10-23; structure-spec.md gates 7, 8, 18). Exits 1 on a breach.
//
//   node scripts/sf-link-policy-check.mjs            # every dist/spa/services/salesforce*.html
//   node scripts/sf-link-policy-check.mjs --strict   # also fail (not just warn) on pages not yet on the v2 kit
//
// What it guards on every prerendered Salesforce page:
//  - no raw API or data URL anywhere in the HTML (href OR text): api.* hosts, /api/ paths (other than our own form
//    endpoint), .json/.csv, data-query strings (?get=), api.census.gov, oesprofile, api.sap.com
//  - every off-site <a> opens a new tab (target=_blank) with rel noopener, carries the external mark (.sf-ext),
//    and is never a primary CTA (data-primary / data-cta hero|header|desk|bar)
//  - primary CTAs stay on site (#, /, tel:, mailto:, or onealgorithm.com)
//  - no `?` parameters on internal links inside <main>
//  - no link to Houston before its gate, no link to a killed route
// Pages whose body is not on the v2 kit (no `class="sfv2`) are reported and skipped unless --strict: the old pages
// carry the api.census.gov anchors this redesign removes, and they are rebuilt page by page.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "spa", "services");
const strict = process.argv.includes("--strict");
const OWN_HOSTS = new Set(["onealgorithm.com", "www.onealgorithm.com"]);
// Scanned over the WHOLE document (href or text): an API host anywhere is a breach.
const RAW_DATA = [
  /https?:\/\/api\.[a-z0-9.-]+/i,
  /api\.census\.gov/i,
  /api\.sap\.com/i,
  /oesprofile/i,
];
// Scanned over <a href> inside <main> only (index.html's <link rel="manifest" href="/manifest.json"> is not a data link).
const RAW_HREF = [/\.(json|csv)(\?|$)/i, /[?&]get=/i, /^\/api\//i];
const KILLED = [/\/services\/salesforce-consultant-houston\b/];
const PRIMARY_CTA = /^(hero|header|desk|bar)$/;

if (!fs.existsSync(dist)) { console.error("sf-link-policy-check: dist/spa/services not found: run the build + prerender first"); process.exit(1); }
const files = fs.readdirSync(dist).filter((f) => /^salesforce.*\.html$/.test(f)).sort();
if (!files.length) { console.error("sf-link-policy-check: no salesforce*.html in dist"); process.exit(1); }

let fails = 0, skipped = 0, checked = 0;
const fail = (file, msg) => { fails++; console.error(`  ✗ ${file}: ${msg}`); };
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i")); return m ? m[1] : null; };

for (const f of files) {
  const html = fs.readFileSync(path.join(dist, f), "utf8");
  const v2 = /class="sfv2/.test(html);
  if (!v2 && !strict) { skipped++; console.log(`  · ${f}: not on the v2 kit yet, skipped (use --strict to fail)`); continue; }
  checked++;
  const mainStart = html.indexOf("<main"), mainEnd = html.indexOf("</main>");
  const main = mainStart >= 0 && mainEnd > mainStart ? html.slice(mainStart, mainEnd) : html;

  for (const re of RAW_DATA) { const m = html.match(re); if (m) fail(f, `raw API/data URL in the page: ${m[0]}`); }
  for (const re of KILLED) { const m = main.match(re); if (m) fail(f, `links a gated/killed route: ${m[0]}`); }

  const anchors = [...main.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  for (const [, attrs, inner] of anchors) {
    const href = attr(attrs, "href");
    if (!href) continue;
    for (const re of RAW_HREF) if (re.test(href)) fail(f, `data/API link in the body: ${href}`);
    const cta = attr(attrs, "data-cta");
    const isPrimary = /\sdata-primary(=|\s|$)/.test(attrs) || (cta && PRIMARY_CTA.test(cta));
    let offsite = false;
    if (/^https?:\/\//i.test(href)) {
      const host = new URL(href).hostname.toLowerCase();
      offsite = !OWN_HOSTS.has(host);
    }
    if (offsite) {
      const target = attr(attrs, "target"), rel = (attr(attrs, "rel") || "").toLowerCase();
      if (target !== "_blank") fail(f, `off-site link without target=_blank: ${href}`);
      if (!/\bnoopener\b/.test(rel)) fail(f, `off-site link without rel=noopener: ${href}`);
      if (!/sf-ext/.test(inner)) fail(f, `off-site link without the external mark (.sf-ext): ${href}`);
      if (isPrimary) fail(f, `primary CTA leaves the site: ${href}`);
      if (!/<dialog[\s\S]*$/.test(main.slice(0, main.indexOf(attrs))) ) { /* off-site links may sit outside dialogs (e.g. licence deed) but never in body copy */ }
    } else {
      if (isPrimary && !/^(#|\/|tel:|mailto:)/.test(href) && !/^https?:\/\/(www\.)?onealgorithm\.com/.test(href)) fail(f, `primary CTA is not an in-site target: ${href}`);
      // Owner 2026-10-23: the desk CTA goes to the contact page with need/topic/from in the query (Contact.tsx reads them);
      // that is the one internal link allowed to carry parameters.
      if (/^\//.test(href) && /\?/.test(href) && !/^\/contact\?need=salesforce&amp;topic=[^&]+&amp;from=/.test(href)) fail(f, `internal link carries a query string: ${href}`);
    }
  }
  // the hero's primary button exists and stays on site
  if (!/data-cta="hero"[^>]*data-primary|data-primary[^>]*data-cta="hero"/.test(main)) fail(f, "no primary hero CTA (SfButton with cta=\"hero\") found");
}
console.log(`sf-link-policy-check: ${checked} page(s) checked, ${skipped} skipped, ${fails} failure(s)`);
process.exit(fails ? 1 : 0);

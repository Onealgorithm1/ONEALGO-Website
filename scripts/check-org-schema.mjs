// One runnable check for the 2026-09-14 Semrush fix: every prerendered page must
// carry exactly one Organization node with @id #org, no second Organization, and
// no LocalBusiness-only fields (geo, priceRange) on the Organization.
// Run after `npm run build:static`: node scripts/check-org-schema.mjs
import fs from "node:fs";
import path from "node:path";
const dir = "dist/spa";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".html") ? [path.join(d, e.name)] : []);
const nodes = (j) => (Array.isArray(j) ? j.flatMap(nodes) : j?.["@graph"] ? nodes(j["@graph"]) : j ? [j] : []);
let bad = 0, pages = 0;
for (const f of walk(dir)) {
  const html = fs.readFileSync(f, "utf8");
  const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
  if (!blocks.length) continue;
  pages++;
  const orgs = blocks.flatMap((m) => nodes(JSON.parse(m[1]))).filter((n) => [].concat(n["@type"]).includes("Organization"));
  const problems = [];
  if (orgs.length !== 1) problems.push(`${orgs.length} Organization nodes`);
  if (orgs[0]?.["@id"] !== "https://onealgorithm.com/#org") problems.push("Organization lacks @id #org");
  if (orgs.some((o) => "geo" in o || "priceRange" in o)) problems.push("geo/priceRange on Organization");
  if (problems.length) { bad++; console.log("FAIL", f, problems.join("; ")); }
}
console.log(`${pages} pages checked, ${bad} failing`);
process.exit(bad || !pages ? 1 : 0);

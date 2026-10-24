/* Gate 8 (structure-spec.md §15, §12.1): banned claims in the BUILT HTML of the website-development routes,
 * JSON-LD included. Exit 1 on any hit.
 *   node scripts/wd-claims-grep.mjs [distDir=dist/spa] [route.html ...]
 * Default files: services/website-development.html, web-design-philadelphia.html, web-design-chester-county.html. */
import fs from "node:fs";
import path from "node:path";

const [dist = "dist/spa", ...files] = process.argv.slice(2);
const FILES = files.length ? files : ["services/website-development.html", "services/web-design-philadelphia.html", "services/web-design-chester-county.html"];
// [label, regex]. WordPress delivery claims stay banned until Louis names a delivered example (missing.md #2).
const BANNED = [
  ["affordable", /affordabl/i],
  ["work fast / quickly", /\bwork (fast|quickly)\b/i],
  ["WordPress delivery", /WordPress sites|build (both|on) WordPress/i],
  ["four people", /\bfour people\b/i],
  ["WebGL", /WebGL/i],
  ["years of experience", /years of experience/i],
  ["WOSB/EDWOSB", /\bE?D?WOSB\b|EDWOSB/],
  ["woman/minority-owned", /wom[ae]n[- ]owned|minority[- ]owned/i],
  ["Lighthouse as a published score", /Lighthouse (score|[0-9])|[0-9]+\s*\/\s*100\b|publishes (the|its own) Lighthouse/i],
  ["absence announcements", /no published client work|Neither has a number|not a Center City/i],
  ["$ figure", /\$\s?[0-9]/],
  ["24/7", /24\s*\/\s*7/],
  ["Price Is Right", /Price Is Right/i],
  ["thermal", /\bthermal\b/i],
  ["20 years", /\b20 years\b/i],
];
// Strip external/inline JS bodies other than JSON-LD (bundled code is not page copy), keep everything else.
const copyOf = (html) => html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, "");
let hits = 0;
for (const f of FILES) {
  const p = path.join(dist, f);
  if (!fs.existsSync(p)) { console.log(`MISSING ${p}`); hits++; continue; }
  const html = copyOf(fs.readFileSync(p, "utf8"));
  const found = [];
  for (const [label, re] of BANNED) {
    const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const m of html.matchAll(g)) found.push(`${label}: "${html.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, " ")}"`);
  }
  hits += found.length;
  console.log(`${found.length ? "FAIL" : "PASS"} ${f}: ${found.length} hit(s)`);
  found.forEach((x) => console.log("   - " + x));
}
console.log(hits ? `gate 8: ${hits} hit(s)` : "gate 8: 0 hits");
process.exit(hits ? 1 : 0);

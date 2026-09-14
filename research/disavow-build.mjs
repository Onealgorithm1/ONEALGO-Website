// Builds research/disavow-onealgorithm.txt for Google's disavow tool.
// Input: Semrush backlinks_refdomains export for onealgorithm.com (semicolon CSV,
// first column = domain), pasted into research/refdomains-<date>.csv.
// Rule: disavow every referring domain EXCEPT the real relationships in KEEP.
// Verified 2026-09-14: every non-KEEP domain is one of five mass-spam templates
// ("Premium PBN" ads at /all/NNNN/NN.html, "aged domains" pages at page-<md5>.html,
// domraider.* "SEO resource" lists, "Website Stats / Domain Report / URL Shared"
// scrapers, "seo domain research" mirrors), each page linking out to 1,000-19,500 sites.
// Usage: node research/disavow-build.mjs research/refdomains-2026-09-14.csv
import fs from "node:fs";
const KEEP = new Set([
  "phantomarcades.com", "inspectthishomeinspections.com", "theboardsprofessor.com", // our client sites
  "irongrove.com",   // JV press release
  "salesforce.com",  // AppExchange partner listing
  "bloomberry.com",  // Salesforce partner directory (nofollow)
  "jobs.now",        // job listing (nofollow)
]);
const [src] = process.argv.slice(2);
const rows = fs.readFileSync(src, "utf8").trim().split(/\r?\n/).slice(1).map((l) => l.split(";")[0].trim()).filter(Boolean);
const disavow = [...new Set(rows)].filter((d) => !KEEP.has(d)).sort();
const missingKeep = [...KEEP].filter((k) => !rows.includes(k));
const out = [
  "# onealgorithm.com disavow file, generated " + new Date().toISOString().slice(0, 10),
  "# Mass-spam referring domains (link-selling ads, aged-domain lists, stats scrapers).",
  "# Real links deliberately NOT listed: " + [...KEEP].join(", "),
  ...disavow.map((d) => "domain:" + d),
].join("\n") + "\n";
fs.writeFileSync("research/disavow-onealgorithm.txt", out);
console.log(`refdomains ${rows.length}, keep ${rows.length - disavow.length}, disavow ${disavow.length}` + (missingKeep.length ? `, KEEP not in export: ${missingKeep.join(", ")}` : ""));
if (disavow.some((d) => KEEP.has(d)) || !out.includes("domain:phanerosart.com")) { console.error("self-check failed"); process.exit(1); }

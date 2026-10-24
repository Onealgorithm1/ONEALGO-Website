// Smart Brevity lint for the Salesforce pages (design-contract.md "Smart Brevity section anatomy", HARD limits;
// structure-spec.md gates 3-6). Reads the PRERENDERED HTML with JavaScript off, so it measures what a crawler and a
// no-JS visitor get. Exits 1 on a breach.
//
//   node scripts/sf-smart-brevity-check.mjs            # every dist/spa/services/salesforce*.html on the v2 kit
//   node scripts/sf-smart-brevity-check.mjs --strict   # also fail on pages not yet on the v2 kit
//
// Per page:  one H1, <= 9 words; hero lede (first [data-lede]) one sentence <= 25 words; no skipped heading level.
// Per unit ([data-unit]):
//   heading (h2/h3)            <= 8 words
//   [data-lede]                1 sentence, <= 25 words
//   [data-lead]                <= 1 per unit (outside details), <= 25 words, lead-in from the allowed list
//   ul.sf-points > li          <= 3, each <= 15 words
//   details                    closed in the HTML, non-empty, <= 220 words each; summary names its topic
//   anything else              a <p> outside <details> that is not the lede/lead/kicker/mono/source/person text
//                              is "detail text outside Go deeper" and fails
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "spa", "services");
const strict = process.argv.includes("--strict");
if (!fs.existsSync(dist)) { console.error("sf-smart-brevity-check: dist/spa/services not found: run the build + prerender first"); process.exit(1); }
const files = fs.readdirSync(dist).filter((f) => /^salesforce.*\.html$/.test(f)).sort();

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setJavaScriptEnabled(false);
let fails = 0, skipped = 0, checked = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(dist, f), "utf8");
  if (!/class="sfv2/.test(html) && !strict) { skipped++; console.log(`  · ${f}: not on the v2 kit yet, skipped (use --strict to fail)`); continue; }
  checked++;
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const problems = await page.evaluate(() => {
    const out = [];
    const words = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;
    const text = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");
    const sentences = (s) => s.split(/[.!?](?:\s+|$)(?=[A-Z"“]|$)/).filter((x) => x.trim()).length;
    const LEAD_INS = ["Why it matters:", "What we do:", "What you get:", "By the numbers:", "Yes, but:", "The bottom line:"];
    const main = document.querySelector("main") || document.body;
    const root = main.querySelector(".sfv2") || main;

    const h1s = main.querySelectorAll("h1");
    if (h1s.length !== 1) out.push(`${h1s.length} H1 elements (want 1)`);
    if (h1s[0] && words(text(h1s[0])) > 9) out.push(`H1 has ${words(text(h1s[0]))} words (max 9): "${text(h1s[0])}"`);
    const heroLede = root.querySelector(".sf-hero [data-lede]");
    if (!heroLede) out.push("hero has no lede ([data-lede])");
    else { const t = text(heroLede); if (words(t) > 25) out.push(`hero lede has ${words(t)} words (max 25)`); if (sentences(t) !== 1) out.push(`hero lede is ${sentences(t)} sentences (want 1)`); }

    // heading levels: no skips going down
    let prev = 1;
    main.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((h) => {
      if (h.closest("dialog")) return; // pop-up titles are H2 by the APG pattern, outside the outline
      const lv = +h.tagName[1];
      if (lv > prev + 1) out.push(`heading level skips from h${prev} to h${lv}: "${text(h)}"`);
      prev = lv;
    });

    const inDetails = (el, unit) => { let n = el; while (n && n !== unit) { if (n.tagName === "DETAILS") return true; n = n.parentElement; } return false; };
    root.querySelectorAll("[data-unit]").forEach((u, i) => {
      const label = `unit ${i + 1} (${(u.id || text(u.querySelector("h2,h3")) || "").slice(0, 50)})`;
      const h = u.querySelector("h2,h3");
      // H2 <= 8 words (contract). An H3 that is a buyer's question or objection ("Will we get senior people, or whoever
      // is free?") is exempt, as FAQ questions are (structure-spec §1.5); any other H3 keeps the 8-word limit.
      const isQuestion = h && h.tagName === "H3" && /[?.]$/.test(text(h));
      if (h && !inDetails(h, u) && !isQuestion && words(text(h)) > 8) out.push(`${label}: heading has ${words(text(h))} words (max 8)`);
      u.querySelectorAll("[data-lede]").forEach((l) => {
        if (inDetails(l, u)) return; const t = text(l);
        if (words(t) > 25) out.push(`${label}: lede has ${words(t)} words (max 25)`);
        if (sentences(t) > 1) out.push(`${label}: lede is ${sentences(t)} sentences (want 1)`);
      });
      const leads = [...u.querySelectorAll("[data-lead]")].filter((l) => !inDetails(l, u));
      if (leads.length > 1) out.push(`${label}: ${leads.length} lead-in sentences (max 1)`);
      leads.forEach((l) => {
        const li = text(l.querySelector(".sf-lead-in"));
        if (!LEAD_INS.includes(li)) out.push(`${label}: lead-in "${li}" is not on the allowed list`);
        if (words(text(l)) - words(li) > 25) out.push(`${label}: lead-in sentence has ${words(text(l)) - words(li)} words (max 25)`);
      });
      const points = [...u.querySelectorAll("ul.sf-points > li")].filter((p) => !inDetails(p, u));
      if (points.length > 3) out.push(`${label}: ${points.length} bullets (max 3)`);
      points.forEach((p) => { if (words(text(p)) > 15) out.push(`${label}: bullet has ${words(text(p))} words (max 15): "${text(p)}"`); });
      u.querySelectorAll("details").forEach((d) => {
        if (d.hasAttribute("open")) out.push(`${label}: a <details> is open in the HTML`);
        const body = text(d.querySelector(":scope > :not(summary)"));
        if (!body) out.push(`${label}: a <details> has no body text in the HTML`);
        if (words(body) > 220) out.push(`${label}: Go deeper has ${words(body)} words (max 220)`);
        const s = d.querySelector("summary"); if (s && words(text(s)) < 3) out.push(`${label}: summary "${text(s)}" names no topic`);
      });
      // detail text outside Go deeper
      u.querySelectorAll("p").forEach((p) => {
        if (inDetails(p, u)) return;
        if (p.matches("[data-lede],[data-lead],.sf-kicker,.sf-mono,.sf-readout-lab,.sf-readout-src,.sf-src")) return;
        if (p.closest("figure,.sf-cards,.sf-ledger,.sf-person,dialog,.sf-desk-copy,.sf-faq,nav")) return;
        if (words(text(p)) > 25) out.push(`${label}: detail text outside Go deeper (${words(text(p))} words): "${text(p).slice(0, 60)}…"`);
      });
    });
    return out;
  });
  if (problems.length) { fails += problems.length; console.error(`  ✗ ${f}`); problems.forEach((p) => console.error(`      ${p}`)); }
  else console.log(`  ✓ ${f}`);
}
await browser.close();
console.log(`sf-smart-brevity-check: ${checked} page(s) checked, ${skipped} skipped, ${fails} failure(s)`);
process.exit(fails ? 1 : 0);

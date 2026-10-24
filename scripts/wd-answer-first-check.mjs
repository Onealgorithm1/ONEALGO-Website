/* Gate 5 (structure-spec.md §15): answer first, on the three website-development routes.
 *   node scripts/wd-answer-first-check.mjs [baseUrl=http://127.0.0.1:5190] [--json out.json]
 * At 390x844 and 1440x900, JS on (a hydrated page, the order a reader meets):
 *   WD  : the first two [data-unit] in <main> are the identity + definition units (#work, #what) and nothing
 *         with a heading sits between the hero and them.
 *   PHL/CHE: the hero lede (1 sentence, <= 25 words) ends inside the first screen at 390.
 *   every unit with a lede: one lead-in, lede + lead-in (label included) 40-60 words, both visible,
 *   and both precede the unit's bullets in DOM order and on screen.
 * Exit 1 on any failure. Playwright from PLAYWRIGHT_PATH or ~/scripts/playwright-mcp. */
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const req = createRequire(process.env.PLAYWRIGHT_PATH || path.join(os.homedir(), "scripts/playwright-mcp/package.json"));
const { chromium } = req("playwright");

const args = process.argv.slice(2);
const base = (args.find((a) => /^https?:/.test(a)) || "http://127.0.0.1:5190").replace(/\/$/, "");
const jsonOut = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;
const ROUTES = { wd: "/services/website-development", phl: "/services/web-design-philadelphia", che: "/services/web-design-chester-county" };
const VIEWS = [{ w: 390, h: 844 }, { w: 1440, h: 900 }];

const PROBE = (isHub) => {
  const words = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;
  const text = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && +cs.opacity !== 0; };
  const y = (el) => el.getBoundingClientRect().top + scrollY;
  const inDetails = (el) => !!el.closest("details");
  const main = document.querySelector("main");
  const fails = [], units = [];
  // H2 units only: cards and steps nested inside a unit carry [data-unit] too but are not answer blocks.
  const all = [...main.querySelectorAll("[data-unit]")].filter((u) => { const h = u.querySelector("h2,h3"); return h && h.tagName === "H2"; });
  if (isHub) {
    const ids = all.slice(0, 2).map((u) => u.id || u.closest("[id]")?.id);
    if (ids.join(",") !== "work,what") fails.push(`first two units are ${ids.join(",")}, expected work,what`);
    const first = all[0];
    if (first) {
      const before = [...main.querySelectorAll("h2,h3")].filter((h) => !h.closest("dialog") && (h.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING) && !first.contains(h));
      if (before.length) fails.push(`${before.length} heading(s) between the hero and unit 1: ${before.map(text).join(" | ").slice(0, 120)}`);
    }
  } else {
    const lede = main.querySelector(".sf-hero [data-lede], header [data-lede], [data-hero-lede]") || main.querySelector("h1 ~ p, h1 + * p");
    if (!lede) fails.push("no hero lede found");
    else {
      const t = text(lede), r = lede.getBoundingClientRect();
      const sents = t.split(/[.!?](?:\s+|$)(?=[A-Z"“]|$)/).filter((x) => x.trim()).length;
      units.push({ id: "hero", lede: words(t), sentences: sents, bottom: Math.round(r.bottom + scrollY) });
      if (words(t) > 25) fails.push(`hero lede ${words(t)} words`);
      if (sents > 1) fails.push(`hero lede ${sents} sentences`);
      if (innerWidth < 500 && r.bottom + scrollY > innerHeight) fails.push(`hero lede ends at ${Math.round(r.bottom + scrollY)} px, below the first screen (${innerHeight})`);
    }
  }
  for (const u of all) {
    const lede = [...u.querySelectorAll("[data-lede]")].find((l) => !inDetails(l));
    if (!lede) continue;
    const leads = [...u.querySelectorAll("[data-lead]")].filter((l) => !inDetails(l));
    const lead = leads[0];
    const n = words(text(lede)) + (lead ? words(text(lead)) : 0);
    const row = { id: u.id || u.closest("[id]")?.id || text(u.querySelector("h2,h3")).slice(0, 30), lede: words(text(lede)), lead: lead ? words(text(lead)) : 0, total: n };
    units.push(row);
    if (!lead) { fails.push(`${row.id}: no lead-in`); continue; }
    if (leads.length > 1) fails.push(`${row.id}: ${leads.length} lead-ins`);
    if (n < 40 || n > 60) fails.push(`${row.id}: answer block ${n} words (40-60)`);
    if (!vis(lede) || !vis(lead)) fails.push(`${row.id}: lede/lead-in not visible`);
    const pts = [...u.querySelectorAll("ul.sf-points")].filter((p) => !inDetails(p));
    for (const p of pts) {
      const domOk = (lede.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING) && (lead.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (!domOk) fails.push(`${row.id}: bullets precede lede/lead-in in the DOM`);
      if (vis(p) && y(p) < Math.max(y(lede), y(lead))) fails.push(`${row.id}: bullets sit above lede/lead-in on screen`);
    }
  }
  return { fails, units };
};

const browser = await chromium.launch();
const out = []; let bad = 0;
for (const [k, route] of Object.entries(ROUTES)) for (const v of VIEWS) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForSelector("main [data-unit]", { timeout: 20000 });
  const r = await page.evaluate(PROBE, k === "wd");
  out.push({ route, view: `${v.w}x${v.h}`, ...r });
  bad += r.fails.length;
  console.log(`${r.fails.length ? "FAIL" : "PASS"} ${route} ${v.w}: ${r.units.length} blocks, words ${r.units.filter((u) => u.total).map((u) => u.total).join("/")}`);
  r.fails.forEach((f) => console.log("   - " + f));
  await ctx.close();
}
await browser.close();
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(out, null, 2));
console.log(bad ? `${bad} failure(s)` : "gate 5: 0 failures");
process.exit(bad ? 1 : 0);

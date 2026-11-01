/**
 * Wide frame check (design-spec-addendum-wide-layout.md, 2026-10-23).
 *
 *     node scripts/wide-frame-check.mjs [base-url]     # default http://127.0.0.1:5190
 *
 * Needs a running dev or preview server. Asserts, in headless Chrome:
 *   1. Salesforce routes at 1280, 1440 and 1920: header, breadcrumb rail, every
 *      Section/hero frame and the footer are the wide frame (1440px, 1680px
 *      from 2xl = 1536px) and share ONE left content edge (left + padding-left).
 *   2. Salesforce routes at 390: no horizontal scroll, and no element in <main>
 *      runs past the viewport unless a scroll region holds it (the cost guide's
 *      licence table was clipped by its section while the page itself did not
 *      scroll, so check 2's first half passed; fix round H1/CR-1).
 *   3. / and /about: header and footer are still the 1200px frame and no
 *      1440px frame appears anywhere (the wide frame is opt-in).
 */
import assert from "node:assert";
import puppeteer from "puppeteer";

const BASE = (process.argv[2] || "http://127.0.0.1:5190").replace(/\/$/, "");
// One route per Salesforce template (2026-10-23 integration): hub, every service
// page, the three local pages and the city template (Boston + the new Houston).
const SF = [
  "/services/salesforce",
  "/services/salesforce-health-check",
  "/services/salesforce-implementation-cost",
  "/services/salesforce-data-migration",
  "/services/salesforce-integration",
  "/services/salesforce-managed-services",
  "/services/salesforce-marketing-cloud-consulting",
  "/services/salesforce-consultant-philadelphia",
  "/services/salesforce-consultant-chester-county",
  "/services/salesforce-consulting-partner-pennsylvania",
  "/services/salesforce-consultant-boston",
  "/services/salesforce-consultant-houston",
];
const OTHER = ["/", "/about"];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const failures = [];
const check = (label, fn) => {
  try {
    fn();
    console.log(`ok   ${label}`);
  } catch (e) {
    failures.push(label);
    console.log(`FAIL ${label}\n     ${e.message.split("\n")[0]}`);
  }
};

/** Every frame container on the page, tagged by role, with its content edge. The v2 kit's frame is `.sf-wrap`
 *  (client/styles/sf.css: 1440px, 1680px from 1536px), not a Tailwind max-w class (integrate step 2026-10-23). */
const frames = () =>
  page.evaluate(() => {
    const role = (el) =>
      el.closest("footer") ? "footer"
      : el.closest('nav[aria-label="Breadcrumb"]') ? "crumbs"
      : el.closest("nav") ? "header"
      : el.closest("main") ? "main"
      : "other";
    return [...document.querySelectorAll('[class*="max-w-[1200px]"],[class*="max-w-[1440px]"],[class*="max-w-[1680px]"],.sfv2 .sf-wrap')]
      .filter((el) => el.getClientRects().length)
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          role: role(el),
          maxW: cs.maxWidth,
          width: Math.round(r.width),
          edge: Math.round(r.left + parseFloat(cs.paddingLeft)),
        };
      });
  });

for (const w of [1280, 1440, 1920]) {
  await page.setViewport({ width: w, height: 900 });
  for (const r of SF) {
    await page.goto(BASE + r, { waitUntil: "networkidle0", timeout: 60000 });
    const f = await frames();
    const header = f.find((x) => x.role === "header");
    const wide = w >= 1536 ? "1680px" : "1440px";
    check(`${r} @${w}: header, crumbs, main frames and footer all ${wide}, one left edge (${header?.edge}px)`, () => {
      for (const role of ["header", "crumbs", "main", "footer"])
        assert(f.some((x) => x.role === role), `no ${role} frame found`);
      const off = f.filter((x) => x.maxW !== wide || x.edge !== header.edge);
      assert.deepStrictEqual(off, [], `out of frame: ${JSON.stringify(off)}`);
    });
  }
  for (const r of OTHER) {
    await page.goto(BASE + r, { waitUntil: "networkidle0", timeout: 60000 });
    const f = await frames();
    check(`${r} @${w}: header and footer stay 1200px, no 1440px frame`, () => {
      for (const role of ["header", "footer"]) {
        const x = f.find((y) => y.role === role);
        assert(x && x.maxW === "1200px" && x.width === 1200, `${role}: ${JSON.stringify(x)}`);
      }
      assert(!f.some((x) => x.maxW === "1440px" || x.maxW === "1680px"), "a wide frame leaked onto a non-Salesforce page");
    });
  }
}

await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
for (const r of SF) {
  await page.goto(BASE + r, { waitUntil: "networkidle0", timeout: 60000 });
  const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  check(`${r} @390: no horizontal scroll (scrollWidth ${sw} <= ${cw})`, () => assert(sw <= cw));
  const past = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const scroller = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if ((ox === "auto" || ox === "scroll") && p.scrollWidth > p.clientWidth) return true;
      }
      return false;
    };
    return [...document.querySelectorAll("main h1, main h2, main h3, main p, main table, main figure")]
      .filter((el) => el.getClientRects().length && el.getBoundingClientRect().right > vw + 1 && !scroller(el))
      .slice(0, 3)
      .map((el) => `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}" right ${Math.round(el.getBoundingClientRect().right)}`);
  });
  check(`${r} @390: nothing in <main> clipped past the viewport`, () => assert.deepStrictEqual(past, []));
}

await browser.close();
console.log(failures.length ? `\n${failures.length} FAILED` : "\nall passed");
process.exit(failures.length ? 1 : 0);

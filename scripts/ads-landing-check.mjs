// Google Ads landing gate for /services/hire-salesforce-developers (2026-11-16), on the PRERENDERED build.
//   pnpm build && node scripts/prerender.mjs && node scripts/ads-landing-check.mjs
// Serves dist/spa AS https://onealgorithm.com (request interception, so the production-host analytics gate and the
// Secure cookie behave as live) in WebKit iPhone 13 and Chromium desktop, and FAILS (exit 1) unless:
//   a) both short forms render; landing with ?gclid=TEST123, a tapped submit posts to /api/lead (stubbed, nothing
//      reaches Salesforce) with adClick.gclid=TEST123, and without GPC the Google Ads conversion
//      (send_to AW-17336277732/mszkCL-_27kdEOS1yspA) is fired;
//   b) the phone reads 610-561-5004 (text and tel: links, footer included) only with a gclid; without one, and in the
//      prerendered HTML, it is the office number;
//   c) with Global Privacy Control on, nothing Google loads: no request to Google tag hosts, no AW config, no conversion.
// Google's scripts and Turnstile are stubbed; no request leaves the machine.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const PW = process.env.PLAYWRIGHT_PATH || "C:/Users/louis/scripts/playwright-mcp/node_modules/playwright";
const { webkit, chromium, devices } = createRequire(import.meta.url)(PW);
const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "spa");
const ROUTE = "/services/hire-salesforce-developers";
const SEND_TO = "AW-17336277732/mszkCL-_27kdEOS1yspA";
const GOOGLE = /googletagmanager\.com|googleadservices\.com|doubleclick\.net|google-analytics\.com|google\.com\/(pagead|ccm)/;

let failed = 0;
const check = (label, cond, extra = "") => {
  console.log(`  ${cond ? "ok  " : "FAIL"} ${label}${cond ? "" : "  " + extra}`);
  if (!cond) failed++;
};

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".xml": "application/xml" };
function fileFor(pathname) {
  const p = decodeURIComponent(pathname);
  for (const f of [path.join(DIST, p), path.join(DIST, p, "index.html"), path.join(DIST, p + ".html")])
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  return path.join(DIST, "index.html");
}
const TURNSTILE_STUB = `window.turnstile={render:function(el,o){setTimeout(function(){o.callback("stub-token")},20);return "w"+Math.random()},reset:function(){},remove:function(){}};window.onloadTurnstileCallback&&window.onloadTurnstileCallback();`;

async function session(browserType, contextOpts, { gclid, gpc }) {
  const browser = await browserType.launch();
  const context = await browser.newContext(contextOpts);
  if (gpc) await context.addInitScript(() => Object.defineProperty(Navigator.prototype, "globalPrivacyControl", { get: () => true }));
  const google = [], leads = [], errors = [];
  await context.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname === "onealgorithm.com") {
      if (url.pathname === "/api/lead") {
        leads.push(JSON.parse(req.postData() || "{}"));
        return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      }
      if (url.pathname.startsWith("/cdn-cgi/")) return route.fulfill({ status: 204, body: "" });
      const f = fileFor(url.pathname);
      return route.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || "application/octet-stream", body: fs.readFileSync(f) });
    }
    if (url.hostname === "challenges.cloudflare.com") return route.fulfill({ status: 200, contentType: "text/javascript", body: TURNSTILE_STUB });
    if (GOOGLE.test(req.url())) { google.push(req.url()); return route.fulfill({ status: 200, contentType: "text/javascript", body: "" }); }
    return route.fulfill({ status: 204, body: "" }); // Clarity, fonts CDN, anything else third-party
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`https://onealgorithm.com${ROUTE}${gclid ? "?gclid=TEST123&utm_source=google&utm_campaign=sf-dev" : ""}`, { waitUntil: "load" });
  await page.waitForTimeout(1500); // hydration, the phone swap's rAF, the 1.5s GA backstop
  return { browser, context, page, google, leads, errors };
}

const phoneState = (page) => page.evaluate(() => ({
  text: document.body.innerText,
  footer: document.querySelector("footer")?.innerText || "",
  tels: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
}));
const dataLayer = (page) => page.evaluate(() => JSON.parse(JSON.stringify((window.dataLayer || []).map((a) => Array.from(a)))));

const html = fs.readFileSync(fileFor(ROUTE), "utf8");
console.log("prerendered HTML");
check("carries the office number", html.includes("890-9711") && html.includes("tel:+16108909711"));
check("never the ad line", !html.includes("561-5004") && !html.includes("5615004"));
check("both forms are in the static HTML", html.includes('id="top-name"') && html.includes('id="desk-name"'));
check("no Turnstile error baked in", !html.includes("could not load"));

for (const [name, type, opts, tap] of [
  ["WebKit iPhone 13", webkit, { ...devices["iPhone 13"] }, true],
  ["Chromium desktop 1440", chromium, { viewport: { width: 1440, height: 900 } }, false],
]) {
  console.log(`\n${name}`);

  // (b) no gclid: office number
  {
    const s = await session(type, opts, { gclid: false, gpc: false });
    const p = await phoneState(s.page);
    check("no gclid: office number shown", p.text.includes("890-9711") && !p.text.includes("561-5004"));
    check("no gclid: tel links unchanged", p.tels.length > 0 && p.tels.every((t) => !t.includes("5615004")), p.tels.join(","));
    await s.browser.close();
  }

  // (a)+(b) gclid, no GPC: swap, post with ad fields, conversion fired
  {
    const s = await session(type, opts, { gclid: true, gpc: false });
    const p = await phoneState(s.page);
    check("gclid: ad line in the body", p.text.includes("(610) 561-5004") && !p.text.includes("890-9711"), p.text.match(/.{20}890-9711.{0,10}/)?.[0]);
    check("gclid: ad line in the footer", p.footer.includes("561-5004"));
    check("gclid: every tel: link is the ad line", p.tels.length > 0 && p.tels.every((t) => t.includes("5615004")), p.tels.join(","));
    const cookie = (await s.context.cookies()).find((c) => c.name === "oa_ad");
    // Playwright's WebKit build for Windows has no SameSite support (reports every cookie as "None"); there the
    // attribute is checked in the cookie string the page writes instead.
    const lax = cookie?.sameSite === "Lax" || (tap && process.platform === "win32" && /SameSite=Lax; Secure/.test(html));
    check("oa_ad cookie: Secure, SameSite=Lax, ~90 days", !!cookie && cookie.secure && lax && Math.abs(cookie.expires - Date.now() / 1000 - 7776000) < 120, JSON.stringify(cookie));
    check("both short forms render", await s.page.locator("#top-name").isVisible() && (await s.page.locator("#desk-name").count()) === 1);
    check("Google Ads configured (no GPC)", (await dataLayer(s.page)).some((a) => a[0] === "config" && a[1] === "AW-17336277732"));

    await s.page.fill("#top-name", "Test Person");
    await s.page.fill("#top-email", "test@example.com");
    await s.page.fill("#top-company", "Example Co");
    await s.page.fill("#top-message", "A Salesforce developer for three months.");
    const btn = s.page.locator('form[data-form="hire-sf-top"] button[type="submit"]');
    if (tap) await btn.tap(); else await btn.click();
    await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
    const lead = s.leads[0] || {};
    check("form posted once to /api/lead (stubbed)", s.leads.length === 1);
    check("posted gclid + utm as hidden fields", lead.adClick?.gclid === "TEST123" && lead.adClick?.utm_campaign === "sf-dev", JSON.stringify(lead.adClick));
    check("posted name split, service, topic, page", lead.firstName === "Test" && lead.lastName === "Person" && lead.whatYouNeed === "Staff Augmentation" && lead.topic === "Hire Salesforce developers" && lead.page === ROUTE, JSON.stringify(lead));
    const dl = await dataLayer(s.page);
    check("generate_lead sent", dl.some((a) => a[0] === "event" && a[1] === "generate_lead" && a[2]?.form_id === "hire-sf-top"));
    check(`Ads conversion sent (${SEND_TO})`, dl.filter((a) => a[0] === "event" && a[1] === "conversion" && a[2]?.send_to === SEND_TO).length === 1);
    check("no page errors from our code", s.errors.length === 0, s.errors.join(" | "));
    await s.browser.close();
  }

  // (c) GPC: nothing Google, even after a successful submit
  {
    const s = await session(type, opts, { gclid: true, gpc: true });
    await s.page.fill("#top-name", "Test Person");
    await s.page.fill("#top-email", "test@example.com");
    await s.page.fill("#top-company", "Example Co");
    const btn = s.page.locator('form[data-form="hire-sf-top"] button[type="submit"]');
    if (tap) await btn.tap(); else await btn.click();
    await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
    await s.page.waitForTimeout(500);
    const dl = await dataLayer(s.page);
    check("GPC: no request to any Google tag host", s.google.length === 0, s.google.join(","));
    check("GPC: no Google Ads config, no conversion", !dl.some((a) => (a[0] === "config" && String(a[1]).startsWith("AW-")) || a[1] === "conversion"));
    check("GPC: the lead still posts, with no ad click (the cookie is never set)", s.leads.length === 1 && !s.leads[0].adClick?.gclid);
    check("GPC: no oa_ad cookie", !(await s.page.context().cookies()).some((c) => c.name === "oa_ad"));
    await s.browser.close();
  }
}

// /contact: the same component in its full form (moved out of Contact.tsx), #need prefill, post.
{
  console.log("\n/contact (Chromium)");
  const s = await session(chromium, { viewport: { width: 1440, height: 900 } }, { gclid: false, gpc: false });
  await s.page.goto("https://onealgorithm.com/contact#need=salesforce&topic=Test%20topic&from=/services/salesforce", { waitUntil: "load" });
  await s.page.waitForTimeout(800);
  check("full form fields render", (await s.page.locator("#firstName, #lastName, #email, #phone, #company, #whatYouNeed, #message").count()) === 7);
  check("#need prefill picks the service", (await s.page.locator("#whatYouNeed").inputValue()) === "Salesforce / CRM");
  await s.page.fill("#firstName", "Ana");
  await s.page.fill("#lastName", "Diaz");
  await s.page.fill("#email", "ana@example.com");
  await s.page.fill("#company", "Example Co");
  await s.page.click('form[data-form="contact"] button[type="submit"]');
  await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
  const lead = s.leads[0] || {};
  check("posts first/last, service, topic, from", lead.firstName === "Ana" && lead.lastName === "Diaz" && lead.whatYouNeed === "Salesforce / CRM" && lead.topic === "Test topic" && lead.page === "/services/salesforce", JSON.stringify(lead));
  check("generate_lead form_id stays \"contact\"", (await dataLayer(s.page)).some((a) => a[1] === "generate_lead" && a[2]?.form_id === "contact"));
  await s.browser.close();
}

console.log(failed ? `\n${failed} check(s) FAILED` : "\nall checks passed");
process.exit(failed ? 1 : 0);

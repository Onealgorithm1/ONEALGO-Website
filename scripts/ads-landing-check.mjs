// Google Ads landing gate for every page in PAGES (hire-salesforce-developers 2026-11-16; the Salesforce hub, health
// check and data migration 2026-11-17), on the PRERENDERED build.
//   pnpm build && node scripts/prerender.mjs && node scripts/ads-landing-check.mjs
// Serves dist/spa AS https://onealgorithm.com (request interception, so the production-host analytics gate and the
// Secure cookie behave as live) in WebKit iPhone 13 and Chromium desktop, and FAILS (exit 1) unless:
//   a) both short forms render; landing with ?gclid=TEST123, a tapped submit posts to /api/lead (stubbed, nothing
//      reaches Salesforce) with adClick.gclid=TEST123, and without GPC the Google Ads conversion
//      (send_to AW-17336277732/mszkCL-_27kdEOS1yspA) is fired;
//   b) the phone reads 610-561-5004 (text and tel: links, footer included) only with a gclid; without one, and in the
//      prerendered HTML, it is the office number;
//   c) with Global Privacy Control on, nothing Google loads: no request to Google tag hosts, no AW config, no conversion.
//   d) Microsoft Ads UET (2026-11-17): bat.js loads once with ti 187299094 on the live host; a successful send pushes
//      exactly one "submit_lead_form" event; with GPC, with the /privacy opt-out, and on a non-production host
//      nothing from Bing loads; landing with ?msclkid=BING123 swaps the phone, posts adClick.msclkid, and the
//      server's "Ad click:" Description line (functions/api/lead.js adClick) carries it.
// Google's and Microsoft's scripts and Turnstile are stubbed; no request leaves the machine.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { adClick } from "../functions/api/lead.js";

const PW = process.env.PLAYWRIGHT_PATH || "C:/Users/louis/scripts/playwright-mcp/node_modules/playwright";
const { webkit, chromium, devices } = createRequire(import.meta.url)(PW);
const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "spa");
// route, the top form's data-form id (the one submitted), the end form's id, and what the lead must carry.
const PAGES = [
  { route: "/services/hire-salesforce-developers", top: "hire-sf-top", end: "hire-sf-end", need: "Staff Augmentation", topic: "Hire Salesforce developers" },
  { route: "/services/salesforce", top: "sf-consult-top", end: "sf-consult-end", need: "Salesforce / CRM", topic: "Salesforce consulting", start: true },
  { route: "/services/salesforce-health-check", top: "sf-health-top", end: "sf-health-end", need: "Salesforce / CRM", topic: "Salesforce health check", start: true },
  { route: "/services/salesforce-data-migration", top: "sf-migration-top", end: "sf-migration-end", need: "Salesforce / CRM", topic: "Salesforce data migration", start: true },
];
const SEND_TO = "AW-17336277732/mszkCL-_27kdEOS1yspA";
const UET_TI = "187299094";
const BING = /bat\.bing\.(com|net)|c\.bing\.com/;
// bat.js stand-in: records the tag id it was built with and every "event" pushed, queued or live.
const UET_STUB = `window.__uet={ti:[],events:[]};window.UET=function(o){window.__uet.ti.push(o.ti);var q=o.q||[];for(var i=0;i<q.length;i++)if(q[i]==="event")window.__uet.events.push(q[i+1]);};window.UET.prototype.push=function(){if(arguments[0]==="event")window.__uet.events.push(arguments[1]);};`;
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

async function session(browserType, contextOpts, { gclid, msclkid, gpc, optout, route = "/", host = "onealgorithm.com" }) {
  const browser = await browserType.launch();
  const context = await browser.newContext(contextOpts);
  if (gpc) await context.addInitScript(() => Object.defineProperty(Navigator.prototype, "globalPrivacyControl", { get: () => true }));
  if (optout) await context.addInitScript(() => { try { localStorage.setItem("oa-consent", "denied"); } catch (e) {} });
  const google = [], bing = [], leads = [], errors = [];
  await context.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname === host) {
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
    if (BING.test(req.url())) { bing.push(req.url()); return route.fulfill({ status: 200, contentType: "text/javascript", body: url.pathname === "/bat.js" ? UET_STUB : "" }); }
    return route.fulfill({ status: 204, body: "" }); // Clarity, fonts CDN, anything else third-party
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const q = gclid ? "?gclid=TEST123&utm_source=google&utm_campaign=sf-dev" : msclkid ? "?msclkid=BING123&utm_source=bing&utm_medium=cpc&utm_campaign=oa-salesforce" : "";
  await page.goto(`https://${host}${route}${q}`, { waitUntil: "load" });
  await page.waitForTimeout(1500); // hydration, the phone swap's rAF, the 1.5s GA backstop
  return { browser, context, page, google, bing, leads, errors };
}

// The UET tag ids bat.js was started with, and how many "submit_lead_form" events reached uetq (queued or live).
const uetState = (page) => page.evaluate(() => {
  const ev = (window.__uet?.events || []).concat(Array.isArray(window.uetq) ? window.uetq : []);
  return { ti: window.__uet?.ti || [], leads: ev.filter((e) => e === "submit_lead_form").length, uetq: typeof window.uetq !== "undefined" };
});
const batLoads = (s) => s.bing.filter((u) => new URL(u).pathname === "/bat.js").length;
async function submitTop(s, P, tap) {
  await s.page.fill("#top-name", "Test Person");
  await s.page.fill("#top-email", "test@example.com");
  await s.page.fill("#top-company", "Example Co");
  const btn = s.page.locator(`form[data-form="${P.top}"] button[type="submit"]`);
  if (tap) await btn.tap(); else await btn.click();
  await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
  await s.page.waitForTimeout(300);
}

const phoneState = (page) => page.evaluate(() => ({
  text: document.body.innerText,
  // The site footer is the page's last <footer>; figures carry their own (the health-check scene's .hc-foot).
  footer: [...document.querySelectorAll("footer")].pop()?.innerText || "",
  tels: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
}));
const dataLayer = (page) => page.evaluate(() => JSON.parse(JSON.stringify((window.dataLayer || []).map((a) => Array.from(a)))));

for (const P of PAGES) {
  const ROUTE = P.route;
  const html = fs.readFileSync(fileFor(ROUTE), "utf8");
  console.log(`\n===== ${ROUTE}\nprerendered HTML`);
  check("carries the office number", html.includes("890-9711") && html.includes("tel:+16108909711"));
  check("never the ad line", !html.includes("561-5004") && !html.includes("5615004"));
  check("both forms are in the static HTML", html.includes('id="top-name"') && html.includes('id="desk-name"') && html.includes(`data-form="${P.top}"`) && html.includes(`data-form="${P.end}"`));
  check("no Turnstile error baked in", !html.includes("could not load"));
  if (P.start) check("#start is the top form (one #start, one start-title)", html.split('id="start"').length === 2 && html.split('id="start-title"').length === 2 && html.indexOf('id="start"') < html.indexOf(`data-form="${P.top}"`) && html.indexOf(`data-form="${P.top}"`) < html.indexOf(`data-form="${P.end}"`));

  for (const [name, type, opts, tap] of [
    ["WebKit iPhone 13", webkit, { ...devices["iPhone 13"] }, true],
    ["Chromium desktop 1440", chromium, { viewport: { width: 1440, height: 900 } }, false],
  ]) {
    console.log(`\n${name}`);

    // (b) no gclid: office number
    {
      const s = await session(type, opts, { gclid: false, gpc: false, route: ROUTE });
      const p = await phoneState(s.page);
      check("no gclid: office number shown", p.text.includes("890-9711") && !p.text.includes("561-5004"));
      check("no gclid: tel links unchanged", p.tels.length > 0 && p.tels.every((t) => !t.includes("5615004")), p.tels.join(","));
      const u = await uetState(s.page);
      check(`UET loads on the live host: bat.js once, ti ${UET_TI}`, batLoads(s) === 1 && u.ti.length === 1 && u.ti[0] === UET_TI, JSON.stringify({ bat: s.bing, ti: u.ti }));
      check("UET: no submit_lead_form without a send", u.leads === 0);
      await s.browser.close();
    }

    // (a)+(b) gclid, no GPC: swap, post with ad fields, conversion fired
    {
      const s = await session(type, opts, { gclid: true, gpc: false, route: ROUTE });
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
      if (P.start) {
        // The hero's "#start" button lands on the top form (instant jump in Layout; GSAP may replay it smoothly).
        const hero = s.page.locator('.sf-hero a[href="#start"]').first();
        if (tap) await hero.tap(); else await hero.click();
        await s.page.waitForTimeout(1200);
        const top = await s.page.locator(`form[data-form="${P.top}"]`).boundingBox();
        check("hero #start button scrolls to the top form", !!top && top.y < (opts.viewport?.height || 844) && top.y + top.height > 0, JSON.stringify(top));
      }
      await s.page.fill("#top-message", "A Salesforce developer for three months.");
      const btn = s.page.locator(`form[data-form="${P.top}"] button[type="submit"]`);
      if (tap) await btn.tap(); else await btn.click();
      await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
      const lead = s.leads[0] || {};
      check("form posted once to /api/lead (stubbed)", s.leads.length === 1);
      check("posted gclid + utm as hidden fields", lead.adClick?.gclid === "TEST123" && lead.adClick?.utm_campaign === "sf-dev", JSON.stringify(lead.adClick));
      check("posted name split, service, topic, page", lead.firstName === "Test" && lead.lastName === "Person" && lead.whatYouNeed === P.need && lead.topic === P.topic && lead.page === ROUTE, JSON.stringify(lead));
      const dl = await dataLayer(s.page);
      check("generate_lead sent", dl.some((a) => a[0] === "event" && a[1] === "generate_lead" && a[2]?.form_id === P.top));
      check(`Ads conversion sent (${SEND_TO})`, dl.filter((a) => a[0] === "event" && a[1] === "conversion" && a[2]?.send_to === SEND_TO).length === 1);
      await s.page.waitForTimeout(300);
      const u = await uetState(s.page);
      check("UET: exactly one submit_lead_form after one send", u.leads === 1 && batLoads(s) === 1, JSON.stringify(u));
      check("no page errors from our code", s.errors.length === 0, s.errors.join(" | "));
      await s.browser.close();
    }

    // (c) GPC: nothing Google, even after a successful submit
    {
      const s = await session(type, opts, { gclid: true, gpc: true, route: ROUTE });
      await s.page.fill("#top-name", "Test Person");
      await s.page.fill("#top-email", "test@example.com");
      await s.page.fill("#top-company", "Example Co");
      const btn = s.page.locator(`form[data-form="${P.top}"] button[type="submit"]`);
      if (tap) await btn.tap(); else await btn.click();
      await s.page.getByText("Received.").first().waitFor({ timeout: 10000 });
      await s.page.waitForTimeout(500);
      const dl = await dataLayer(s.page);
      check("GPC: no request to any Google tag host", s.google.length === 0, s.google.join(","));
      check("GPC: no Google Ads config, no conversion", !dl.some((a) => (a[0] === "config" && String(a[1]).startsWith("AW-")) || a[1] === "conversion"));
      check("GPC: the lead still posts, with no ad click (the cookie is never set)", s.leads.length === 1 && !s.leads[0].adClick?.gclid);
      check("GPC: no oa_ad cookie", !(await s.page.context().cookies()).some((c) => c.name === "oa_ad"));
      const u = await uetState(s.page);
      check("GPC: nothing from Bing (no bat.js, no uetq, no lead event)", s.bing.length === 0 && !u.uetq && u.leads === 0, s.bing.join(","));
      await s.browser.close();
    }

    // (d) msclkid (Microsoft Ads click), no GPC: swap, post with msclkid, Description line, one UET lead event
    {
      const s = await session(type, opts, { msclkid: true, gpc: false, route: ROUTE });
      const p = await phoneState(s.page);
      check("msclkid: ad line in the body", p.text.includes("(610) 561-5004") && !p.text.includes("890-9711"));
      check("msclkid: every tel: link is the ad line", p.tels.length > 0 && p.tels.every((t) => t.includes("5615004")), p.tels.join(","));
      await submitTop(s, P, tap);
      const lead = s.leads[0] || {};
      check("msclkid: posted once with msclkid + bing utm", s.leads.length === 1 && lead.adClick?.msclkid === "BING123" && lead.adClick?.utm_source === "bing" && lead.adClick?.utm_campaign === "oa-salesforce" && !lead.adClick?.gclid, JSON.stringify(lead.adClick));
      const line = adClick(lead.adClick);
      check("msclkid: Description line carries it", line === "Ad click: msclkid=BING123 | utm_source=bing | utm_medium=cpc | utm_campaign=oa-salesforce", line);
      const u = await uetState(s.page);
      check("msclkid: exactly one submit_lead_form", u.leads === 1, JSON.stringify(u));
      await s.browser.close();
    }
  }
}

// Opt-out from /privacy ("oa-consent" = "denied") and a non-production host: nothing from Google or Bing, once each.
{
  const P = PAGES[0];
  console.log("\nopt-out and preview host (Chromium)");
  const o = await session(chromium, { viewport: { width: 1440, height: 900 } }, { msclkid: true, optout: true, route: P.route });
  await submitTop(o, P, false);
  const uo = await uetState(o.page);
  check("opt-out: nothing from Bing (no bat.js, no uetq, no lead event)", o.bing.length === 0 && !uo.uetq && uo.leads === 0, o.bing.join(","));
  check("opt-out: no Google tag request, no oa_ad cookie", o.google.length === 0 && !(await o.context.cookies()).some((c) => c.name === "oa_ad"), o.google.join(","));
  check("opt-out: the lead still posts, with no ad click", o.leads.length === 1 && !o.leads[0].adClick);
  await o.browser.close();

  const h = await session(chromium, { viewport: { width: 1440, height: 900 } }, { msclkid: true, route: P.route, host: "onealgorithm-staging.pages.dev" });
  await submitTop(h, P, false);
  const uh = await uetState(h.page);
  check("preview host: nothing from Bing or Google", h.bing.length === 0 && h.google.length === 0 && !uh.uetq, [...h.bing, ...h.google].join(","));
  await h.browser.close();
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

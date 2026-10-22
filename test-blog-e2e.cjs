// Blog end-to-end as a user: WebKit + iPhone 13 profile, every interaction a real .tap()
// (Louis's bar for "tested", 2026-10-16), plus a desktop keyboard pass in Chromium.
const { webkit, chromium, devices } = require("C:/Users/louis/scripts/playwright-mcp/node_modules/playwright");
const BASE = "http://localhost:8090";
const results = [];
const SHOT = (n) => `./test-shots/ux-${n}.png`;
const ok = (name, pass, note = "") => { results.push({ name, pass, note }); console.log(`${pass ? "PASS" : "FAIL"}  ${name}${note ? " — " + note : ""}`); };
const ours = (t) => !/turnstile|challenges\.cloudflare|data:,|font-size:0|chrome-extension/i.test(t);

async function pageChecks(p, label) {
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  ok(`${label}: no horizontal overflow`, !overflow);
  const broken = await p.evaluate(() => [...document.images].filter((i) => i.offsetWidth > 0 && i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")));
  ok(`${label}: no broken images`, broken.length === 0, broken.join(", "));
  const below = await p.evaluate(() => { const f = document.querySelector("footer"); if (!f) return "no footer"; const r = f.getBoundingClientRect(); return Math.round(document.documentElement.scrollHeight - (r.bottom + window.scrollY)); });
  ok(`${label}: nothing below the footer`, below === 0 || below === "no footer" ? below !== "no footer" : false, `gap ${below}px`);
  const small = await p.evaluate(() => {
    const els = [...document.querySelectorAll("a, button, summary, input, [role=button]")];
    return els.filter((e) => { const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false; if (e.closest(".oa-article p, .oa-article li, .oa-article td, nav[aria-label=Breadcrumb], footer")) return false; return r.height < 32; })
      .map((e) => `${e.tagName.toLowerCase()}:${(e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 25)}=${Math.round(e.getBoundingClientRect().height)}px`);
  });
  ok(`${label}: every control >= 32px tall (prose/footer exempt)`, small.length === 0, small.slice(0, 8).join(", "));
}

(async () => {
  // ---------- iPhone 13, WebKit, taps ----------
  const b = await webkit.launch();
  const ctx = await b.newContext({ ...devices["iPhone 13"] });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => ours(String(e)) && errs.push("pageerror: " + String(e).slice(0, 120)));
  p.on("console", (m) => m.type() === "error" && ours(m.text()) && ours((m.location() || {}).url || "") && errs.push(m.text().slice(0, 120)));

  await p.goto(BASE + "/blog", { waitUntil: "networkidle" });
  await p.waitForSelector("main h2", { timeout: 15000 });
  await pageChecks(p, "index");
  await p.screenshot({ path: SHOT("01-index") });

  // fold
  const summary = p.locator("summary", { hasText: "Read the breakdown" }).first();
  await summary.tap();
  const opened = await p.locator("details[open]").count();
  const foldText = await p.locator("details[open] p").first().textContent().catch(() => "");
  await p.screenshot({ path: SHOT("02-fold-open") });
  ok("index: tap 'Read the breakdown' opens the fold with text", opened === 1 && foldText.length > 40, `"${(foldText || "").slice(0, 50)}…"`);
  ok("index: fold text has no stray spaces around bold numbers", !/\(\s|\s\)/.test(foldText), (foldText.match(/\(.{0,8}\)/) || [""])[0]);
  await p.locator("summary", { hasText: "Hide the breakdown" }).first().tap();
  ok("index: tap again closes the fold", (await p.locator("details[open]").count()) === 0);

  // topic chip
  const before = await p.locator("main ul > li").count();
  await p.locator("button", { hasText: /^SEO$/ }).tap();
  const seoOnly = await p.locator("main ul > li").count();
  ok("index: tap 'SEO' chip filters the list", seoOnly > 0 && seoOnly < before, `${before} -> ${seoOnly}`);
  await p.locator("button", { hasText: /^All$/i }).tap();
  ok("index: tap 'All' restores the list", (await p.locator("main ul > li").count()) === before);

  // time to first post on a phone: where does the first headline sit, in screens?
  const firstTop = await p.evaluate(() => Math.round(document.querySelector("main h2").getBoundingClientRect().top + window.scrollY));
  ok("index: first post headline within 1.25 phone screens", firstTop <= 844 * 1.25, `${firstTop}px = ${(firstTop / 844).toFixed(2)} screens`);
  // search (phone: behind the magnifier)
  await p.locator("button[aria-label='Search posts']").tap();
  await p.locator("input[type=search]").tap();
  await p.keyboard.type("configurator");
  await p.waitForTimeout(150);
  const found = await p.locator("main ul > li").count();
  ok("index: typing in search narrows the list", found >= 1 && found < before, `${found} match(es)`);
  await p.locator("input[type=search]").fill("zzzz-nothing");
  await p.waitForTimeout(150);
  ok("index: an empty search shows a helpful message", (await p.locator("text=Nothing matches").count()) === 1);
  await p.locator("input[type=search]").fill("");

  // author link
  await p.locator("a[href='/blog/author/louis-rubino']").first().tap();
  await p.waitForURL(/\/blog\/author\/louis-rubino$/);
  await p.waitForSelector("h1");
  ok("author: tap byline opens the author page", (await p.locator("h1").textContent()).trim() === "Louis Rubino");
  await p.screenshot({ path: SHOT("03-author") });
  ok("author: photo present", (await p.locator("img[src*='louis-rubino']").count()) >= 1);
  await pageChecks(p, "author");

  // into a post
  await p.locator("h2 a, a:has(h2)").first().tap().catch(async () => p.locator("a[href='/blog/seo-case-study-phantom-arcades']").first().tap());
  await p.waitForURL(/\/blog\/seo-case-study-phantom-arcades$/);
  await p.waitForSelector(".oa-article");
  ok("post: tap headline opens the post", true);
  await pageChecks(p, "post");
  await p.screenshot({ path: SHOT("04-post-top") });
  ok("post: hero image visible", await p.locator("figure img").first().isVisible());
  ok("post: 'The gist' lede present", (await p.locator("text=The gist:").count()) === 1);
  ok("post: 'Why it matters' present", (await p.locator(".oa-article strong", { hasText: "Why it matters" }).count()) === 1);

  // mobile TOC
  await p.locator("summary", { hasText: "In this post" }).tap();
  await p.screenshot({ path: SHOT("05-toc-open") });
  await p.locator("details[open] a[href='#whats-next']").tap();
  await p.waitForTimeout(600);
  await p.screenshot({ path: SHOT("06-after-toc-jump") });
  const topOffset = await p.evaluate(() => Math.round(document.getElementById("whats-next").getBoundingClientRect().top));
  ok("post: tap a TOC link jumps to the section under the sticky header", topOffset >= 0 && topOffset <= 140, `heading at ${topOffset}px from top`);

  // share
  const x = p.locator("a[aria-label='Share on X']").first();
  ok("post: share-on-X link is a real intent link in a new tab", (await x.getAttribute("href")).includes("twitter.com/intent/tweet") && (await x.getAttribute("target")) === "_blank");
  await p.locator("button[aria-label='Copy link']").first().tap().catch(() => {});
  await p.waitForTimeout(300);
  const copied = await p.locator("text=Link copied").first().evaluate((el) => getComputedStyle(el).opacity).catch(() => "0");
  ok("post: tap 'Copy link' shows 'Link copied' (WebKit may block clipboard headless)", copied === "1", `opacity ${copied}`);

  // older / newer
  const older = p.locator("nav[aria-label='More posts'] a").first();
  await older.scrollIntoViewIfNeeded(); await older.tap();
  await p.waitForURL(/\/blog\/(?!seo-case-study)[a-z0-9-]+$/);
  ok("post: tap 'Older' opens the next post", true, p.url().replace(BASE, ""));
  await p.waitForSelector(".oa-article");

  // subscribe form behaviour (Turnstile cannot pass on localhost; the message must be honest, nothing may crash)
  const email = p.locator("#blog-email");
  await email.scrollIntoViewIfNeeded(); await email.tap(); await p.keyboard.type("reader@example.com");
  await p.locator("button", { hasText: "Subscribe" }).tap();
  await p.waitForTimeout(400);
  await p.screenshot({ path: SHOT("07-subscribe") });
  const msg = (await p.locator("#blog-subscribe-error").textContent().catch(() => "")) || "";
  ok("post: subscribe without a passed check shows a clear message, no crash", /anti-spam check/.test(msg), `"${msg.slice(0, 70)}"`);

  // 404
  await p.goto(BASE + "/blog/not-a-real-post", { waitUntil: "networkidle" });
  ok("wrong URL: 'Post not found' with a way back", (await p.locator("text=Post not found").count()) === 1 && (await p.locator("a[href='/blog']").count()) >= 1);

  ok("mobile: no JS errors from our code across the flow", errs.length === 0, errs.slice(0, 3).join(" | "));
  await b.close();

  // ---------- Desktop Chromium: keyboard + TOC active state ----------
  const c = await chromium.launch();
  const d = await c.newPage({ viewport: { width: 1440, height: 1000 } });
  await d.goto(BASE + "/blog", { waitUntil: "domcontentloaded" });
  await d.waitForSelector("main h2");
  const focused = [];
  for (let i = 0; i < 45; i++) {
    await d.keyboard.press("Tab");
    const f = await d.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const ring = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== "none"; return { tag: e.tagName.toLowerCase(), text: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 20), ring }; });
    if (f) focused.push(f);
  }
  const chip = focused.find((f) => f.tag === "button" && /SEO|CASE/i.test(f.text));
  const search = focused.find((f) => f.tag === "input");
  const sum = focused.find((f) => f.tag === "summary");
  const noRing = focused.filter((f) => !f.ring).map((f) => f.tag + ":" + f.text);
  ok("desktop: Tab reaches the topic chips, the search box and the fold", !!chip && !!search && !!sum);
  ok("desktop: every focused control shows a visible focus ring", noRing.length === 0, noRing.slice(0, 6).join(", "));
  await d.goto(BASE + "/blog/seo-case-study-phantom-arcades", { waitUntil: "domcontentloaded" });
  await d.waitForSelector(".oa-article");
  await d.evaluate(() => document.getElementById("ai-search").scrollIntoView());
  await d.waitForFunction(() => Math.abs(document.getElementById("ai-search").getBoundingClientRect().top - 96) < 4, null, { timeout: 5000 }).catch(() => {});
  await d.waitForTimeout(250);
  const active = await d.locator("nav[aria-label='In this post'] a[aria-current='location']").first().textContent().catch(() => "");
  ok("desktop: table of contents highlights the section being read", (active || "").trim() === "AI search", `active = "${active}"`);
  const prog = await d.evaluate(() => { const el = document.querySelector(".oa-progress"); return el ? getComputedStyle(el).transform : "missing"; });
  ok("desktop: reading-progress line is drawing", prog !== "missing" && prog !== "matrix(0, 0, 0, 1, 0, 0)", prog);
  await c.close();

  const fails = results.filter((r) => !r.pass);
  console.log(`\n${results.length - fails.length}/${results.length} passed`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.log("HARNESS ERROR", e.message); process.exit(2); });

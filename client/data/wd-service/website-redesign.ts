/* /services/website-redesign: the redesign owner page (page-map-webdev.md §1 row 4, build-GATED; hub unit 4 is the
 * short form). Semrush exact 9,000/mo (website redesign 5,400; website redesign services 3,600), Trends 6 → 41
 * (2021 → 2026), the steepest climb of the set.
 *
 * ⛔ GATE (page-map-webdev.md §5 #7, orchestrator 2026-10-24): no redesign case study until Louis names which of the six
 * built sites replaced an earlier one. REDESIGN_CASE below is that one data edit: null today, so the page carries no
 * client window, no figures and no client name as redesign proof. Set it to "phantom-arcades" and the measured
 * redesign (Phantom's second screen + the PHANTOM_REDESIGN pop-up, itself GATED on the wording) renders in place of
 * the staged plate under "How a redesign keeps your SEO". Any other work.ts slug renders that site's window without figures. */
import type { ServicePageData, ServiceSection, ServiceDialog } from "./types";
import type { WdFaqItem } from "../wd-faq";
import { PHANTOM_REDESIGN } from "../wd-proof";
import { LINKS } from "./shared";

export const REDESIGN_CASE: string | null = null;

const FAQ: WdFaqItem[] = [
  {
    // autocomplete "how long does a website redesign take" (Bing + Google, x4 phrasings); Reddit "Average timeline for a complete website redesign?"
    id: "faq-how-long",
    q: "How long does a website redesign take?",
    a: "The schedule goes in writing next to the price, so you get a date rather than an estimate. What sets it on a redesign: how many pages the old site has, how much of the content stays, how fast feedback comes back and how many systems the new site connects to. The crawl and the redirect map start first.",
    links: [{ to: "#process", label: "How a website redesign runs" }],
  },
  {
    // autocomplete (Bing) "does website redesign affect seo", "how much does a website redesign affect seo"
    id: "faq-seo",
    q: "Does a website redesign affect SEO?",
    a: "Yes, in both directions. A redesign that drops old addresses or thins the pages that rank loses the visits they earned; one that redirects every old address, keeps the content that ranks and fixes titles and speed can gain. The redirect list, written before design starts, is the difference between the two.",
    links: [{ to: "#seo", label: "How a redesign keeps your SEO" }],
  },
  {
    // websearch "How often should you redesign your website?"; Quora "How often should a business update or redesign its website?"
    id: "faq-how-often",
    q: "How often should you redesign your website?",
    a: "There is no fixed interval. Redesign when the site fails a test that matters: it does not work on a phone, it cannot do what the business now does, nobody can change it, it is slow, or the rankings have stalled. A site that passes those tests needs a content update, not a redesign.",
    links: [{ to: "#signs", label: "Signs it is time to redesign" }],
  },
  {
    // autocomplete (Google) "how to redesign website without losing seo"; Reddit r/SEO "On-Page optimization before the launch of a website redesign?"
    id: "faq-without-losing",
    q: "How do you redesign a website without losing SEO?",
    a: "Crawl the old site first and export every address; map each one to a page on the new site; write the redirects before the first screen is designed; keep the pages that rank, as shown in Search Console; test every redirect on the preview; then read Search Console after launch and fix what it reports.",
  },
  {
    // autocomplete "how much does a website redesign cost" (Bing + Google), "what does a website redesign cost", "how much should a website redesign cost"
    id: "faq-cost",
    q: "How much does a website redesign cost?",
    a: "A redesign is priced like a new site plus the redirect list and the content audit, each a named line in the written scope. What moves it is the same as any build: how many layouts, whether the content stays or is rewritten, and what the site connects to. The price and the schedule come in writing first.",
    links: [{ to: LINKS.cost, label: "How much does a website cost?" }],
  },
  {
    // autocomplete (Bing) "should i redesign my website"; Quora "How to know if my website needs a redesign or just minor changes"
    id: "faq-should-i",
    q: "Should I redesign my website?",
    a: "Redesign it if it fails on a phone, cannot do what the business now does, or sits on a platform or with a developer you cannot reach. Do not redesign it because it looks dated: if it is found, read and converts, measure it first and change what the measurements say. We tell you which case you are in.",
  },
  {
    // autocomplete (Bing) "can ai redesign my website", (Google) "how to redesign website with ai"
    id: "faq-ai",
    q: "Can AI redesign my website?",
    a: "AI tools can draft layouts and copy. They do not crawl your old site, map its addresses, audit which pages earn visits, wire your booking or CRM, or test the redirects before launch, and that is the work that decides whether a redesign keeps its customers. Whatever drafts the first screen, the result is code you own.",
  },
  {
    // autocomplete (Google) "how to redesign website on squarespace", "how to redesign website on wix", "how to redesign website in wordpress"
    id: "faq-platforms",
    q: "Can you redesign a Squarespace, Wix or WordPress site?",
    a: "Yes. The content is exported, every address is mapped and redirected, and the new site is coded and launched on hosting in your name, on the same domain. The design and the layout stay behind on the platform, which is what you are replacing; the words, the images and the search history come with you.",
    links: [{ to: "#existing", label: "Working with the site you already have" }],
  },
  {
    // Reddit "Should I stage a website redesign in a subdomain or a subdirectory?"
    id: "faq-staging",
    q: "Should a redesign be staged on a subdomain or a subdirectory?",
    a: "Neither for the public: the new site is built on a preview address that search engines are told not to index, the redirects are tested there, and launch is a DNS change onto the same domain. Staging in a public subdirectory of the live site creates duplicate pages that have to be cleaned up afterwards.",
  },
];

/** The gated case: a window of the named site under the SEO unit, with the measured figures only for Phantom. */
const CASE_SECTION: ServiceSection | null = REDESIGN_CASE
  ? {
      kind: "windows", id: "measured", slugs: [REDESIGN_CASE], screen: "second",
      h2: "One redesign, measured",
      lede: "The site below replaced an earlier site on the same domain; open it here and read the figures behind Verify, with their source and dates.",
      leadIn: "By the numbers:",
      lead: "one client, one window of dates, Google Search Console as the source; no revenue claim is made.",
      verify: REDESIGN_CASE === "phantom-arcades" ? { id: "phantom-redesign", label: "Phantom redesign figures", line: "Measured on one redesign" } : undefined,
    }
  : null;

const CASE_DIALOGS: ServiceDialog[] = REDESIGN_CASE === "phantom-arcades"
  ? [{
      id: "phantom-redesign",
      title: "Phantom Arcades: the redesign, measured",
      intro: "Search figures after the redesign, as published in our case study with Google Search Console as the source. One client, one window; no revenue claim is made.",
      rows: PHANTOM_REDESIGN.rows,
      primary: { href: PHANTOM_REDESIGN.post, label: "Read the case study" },
    }]
  : [];

export const WEBSITE_REDESIGN: ServicePageData = {
  path: LINKS.redesign,
  name: "Website redesign",
  seo: {
    title: "Website Redesign Services That Keep Rankings | One Algorithm",
    description: "Website redesign that keeps your domain, content and rankings: redirect list first, content audit, new code you own. Written scope: (610) 890-9711.",
    dateModified: "2026-10-24",
    ogAlt: "A redirect map drawn on a night-blue ground: six old addresses on the left joined by 301 lines to six new pages on the right, sample addresses.",
  },
  hero: {
    kicker: "Website redesign",
    h1: "Website redesign that keeps your rankings",
    lede: "A website redesign is a new design and new code on the domain you already own, with every old address redirected so the rankings stay.",
    figure: "redirect",
  },
  service: {
    name: "Website redesign",
    description: "Website redesign for businesses across the United States: a crawl of the old site and a redirect list before design starts, a content audit that keeps what ranks, new design and code on the same domain, redirects tested before launch and Search Console read after it, the site handed over in the client's accounts.",
  },
  dialogs: CASE_DIALOGS,
  sections: [
    {
      kind: "text", id: "what",
      h2: "What is a website redesign?",
      lede: "A website redesign changes how a site looks and how it is built while keeping what it has earned: its domain, content and search history.",
      leadIn: "Why it matters:",
      lead: "a redesign that treats the old site as disposable throws away the one asset a new site cannot buy, its history.",
      cards: [
        { h3: "What changes", line: "The design, the code, the speed, the structure of the pages, and whatever the old site could not do: booking, quoting, a store, a login." },
        { h3: "What stays", line: "Your domain, your accounts, the content that earns visits, and every address search engines and other sites already point at." },
        { h3: "What moves with you", line: "The Business Profile link, the analytics history, the reviews, and the search history, all carried by the redirect list." },
      ],
      links: [{ to: `${LINKS.hub}#redesign`, label: "Website redesign on the showcase" }],
    },
    {
      kind: "text", id: "signs",
      h2: "Signs it is time to redesign",
      lede: "Redesign when the site fails on a phone, cannot do what the business now does, or when nobody can change it.",
      leadIn: "Yes, but:",
      lead: "a dated look on its own is not a reason; if the site works, measure it before you replace it.",
      table: {
        caption: "Five signs a website needs a redesign, what each usually means, and what we check first",
        cols: ["Sign", "What it usually means", "What we check"],
        rows: [
          ["It does not work on a phone", "A layout built for desktops; tap targets too small; text that needs zooming", "Every page at 390 pixels wide, tap sizes, sideways scroll"],
          ["It cannot do what the business now does", "The site predates the booking, the quoting, the new service or the store", "The list of systems the business runs today"],
          ["Nobody can change it", "A platform or a developer nobody can reach holds the keys", "Who holds the domain, the hosting and the code"],
          ["It is slow", "Camera-size images, third-party scripts, a theme loading everything on every page", "A page-speed report, page by page"],
          ["Rankings have stalled or dropped", "Thin pages, duplicate titles, addresses that changed without redirects", "Search Console, the last sixteen months"],
        ],
      },
      deeper: {
        label: "when a redesign is the wrong answer",
        paras: [
          "If the site is found, read and converts and the complaint is only that it looks old, a redesign risks the first three to fix the fourth. The cheaper move is a refresh on the same code: type, colour, photography, a tighter home page. If the complaint is speed, the fix is often two images and a script. We measure first and quote the smallest job that passes the tests, and we say which job that is.",
        ],
      },
    },
    {
      kind: "text", id: "seo", figure: "redirect",
      h2: "How a redesign keeps your SEO",
      lede: "A redesign keeps your SEO when every old address is crawled, mapped to a new one and redirected before launch, then watched in Search Console.",
      leadIn: "What we do:",
      lead: "the redirect list exists before the first screen is designed, and the content audit decides what stays before anything is rewritten.",
      points: ["Crawl: every address on the old site, exported", "Map: each old address to its new page, one to one", "Test: redirects checked before launch; Search Console read after"],
      deeper: {
        label: "the redirect list, step by step",
        paras: [
          "The crawl exports every address the old site answers, including the ones nobody remembers: old blog posts, PDFs, pages with query strings. Each is mapped to the page on the new site that answers the same question, one to one wherever one exists; a page with no successor is mapped to its nearest parent, never to the home page in bulk. The map is written as 301 redirects, tested on the preview against the full list, and shipped with the site.",
          "After launch, Search Console is read for crawl errors and for the pages that earned impressions before, and anything that dropped is traced to its redirect. Titles, headings and schema are written for the new pages at build time, as on every site: [how a new website gets found](/services/website-development#found).",
        ],
      },
    },
    ...(CASE_SECTION ? [CASE_SECTION] : []),
    {
      kind: "text", id: "content",
      h2: "Content audit: keep what ranks",
      lede: "A content audit sorts every page of the old site into keep, rewrite or retire, using Search Console to show which pages earn visits today.",
      leadIn: "Why it matters:",
      lead: "the pages that bring customers are rarely the ones the owner would have guessed, so the audit comes before the sitemap.",
      cards: [
        { h3: "Keep", line: "Pages that earn impressions and clicks today keep their content and their address or get a one-to-one redirect; the design around them changes." },
        { h3: "Rewrite", line: "Pages that answer a real question badly: thin service pages, duplicate titles, text written for a search engine rather than a customer." },
        { h3: "Retire", line: "Pages nobody visits and nothing links to; each one is redirected to its nearest parent so no address returns an error." },
      ],
      deeper: {
        label: "what the audit reads",
        paras: [
          "Sixteen months of Search Console, page by page: impressions, clicks, the queries each page shows for. The crawl's own data: which pages are linked from where, which titles repeat, which pages are near-duplicates. And the business: which services still exist, which towns are still served, which prices or names have changed. The result is a sheet with a decision on every row, and that sheet becomes the new site's page list.",
        ],
      },
    },
    {
      kind: "text", id: "existing", figure: "sheet",
      figureCaption: "The same content, three layouts: full-bleed, split, centred. A redesign keeps the words and chooses the layout again; nothing here is client work.",
      h2: "Working with the site you already have",
      lede: "Yes, we work with the site you already have: the content, the accounts and the domain stay, and the design and code are replaced.",
      leadIn: "Yes, but:",
      lead: "sometimes rebuilding is cheaper than fixing, and we say which one you are looking at rather than quoting the bigger job.",
      deeper: {
        label: "sites on a platform, and sites with no source",
        paras: [
          "A site on Squarespace, Wix or WordPress can be redesigned off the platform: the content is exported, the addresses are mapped and redirected, and the new site runs on hosting in your name on the same domain. The layout stays behind, which is what you are replacing.",
          "A site a developer built and left can be rebuilt from its content and its analytics even when the source is lost: the crawl recovers the pages and addresses, Search Console says which ones mattered, and the new code is written so this cannot happen again, with the repository in your name from the first commit.",
        ],
      },
    },
    {
      kind: "text", id: "options",
      h2: "Refresh, redesign or rebuild",
      lede: "A refresh changes the look on the same code, a redesign replaces design and code, and a rebuild replaces the content structure too.",
      leadIn: "The bottom line:",
      lead: "we quote the smallest of the three that does the job, and the table says how to tell them apart.",
      table: {
        caption: "Refresh, redesign and rebuild compared: what changes and when each fits",
        cols: ["Option", "What changes", "When it fits"],
        rows: [
          ["Refresh", "Type, colour, photography and spacing on the same code; the pages and addresses stay", "The site works and is owned; only the look is dated"],
          ["Redesign", "New design and new code on the same domain; the content stays, every address is redirected", "The site fails on phones, is slow, or cannot do what the business now does"],
          ["Rebuild", "New design, code and page structure; the content is re-planned and every old address is mapped", "Thin or duplicate content, a structure that never fit the business, or a platform you cannot leave"],
        ],
      },
    },
    {
      kind: "text", id: "cost",
      h2: "What a redesign costs, and why",
      lede: "A website redesign is priced like a new site plus two lines: the redirect list and the content audit, each named in the written scope.",
      leadIn: "What you get:",
      lead: "the price and the schedule in writing before anything is designed, and what we would cut if the number is wrong.",
      cards: [
        { h3: "The redirect list", line: "Sized by the number of addresses the crawl finds, not by the number of pages you remember having." },
        { h3: "The content audit", line: "Sized by the number of pages and by how much of the text is kept, rewritten or retired." },
        { h3: "Everything else", line: "Priced as any build: layouts, content to be made, integrations, and whether the new site sells, books or logs people in." },
      ],
      links: [{ to: LINKS.cost, label: "How much does a website cost?" }, { to: `${LINKS.hub}#cost`, label: "The cost drivers on the showcase" }],
      deeper: {
        label: "why the two lines are never the saving",
        paras: [
          "A redesign without a redirect list launches with the old site's search history pointed at pages that no longer exist, and the rankings it took years to earn go with them. A redesign without a content audit rewrites the pages that were working and keeps the ones that were not. Both lines are small next to the design and the code, and both are the reason the redesign pays for itself, so they are the first two lines of every redesign scope we write.",
        ],
      },
    },
    {
      kind: "demand", id: "demand",
      h2: "What people search before a redesign",
      lede: "Website redesign is searched 5,400 times a month in the United States, website redesign services 3,600 and website redesign company 880, by Semrush's count.",
      leadIn: "By the numbers:",
      lead: "Google Trends puts the phrase at 6 in 2021 and 41 in 2026, the steepest climb among the website terms we tracked.",
      rows: [
        { phrase: "website redesign", volume: 5400, cpc: 12.11 },
        { phrase: "website redesign services", volume: 3600, cpc: null },
        { phrase: "website redesign company", volume: 880, cpc: 18.02 },
        { phrase: "website redesign (Trends)", volume: 41, cpc: null, label: "Google Trends index for “website redesign”, 2026 (2021: 6)", src: "Google Trends · US · 2026 = Jan–Sep · read 24 Oct 2026" },
      ],
      deeper: {
        label: "how to read these figures",
        paras: [
          "Volume is Semrush's average monthly count of US searches for the phrase as written; CPC is what advertisers pay Google per click on it, in US dollars, and Semrush holds no CPC for the services phrasing. The Trends figure is Google's relative interest, scaled to the phrase's own five-year peak and averaged by year, with 2026 covering January to September. None of them is a price for a redesign.",
          "The questions those searchers type next, from autocomplete and from the forums where owners compare notes, are answered in the FAQ at the foot of this page: how long, whether it affects SEO, how often, and whether a platform site can be redesigned.",
        ],
      },
    },
    {
      kind: "text", id: "after", figure: "handover",
      h2: "After the redesign: hosting, security, support",
      lede: "After a redesign the site runs on hosting and a domain in your name, with HTTPS and security headers set at launch.",
      leadIn: "Why it matters:",
      lead: "if the old site lived on a platform or with a developer nobody could reach, that ends at handover.",
      points: ["Repository, domain, DNS and hosting in your accounts", "HTTPS and security headers set at launch, as on this site", "Support after launch scoped in the written proposal"],
      links: [{ to: `${LINKS.hub}#after-launch`, label: "After launch: support, hosting and security" }, { to: `${LINKS.hub}#ownership`, label: "What we build with, and what you keep" }],
    },
    {
      kind: "process", id: "process",
      h2: "How a website redesign runs",
      lede: "A website redesign runs in the same five stages as a new build, with the crawl and the redirect map added to the first two.",
      leadIn: "What you get:",
      lead: "the scope, price and schedule are in writing at stage two, and the redirects are tested before stage five.",
      links: [{ to: `${LINKS.hub}#process`, label: "How a custom website build runs" }],
    },
    {
      kind: "office", id: "who",
      h2: "Who does the redesign",
      lede: "OneAlgorithm designs and builds websites from Malvern, PA; the company was founded in 2020 and holds a 5.0 Google rating from 6 reviews.",
      leadIn: "Why it matters:",
      lead: "we take on redesign work for businesses across the United States remotely from Malvern, PA, reviewing each screen in your own browser.",
      question: { q: "Will my site go down during the redesign?", a: "No. The new site is built on a preview address while the old one keeps running, the redirects are tested there, and the switch is a DNS change at launch; the old pages answer until the moment the new ones do. If anything needs rolling back, the old site is still there to point at." },
      links: [{ to: `${LINKS.hub}#check`, label: "A web design company you can check" }, { to: LINKS.phl, label: "Web design for Philadelphia businesses" }, { to: LINKS.che, label: "Web design for Chester County businesses" }],
    },
    { kind: "faq", id: "faq", h2: "Website redesign questions", items: FAQ },
    {
      kind: "routes", id: "next", h2: "Where to go next", lede: "The pages this one leans on: the showcase units it summarises, the two sibling services, and the local pages.",
      items: [
        { to: `${LINKS.hub}#redesign`, title: "Website redesign that keeps what already works", tag: "Showcase · unit 4" },
        { to: LINKS.cost, title: "How much does a website cost?", tag: "Service" },
        { to: LINKS.small, title: "Small business website design", tag: "Service" },
        { to: `${LINKS.hub}#found`, title: "How a new website gets found", tag: "Showcase · unit 12" },
        { to: `${LINKS.hub}#after-launch`, title: "After launch: support, hosting and security", tag: "Showcase · unit 10" },
        { to: LINKS.phl, title: "Web design for Philadelphia businesses", tag: "Local" },
        { to: LINKS.che, title: "Web design for Chester County businesses", tag: "Local" },
      ],
    },
  ],
  desk: {
    h2: "Tell us what the site cannot do today",
    lede: "Send the address of the site you have and what it fails at, and the scope, price and schedule for the redesign come back in writing.",
    covers: ["Your current address, and who holds the domain, hosting and code", "What the site cannot do today: phones, booking, a store, speed", "What you have: text, photos, logins, Search Console access"],
    prompt: "What is the site's address, and what can it not do?",
    topic: "website-redesign",
  },
};

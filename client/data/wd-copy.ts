/* /services/website-development: the 17 Smart Brevity units, strings only, in the spec's order and wording.
 * Source of truth: onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/structure-spec.md §4.2 (H2 exact, answer
 * block = lede <= 25 words + one lead-in <= 25 words, <= 3 bullets <= 15 words) and design-contract-webdev.md §4.
 * Every claim traces to structure-spec.md §5 or claims-and-assets.md §G. Go-deeper bodies hold links, so they live
 * in the page component; their word budget is 220. Re-run the run folder's spec_lengths_check.py after any edit. */

import type { LeadIn } from "../components/sf";

export type WdUnit = {
  /** Section id (the in-page anchor; #cost, #industries, #ownership, #process and #builder-or-custom are linked from elsewhere). */
  id: string;
  title: string;
  lede: string;
  /** The one lead-in and its sentence; the FAQ and desk units have none (the desk's "What happens next" is DeskCTA's list). */
  leadIn?: LeadIn;
  lead?: string;
  points?: string[];
  /** Completes "Go deeper: …" (the summary's accessible name). */
  deep?: string;
};

export const PAGE_PATH = "/services/website-development";
export const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
/** The last real content edit = the visible "Updated" line = WebPage.dateModified. */
export const PAGE_UPDATED = "2026-10-24";
export const PAGE_UPDATED_LABEL = "24 October 2026";
export const TITLE = "Custom Web Design & Development Services | OneAlgorithm";
export const DESCRIPTION =
  "Custom web design and development for US businesses from Malvern, PA: accessible, built around what you run, owned outright. Written scope: (610) 890-9711.";
export const OG_IMAGE = "https://onealgorithm.com/media/og-website-development.jpg";
export const OG_ALT = "Six website windows on a night-blue ground: the live client sites OneAlgorithm built, framed as on the page.";

export const U: Record<string, WdUnit> = {
  work: {
    id: "work",
    title: "Websites we built, open them here",
    lede: "OneAlgorithm is a web design and development company in Malvern, PA, and these six sites are our work: open any of them here.",
    leadIn: "Why it matters:",
    lead: "a live site shows what a template cannot, how it loads, reads and sells on the device in your hand.",
    deep: "how the previews work",
  },
  what: {
    id: "what",
    title: "What is custom website development?",
    lede: "Custom website development means a site designed and coded for one business, its content and its systems, instead of a template filled in.",
    leadIn: "Why it matters:",
    lead: "the page you are reading was built this way, and the build stage beside it shows the same process in miniature.",
    points: ["Designed around one business, from its content outward", "Coded, not configured: no theme, no page builder", "Owned outright: code, domain and hosting in your name"],
    deep: "what custom excludes, and how this page was built",
  },
  build: {
    id: "build",
    title: "What we design and build",
    lede: "We design and build marketing and lead-generation sites, online stores and web applications, wired to the forms, CRM, bookings and payments you use.",
    leadIn: "What you get:",
    lead: "one team for design, code and integrations, with the scope and price written down before the build starts.",
    deep: "what each build includes, and which site is which",
  },
  redesign: {
    id: "redesign",
    title: "Website redesign that keeps what already works",
    lede: "A website redesign replaces the design and code while keeping your domain, your content and every address search engines already know, each one redirected.",
    leadIn: "Why it matters:",
    lead: "a redesign that drops old URLs loses the rankings the old site earned, so the redirect list is written before the first screen is designed.",
    points: ["Redirect list first: every old address maps to a new one", "Content audit: keep what ranks, rewrite what does not", "Same domain, same accounts, new code"],
    deep: "how a redesign keeps your rankings",
  },
  small: {
    id: "small-business",
    title: "Website design for small businesses",
    lede: "Small business website design is scoped to three jobs: be found, explain the service, and turn a visit into a call, booking or order.",
    leadIn: "What we do:",
    lead: "we size the build to that list, so a home inspector, a tutor or a contractor pays for pages that work.",
    points: ["Be found: Business Profile, titles, schema and Search Console from day one", "Explain: service pages in the owner's words, by area where it matters", "Convert: phone first, forms to email and CRM, booking where it fits"],
    deep: "what a small business site has to do",
  },
  process: {
    id: "process",
    title: "How a custom website build runs",
    lede: "A custom website build runs in five stages, from agreeing what the site is for to launch and support, with the work visible throughout.",
    leadIn: "What you get:",
    lead: "the scope, price and schedule in writing before stage three, and a site in your own accounts at stage five.",
  },
  cost: {
    id: "cost",
    title: "How much does a website cost?",
    lede: "A website's cost is set by its scope: page layouts, existing content, what it connects to, and whether it sells, books or logs people in.",
    leadIn: "The bottom line:",
    lead: "tell us what the site has to do and you get the price and the schedule in writing before anyone builds anything.",
    deep: "how the written scope works",
  },
  builder: {
    id: "builder-or-custom",
    title: "Squarespace, Wix or WordPress versus custom",
    lede: "Squarespace, Wix or WordPress suits standard layouts on a monthly fee; custom code suits a site that must do something specific or be owned outright.",
    leadIn: "Yes, but:",
    lead: "the table below says which is which, including the cases where the builder wins.",
    deep: "when we say use the builder",
  },
  a11y: {
    id: "accessibility",
    title: "ADA compliance and accessible websites",
    lede: "An ADA compliant website is one people with disabilities can use; we build and test it against WCAG 2.1 AA.",
    leadIn: "What we do:",
    lead: "keyboard access, contrast, text alternatives and structure, checked with the automated rules an auditor runs, then by keyboard.",
    points: ["WCAG 2.1 AA as the written standard in every proposal", "Automated rules on every build, then a keyboard pass", "No accessibility overlay: fixes go in the code"],
    deep: "the legal question, and how we test",
  },
  after: {
    id: "after-launch",
    title: "After launch: support, hosting and security",
    lede: "After launch the site runs on hosting and a domain you control, with HTTPS and security headers in place, and we stay on for support.",
    leadIn: "Why it matters:",
    lead: "the one thing a new site must not do is depend on the people who built it.",
    deep: "what the handover includes, and how support is scoped",
  },
  own: {
    id: "ownership",
    title: "What we build with, and what you keep",
    lede: "We build with HTML, CSS and TypeScript and hand over the source, the domain and the hosting, written so another developer can pick it up.",
    leadIn: "What you get:",
    lead: "the website and the code are yours outright when it is finished, with no license to keep paying to stay online.",
    deep: "what transfers to you, and what we build on",
  },
  found: {
    id: "found",
    title: "How a new website gets found",
    lede: "A new website gets found when its structure, titles and schema are built in and Search Console, analytics and the Business Profile connect at launch.",
    leadIn: "What we do:",
    lead: "the build includes that groundwork; search, ads and follow-up are separate services on the road map below.",
  },
  who: {
    id: "industries",
    title: "Who we build websites for",
    lede: "We build websites for small and mid-sized US businesses and for the construction, manufacturing, e-commerce and public-sector organizations on our industry pages.",
    leadIn: "Why it matters:",
    lead: "what changes between sectors is what the site connects to and the standard it is judged against, not the build.",
    deep: "what changes by sector",
  },
  choose: {
    id: "choose",
    title: "How to choose a web design company",
    lede: "Choose a web design company by what it puts in writing: code and domain ownership, hosting, scope and price, and the speed and accessibility measures.",
    leadIn: "The bottom line:",
    lead: "ask the three questions below of every firm you talk to, including us.",
    points: ["Who owns the code and the domain when it is finished?", "Where is it hosted, and who holds the login?", "How will speed and accessibility be measured, and when?"],
    deep: "what to get in writing",
  },
  check: {
    id: "check",
    title: "A web design company you can check",
    lede: "OneAlgorithm is a web design and development company in Malvern, PA, founded in 2020 and rated 5.0 from 6 Google reviews (read 23 October 2026).",
    leadIn: "By the numbers:",
    lead: "three of those six reviews come from the clients whose sites you can open above.",
    deep: "how to check us",
  },
  faq: {
    id: "faq",
    title: "Website design and development questions",
    lede: "Nine questions people ask before a first call, each answered in its first sentence.",
  },
  desk: {
    id: "start",
    title: "Tell us what the site has to do",
    lede: "Describe what the site needs to do and you get the scope, price and schedule in writing before anyone builds anything.",
    /* "What happens next:" is rendered by DeskCTA as its numbered list (DESK.next), not as a lead-in sentence. */
  },
};

/** U3: the four kinds of build, one line each (H3 rows beside the demo sheet). */
export const BUILD_KINDS: { title: string; line: string; to?: string; linkLabel?: string }[] = [
  { title: "Marketing and lead-generation sites", line: "Service pages, a phone that is one tap away, and forms that reach the inbox and the CRM." },
  { title: "Online stores", line: "Catalogue, stock and checkout on the platform that fits, with one count for the website and the counter." },
  { title: "Web applications", line: "Sites that log people in, take bookings, price a build or run a process.", to: "/services/application-development", linkLabel: "Application development" },
  { title: "Integrations: forms, CRM, bookings, payments", line: "Wired to the systems you already run, with a record when a sync fails.", to: "/services/salesforce", linkLabel: "Salesforce consulting" },
];

/** U10: the three H3 rows; `hl` is the HandoverPlate node the row lights (data-hl-key). */
export const AFTER_ROWS: { title: string; line: string; hl: "repo" | "dns" | "host" | "docs" }[] = [
  { title: "Hosting and domain in your name", line: "Deployed where you control it, with DNS in your account, not ours.", hl: "host" },
  { title: "Security: HTTPS and security headers", line: "HTTPS and security headers set at launch, as on this site.", hl: "dns" },
  { title: "Updates and support after launch", line: "We stay on under the written proposal's terms; every project is scoped on its own.", hl: "docs" },
];

/** U11: the handover ledger (wording as live since 2026-08-24, WebsiteDevelopment.tsx HANDOVER). */
export const HANDOVER: { k: string; text: string }[] = [
  { k: "REPO", text: "Source in your own repository, from day one and at handover" },
  { k: "DNS", text: "Domain and DNS in your account, not ours" },
  { k: "HOST", text: "Deployed somewhere you control, and can move" },
  { k: "DOCS", text: "Written so another developer can pick it up" },
];

/** U13: the two link rows (hub and spoke; ILK-02). */
export const SECTOR_LINKS = [
  { label: "website development for construction", to: "/industries/construction" },
  { label: "manufacturing", to: "/industries/manufacturing" },
  { label: "e-commerce", to: "/industries/ecommerce" },
  { label: "government", to: "/industries/government" },
];
export const LOCAL_LINKS = [
  { label: "web design for Philadelphia businesses", to: "/services/web-design-philadelphia" },
  { label: "web design for Chester County businesses", to: "/services/web-design-chester-county" },
];

/** U15: the NAP band (companyProfile / StructuredData values; the service area as Google has it). */
export const NAP = {
  name: "OneAlgorithm",
  l1: "Malvern, PA",
  l2: "(610) 890-9711",
  phone: { display: "(610) 890-9711", href: "tel:+16108909711" },
  counties: ["Chester County, PA", "Delaware County, PA", "Montgomery County, PA", "Bucks County, PA", "Philadelphia County, PA", "New Castle County, DE"],
  travel: "Most work runs remotely; in-person sessions when the project calls for them, easiest across the Philadelphia region.",
};

/** U17: the desk. */
export const DESK = {
  form: { need: "website", topic: "website", topicLabel: "Website", heading: "Start a project", prompt: "What does the site have to do?", submitLabel: "Start a project" },
  covers: ["What the site has to do (sell, book, explain, log people in)", "The sites you like, and why", "What you have: domain, hosting, content, logins"],
  coversLabel: "What to have ready",
  next: ["Send it on the contact page, or call", "A person at OneAlgorithm reads it and replies", "If it fits, the written scope and price follow"],
};

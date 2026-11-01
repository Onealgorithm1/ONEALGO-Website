/* /services/web-design-chester-county: copy and facts (structure-spec.md §8, §8.1; page-map-webdev.md row 2).
 * The office is in the county, so this page says so with the full NAP. Starzi Brothers (Chadds Ford; works Chester,
 * Montgomery and Delaware counties) is the one local site, under the 2026-10-01 listing rule (claims-and-assets.md
 * §A row 5, §F; missing.md #9 asks Louis). "WordPress" appears only as a choice we explain, never as a delivery
 * claim (claims-and-assets.md §B2: no delivered WordPress site on file). The SEO queries stay on
 * /services/seo-chester-county: one link, no SEO heading.
 * 2026-11-01 (SEO round 2): title/H1 retargeted to "web design chester county" + "custom website design(ers)" (GSC pos 6-8);
 * no SEO-service phrase in title/H1/meta (515 impressions overlapped the SEO page); county vs state split with
 * /services/web-design-pennsylvania (552 overlapping impressions), cross-linked both ways. */
import type { LocalPlace } from "./types";

const HUB = "/services/website-development";

export const CHESTER_COUNTY: LocalPlace = {
  path: "/services/web-design-chester-county",
  name: "Chester County",
  seo: {
    title: "Web Design Chester County, PA | Custom Website Designers",
    description: "Custom website designers in Chester County, PA: custom website design and development from our Malvern office, on sites you own outright. (610) 890-9711.",
    dateModified: "2026-11-01",
  },
  hero: {
    kicker: "Custom web design and development",
    h1: "Web design in Chester County, PA: custom websites built in Malvern",
    lede: "We are a website development company that designs and builds custom websites for Chester County businesses from our Swedesford Road office in Malvern, with scope and price in writing first.",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Chester County, PA" },
  facts: {
    geoName: "Chester County, Pennsylvania (Census code 42029)",
    pulled: "2026-10-21",
    rows: [
      { geo: "county:42029", fact: "Total establishments (all industries)", period: "2023", value: 15102, label: "Business establishments in the county", source: "Census CBP 2023 · +3.3% since 2018" },
      { geo: "county:42029", fact: "Establishments with 20-99 employees", period: "2023", value: 1923, label: "Establishments with 20 to 99 employees", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Establishments, NAICS 5415 Computer systems design and related services", period: "2023", value: 577, label: "Computer systems design establishments (NAICS 5415)", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Total population", period: "2024", value: 560745, label: "Population", source: "Census ACS 1-year 2024" },
      { geo: "county:42029", fact: "Total establishments (all industries)", period: "2018", value: 14618, label: "Business establishments, 2018", source: "Census CBP 2018" },
      { geo: "county:42029", fact: "Total paid employees (mid-March, all industries)", period: "2023", value: 262454, label: "Paid employees", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Establishments, NAICS 54 Professional, scientific and technical services", period: "2023", value: 2464, label: "Professional, scientific and technical services", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Establishments, NAICS 62 Health care and social assistance", period: "2023", value: 1625, label: "Health care and social assistance", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Establishments, NAICS 23 Construction", period: "2023", value: 1537, label: "Construction", source: "Census CBP 2023" },
      { geo: "county:42029", fact: "Establishments, NAICS 44-45 Retail trade", period: "2023", value: 1353, label: "Retail trade", source: "Census CBP 2023" },
    ],
  },
  sections: [
    {
      kind: "intro",
      id: "custom",
      h2: "Custom website designers in Chester County",
      lede: "Custom website designers build the site around one business, its content and its systems; that is how we build for Chester County businesses.",
      leadIn: "Why it matters:",
      lead: "A template decides what your site can do; a custom build starts from what the business needs it to do.",
      cards: [
        { h3: "Built for the job, not a template", line: "Written in HTML, CSS and TypeScript, so the site can take a booking, quote a job or reach your systems." },
        { h3: "Built so people can find it", line: "Page structure, titles, headings and schema are set during the build, not bolted on months later." },
        { h3: "Fast on a phone", line: "Designed at 390 pixels first, opened out from there, and tested in iPhone and Android browser profiles before launch." },
      ],
      deeper: {
        label: "what custom means in practice",
        paras: [
          "A page builder hands you a set of layouts and asks the business to fit them. A custom build runs the other way: we start from what visitors need to do, whether that is request a quote, book a slot or compare products, and design the pages around those jobs.",
          "The code is ordinary, well-documented web code. Nothing about it needs us to keep it running, and nothing locks you into a monthly platform fee.",
          "The longer explanation, with the build stage in motion, is on the main page: [what custom website development is](/services/website-development).",
        ],
      },
    },
    {
      kind: "work",
      id: "work",
      first: ["starzi-bros"],
      h2: "A website development company in Chester County",
      lede: "Yes, OneAlgorithm is a website development company in Chester County: design, code, integrations and handover from one office.",
      leadIn: "What you get:",
      lead: "six live sites you can open below, starting with Starzi Brothers, an excavation and concrete contractor in Chadds Ford.",
      deeper: {
        label: "about the Starzi Brothers build",
        paras: [
          "Starzi Brothers moved off Squarespace: a page for each service and town, and a quote form that lands in the office inbox. Its work spans three counties, which is why every town it covers has a page of its own rather than a line in a list.",
          "The other five sites belong to businesses outside the county, from a home arcade builder to a tutor and a clothing label; each card opens the live site here.",
        ],
      },
    },
    {
      kind: "text",
      id: "platform",
      h2: "WordPress or custom code for your site",
      lede: "WordPress fits a site that a standard theme and plugins can serve; custom code fits one that must do something specific.",
      leadIn: "The bottom line:",
      lead: "we tell you which of the two fits before quoting, and why, so the build matches the job.",
      table: {
        caption: "WordPress with a theme and plugins compared with a custom-coded site, on three points",
        cols: ["", "WordPress, theme and plugins", "Custom code"],
        rows: [
          ["What you own", "Your content; the theme and plugins carry their own licenses and update cycles", "The code, the domain and the hosting, outright"],
          ["What it connects to", "Whatever a plugin supports, plus any custom plugin code", "Whatever the business runs: CRM, bookings, payments, stock"],
          ["Upkeep", "Core, theme and plugin updates on a regular cycle", "No plugins to patch; changes are code changes in your repository"],
        ],
      },
      links: [{ to: `${HUB}#builder-or-custom`, label: "Squarespace, Wix or WordPress versus custom" }],
      deeper: {
        label: "when each one is the right call",
        paras: [
          "WordPress is a sensible choice when your team wants to edit many pages in a familiar editor and the site does standard things: pages, posts, a contact form.",
          "Custom code earns its place when the site has to price a product as it is configured or keep stock in step with a market stall. Two of the six sites above do exactly that: Phantom Arcades and The Gorband.",
        ],
      },
    },
    {
      kind: "text",
      id: "area",
      h2: "Across Chester County and the surrounding counties",
      lede: "We serve all of Chester County, from West Chester and Exton to Downingtown, Malvern, Chester Springs and Coatesville, and into neighboring counties.",
      leadIn: "Why it matters:",
      lead: "the office sits inside the county, so meeting in person is a short drive whenever a project calls for it.",
      cards: [
        { h3: "The towns in the searches", line: "Those town names show up in the searches that find this page, so each is answered here, not on a thin page of its own." },
        { h3: "The neighboring counties", line: "Our Business Profile covers five more counties across two states; the schematic beside our address shows all six." },
      ],
      deeper: {
        label: "the service area as Google lists it",
        paras: [
          "The service area on our Google Business Profile is set county by county, and the same list sits in this page's structured data, so search engines and visitors read one answer.",
          "For a business elsewhere in the state, the statewide page covers how a remote build runs: [web design across Pennsylvania](/services/web-design-pennsylvania).",
          "Distance changes how easy a first meeting is, not what gets built: the pages, the code and the handover are the same wherever the business sits. A firm two towns over and a firm across the state line get the same written scope, the same stages and the same accounts in their own name at the end.",
        ],
      },
    },
    {
      kind: "facts",
      id: "figures",
      h2: "Chester County's businesses, in public numbers",
      lede: "The county had 15,102 business establishments in 2023, per County Business Patterns, and 1,923 of them employed 20 to 99 people.",
      leadIn: "By the numbers:",
      lead: "577 establishments worked in computer systems design (NAICS 5415), and the population stood at 560,745 in 2024.",
      readouts: [0, 1, 2],
      deeper: {
        label: "who employs people in the county",
        paras: [
          "Professional, scientific and technical services led the county with 2,464 establishments in 2023, ahead of health care and social assistance at 1,625, construction at 1,537 and retail trade at 1,353. Together, employers here had 262,454 people on the payroll in mid-March 2023.",
          "That mix favors sites that explain a service and earn a call: firms selling expertise, practices taking appointments, and contractors whose quote form has to reach the office the same day.",
          "These are counts of employer establishments, so owners working alone are not in them. The county had 14,618 establishments in 2018.",
        ],
      },
    },
    {
      kind: "process",
      id: "process",
      h2: "How a Chester County web project runs",
      lede: "Every web project here runs in five stages, with scope, price and schedule agreed in writing before any design begins.",
      leadIn: "What you get:",
      lead: "a working site to review on your own phone from stage three, not a picture of one.",
    },
    {
      kind: "office",
      id: "office",
      h2: "Our office on Swedesford Road, Malvern",
      lede: "Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, inside the county, open Monday to Friday 9-5.",
      leadIn: "The bottom line:",
      lead: "most work runs remotely, and in-person sessions happen here or at your office when the project calls for them.",
      question: {
        q: "Do you meet in person?",
        a: "Yes. The office is here in the county, and we meet in person when the project calls for it; most of the build runs remotely.",
      },
      deeper: {
        label: "what an in-person session is for",
        paras: [
          "A first conversation across a table, a content workshop with several people from your side, or a launch walkthrough: the sessions where a room beats a screen. Everything else runs over calls, with the work reviewed in your own browser.",
          "Swedesford Road is our only address, and the phone number on this page rings in that office. Sessions are booked inside office hours.",
        ],
      },
    },
    {
      kind: "faq",
      id: "faq",
      h2: "What Chester County businesses ask us",
      schema: true,
      items: [
        {
          q: "What makes a custom website different from a template?",
          a: "A custom site is written for your business in HTML, CSS and TypeScript instead of filled into a page builder's layouts. The difference shows when the site must do something specific: take a booking, quote a job or talk to a system you already run.",
        },
        {
          q: "What are your sites built with?",
          a: "We build with HTML, CSS and TypeScript and hand over the source, the domain and the hosting, written so another developer can pick it up.",
        },
        {
          q: "How much does a custom website cost in Chester County?",
          a: "It depends on the scope: the layouts, the content, what the site connects to and whether it sells or takes bookings. The written proposal states the price and the dates before any build work starts.",
          link: { to: `${HUB}#cost`, label: "How much does a website cost?" },
        },
        {
          q: "Who owns the website when it is finished?",
          a: "You do, outright: the code in your repository, the domain in your account and the hosting under your own login.",
          link: { to: `${HUB}#ownership`, label: "What we build with, and what you keep" },
        },
        {
          q: "Can you help the site get found once it is live?",
          a: "Yes, as a separate service with its own page. The site build lays the groundwork: page structure, titles, headings and schema.",
          link: { to: "/services/seo-chester-county", label: "SEO company in Chester County" },
        },
      ],
    },
    {
      kind: "routes",
      id: "services",
      h2: "Web design services from our Malvern office",
      lede: "The same office runs search, CRM and web work, so the pieces are planned together.",
      items: [
        { to: "/services/seo-chester-county", title: "SEO in Chester County", tag: "Local search" },
        { to: "/services/salesforce-consultant-philadelphia", title: "Salesforce consulting", tag: "CRM behind the site" },
        { to: "/services/web-design-pennsylvania", title: "Web design across Pennsylvania", tag: "Statewide" },
        { to: "/services/web-design-philadelphia", title: "Web design in Philadelphia", tag: "Nearby" },
      ],
    },
  ],
  desk: {
    h2: "Start your Chester County website project",
    lede: "Describe what the site must do and the written scope, price and schedule come back before any build work starts.",
    covers: ["The job the site has to do, in a sentence", "Sites you like, and what you like about them", "What exists today: domain, hosting, copy, photos, logins"],
    prompt: "What should the new site do for the business?",
  },
};

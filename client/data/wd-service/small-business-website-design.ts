/* /services/small-business-website-design: the small-business owner page (page-map-webdev.md §1 row 3; hub unit 5 is
 * the short form). Semrush exact 10,700/mo (small business website design 4,400; small business web design 4,400;
 * website design for small business 1,900), Trends 7 → 40 (2021 → 2026). Proof = the three owner-led small businesses
 * in work.ts (ITH, TBP, Starzi), open on the page; no size claims about clients, no price (claims-and-assets.md §G). */
import type { ServicePageData } from "./types";
import type { WdFaqItem } from "../wd-faq";
import { LINKS } from "./shared";

const FAQ: WdFaqItem[] = [
  {
    // autocomplete (Google) "what is the best website for small business"
    id: "faq-best",
    q: "What is the best website for a small business?",
    a: "The best small business website is the one that does three jobs for your customers: it appears when they search nearby, it explains the service in their words, and it makes calling or booking one tap. It is not the one with the most pages or the newest effects; those cost money and earn nothing.",
    links: [{ to: "#jobs", label: "What a small business website must do" }],
  },
  {
    // autocomplete "does a small business need a website", "do small businesses still need websites", "why small business need a website"
    id: "faq-need",
    q: "Does a small business need a website?",
    a: "Yes, when customers look for the service online before they call. A Business Profile alone shows a map pin and reviews; the website is where the service is explained, the area is named and the booking or quote happens. The two work together: the Profile sends the visit and the site earns the call.",
  },
  {
    // autocomplete "what should a small business website contain"
    id: "faq-contain",
    q: "What should a small business website contain?",
    a: "A home page that says who you are, what you do and where; a page for each service in the words a customer uses; an about page naming who turns up; an area page where the work is local; and a contact page with the phone, hours and a form that lands in the inbox.",
    links: [{ to: "#pages", label: "Pages a small business website needs" }],
  },
  {
    // websearch "Should I use Wix, Squarespace, or hire a web developer?"; Reddit "Is WordPress really the best website builder for small businesses?"
    id: "faq-builder",
    q: "Should I use Wix, Squarespace, or hire a web developer?",
    a: "Use a builder when you need a few standard pages, are happy to lay them out yourself and nothing has to connect to another system; it gets you online this week for a monthly fee. Hire a developer when the site must book, quote, sell or integrate, or when you want to own it outright. We say which you are.",
    links: [{ to: `${LINKS.hub}#builder-or-custom`, label: "Squarespace, Wix or WordPress versus custom" }],
  },
  {
    // autocomplete "where to host small business website" (Google), "which website host is best for small business" (Bing)
    id: "faq-host",
    q: "Where should I host a small business website?",
    a: "Host it in an account in your own name, with the domain at a registrar you control, so the site can move if you ever change developers. Which host matters less than who holds the login: we set up HTTPS and security headers at launch on the host you choose and hand you the keys.",
    links: [{ to: "#own", label: "What you own when it is finished" }],
  },
  {
    // websearch "How to choose a web designer or developer for a small business?"; Reddit "Looking for web design companies / services for small business"
    id: "faq-choose",
    q: "How do I choose a web designer for a small business?",
    a: "Choose by what the firm puts in writing: who owns the code and the domain when it is finished, where it is hosted and who holds the login, and how speed and accessibility will be measured. Then open the sites they built on your own phone. A firm that will not write those down is asking for trust.",
    links: [{ to: `${LINKS.hub}#choose`, label: "How to choose a web design company" }],
  },
  {
    // autocomplete "do small business websites have to be ada compliant"; Reddit "Small business sued for ADA non-compliance"
    id: "faq-ada",
    q: "Do small business websites have to be ADA compliant?",
    a: "No regulation sets detailed standards for private businesses: the Department of Justice calls WCAG helpful guidance in its web guidance of 18 March 2022, and its 2024 rule with WCAG 2.1 AA dates covers state and local governments. Ask counsel about your own obligations. We build every site to WCAG 2.1 AA regardless.",
    links: [{ to: "#accessibility", label: "Accessibility for a small business website" }],
  },
  {
    // autocomplete (Bing) "who makes websites for small business", "who can create website for small business"
    id: "faq-who",
    q: "Who makes websites for small businesses?",
    a: "Freelancers, agencies, builders and firms like ours; what separates them is what you own at the end and what the site can do. OneAlgorithm designs and codes the site, wires the forms, booking and CRM, launches it in your accounts and stays on for support, and three of the small businesses we built for are open on this page.",
    links: [{ to: "#work", label: "Three small business websites, open them here" }],
  },
  {
    // near-me / remote cluster (query-clusters.md); owner rule 2026-10-24: remote delivery is the default sentence
    id: "faq-outside-pa",
    q: "Do you build small business websites outside Pennsylvania?",
    a: "Yes. The three small-business sites on this page are in New York, Massachusetts and Pennsylvania; website work runs remotely from Malvern, PA, and you review each screen in your own browser as it is built. In-person sessions happen when a project calls for them, easiest across the Philadelphia region.",
  },
];

export const SMALL_BUSINESS: ServicePageData = {
  path: LINKS.small,
  name: "Small business",
  seo: {
    title: "Small Business Website Design & Development | OneAlgorithm",
    description: "Small business website design from Malvern, PA for US businesses: be found, explain the service, turn visits into calls. Written scope: (610) 890-9711.",
    dateModified: "2026-10-24",
    ogAlt: "Three small business websites built by OneAlgorithm, framed as windows on a night-blue ground: a home inspector, a tutoring practice and an excavation contractor.",
  },
  hero: {
    kicker: "Small business website design",
    h1: "Small business website design that earns calls",
    lede: "Small business website design from OneAlgorithm does three jobs: get you found, explain the service in your words, turn a visit into a call.",
    figure: "build-roofer",
    figureCaption: "A demo contractor site built from a blank page: services, service area, a quote form and the phone one tap away. The three jobs, drawn; nothing here is client work.",
  },
  service: {
    name: "Small business website design and development",
    description: "Website design and development for owner-led small businesses across the United States: service pages in the owner's words, an area page where the work is local, forms to the inbox and the CRM, booking where the business books, the Business Profile and Search Console connected at launch, and the site handed over in the owner's accounts.",
  },
  sections: [
    {
      kind: "windows", id: "work", slugs: ["inspect-this-home", "boards-professor", "starzi-bros"],
      h2: "Three small business websites, open them here",
      lede: "Inspect This Home Inspections, The Boards Professor and Starzi Brothers are three small businesses whose websites we designed and built; open any of them here.",
      leadIn: "Why it matters:",
      lead: "a home inspector, a tutoring practice and an excavation contractor need different pages; the live sites show how each was sized.",
      deeper: {
        label: "which site does which job",
        paras: [
          "Inspect This Home Inspections, a home inspector on Long Island, has a page for each service and each area it covers, online scheduling, and inspection reports the owner updates himself. The Boards Professor, a medical exam tutoring practice in Massachusetts, books sessions on the site and shows tutor profiles with reviews pulled from two platforms onto one page. Starzi Brothers, excavation and concrete contractors in Chadds Ford, Pennsylvania, moved off Squarespace to a page for each service and each town they work, with a quote form that lands in the office inbox.",
          "The six sites we have built, including these three, are on the showcase: [websites we built, open them here](/services/website-development#work).",
        ],
      },
    },
    {
      kind: "text", id: "jobs",
      h2: "What a small business website must do",
      lede: "A small business website must appear in nearby searches, explain the service plainly and make calling or booking one tap.",
      leadIn: "What we do:",
      lead: "we write the scope against those three jobs and leave out the pages that do none of them.",
      cards: [
        { h3: "Be found", line: "Business Profile linked, one title and one heading per page in the customer's words, schema written, Search Console connected at launch." },
        { h3: "Explain", line: "A page per service in the owner's words, saying what the job covers and what happens next, plus an area page for local work." },
        { h3: "Convert", line: "The phone one tap away on every screen, a form that reaches the inbox and the CRM, and booking where the business already books." },
      ],
      links: [{ to: `${LINKS.hub}#small-business`, label: "Website design for small businesses on the showcase" }],
      deeper: {
        label: "the test a page has to pass",
        paras: [
          "Every page in the scope answers one question a customer asks before calling: what do you do, do you do it where I am, what will it involve, who will turn up, how do I reach you. A page that answers none of those is cut, however good it would look. That is why a small business site from us is short, and why the pages it has carry their weight.",
        ],
      },
    },
    {
      kind: "text", id: "pages",
      h2: "Pages a small business website needs",
      lede: "Most small business websites need five page types: home, one page per service, an about page, an area page where work is local, and contact.",
      leadIn: "Yes, but:",
      lead: "a page earns its place by answering a question a customer asks, not by filling a menu.",
      table: {
        caption: "The five page types of a small business website, what each answers, and what we ask the owner for",
        cols: ["Page", "What it answers", "What we ask you"],
        rows: [
          ["Home", "Who you are, what you do, where, and the one next step", "Your one-line description and the service you most want to sell"],
          ["Service page, one per service", "What the job involves, what it covers, what happens next", "The services you sell, in the order you sell them, in your words"],
          ["About or team", "Who turns up, and why they can be trusted", "Who the customer meets; licenses exactly as printed on your paperwork"],
          ["Area page", "Whether you work where the customer is", "The towns and counties you actually serve, not the ones you would like to"],
          ["Contact", "How to reach you, and when you answer", "Phone, hours, address, and where a lead should land: inbox, CRM, both"],
        ],
      },
      deeper: {
        label: "what we leave out",
        paras: [
          "A page for every town in a list, written once and renamed: search engines treat blocks of place names as spam, and customers can tell. A blog nobody will write. A gallery with no captions. A chat widget that answers nothing after five. A second contact form on every page. Each of these costs scope and earns no call, so none is in the default list; any of them can be added when there is a reason, and the reason goes in the proposal.",
        ],
      },
    },
    {
      kind: "text", id: "found",
      h2: "Be found: the groundwork in every build",
      lede: "Being found starts in the build: titles, headings and schema for the service and area, with Search Console and the Business Profile connected at launch.",
      leadIn: "What you get:",
      lead: "the groundwork a search engine reads on day one; ongoing search work is a separate service, named on the road map.",
      points: ["Business Profile linked to the site, and the site to it", "One title and one H1 per page, in the customer's words", "Search Console and analytics in your own Google account"],
      cards: [
        { h3: "Titles and headings", line: "Each page names its service and its area once, in the words a customer types, so the page and the search agree." },
        { h3: "Schema", line: "LocalBusiness, Service and breadcrumb markup that says the same thing the page says, nothing it does not." },
        { h3: "Accounts in your name", line: "Search Console, analytics and the Business Profile are yours; we are added as a user, not the owner." },
      ],
      links: [{ to: "/services/seo", label: "Search engine optimization" }, { to: "/services/google-ads", label: "Google Ads" }, { to: `${LINKS.hub}#found`, label: "How a new website gets found" }],
    },
    {
      kind: "text", id: "convert",
      h2: "Convert: phone first, forms to the inbox",
      lede: "A small business site converts when the phone is one tap away, forms reach the inbox, and booking runs where you already book.",
      leadIn: "What we do:",
      lead: "we wire the form to email and to the CRM you run, with a record kept when a send fails.",
      cards: [
        { h3: "Phone", line: "A tap-to-call number in the header on every page at phone widths, and the hours next to it, so nobody calls a closed office." },
        { h3: "Forms", line: "Short, named for the job (quote, booking, question), sent to the inbox and the CRM, with a copy kept if either send fails." },
        { h3: "Booking", line: "If you already book in a calendar tool, the site books into it rather than replacing a system that works." },
      ],
      links: [{ to: "/services/salesforce", label: "Salesforce consulting" }],
      deeper: {
        label: "why the phone comes first",
        paras: [
          "A customer with a leak or an exam next week does not fill in a form; they call. The number is the first thing on the screen at phone widths, the hours sit beside it, and the form is for the people who prefer to write. Both land somewhere a person reads the same day, and the Business Profile shows the same number and hours, so the call that starts on Google and the call that starts on the site are the same call.",
        ],
      },
    },
    {
      kind: "text", id: "builder", figure: "build-dentist",
      figureCaption: "A demo dental practice site built from a blank page: services, the team, online booking. A booking flow is the point where a template usually stops fitting; nothing here is client work.",
      h2: "Squarespace or Wix for a small business?",
      lede: "Squarespace or Wix suits a few standard pages with nothing connected; custom code suits a business that books, quotes or integrates.",
      leadIn: "Yes, but:",
      lead: "we tell you which one you are, including when the builder is the better buy.",
      points: ["Builder: a few pages, your own layout work, a monthly fee", "Custom: booking, quoting, CRM or stock wired in; owned outright", "Either way: the domain in your name, so you can move"],
      links: [{ to: `${LINKS.hub}#builder-or-custom`, label: "The six-row comparison on the showcase" }],
      deeper: {
        label: "the moment a builder stops fitting",
        paras: [
          "It is usually one of three: the business starts booking or quoting online and the template's form cannot talk to the calendar or the CRM; the owner wants a page the template cannot make; or the monthly fee has run long enough that a built site would have cost less and been owned. Starzi Brothers reached the second and moved off Squarespace to a page per service and town. If none of the three applies to you, the builder is the right answer and we say so.",
        ],
      },
    },
    {
      kind: "demand", id: "demand",
      h2: "What small businesses search for",
      lede: "Small business website design is searched 4,400 times a month in the United States, and small business web design another 4,400, by Semrush's count.",
      leadIn: "By the numbers:",
      lead: "advertisers pay more than ten dollars a click for those phrases, which says the searchers are buyers, not browsers.",
      rows: [
        { phrase: "small business website design", volume: 4400, cpc: 11.77 },
        { phrase: "small business web design", volume: 4400, cpc: 10.72 },
        { phrase: "website design for small business", volume: 1900, cpc: 10.72 },
        { phrase: "website development for small business", volume: 390, cpc: 26.56 },
        { phrase: "small business website design (Trends)", volume: 40, cpc: null, label: "Google Trends index for “small business website design”, 2026 (2021: 7)", src: "Google Trends · US · 2026 = Jan–Sep · read 24 Oct 2026" },
      ],
      deeper: {
        label: "how to read these figures",
        paras: [
          "Volume is Semrush's average monthly count of US searches for the phrase as written; CPC is what advertisers pay Google per click on it, in US dollars; the Trends figure is Google's relative interest in the phrase, scaled to its own five-year peak, averaged by year. None of them is a price for a website.",
          "What they say together: the phrase is searched by people who are buying, the price advertisers pay for them has stayed above ten dollars, and interest has risen more than fivefold since 2021. The questions those searchers ask next are the FAQ at the foot of this page.",
        ],
      },
    },
    {
      kind: "text", id: "accessibility", figure: "a11y",
      h2: "Accessibility for a small business website",
      lede: "An accessible small business website is one every customer can use, and we build and test every site to WCAG 2.1 AA.",
      leadIn: "Why it matters:",
      lead: "the Department of Justice calls WCAG helpful guidance for businesses open to the public, and a build done properly meets it.",
      points: ["Keyboard access, contrast and text alternatives in every build", "Automated rules on every page, then a keyboard pass", "No accessibility overlay: fixes go in the code"],
      links: [{ to: `${LINKS.hub}#accessibility`, label: "ADA compliance and accessible websites" }],
      deeper: {
        label: "the legal question, in facts",
        paras: [
          "For state and local governments the Department of Justice's 2024 rule under Title II adopts WCAG 2.1 AA, with compliance dates of 26 April 2027 and 26 April 2028 by population, after the Interim Final Rule of 20 April 2026. For private businesses the Department has no regulation setting detailed standards and describes WCAG as helpful guidance, in its web guidance of 18 March 2022. Ask counsel about your own obligations; the sources are on the showcase. We build to WCAG 2.1 AA either way.",
        ],
      },
    },
    {
      kind: "text", id: "own", figure: "handover",
      h2: "What you own when it is finished",
      lede: "When a OneAlgorithm build is finished the small business owns the code, the domain and the hosting, with notes another developer can follow.",
      leadIn: "What you get:",
      lead: "no platform to be locked into and no license to keep paying to stay online.",
      points: ["Source in a repository in your name, from the first commit", "Domain, DNS and hosting in your accounts, not ours", "A README and the deploy steps, so anyone can pick it up"],
      links: [{ to: `${LINKS.hub}#ownership`, label: "What we build with, and what you keep" }, { to: LINKS.cost, label: "How much does a website cost?" }],
      deeper: {
        label: "why ownership matters more for a small business",
        paras: [
          "A large company can absorb a platform fee or a developer who disappears; a small business cannot. So the handover is built in from the start: the repository is yours on day one, the domain and hosting are opened in your name, and the notes are written so a developer you have never met could take over on a Monday. Support after launch is scoped in the written proposal, project by project.",
        ],
      },
    },
    {
      kind: "process", id: "process",
      h2: "How a small business website build runs",
      lede: "A small business website build runs in the same five stages as every OneAlgorithm site, from agreeing the job to launch in your accounts.",
      leadIn: "What you get:",
      lead: "the scope, price and schedule in writing at stage two, and a link you open on your own phone at stage three.",
      links: [{ to: `${LINKS.hub}#process`, label: "How a custom website build runs" }],
    },
    {
      kind: "office", id: "where",
      h2: "Where we are, and where we work",
      lede: "OneAlgorithm is a web design and development company at 625 Swedesford Rd, Unit B, Malvern, PA 19355, founded in 2020 and rated 5.0 from 6 Google reviews.",
      leadIn: "Why it matters:",
      lead: "we take on website work for businesses nationwide, remotely from Malvern, PA; the three sites are in New York, Massachusetts and Pennsylvania.",
      question: { q: "Do you meet small business owners in person?", a: "When the project calls for it, yes, and most easily across the Philadelphia region: Chester, Delaware, Montgomery, Bucks and Philadelphia counties and New Castle County, Delaware. Most work runs remotely, with each screen reviewed in your own browser as it is built, and that is how the three sites on this page were made." },
      links: [{ to: LINKS.phl, label: "Web design for Philadelphia businesses" }, { to: LINKS.che, label: "Web design for Chester County businesses" }],
    },
    { kind: "faq", id: "faq", h2: "Small business website questions", items: FAQ },
    {
      kind: "routes", id: "next", h2: "Where to go next", lede: "The pages this one leans on: the showcase units it summarises, the two sibling services, and the local pages.",
      items: [
        { to: `${LINKS.hub}#small-business`, title: "Website design for small businesses on the showcase", tag: "Showcase · unit 5" },
        { to: LINKS.cost, title: "How much does a website cost?", tag: "Service" },
        { to: LINKS.redesign, title: "Website redesign that keeps your rankings", tag: "Service" },
        { to: `${LINKS.hub}#builder-or-custom`, title: "Squarespace, Wix or WordPress versus custom", tag: "Showcase · unit 8" },
        { to: `${LINKS.hub}#found`, title: "How a new website gets found", tag: "Showcase · unit 12" },
        { to: LINKS.phl, title: "Web design for Philadelphia businesses", tag: "Local" },
        { to: LINKS.che, title: "Web design for Chester County businesses", tag: "Local" },
      ],
    },
  ],
  desk: {
    h2: "Tell us what the business does",
    lede: "Describe the service, where you do it and how customers reach you today, and the scope, price and schedule come back in writing.",
    covers: ["The services you sell, and the one you most want to sell", "The towns or counties you work, and whether you book online", "What you have: domain, hosting, text, photos, logins"],
    prompt: "What does the business do, and where?",
    topic: "website-small-business",
  },
};

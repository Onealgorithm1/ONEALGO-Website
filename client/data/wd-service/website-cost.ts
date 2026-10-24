/* /services/website-cost: the cost owner page (page-map-webdev.md §1 row 2; structure-spec.md §4.2 unit 7 is the hub's
 * short form and links here once integrate shrinks it). Semrush exact 6,580/mo across the four cost phrasings, the
 * largest question score of any cluster (701, query-clusters.md). ⛔ NO dollar figure for our work, ours or anyone's
 * (claims-and-assets.md §E, §H.1): the answer is the cost-driver table, the written scope, and what buyers compare.
 * Public Semrush volumes and CPCs are allowed as evidence of demand (printed "x.xx USD", never "$x"). */
import type { ServicePageData } from "./types";
import type { WdFaqItem } from "../wd-faq";
import { COST_DRIVERS } from "../wd-tables";
import { LINKS } from "./shared";

const FAQ: WdFaqItem[] = [
  {
    // websearch "How much does a small business website cost?"; Reddit r/smallbusiness "How much should it cost for basic website"
    id: "faq-small-cost",
    q: "How much does a small business website cost?",
    a: "A small business website costs what its three jobs cost: being found, explaining the service and turning a visit into a call. Most of the price sits in the number of page layouts and in whether the writing and photographs exist, so the written scope lists both before a figure appears.",
    links: [{ to: LINKS.small, label: "Small business website design" }],
  },
  {
    // autocomplete (Google) "how much does it cost to hire a website designer", seed "how much does a website cost"
    id: "faq-hire-designer",
    q: "How much does it cost to hire a website designer?",
    a: "A website designer charges for the scope in front of them, so the useful question is what you are asking them to design: how many layouts, with what content, connected to what. Hourly and project pricing both exist; we price the project, in writing, against the named scope, so the figure cannot drift.",
  },
  {
    // autocomplete "do websites cost money to run", "does website cost monthly", "how much website cost per month"
    id: "faq-running",
    q: "Do websites cost money to run every month?",
    a: "Yes: a domain renews yearly with your registrar and hosting is billed by your host, both in your name and at their published prices. A booking tool, a payments provider or business email each has its own fee, paid to that provider. There is no OneAlgorithm license fee to keep the site online.",
    links: [{ to: "#running", label: "Build cost and running cost, separately" }],
  },
  {
    // autocomplete "are website development costs capitalized" (Google + Bing), "is website cost capitalized or expensed"; question score 195
    id: "faq-capitalize",
    q: "Can website costs be capitalized or expensed?",
    a: "Your accountant decides how to book a website, because the answer depends on your jurisdiction, your entity and what the site does. What we control is the paperwork: every proposal separates design, development, content and running costs on their own lines, so whichever treatment applies, the split is already there.",
  },
  {
    // websearch "How much do agencies charge for website design?"; Reddit "How much are you paying for your websites?"
    id: "faq-agencies",
    q: "How much do agencies charge for website design?",
    a: "Agencies charge for the scope they are given, which is why two quotes for “a website” can differ by a multiple: they describe different sites. Ask each firm to price the same list of layouts, content, integrations and support, and the quotes become comparable. We give ours in writing against that list.",
    links: [{ to: "#compare", label: "How to compare website quotes" }],
  },
  {
    // autocomplete "what is website development cost", "what is website development charges"
    id: "faq-made-of",
    q: "What is website development cost made of?",
    a: "Website development cost is made of design time, development time, content work, integrations and the running costs of domain and hosting. The first four are paid once and the last is paid to the providers in your name. The biggest swing is content: writing and photography that do not exist yet are work.",
  },
  {
    // autocomplete "how much does a custom website cost", "how much does it cost to build a custom website"
    id: "faq-custom-vs-template",
    q: "How much does a custom website cost compared with a template?",
    a: "A custom website costs more once and nothing monthly beyond domain and hosting; a template costs less to start and a platform fee for as long as it is up. Compare them over the years you expect to keep the site, and add what the template cannot do, which is usually the reason people ask.",
    links: [{ to: `${LINKS.hub}#builder-or-custom`, label: "Squarespace, Wix or WordPress versus custom" }],
  },
  {
    // Reddit r/smallbusiness "What's a reasonable budget for a small business website?", "How much did it cost you to get a website made?"
    id: "faq-quotes-differ",
    q: "Why do website quotes differ so much?",
    a: "Because the scopes differ, even when the request was the same sentence. One firm priced five layouts and your existing text; another priced twelve layouts, new copy and a booking system. Read each quote for the five drivers on this page, and the difference usually turns out to be a difference in what is being built.",
    links: [{ to: "#drivers", label: "What sets the price of a website" }],
  },
  {
    // Reddit "[BC] How much should I expect to spend on a new website"
    id: "faq-expect",
    q: "How much should I expect to spend on a new website?",
    a: "Expect to spend what the site's job is worth to the business, and start from the job rather than a budget: what the site must sell, book or explain, and what it must connect to. Send us that list and the price comes back in writing against it, with what we would cut if the number is wrong.",
  },
];

export const WEBSITE_COST: ServicePageData = {
  path: LINKS.cost,
  name: "Website cost",
  seo: {
    title: "How Much Does a Website Cost? Cost Drivers | OneAlgorithm",
    description: "What sets the price of a website, layouts to integrations, no figure invented: tell us what it must do and get the price in writing. (610) 890-9711.",
    dateModified: "2026-10-24",
    ogAlt: "Three demo website layouts fanned on a night-blue sheet: full-bleed, split and centred, the layouts that set a website's price.",
  },
  hero: {
    kicker: "Website cost · what sets the price",
    h1: "How much does a website cost?",
    lede: "A website costs what its scope costs: the layouts, the content, the integrations and whether it sells, books or logs people in set the price.",
    figure: "sheet",
  },
  service: {
    name: "Website design and development, priced by written scope",
    description: "Custom website design and development priced against a written scope: page layouts, content, integrations, store or booking or login, and redesign versus new, with the price and schedule in writing before the build starts.",
  },
  sections: [
    {
      kind: "text", id: "drivers", cta: true,
      h2: "What sets the price of a website",
      lede: "Five things set the price of a website: page layouts, existing content, integrations, a store or booking or login, and redesign versus new.",
      leadIn: "The bottom line:",
      lead: "the table names each driver, what it changes and what we ask for, so you can price your scope before we talk.",
      table: {
        caption: "What sets the price of a website, what each driver changes, and what we ask you for",
        cols: ["What sets the price", "What it changes", "What we ask you"],
        rows: COST_DRIVERS.map((r) => [r.driver, r.changes, r.ask] as [string, string, string]),
      },
      deeper: {
        label: "how to read the table",
        paras: [
          "Count layouts, not pages. Ten service pages that share one layout cost one layout's design and ten pages of content; ten pages that each need their own arrangement cost ten designs. A small site rarely needs more than a handful: home, service, about or team, contact, and one for articles or areas.",
          "Content is the quiet driver. When the text and photographs exist, the build is assembly; when they do not, writing and photography are work, and they go in the scope as lines of their own so nothing is hidden inside a build price.",
          "Integrations are priced by what they have to do, not by the logo. A form that emails the office is small. A form that creates a CRM record, books a slot and takes a deposit is three systems talking, and the proposal says so.",
        ],
      },
    },
    {
      kind: "text", id: "written",
      h2: "The price and schedule in writing",
      lede: "Every OneAlgorithm proposal lists the pages and layouts, the integrations, the content you supply and the dates, with the price set against that list.",
      leadIn: "Why it matters:",
      lead: "a price against a named scope can be compared, cut or grown; a number on its own cannot.",
      points: ["Pages and layouts named, one by one", "Integrations and the content you supply, listed", "What we would cut if the number is wrong for you"],
      cards: [
        { h3: "Before anything is designed", line: "The scope, the price and the dates are agreed and signed first; no design work starts on a verbal number." },
        { h3: "While it is built", line: "A change of scope is written up the way the original was: what is added, what it changes, what it costs, the new date." },
        { h3: "At the invoice", line: "Nothing reaches an invoice that was not first added to the scope, so the final figure is the one you signed." },
      ],
      deeper: {
        label: "what moves a quote after signing",
        paras: [
          "Two things move a quote once it is signed, and neither is technical: content that has not been written and feedback that sits unanswered. Both carry dates in the schedule, so when a date slips everyone can see which side it slipped on.",
          "The five stages of a build, and where the written scope sits in them, are on the showcase: [how a custom website build runs](/services/website-development#process).",
        ],
      },
    },
    {
      kind: "text", id: "running",
      h2: "Build cost and running cost, separately",
      lede: "A website has a one-time build cost and a running cost, and the running cost is the domain and the hosting, held in your name.",
      leadIn: "What you get:",
      lead: "no license fee to stay online and no platform fee that ends only when the site does.",
      points: ["Domain and DNS in your registrar account", "Hosting in your account, at the host's own price", "Support after launch scoped in the proposal, project by project"],
      table: {
        caption: "What is paid once and what is paid to run a website",
        cols: ["Item", "Paid once", "Paid to run"],
        rows: [
          ["Design and build", "Yes, against the written scope", "No"],
          ["Content you commission", "Yes, as its own line", "No"],
          ["Domain", "No", "Yearly, to the registrar, in your account"],
          ["Hosting", "No", "To the host you choose, in your account"],
          ["Booking, payments, email tools", "No", "To each provider, named in the scope"],
          ["Support after launch", "No", "As the written proposal sets out"],
        ],
      },
      deeper: {
        label: "what the running cost covers",
        paras: [
          "The domain renews with the registrar you choose; the hosting is billed by the host you choose, on its own published terms, to your card. Email, a booking tool or a payments provider each has its own fee, paid to that provider; we name them in the scope so there is no surprise in month two.",
          "Support after launch is not a standard plan with a standard price: it is written per project, with what is covered and on what terms. What transfers to you at handover is on the showcase: [what we build with, and what you keep](/services/website-development#ownership).",
        ],
      },
    },
    {
      kind: "text", id: "builder",
      h2: "Custom website cost versus a website builder",
      lede: "A custom website is paid for once and owned; a builder site is rented monthly, which is the real cost comparison, not the first invoice.",
      leadIn: "Yes, but:",
      lead: "a builder is the right spend for a handful of pages nobody needs to connect to anything, and we say so.",
      points: ["Builder: lower to start, a fee for as long as the site is up", "Custom: one build price, then domain and hosting at cost", "Exit: a builder exports content; a custom site moves whole"],
      cards: [
        { h3: "Does it have to connect to anything?", line: "A CRM, a booking calendar, payments or stock: a builder offers its marketplace apps, custom code wires what you run." },
        { h3: "Will the layout need to change?", line: "A template is a fixed set of slots, so the fee stops paying the day you need a page it cannot make." },
        { h3: "Do you want to be able to leave?", line: "Content exports from a builder but the design stays behind, while a built site moves as a repository and a domain." },
      ],
      links: [{ to: `${LINKS.hub}#builder-or-custom`, label: "The six-row comparison on the showcase" }],
    },
    {
      kind: "text", id: "small-business", figure: "build-roofer",
      figureCaption: "A demo contractor site built from a blank page: services, service area, a quote form and the phone one tap away. The small-business scope, drawn; nothing here is client work.",
      h2: "What a small business website costs",
      lede: "A small business website is priced on three jobs, being found, explaining the service and turning a visit into a call, and nothing beyond them.",
      leadIn: "What we do:",
      lead: "we size the scope to those jobs, so an inspector, a tutor or a contractor pays for the pages that earn calls.",
      links: [{ to: LINKS.small, label: "Small business website design" }],
      deeper: {
        label: "where a small business spends, and where it does not",
        paras: [
          "The spend goes on the pages a customer reads before calling: the service pages in the owner's words, an area page where the work is local, the contact page with the phone one tap away. The forms reach the inbox and the CRM, booking runs where the business already books, and the Business Profile, titles, schema and Search Console are set at launch.",
          "It does not go on a page for every town in a list, on effects the customer never asked for, or on a content system more complicated than the person who will update it.",
        ],
      },
    },
    {
      kind: "text", id: "redesign", figure: "redirect",
      h2: "What a redesign adds to the price",
      lede: "A website redesign adds two lines a new site does not carry: a redirect list for every old address and a content audit.",
      leadIn: "Why it matters:",
      lead: "those two lines are what keep the rankings the old site earned, so they are never the place to save.",
      points: ["Crawl of the old site, every address mapped to a new one", "Content audit: what ranks stays, what does not is rewritten", "Redirects tested before launch, Search Console read after it"],
      links: [{ to: LINKS.redesign, label: "Website redesign that keeps your rankings" }],
    },
    {
      kind: "demand", id: "demand",
      h2: "What people search before they ask us",
      lede: "People searching for website cost in the United States ask the question itself 2,900 times a month and ask for a quote 170 times.",
      leadIn: "By the numbers:",
      lead: "advertisers pay about five times more per click for the quote than for the question: the gap between researching and buying.",
      rows: [
        { phrase: "how much does a website cost", volume: 2900, cpc: 3.92 },
        { phrase: "website design cost", volume: 1900, cpc: 6.48 },
        { phrase: "website cost", volume: 1300, cpc: 4.11 },
        { phrase: "website design pricing", volume: 1000, cpc: 6.48 },
        { phrase: "website development cost", volume: 480, cpc: 8.48 },
        { phrase: "web design quote", volume: 170, cpc: 21.31 },
      ],
      deeper: {
        label: "how to read these figures",
        paras: [
          "Volume is Semrush's average monthly count of US searches for the phrase as written; CPC is what advertisers pay Google per click on it, in US dollars. Neither is a price for a website, and a high CPC says only that firms bid hard for that searcher.",
          "The pattern is the point. The question phrasings are the ones people type first, and they cost advertisers little because most of those searchers are still deciding. The quote phrasing is rarer and five times dearer, because by then the searcher has a scope in mind. This page is written for the first group, so that when you are in the second, the scope is already clear.",
        ],
      },
    },
    {
      kind: "text", id: "compare",
      h2: "How to compare website quotes",
      lede: "Compare website quotes on the same scope sheet: layouts, content, integrations, ownership and support, and read any quote that skips a line as incomplete.",
      leadIn: "The bottom line:",
      lead: "two quotes that differ by a lot usually describe two different sites; make them describe the same one first.",
      points: ["Who owns the code, the domain and the hosting at the end", "What is included for content, photography and copy", "What support after launch covers, and on what terms"],
      cards: [
        { h3: "Same scope", line: "Send every firm the same list: the pages, what each must do, what the site connects to, and what content exists." },
        { h3: "Same ownership", line: "Ask where the code, the domain and the hosting will live when it is finished, and whose name is on each account." },
        { h3: "Same standards", line: "Ask how speed and accessibility will be measured before launch; a firm that builds to WCAG 2.1 AA can say how it checks." },
      ],
      links: [{ to: `${LINKS.hub}#choose`, label: "How to choose a web design company" }],
    },
    {
      kind: "text", id: "standards", figure: "a11y",
      h2: "Accessibility and speed are in the price",
      lede: "WCAG 2.1 AA and a written performance budget are part of every OneAlgorithm build, not a line you add or remove from the quote.",
      leadIn: "What you get:",
      lead: "keyboard access, contrast and text alternatives checked before launch, and images, scripts and fonts held to a budget per page.",
      links: [{ to: `${LINKS.hub}#accessibility`, label: "ADA compliance and accessible websites" }],
      deeper: {
        label: "why these are not options",
        paras: [
          "A site that a customer cannot use with a keyboard, or that loads a camera-size image on every page, costs the business every day it is up, and fixing either after launch costs more than building it right. So the standard and the budget are in the scope of every build, the same way HTTPS is, and the checks run before launch: the automated rules an auditor runs, then a keyboard pass, then the page weights against the budget.",
        ],
      },
    },
    {
      kind: "office", id: "who",
      h2: "Who writes the quote",
      lede: "OneAlgorithm is a web design and development company in Malvern, PA, founded in 2020, rated 5.0 from 6 Google reviews, read 23 October 2026.",
      leadIn: "Why it matters:",
      lead: "we take on website work for businesses across the United States remotely from Malvern, PA; check us before you ask.",
      question: { q: "Do you give a price over the phone?", a: "No, and not because the number is secret: a price without a scope is a guess, and a guess that turns out low becomes a dispute later. Call, describe what the site has to do, and the written scope and price follow if it fits." },
      links: [{ to: `${LINKS.hub}#check`, label: "A web design company you can check" }, { to: `${LINKS.hub}#work`, label: "Websites we built, open them here" }],
    },
    { kind: "faq", id: "faq", h2: "Website cost questions people ask", items: FAQ },
    {
      kind: "routes", id: "next", h2: "Where to go next", lede: "The pages this one leans on: the showcase units it summarises, the two sibling services, and the local pages.",
      items: [
        { to: `${LINKS.hub}#cost`, title: "How much does a website cost? on the showcase", tag: "Showcase · unit 7" },
        { to: LINKS.small, title: "Small business website design", tag: "Service" },
        { to: LINKS.redesign, title: "Website redesign that keeps your rankings", tag: "Service" },
        { to: `${LINKS.hub}#process`, title: "How a custom website build runs", tag: "Showcase · unit 6" },
        { to: `${LINKS.hub}#ownership`, title: "What we build with, and what you keep", tag: "Showcase · unit 11" },
        { to: LINKS.phl, title: "Web design for Philadelphia businesses", tag: "Local" },
        { to: LINKS.che, title: "Web design for Chester County businesses", tag: "Local" },
      ],
    },
  ],
  desk: {
    h2: "Get the price in writing",
    lede: "Describe what the site has to do and the scope, price and schedule come back in writing before anyone builds anything.",
    covers: ["What the site has to do (sell, book, explain, log people in)", "What you have: domain, hosting, text, photos, logins", "The sites you like, and why"],
    prompt: "What does the site have to do?",
    topic: "website-cost",
  },
};

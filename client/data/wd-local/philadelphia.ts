/* /services/web-design-philadelphia: copy and facts (structure-spec.md §7, §8.1; page-map-webdev.md row 1).
 * ⛔ We are in Malvern: no Philadelphia address, client, review or "serving since" (D6). No client is named as a
 *    Philadelphia business (claims-and-assets.md §F). Travel wording: owner rule 2026-10-23 #3. */
import type { LocalPlace } from "./types";

const HUB = "/services/website-development";

export const PHILADELPHIA: LocalPlace = {
  path: "/services/web-design-philadelphia",
  name: "Philadelphia",
  seo: {
    title: "Web Design Philadelphia, PA: Custom Websites | OneAlgorithm",
    description: "Web design for Philadelphia businesses from Malvern, 25 miles west of Center City: custom sites you own, built around what you run. (610) 890-9711.",
    dateModified: "2026-10-24",
  },
  hero: {
    kicker: "Web design and development",
    h1: "Web design for Philadelphia businesses",
    lede: "We design and build custom websites for Philadelphia businesses from Malvern, about 25 miles west of Center City, with scope and price in writing first.",
  },
  areaServed: { "@type": "City", name: "Philadelphia", containedInPlace: { "@type": "State", name: "Pennsylvania" } },
  facts: {
    geoName: "Philadelphia-Camden-Wilmington, PA-NJ-DE-MD metro area (Census code 37980)",
    pulled: "2026-10-21",
    rows: [
      { geo: "msa:37980", fact: "Total establishments (all industries)", period: "2023", value: 153791, label: "Business establishments in the metro", source: "Census CBP 2023 · +3.4% since 2018" },
      { geo: "msa:37980", fact: "Establishments with 20-99 employees", period: "2023", value: 19805, label: "Establishments with 20 to 99 employees", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Establishments, NAICS 5415 Computer systems design and related services", period: "2023", value: 3624, label: "Computer systems design establishments (NAICS 5415)", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Total population", period: "2024", value: 6330422, label: "Population", source: "Census ACS 1-year 2024" },
      { geo: "msa:37980", fact: "Total establishments (all industries)", period: "2018", value: 148772, label: "Business establishments, 2018", source: "Census CBP 2018" },
      { geo: "msa:37980", fact: "Establishments, NAICS 62 Health care and social assistance", period: "2023", value: 19759, label: "Health care and social assistance", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Establishments, NAICS 54 Professional, scientific and technical services", period: "2023", value: 19559, label: "Professional, scientific and technical services", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Establishments, NAICS 44-45 Retail trade", period: "2023", value: 18474, label: "Retail trade", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Establishments, NAICS 23 Construction", period: "2023", value: 14143, label: "Construction", source: "Census CBP 2023" },
      { geo: "msa:37980", fact: "Establishments, NAICS 72 Accommodation and food services", period: "2023", value: 14064, label: "Accommodation and food services", source: "Census CBP 2023" },
    ],
  },
  sections: [
    {
      kind: "intro",
      id: "local",
      h2: "Website design in Philadelphia, from Malvern",
      lede: "Website design for city businesses runs from our Malvern office, with most work remote and in-person sessions when the project calls for them.",
      leadIn: "Why it matters:",
      lead: "A city site rarely stands alone; it books, quotes or sells through systems that must keep working after launch.",
      cards: [
        { h3: "Sites that talk to your systems", line: "Bookings, a CRM, inventory or payments, wired in and tested so a change on one side does not break the other." },
        { h3: "Findable and fast", line: "Titles, headings and schema go in while the site is built, and Search Console is connected at launch." },
        { h3: "Yours to keep", line: "Source in your repository, domain in your account, hosting you control; no builder subscription keeps it online." },
      ],
      deeper: {
        label: "how a remote build with in-person sessions works",
        paras: [
          "Most of a build runs remotely. You review the designs and then the working site in your own browser, on your own phone, as each part takes shape, so nobody waits for a big reveal at the end.",
          "In-person sessions happen when the project calls for them and are easiest across the region. On a larger project, a kickoff, a launch review or a training session can be planned in person as part of the schedule.",
          "Either way you deal with the people doing the work, not an account manager relaying questions. Feedback goes straight to the person who will make the change.",
          "See [how a custom website build runs](/services/website-development#process).",
        ],
      },
    },
    {
      kind: "work",
      id: "work",
      h2: "Websites we built",
      lede: "These six sites are ours, and each one opens right here, full size, in a preview window without leaving this page.",
      leadIn: "Why it matters:",
      lead: "A working site shows how a build loads, reads and takes an enquiry, which no mock-up can.",
      deeper: {
        label: "how the previews work",
        paras: [
          "Preview opens the live site inside a sandboxed frame on this page. Atlas Peptides blocks framing, so its preview is a dated screenshot instead.",
          "The domain under each card opens the real site in a new tab. Each one is a business we built for; none is presented as a local storefront.",
          "Between them they cover the usual jobs a small business site has to do: a configurator that prices as you build, online scheduling, booking with reviews pulled in, a shared stock count for a shop and a market stall, a quote form that reaches the office, and a checkout.",
        ],
      },
    },
    {
      kind: "text",
      id: "rebuild",
      h2: "Rebuilding a WordPress or Joomla site",
      lede: "Yes, we take over sites built on WordPress or Joomla and rebuild them as custom code on the same domain, every old address redirected.",
      leadIn: "What we do:",
      lead: "Every existing URL is mapped to its new home before design begins, so earned rankings and inbound links carry over.",
      cards: [
        { h3: "Website redesign in Philadelphia", line: "The design and code are replaced while your domain, content and search history stay in place." },
        { h3: "Website management after launch", line: "After launch the site runs on hosting and a domain in your name, and we stay on for support." },
      ],
      deeper: {
        label: "what a rebuild keeps and what support covers",
        paras: [
          "A rebuild starts with an inventory of the old site: every page, image and form, and every address that search engines or other sites link to. Content that still earns its place moves across; the rest is retired on purpose, with a redirect, rather than lost by accident.",
          "Plugins and extensions that did a real job, such as a booking widget or a contact form, are replaced by code that does the same job without the update treadmill.",
          "Support after launch is scoped in the written proposal, because every site needs something different. The full method is on the build page: [website development](/services/website-development).",
        ],
      },
    },
    {
      kind: "process",
      id: "process",
      h2: "How a Philadelphia web project runs",
      lede: "A project here runs in the same five stages as every build of ours, from agreeing what the site is for to launch.",
      leadIn: "What you get:",
      lead: "the scope, price and schedule in writing at stage two, before anything is designed or built.",
    },
    {
      kind: "facts",
      id: "figures",
      h2: "Philadelphia's businesses, in public numbers",
      lede: "The metro area had 153,791 business establishments in 2023, per County Business Patterns, and 19,805 of them employed 20 to 99 people.",
      leadIn: "By the numbers:",
      lead: "3,624 establishments worked in computer systems design (NAICS 5415), and 6,330,422 people lived in the metro in 2024.",
      readouts: [0, 1, 2],
      deeper: {
        label: "the metro's largest employer groups",
        paras: [
          "Health care and social assistance had the most establishments in the metro in 2023 at 19,759, then professional, scientific and technical services at 19,559, retail trade at 18,474, construction at 14,143 and accommodation and food services at 14,064.",
          "What changes between those groups is what the site has to connect to. A practice needs booking and an accessible path for every patient; a contractor needs quote requests that land in the office inbox; a shop needs stock that agrees with the till; a restaurant needs hours and a menu that read on a phone in a hurry.",
          "County Business Patterns counts employer establishments: locations with paid staff, so a sole owner with no employees is not in these totals. The metro grew from 148,772 establishments in 2018.",
        ],
      },
    },
    {
      kind: "office",
      id: "office",
      h2: "Our Malvern office, 25 miles from Center City",
      lede: "Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, about 25 miles west of Center City.",
      leadIn: "The bottom line:",
      lead: "most work is remote, and in-person sessions are easiest across the Philadelphia region when the project calls for them.",
      question: {
        q: "Do you have an office in Philadelphia?",
        a: "We work from one office, in Malvern, and come to you in the city when the project calls for it.",
      },
      plateNote: "ABOUT 25 MILES WEST OF CENTER CITY",
      deeper: {
        label: "visits, calls and where the work happens",
        paras: [
          "Calls and screen-shares cover most of a build, and you review the work in your own browser between them. When a decision is easier in a room, such as a kickoff with several people or a content workshop, we plan the session into the schedule.",
          "The office is open Monday to Friday, 9 to 5, and the phone rings there. One address and one number: calls are answered in that office, during those hours.",
        ],
      },
    },
    {
      kind: "faq",
      id: "faq",
      h2: "Web design questions from Philadelphia businesses",
      schema: true,
      items: [
        {
          q: "Can a Malvern firm be our Philadelphia web design team?",
          a: "Yes. Most of a build runs remotely, with every stage reviewed in your own browser, and in-person sessions are easiest across the region when the project calls for them. You work directly with the people designing and coding the site.",
        },
        {
          q: "How much does a website cost in Philadelphia?",
          a: "The scope sets the price, not the ZIP code: page layouts, content, integrations and whether the site sells, books or logs people in. You get the price and the schedule in writing before anything is built.",
          link: { to: `${HUB}#cost`, label: "How much does a website cost?" },
        },
        {
          q: "Do you build restaurant websites?",
          a: "Yes. A restaurant site is scoped like any other build: menus, hours, bookings or online ordering, and pages that read well on a phone, each part priced in writing before work starts.",
        },
        {
          q: "Who owns the site when it is done?",
          a: "You do. The source code sits in your repository, the domain in your account and the hosting somewhere you control, so another developer can pick it up without us.",
          link: { to: `${HUB}#ownership`, label: "What we build with, and what you keep" },
        },
      ],
    },
    {
      kind: "routes",
      id: "services",
      h2: "Web design services for Philadelphia companies",
      lede: "The site is usually the first piece; these pages cover the work that tends to come next.",
      items: [
        { to: "/services/seo", title: "SEO services", tag: "Be found after launch" },
        { to: "/services/google-ads-philadelphia", title: "Google Ads in Philadelphia", tag: "Paid search" },
        { to: "/services/salesforce-consultant-philadelphia", title: "Salesforce consulting", tag: "CRM behind the site" },
        { to: "/services/web-design-chester-county", title: "Web design in Chester County", tag: "Nearby" },
      ],
    },
  ],
  desk: {
    h2: "Start your Philadelphia website project",
    lede: "Tell us what the site has to do and you get the scope, price and schedule in writing before anything is built.",
    covers: ["What the site has to do: sell, book, explain or log people in", "Two or three sites you like, and why", "What you already have: domain, hosting, content, logins"],
    prompt: "What does the site have to do?",
  },
};

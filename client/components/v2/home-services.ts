/* Shared by the home page and the /services hub: every service the site sells, grouped. One list, so the two cannot drift.
   Oracle and Operations Technology are retired and stay out (data-report 2026-10-31).
   Round 3 (seo-spec-b 4.2): group H2s renamed; Zendesk moved from Salesforce to the enterprise group. */
export type HomeService = { to: string; title: string; lede: string };
export type HomeServiceGroup = { id: string; title: string; lede: string; items: HomeService[] };

export const SERVICE_GROUPS: HomeServiceGroup[] = [
  {
    id: "websites", title: "Websites and web development", lede: "Sites built to be found, to load fast and to turn a visit into a call or an order.",
    items: [
      { to: "/services/website-development", title: "Website development", lede: "Custom sites and web applications that you own outright." },
      { to: "/services/web-design-philadelphia", title: "Web design, Philadelphia", lede: "Design and development for Philadelphia businesses." },
      { to: "/services/web-design-chester-county", title: "Web design, Chester County", lede: "Local web design from our office in Malvern." },
      { to: "/services/small-business-website-design", title: "Small business website design", lede: "Be found, explain the service, turn visits into work." },
      { to: "/services/website-redesign", title: "Website redesign", lede: "New design and code on your domain, every old address redirected." },
      { to: "/services/website-cost", title: "Website cost", lede: "What sets the price of a website, and the scope in writing first." },
    ],
  },
  {
    id: "search", title: "SEO, Google Ads and marketing", lede: "Be found on Google and in AI assistants, then measure what it brings in.",
    items: [
      { to: "/services/seo", title: "SEO services", lede: "Technical SEO, content structure and a measured result." },
      { to: "/services/seo-chester-county", title: "SEO, Chester County", lede: "Local SEO: your Google Business Profile, reviews and service pages." },
      // ponytail: add back "SEO, Philadelphia" / "AI search optimization" / "Marketing automation consulting" when those pages ship and are approved.
      { to: "/services/google-ads", title: "Google Ads management", lede: "Conversion tracking counted once, the account in your name." },
      { to: "/services/google-ads-philadelphia", title: "Google Ads, Philadelphia", lede: "Paid search from the team that builds the landing pages." },
      { to: "/services/marketing", title: "Social media management", lede: "Management of the Facebook and Instagram accounts you own." },
      { to: "/services/martech", title: "MarTech consulting", lede: "Marketing platforms selected, connected and configured." },
    ],
  },
  {
    id: "apps", title: "Software and apps", lede: "Software your company owns: the code, the cloud accounts and the keys.",
    items: [
      { to: "/services/application-development", title: "Custom software development", lede: "Customer portals, internal tools and web applications." },
    ],
  },
  {
    id: "salesforce", title: "Salesforce and CRM", lede: "Salesforce work from a Select Salesforce Consulting Partner.",
    items: [
      { to: "/services/salesforce", title: "Salesforce consulting", lede: "Sales, Service and Marketing Cloud, start to run-state." },
      { to: "/services/salesforce-health-check", title: "Salesforce health check", lede: "A review of the Salesforce org you already run." },
      { to: "/services/salesforce-data-migration", title: "Salesforce data migration", lede: "Records reconciled before go-live." },
      { to: "/services/salesforce-integration", title: "Salesforce integration", lede: "Which system owns each record, agreed before anything is built." },
      { to: "/services/salesforce-managed-services", title: "Salesforce managed services", lede: "Weekly administration and development, hours reported." },
      { to: "/services/salesforce-marketing-cloud-consulting", title: "Marketing Cloud consulting", lede: "Support for Marketing Cloud accounts already running." },
      { to: "/services/salesforce-consultant-philadelphia", title: "Salesforce consultant, Philadelphia", lede: "A review of the org you already own." },
      { to: "/services/salesforce-consultant-chester-county", title: "Salesforce consultant, Chester County", lede: "For businesses still choosing, from Malvern." },
      { to: "/services/salesforce-consulting-partner-pennsylvania", title: "Salesforce partner, Pennsylvania", lede: "How to check any partner's record before you hire." },
      { to: "/services/hire-salesforce-developers", title: "Hire Salesforce developers", lede: "Salesforce developers, admins and architects inside your team." },
      { to: "/services/salesforce-implementation-cost", title: "Salesforce implementation cost", lede: "What drives the cost, with published sources." },
    ],
  },
  {
    id: "enterprise", title: "IT consulting, staff and operations", lede: "Senior people and a plan for how the work runs.",
    items: [
      { to: "/services/it-consulting", title: "IT consulting services", lede: "Technology planning for the systems you run today." },
      { to: "/services/staff-augmentation", title: "IT staff augmentation", lede: "Developers and technical people added to your team." },
      { to: "/services/operational-transformation-consulting", title: "Operational transformation consulting", lede: "Fix how the work runs, then connect the systems." },
      { to: "/services/zendesk", title: "Zendesk implementation", lede: "Support-desk work as a Zendesk partner." },
    ],
  },
];

/* The five industry pages, for the home and /services cards (seo-spec-b 4.1, 4.2): `phrase` is the page's primary keyword. */
export const SECTORS = [
  { to: "/industries/construction", title: "Construction", phrase: "Construction software integration", body: "Estimating, field and accounting systems that agree on one job.", cta: "See construction" },
  { to: "/industries/manufacturing", title: "Manufacturing", phrase: "Manufacturing ERP integration", body: "The ERP joined to Salesforce, reporting and the storefront.", cta: "See manufacturing" },
  { to: "/industries/ecommerce", title: "Ecommerce", phrase: "Ecommerce website development", body: "WooCommerce and custom builds, from catalogue to checkout.", cta: "See ecommerce" },
  { to: "/industries/government", title: "Government", phrase: "Government IT services", body: "What a public-sector buyer needs to verify, on one page.", cta: "See government" },
  { to: "/industries/marketing", title: "Marketing teams", phrase: "Technology for marketing teams", body: "Social media, MarTech and the analytics under them.", cta: "See marketing teams" },
];

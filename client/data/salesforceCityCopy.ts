/* Hand-written per-city copy for the Salesforce city pages. Every claim here is either
 * (a) a fact from SALESFORCE_CITIES (prefer rendering numbers from data over typing them), or
 * (b) a true statement about OneAlgorithm from the allowed-proof list (design spec 2026-10-23):
 *     AppExchange record (salesforceProof.ts), ongoing weekly Salesforce development for a
 *     lending company since April 2026, an SAP-to-Salesforce sync, QuickBase and Kissflow
 *     migrations, about 18 months of Marketing Cloud support. Nothing else counts as delivery.
 * ⛔ No local client claims. No "offices in <city>" — we are in Malvern, PA.
 * ⛔ No question is repeated across cities or with the Philadelphia / Chester County /
 *    Pennsylvania pages. Check before adding one.
 * ⛔ Voice (2026-10-23 addendum): problem -> solution -> outcome -> proof; never announce what
 *    we lack in visible copy. Honesty comes from never claiming the opposite.
 *    Removed that day: "we have not yet been awarded a federal contract" lines (DC, Denver;
 *    still true, simply not said), "smaller partner", a LATAM delivery claim (not on the
 *    allowed list), "routine bulk data jobs", and hard-coded Trailblazer group counts (the
 *    2026-10-23 community pull changed them; the page renders counts from data).
 * Links inside `angle` use [text](/path) and render as router links. FAQ answers stay plain
 * text (they are mirrored into FAQPage JSON-LD); give a FAQ one `link` instead.
 * SEO fields come from the page map (2026-10-23_sf-audit/page-map.json): title 50-60 chars,
 * description <= 155 with the free health check and the phone. ponytail: lengths are checked
 * at dev time by SalesforceCity.tsx (console.warn), not by a build step. */

import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PLATFORM_CERTS } from "./salesforceProof";

export type CityFaq = { q: string; a: string; link?: { to: string; label: string } };

export type CityCopy = {
  /** <title>, 50-60 characters. */
  title: string;
  /** Meta description, <= 155 characters. */
  description: string;
  /** H1. The orange span is the place name. */
  h1: { lead: string; place: string; tail: string };
  /** Optional first sentence of the hero lede (Miami leads with "Salesforce CRM consulting"). */
  intro?: string;
  angleTitle: string;
  angle: string[];
  faqs: CityFaq[];
  /** Sibling city slugs to name first in the city list (page map internal links). */
  related: string[];
};

const PHONE = "Call (610) 890-9711";

export const CITY_COPY: Record<string, CityCopy> = {
  "new-york": {
    title: "Salesforce Consulting NYC & New York, NY | OneAlgorithm",
    description: `Salesforce consulting for New York companies: migration, integration and weekly development. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "New York, NY", tail: " companies" },
    angleTitle: "The biggest Salesforce job market we measured",
    angle: [
      "Of the 20 metro areas we checked, New York had the most Salesforce job listings and the largest base of companies with 500 or more employees. When that many firms hire for the same skill at once, the people who know how an org was built tend to leave mid-project.",
      "We fill that gap with a fixed piece of work, such as a [data migration](/services/salesforce-data-migration), an [integration](/services/salesforce-integration) or an org that has drifted, delivered by the people who scope it and closed with a written handover the next hire can run.",
      "Finance and insurance is New York's third-largest employer group, and lending is where we run [ongoing Salesforce development](/services/salesforce-managed-services) every week.",
    ],
    faqs: [
      { q: "Can a firm outside New York run our Salesforce project?", a: "Yes. Salesforce work happens inside the org, not in a room, so it runs remotely from Malvern, Pennsylvania. Discovery calls, reviews and handover happen on video, and we come in person for the meetings that need it." },
      { q: "We have an internal Salesforce team. Why bring in a partner?", a: "For a specialism the team was not hired for, or for capacity on a deadline: a data migration, an ERP integration, or Marketing Cloud. We work alongside the admins you have, and every engagement ends with a handover your own people can run." },
      { q: "Can you work within a regulated firm's change controls?", a: "Yes. We work through your change process: changes built in a sandbox, documented, tested against real user profiles and released on your schedule, with a written record of what changed and why." },
    ],
    related: ["boston", "washington-dc"],
  },
  "washington-dc": {
    title: "Salesforce Consulting DC | Washington, DC | OneAlgorithm",
    description: `Salesforce consulting for Washington, DC organizations, from a SAM.gov-registered EDWOSB. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Washington, DC", tail: " organizations" },
    angleTitle: "Salesforce is a federal platform here",
    angle: [
      "Federal agencies recorded 306 contract awards mentioning Salesforce with work performed in Washington, DC over fiscal years 2022 to 2026, led by the Treasury, Defense and State departments. Alongside the agencies sit the contractors, associations and nonprofits that work with them.",
      "OneAlgorithm is SBA-certified as an Economically Disadvantaged Woman-Owned Small Business (EDWOSB) and Woman-Owned Small Business (WOSB), registered in SAM.gov, and certified SWaM in Virginia. Those certifications make us eligible to team on set-aside work.",
      "Professional, scientific and technical services is the DC metro's largest employer group in our Census pull, with more than 34,000 establishments. That group includes the contractors and consultancies that work alongside the agencies above.",
    ],
    faqs: [
      { q: "Is OneAlgorithm able to subcontract on federal Salesforce work?", a: "Yes. We are registered in SAM.gov and hold SBA EDWOSB and WOSB certifications, which is what most primes check first when they need a small-business partner on a set-aside." },
      { q: "Do you work with associations and nonprofits in the DC area?", a: "Yes. Nonprofit and membership organizations are one of the largest groups of employers in the DC metro, and their Salesforce work (member data, migrations off older databases, integrations) is the same work we deliver for companies." },
      { q: "Can Salesforce track federal opportunities and teaming partners?", a: "Yes. Contractors use it to track opportunities from SAM.gov, teaming partners, proposal stages and contract vehicles. We build the objects and reports around how your capture team already works." },
    ],
    related: ["new-york"],
  },
  dallas: {
    title: "Salesforce Consulting in Dallas, TX | OneAlgorithm",
    description: `Salesforce consulting for Dallas–Fort Worth companies: ERP and SAP integration, migration, support. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Dallas, TX", tail: " companies" },
    angleTitle: "A large Texas market with a busy Salesforce community",
    angle: [
      "Dallas–Fort Worth has more active Salesforce Trailblazer Community Groups than any other metro we checked, plus a Salesforce office on North Field Street. Health care, professional services, manufacturing and finance are its largest employer groups.",
      "Manufacturing and distribution firms are where Salesforce most often has to talk to an ERP. Getting orders, accounts and inventory to agree between the two systems is work we deliver, including an [SAP-to-Salesforce sync](/services/salesforce-integration).",
      "Dallas–Fort Worth also has one of the larger software developer workforces we measured, so many companies here staff routine admin work in-house and bring in a partner for integration and migration projects.",
    ],
    faqs: [
      { q: "Can Salesforce sync with our ERP?", a: "Usually, yes. The real questions are which system owns each record, how often it syncs and what happens when the two disagree. We have built an SAP-to-Salesforce sync; the same approach applies to other ERPs, and we agree the rules with your finance and operations people before writing any code.", link: { to: "/services/salesforce-integration", label: "Salesforce integration with SAP and ERP" } },
      { q: "Is a mid-size Dallas company too small for a Salesforce partner?", a: "No. The free one-week Salesforce health check works the same for a 20-person team as for a 500-person one, and every fix after it is scoped to what your team actually uses." },
      { q: "How long does a Salesforce-to-ERP integration take?", a: "It depends on how many objects sync and how clean the data is, so we scope it before giving a timeline. The free one-week Salesforce health check is often the first step, because it shows the state of the data the integration will depend on." },
    ],
    related: ["houston", "austin"],
  },
  denver: {
    title: "Salesforce Consulting Denver, CO | Implementation Partner",
    description: `Salesforce implementation partner for Denver companies: setup, migration, integration, support. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Denver, CO", tail: " companies" },
    angleTitle: "A Colorado market with federal and private demand",
    angle: [
      "Colorado recorded 57 federal contract awards mentioning Salesforce over fiscal years 2022 to 2026, led by Veterans Affairs, and Denver has an active Trailblazer community and a Salesforce office downtown.",
      "As an implementation partner we take a Denver project from the licence count through configuration, [data migration](/services/salesforce-data-migration) and [integration](/services/salesforce-integration) to support after go-live, or take on any one of those stages by itself.",
      "Denver has one of the smaller business bases of the cities on our Salesforce pages, yet it hosts Mile High Dreamin', a community-run Salesforce conference scheduled for August 25–26, 2027.",
    ],
    faqs: [
      { q: "Our Salesforce org was set up fast and has grown messy. Where do we start?", a: "With a look at what is actually there: licences against real use, fields nobody fills, automation that overlaps, and integrations that fail quietly. That is what our free one-week Salesforce health check produces, as a written list ranked by what to fix first.", link: { to: "/services/salesforce-health-check", label: "What the free health check covers" } },
      { q: "Can you support our Salesforce org month to month?", a: "Yes. Weekly administration and development, with hours reported every week, is how we run our ongoing Salesforce work for a lending company.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
      { q: "Do you work with Colorado government contractors?", a: "Yes. We are registered in SAM.gov and certified by the SBA as an EDWOSB and WOSB, which makes us eligible to team with contractors on set-aside work." },
    ],
    related: ["chicago"],
  },
  atlanta: {
    title: "Salesforce Consulting Services Atlanta, GA | OneAlgorithm",
    description: `Salesforce consulting services for Atlanta companies: data loads, integration, managed services. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Atlanta, GA", tail: " companies" },
    angleTitle: "Health care, logistics and a deep Salesforce bench",
    angle: [
      "Atlanta's largest employer groups include health care, professional services, manufacturing and wholesale trade, and the metro has an active Trailblazer community and a Salesforce office in Buckhead. Federal agencies also recorded 11 Salesforce-related contract awards with work performed in Atlanta over fiscal years 2022 to 2026.",
      "Wholesale and logistics businesses need Salesforce to handle volume: thousands of accounts, bulk data loads and clean de-duplication. We load in tested batches with duplicate rules switched on, so the reports still add up afterwards.",
      "For teams that want a Salesforce specialist on call rather than on payroll, our [managed services](/services/salesforce-managed-services) run weekly administration and development, with hours reported every week.",
    ],
    faqs: [
      { q: "How do you handle a large data load into Salesforce?", a: "In batches, with a test load first, a field map agreed in writing, duplicate rules switched on, and a count check after every batch. Large loads fail on the edge cases, so we find them on a small sample before the full run." },
      { q: "Can you clean up duplicate accounts and contacts?", a: "Yes. We agree the matching rules with you first (which record wins and which fields carry over), then merge in batches you can review, so nothing important disappears." },
      { q: "Can Salesforce handle a health care organization's access rules?", a: "Yes. Health care is the largest employer group in the Atlanta metro, and those organizations need tight control of who sees which records. We set that up with permission sets, sharing rules and field-level security, tested against real user logins before anything goes live." },
    ],
    related: ["miami"],
  },
  boston: {
    title: "Salesforce Consultants in Boston, MA | OneAlgorithm",
    description: `Salesforce consultants for Boston companies: access and sharing, integration, migration. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Boston, MA", tail: " companies" },
    angleTitle: "Health care, research and professional services",
    angle: [
      "Health care and professional services are Boston's two largest employer groups, and the metro has an active Trailblazer community and a Salesforce office on Boylston Street, with another in Burlington.",
      "Organizations like these have strict rules about who can see which records. Getting profiles, permission sets and sharing right is careful Salesforce work, and we test every change against real user logins before it goes live.",
      "Larger employers often run Salesforce next to finance and ERP systems. We [connect the two](/services/salesforce-integration) and agree which system owns each record before building anything.",
    ],
    faqs: [
      { q: "Can you tighten who sees what in our Salesforce?", a: "Yes. We map who needs which records, then rebuild access with permission sets and sharing rules instead of stacking more profiles. Every change is tested against real user logins before it goes live." },
      { q: "Does Salesforce work the same for research and nonprofit organizations?", a: "The platform work is the same: data models, access, automation and integrations. We keep the build simple enough for a small internal team to run after we hand over." },
      { q: "Can you connect Salesforce to our other systems?", a: "Yes. We have built an SAP-to-Salesforce sync, and the same approach connects Salesforce to other finance and ERP systems: agree which system owns each record before building anything.", link: { to: "/services/salesforce-integration", label: "Salesforce integration with SAP and ERP" } },
    ],
    related: ["new-york"],
  },
  seattle: {
    title: "Salesforce Consultants in Seattle, WA | OneAlgorithm",
    description: `Salesforce consultants for Seattle companies: platform design, Flow versus Apex, integration. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Seattle, WA", tail: " companies" },
    angleTitle: "A technical market that builds on Salesforce",
    angle: [
      "Seattle has a Salesforce office in Fremont and another in Bellevue, an active Trailblazer community, and one of the largest software developer workforces of the metros we checked.",
      "Teams with strong engineers often build integrations themselves and bring in a Salesforce specialist for the platform side: limits, Flow versus code, and how the data model will hold up as volume grows.",
      "Seattle's Salesforce listings in our LinkedIn search included more architect positions than developer ones, a sign that local teams are designing larger Salesforce estates and need platform-level judgment.",
    ],
    faqs: [
      { q: "Our engineers can build the integration. What would a Salesforce partner add?", a: "Platform knowledge: governor limits, which API to use for which volume, when Flow is the right tool and when code is, and how to keep the org maintainable. We often pair with an internal team rather than replacing it." },
      { q: "Should we use Flow or Apex?", a: "Flow for most business automation, because admins can maintain it. Apex where volume, complexity or performance need it. We decide case by case and write down why, so the next person understands the choice." },
      { q: "Can you review our Salesforce architecture?", a: `Yes. Our free one-week Salesforce health check covers the data model, automation, access and integrations, and ends with a written list ranked by what to fix first. Salesforce's AppExchange record lists ${SF_PLATFORM_CERTS} Platform certifications among our ${SF_CERTIFICATIONS}.`, link: { to: "/services/salesforce-health-check", label: "What the free health check covers" } },
    ],
    related: ["san-francisco"],
  },
  "san-francisco": {
    title: "Salesforce Consultant San Francisco, CA | OneAlgorithm",
    description: `Salesforce consultants for San Francisco Bay Area companies: fixed-scope projects and handover. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "San Francisco, CA", tail: " companies" },
    angleTitle: "Salesforce's home market",
    angle: [
      "Salesforce is headquartered at 50 Fremont Street, and the Bay Area has more Salesforce offices than any other metro we checked. Health care, professional services and information businesses are among its largest employer groups.",
      "In a market this close to the platform, buyers know what Salesforce can do. What they need is a partner who delivers a defined piece of work and leaves behind an org their own team can run, anywhere from San Francisco and Oakland to Fremont.",
      "The Bay Area also has one of the larger pools of Salesforce job listings we measured, which makes experienced Salesforce people expensive to hire and hard to keep.",
    ],
    faqs: [
      { q: "Why choose a focused Salesforce partner over a large firm?", a: `You deal directly with the certified people doing the work, and the scope stays fixed to what you need. Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications.` },
      { q: "Do you take on short, fixed-scope Salesforce projects?", a: "Yes. A defined migration, integration, health check or clean-up is often the best way to start. You get a written scope first, then the work, then a handover." },
      { q: "Do you work with software companies that sell on Salesforce?", a: "Yes. Software companies need Salesforce to keep sales, billing and product usage data in step, and that integration and data work is the core of what we deliver." },
    ],
    related: ["los-angeles", "seattle"],
  },
  "los-angeles": {
    title: "Salesforce Consultants in Los Angeles, CA | OneAlgorithm",
    description: `Salesforce consultants for Los Angeles companies: ERP integration, Marketing Cloud, migration. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Los Angeles, CA", tail: " companies" },
    angleTitle: "A large, mixed business market",
    angle: [
      "Los Angeles has one of the largest business bases of the metros we checked, led by health care, professional services, manufacturing and wholesale trade. Salesforce's nearest office is in Irvine.",
      "Where a team runs Salesforce with a small internal staff, a partner adds the most: specialist work on demand without a full-time hire.",
      "Los Angeles also has a large manufacturing and wholesale base in our Census pull. Those businesses need Salesforce to agree with an ERP on orders, accounts and pricing, which is [integration work we deliver](/services/salesforce-integration).",
    ],
    faqs: [
      { q: "We have one Salesforce admin. Is that enough?", a: "For day-to-day running, often yes. The gaps tend to be deeper work (integrations, data migrations, Marketing Cloud) that one person was never hired for. We cover those pieces and leave the day-to-day with your admin." },
      { q: "Can Salesforce work with our marketing tools?", a: "Yes. Marketing Cloud is Salesforce's own marketing platform, and we have provided about 18 months of Marketing Cloud support on one engagement.", link: { to: "/services/salesforce-marketing-cloud-consulting", label: "Marketing Cloud consulting" } },
      { q: "Can Salesforce share data with our ERP?", a: "Usually, yes. We have built an SAP-to-Salesforce sync, and the same approach applies to other ERPs: agree which system owns each record, how often it syncs, and what happens when they disagree." },
    ],
    related: ["san-francisco"],
  },
  austin: {
    title: "Salesforce Consultants in Austin, TX | OneAlgorithm",
    description: `Salesforce consultants for Austin companies: org clean-up, Flow automation, weekly support. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Austin, TX", tail: " companies" },
    angleTitle: "A fast-growing technology market",
    angle: [
      "Austin's largest employer groups are professional services, health care and information, and it has a Salesforce office on Congress Avenue. In an SEC full-text search of annual reports (10-Ks) mentioning Salesforce, Austin addresses appeared in 26 of the 78 Texas results, more than the city of Dallas (12) or Houston (10).",
      "Fast-growing companies often outgrow how their Salesforce was first set up within a year or two. The common fixes are a cleaner data model, automation that replaces manual steps, and integrations that keep sales and finance in step.",
      "Austin has the smallest business base of the cities on our Salesforce pages, but more than 1,000 Salesforce job listings across our four LinkedIn role searches.",
    ],
    faqs: [
      { q: "We set up Salesforce ourselves. When should we bring in help?", a: "When reports stop matching what people see, when manual steps keep growing, or before a big migration or integration. Our free one-week Salesforce health check tells you which of those applies and what to fix first." },
      { q: "Can you automate steps our team does by hand in Salesforce?", a: "Usually, with Flow. We list the manual steps first, automate the ones that save real time, and leave the rest alone so the org stays easy to maintain." },
      { q: "Can you support a small team that relies heavily on Salesforce?", a: "Yes. Weekly administration and development gives a small team specialist cover without a full-time hire. It is how we run our ongoing Salesforce work for a lending company, every week since April 2026." },
    ],
    related: ["houston", "dallas"],
  },
  miami: {
    title: "Salesforce Consulting Services Miami, FL | OneAlgorithm",
    description: `Salesforce CRM consulting for Miami and South Florida companies, delivered remotely. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Miami, FL", tail: " companies" },
    intro: "Salesforce CRM consulting for Miami and South Florida companies, from our office in Malvern, Pennsylvania:",
    angleTitle: "Salesforce CRM consulting across South Florida",
    angle: [
      "Miami has a large business base led by health care, professional services, wholesale trade and finance. Salesforce lists no office in the metro; the nearest active Trailblazer group meets in Fort Lauderdale, and Florida Dreamin' is the region's community event.",
      "Where local Salesforce people are scarce, teams lean on remote partners. That is how we work everywhere: from Malvern, Pennsylvania, with video calls for discovery, reviews and handover. The same engagement serves companies in Fort Lauderdale, across South Florida and up to Jacksonville.",
      "Finance and insurance is one of Miami's four largest employer groups, and lending is where we run [ongoing Salesforce development](/services/salesforce-managed-services) every week.",
    ],
    faqs: [
      { q: "Is remote Salesforce consulting as effective as on-site?", a: "For Salesforce, yes, because the work happens inside the org. What matters is clear scoping, regular reviews and a proper handover, and all three work well on video." },
      { q: "Can you help with Salesforce for a finance or lending business?", a: "Yes. We run ongoing Salesforce development for a lending company, every week since April 2026." },
      { q: "Can Salesforce support a business that also operates in Latin America?", a: "Yes. One org can run multiple currencies and languages, with access split by region. We scope the regional requirements (currencies, languages and who sees which records) before building." },
    ],
    related: ["atlanta"],
  },
  chicago: {
    title: "Salesforce Consulting in Chicago, IL | OneAlgorithm",
    description: `Salesforce consulting for Chicago companies: ERP integration, takeovers, weekly development. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Chicago, IL", tail: " companies" },
    angleTitle: "A Midwest hub with heavy Salesforce hiring",
    angle: [
      "Chicago had the fifth-highest number of Salesforce job listings of the 20 metros we measured, and has a Salesforce office at Wolf Point Plaza and an active Trailblazer community. Health care, professional services, manufacturing and finance are its largest employer groups.",
      "Hiring demand that high means experienced Salesforce people are hard to keep. A partner gives you specialist capacity for a defined project without competing in that hiring market.",
      "Manufacturing is one of Chicago's four largest employer groups in our Census pull. Manufacturers need Salesforce to share accounts, orders and pricing with an ERP, which is [integration work we deliver](/services/salesforce-integration).",
    ],
    faqs: [
      { q: "We can't hire a Salesforce developer fast enough. What are the options?", a: "Bring in a partner for defined pieces of work while you hire, or keep a partner on a monthly basis for ongoing development. We do both, with hours and progress reported every week." },
      { q: "Can you take over an org another consultant built?", a: "Yes. We start by documenting what is there and what it costs you, then agree with you what to keep and what to fix." },
      { q: "Can Salesforce keep a manufacturer's ERP and sales team in step?", a: "Yes. The work is keeping accounts, orders and pricing consistent between Salesforce and the ERP, then cleaning the data so reports match what operations sees. We have built an SAP-to-Salesforce sync." },
    ],
    related: ["denver"],
  },
  houston: {
    title: "Salesforce Consulting Company in Houston, TX | OneAlgorithm",
    description: `Salesforce consulting for Houston companies: ERP and SAP integration, migration, support. Free one-week health check. ${PHONE}.`,
    h1: { lead: "Salesforce consultants for ", place: "Houston, TX", tail: " companies" },
    angleTitle: "Plants, pipelines and the systems behind them",
    angle: [
      "Houston's economy runs on plants, pipelines and the suppliers around them. Manufacturing and wholesale trade are two of its four largest employer groups, and the Census counts 1,258 oil and gas extraction establishments in the metro (County Business Patterns 2023).",
      "Companies like these run an ERP for orders, inventory and pricing, and Salesforce for customers and the sales pipeline. Keeping the two in agreement is integration work we deliver, including an [SAP-to-Salesforce sync](/services/salesforce-integration).",
      "Salesforce lists no Houston office (the nearest are in Austin and Dallas), and the local community meets in Houston's Trailblazer groups. We run Houston work remotely from Malvern, Pennsylvania, one time zone east.",
    ],
    faqs: [
      { q: "Does the hour between Houston and Pennsylvania get in the way?", a: "No. We are one hour ahead of Houston, so a standard working day overlaps for seven of its eight hours, and calls are booked in your time zone." },
      { q: "Can you merge two Salesforce orgs after an acquisition?", a: "Yes. We document both orgs first, agree with you which records and fields win, then migrate in batches you can check, with record counts reconciled before the old org is switched off.", link: { to: "/services/salesforce-data-migration", label: "Salesforce data migration" } },
      { q: "Can Salesforce track bids and quotes for an industrial supplier?", a: "Yes. Opportunities, quotes and approval steps cover most bid processes, and Flow can route a quote for sign-off. Where prices live in the ERP, we sync them instead of retyping them." },
    ],
    related: ["dallas", "austin"],
  },
};

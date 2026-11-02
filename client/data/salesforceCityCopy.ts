/* Hand-written per-city copy for the 13 Salesforce city pages (/services/salesforce-consultant-<slug>), rebuilt
 * 2026-10-23 for redesign v2 (client/pages/services/SalesforceCity.tsx; build notes in onealgo-icm-oa/areas/sales/
 * runs/2026-10-23_sf-audit/build-v2/page-city-template.md). Structure: seo-completeness/structure-spec.md §7.4.
 *
 * Every claim here is either
 *   (a) a fact from SALESFORCE_CITIES (generated, sourced) or from the copy that passed the 2026-10-23 fact-check at
 *       ef1a8f0 (the former `angle` paragraphs and FAQs, reworded only for length), or
 *   (b) a true statement about OneAlgorithm from the allowed-proof list: Salesforce's AppExchange record (16 / 53 / 38,
 *       Select tier per owner-decisions.md 19:05), ongoing weekly Salesforce development for a lending company since
 *       April 2026, an SAP-to-Salesforce sync, QuickBase and Kissflow migrations, about 18 months of Marketing Cloud
 *       support, the SBA EDWOSB/WOSB, SAM.gov and Virginia SWaM registrations. Nothing else counts as delivery.
 * Numbers typed below are copied from SALESFORCE_CITIES; build-v2/check-city-copy-numbers.mjs fails on a number that
 * is not in that city's data (or the short allowed list), so a typo cannot ship.
 *
 * ⛔ No local client, office or "serving {City} since" claim: we are in Malvern, PA. Never "Company in {City}".
 * ⛔ Visits (owner 2026-10-23 19:05): most work is remote; on larger projects on-site visits (kickoff, go-live,
 *    training) are planned into the project. Never promise visits as standard on these out-of-state pages.
 * ⛔ No industry-to-delivery pairing beyond lending (structure-spec D8); the SAP sync is never tied to an industry.
 * ⛔ Voice: problem -> solution -> outcome -> proof; never announce what we lack; no "certified people doing the work"
 *    (the company count never describes an individual).
 * ⛔ Smart Brevity (lint: scripts/sf-smart-brevity-check.mjs): every `lede` and `lead` is ONE sentence of at most 25
 *    words (no ". " inside: "St. ", "N. " would split it), every point at most 15 words, unit titles at most 8 words.
 * ⛔ No question is repeated across the 13 cities or with the Philadelphia / Chester County / Pennsylvania pages.
 * Links inside `deeper` use [text](/path) and render as router links. FAQ answers stay plain text (they are mirrored
 * into FAQPage JSON-LD); give a FAQ one `link` instead. Houston is never linked from another city until its gate. */

import type { LeadIn } from "../components/sf/SmartSection";
import type { SfPageKey } from "./salesforceProof";

export type CityFaq = { q: string; a: string; link?: { to: string; label: string } };

/** One Smart Brevity unit (H3) inside the city-only band. */
export type CityUnit = {
  title: string;
  lede: string;
  leadIn?: LeadIn;
  lead?: string;
  points?: string[];
  /** Completes "Go deeper: …". */
  label: string;
  /** Go deeper paragraphs; [text](/path) renders as a router link. */
  deeper: string[];
};

export type CitySource = { name: string; what: string; read: string; page: string };

export type CityCopy = {
  /** <title>, structure-spec §7.4 table, exact. */
  title: string;
  /** Meta description, 120-155 characters, the city's own pair of services. */
  description: string;
  /** "companies" everywhere except Washington, DC ("organizations"). */
  noun?: "organizations";
  /** Hero lede override (Miami leads with "Salesforce CRM consulting", page-map-final-plan §4). */
  heroLede?: string;
  /** The answer unit under "Do you provide Salesforce consulting in {City}?": the "What we do:" sentence + 3 points. */
  answer: { lead: string; points: [string, string, string] };
  /** Service cards after the health check, in this city's order (its own emphasis first), and the section lede. */
  services: { order: Exclude<SfPageKey, "hc" | "phl" | "che" | "pa">[]; lede: string };
  /** The city-only H2 (structure-spec D3b) and its two H3 units. */
  local: { h2: string; lede: string; units: [CityUnit, CityUnit] };
  /** City-only FAQs (D3c); the template adds the office, jobs, migration, budget and after-go-live questions. */
  faqs: CityFaq[];
  /** Sibling links named in prose (structure-spec §7.4 table). Houston only after its gate. */
  siblings: { to: string; label: string }[];
  /** Extra sources for the "Where these figures come from" pop-up (beyond Census, BLS, LinkedIn, USAspending). */
  sources?: CitySource[];
};

const PHONE = "Call (610) 890-9711";
const C = (slug: string, label: string) => ({ to: `/services/salesforce-consultant-${slug}`, label: `Salesforce consultants in ${label}` });

export const CITY_COPY: Record<string, CityCopy> = {
  "new-york": {
    title: "Salesforce Consulting NYC & New York, NY | One Algorithm",
    description: `Salesforce consulting for New York companies: migration, integration and weekly development. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "data migration, integration and weekly Salesforce development, scoped in writing after the free one-week health check.",
      points: ["Changes built in a sandbox and released on your schedule", "The people who scope the work deliver it", "A written handover the next hire can run"],
    },
    services: { order: ["dm", "int", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for New York companies, from the free one-week health check to migration, integration and weekly development." },
    local: {
      h2: "New York's Salesforce market, by the numbers",
      lede: "Of the 20 metros we checked, New York had the most Salesforce job listings and the most companies with 500 or more employees.",
      units: [
        {
          title: "Salesforce development consultants in New York",
          lede: "Our managed services run weekly Salesforce development, with hours reported every week, for teams that need a developer without a new hire.",
          leadIn: "By the numbers:",
          lead: "LinkedIn showed 391 Salesforce developer listings within 25 miles of New York on 21 October 2026.",
          label: "development work for New York teams",
          deeper: [
            "Development covers Flow automation for the manual steps, Apex where clicks can't, permissions rebuilt so the right people see the right records, and integrations that tell someone when they fail.",
            "Lending is where we run [ongoing Salesforce development](/services/salesforce-managed-services) every week, since April 2026; finance and insurance is New York's third-largest employer group in our Census pull.",
          ],
        },
        {
          title: "When Salesforce people leave mid-project",
          lede: "When that many firms hire for the same skill at once, the people who know how an org was built tend to leave mid-project.",
          leadIn: "What we do:",
          lead: "A fixed piece of work, such as a migration, an integration or a drifted org, closed with a handover the next hire can run.",
          label: "how a fixed-scope New York engagement closes",
          deeper: [
            "We fill that gap with a fixed piece of work, such as a [data migration](/services/salesforce-data-migration), an [integration](/services/salesforce-integration) or an org that has drifted, delivered by the people who scope it and closed with a written handover.",
            "Regulated firms keep their change controls: changes are built in a sandbox, documented, tested against real user profiles and released on your schedule.",
          ],
        },
      ],
    },
    faqs: [
      { q: "We have an internal Salesforce team. Why bring in a partner?", a: "For a specialism the team was not hired for, or for capacity on a deadline: a data migration, an ERP integration, or Marketing Cloud. We work alongside the admins you have, and every engagement ends with a handover your own people can run." },
      { q: "Can you work within a regulated firm's change controls?", a: "Yes. We work through your change process: changes built in a sandbox, documented, tested against real user profiles and released on your schedule, with a written record of what changed and why." },
      { q: "Can you take on Salesforce work for a New York finance or insurance firm?", a: "Yes. Lending is where we run ongoing Salesforce development every week, since April 2026, and finance and insurance is the New York metro's third-largest employer group, with 574,814 employees in the Census count.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
    ],
    siblings: [C("boston", "Boston"), { to: "/services/salesforce-consultant-philadelphia", label: "Salesforce consultants in Philadelphia" }],
  },

  "washington-dc": {
    title: "Salesforce Consulting in Washington, DC | One Algorithm",
    description: `Salesforce consulting for Washington, DC organizations, from a SAM.gov-registered EDWOSB. Free one-week health check. ${PHONE}.`,
    noun: "organizations",
    answer: {
      lead: "Salesforce integration, data migration and weekly administration for contractors, associations and nonprofits, scoped in writing after the free week.",
      points: ["Integration and migration for contractors, associations and nonprofits", "SBA-certified EDWOSB and WOSB, registered in SAM.gov", "A written scope and price after the free week"],
    },
    services: { order: ["int", "dm", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for Washington, DC organizations, from the free one-week health check to integration and data migration." },
    local: {
      h2: "Salesforce for Washington, DC organizations",
      lede: "Federal agencies recorded 306 contract awards mentioning Salesforce with work performed in Washington, DC over fiscal years 2022 to 2026.",
      units: [
        {
          title: "Salesforce implementation in Washington, DC",
          lede: "For contractors, associations and nonprofits we implement Salesforce in four stages, and any one of them can be taken on its own.",
          leadIn: "Why it matters:",
          lead: "Professional, scientific and technical services is the DC metro's largest employer group, with more than 34,000 establishments in our Census pull.",
          label: "the four stages for a DC organization",
          deeper: [
            "The four stages are the edition and license count before anyone signs, configuration around how your team works, [data migration](/services/salesforce-data-migration) and [integration](/services/salesforce-integration) reconciled before go-live, and support after go-live.",
            "That largest group includes the contractors and consultancies that work alongside the agencies, and nonprofit and membership organizations are another of the metro's four largest employer groups.",
          ],
        },
        {
          title: "Teaming on federal Salesforce work",
          lede: "OneAlgorithm is SBA-certified as an EDWOSB and WOSB, registered in SAM.gov and certified SWaM in Virginia.",
          leadIn: "Why it matters:",
          lead: "Those certifications make us eligible to team on set-aside work, and they are what most primes check first in a small-business partner.",
          label: "the federal figures behind DC Salesforce work",
          deeper: [
            "The 306 awards were led by the Treasury, Defense and State departments and total $1,241,391,054 in obligations (USAspending.gov, fiscal years 2022 to 2026).",
            "Contractors use Salesforce to track opportunities from SAM.gov, teaming partners, proposal stages and contract vehicles; we build the objects and reports around how a capture team already works.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Is OneAlgorithm able to subcontract on federal Salesforce work?", a: "Yes. We are registered in SAM.gov and hold SBA EDWOSB and WOSB certifications, which is what most primes check first when they need a small-business partner on a set-aside." },
      { q: "Do you work with associations and nonprofits in the DC area?", a: "Yes. Nonprofit and membership organizations are one of the largest groups of employers in the DC metro, and their Salesforce work (member data, migrations off older databases, integrations) is the same work we deliver for companies." },
      { q: "Can Salesforce track federal opportunities and teaming partners?", a: "Yes. Contractors use it to track opportunities from SAM.gov, teaming partners, proposal stages and contract vehicles. We build the objects and reports around how your capture team already works." },
    ],
    siblings: [{ to: "/services/salesforce-consultant-philadelphia", label: "Salesforce consultants in Philadelphia" }],
  },

  dallas: {
    title: "Salesforce Consulting in Dallas, TX | One Algorithm",
    description: `Salesforce consulting for Dallas–Fort Worth companies: ERP and SAP integration, migration, support. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "ERP and SAP integration, data migration and support after go-live, scoped in writing after the free one-week health check.",
      points: ["Orders, accounts and inventory agreed between Salesforce and the ERP", "Which system owns each record, agreed before any code", "Work alongside your in-house admins, handed over in writing"],
    },
    services: { order: ["int", "dm", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for Dallas companies, from the free one-week health check to ERP and SAP integration and migration." },
    local: {
      h2: "Salesforce for Dallas finance and insurance firms",
      lede: "Finance and insurance is one of the four largest employer groups in Dallas–Fort Worth, with 262,677 employees in the Census count.",
      units: [
        {
          title: "Lending and finance work on Salesforce",
          lede: "Lending is where we run ongoing Salesforce development every week, since April 2026, with hours reported every week.",
          leadIn: "Why it matters:",
          lead: "Finance teams need tight control of who sees which records, set with permission sets and sharing rules and tested against real logins.",
          label: "the finance figures and the lending work",
          deeper: [
            "The Dallas–Fort Worth finance and insurance group counts 12,347 establishments in the Census County Business Patterns 2023 pull.",
            "We describe the lending work and keep the client's name private; [Salesforce managed services](/services/salesforce-managed-services) shows how the weekly development runs.",
          ],
        },
        {
          title: "Salesforce consulting across Texas",
          lede: "We take on Salesforce work for companies across Texas remotely from Malvern, PA, from Dallas–Fort Worth to Austin.",
          leadIn: "By the numbers:",
          lead: "Across Texas, federal agencies recorded 5 contract awards mentioning Salesforce in fiscal years 2022 to 2026, worth $10,379,797.",
          label: "Texas figures and the Dallas community",
          deeper: [
            "Dallas–Fort Worth has more active Salesforce Trailblazer Community Groups than any other metro we checked, plus a Salesforce office on North Field Street.",
            "Dallas–Fort Worth also has one of the larger software developer workforces we measured, so many companies here staff routine admin work in-house and bring in a partner for integration and migration projects.",
            "The Texas community meets at Texas Dreamin' 2027 in Austin; see [Salesforce consultants in Austin](/services/salesforce-consultant-austin).",
          ],
        },
      ],
    },
    faqs: [
      { q: "Can Salesforce sync with our ERP?", a: "Usually, yes. The real questions are which system owns each record, how often it syncs and what happens when the two disagree. We have built an SAP-to-Salesforce sync; the same approach applies to other ERPs, and we agree the rules with your finance and operations people before writing any code.", link: { to: "/services/salesforce-integration", label: "Salesforce integration with SAP and ERP" } },
      { q: "Is a mid-size Dallas company too small for a Salesforce partner?", a: "No. The free one-week Salesforce health check works the same for a 20-person team as for a 500-person one, and every fix after it is scoped to what your team actually uses." },
      { q: "How long does a Salesforce-to-ERP integration take?", a: "It depends on how many objects sync and how clean the data is, so we scope it before giving a timeline. The free one-week Salesforce health check is often the first step, because it shows the state of the data the integration will depend on." },
      { q: "Can you work alongside our in-house Salesforce admins in Dallas?", a: "Yes. Dallas–Fort Worth has one of the larger software developer workforces we measured, so many teams keep routine admin work in-house and bring in a partner for integration and migration projects. We work alongside them and hand over in writing." },
    ],
    siblings: [C("austin", "Austin")],
  },

  denver: {
    title: "Salesforce Implementation Partner in Denver, CO | One Algorithm",
    description: `Salesforce implementation and consulting for Denver companies: setup, migration, integration, support. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "implementation from the license count to go-live, then data migration, integration and support, or any one stage on its own.",
      points: ["Edition and license count decided before anyone signs", "Data migration and integration reconciled before go-live", "Month-to-month support with hours reported every week"],
    },
    services: { order: ["dm", "int", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for Denver companies, from the free one-week health check to data migration, integration and weekly support." },
    local: {
      h2: "Salesforce implementation partner for Denver companies",
      lede: "As an implementation partner we take a Denver project from the license count through configuration, migration and integration to support after go-live.",
      units: [
        {
          title: "A Denver implementation, stage by stage",
          lede: "Any stage can be taken on its own, and a team with an admin in place often brings us in for the migration alone.",
          points: ["Edition and license count before anyone signs", "Configuration and Flow around how your team works", "Migration and integration reconciled before go-live"],
          label: "the four implementation stages",
          deeper: [
            "The four stages: the license count and edition, configuration of Sales Cloud and Service Cloud with Flow for the manual steps, [data migration](/services/salesforce-data-migration) and [integration](/services/salesforce-integration) with the totals reconciled, then support after go-live.",
          ],
        },
        {
          title: "Colorado's federal and community demand",
          lede: "Colorado recorded 57 federal contract awards mentioning Salesforce over fiscal years 2022 to 2026, led by Veterans Affairs.",
          leadIn: "By the numbers:",
          lead: "Denver has one of the smaller business bases on our Salesforce pages, yet it hosts Mile High Dreamin', a community-run Salesforce conference.",
          label: "Colorado's federal figures and Denver's community",
          deeper: [
            "Three of those awards had work performed in the city of Denver, worth $1,706,169, led by the Department of the Interior (USAspending.gov).",
            "Mile High Dreamin' is scheduled for August 25–26, 2027, and Denver has an active Trailblazer community and a Salesforce office downtown, at 1225 17th Street.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Our Salesforce org was set up fast and has grown messy. Where do we start?", a: "With a look at what is actually there: licenses against real use, fields nobody fills, automation that overlaps, and integrations that fail quietly. That is what our free one-week Salesforce health check produces, as a written list ranked by what to fix first.", link: { to: "/services/salesforce-health-check", label: "The free Salesforce health check" } },
      { q: "Can you support our Salesforce org month to month?", a: "Yes. Weekly administration and development, with hours reported every week, is how we run our ongoing Salesforce work for a lending company.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
      { q: "Do you work with Colorado government contractors?", a: "Yes. We are registered in SAM.gov and certified by the SBA as an EDWOSB and WOSB, which makes us eligible to team with contractors on set-aside work." },
    ],
    siblings: [C("chicago", "Chicago")],
  },

  atlanta: {
    title: "Salesforce Consulting Services Atlanta, GA | One Algorithm",
    description: `Salesforce consulting services for Atlanta companies: data loads, integration, managed services. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "large data loads, integration and managed services, scoped in writing after the free one-week health check.",
      points: ["Implementation partner from the license count to go-live", "Large data loads and de-duplication, reconciled", "Managed services: weekly administration and development"],
    },
    services: { order: ["dm", "int", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for Atlanta companies, from the free one-week health check to data loads, integration and managed services." },
    local: {
      h2: "Salesforce for Atlanta health care and logistics",
      lede: "Health care is the Atlanta metro's largest employer group, and wholesale trade is among its four largest in our Census pull.",
      units: [
        {
          title: "Health care access rules on Salesforce",
          lede: "Health care organizations need tight control of who sees which records, set with permission sets, sharing rules and field-level security.",
          leadIn: "What we do:",
          lead: "Every access change is tested against real user logins before anything goes live.",
          label: "the Atlanta health care figures",
          deeper: [
            "Health care and social assistance employs 335,426 people across 18,435 establishments in the Atlanta metro (Census County Business Patterns 2023).",
            "Federal agencies also recorded 11 Salesforce-related contract awards with work performed in Atlanta over fiscal years 2022 to 2026, led by Health and Human Services.",
          ],
        },
        {
          title: "Wholesale and logistics run on volume",
          lede: "Wholesale and logistics businesses need Salesforce to handle thousands of accounts, bulk data loads and clean de-duplication.",
          leadIn: "What we do:",
          lead: "We load in tested batches with duplicate rules switched on, so the reports still add up afterwards.",
          label: "how a large Atlanta data load runs",
          deeper: [
            "A large load starts with a test load and a field map agreed in writing; large loads fail on the edge cases, so we find them on a small sample before the full run.",
            "For teams that want a Salesforce specialist on call rather than on payroll, our [managed services](/services/salesforce-managed-services) run weekly administration and development, with hours reported every week.",
          ],
        },
      ],
    },
    faqs: [
      { q: "How do you handle a large data load into Salesforce?", a: "In batches, with a test load first, a field map agreed in writing, duplicate rules switched on, and a count check after every batch. Large loads fail on the edge cases, so we find them on a small sample before the full run." },
      { q: "Can you clean up duplicate accounts and contacts?", a: "Yes. We agree the matching rules with you first (which record wins and which fields carry over), then merge in batches you can review, so nothing important disappears." },
      { q: "Can Salesforce handle a health care organization's access rules?", a: "Yes. Health care is the largest employer group in the Atlanta metro, and those organizations need tight control of who sees which records. We set that up with permission sets, sharing rules and field-level security, tested against real user logins before anything goes live." },
      { q: "Do you offer Salesforce managed services in Atlanta?", a: "Yes. Our managed services run weekly administration and development for teams that want a Salesforce specialist on call rather than on payroll, with hours reported every week.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
    ],
    siblings: [C("miami", "Miami")],
  },

  boston: {
    title: "Salesforce Consultants in Boston, MA | One Algorithm",
    description: `Salesforce consultants for Boston companies: access and sharing, integration, migration. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "access and sharing, integration and data migration, scoped in writing after the free one-week health check.",
      points: ["Access and sharing rebuilt with permission sets", "Integration with finance and ERP systems", "Development and customization, reported every week"],
    },
    services: { order: ["int", "dm", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for Boston companies, from the free one-week health check to integration, migration and development." },
    local: {
      h2: "Boston health care, research and professional services",
      lede: "Health care and professional services are Boston's two largest employer groups, and the metro has an active Trailblazer community.",
      units: [
        {
          title: "Salesforce development services for Boston companies",
          lede: "Customization covers custom objects and fields where standard ones don't fit, Flow for the manual steps and Apex where clicks can't.",
          leadIn: "What we do:",
          lead: "Weekly Salesforce development through our managed services, with hours reported every week.",
          label: "development and integration for Boston teams",
          deeper: [
            "Larger employers often run Salesforce next to finance and ERP systems; we [connect the two](/services/salesforce-integration) and agree which system owns each record before building anything.",
            "The development work runs through [Salesforce managed services](/services/salesforce-managed-services), built in a sandbox and tested before release.",
          ],
        },
        {
          title: "Who sees which records",
          lede: "Organizations like these have strict rules about who can see which records, and getting profiles, permission sets and sharing right is careful work.",
          leadIn: "What we do:",
          lead: "We map who needs which records, rebuild access with permission sets and sharing rules, and test against real user logins.",
          label: "the Boston figures",
          deeper: [
            "Health care and social assistance employs 444,538 people in the Boston metro, and professional, scientific and technical services 328,542 (Census County Business Patterns 2023).",
            "Salesforce has an office on Boylston Street and another in Burlington, and Boston's Trailblazer groups include a Higher Ed User Group for the Northeast.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Can you tighten who sees what in our Salesforce?", a: "Yes. We map who needs which records, then rebuild access with permission sets and sharing rules instead of stacking more profiles. Every change is tested against real user logins before it goes live." },
      { q: "Does Salesforce work the same for research and nonprofit organizations?", a: "The platform work is the same: data models, access, automation and integrations. We keep the build simple enough for a small internal team to run after we hand over." },
      { q: "Can you connect Salesforce to our other systems?", a: "Yes. We have built an SAP-to-Salesforce sync, and the same approach connects Salesforce to other finance and ERP systems: agree which system owns each record before building anything.", link: { to: "/services/salesforce-integration", label: "Salesforce integration with SAP and ERP" } },
    ],
    siblings: [C("new-york", "New York")],
  },

  seattle: {
    title: "Salesforce Consultants in Seattle, WA | One Algorithm",
    description: `Salesforce consultants for Seattle companies: platform design, Flow versus Apex, integration. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "platform design, Flow and Apex decisions and integration, scoped in writing after the free one-week health check.",
      points: ["Governor limits and API choice planned for your volumes", "Flow where admins maintain it, Apex where volume needs it", "Pairing with your engineers rather than replacing them"],
    },
    services: { order: ["int", "ms", "dm", "mc", "sa", "cost"], lede: "Seven Salesforce services for Seattle companies, from the free one-week health check to integration and weekly development." },
    local: {
      h2: "Seattle: a technical market that builds on Salesforce",
      lede: "Seattle has one of the largest software developer workforces of the metros we checked, and Salesforce offices in Fremont and Bellevue.",
      units: [
        {
          title: "What a Salesforce partner adds to engineers",
          lede: "Teams with strong engineers often build integrations themselves and bring in a Salesforce specialist for the platform side.",
          leadIn: "What we do:",
          lead: "Limits, Flow versus code, and a data model that holds up as volume grows, written down so the next person understands.",
          label: "the platform side of a Seattle integration",
          deeper: [
            "Platform knowledge means governor limits, which API to use for which volume, when Flow is the right tool and when code is, and how to keep the org maintainable.",
            "Software developers in the Seattle metro number 92,770 (BLS, May 2025); we pair with them rather than replacing them.",
          ],
        },
        {
          title: "Seattle hires architects ahead of developers",
          lede: "Seattle's Salesforce listings in our LinkedIn search included more architect positions than developer ones.",
          leadIn: "Why it matters:",
          lead: "Local teams are designing larger Salesforce estates and need platform-level judgment before they need more code.",
          label: "the Seattle role counts",
          deeper: [
            "On 21 October 2026, LinkedIn searches within 25 miles of Seattle showed 243 Salesforce architect listings against 183 for developers.",
            "The Seattle Salesforce community meets in Admin and Women in Tech groups in Seattle and an Admin group in Bellevue.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Our engineers can build the integration. What would a Salesforce partner add?", a: "Platform knowledge: governor limits, which API to use for which volume, when Flow is the right tool and when code is, and how to keep the org maintainable. We often pair with an internal team rather than replacing it." },
      { q: "Should we use Flow or Apex?", a: "Flow for most business automation, because admins can maintain it. Apex where volume, complexity or performance need it. We decide case by case and write down why, so the next person understands the choice." },
      { q: "Can you review our Salesforce architecture?", a: "Yes. Our free one-week Salesforce health check covers the data model, automation, access and integrations, and ends with a written list ranked by what to fix first. Salesforce's AppExchange record lists 38 Platform certifications among our 53.", link: { to: "/services/salesforce-health-check", label: "The free Salesforce health check" } },
    ],
    siblings: [C("los-angeles", "Los Angeles"), C("san-francisco", "San Francisco")],
  },

  "san-francisco": {
    title: "Salesforce Consultant San Francisco, CA | One Algorithm",
    description: `Salesforce consultants for San Francisco Bay Area companies: fixed-scope projects and handover. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "fixed-scope migrations, integrations and clean-ups with a written handover, scoped after the free one-week health check.",
      points: ["A written scope first, then the work, then a handover", "Sales, billing and product usage data kept in step", "An org your own team can run afterwards"],
    },
    services: { order: ["dm", "int", "ms", "mc", "sa", "cost"], lede: "Seven Salesforce services for San Francisco companies, from the free one-week health check to fixed-scope migration and integration." },
    local: {
      h2: "Salesforce for Bay Area companies, Fremont included",
      lede: "Salesforce is headquartered at Salesforce Tower, 415 Mission Street, and the Bay Area has more Salesforce offices than any other metro we checked.",
      units: [
        {
          title: "Salesforce implementation in the Bay Area",
          lede: "We take on Bay Area work remotely, anywhere from San Francisco and Oakland to Fremont, with discovery, reviews and handover on video.",
          leadIn: "Why it matters:",
          lead: "Buyers here know what Salesforce can do; what they need is a defined piece of work and an org their team can run.",
          label: "the stages of a Bay Area implementation",
          deeper: [
            "An implementation runs in four stages: the license count and edition, configuration, [data migration](/services/salesforce-data-migration) and [integration](/services/salesforce-integration) reconciled before go-live, then support after go-live; any stage can be taken on its own.",
            "Health care, professional services and information businesses are among the Bay Area's largest employer groups in our Census pull.",
          ],
        },
        {
          title: "Expensive to hire, hard to keep",
          lede: "The Bay Area had one of the larger pools of Salesforce job listings we measured, which makes experienced Salesforce people expensive to hire.",
          leadIn: "What we do:",
          lead: "A defined project delivered by the people who scope it, without adding to that hiring market.",
          label: "the Bay Area hiring figures",
          deeper: [
            "Software developers in the San Francisco-Oakland-Fremont metro earn a median $186,640 a year in salary alone (BLS, May 2025).",
            "On 21 October 2026, LinkedIn searches within 25 miles of San Francisco showed 1,663 Salesforce listings across four role searches.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Why choose a focused Salesforce partner over a large firm?", a: "You deal directly with the people who scope and do the work, and the scope stays fixed to what you need. Salesforce's AppExchange record of OneAlgorithm lists 16 Salesforce-certified people holding 53 certifications." },
      { q: "Do you take on short, fixed-scope Salesforce projects?", a: "Yes. A defined migration, integration, health check or clean-up is often the best way to start. You get a written scope first, then the work, then a handover." },
      { q: "Do you work with software companies that sell on Salesforce?", a: "Yes. Software companies need Salesforce to keep sales, billing and product usage data in step, and that integration and data work is the core of what we deliver." },
    ],
    siblings: [C("los-angeles", "Los Angeles"), C("seattle", "Seattle")],
  },

  "los-angeles": {
    title: "Salesforce Consultants in Los Angeles, CA | One Algorithm",
    description: `Salesforce consultants for Los Angeles companies: ERP integration, Marketing Cloud, migration. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "ERP integration, Marketing Cloud support and data migration, scoped in writing after the free one-week health check.",
      points: ["Specialist work on demand without a full-time hire", "Your admin keeps the day-to-day; we take the deeper work", "Orders, accounts and pricing agreed between Salesforce and the ERP"],
    },
    services: { order: ["int", "mc", "dm", "ms", "sa", "cost"], lede: "Seven Salesforce services for Los Angeles companies, from the free one-week health check to ERP integration and Marketing Cloud." },
    local: {
      h2: "Los Angeles: a large, mixed business market",
      lede: "Los Angeles has one of the largest business bases of the metros we checked, led by health care, professional services, manufacturing and wholesale trade.",
      units: [
        {
          title: "One admin, and the deeper work",
          lede: "Where a team runs Salesforce with a small internal staff, a partner adds the most: specialist work on demand without a full-time hire.",
          leadIn: "What we do:",
          lead: "Integrations, data migrations and Marketing Cloud, the pieces one admin was never hired for, while your admin keeps the day-to-day.",
          label: "specialist work and Marketing Cloud",
          deeper: [
            "Marketing Cloud is Salesforce's own marketing platform, and we have provided about 18 months of Marketing Cloud support; [Marketing Cloud consulting](/services/salesforce-marketing-cloud-consulting) shows how that support runs.",
          ],
        },
        {
          title: "Manufacturing and wholesale need ERP sync",
          lede: "Los Angeles has a large manufacturing and wholesale base, and those businesses need Salesforce to agree with an ERP on orders, accounts and pricing.",
          leadIn: "What we do:",
          lead: "Agree which system owns each record, how often it syncs and what happens when the two disagree, before anything is built.",
          label: "the Los Angeles manufacturing and wholesale figures",
          deeper: [
            "Manufacturing employs 435,021 people and wholesale trade 336,540 in the Los Angeles metro (Census County Business Patterns 2023).",
            "[Salesforce integration](/services/salesforce-integration) covers ERP sync work end to end. Salesforce's nearest office is in Irvine.",
          ],
        },
      ],
    },
    faqs: [
      { q: "We have one Salesforce admin. Is that enough?", a: "For day-to-day running, often yes. The gaps tend to be deeper work (integrations, data migrations, Marketing Cloud) that one person was never hired for. We cover those pieces and leave the day-to-day with your admin." },
      { q: "Can Salesforce work with our marketing tools?", a: "Yes. Marketing Cloud is Salesforce's own marketing platform, and we have provided about 18 months of Marketing Cloud support.", link: { to: "/services/salesforce-marketing-cloud-consulting", label: "Marketing Cloud consulting" } },
      { q: "Can Salesforce share data with our ERP?", a: "Usually, yes. We have built an SAP-to-Salesforce sync, and the same approach applies to other ERPs: agree which system owns each record, how often it syncs, and what happens when they disagree." },
    ],
    siblings: [C("san-francisco", "San Francisco")],
  },

  austin: {
    title: "Salesforce Consultants in Austin, TX | One Algorithm",
    description: `Salesforce consultants for Austin companies: org clean-up, Flow automation, weekly support. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "org clean-up, Flow automation and weekly support, scoped in writing after the free one-week health check.",
      points: ["A cleaner data model for an org that outgrew its setup", "Flow for the manual steps that save real time", "Weekly support for a small team, without a full-time hire"],
    },
    services: { order: ["ms", "dm", "int", "mc", "sa", "cost"], lede: "Seven Salesforce services for Austin companies, from the free one-week health check to clean-up, automation and weekly support." },
    local: {
      h2: "Austin: a fast-growing technology market",
      lede: "Austin's largest employer groups are professional services, health care and information, and it has a Salesforce office on Congress Avenue.",
      units: [
        {
          title: "Outgrowing the first Salesforce setup",
          lede: "Fast-growing companies often outgrow how their Salesforce was first set up within a year or two.",
          leadIn: "What we do:",
          lead: "A cleaner data model, automation that replaces manual steps, and integrations that keep sales and finance in step.",
          label: "Austin's growth figures",
          deeper: [
            "The Austin metro grew from 2,227,083 people in 2019 to 2,550,637 in 2024 (Census ACS), and its business establishments from 54,446 in 2018 to 66,280 in 2023.",
            "We list the manual steps first, automate the ones that save real time with Flow, and leave the rest alone so the org stays easy to maintain.",
          ],
        },
        {
          title: "Salesforce in Austin's annual reports",
          lede: "In an SEC full-text search of annual reports (10-Ks) mentioning Salesforce, Austin addresses appeared in 26 of the 78 Texas results.",
          leadIn: "By the numbers:",
          lead: "That is more than the city of Dallas (12) or Houston (10).",
          label: "the SEC search and Austin's job count",
          deeper: [
            "Austin has the smallest business base of the cities on our Salesforce pages, but more than 1,000 Salesforce job listings across our four LinkedIn role searches.",
            "Texas Dreamin' 2027 meets in Austin; see also [Salesforce consultants in Dallas](/services/salesforce-consultant-dallas).",
          ],
        },
      ],
    },
    faqs: [
      { q: "We set up Salesforce ourselves. When should we bring in help?", a: "When reports stop matching what people see, when manual steps keep growing, or before a big migration or integration. Our free one-week Salesforce health check tells you which of those applies and what to fix first." },
      { q: "Can you automate steps our team does by hand in Salesforce?", a: "Usually, with Flow. We list the manual steps first, automate the ones that save real time, and leave the rest alone so the org stays easy to maintain." },
      { q: "Can you support a small team that relies heavily on Salesforce?", a: "Yes. Weekly administration and development gives a small team specialist cover without a full-time hire. It is how we run our ongoing Salesforce work for a lending company, every week since April 2026.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
    ],
    siblings: [C("dallas", "Dallas")],
    sources: [
      { name: "U.S. Securities and Exchange Commission, EDGAR full-text search", what: "Annual reports (10-Ks) mentioning Salesforce, by Texas business address", read: "read 21 October 2026", page: "https://www.sec.gov/edgar/search/" },
    ],
  },

  miami: {
    title: "Salesforce Consulting Services Miami, FL | One Algorithm",
    description: `Salesforce CRM consulting for Miami and South Florida companies, delivered remotely. Free one-week health check. ${PHONE}.`,
    heroLede: "We take on Salesforce CRM consulting for Miami and South Florida companies remotely from Malvern, PA, starting with a free one-week health check.",
    answer: {
      lead: "Salesforce CRM consulting, weekly administration and development, and data migration, scoped in writing after the free one-week health check.",
      points: ["Discovery, reviews and handover on video", "Weekly administration and development, hours reported every week", "Migration off older databases, reconciled before go-live"],
    },
    services: { order: ["ms", "dm", "int", "mc", "sa", "cost"], lede: "Seven Salesforce services for Miami and South Florida companies, from the free one-week health check to weekly administration and development." },
    local: {
      h2: "Salesforce CRM consulting in Miami and South Florida",
      lede: "The same remote engagement serves companies in Miami, Fort Lauderdale, across South Florida and up to Jacksonville.",
      units: [
        {
          title: "Remote by design across South Florida",
          lede: "Where local Salesforce people are scarce, teams lean on remote partners, and that is how we work everywhere.",
          leadIn: "What we do:",
          lead: "Discovery, reviews and handover on video from Malvern, Pennsylvania; on larger projects, on-site visits are planned into the project.",
          label: "Miami's Salesforce community and hiring",
          deeper: [
            "Salesforce lists no office in the Miami metro; the nearest active Trailblazer group meets in Southeast Florida, about 40 km from central Miami, and Florida Dreamin' is the region's community event.",
            "On 21 October 2026, LinkedIn searches within 25 miles of Miami showed 603 Salesforce listings across four role searches.",
          ],
        },
        {
          title: "Finance, lending and Latin America",
          lede: "Finance and insurance is one of Miami's four largest employer groups, and lending is where we run ongoing Salesforce development every week.",
          leadIn: "What we do:",
          lead: "One org can run multiple currencies and languages, with access split by region, scoped before anything is built.",
          label: "the Miami finance figures and multi-region orgs",
          deeper: [
            "Finance and insurance employs 116,609 people across 13,086 establishments in the Miami metro (Census County Business Patterns 2023).",
            "Our [managed services](/services/salesforce-managed-services) run that weekly development, with hours reported every week; the nearest of our other city pages is [Salesforce consultants in Atlanta](/services/salesforce-consultant-atlanta).",
          ],
        },
      ],
    },
    faqs: [
      { q: "Is remote Salesforce consulting as effective as on-site?", a: "For Salesforce, yes, because the work happens inside the org. What matters is clear scoping, regular reviews and a proper handover, and all three work well on video." },
      { q: "Can you help with Salesforce for a finance or lending business?", a: "Yes. We run ongoing Salesforce development for a lending company, every week since April 2026.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
      { q: "Can Salesforce support a business that also operates in Latin America?", a: "Yes. One org can run multiple currencies and languages, with access split by region. We scope the regional requirements (currencies, languages and who sees which records) before building." },
    ],
    siblings: [C("atlanta", "Atlanta")],
  },

  chicago: {
    title: "Salesforce Consulting in Chicago, IL | One Algorithm",
    description: `Salesforce consulting for Chicago companies: ERP integration, takeovers, weekly development. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "ERP integration, org takeovers and weekly development, scoped in writing after the free one-week health check.",
      points: ["Specialist capacity for a defined project, outside the hiring race", "An inherited org documented before anything changes", "Accounts, orders and pricing consistent with the ERP"],
    },
    services: { order: ["int", "ms", "dm", "mc", "sa", "cost"], lede: "Seven Salesforce services for Chicago companies, from the free one-week health check to ERP integration and weekly development." },
    local: {
      h2: "A Midwest hub with heavy Salesforce hiring",
      lede: "Chicago had the fifth-highest number of Salesforce job listings of the 20 metros we measured, and a Salesforce office at Wolf Point Plaza.",
      units: [
        {
          title: "Hard to hire, hard to keep",
          lede: "Hiring demand that high means experienced Salesforce people in Chicago are hard to keep.",
          leadIn: "What we do:",
          lead: "Specialist capacity for a defined project, or monthly ongoing development, without competing in that hiring market.",
          label: "Chicago's role counts and org takeovers",
          deeper: [
            "On 21 October 2026, LinkedIn searches within 25 miles of Chicago showed 573 Salesforce consultant listings, 388 for administrators, 339 for architects and 239 for developers.",
            "Taking over an org another consultant built starts with documenting what is there and what it costs you, then agreeing with you what to keep and what to fix.",
          ],
        },
        {
          title: "Manufacturing and the ERP",
          lede: "Manufacturing is one of Chicago's four largest employer groups, with 370,871 employees in our Census pull.",
          leadIn: "What we do:",
          lead: "Keep accounts, orders and pricing consistent between Salesforce and the ERP, then clean the data so reports match operations.",
          label: "the Chicago manufacturing figures and ERP work",
          deeper: [
            "[Salesforce integration](/services/salesforce-integration) agrees which system owns each record before anything is built; see also [Salesforce consultants in Denver](/services/salesforce-consultant-denver).",
            "Chicago's Trailblazer community includes Admin groups in Chicago, Downers Grove, Schaumburg and Naperville.",
          ],
        },
      ],
    },
    faqs: [
      { q: "We can't hire a Salesforce developer fast enough. What are the options?", a: "Bring in a partner for defined pieces of work while you hire, or keep a partner on a monthly basis for ongoing development. We do both, with hours and progress reported every week." },
      { q: "Can you take over an org another consultant built?", a: "Yes. We start by documenting what is there and what it costs you, then agree with you what to keep and what to fix." },
      { q: "Can Salesforce keep a manufacturer's ERP and sales team in step?", a: "Yes. The work is keeping accounts, orders and pricing consistent between Salesforce and the ERP, then cleaning the data so reports match what operations sees. We have built an SAP-to-Salesforce sync." },
    ],
    siblings: [C("denver", "Denver")],
  },

  houston: {
    /* page-map-final-plan.md §3 (Houston): title exactly as planned, never "Company in Houston"; no ERP/SAP lead
     * (Dallas's angle); Census mix as context only, no energy, oil, port or medical-center claim tied to our work.
     * Gated: no other page links here until structure-spec D9 passes (sf-link-policy-check enforces it). */
    title: "Salesforce Consultant Houston, TX | One Algorithm",
    description: `Salesforce consulting for Houston companies: data migration, org merges and weekly support. Free one-week health check. ${PHONE}.`,
    answer: {
      lead: "data migration, org merges after an acquisition and weekly support, scoped in writing after the free one-week health check.",
      points: ["Two orgs merged, record counts reconciled before switch-off", "Calls booked in your time zone, one hour behind ours", "Weekly administration and development afterwards"],
    },
    services: { order: ["dm", "ms", "int", "mc", "sa", "cost"], lede: "Seven Salesforce services for Houston companies, from the free one-week health check to migration, org merges and weekly support." },
    local: {
      h2: "Salesforce experts for Houston companies",
      lede: "Health care, professional services, manufacturing and wholesale trade are Houston's four largest employer groups in the Census count.",
      units: [
        {
          title: "Two orgs after an acquisition",
          lede: "Companies that grow by acquisition often end up with two Salesforce orgs, or customer records still sitting in an older system.",
          leadIn: "What we do:",
          lead: "We migrate and merge that data with record counts reconciled before go-live, then keep the org running every week.",
          label: "how a Houston org merge runs",
          deeper: [
            "We document both orgs first, agree with you which records and fields win, then [migrate in batches](/services/salesforce-data-migration) you can check, and keep the org running with [weekly administration and development](/services/salesforce-managed-services).",
            "See also [Salesforce consultants in Dallas](/services/salesforce-consultant-dallas) and [Salesforce consultants in Austin](/services/salesforce-consultant-austin).",
          ],
        },
        {
          title: "Houston hiring spans all four roles",
          lede: "Salesforce hiring in Houston spans all four roles we searched: consultants, administrators, architects and developers.",
          leadIn: "Why it matters:",
          lead: "We run Houston work remotely from Malvern, Pennsylvania, one time zone east, so a working day overlaps for seven of your eight hours.",
          label: "Houston's role counts",
          deeper: [
            "On 21 October 2026, LinkedIn searches within 25 miles of Houston showed 202 Salesforce consultant listings, 172 for administrators, 160 for architects and 100 for developers.",
            "Salesforce lists no Houston office (the nearest are in Austin and Dallas), and the local community meets in Houston's Trailblazer groups.",
          ],
        },
      ],
    },
    faqs: [
      { q: "Does the hour between Houston and Pennsylvania get in the way?", a: "No. We are one hour ahead of Houston, so a standard working day overlaps for seven of its eight hours, and calls are booked in your time zone." },
      { q: "Can you merge two Salesforce orgs after an acquisition?", a: "Yes. We document both orgs first, agree with you which records and fields win, then migrate in batches you can check, with record counts reconciled before the old org is switched off.", link: { to: "/services/salesforce-data-migration", label: "Salesforce data migration" } },
      { q: "Can Salesforce track bids and quotes for an industrial supplier?", a: "Yes. Opportunities, quotes and approval steps cover most bid processes, and Flow can route a quote for sign-off. Where prices live in the ERP, we sync them instead of retyping them." },
    ],
    siblings: [C("dallas", "Dallas"), C("austin", "Austin")],
  },
};

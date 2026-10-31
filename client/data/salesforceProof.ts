/* One source for the AppExchange figures the Salesforce pages quote.
 * Read from appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EV7SwUAL,
 * last verified 2026-09-02 (certifications 52 -> 53, a new Agentforce cert; people
 * unchanged). Six pages built 2026-10-22 still typed "52"; this file ends that.
 * Change the numbers here and nowhere else. */
export const SF_CERTIFIED_PEOPLE = 16;
export const SF_CERTIFICATIONS = 53;
export const SF_PLATFORM_CERTS = 38;
/** The partner tier Salesforce's AppExchange listing shows (read SF_VERIFIED_ON). Owner decision 2026-10-23 ~19:05: state it. */
export const SF_PARTNER_TIER = "Select";
export const SF_PROOF_LINE = `${SF_CERTIFICATIONS} certifications`;
export const SF_LISTING_ID = "a0N3A00000EV7SwUAL";
export const SF_APPEXCHANGE_URL = `https://appexchange.salesforce.com/appxListingDetail?listingId=${SF_LISTING_ID}`;

/** Date a PERSON last re-read the listing's stat box. Change only after re-reading it. */
export const SF_VERIFIED_ON = "2026-10-23";
export const SF_VERIFIED_LABEL = new Date(`${SF_VERIFIED_ON}T12:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}); // "23 October 2026"
// SF_PHONE and the city list live in salesforceShared.ts (the main chunk imports them, CR-6).
import { SF_CITY_LINKS } from "./salesforceShared";
export { SF_PHONE } from "./salesforceShared";

/** Verbatim approved wording. No sector, date (except lending), logo or metric. ⛔ Never add a row
 *  that is not on the allowed-proof list in the 2026-10-23 design spec.
 *  Tags (2026-10-23 fix round, L4): "· NO CLIENT NAMED" dropped. It announced an absence on every
 *  page (voice addendum rule 4); the rows still name no client, which is where the honesty lives. */
export const SF_DELIVERED = [
  { id: "lending", text: "Ongoing Salesforce development for a lending company since April 2026", to: "/services/salesforce-managed-services", tag: "ONGOING SINCE APR 2026" },
  { id: "sap", text: "An SAP-to-Salesforce sync", to: "/services/salesforce-integration", tag: "DELIVERED" },
  { id: "lowcode", text: "QuickBase and Kissflow systems migrated into Salesforce", to: "/services/salesforce-data-migration", tag: "DELIVERED" },
  { id: "mc", text: "About 18 months of Marketing Cloud support", to: "/services/salesforce-marketing-cloud-consulting", tag: "SUPPORT" },
] as const;
export type SfDeliveredId = (typeof SF_DELIVERED)[number]["id"];

export type SfPageKey = "hc" | "dm" | "int" | "ms" | "mc" | "sa" | "cost" | "phl" | "che" | "pa";

/** One list of the Salesforce routes. Feeds RouteBoard, DeliveredLedger's self-check and llms.txt.
 *  Service bodies are the hub's EXISTING one-liners, verbatim; local bodies are each page's own meta
 *  description. ponytail: `cities` is typed here rather than derived from salesforceCities.ts, so
 *  importing this file never pulls 78 KB of city data into a page that only wants the phone number.
 *  Ceiling: a new city page must be added here too; scripts/plates-check.mjs fails the build if a
 *  /services/salesforce-* route in prerender.mjs is missing from public/llms.txt. */
export const SF_PAGES = {
  services: [
    { key: "hc", to: "/services/salesforce-health-check", title: "Free one-week Salesforce health check", body: "Licenses, data, automation, permissions and integrations, in a written list ranked by what to fix first." },
    { key: "dm", to: "/services/salesforce-data-migration", title: "Salesforce data migration", body: "QuickBase, Kissflow, another CRM or another org, reconciled before go-live." },
    { key: "int", to: "/services/salesforce-integration", title: "Salesforce integration with SAP and ERP", body: "Which system owns each record, agreed before anything is built." },
    { key: "ms", to: "/services/salesforce-managed-services", title: "Salesforce managed services", body: "Weekly administration and development, with hours reported every week." },
    { key: "mc", to: "/services/salesforce-marketing-cloud-consulting", title: "Marketing Cloud consulting", body: "Support for Marketing Cloud accounts already running." },
    { key: "sa", to: "/services/staff-augmentation", title: "Salesforce staff augmentation", body: "Salesforce people added to your team for as long as you need them." },
    { key: "cost", to: "/services/salesforce-implementation-cost", title: "Salesforce implementation cost guide", body: "Published market ranges, named and dated, before licenses." },
  ],
  local: [
    { key: "phl", to: "/services/salesforce-consultant-philadelphia", title: "Salesforce consultants for Philadelphia companies", body: "Salesforce consulting for Philadelphia companies from a listed Consulting Partner in Malvern." },
    { key: "che", to: "/services/salesforce-consultant-chester-county", title: "Salesforce consultant for Chester County businesses", body: "Which edition you actually need, what it costs, and a license count before you sign." },
    { key: "pa", to: "/services/salesforce-consulting-partner-pennsylvania", title: "Salesforce Consulting Partner in Pennsylvania", body: "How to check any partner's record on the AppExchange before you hire one." },
  ],
  cities: SF_CITY_LINKS,
} as const;

export type SfPerson = {
  name: string;
  /** Schema.org jobTitle and the visible title line. */
  title: string;
  /** The approved sentence about this person, verbatim. ⛔ No certification count, no prior employer. */
  statement: string;
  /** Their public Salesforce verification profile (Trailblazer). */
  trailhead: string;
  /** Link text for `trailhead`, e.g. "Verify on his Trailblazer profile". */
  verifyLabel: string;
  linkedin?: string;
  /** ISO date the owner approved naming this person on the site. */
  approvedOn: string;
};
/** ⛔ Owner-gated (spec §7.4). Louis named Sreenivas as the Salesforce lead on 2026-10-23
 *  (owner-decisions.md, answers 3/4); `approvedOn` is that date. Wording and link are the approved
 *  proof, verbatim; his active certifications were read from the Trailblazer profile on 2026-10-23.
 *  No photo exists, so PeopleStrip renders text only. Empty array = PeopleStrip renders nothing.
 *  ⛔ OPEN (fix round FV-05, FV-18): Sreenivas's own written OK on this sentence and on his title
 *  is not on record yet (people-salesforce-evidence.md:178, page-map §7 decision 2). When it
 *  arrives, record the date beside approvedOn. /about still calls him "Chief Technology Officer".
 *  ⛔ This is the ONLY sentence about him on any page: no extra certification names (FV-04).
 *  2026-10-23 redesign v2: "earned his first in 2014" removed (house rule: no years-of-experience
 *  figures); the count "14 active" is Salesforce's public profile API, re-read 2026-10-23
 *  (trailblazer-team-2026-10-23.md CORRECTION). The v2 pages read client/data/sfPeople.ts, which
 *  carries the same sentence plus the badge list; keep the two in step. */
export const SF_PEOPLE: SfPerson[] = [
  {
    name: "Sreenivas Amirisetti",
    title: "Salesforce practice lead",
    statement:
      "Sreenivas Amirisetti leads our Salesforce practice. His 14 active Salesforce certifications run from Platform Administrator to Application Architect.",
    trailhead: "https://www.salesforce.com/trailblazer/samirisetti",
    verifyLabel: "Verify on his Trailblazer profile",
    linkedin: "https://www.linkedin.com/in/samirisetti/",
    approvedOn: "2026-10-23",
  },
];
/** "Holds … to Application Architect" depends on 7 certifications whose maintenance is due
 *  2026-12-04 (people-salesforce-evidence.md). scripts/plates-check.mjs fails the build from this
 *  date until someone re-reads his Trailblazer profile and moves it to the next due date. */
export const SF_PEOPLE_RECHECK_BY = "2026-12-04";

/** ⛔ Owner-gated (spec §7.6). Empty string = no promise is shown. */
export const SF_REPLY_PROMISE: string = "";

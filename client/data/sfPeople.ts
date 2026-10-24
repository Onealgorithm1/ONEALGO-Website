/* The two named people on the Salesforce pages and the official certification logos each holds.
 * Facts: owner-decisions.md (2026-10-23 late + CORRECTION), trailblazer-team-2026-10-23.md (Salesforce's public
 * profile API, read 2026-10-23: Sreenivas 14 active, Swapna 2 active), redesign-v2/badges/badges.md (logo
 * provenance: the exact files Salesforce serves, resized to 160px WebP, design untouched).
 *
 * ⛔ Badges sit with the PERSON, never as company certifications (Salesforce's rule: the holder uses the logo
 * they earned). ⛔ No dates anywhere (owner). ⛔ Swapna: never list App Builder or Platform Developer as current.
 * Review date, code comment only: CPQ Administrator retires 2027-02-01 (badges.md row 12); remove that badge
 * from both people then. SF_PEOPLE_RECHECK_BY in salesforceProof.ts stays the maintenance tripwire. */

export type SfBadge = {
  slug: string;
  /** Current official credential name, exactly as Salesforce prints it (= the image alt). */
  name: string;
  /** Salesforce's credential page, text in the pop-up; never a primary link. */
  credentialPage: string;
};

const BADGE_DIR = "/media/salesforce/badges";
export const badgeSrc = (b: SfBadge) => `${BADGE_DIR}/${b.slug}.webp`;

export const SF_BADGES: Record<string, SfBadge> = {
  "platform-administrator": { slug: "platform-administrator", name: "Salesforce Certified Platform Administrator", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformadministrator" },
  "platform-administrator-ii": { slug: "platform-administrator-ii", name: "Salesforce Certified Platform Administrator II", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformadministrator-ii" },
  "platform-app-builder": { slug: "platform-app-builder", name: "Salesforce Certified Platform App Builder", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformappbuilder" },
  "platform-developer": { slug: "platform-developer", name: "Salesforce Certified Platform Developer", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformdeveloperi" },
  "platform-data-architect": { slug: "platform-data-architect", name: "Salesforce Certified Platform Data Architect", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformdataarchitect" },
  "platform-development-lifecycle-and-deployment-architect": { slug: "platform-development-lifecycle-and-deployment-architect", name: "Salesforce Certified Platform Development Lifecycle and Deployment Architect", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformdevelopmentlifecycledeploymentarchitect" },
  "platform-integration-architect": { slug: "platform-integration-architect", name: "Salesforce Certified Platform Integration Architect", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformintegrationarchitect" },
  "platform-sharing-and-visibility-architect": { slug: "platform-sharing-and-visibility-architect", name: "Salesforce Certified Platform Sharing and Visibility Architect", credentialPage: "https://trailhead.salesforce.com/en/credentials/platformsharingandvisibilityarchitect" },
  "application-architect": { slug: "application-architect", name: "Salesforce Certified Application Architect", credentialPage: "https://trailhead.salesforce.com/en/credentials/applicationarchitect" },
  "agentforce-sales-consultant": { slug: "agentforce-sales-consultant", name: "Salesforce Certified Agentforce Sales Consultant", credentialPage: "https://trailhead.salesforce.com/en/credentials/agfsalesconsultant" },
  "agentforce-service-consultant": { slug: "agentforce-service-consultant", name: "Salesforce Certified Agentforce Service Consultant", credentialPage: "https://trailhead.salesforce.com/en/credentials/agfserviceconsultant" },
  // Retires 2027-02-01 (badges.md row 12): remove from both people on that date.
  "cpq-administrator": { slug: "cpq-administrator", name: "Salesforce Certified CPQ Administrator", credentialPage: "https://trailheadacademy.salesforce.com/certificate/exam-cpq-admin---Sales-Admn-202" },
  "marketing-cloud-engagement-specialist": { slug: "marketing-cloud-engagement-specialist", name: "Salesforce Certified Marketing Cloud Engagement Specialist", credentialPage: "https://trailhead.salesforce.com/en/credentials/marketingcloudengagementspecialist" },
  "omnistudio-consultant": { slug: "omnistudio-consultant", name: "Salesforce Certified Omnistudio Consultant", credentialPage: "https://trailhead.salesforce.com/en/credentials/omnistudioconsultant" },
};

export type SfPerson = {
  slug: string;
  name: string;
  /** Visible title line = Person.jobTitle. */
  title: string;
  pronoun: "he" | "she";
  /** The approved sentence, verbatim. The only prose about the person. */
  statement: string;
  /** Public Trailblazer profile (Salesforce-issued certification list). */
  trailhead: string;
  linkedin?: string;
  /** Active certifications in display order (badges.md order). */
  badges: SfBadge[];
  /** Optional "range held" line for the pop-up. */
  range?: string;
  /** The date a person re-read the profile, as shown. */
  verifiedLabel: string;
};

const b = (slug: string) => SF_BADGES[slug];

export const SREENIVAS: SfPerson = {
  slug: "sreenivas-amirisetti",
  name: "Sreenivas Amirisetti",
  title: "Salesforce practice lead",
  pronoun: "he",
  statement:
    "Sreenivas Amirisetti leads our Salesforce practice. His 14 active Salesforce certifications run from Platform Administrator to Application Architect.",
  trailhead: "https://www.salesforce.com/trailblazer/samirisetti",
  linkedin: "https://www.linkedin.com/in/samirisetti/",
  range: "Platform Administrator to Application Architect",
  verifiedLabel: "23 October 2026",
  badges: [
    b("platform-administrator"), b("platform-administrator-ii"), b("platform-app-builder"), b("platform-developer"),
    b("platform-data-architect"), b("platform-development-lifecycle-and-deployment-architect"), b("platform-integration-architect"),
    b("platform-sharing-and-visibility-architect"), b("application-architect"), b("agentforce-sales-consultant"),
    b("agentforce-service-consultant"), b("cpq-administrator"), b("marketing-cloud-engagement-specialist"), b("omnistudio-consultant"),
  ],
};

export const SWAPNA: SfPerson = {
  slug: "swapna-amirisetti",
  name: "Swapna Amirisetti",
  title: "President & CEO",
  pronoun: "she",
  statement: "Swapna Amirisetti, President & CEO, is a Salesforce Certified Platform Administrator and CPQ Administrator.",
  trailhead: "https://www.salesforce.com/trailblazer/swapnaamirisetti",
  verifiedLabel: "23 October 2026",
  badges: [b("platform-administrator"), b("cpq-administrator")],
};

/** Display order on every page's "Who leads your Salesforce work" block. */
export const SF_PEOPLE_V2: SfPerson[] = [SREENIVAS, SWAPNA];

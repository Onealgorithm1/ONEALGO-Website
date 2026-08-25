export type IconName =
  | "target"
  | "lightbulb"
  | "users"
  | "shield"
  | "checkCircle";

export interface CoreCompetency {
  title: string;
  icon: IconName;
  items: string[];
}

export interface Differentiator {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProjectHighlight {
  title: string;
  items: string[];
}

export interface KeyPerson {
  name: string;
  role: string;
  summary: string;
}

export interface FederalExperienceItem {
  title: string;
  rfq: string;
  role: string;
  partner?: string;
  scope: string;
  submissionDate: string;
  status: string;
}

/** One issued credential. `detail` carries the number and the expiry, because
 *  a certification without either is not checkable. */
export interface Certification {
  name: string;
  detail: string;
}

export interface ComplianceProfile {
  certifications: Certification[];
  bondingCapacity: string;
}

export interface JointVenturePartnerInfo {
  name: string;
  summary: string;
  address: string;
  cage: string;
  uei: string;
  certifications: string;
  services: string[];
  website: string;
}

export const coreCompetencies: CoreCompetency[] = [
  {
    title: "AI & Machine Learning Solutions",
    icon: "lightbulb",
    items: [
      "AI-driven automation and intelligent process optimization",
      "Machine learning model development and deployment",
      "AI-enabled cloud modernization",
    ],
  },
  {
    title: "Cloud Computing & Infrastructure",
    icon: "target",
    items: [
      "Cloud computing and AI-enabled modernization",
      "Data management and advanced analytics",
      "Custom software and systems development",
    ],
  },
  {
    title: "Cybersecurity & Compliance",
    icon: "shield",
    items: [
      "Cybersecurity and secure AI implementation",
      "Risk management, governance, and compliance",
      "Business process optimization",
    ],
  },
  {
    title: "IT Services & Support",
    icon: "users",
    items: [
      "IT training and staff augmentation",
      "Salesforce platform expertise",
      "Program and project management",
    ],
  },
];

/*
 * Differentiators — rewritten 2026-08-12 during the capability-statement audit.
 *
 * The previous six were marketing filler: "Cutting-edge AI and machine learning
 * solutions", "Complete cloud, security, and systems integration from strategy
 * to deployment", and — worst on a page written for contracting officers —
 * "Proven track record delivering secure, compliant, and operationally superior
 * solutions." A track record is a proof claim. This company has five commercial
 * subcontracts and no federal award, so "proven track record" was asserting
 * something the records do not support.
 *
 * Every line below is now a fact with a document behind it. Sources are named
 * in the audit report; the load-bearing ones are the SBA certification letter
 * (14 Apr 2026), the Westfield bonding letter (5 Dec 2025), the executed
 * Zendesk Partner Agreement (28 May 2026) and the AppExchange consulting
 * listing a0N3A00000EV7SwUAL.
 */
export const differentiators: Differentiator[] = [
  {
    title: "SBA-certified EDWOSB and WOSB",
    icon: "users",
    description:
      "Certified by SBA on 14 April 2026, next renewal 2029. Eligible for WOSB Program set-asides and sole-source awards under FAR 19.15.",
  },
  {
    title: "Woman- and minority-owned, and independently certified",
    icon: "checkCircle",
    description:
      "WBENC WBE and WOSB, NMSDC MBE, Virginia SWaM and Nassau County MWBE. Certificate numbers and expiry dates are listed below.",
  },
  {
    title: "Salesforce and Zendesk partner",
    icon: "target",
    description:
      "Listed Salesforce consulting partner on AppExchange, and a Zendesk partner under an agreement signed in May 2026.",
  },
  {
    title: "Bonded and insured",
    icon: "shield",
    description:
      "Bonding prequalification to $500,000 single and aggregate through Westfield Insurance, a Treasury-listed surety. $3M cyber and E&O cover.",
  },
  {
    title: "Senior engineers, not bench staff",
    icon: "lightbulb",
    description:
      "The people who scope the work are the people who build it. Named engineers in the staffing plan, no substitution after award.",
  },
  {
    title: "We tell you what we do not do",
    icon: "checkCircle",
    description:
      "We build to NIST and DFARS requirements as part of delivery, but we are not a standalone cybersecurity provider. We hold no federal prime contract and no CPARS record, and we say so.",
  },
];

/*
 * Corporate contract experience — CORRECTED 2026-08-12.
 *
 * WHAT WAS HERE, AND WHY IT WAS WRONG. This array previously listed three
 * "Commercial Project Highlights":
 *
 *   Photon Infotech, Inc.            $195K
 *   Radius 180 LLC / Republic Services  $315K
 *   BMC Software                     $500K
 *
 * All three were wrong, and two of them were wrong in the direction that
 * matters on a page a contracting officer reads:
 *
 *  - BMC Software has never been a One Algorithm client. It is the prior
 *    employment of members of the team, and it is listed as such in the
 *    company's own capability statement, in `pastPerformanceClients` below,
 *    and on /about. Claiming a $500K contract with it was a past-performance
 *    misrepresentation. (The $500K figure appears to have been borrowed from
 *    the bonding limit, which is the only $500K in the company's records.)
 *  - Republic Services is likewise individual prior employment, and it has no
 *    connection to the radius180 engagement it was bracketed with. The
 *    radius180 contract is real and is worth $120K, not $315K.
 *  - Photon Infotech is real, but the value is $185K, not $195K.
 *
 * The rows below are the corporate contract table from the company's current
 * capability statement (OneAlgorithm_Capability_Statement_2026-07.pdf, which
 * is also the PDF this site serves at /docs/capability-statement.pdf).
 * Independently corroborated in the corporate records by: the executed Photon
 * work orders and fifteen issued invoices (08_Contracts/Active/Photon), the
 * executed radius180 MSA dated 2024-04-26 (08_Contracts/Active/Radius180),
 * and the GSA MAS offer cover letter of 2025-12-23, certified accurate by the
 * CEO, which names T-Mobile via Insight Global, radius180 and Photon as the
 * company's commercial clients.
 *
 * Every one of these is a SUBCONTRACT on a time-and-materials basis, all
 * commercial. Say so on the page — do not let a reader take them for prime
 * awards.
 */
export const projectHighlights: ProjectHighlight[] = [
  {
    title: "Photon Infotech, Inc.",
    items: [
      "End client: Credit One Bank.",
      "Java/Spring Boot, Angular, PostgreSQL, Docker, Jenkins/GitLab CI-CD, AWS ECS/EKS.",
      "6/2024–present · $185K",
    ],
  },
  {
    title: "Insight Global, LLC",
    items: [
      "End client: T-Mobile.",
      "Software engineering support in an enterprise telecom environment.",
      "11/2024–present · $135K",
    ],
  },
  {
    title: "radius180, LLC",
    items: [
      "IT consulting and software engineering.",
      "5/2024–10/2024 · $120K",
    ],
  },
  {
    /* Verified 2026-08-12 against primary records. Executed Vendor Agreement
       (signed 11 Sep / countersigned 19 Oct 2023), purchase order at $82/hr
       countersigned 25 Oct 2023, an ACORD 25 insurance certificate naming
       Sansar Tec as holder, and nine invoices totalling $106,928 over 1,304
       hours. The published ~$106K is right. (Our own GSA past-performance PDF
       says $105,624, which is one invoice short -- the invoice register is the
       better source.) */
    title: "Sansar Tec LLC",
    items: [
      "End client: Willis Towers Watson, via Cognizant.",
      "Enterprise Java, SQL, application support.",
      "10/2023–6/2024 · $106K",
    ],
  },
  {
    /* Corrected 2026-08-12 from the primary records, which were found under
       the CONSULTANT's name rather than the client's -- ".../Manjusha
       Diamondpick MSA Invoice/" -- which is why an earlier search missed them.

       Was "11/2023–6/2024 · $90K". Nine invoices (1A230054 through 1A240085)
       total $104,160 across 1,464 hours at $70/hr, and the executed work order
       DP_23_1132 sets the start at 26 Sep 2023, not November. The $90,120 that
       was published appears only in our own past-performance summaries and is
       supported by no invoice.

       Understating is the same defect as overstating: if a proposal ever cites
       the real figure, the number published here contradicts it. */
    title: "Diamondpick Inc.",
    items: [
      "End client: PepsiCo, via UST Global.",
      "Azure, SQL Server, enterprise application support.",
      "10/2023–6/2024 · $104K",
    ],
  },
];

export const federalExperience: FederalExperienceItem[] = [];

/*
 * Certifications — REWRITTEN 2026-08-12.
 *
 * This used to be a field called `pendingCertifications` in which every value
 * read "Certified", which is a contradiction a reader will notice before they
 * notice anything else on the page. It also carried "SDB / SB – Certified"
 * with a certificate number of 561511, which is not a certificate number: it
 * is the company's Jaggaer supplier number (0000561511), copied across in an
 * earlier capability statement. There is no SDB certificate. SDB is
 * self-certified in SAM.gov reps and certs, and is described that way below.
 *
 * Every other row is an issued certificate held in
 * 06_Compliance/Registrations_and_Certifications. Numbers and expiry dates are
 * transcribed from the certificates themselves. When one of these lapses, this
 * array and LAST_UPDATED in client/pages/Capabilities.tsx both change.
 */
export const complianceProfile: ComplianceProfile = {
  certifications: [
    { name: "EDWOSB", detail: "SBA certified 14 Apr 2026 · renewal due 14 Apr 2029" },
    { name: "WOSB", detail: "SBA certified 14 Apr 2026 · renewal due 14 Apr 2029" },
    { name: "WBENC WBE", detail: "WBE2600434 · expires 5 Mar 2027" },
    { name: "WBENC WOSB", detail: "WOSB260411 · renewal 5 Mar 2027" },
    { name: "NMSDC MBE", detail: "PT100000051 · expires 31 Jan 2027" },
    { name: "Virginia SWaM", detail: "843564 · valid through 30 Apr 2031" },
    { name: "Nassau County, NY MWBE", detail: "OMA-26-086 · valid through 10 Jun 2029" },
    {
      name: "Small Disadvantaged Business",
      detail: "self-certified in SAM.gov — not an SBA-issued certification",
    },
  ],
  // Westfield Insurance Company bonding reference letter, 5 December 2025:
  // A.M. Best "A" (Excellent), Financial Size Category XV, Treasury-listed
  // surety; "projects up to a $500,000 single/aggregate bond limit". The
  // letter is a prequalification, not a commitment, and says so — hence the
  // wording here.
  bondingCapacity:
    "$500,000 single/aggregate (Westfield Insurance Company prequalification, 5 December 2025)",
};

/*
 * Partnerships. Two of these are documents, not aspirations:
 *  - Salesforce: consulting partner listing a0N3A00000EV7SwUAL on AppExchange.
 *  - Zendesk: Partner Agreement executed via DocuSign on 28 May 2026
 *    (08_Contracts/Partners_and_Subcontractors/Zendesk).
 * The Microsoft and ServiceNow "partner" logos that appeared in a 2026-04
 * capability statement are NOT repeated here: no partner agreement with
 * either company exists in the corporate records.
 */
export const strategicPartnerships: string[] = [
  "One Algorithm is a listed Salesforce consulting partner on AppExchange and a Zendesk partner under an agreement signed in May 2026. We also team with Irongrove LLC, a veteran-owned firm in Houston, on federal pursuits.",
];

/* Contact details deliberately omitted. Everything in this file is compiled
   into the public JavaScript bundle, so a direct line published here is
   published to the world whether or not a component renders it. Route enquiries
   through the contact page. */
export const keyPersonnel: KeyPerson[] = [
  {
    name: "Louis Rubino",
    /* Kept in step with client/components/TeamSection.tsx deliberately: /about
       and /capabilities gave the same person DIFFERENT titles, which is a live
       credibility problem. If one changes, change both. */
    role: "Director of Operations and Program Manager",
    summary:
      "Operations, contracts and invoicing, federal registrations and certifications, internal systems, and marketing.",
  },
  {
    name: "Sreenivas Amirisetti",
    role: "Chief Technology Officer",
    summary: "Technical delivery, IT modernization, and program leadership.",
  },
  {
    name: "Swapna Amirisetti",
    role: "CEO / President",
    summary: "Strategic growth, federal partnerships, and executive oversight.",
  },
];

/*
 * Irongrove LLC — CORRECTED 2026-08-12.
 *
 * The agreement is real: a Joint Venture Agreement executed via DocuSign,
 * signed by Wence Gutierrez (Irongrove) on 19 Dec 2025 and Swapna Amirisetti
 * (One Algorithm) on 5 Jan 2026, initial term three years. It is held at
 * 08_Contracts/Partners_and_Subcontractors/Irongrove_LLC.
 *
 * What it is NOT is an SBA-compliant joint venture, and this file used to say
 * it was ("Active SBA-compliant JV partner"). The agreement's own sections 13
 * and 17.1 state that "Nothing in this Agreement creates a partnership, joint
 * venture entity, agency, or employment relationship between the Parties" and
 * that "The Parties are separate legal entities." There is no JV entity, no JV
 * UEI or CAGE, and none of the 13 CFR 125.8 machinery — no designated JV
 * manager, no JV bank account, and a default 50/50 profit split where SBA
 * requires at least 51% to the small-business partner. It is a teaming
 * agreement that calls itself a joint venture. Describing it to a contracting
 * officer as SBA-compliant would be a responsibility-determination problem.
 *
 * NOTE FOR WHOEVER OWNS client/pages/industries/Government.tsx: that page
 * hard-codes the words "SBA-compliant joint venture" around this object rather
 * than reading them from here, so correcting this file does not correct that
 * sentence.
 */
export const jointVenturePartner: JointVenturePartnerInfo = {
  name: "Irongrove LLC",
  summary:
    "Teaming partner for federal pursuits under a joint venture agreement executed 5 January 2026, initial term three years. Prime and subcontractor roles are assigned per opportunity. This is a teaming arrangement between two separate companies, not an SBA-compliant joint venture entity.",
  address: "The HRNCIR Building, 4901 Yale St., Houston, TX 77018",
  cage: "CAGE: 9DAA8",
  uei: "UEI: P4WZBUUZ9K27",
  // Irongrove describes itself as veteran-owned. Its SBA VetCert status could
  // not be confirmed from the corporate records or from a public registry, so
  // this does not claim a certification. TKTK: replace with the certification
  // number and expiry from Irongrove's SBA VetCert profile once supplied.
  certifications: "Veteran-owned (per Irongrove; SBA VetCert status unconfirmed)",
  services: [
    "Federal IT modernization",
    "Cybersecurity and compliance",
    "AI/ML integration",
    "Infrastructure support",
  ],
  website: "https://www.irongrove.com",
};

export interface PastPerformanceClient {
  name: string;
}

/**
 * Organizations where members of the leadership team worked EARLIER IN THEIR
 * CAREERS. These are individual prior employment, NOT engagements held by
 * One Algorithm LLC, and must never be presented as corporate past performance
 * or as clients. The rendering in CapabilitiesMainContent.tsx is labelled
 * "Key Personnel Experience" for exactly this reason - do not relabel it.
 *
 * As of 2026-08-12 the company has not been awarded a government contract, and
 * `federalExperience` above is correspondingly empty. Its commercial contracts
 * are in `projectHighlights`.
 *
 * TRIMMED 2026-08-12. Two problems were fixed:
 *
 *  1. Credit One, T-Mobile, Willis Towers Watson and PepsiCo were listed here
 *     as prior employment, but they are the END CLIENTS of One Algorithm's own
 *     subcontracts and are named as such in `projectHighlights`. Carrying them
 *     in both places double-counted the same relationship under two different
 *     meanings — the exact defect that made BMC Software appear twice.
 *  2. "FREEDOM Federal Bonding Agency", "New York State", "Office of Mental
 *     Health" and "MK" were dropped. They came from a superseded 2026-04
 *     capability statement, where two of them were one entry ("MK / Cigna
 *     Healthcare"), no record supports them individually, and the company's
 *     current capability statement does not list them.
 *
 * The nine below match the individual-experience block of
 * OneAlgorithm_Capability_Statement_2026-07.pdf.
 */
export const pastPerformanceClients: PastPerformanceClient[] = [
  { name: "BMC Software" },
  { name: "American Express" },
  { name: "Cigna" },
  { name: "BlueCross BlueShield" },
  { name: "Emerson" },
  { name: "Republic Services" },
  { name: "OneShield" },
  { name: "Shimmick" },
  { name: "Stony Brook Foundation" },
];

/*
 * Procurement registrations. Three entries were removed on 2026-08-12:
 *
 *  - "Florida — F-----9444" was a redacted placeholder, not a reference
 *    number, and had been published in that state for months.
 *  - "Euna — Nation Wide" is not a reference number either.
 * "GSA eBuy" no longer reads "Pending". eBuy requires a Multiple Award
 * Schedule contract, and the company has none: its MAS offer under
 * solicitation 47QSMD20R0001 (SIN 54151S) was rejected by the contracting
 * officer on 20 February 2026 for missing pricing, past performance
 * questionnaires and financial statements, and cannot be resubmitted until
 * after MAS Refresh 31. "Pending" read as an application in flight; it was
 * not. The value states the position instead. It is kept as a row rather than
 * deleted because client/pages/industries/Government.tsx also renders it, and
 * one true sentence in one place beats the same claim drifting in two.
 *
 * The remaining numbers match the company's current capability statement.
 * TKTK: the same statement also carries eVP (NC) 4051139 and NYS Vendor ID
 * 1100357056, which are not listed here. Add them once the portal records are
 * confirmed.
 */
export const procurementRegistrations = {
  federal: {
    sam_gov: "W8DYK38MEKP3",
    fedConnect: "Active",
    gsa_ebuy: "No Schedule awarded",
  },
  stateAndLocal: [
    { label: "COSTARS (PA)", value: "#4400033848" },
    { label: "eVA (VA)", value: "SUP347430" },
    { label: "OhioBuys", value: "ID 00341565-0" },
    { label: "BidNet", value: "3063593" },
    { label: "Cal eProcure", value: "BID126344" },
    { label: "COMMBUYS", value: "ID 00085083" },
    { label: "Jaggaer", value: "0000561511" },
  ],
};

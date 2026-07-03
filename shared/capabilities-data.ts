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
  email?: string;
  phone?: string;
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

export interface ComplianceProfile {
  pendingCertifications: string[];
  federalCompliance: string[];
  qualityAndSecurity: string[];
  bondingCapacity: string;
  samRegistration: string;
}

export interface MentorProtegeHighlight {
  title: string;
  description: string;
}

export interface JointVenturePartnerInfo {
  name: string;
  summary: string;
  address: string;
  cage: string;
  uei: string;
  samStatus: string;
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

export const differentiators: Differentiator[] = [
  {
    title: "Woman- & Minority-Owned (WOSB/MBE)",
    icon: "users",
    description:
      "EDWOSB and MBE certified, providing diverse leadership and perspective.",
  },
  {
    title: "Small Business Agility with Large-Integrator Capability",
    icon: "target",
    description:
      "Combines small business flexibility with enterprise-grade delivery and scale.",
  },
  {
    title: "Applied AI Expertise",
    icon: "lightbulb",
    description:
      "Cutting-edge AI and machine learning solutions integrated into federal modernization.",
  },
  {
    title: "End-to-End Modernization Capability",
    icon: "shield",
    description:
      "Complete cloud, security, and systems integration from strategy to deployment.",
  },
  {
    title: "Reliable Operations & Mission-Critical Support",
    icon: "checkCircle",
    description:
      "Proven track record delivering secure, compliant, and operationally superior solutions.",
  },
  {
    title: "Cost Advantage Without Quality Trade-Offs",
    icon: "target",
    description:
      "Cost-effective solutions without compromising security, compliance, or performance.",
  },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    title: "Photon Infotech, Inc.",
    items: ["System modernization & software development services ($195K)."],
  },
  {
    title: "Radius 180 LLC / Republic Services",
    items: [
      "Automation & modernization of operational management systems ($315K).",
    ],
  },
  {
    title: "BMC Software",
    items: [
      "Enterprise application integration & workflow automation ($500K).",
    ],
  },
];

export const federalExperience: FederalExperienceItem[] = [];

export const complianceProfile: ComplianceProfile = {
  pendingCertifications: [
    "EDWOSB – Certified",
    "WOSB – Certified",
    "WBENC – Certified",
    "NMSDC MBE – Certified",
    "VA SWaM – Certified",
    "SDB / SB – Certified",
    "Nassau Co. LI MWBE – Certified",
  ],
  federalCompliance: [
    "SAM.gov UEI: W8DYK38MEKP3",
    "DUNS: 117847561",
    "CAGE: 14G18",
  ],
  qualityAndSecurity: [],
  bondingCapacity: "$500,000 (single / aggregate)",
  samRegistration: "Active – UEI: W8DYK38MEKP3 | CAGE: 14G18 | DUNS: 117847561",
};

export const strategicPartnerships: string[] = [
  "One Algorithm partners with leading technology providers and pursues strategic joint ventures and teaming partnerships — combining small-business agility with enterprise-grade capability to serve federal, state, and commercial clients nationwide.",
];

export const keyPersonnel: KeyPerson[] = [
  {
    name: "Louis Rubino",
    role: "Director, Compliance & Contract Administration",
    summary: "Federal compliance, proposal operations, and partner management.",
    email: "lrubino@onealgorithm.com",
    phone: "(516) 451-5139",
  },
  {
    name: "Sreenivas Amirisetti",
    role: "Chief Technology Officer",
    summary: "Technical delivery, IT modernization, and program leadership.",
    email: "sreeni@onealgorithm.com",
    phone: "(832) 434-9891",
  },
  {
    name: "Swapna Amirisetti",
    role: "CEO / President",
    summary: "Strategic growth, federal partnerships, and executive oversight.",
    email: "swapna@onealgorithm.com",
    phone: "(832) 633-7051",
  },
];

export const mentorProtegeHighlights: MentorProtegeHighlight[] = [
  {
    title: "Mentor-Protégé & Partnership Readiness",
    description:
      "One Algorithm actively seeks mentor-protégé and strategic teaming partnerships to scale federal modernization, cybersecurity, and AI-driven transformation initiatives.",
  },
];

export const jointVenturePartner: JointVenturePartnerInfo = {
  name: "Irongrove LLC (Veteran-Owned)",
  summary:
    "Active SBA-compliant JV partner providing veteran-owned expertise for federal IT modernization, cybersecurity, AI/ML integration, and infrastructure support.",
  address: "4901 Yale St., Houston, TX 77018",
  cage: "CAGE: 9DAA8",
  uei: "UEI: P4WZBUUZ9K27",
  samStatus: "SAM Registration: Active",
  certifications: "SBA: Veteran-Owned Small Business (VOSB)",
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
  logoUrl?: string;
}

export const pastPerformanceClients: PastPerformanceClient[] = [
  {
    name: "BMC Software",
  },
  {
    name: "FREEDOM Federal Bonding Agency",
  },
  {
    name: "Republic Services",
  },
  {
    name: "New York State",
  },
  {
    name: "Office of Mental Health",
  },
  {
    name: "MK",
  },
  {
    name: "Cigna",
  },
  {
    name: "Emerson",
  },
  {
    name: "BlueCross BlueShield",
  },
  {
    name: "Willis Towers Watson",
  },
  {
    name: "OneShield",
  },
  {
    name: "Shimmick",
  },
  {
    name: "American Express",
  },
  {
    name: "T-Mobile",
  },
  {
    name: "Pepsico",
  },
  {
    name: "Credit One",
  },
  {
    name: "Stony Brook Foundation",
  },
];

export const registrations = {
  edwosb: "Certified",
  wbenc: {
    wbe: "WBE2600434",
    wosb: "WOSB260411",
  },
  sdb_sb: "Cert # 561511",
  nmsdc_mbe: "PT100000051",
  va_swam: "Certified",
};

export const procurementRegistrations = {
  federal: {
    sam_gov: "W8DYK38MEKP3",
    fedConnect: "Active",
    gsa_ebuy: "Pending",
  },
  stateAndLocal: [
    { label: "COSTARS (PA)", value: "#4400033848" },
    { label: "EVA (VA)", value: "SUP347430" },
    { label: "OhioBuys", value: "ID 00341565-0" },
    { label: "Bid Net", value: "3063593" },
    { label: "Cal eProcure", value: "BID126344" },
    { label: "Florida", value: "F-----9444" },
    { label: "commbuys", value: "ID 00085083" },
    { label: "Jaggaer", value: "0000561511" },
    { label: "Euna", value: "Nation Wide" },
  ],
};

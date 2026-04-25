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
  {
    title: "Gillespie Contracting, Inc.",
    items: [
      "Roofing & infrastructure modernization (Construction Division, $3M bonded).",
    ],
  },
];

export const federalExperience: FederalExperienceItem[] = [];

export const complianceProfile: ComplianceProfile = {
  pendingCertifications: [
    "EDWOSB (Economically Disadvantaged Women-Owned Small Business) – Certified",
    "WBENC WBE – WBE2600434",
    "WBENC WOSB – WOSB260411",
  ],
  federalCompliance: [
    "SAM.gov UEI: W8DYK38MEKP3",
    "DUNS: 117847561",
    "CAGE: 14G18",
  ],
  qualityAndSecurity: [
    "SDB (Small Disadvantaged Business) & SB – Cert # 561511",
    "NMSDC MBE (Minority Business Enterprise) – PT100000051",
    "VA SWaM: Pending",
  ],
  bondingCapacity: "$500,000 (single / aggregate)",
  samRegistration: "Active – UEI: W8DYK38MEKP3 | CAGE: 14G18 | DUNS: 117847561",
};

export const strategicPartnerships: string[] = [
  "One Algorithm partners with leading technology providers including Microsoft to deliver comprehensive modernization and AI-enabled solutions.",
  "Our strategic partnership approach combines small business agility with enterprise-grade capability to serve federal agencies, state governments, and commercial clients nationwide.",
  "We actively pursue multiple strategic joint ventures and teaming partnerships to expand our federal modernization, cybersecurity, and AI-driven transformation initiatives.",
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
  {
    title: "Joint Venture Performance",
    description:
      "SBA-compliant JV with Irongrove LLC ensures each firm performs 30%+ of total contract work per SBA 13 CFR 125.8, delivering cleared personnel and surge capacity.",
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
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fa6c4f9b8f1d34d6e9c1b5e3f2a7d4c8b",
  },
  {
    name: "FREEDOM Federal Bonding Agency",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fb7d5g0c9g2e45e7f0d2c6f4g3b8e5d9c",
  },
  {
    name: "Republic Services",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fc8e6h1d0h3f56f8g1e3d7g5h4c9f6e0d",
  },
  {
    name: "New York State",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fd9f7i2e1i4g67g9h2f4e8h6i5d0g7f1e",
  },
  {
    name: "Office of Mental Health",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fe0g8j3f2j5h78h0i3g5f9i7j6e1h8g2f",
  },
  {
    name: "MK",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Ff1h9k4g3k6i89i1j4h6g0j8k7f2i9h3g",
  },
  {
    name: "Cigna",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fg2i0l5h4l7j90j2k5i7h1k9l8g3j0i4h",
  },
  {
    name: "Emerson",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fh3j1m6i5m8k01k3l6j8i2l0m9h4k1j5i",
  },
  {
    name: "BlueCross BlueShield",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fi4k2n7j6n9l12l4m7k9j3m1n0i5l2k6j",
  },
  {
    name: "Willis Towers Watson",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fj5l3o8k7o0m23m5n8l0k4n2o1j6m3l7k",
  },
  {
    name: "OneShield",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fk6m4p9l8p1n34n6o9m1l5o3p2k7n4m8l",
  },
  {
    name: "Shimmick",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fl7n5q0m9q2o45o7p0n2m6p4q3l8o5n9m",
  },
  {
    name: "American Express",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fm8o6r1n0r3p56p8q1o3n7q5r4m9p6o0n",
  },
  {
    name: "T-Mobile",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fn9p7s2o1s4q67q9r2p4o8r6s5n0q7p1o",
  },
  {
    name: "Pepsico",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fo0q8t3p2t5r78r0s3q5p9s7t6o1r8q2p",
  },
  {
    name: "Credit One",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fp1r9u4q3u6s89s1t4r6q0t8u7p2s9r3q",
  },
  {
    name: "Stony Brook Foundation",
    logoUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fq2s0v5r4v7t90t2u5s7r1u9v8q3t0s4r",
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
  va_swam: "Pending",
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

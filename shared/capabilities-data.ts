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

export const coreCompetencies: CoreCompetency[] = [
  {
    title: "Technology & Digital Engineering",
    icon: "target",
    items: [
      "Cloud architecture and modernization (AWS, Azure, GovCloud)",
      "Secure software development and API integration",
      "Data engineering, analytics, and AI/ML automation",
      "DevSecOps pipelines with continuous compliance monitoring",
      "Cybersecurity and information assurance (DFARS 252.204-7012, NIST 800-171, SOC 2)",
    ],
  },
  {
    title: "Digital Transformation & Enterprise Automation",
    icon: "lightbulb",
    items: [
      "Workflow optimization and business process automation",
      "CRM and ERP integration (Salesforce, MS Dynamics, Zoho, HubSpot)",
      "Agile program management and technology roadmapping",
      "Enterprise analytics and dashboard development",
    ],
  },
  {
    title: "Small Business & Strategic Consulting",
    icon: "users",
    items: [
      "Business operations strategy, planning, and growth enablement",
      "Federal capture and proposal management support",
      "Risk assessment, cost optimization, and financial planning",
    ],
  },
];

export const differentiators: Differentiator[] = [
  {
    title: "Secure DevSecOps Framework",
    icon: "shield",
    description:
      "Integrated CI/CD pipelines with vulnerability management and compliance validation.",
  },
  {
    title: "Federal Compliance Expertise",
    icon: "checkCircle",
    description: "Proven alignment with NIST, DFARS, and ISO standards.",
  },
  {
    title: "Scalable Delivery",
    icon: "target",
    description: "Small business agility with enterprise-grade processes.",
  },
  {
    title: "Experienced Leadership",
    icon: "users",
    description:
      "Executives with 20+ years of experience in technology, operations, and program management.",
  },
  {
    title: "Customer-Focused Execution",
    icon: "lightbulb",
    description: "Commitment to measurable results and mission continuity.",
  },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    title: "Technology Projects",
    items: [
      "Developed enterprise SaaS platforms, CRM systems, and workflow automation tools for private clients.",
      "Built secure compliance and monitoring solutions to support operational efficiency.",
    ],
  },
  {
    title: "Small Business Consulting Projects",
    items: [
      "Provided strategic planning, IT project management, and business analyst services for small businesses.",
      "Developed marketing strategies, CRM systems, and operational process improvements to scale client operations.",
    ],
  },
];

export const keyPersonnel: KeyPerson[] = [
  {
    name: "Swapna Amirisetti",
    role: "CEO / President",
    summary: "Leads strategy, operations, and business growth.",
  },
  {
    name: "Sreenivas Amirisetti",
    role: "Secretary / CTO",
    summary:
      "Oversees IT project management, business analysis, and technology strategy.",
  },
  {
    name: "Louis Rubino",
    role: "Director of Compliance & Contract Administration",
    summary:
      "Manages federal compliance, proposal operations, and partner relationships.",
  },
];

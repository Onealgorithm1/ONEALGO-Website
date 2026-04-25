// Shared company metadata for both client and server consumption
export interface CompanyConfig {
  name: string;
  legalName: string;
  url: string;
  logo: string;
  description: string;
  certifications?: string[];
  qualityStandards?: string;
  address: {
    street: string;
    streetUnit: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phonePrimary: string;
    emailPrimary: string;
    phoneAlt?: string;
    emailAlt?: string;
  };
  identifiers: {
    cage: string;
    uei: string;
    duns: string;
  };
  sbaUrl: string;
  codes: {
    naics: string[];
    psc: string[];
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    googleBusiness: string;
  };
  areaServed: string[];
  foundingDate: string;
}

export const siteConfig: CompanyConfig = {
  name: "OneAlgorithm",
  legalName: "ONE ALGORITHM LLC",
  url: "https://www.onealgorithm.com",
  logo: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fdc081d752c66412d9b254d3932210f12?format=webp&width=800",
  description:
    "Founded in 2020, One Algorithm LLC is a woman- and minority-owned small business providing secure cloud modernization, Salesforce platform engineering, AI-driven automation, cybersecurity compliance, and accessibility solutions for federal and state agencies. Headquartered in Malvern, Pennsylvania, One Algorithm delivers agile, compliant, and cost-effective IT services.",
  certifications: [
    "NIST SP 800-171 Compliant",
    "DFARS 252.204-7012 (Safeguarding Covered Defense Information)",
    "ISO/IEC 27001 Information Security Management",
    "SOC 2 Type II Security & Availability Controls",
    "HIPAA Security Rule Compliance",
    "ISO 9001–Compliant Quality Management System",
  ],
  qualityStandards: "ISO 9001–Compliant Quality Management System",
  address: {
    street: "625 Swedesford Rd",
    streetUnit: "Unit B",
    city: "Malvern",
    region: "PA",
    postalCode: "19355",
    country: "US",
  },
  contact: {
    phonePrimary: "(610) 890-9711",
    emailPrimary: "service@onealgorithm.com",
    phoneAlt: "(832) 434-9891",
    emailAlt: "samirisetti@onealgorithm.com",
  },
  identifiers: {
    cage: "14G18",
    uei: "W8DYK38MEKP3",
    duns: "117847561",
  },
  sbaUrl:
    "https://search.certifications.sba.gov/profile/W8DYK38MEKP3/14G18?page=1",
  codes: {
    naics: [
      "541511",
      "541512",
      "541519",
      "541611",
      "541613",
      "541618",
      "519210",
      "611430",
      "561311",
      "561320",
      "513210",
      "518210",
      "519290",
    ],
    psc: ["DA10", "7A20", "7E20", "U099", "R408", "7A21", "H270"],
  },
  geo: {
    latitude: 40.042445799999996,
    longitude: -75.5771397,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/onealgorithmllc",
    facebook: "https://www.facebook.com/share/1694s7Yy3p/",
    instagram: "https://www.instagram.com/onealgorithm",
    youtube: "https://youtube.com/@onealgorithm",
    tiktok: "https://www.tiktok.com/@one.algorithm",
    googleBusiness: "https://maps.app.goo.gl/kVEeTz9dCyB64CGk6",
  },
  areaServed: ["United States", "Canada", "India", "United Arab Emirates"],
  foundingDate: "2020",
};

export function getFullAddress(includeUnit = true): string {
  const { street, streetUnit, city, region, postalCode } = siteConfig.address;
  const addressParts = [street];
  if (includeUnit && streetUnit) {
    addressParts.push(streetUnit);
  }
  addressParts.push(`${city}, ${region} ${postalCode}`);
  return addressParts.join(" | ");
}

export function getPostalAddress(): string {
  const { street, streetUnit, city, region, postalCode } = siteConfig.address;
  return `${street}${streetUnit ? " " + streetUnit : ""}\n${city}, ${region} ${postalCode}`;
}

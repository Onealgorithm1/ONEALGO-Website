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
  logo: "https://onealgorithm.com/media/oa-logo.webp",
  description:
    "Founded in 2020, One Algorithm LLC is a woman- and minority-owned small business providing secure cloud modernization, Salesforce platform engineering, AI-driven automation, cybersecurity compliance, and accessibility solutions for commercial clients, and is certified and registered to serve federal, state and local government buyers. Headquartered in Malvern, Pennsylvania, One Algorithm delivers agile, compliant, and cost-effective IT services.",
  certifications: [],
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
    phonePrimary: "1 (610) 890-9711",
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
  /*
   * NAICS and PSC — CORRECTED 2026-08-12 to match the SAM.gov entity record
   * for UEI W8DYK38MEKP3 / CAGE 14G18 (registration activated 21 Apr 2026,
   * expires 17 Apr 2027).
   *
   * The page tells a contracting officer these are "published" codes, so they
   * have to be the ones actually on the registration. Five NAICS were listed
   * here that are not on the SAM record — 541613, 519210, 611430, 561311 and
   * 561320 — and 541715, which is on it, was missing. Two PSCs were listed
   * that are not on the record either: U099 (Education/Training — Other) and
   * H270 (Quality control — ADP equipment).
   *
   * Primary NAICS is 541511, Custom Computer Programming Services, which is
   * what CapabilitiesMainContent labels naics[0] as. Keep 541511 first.
   */
  codes: {
    naics: [
      "541511",
      "541512",
      "541519",
      "541611",
      "541618",
      "541715",
      "513210",
      "518210",
      "519290",
    ],
    psc: ["7A20", "7A21", "7E20", "DA10", "R408"],
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

// Shared company metadata for both client and server consumption
export interface CompanyConfig {
  name: string;
  // Exact name on the Google Business Profile. Structured data must match it.
  gbpName: string;
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
    /** E-Verify Company ID, four to seven digits. */
    everify: string;
  };
  /** ISO date the E-Verify Memorandum of Understanding was signed. */
  everifyEnrolledDate: string;
  sbaUrl: string;
  /** Public E-Verify participating-employer search. There is no per-employer
   *  permalink — see the note on `identifiers.everify`. */
  everifyUrl: string;
  /** Public D&B Business Directory profile. Empty until the URL is supplied —
   *  see the note on the value; the link renders only when this is set. */
  dunsUrl: string;
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
    x: string;
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
  gbpName: "OneAlgorithm Consulting",
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
    /*
     * D-U-N-S — CORRECTED 2026-08-26. This read 117847561, which is the number
     * printed on the marketing capability statements, and the website inherited
     * it from there. It is wrong.
     *
     * The company's own D&B D-U-N-S Profile Manager
     * (smallbusiness.dnb.com/duns-manager/company-profile, read while signed in
     * on 2026-08-26) states "D-U-N-S Number: 11-883-5343" for One Algorithm LLC.
     * 118835343 is also the number already given to every third party that keeps
     * its own copy: the DHS E-Verify company profile, the Customers Bank ACH
     * enrollment, and the SF1449 price volumes filed on CRIMS RFQ030ADV26Q0024
     * and N0024426QS006. 117847561 appears only in documents this company wrote
     * about itself.
     *
     * ⛔ Correcting the website does not correct the federal responses already
     * filed with the wrong number, nor the capability statements in SharePoint
     * (10_Strategy_and_Planning/01_Marketing/Capability_Statements), which are
     * hand-made and still carry it. The PDF this repo serves at
     * public/docs/capability-statement.pdf is NOT one of them — it prints no
     * D-U-N-S at all, which scripts/identifiers-check.mjs now asserts.
     */
    duns: "118835343",
    /*
     * E-Verify Company ID. Source: the company's own account profile at
     * everify.uscis.gov/account/company/profile, exported 13 May 2026 and held
     * at 06_Compliance/Employment_and_HR/E-Verify. Enrolled 4 Feb 2024, one
     * hiring site, configured to verify its own employees.
     *
     * ⛔ There is no public link that resolves this ID. The E-Verify employer
     * search is a Tableau dashboard with no per-employer permalink, and it does
     * not publish company IDs at all — it is searched by NAME. So the number is
     * shown as a fact a buyer can quote back to DHS, and `everifyUrl` points at
     * the tool where the name can be checked, the same way the Virginia SWaM
     * directory is handled in the footer.
     */
    everify: "2375403",
  },
  everifyEnrolledDate: "2024-02-04",
  sbaUrl:
    "https://search.certifications.sba.gov/profile/W8DYK38MEKP3/14G18?page=1",
  /*
   * The DHS Tableau dashboard itself, rather than the e-verify.gov page that
   * embeds it — one click closer to the data, and it is the same workbook (the
   * wrapper renders an identical viz, down to the 70,555 record count).
   * Louis supplied this URL on 2026-08-26. If the host ever moves, the stable
   * fallback is https://www.e-verify.gov/e-verify-employer-search.
   *
   * ⛔ It CANNOT be deep-linked to one employer. Tableau filter parameters on
   * the query string are ignored by this workbook — `?Business Name=One
   * Algorithm` was tested on 2026-08-26 and left the field empty. The visitor
   * has to drive the two filters, which is why the page spells out how.
   *
   * ⛔ And the date filter is not optional advice: it opens on "This year", and
   * "Last 30 years" returns NOTHING AT ALL (the query appears to give up on that
   * range — the table goes blank even with no name typed). "Last 3 years" is
   * what actually works and it covers the 2024 enrolment.
   */
  everifyUrl:
    "https://bigdataanalyticspub-sb.uscis.dhs.gov/views/E-VerifyEmployerSearch_17259895596010/Dashboard",
  /*
   * The public D&B Business Directory profile. Supplied by Louis 2026-08-26 and
   * fetched to confirm it is the right company before publishing: Malvern PA,
   * 625 Swedesford Rd Ste B, key principal Swapna Amirisetti, custom computer
   * programming services, marked "Claimed" and "Added By One Algorithm LLC".
   * The URL is only discoverable from inside the signed-in D&B account — it is
   * not indexed by Google under this name.
   *
   * ⛔ The page does NOT display the D-U-N-S number, so it proves the listing,
   * not the digits. The copy on /capabilities says so; do not upgrade it to
   * "verify our D-U-N-S here".
   *
   * ⚠️ The Company Website field on that profile is BLANK — which is why nothing
   * on dnb.com links here. Filling it is worth more than this link is: it points
   * dnb.com AT us, and that is the direction that carries authority.
   */
  dunsUrl:
    "https://www.dnb.com/business-directory/company-profiles.one_algorithm_llc.4761c12e5f980069052b864facbfc6a2.html",
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
    latitude: 40.0424458,
    longitude: -75.5771397,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/onealgorithmllc",
    facebook: "https://www.facebook.com/people/One-Algorithm/61578073689046/",
    x: "https://x.com/onealgorithm",
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

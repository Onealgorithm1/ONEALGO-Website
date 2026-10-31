import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import { SmartSection, GoDeeper, SmartUnit, type SfFaqItem } from "../../components/sf";
import { IndBody, type IndUnit } from "../../components/v2/industries-Body";
import { siteConfig } from "../../../shared/companyProfile";
import { procurementRegistrations, complianceProfile, jointVenturePartner } from "../../../shared/capabilities-data";

/* Government. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * ELIGIBILITY IS NOT PAST PERFORMANCE: no award, no clearance, no Microsoft or ServiceNow partner claim.
 * Certifications only as in onealgo-certifications-verified.md: SBA WOSB + EDWOSB certified 2026-04-14 (renews
 * 2029-04-14); SAM active to 2027-04-17. Identifiers/codes still read from shared data so SAM and the site cannot drift.
 * E-Verify is labelled as covering our own employees only (resolved Q3).
 * Facts: SBA goals via CRS IN12018 (industries/facts.json, sba_goals / sba_fy25). The SBA scorecard page itself was
 * not opened, so the pop-up says the figures are quoted by CRS from SBA. */

const PAGE_PATH = "/industries/government";
const TITLE = "Federal Government IT Solutions — WOSB/EDWOSB, SAM Registered";
const DESCRIPTION = "SBA-certified WOSB/EDWOSB, active SAM registration, UEI W8DYK38MEKP3, CAGE 14G18, set-aside eligible. No contract awarded yet, and we say so.";
const L = "sf-link";

const NAICS_TITLES: Record<string, string> = {
  "541511": "Custom Computer Programming Services",
  "541512": "Computer Systems Design Services",
  "541519": "Other Computer Related Services",
  "518210": "Computing Infrastructure Providers",
  "541611": "Administrative Management Consulting",
  "541613": "Marketing Consulting Services",
};
const NAICS_PRIMARY = siteConfig.codes.naics.filter((c) => NAICS_TITLES[c]);
const NAICS_OTHER = siteConfig.codes.naics.filter((c) => !NAICS_TITLES[c]);

const IDENTIFIERS: [string, string][] = [
  ["UEI", siteConfig.identifiers.uei],
  ["CAGE", siteConfig.identifiers.cage],
  ["D-U-N-S", siteConfig.identifiers.duns],
  ["E-Verify (our own employees), Company ID", siteConfig.identifiers.everify],
  ["SAM.gov", "Active"],
  ["Primary NAICS", siteConfig.codes.naics[0]],
  ["Legal name", siteConfig.legalName],
];
const FEDERAL: [string, string][] = [
  ["SAM.gov", procurementRegistrations.federal.sam_gov],
  ["FedConnect", procurementRegistrations.federal.fedConnect],
  ["GSA eBuy", procurementRegistrations.federal.gsa_ebuy],
];

const cell: React.CSSProperties = { textAlign: "left", verticalAlign: "top", padding: "12px 16px 12px 0", borderTop: "1px solid var(--hair-s)" };

const UNITS: IndUnit[] = [
  {
    id: "eligibility", title: "Eligibility you can verify",
    lede: "We are SBA-certified WOSB and EDWOSB with an active SAM registration.",
    lead: "A certification makes a firm eligible for set-aside work; it is not a contract award, and we do not present it as one.",
    points: ["SBA WOSB and EDWOSB, certified 14 April 2026", "SAM.gov active until 17 April 2027", "No federal contract awarded and no clearance held"],
    deepLabel: "the registry record behind each line",
    deep: (<>
      <p className="sf-rule">The SBA certification runs 14 April 2026 to 14 April 2029. Every identifier below is held in a registry outside this company, so market research takes a minute rather than an email.</p>
      <p>The full statement, with the SBA and state records, is on our <Link className={L} to="/about">about page</Link> and the <Link className={L} to="/capabilities">capability statement</Link>.</p>
    </>),
  },
  {
    id: "setaside", title: "Why WOSB set-asides matter",
    lede: "Agencies fell short of the 5 percent women-owned goal in fiscal 2025.",
    lead: "Women-owned small businesses won 4.52 percent of prime awards against a 5 percent statutory goal.",
    points: ["Small business goal 23%, actual 27.58%", "WOSB goal 5%, actual 4.52%", "Figures from CRS quoting SBA"],
    deepLabel: "the goals and the fiscal 2025 results",
    deep: (<>
      <p className="sf-rule">A contracting officer with a gap to close needs registered, eligible firms to bid. That is the reason to check our record before a solicitation drops.</p>
      <p>See the figures in the table below, with their source.</p>
    </>),
  },
  {
    id: "offer", title: "What we are offering to do",
    lede: "Salesforce, cloud modernization, data work and technical staffing, described as capabilities.",
    lead: "None of this is a separate government practice, and we claim no delivery for agencies.",
    points: ["Salesforce for public sector, as a Select Salesforce Consulting Partner", "IT modernization, in stages", "Data work and named technical staff"],
    deepLabel: "the four capabilities in detail",
    deep: (<>
      <p className="sf-rule">Licensing, permitting, grants and case management are Salesforce configuration problems before they are anything else. Cloud moves happen in stages, without a cutover weekend nobody can survive.</p>
      <p><span className="sf-lead-in">What we do:</span> Data pipelines and reporting where there is recorded history to support them; named practitioners embedded in a program team on contract or project terms.</p>
      <p>We make no claim about cleared staff: a clearance is normally sponsored by an awarded contract, and we have not held one.</p>
      <div className="sf-links">
        <Link className={L} to="/services/salesforce">Salesforce consulting</Link>
        <Link className={L} to="/services/it-consulting">IT consulting</Link>
        <Link className={L} to="/services/staff-augmentation">Staff augmentation</Link>
      </div>
    </>),
  },
  {
    id: "teaming", title: "Teaming and subcontracting",
    lede: "If you are a prime looking for a small-business partner, this is the part for you.",
    lead: "We would rather talk before a solicitation drops than three days before it closes.",
    points: [`Teaming agreement with ${jointVenturePartner.name}`, `Bonding capacity ${complianceProfile.bondingCapacity}`, "Open to mentor-protégé and subcontract roles"],
    deepLabel: "the teaming agreement",
    deep: (<>
      <p className="sf-rule">{jointVenturePartner.name} is a veteran-owned small business ({jointVenturePartner.cage}, {jointVenturePartner.uei}, SAM registration active). Ours is a teaming agreement, not a joint venture: there is no separate JV entity.</p>
      <div className="sf-links"><Link className={L} to="/capabilities">Capability statement</Link></div>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Can you act as a prime contractor?", a: "We are registered in SAM and eligible to bid as a prime on set-aside work. We have not yet been awarded a government contract, and we say so." },
  { q: "What does WOSB and EDWOSB certification mean?", a: "The SBA certified us as a women-owned small business and an economically disadvantaged women-owned small business on 14 April 2026. It makes us eligible for set-aside work; it is not an award." },
  { q: "What is a WOSB set-aside?", a: "A contract limited to certified women-owned small businesses. The statutory goal is 5 percent of prime dollars, and fiscal 2025 reached 4.52 percent." },
  { q: "What qualifies as a small business for government contracts?", a: "Size is set per NAICS code by the SBA. Check our primary code and size standard in SAM, using the UEI above." },
  { q: "Do you hold a security clearance?", a: "No. We have held no clearance; one is normally sponsored by an awarded contract." },
  { q: "Which procurement vehicles are you on?", a: "SAM.gov and FedConnect, with GSA eBuy pending, plus the Pennsylvania DGS and other state registrations listed on this page." },
  { q: "What do you deliver for government buyers?", a: "Salesforce configuration, IT modernization, data work and technical staffing. We list them as capabilities, not as past agency work." },
  { q: "How can a contracting officer verify you?", a: "Search SAM.gov by UEI W8DYK38MEKP3 or CAGE 14G18, or open the capability statement from the top of this page." },
];

export default function Government() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "WOSB EDWOSB contractor, SAM registered small business, UEI W8DYK38MEKP3, CAGE 14G18, set-aside eligible IT contractor, government IT services, small business teaming partner",
    ogTitle: TITLE,
    ogDescription: "The eligibility record a contracting officer can verify: certifications, identifiers, codes and procurement registrations. No award claimed.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
  });

  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, `https://onealgorithm.com${PAGE_PATH}`, { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            Federal government IT solutions:{" "}
            <span className="text-oa-orange">eligibility you can verify</span>
          </>
        }
        lede="One Algorithm is an SBA-certified WOSB/EDWOSB with an active SAM registration, published NAICS and PSC codes, and registrations on the procurement portals listed below. We have not yet been awarded a government contract, and nothing on this page is written to suggest otherwise."
        panel={{
          title: "Eligibility and registration",
          items: [
            "Set-aside eligible and registered to receive award",
            "SBA-certified WOSB / EDWOSB",
            "SAM.gov registration active",
            `${siteConfig.codes.naics.length} NAICS and ${siteConfig.codes.psc.length} PSC codes published`,
            "PA DGS registered supplier, Virginia SWaM certified",
          ],
          footer: [
            `UEI ${siteConfig.identifiers.uei}`,
            `CAGE ${siteConfig.identifiers.cage}`,
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        // Opens rather than downloads. A contracting officer doing market
        // research wants to read it now, not find it in a downloads folder
        // afterwards; the PDF viewer's own save control handles the rest.
        secondary={{
          label: "Open capability statement",
          href: "/docs/capability-statement.pdf",
        }}
      />
      <IndBody
        crumbs={[{ label: "Government" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        units={UNITS}
        facts={{
          heading: "Federal small business goals",
          lede: "Women-owned firms won 4.52 percent of prime awards in fiscal 2025, against a 5 percent goal.",
          rows: [
            { label: "Small business: statutory goal / FY2025 actual", value: "23% / 27.58%" },
            { label: "Women-owned small business: goal / FY2025 actual", value: "5% / 4.52%" },
            { label: "Service-disabled veteran-owned: goal / actual", value: "5% / 5.01%" },
            { label: "HUBZone: goal / actual", value: "3% / 2.66%" },
          ],
          read: "CRS In Focus IN12018 quoting SBA, read 31 October 2026",
          sources: [{ name: "Congressional Research Service, In Focus IN12018 (30 June 2026), quoting the SBA FY2025 scorecard", what: "Statutory prime contracting goals and FY2025 results. The SBA scorecard page itself was not opened; the figures are as quoted by CRS.", read: "read 31 October 2026", page: "https://www.everycrsreport.com/files/2026-06-30_IN12018_6f51fa7436a86cc7af2612ae5a6aeea0ce180c18.html" }],
        }}
        faqHeading="Government questions buyers ask"
        faqs={FAQS}
        faqTone="paper"
        desk={{
          topicLabel: "Government contracting", need: "government",
          heading: "Doing market research?",
          lede: "The identifiers and codes above are the fast answer. If you have a solicitation or a subcontracting plan to fill, send it over.",
          covers: ["The solicitation number or plan", "Set-aside type and NAICS code", "Period of performance", "Whether you need a prime or a sub"],
        }}
      >
        <SmartSection id="identifiers" tone="surface" grid heading={{ id: "h-identifiers", title: "Identifiers a buyer can look up", lede: `${IDENTIFIERS.length} fields, each held in a registry outside this company.` }}>
          <dl className="sf-c12" style={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", background: "var(--hair-s)", border: "1px solid var(--hair-s)" }}>
            {IDENTIFIERS.map(([label, value]) => (
              <div key={label} style={{ background: "var(--surface, #fff)", padding: 20 }}>
                <dt className="sf-mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink3)" }}>{label}</dt>
                <dd className="sf-mono" style={{ marginTop: 6, wordBreak: "break-word", color: "var(--ink)" }}>{value}</dd>
              </div>
            ))}
          </dl>
        </SmartSection>

        <SmartSection id="registrations" tone="paper" grid heading={{ id: "h-registrations", title: "Where we are registered to be found", lede: "Reference numbers included, so a buyer can search by number rather than by name." }}>
          <SmartUnit level={3} className="sf-c4" measure={false} title="Federal" lede="Federal portals.">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <caption className="sr-only">Federal procurement registrations</caption>
              <tbody>{FEDERAL.map(([k, v]) => <tr key={k}><th scope="row" style={{ ...cell, fontWeight: 400, color: "var(--ink2)" }}>{k}</th><td style={{ ...cell, fontWeight: 600 }}>{v}</td></tr>)}</tbody>
            </table>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c8" delay={0.08} measure={false} title="State, local and cooperative" lede="State and cooperative registrations, with a Pennsylvania DGS supplier number (35896) and Virginia SWaM certification.">
            <GoDeeper label="all state, local and cooperative registrations">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <caption className="sr-only">State, local and cooperative registrations</caption>
                <tbody>{procurementRegistrations.stateAndLocal.map((r) => <tr key={r.label}><th scope="row" style={{ ...cell, fontWeight: 400, color: "var(--ink2)" }}>{r.label}</th><td style={{ ...cell, fontWeight: 600, wordBreak: "break-word" }}>{r.value}</td></tr>)}</tbody>
              </table>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        <SmartSection id="codes" tone="surface" grid heading={{ id: "h-codes", title: "Registered NAICS and PSC codes", lede: `${siteConfig.codes.naics.length} NAICS and ${siteConfig.codes.psc.length} PSC codes, read from our SAM record.` }}>
          <SmartUnit level={3} className="sf-c6" measure={false} title="NAICS codes" lede="The primary codes, with titles.">
            <ul className="sf-points sf-mono">{NAICS_PRIMARY.map((c) => <li key={c}>{c} — {NAICS_TITLES[c]}</li>)}</ul>
            {NAICS_OTHER.length > 0 && <p>Also registered: {NAICS_OTHER.join(", ")}</p>}
          </SmartUnit>
          <SmartUnit level={3} className="sf-c6" delay={0.08} measure={false} title="PSC codes" lede="Product and service codes.">
            <ul className="sf-points sf-mono">{siteConfig.codes.psc.map((c) => <li key={c}>{c}</li>)}</ul>
          </SmartUnit>
        </SmartSection>
      </IndBody>
    </Layout>
  );
}

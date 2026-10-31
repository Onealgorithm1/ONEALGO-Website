import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import { SmartSection, GoDeeper, SmartUnit, type SfFaqItem } from "../../components/sf";
import { IndBody, PatternTable, type IndUnit } from "../../components/v2/industries-Body";
import { siteConfig } from "../../../shared/companyProfile";
import { procurementRegistrations } from "../../../shared/capabilities-data";

/* Government. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * ELIGIBILITY IS NOT PAST PERFORMANCE: no award, no clearance, no Microsoft or ServiceNow partner claim.
 * Certifications only as in onealgo-certifications-verified.md: SBA WOSB + EDWOSB certified 2026-04-14 (renews
 * 2029-04-14); SAM active to 2027-04-17. Identifiers/codes still read from shared data so SAM and the site cannot drift.
 * E-Verify is labelled as covering our own employees only (resolved Q3).
 * Facts: SBA goals via CRS IN12018 (industries/facts.json, sba_goals / sba_fy25). The SBA scorecard page itself was
 * not opened, so the pop-up says the figures are quoted by CRS from SBA. */

const PAGE_PATH = "/industries/government";
const TITLE = "Government IT services: WOSB, SAM registered | OneAlgorithm";
const DESCRIPTION = "Government IT services from an SBA-certified WOSB/EDWOSB with active SAM registration (UEI W8DYK38MEKP3). No contract awarded yet. (610) 890-9711.";
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
  ["GSA Schedule", "None"],
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
    id: "offer", title: "Government IT services we offer",
    lede: "Government IT services here means Salesforce, cloud modernization, data work and technical staffing, as capabilities.",
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
    points: ["Open to teaming and subcontract roles", "Open to mentor-protégé conversations", "Registered and eligible, with no award yet"],
    deepLabel: "how we approach teaming",
    deep: (<>
      <p className="sf-rule">We are open to teaming as a small-business partner on work that fits the capabilities above. Send the solicitation and the role, and we will say plainly whether we fit.</p>
      <div className="sf-links"><Link className={L} to="/capabilities">Capability statement</Link></div>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Can you act as a prime contractor?", a: "We are registered in SAM and eligible to bid as a prime on set-aside work. We have not yet been awarded a government contract, and we say so. Eligibility is not past performance, and nothing on this page is written to suggest otherwise." },
  { q: "What does WOSB and EDWOSB certification mean?", a: "The SBA certified us as a women-owned small business and an economically disadvantaged women-owned small business on 14 April 2026, valid to 14 April 2029. It makes us eligible for set-aside work. It is a certification of ownership, not a contract award." },
  { q: "What is a WOSB set-aside?", a: "A contract reserved for certified women-owned small businesses under the SBA program. The statutory goal is 5 percent of prime dollars, and fiscal 2025 reached 4.52 percent, as quoted by the Congressional Research Service. See the goals table above for the source." },
  { q: "What qualifies as a small business for government contracts?", a: "Size is set per NAICS code by the SBA, usually by revenue or number of employees. Our registered codes are listed on this page, and the size standard itself is the SBA's. You can check our record in SAM.gov using our UEI." },
  { q: "Do you hold a security clearance?", a: "No. We have held no clearance, and we claim none. A clearance is normally sponsored by an awarded contract, so a firm without an award usually has none. If a solicitation requires cleared staff, we will tell you that we cannot meet it." },
  { q: "Which procurement vehicles are you on?", a: "SAM.gov federally, with no GSA Schedule awarded. At state and cooperative level we hold COSTARS in Pennsylvania, eVA in Virginia and a Pennsylvania supplier registration. The registrations table on this page shows the reference numbers so you can search by number." },
  { q: "What do you deliver for government buyers?", a: "Salesforce configuration, IT modernization in stages, data work and technical staffing. We list these as capabilities, not as past agency work, because we have not yet been awarded a government contract. Each links to the service page that describes it.", link: { to: "/services/it-consulting", label: "IT consulting services" } },
  { q: "How can a contracting officer verify you?", a: "Search SAM.gov by UEI W8DYK38MEKP3 or CAGE 14G18, and check the SBA certification record for our legal name. The identifiers table on this page lists every number, and the capability statement at the top of the page can be opened in one click." },
  { q: "Do you have a government contract?", a: "No. We have not been awarded one, and we say so plainly. What we can show is eligibility you can verify: an active SAM registration, SBA certification and registered NAICS codes. We would rather be checked than assumed. The SAM registration and NAICS codes are public, so you can look them up yourself." },
  { q: "What does a government IT contractor do?", a: "A government IT contractor supplies IT services to agencies under contract, such as system modernization, data work, CRM configuration and technical staffing. Ours is a capability and eligibility statement, not past performance. We have not yet held a government contract.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
];

export default function Government() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "government IT services, federal IT solutions, WOSB EDWOSB contractor, SAM registered small business, UEI W8DYK38MEKP3, CAGE 14G18, set-aside eligible IT contractor, government IT services, small business teaming partner",
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
        lede="One Algorithm is an SBA-certified WOSB/EDWOSB with an active SAM registration, published NAICS codes, and registrations on the procurement portals listed below. We have not yet been awarded a government contract, and nothing on this page is written to suggest otherwise."
        panel={{
          title: "Eligibility and registration",
          items: [
            "Set-aside eligible and registered to receive award",
            "SBA-certified WOSB / EDWOSB",
            "SAM.gov registration active",
            `${siteConfig.codes.naics.length} NAICS codes published`,
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
        plate={{
          title: "Diagram: Registered and eligible",
          left: ["SAM.gov registration", "SBA certification", "NAICS codes"], hub: ["What you can verify", "Registered and eligible"], right: ["Identifiers a buyer looks up", "Capabilities, as capabilities", "Teaming and subcontract roles"],
          caption: "A diagram of the page: registries outside this company, and what a buyer can check in each.", stamp: "Registered and eligible",
        }}
        proof="local"
        offer1={{ heading: "Doing market research?", line: "The identifiers below are the fast answer. Send us a solicitation or a role.", label: "Send us a solicitation" }}
        offer2={{ heading: "Looking for a small-business teaming partner?", line: "Tell us the role and the NAICS code; we say whether we fit.", label: "Talk to a consultant" }}
        units={UNITS}
        after={{
          offer: (tone) => (
            <PatternTable id="website" tone={tone()} heading="Government website development"
              lede="We build websites; we have no government site to show."
              head={["What a buyer asks", "Where we stand"]}
              rows={[
                ["Do you build websites?", "Yes, as a general service, with scores printed on the service page."],
                ["Do you have a government site?", "No, and we make no such claim."],
              ]} />
          ),
        }}
        facts={{
          heading: "Federal small business goals",
          lede: "Women-owned firms won 4.52 percent of prime awards in fiscal 2025, against a 5 percent goal.",
          rows: [
            { label: "Small business: statutory goal / FY2025 actual", value: "23% / 27.58%" },
            { label: "Women-owned small business: goal / FY2025 actual", value: "5% / 4.52%" },
            { label: "Service-disabled veteran-owned: goal / actual", value: "5% / 5.01%" },
            { label: "HUBZone: goal / actual", value: "3% / 2.66%" },
          ],
          bars: { aLabel: "Statutory goal", bLabel: "FY2025 actual", rows: [
            { label: "Small business", a: 23, b: 27.58 },
            { label: "Women-owned small business", a: 5, b: 4.52 },
            { label: "Service-disabled veteran-owned", a: 5, b: 5.01 },
            { label: "HUBZone", a: 3, b: 2.66 },
          ] },
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
          <SmartUnit level={3} className="sf-c8" delay={0.08} measure={false} title="State, local and cooperative" lede="State and cooperative registrations, with a Pennsylvania DGS registration and Virginia SWaM certification.">
            <GoDeeper label="all state, local and cooperative registrations">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <caption className="sr-only">State, local and cooperative registrations</caption>
                <tbody>{procurementRegistrations.stateAndLocal.filter((r) => !/OhioBuys|BidNet|eProcure|COMMBUYS/i.test(r.label)).map(((r) => (/DGS/i.test(r.label) ? { ...r, value: "0000561511" } : r)) as (r: any) => any).map((r) => <tr key={r.label}><th scope="row" style={{ ...cell, fontWeight: 400, color: "var(--ink2)" }}>{r.label}</th><td style={{ ...cell, fontWeight: 600, wordBreak: "break-word" }}>{r.value}</td></tr>)}</tbody>
              </table>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        <SmartSection id="codes" tone="surface" grid heading={{ id: "h-codes", title: "Registered NAICS codes", lede: `${siteConfig.codes.naics.length} NAICS codes registered for ${siteConfig.legalName}.` }}>
          <SmartUnit level={3} className="sf-c6" measure={false} title="NAICS codes" lede="The primary codes, with titles.">
            <ul className="sf-points sf-mono">{NAICS_PRIMARY.map((c) => <li key={c}>{c} — {NAICS_TITLES[c]}</li>)}</ul>
            {NAICS_OTHER.length > 0 && <p>Also registered: {NAICS_OTHER.join(", ")}</p>}
          </SmartUnit>
        </SmartSection>
      </IndBody>
    </Layout>
  );
}

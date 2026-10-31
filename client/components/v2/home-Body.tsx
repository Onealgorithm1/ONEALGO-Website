import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, GoDeeper, SourcesDialog, Verify, FAQ, SfButton, StageRail, Readouts, ArrowIcon } from "@/components/sf";

import { IndStyles, GhostNum, PairBars, PROCESS_STATIONS } from "./industries-Visuals";
import type { SfFaqItem } from "@/components/sf";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE } from "../../data/salesforceProof";
import { SERVICE_GROUPS } from "./home-services";

/* Home page below the hero (the hero and the identifier rail stay in Index.tsx, untouched). */

const FAMILIES = [
  { to: "/services/website-development", title: "Websites", body: "Sites built to be found and to turn visits into work.", cta: "See websites" },
  { to: "/services/seo", title: "SEO and AI search", body: "Search visibility on Google and in AI assistants, measured.", cta: "See SEO" },
  { to: "/services/google-ads", title: "Google Ads", body: "Paid search with tracking counted once and the account in your name.", cta: "See Google Ads" },
  { to: "/services/application-development", title: "Apps and portals", body: "Software your company owns outright.", cta: "See apps" },
  { to: "/services/salesforce", title: "Salesforce", body: "Consulting, migration, integration and managed services from a Select Consulting Partner.", cta: "See Salesforce" },
  { to: "/services/marketing", title: "Marketing and MarTech", body: "Social, automation and the platforms behind them.", cta: "See marketing" },
  { to: "/services/it-consulting", title: "IT consulting and staffing", body: "Senior people and a plan for how the work runs.", cta: "See enterprise" },
];

const SECTORS = [
  { to: "/industries/construction", title: "Construction", body: "Field-to-office systems that talk to each other.", cta: "See construction" },
  { to: "/industries/manufacturing", title: "Manufacturing", body: "Integrations between ERP, shop and storefront.", cta: "See manufacturing" },
  { to: "/industries/ecommerce", title: "E-commerce", body: "WooCommerce and custom builds, from catalogue to checkout.", cta: "See e-commerce" },
  { to: "/industries/government", title: "Government", body: "What a public-sector buyer needs to verify, on one page.", cta: "See government" },
];

const FAQS: SfFaqItem[] = [
  { q: "Where is OneAlgorithm located?", a: "We are at 625 Swedesford Rd, Unit B, Malvern, PA 19355, and we work with clients across the United States.", link: { to: "/contact", label: "Contact us" } },
  { q: "What does OneAlgorithm do?", a: "We build websites and apps, run SEO and Google Ads, and implement Salesforce and Zendesk. We also provide IT consulting and staff augmentation.", link: { to: "/services", label: "All services" } },
  { q: "How big is the team?", a: "There are four of us, so you work with the people doing the build, not a layer of account managers.", link: { to: "/about", label: "About us" } },
  { q: "Do you offer support after launch?", a: "Yes. Every engagement has a hypercare period right after go-live, followed by 24/7 technical support and maintenance.", link: { to: "/services/it-consulting", label: "IT consulting" } },
  { q: "Are you a Salesforce partner?", a: `Yes. Salesforce lists OneAlgorithm as a Select Consulting Partner on the AppExchange, with ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications in Salesforce's record.`, link: { to: "/services/salesforce", label: "Salesforce services" } },
  { q: "Can you work with the systems we already use?", a: "Usually, yes. We connect Salesforce, Zendesk, QuickBooks and custom APIs rather than assuming a replacement.", link: { to: "/services/salesforce-integration", label: "Integration" } },
  { q: "Do I own what you build?", a: "Yes. You own the code, the cloud accounts and the domain, and nothing is held back.", link: { to: "/services/application-development", label: "Application development" } },
  { q: "Can you show a measured result?", a: "Yes. For Phantom Arcades, Google clicks rose 92% year on year and non-brand clicks rose 231%. The case study shows the dates and method.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Read the case study" } },
];

export function HomeBody() {
  return (
    <SfPage className="sf-home" crumbs={[]} base={[]}>
      {/* Home has no trail: hide the empty breadcrumb bar. */}
      <style>{`.sf-home .sf-crumbs{display:none}`}</style>
      <IndStyles />

      {/* 1. Hero hand-off: the Phantom result as a chart. */}
      <SmartSection id="proof" tone="night" className="ind-sec" labelledBy="h-proof">
        <GhostNum>92</GhostNum>
        <div className="sf-grid" style={{ alignItems: "start" }}>
          <SmartUnit className="sf-c5" headingId="h-proof" kicker="Proof" title="Proof you can check"
            lede="For Phantom Arcades, Google clicks rose 92 percent over the same 68 days a year apart."
            lead="Non-brand clicks rose 231 percent, which is new customers finding the site."
            points={["Measured in Google Search Console", "The prior 68 days were flat", "No revenue claim made"]}>
            <p className="sf-links" style={{ marginTop: 14 }}><Link className="sf-link" to="/blog/seo-case-study-phantom-arcades/">Read the case study</Link></p>
          </SmartUnit>
          <div className="sf-c7">
            <PairBars unit="" aLabel="Same 68 days, 2025" bLabel="13 Aug to 19 Oct 2026" rows={[
              { label: "Google clicks, +92%", a: 1112, b: 2130, max: 2200 },
              { label: "Non-brand clicks, +231%", a: 95, b: 314, max: 2200 },
              { label: "Impressions, +63%", a: 31978, b: 52226, max: 55000 },
            ]} />
          </div>
        </div>
      </SmartSection>

      {/* 2. Services: the card grid. */}
      <SmartSection id="services" tone="paper" heading={{ kicker: "Services", title: "What we build and run", id: "h-services", lede: "Seven service families, one team from first workshop to run-state." }}>
        <ServiceCards className="sf-mt" items={FAMILIES} />
        <div style={{ marginTop: 28 }}>
          <GoDeeper label="every service, page by page">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.id} style={{ marginTop: 16 }}>
                <p className="sf-kicker">{g.title}</p>
                <ul className="sf-points">
                  {g.items.map((s) => <li key={s.to}><Link className="sf-link" to={s.to}>{s.title}</Link></li>)}
                </ul>
              </div>
            ))}
            <p style={{ marginTop: 16 }}><Link className="sf-link" to="/services">Open the full services index</Link></p>
          </GoDeeper>
        </div>
      </SmartSection>

      {/* 3. Pull-quote band: the partner record as readouts. */}
      <SmartSection id="partner" tone="surface" className="ind-sec" labelledBy="h-partner">
        <GhostNum slow>SF</GhostNum>
        <div className="sf-grid ind-quote">
          <SmartUnit className="sf-c8" headingId="h-partner" title="Select Salesforce Consulting Partner"
            lede="Check the partner tier yourself before you hire anyone."
            lead="Salesforce's AppExchange record holds the first two figures, our Google profile the third.">
            <p className="sf-links" style={{ marginTop: 14 }}><Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check a partner</Link></p>
          </SmartUnit>
        </div>
        <Readouts withEvidence={false} items={[
          { value: SF_CERTIFIED_PEOPLE, label: "Salesforce-certified people", source: "Salesforce's AppExchange record" },
          { value: SF_CERTIFICATIONS, label: "Salesforce certifications", source: "Salesforce's figure, not ours" },
          { value: 6, label: "Google reviews, rated 5.0", source: "Google Business Profile, Chester County" },
        ]} />
      </SmartSection>

      {/* 4. Process rail. */}
      <SmartSection id="process" tone="paper" heading={{ kicker: "Process", title: "How a project runs", id: "h-process", lede: "Four steps, and the same people in each one." }}>
        <StageRail className="sf-mt" fig={1} stations={PROCESS_STATIONS} sample={false}
          title="Four stages: discover, design, deliver, support"
          desc="A rail runs through four stations: discover where the work breaks, design a plan agreed in writing, deliver in short cycles, then support it with hypercare and 24/7 support."
          stamp="How a project runs"
          caption="We find where the work breaks before anyone proposes a system, then stay on after go-live." />
      </SmartSection>

      {/* 5. Sectors as lift tiles. */}
      <SmartSection id="industries" tone="night" className="ind-sec" heading={{ kicker: "Industries", title: "Sectors we build for", id: "h-industries", lede: "Each page says what we have done and where our experience stops." }}>
        <GhostNum>04</GhostNum>
        <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
          {SECTORS.map((x, i) => (
            <li key={x.to} style={{ display: "flex" }}>
              <Link to={x.to} className="ind-lift" data-tilt="" style={{ display: "block", width: "100%", textDecoration: "none" }}>
                <span className="ind-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sf-h3" style={{ marginTop: 10 }}>{x.title}</h3>
                <p style={{ fontWeight: 400, fontSize: 16 }}>{x.body}</p>
                <span style={{ marginTop: 14, display: "inline-flex", gap: 8, alignItems: "center", color: "var(--orange)", fontWeight: 600 }}>{x.cta} <ArrowIcon size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 28 }}><Link className="sf-link" to="/industries">All industries</Link></p>
      </SmartSection>

      <SmartSection id="faq" tone="paper" grid>
        <div className="sf-c4">
          <h2 className="sf-h2" id="h-faq">Questions buyers ask</h2>
          <p className="sf-lede" data-lede="" style={{ marginTop: 14 }}>Straight answers, no sales pitch.</p>
        </div>
        <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
      </SmartSection>

      <SmartSection id="sources" tone="paper" compact>
        <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
          Sources for this page: <Verify id="sources">Open the list</Verify>
        </p>
      </SmartSection>

      <SmartSection id="start" tone="night" grid>
        <div className="sf-c7">
          <h2 className="sf-h2" id="h-start">Tell us what to fix</h2>
          <p className="sf-lede sf-measure" data-lede="" style={{ marginTop: 14 }}>A person reads your note and replies.</p>
          <p className="sf-mono" style={{ marginTop: 16 }}>OneAlgorithm · 625 Swedesford Rd, Unit B, Malvern, PA 19355</p>
          <div className="sf-ctas" style={{ marginTop: 24 }}>
            <SfButton to="/contact" magnet cta="home-cta">Contact us</SfButton>
          </div>
        </div>
      </SmartSection>

      <SourcesDialog id="sources" sources={[
        { name: "Google Search Console, Phantom Arcades property", what: "Clicks 1,112 to 2,130 (+92%), non-brand clicks 95 to 314 (+231%), impressions 31,978 to 52,226 (+63%), 13 Aug to 19 Oct 2026 against the same 68 days in 2025; the prior 68 days were flat (clicks -6%). The client owns the property.", read: "read 31 October 2026" },
        { name: "Google Business Profile, OneAlgorithm Consulting", what: "Computer consultant, Chester County: 5.0 of 5 from 6 reviews", read: "read 31 October 2026" },
        { name: "Salesforce AppExchange listing", what: `Select Consulting Partner: ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications, as shown in Salesforce's record`, read: "read 23 October 2026" },
      ]} />
    </SfPage>
  );
}

import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, GoDeeper, EvidenceDialog, AppExchangeEvidence, Verify, FAQ, SfButton } from "@/components/sf";
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

const STEPS = [
  ["Discover", "We find where the work breaks, before anyone proposes a system."],
  ["Design", "A plan sized to your team and your budget, agreed in writing."],
  ["Deliver", "Short cycles, so you see working software early."],
  ["Support", "Hypercare after go-live, then 24/7 support and maintenance."],
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

      <SmartSection id="proof" tone="surface" heading={{ kicker: "Proof", title: "Proof you can check", id: "h-proof", lede: "Three records, each with its source and the date we read it." }}>
        <div className="sf-grid" style={{ marginTop: 40 }}>
          <SmartUnit level={3} className="sf-c4" headingId="h-ph" title="Phantom Arcades: clicks up 92%"
            lede="Google clicks rose from 1,112 to 2,130 over the same 68 days a year apart."
            lead="Non-brand clicks rose 231%, which is new customers finding the site."
            points={["Measured in Google Search Console", "Control period was flat", "No revenue claim made"]}>
            <p className="sf-links" style={{ marginTop: 14 }}><Verify id="phantom">See the figures</Verify> <Link className="sf-link" to="/blog/seo-case-study-phantom-arcades/">Read the case study</Link></p>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" headingId="h-gbp" title="5.0 from 6 Google reviews"
            lede="Our Google Business Profile shows a 5.0 rating from six reviews."
            lead="A small number, counted live and not rounded up."
            points={["Listed as a computer consultant, Chester County", "Read 31 October 2026"]}>
            <p className="sf-links" style={{ marginTop: 14 }}><Verify id="gbp">See the record</Verify></p>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" headingId="h-sf" title="Select Salesforce Consulting Partner"
            lede={`Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications.`}
            lead="You can check the partner tier yourself before you hire anyone."
            points={["Figures quoted from Salesforce's record", "Date read is shown in the pop-up"]}>
            <p className="sf-links" style={{ marginTop: 14 }}><Verify id="appexchange">Verify the record</Verify> <Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check a partner</Link></p>
          </SmartUnit>
        </div>
      </SmartSection>

      <SmartSection id="process" tone="paper" heading={{ kicker: "Process", title: "How a project runs", id: "h-process", lede: "Four steps, and the same people in each one." }}>
        <ol className="sf-grid" style={{ marginTop: 40 }}>
          {STEPS.map(([t, b], i) => (
            <SmartUnit key={t} as="li" level={3} className="sf-c3" headingId={`h-step-${i}`} kicker={`0${i + 1}`} title={t} lede={b} />
          ))}
        </ol>
      </SmartSection>

      <SmartSection id="industries" tone="surface" heading={{ kicker: "Industries", title: "Sectors we build for", id: "h-industries", lede: "Each page says what we have done and where our experience stops." }}>
        <ServiceCards className="sf-mt" items={SECTORS} />
        <p style={{ marginTop: 24 }}><Link className="sf-link" to="/industries">All industries</Link></p>
      </SmartSection>

      <SmartSection id="faq" tone="paper" grid>
        <div className="sf-c4">
          <h2 className="sf-h2" id="h-faq">Questions buyers ask</h2>
          <p className="sf-lede" data-lede="" style={{ marginTop: 14 }}>Straight answers, no sales pitch.</p>
        </div>
        <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
      </SmartSection>

      <SmartSection id="start" tone="night" grid>
        <div className="sf-c7">
          <h2 className="sf-h2" id="h-start">Tell us what to fix</h2>
          <p className="sf-lede sf-measure" data-lede="" style={{ marginTop: 14 }}>A person reads your note and replies within one business day.</p>
          <p className="sf-mono" style={{ marginTop: 16 }}>OneAlgorithm · 625 Swedesford Rd, Unit B, Malvern, PA 19355</p>
          <div className="sf-ctas" style={{ marginTop: 24 }}>
            <SfButton to="/contact" magnet cta="home-cta">Contact us</SfButton>
          </div>
        </div>
      </SmartSection>

      <EvidenceDialog id="phantom" title="Phantom Arcades: the SEO figures" intro="Read from Google Search Console on 31 October 2026. The client owns the property."
        rows={[
          { th: "Window", td: "13 Aug to 19 Oct 2026, against the same 68 days in 2025" },
          { th: "Google clicks", td: "1,112 to 2,130 (+92%)" },
          { th: "Non-brand clicks", td: "95 to 314 (+231%)" },
          { th: "Impressions", td: "31,978 to 52,226 (+63%)" },
          { th: "Control", td: "The prior 68 days were flat (clicks -6%)" },
          { th: "Source", td: "Google Search Console" },
        ]}>
        <p><Link className="sf-link" to="/blog/seo-case-study-phantom-arcades/">Read the full case study</Link></p>
      </EvidenceDialog>
      <EvidenceDialog id="gbp" title="OneAlgorithm on Google" intro="What our Google Business Profile showed when a person at OneAlgorithm read it."
        rows={[
          { th: "Listing", td: "OneAlgorithm Consulting, computer consultant, Chester County" },
          { th: "Rating", td: "5.0 of 5" },
          { th: "Reviews", td: "6" },
          { th: "Read on", td: "31 October 2026" },
          { th: "Source", td: "Google Business Profile" },
        ]} />
      <AppExchangeEvidence />
    </SfPage>
  );
}

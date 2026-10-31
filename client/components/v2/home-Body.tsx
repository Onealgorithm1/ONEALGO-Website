import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, GoDeeper, SourcesDialog, Verify, FAQ, DeskCTA, StageRail, Readouts, ArrowIcon } from "@/components/sf";

import { IndStyles, GhostNum, PairBars, SystemsPlate, PROCESS_STATIONS } from "./industries-Visuals";
import type { SfFaqItem } from "@/components/sf";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE } from "../../data/salesforceProof";
import { SF_PHONE } from "../../data/salesforceShared";
import { SERVICE_GROUPS, SECTORS } from "./home-services";
import { OfferBand } from "./shared-OfferBand";
import { ProofStrip } from "./shared-ProofStrip";
import { UPDATED } from "./industries-Body";
import { GrowthPath } from "./home-GrowthPath";

/* Home page below the hero (the hero and the identifier rail stay in Index.tsx, untouched).
   Round 3 (seo-spec-b 4.1): entity H2 + plate, ProofStrip, OfferBand x2, renamed service cards with exact anchors,
   Salesforce partner section, industries, office (town + phone only: house rule, no street address or hours), 10-question FAQ. */

const FAMILIES = [
  { to: "/services/website-development", title: "Website development", body: "Sites built to be found and to turn visits into work.", cta: "See website development" },
  { to: "/services/seo", title: "SEO services", body: "Search visibility on Google and in AI assistants, measured.", cta: "See SEO services" },
  { to: "/services/google-ads", title: "Google Ads management", body: "Paid search with tracking counted once and the account in your name.", cta: "See Google Ads" },
  { to: "/services/application-development", title: "Custom software development", body: "Portals and internal tools your company owns outright.", cta: "See custom software" },
  { to: "/services/salesforce", title: "Salesforce consulting", body: "Consulting, migration, integration and managed services from a Select Consulting Partner.", cta: "See Salesforce" },
  { to: "/services/martech", title: "Marketing automation and MarTech", body: "Social, automation and the platforms behind them.", cta: "See MarTech" },
  { to: "/services/it-consulting", title: "IT consulting and staff augmentation", body: "Senior people and a plan for how the work runs.", cta: "See IT consulting" },
];

const FAQS: SfFaqItem[] = [
  { q: "Where is OneAlgorithm located?", a: "We are based in Malvern, Pennsylvania, in Chester County, and our phone is (610) 890-9711. We work with clients across the United States, mostly remotely, and meet in person when a project calls for it. Local pages cover Chester County and Philadelphia.", link: { to: "/contact", label: "Contact us" } },
  { q: "What does OneAlgorithm do?", a: "We build websites and software, run SEO and Google Ads, and implement Salesforce. We also provide IT consulting and staff augmentation for small organizations. One four-person team handles the work from first workshop to 24/7 support, so you talk to the people who build it.", link: { to: "/services", label: "All services" } },
  { q: "How big is the team?", a: "There are four of us. That means you work with the people doing the build, not a layer of account managers, and the same people stay on from the first workshop through support. We make no claim about client counts or size beyond that.", link: { to: "/about", label: "About us" } },
  { q: "Do you offer support after launch?", a: "Yes. Every engagement has a hypercare period right after go-live, followed by 24/7 technical support and maintenance. It is one support offer with no tiers to choose between, and it is handled by the team that built the work. If it is not a fit, we say so on the first call.", link: { to: "/services/it-consulting", label: "IT consulting services" } },
  { q: "Are you a Salesforce partner?", a: `Yes. Salesforce lists OneAlgorithm as a Select Consulting Partner on the AppExchange, with ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications in Salesforce's own record, read 23 October 2026. You can check the listing yourself before you hire anyone. Ask us and we will walk through it for your case.`, link: { to: "/services/salesforce", label: "Salesforce consulting" } },
  { q: "Do I own what you build?", a: "Yes. The code, the cloud accounts and the domain registrations are in your name from day one, and nothing is held back. We hand over documentation, so another developer can pick the work up whenever you choose. Send us the details and a person will reply with what we would check first.", link: { to: "/services/application-development", label: "Custom software development" } },
  { q: "Can you show a measured result?", a: "Yes, one. For Phantom Arcades, Google clicks rose 92 percent and non-brand clicks 231 percent year on year, measured in Search Console. It is one result, not a pattern, and we claim no revenue. The case study shows the dates and method.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades SEO case study" } },
  { q: "Can you work with the systems we already use?", a: "Usually, yes. Integrations are scoped per system, and we start with the two that disagree. We connect Salesforce, Zendesk (we signed a partner agreement in 2026) and Microsoft 365 rather than assuming a replacement. We agree the scope in writing before any work starts.", link: { to: "/services/salesforce-integration", label: "Salesforce integration" } },
  { q: "Do you build websites and do SEO for small businesses?", a: "Yes, small businesses are who we build for. We build the site and run the SEO, so the pages are made to be found, and you own the result. Each service has its own page with the process and what to expect.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Do you work outside Pennsylvania?", a: "Yes. Most work is remote, with clients across the United States. We have local pages for Chester County and Philadelphia because that is where we are known, but nothing about the work requires you to be near Malvern. If it is not a fit, we say so on the first call.", link: { to: "/services/seo-chester-county", label: "SEO, Chester County" } },
];

export function HomeBody() {
  return (
    <SfPage className="sf-home" crumbs={[]} base={[]}>
      {/* Home has no trail: hide the empty breadcrumb bar. */}
      <style>{`.sf-home .sf-crumbs{display:none}`}</style>
      <IndStyles />

      {/* 1. Hero hand-off: entity answer block beside a plate. */}
      <SmartSection id="entity" tone="paper" className="ind-sec" labelledBy="h-entity">
        <GhostNum slow>01</GhostNum>
        <div className="sf-grid" style={{ alignItems: "start" }}>
          <SmartUnit className="sf-c5" headingId="h-entity" title="OneAlgorithm: web, SEO, Google Ads and Salesforce"
            lede="OneAlgorithm is a four-person consultancy in Malvern, PA that builds websites and runs SEO, Google Ads and Salesforce work."
            lead="You deal with the people doing the work, from the first workshop to 24/7 support."
            points={["Websites, apps and portals you own", "SEO and Google Ads, measured", "Salesforce, IT consulting and staff augmentation"]} />
          <div className="sf-c7">
            <SystemsPlate fig={1} stamp="One team, start to finish" title="Diagram: from what you run today to a supported result"
              left={["Websites and search", "Apps and portals", "Salesforce and CRM"]} hub={["One team", "Start to run-state"]}
              right={["Built", "Run", "Supported 24/7"]}
              caption="A diagram of how the services fit: the work you need on the left, one team in the middle, a supported result on the right." />
          </div>
        </div>
      </SmartSection>

      {/* 2. The Phantom result as a chart. */}
      <SmartSection id="proof" tone="night" className="ind-sec" labelledBy="h-proof">
        <GhostNum>92</GhostNum>
        <div className="sf-grid" style={{ alignItems: "start" }}>
          <SmartUnit className="sf-c5" headingId="h-proof" kicker="Proof" title="An SEO result you can check"
            lede="For an arcade manufacturer in Florida, Google clicks rose 92 percent over the same 68 days a year apart."
            lead="Non-brand clicks rose 231 percent, which is new customers finding the site."
            points={["Measured in Google Search Console", "The prior 68 days were flat", "No revenue claim made"]}>
            <p className="sf-links" style={{ marginTop: 14 }}><Link className="sf-link" to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link></p>
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

      <SmartSection id="proof-strip" tone="paper" compact>
        <ProofStrip variant="local" />
      </SmartSection>

      <OfferBand heading="Tell us what to fix" line="Say what is not working and what you want it to do; a person replies." label="Talk to a consultant" />

      {/* 3. Services: the card grid. */}
      <SmartSection id="services" tone="surface" heading={{ kicker: "Services", title: "What we build and run", id: "h-services", lede: "Seven service families, one team from first workshop to run-state." }}>
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
            <p style={{ marginTop: 16 }}><Link className="sf-link" to="/services">Services</Link></p>
          </GoDeeper>
        </div>
      </SmartSection>

      <GrowthPath tone="paper" />

      {/* 4. Pull-quote band: the partner record as readouts. */}
      <SmartSection id="partner" tone="night" className="ind-sec" labelledBy="h-partner">
        <GhostNum slow>SF</GhostNum>
        <div className="sf-grid ind-quote">
          <SmartUnit className="sf-c8" headingId="h-partner" title="Salesforce consulting from a listed partner"
            lede="Check the partner tier yourself before you hire anyone."
            lead="Salesforce's AppExchange record holds both figures below, read 23 October 2026.">
            <p className="sf-links" style={{ marginTop: 14 }}>
              <Link className="sf-link" to="/services/salesforce">Salesforce consulting</Link>{" "}
              <Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check a partner</Link>
            </p>
          </SmartUnit>
        </div>
        <Readouts withEvidence={false} items={[
          { value: SF_CERTIFIED_PEOPLE, label: "Salesforce-certified people", source: "Salesforce's AppExchange record" },
          { value: SF_CERTIFICATIONS, label: "Salesforce certifications", source: "Salesforce's figure, not ours" },
        ]} />
      </SmartSection>

      {/* 5. Process rail. */}
      <SmartSection id="process" tone="paper" heading={{ kicker: "Process", title: "How a project runs", id: "h-process", lede: "Four steps, and the same people in each one." }}>
        <StageRail className="sf-mt" fig={2} stations={PROCESS_STATIONS} sample={false}
          title="Four stages: discover, design, deliver, support"
          desc="A rail runs through four stations: discover where the work breaks, design a plan agreed in writing, deliver in short cycles, then support it with hypercare and 24/7 support."
          stamp="How a project runs"
          caption="We find where the work breaks before anyone proposes a system, then stay on after go-live." />
      </SmartSection>

      {/* 6. Sectors as lift tiles. */}
      <SmartSection id="industries" tone="night" className="ind-sec" heading={{ kicker: "Industries", title: "Industries we serve", id: "h-industries", lede: "Each page says what we have done and where our experience stops." }}>
        <GhostNum>05</GhostNum>
        <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
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
        <p style={{ marginTop: 28 }}><Link className="sf-link" to="/industries">Industries we serve</Link></p>
      </SmartSection>

      {/* 7. Office: town and phone only (house rule: no street address, no hours). */}
      <SmartSection id="office" tone="paper" className="ind-sec" labelledBy="h-office">
        <GhostNum slow>MA</GhostNum>
        <div className="sf-grid" style={{ alignItems: "start" }}>
          <SmartUnit className="sf-c7" headingId="h-office" title="Our office in Malvern, Pennsylvania"
            lede="We are based in Malvern, in Chester County, and work with clients across the region and the country."
            lead="Our Google Business Profile shows 5.0 from 6 Google reviews, read 31 October 2026."
            points={["Service area: Bucks, Chester, Delaware, Montgomery and Philadelphia counties, and New Castle, DE", "Remote work with clients across the United States", "Local pages for Chester County and Philadelphia"]} />
          <div className="sf-c5">
            <p className="sf-kicker">OneAlgorithm</p>
            <p className="ps-big" style={{ fontWeight: 600, fontSize: 24, margin: "8px 0" }}>Malvern, PA</p>
            <p><a className="sf-link" href={SF_PHONE.href}>{SF_PHONE.display}</a></p>
          </div>
        </div>
      </SmartSection>

      <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
        <div className="sf-c4">
          <h2 className="sf-h2" id="h-faq">Questions buyers ask</h2>
          <p className="sf-lede" data-lede="" style={{ marginTop: 14 }}>Straight answers, no sales pitch.</p>
        </div>
        <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
      </SmartSection>

      <SmartSection id="sources" tone="paper" compact>
        <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
          Sources for this page: <Verify id="sources">Open the list</Verify> <span>{UPDATED}</span>
        </p>
      </SmartSection>

      <DeskCTA
        form={{ topic: "general", topicLabel: "OneAlgorithm", heading: "Tell us what you need", prompt: "What is the system or page that is not working?", submitLabel: "Talk to an expert", need: "general" }}
        heading="Tell us what to fix" lede="Say what is not working and what you want it to do; a person at OneAlgorithm reads it and replies."
        covers={["What is not working today", "The systems and sites involved", "What a fix would let you do", "Your timeline"]} coversLabel="What to have ready"
        next={["Send the form on the contact page; the topic is filled in.", "A person at OneAlgorithm reads it and replies.", "If it fits, we scope it in writing before any work starts."]}
        hcLink={false}
      />

      <SourcesDialog id="sources" sources={[
        { name: "Google Search Console, Phantom Arcades property", what: "Clicks 1,112 to 2,130 (+92%), non-brand clicks 95 to 314 (+231%), impressions 31,978 to 52,226 (+63%), 13 Aug to 19 Oct 2026 against the same 68 days in 2025; the prior 68 days were flat (clicks -6%). The client owns the property.", read: "read 31 October 2026" },
        { name: "Google Business Profile, OneAlgorithm Consulting", what: "Computer consultant, Chester County: 5.0 of 5 from 6 reviews; service area Bucks, Chester, Delaware, Montgomery and Philadelphia counties and New Castle, DE", read: "read 31 October 2026" },
        { name: "Salesforce AppExchange listing", what: `Select Consulting Partner: ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications, as shown in Salesforce's record`, read: "read 23 October 2026" },
      ]} />
    </SfPage>
  );
}

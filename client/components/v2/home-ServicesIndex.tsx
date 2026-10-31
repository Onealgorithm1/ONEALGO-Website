import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, StageRail, ArrowIcon, FAQ, DeskCTA, SourcesDialog, Verify, type SfFaqItem } from "@/components/sf";
import { SERVICE_GROUPS, SECTORS } from "./home-services";
import { IndStyles, GhostNum, SystemsPlate, PROCESS_STATIONS } from "./industries-Visuals";
import { OfferBand } from "./shared-OfferBand";
import { ProofStrip } from "./shared-ProofStrip";
import { UPDATED } from "./industries-Body";
import { GrowthPath } from "./home-GrowthPath";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE } from "../../data/salesforceProof";

/* Body of /services below its hero: every service, grouped, one line each. Round 2: a plate bridges the hero,
   then each group takes a different layout (cards, ledger rows, night tiles, cards, reversed ledger), a rail, the CTA last.
   Round 3 (seo-spec-b 4.2): H2 "IT and marketing services we run" over the plate, ProofStrip, OfferBand x2, an Industries
   section, a 10-question FAQ, one Sources line, DeskCTA last.
   Codex fix: in the reversed layout the heading used to come AFTER its cards in the DOM; the heading is now first in
   the DOM and CSS `order` puts the cards on the left. */

export const SERVICES_FAQS: SfFaqItem[] = [
  { q: "What IT and marketing services do you offer?", a: "Seven families: websites, SEO and Google Ads, custom software, Salesforce, marketing and MarTech, IT consulting and staff augmentation, and Zendesk. One four-person team runs them, from the first workshop to 24/7 support. Each family has its own page with the detail.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Do you work with small businesses?", a: "Yes, small and mid-sized organizations are who we work for. We are four people, so you deal with the people who do the build rather than a layer of account managers. We make no claim about client counts or sizes beyond that." },
  { q: "How do I know which service I need?", a: "Start from the problem: a site nobody finds, ads you cannot read, or systems that disagree. Each service card says which problem it solves. If you are still unsure, send a note through the contact form and a person will point you to the right page." },
  { q: "What is the difference between IT consulting and staff augmentation?", a: "IT consulting gives you advice and a plan for the systems you run. Staff augmentation puts a developer or analyst inside your team to do the work. Many projects start with the first and add the second. Each has its own page.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
  { q: "Do you do SEO and Google Ads?", a: "SEO yes, with a published result: for Phantom Arcades, Google clicks rose 92 percent year on year. Google Ads is a method and an audit offer, and we have no client ad-account results to show, so we make no claim about them.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "Do you build software as well as websites?", a: "Yes. We build customer portals, internal tools and web applications, with the code and the cloud accounts in your name. Websites are one service and custom software another, and the two often share a team. A website can grow into a portal later on the same accounts.", link: { to: "/services/application-development", label: "Custom software development" } },
  { q: "Do you offer 24/7 support?", a: "Yes. Every engagement has a hypercare period right after go-live, followed by 24/7 technical support and maintenance. A person reads what you send, and it is the same team that built the work. There is one support offer and it covers every hour of the day." },
  { q: "Where do you work?", a: "We are based in Malvern, Pennsylvania, and work remotely with clients across the United States. We have local pages for Chester County and Philadelphia. In-person sessions happen when a project calls for them, and we agree them up front. Chester County and Philadelphia are the two places with their own pages.", link: { to: "/contact", label: "Contact us" } },
  { q: "Do I own the work you build?", a: "Yes. The code, the cloud accounts and the domain registrations are in your name from day one, and we hand over documentation. Nothing is held back, so you can bring another developer in at any time. The handover documentation is what makes a switch of developer possible." },
  { q: "Can you work with Salesforce or Zendesk?", a: `Salesforce yes: we are a Select Consulting Partner on the AppExchange, with ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications in Salesforce's record. We signed a Zendesk partner agreement in 2026 and claim no tier beyond that. The Salesforce listing can be checked on the AppExchange before you commit.`, link: { to: "/services/salesforce", label: "Salesforce consulting" } },
];

type G = (typeof SERVICE_GROUPS)[number];
const LAYOUT = ["cards", "ledger", "tiles", "cards", "ledger-r"] as const;

function Ledger({ g, cls, order }: { g: G; cls: string; order?: number }) {
  return (
    <div className={`sf-ledger ${cls}`} style={order ? { order } : undefined}>
      {g.items.map((s) => (
        <Link key={s.to} className="sf-lrow" to={s.to}>
          <h3 className="sf-h4">{s.title}</h3>
          <span>{s.lede}</span>
        </Link>
      ))}
    </div>
  );
}

export function ServicesIndexBody() {
  return (
    <SfPage base={[{ label: "Home", to: "/" }]} crumbs={[{ label: "Services" }]}>
      <IndStyles />
      <SmartSection id="plate" tone="paper" heading={{ id: "h-plate", title: "IT and marketing services we run", lede: "Websites, search, software, Salesforce and IT consulting from one team, built and then supported." }}>
        <div style={{ marginTop: 28 }}>
          <SystemsPlate fig={1} stamp="One team, start to finish" title="Diagram: from what you run today to a supported result"
            left={["Websites and search", "Apps and portals", "Salesforce and CRM"]} hub={["One team", "Start to run-state"]}
            right={["Built", "Run", "Supported 24/7"]}
            caption="A diagram of how the services fit: the work you need on the left, one team in the middle, a supported result on the right." />
        </div>
      </SmartSection>

      <SmartSection id="proof-strip" tone="surface" compact>
        <ProofStrip variant="all" />
      </SmartSection>

      <GrowthPath tone="paper" />

      <OfferBand heading="Not sure which one?" line="Tell us what you are trying to fix; we point you to the right service." label="Talk to a consultant" />

      {SERVICE_GROUPS.map((g, i) => {
        const l = LAYOUT[i % LAYOUT.length];
        const hid = `h-${g.id}`;
        const band = i === 3 ? <OfferBand heading="Planning a Salesforce project?" line="We look at the org you have and say what we would do first." label="Talk to a consultant" /> : null;
        if (l === "cards") {
          return (
            <div key={g.id} style={{ display: "contents" }}>
              <SmartSection id={g.id} tone={i % 2 ? "surface" : "paper"} heading={{ title: g.title, id: hid, lede: g.lede }}>
                <ServiceCards className="sf-mt" items={g.items.map((s) => ({ to: s.to, title: s.title, body: s.lede, cta: "Open" }))} />
              </SmartSection>
              {band}
            </div>
          );
        }
        if (l === "tiles") {
          return (
            <SmartSection key={g.id} id={g.id} tone="night" className="ind-sec" heading={{ title: g.title, id: hid, lede: g.lede }}>
              <GhostNum slow>{String(i + 1).padStart(2, "0")}</GhostNum>
              <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
                {g.items.map((s, j) => (
                  <li key={s.to} style={{ display: "flex" }}>
                    <Link to={s.to} className="ind-lift" data-tilt="" style={{ display: "block", width: "100%", textDecoration: "none" }}>
                      <span className="ind-n">{String(j + 1).padStart(2, "0")}</span>
                      <h3 className="sf-h3" style={{ marginTop: 10 }}>{s.title}</h3>
                      <p style={{ fontWeight: 400, fontSize: 16 }}>{s.lede}</p>
                      <span style={{ marginTop: 14, display: "inline-flex", gap: 8, alignItems: "center", color: "var(--orange)", fontWeight: 600 }}>Open <ArrowIcon size={16} /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SmartSection>
          );
        }
        const rev = l === "ledger-r";
        return (
          <SmartSection key={g.id} id={g.id} tone={i % 2 ? "surface" : "paper"} className="ind-sec" labelledBy={hid}>
            <GhostNum slow={rev}>{String(i + 1).padStart(2, "0")}</GhostNum>
            <div className="sf-grid" style={{ alignItems: "start" }}>
              {/* Heading first in the DOM; `order` moves it visually when the layout is reversed. */}
              <SmartUnit className="sf-c4" headingId={hid} title={g.title} lede={g.lede} measure={false} style={rev ? { order: 2 } : undefined} />
              <Ledger g={g} cls="sf-c8" order={rev ? 1 : undefined} />
            </div>
          </SmartSection>
        );
      })}

      <SmartSection id="industries" tone="night" className="ind-sec" heading={{ title: "Industries we serve", id: "h-industries", lede: "Each page says what we have done and where our experience stops." }}>
        <GhostNum>05</GhostNum>
        <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          {SECTORS.map((x, i) => (
            <li key={x.to} style={{ display: "flex" }}>
              <Link to={x.to} className="ind-lift" data-tilt="" style={{ display: "block", width: "100%", textDecoration: "none" }}>
                <span className="ind-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sf-h3" style={{ marginTop: 10 }}>{x.phrase}</h3>
                <p style={{ fontWeight: 400, fontSize: 16 }}>{x.body}</p>
                <span style={{ marginTop: 14, display: "inline-flex", gap: 8, alignItems: "center", color: "var(--orange)", fontWeight: 600 }}>{x.cta} <ArrowIcon size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 28 }}><Link className="sf-link" to="/industries">Industries we serve</Link></p>
      </SmartSection>

      <SmartSection id="process" tone="paper" heading={{ title: "How a project runs", id: "h-process", lede: "Four steps, and the same people in each one." }}>
        <StageRail className="sf-mt" fig={2} stations={PROCESS_STATIONS} sample={false}
          title="Four stages: discover, design, deliver, support"
          desc="A rail runs through four stations: discover where the work breaks, design a plan agreed in writing, deliver in short cycles, then support it with hypercare and 24/7 support."
          stamp="How a project runs"
          caption="We find where the work breaks before anyone proposes a system, then stay on after go-live." />
      </SmartSection>

      <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
        <div className="sf-c4"><h2 className="sf-h2" id="h-faq">Questions about our services</h2></div>
        <div className="sf-c7 sf-faq-col"><FAQ items={SERVICES_FAQS} /></div>
      </SmartSection>

      <SmartSection id="sources" tone="paper" compact>
        <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
          Sources for this page: <Verify id="sources">Open the list</Verify> <span>{UPDATED}</span>
        </p>
      </SmartSection>

      <DeskCTA
        form={{ topic: "services", topicLabel: "Services", heading: "Tell us what you need", prompt: "What is the system or page that is not working?", submitLabel: "Talk to an expert", need: "services" }}
        heading="Not sure which one?" lede="Tell us what you are trying to fix and we will point you to the right service."
        covers={["What is not working today", "The systems and sites involved", "What a fix would let you do", "Your timeline"]} coversLabel="What to have ready"
        next={["Send the form on the contact page; the topic is filled in.", "A person at OneAlgorithm reads it and replies.", "If it fits, we scope it in writing before any work starts."]}
        hcLink={false}
      />
      <SourcesDialog id="sources" sources={[
        { name: "Google Search Console, Phantom Arcades property", what: "Clicks 1,112 to 2,130 (+92%), non-brand clicks 95 to 314 (+231%), 13 Aug to 19 Oct 2026 against the same 68 days in 2025. The client owns the property.", read: "read 31 October 2026" },
        { name: "Google Business Profile, OneAlgorithm Consulting", what: "Computer consultant, Chester County: 5.0 of 5 from 6 reviews", read: "read 31 October 2026" },
        { name: "Salesforce AppExchange listing", what: `Select Consulting Partner: ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications, as shown in Salesforce's record`, read: "read 23 October 2026" },
      ]} />
    </SfPage>
  );
}

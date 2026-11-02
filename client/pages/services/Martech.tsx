import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, SmartUnit, GoDeeper, EvidenceDialog, Verify, DeskCTA, FAQ, StageRail,
  type SfFaqItem,
} from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { MarketingLedger } from "../../components/v2/marketing-Ledger";
import { VisualStyles, HoverCards, StackPlate } from "../../components/v2/marketing-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* MarTech services - site-wide v2 rebuild 2026-10-31 (sf kit body, hero kept).
 *
 * HERO KEPT: PageHero is unchanged (same component, text and panel). Only its two buttons now carry ?need=martech.
 * This is the target page for "marketing automation consultant" / "marketing automation consulting" (GSC: the home
 * page shows at position 7.8 for it). A separate marketing-automation page may come later and is NOT created here.
 * Proof, and only this: about 18 months of recurring Marketing Cloud support for one client (never named), behind
 * an in-site pop-up; our own Salesforce email outreach platform (ours, not a client result).
 * HubSpot is NOT named anywhere (fact-check: no HubSpot delivery). No partner, tier or delivery claim. No prices, no years. */

const PAGE_PATH = "/services/martech";
const MC = "/services/salesforce-marketing-cloud-consulting";
const CONTACT = contactHref("MarTech", PAGE_PATH, "martech");
const AUDIT = contactHref("MarTech audit", PAGE_PATH, "martech");

const CAPABILITIES = [
  { title: "Marketing Automation", body: "Journeys and lead nurture built inside the tool you already pay for, triggered by what someone did rather than by a send date." },
  { title: "Customer Data & Insights", body: "One customer record assembled from the CRM, the website, the email tool and the ad platforms, with duplicates resolved rather than counted three times." },
  { title: "Personalization & CX", body: "Content and offers that change based on what someone has already done. We start with the two or three rules that matter, not a matrix nobody will maintain." },
  { title: "Digital Advertising & Media", body: "Conversion tracking wired so that ad reporting shows the same numbers your CRM does." },
  { title: "Campaign Management", body: "Planning and tracking campaigns across your channels, including the unglamorous parts: UTM discipline, list hygiene, suppression rules." },
  { title: "CRM and marketing tool integration", body: <>Salesforce Marketing Cloud and Salesforce CRM, your email platform, and conversion sync from the CRM to your ad accounts, with written documentation so your team can run it after we go. <Link className="sf-link" to="/services/salesforce-integration">Salesforce integration services</Link></> },
];

const WHY_US = [
  "We do the engineering as well as the strategy, so an integration doesn't become somebody else's ticket.",
  "One customer record, so the same person isn't three contacts in three tools.",
  "Automation for the manual steps — list uploads, lead assignment, the Monday report.",
  "Reporting that reconciles with the CRM, including the months when the CRM number is the worse one.",
];

const AUDIT_ROWS = [
  { title: "Inventory", body: "What you own: every marketing tool, who uses it and which plan you are on." },
  { title: "Cost against use", body: "What each tool costs, set against what your team actually uses it for." },
  { title: "Integration map", body: "What is actually connected, what is duplicated, and where a lead's history breaks." },
  { title: "Cancel list", body: "A prioritized list, usually including a tool or two you can cancel." },
];

const STEPS = [
  { num: "01", title: "Audit", body: "We map what you own, what it costs, what is connected and what is duplicated." },
  { num: "02", title: "Plan", body: "A prioritized list of fixes, agreed with you before anything is built." },
  { num: "03", title: "Build", body: "Automation and integrations built inside platforms you already license." },
  { num: "04", title: "Document", body: "Written documentation, so your team can run it after we go." },
  { num: "05", title: "Hand over", body: "Your team takes it on, and our support stays available if something breaks." },
];

const FAQS: SfFaqItem[] = [
  { q: "What is MarTech consulting?", a: "MarTech consulting reviews the software behind your marketing, such as the CRM, email platform, ad accounts and analytics, then fixes how they connect. The aim is one set of numbers that reconcile and fewer tools doing the same job. It is not a new tool; it is the wiring between your existing ones." },
  { q: "What does MarTech stand for?", a: "MarTech is short for marketing technology: the software a team uses to plan, run and measure marketing. Your stack is the set of those tools, typically a CRM, an email or automation platform, ad accounts, analytics and the connections between them. Consulting looks at whether that set works together." },
  { q: "What does MarTech consulting cost?", a: "We scope it in writing after the stack audit, because the number of tools, how they connect and what is broken decide the work. We do not print a price list. The audit's inventory, cost-against-use view and cancel list can show where existing spend is being paid for and not used." },
  { q: "Does Salesforce have marketing automation?", a: "Yes. Salesforce Marketing Cloud is its marketing automation and email platform, and it connects to Salesforce CRM. We have supported a client's Marketing Cloud account for about 18 months. For setup, journeys and consent, see our Salesforce Marketing Cloud consulting page.", link: { to: MC, label: "Salesforce Marketing Cloud consulting" } },
  { q: "How do you connect a CRM to marketing automation?", a: "We start with an integration map: which fields, contacts and campaigns move, in which direction and on what schedule. Then we build and test the sync, including opt-outs flowing back, and document it so your team can run it. We do not connect tools blindly or in bulk.", link: { to: "/services/salesforce-integration", label: "Salesforce integration services" } },
  { q: "How long does it take to fix a marketing stack?", a: "It depends on how many tools you run and how tangled they are. The audit comes first and gives you a ranked list of fixes, so quick wins can start before the larger integration work. We agree the timeline in writing after the audit and will not promise a date beforehand." },
  { q: "Will I need to buy another marketing tool?", a: "Not necessarily. The audit compares what you pay for with what you use, and the cancel list names tools you could drop. We recommend a new tool only when an existing one cannot do the job, and we tell you why before you spend anything." },
  { q: "Can my team run the integrations after you finish?", a: "Yes, that is the aim. We document every connection and hand over: what moves, where it is configured and what to check when it breaks. The accounts stay in your name, so you are never locked in to us, and you can bring us back for changes." },
  { q: "How many MarTech tools do we really need?", a: "As few as cover your jobs: a CRM, a way to send and automate email, ad accounts, analytics and reporting. The right number is the one with no overlap. Our audit lists each tool, what it costs and how much it is used, so overlap and unused tools become visible." },
  { q: "Do you work with HubSpot?", a: "Our MarTech work centres on Salesforce, including Marketing Cloud, and the CRM. We do not offer HubSpot implementation. If HubSpot sits in your stack, the audit will still inventory it and show how it connects to everything else; building inside HubSpot is outside what we sell." },
];

const TITLE = "MarTech Consulting and Stack Audit | One Algorithm";
const DESCRIPTION = "MarTech consulting: audit your marketing stack, connect CRM, email, ads and analytics, and make reporting reconcile. Book a stack audit: (610) 890-9711.";

export default function Martech() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "marketing automation consultant, marketing automation consulting, MarTech consulting, marketing technology stack, martech stack audit, CRM integration, marketing integration, customer data",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "MarTech Services",
          "Marketing technology services: marketing automation consulting, integrating CRM, email, advertising, analytics and e-commerce systems, unifying customer records, and reporting that reconciles with the CRM.",
          "Marketing technology consulting",
          "https://onealgorithm.com/services/martech",
          { areaServed: { "@type": "Country", name: "United States" }, offers: { "@type": "Offer", name: "Marketing stack audit" } },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, "https://onealgorithm.com/services/martech", { dateModified: "2026-10-31" })} />

      {/* HERO KEPT: same component, same text, same panel. */}
      <PageHero
        eyebrow="MarTech"
        title={
          <>
            MarTech consulting services —{" "}
            <span className="text-oa-orange">the wiring between your marketing tools</span>
          </>
        }
        lede="Most marketing stacks are five tools that don't talk to each other and one person exporting spreadsheets between them. We connect them — CRM, email, ads, analytics, the website — so a lead's history follows it and the reporting adds up."
        panel={{
          title: "What we deliver",
          items: ["Marketing Automation", "Customer Data & Insights", "Personalization & CX", "Digital Advertising & Media", "Integration & Enablement"],
        }}
        primary={{ label: "Request a MarTech Consultation", to: CONTACT }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <SfPage crumbs={[{ label: "MarTech" }]}>
        <VisualStyles />

        {/* 1 · HERO HAND-OFF: five lists become one record */}
        <SmartSection id="stack" labelledBy="h-stack"
          heading={{ id: "h-stack", kicker: "The problem", title: "What is a marketing technology stack?", lede: "A marketing technology stack is every tool that captures, nurtures and measures your leads, from CRM to ads." }}>
          <div style={{ marginTop: 40 }}><StackPlate fig={1} /></div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> The stack only works when those tools share one customer record instead of five separate lists.</p>
          <GoDeeper label="what is in a typical stack and how it breaks">
            <p className="sf-rule">Most small-business stacks grow one tool at a time: a CRM here, an email platform there, ad accounts, an analytics property, a website form. Each works on its own. Together they leave the same person as three contacts in three systems, with no history following the lead from first click to sale.</p>
            <p>MarTech consulting is the work of connecting them: agreeing which system owns each record, wiring the integrations, and writing it down. A marketing technology stack audit is the first step.</p>
          </GoDeeper>
        </SmartSection>

        <OfferBand heading="Not sure what is broken?" line="Name the tools you own; we tell you what we would connect first." label="Book a stack audit" />

        <SmartSection id="proof-strip" tone="surface" compact labelledBy="h-proof-strip">
          <h2 className="sf-h3" id="h-proof-strip" style={{ marginBottom: 20 }}>Who you are hiring</h2>
          <ProofStrip variant="local" />
        </SmartSection>

        {/* 2 · marketing automation consultant: split text + proof readout */}
        <SmartSection id="automation" grid labelledBy="h-auto">
          <SmartUnit className="sf-c7" headingId="h-auto" title="Marketing automation on your existing tools"
            lede="As your marketing automation consultant, we build journeys and lead nurture inside the platform you already pay for."
            lead="Automation fails on the manual steps around it, so we automate those first: list uploads, assignment, the weekly report."
            points={["Journeys triggered by what someone did, not a send date", "Follow-up that stops the moment someone replies", "Automation wired to the CRM record, not beside it"]}>
            <GoDeeper label="where the experience comes from">
              <p className="sf-rule">We supported one client&rsquo;s Salesforce Marketing Cloud account on a recurring basis for about 18 months. The client is not named.</p>
              <p>We also built and run our own Salesforce email outreach platform, with a send governor and reply matching. It is our own platform, not a client result.</p>
              <div className="sf-links">
                <Link className="sf-link" to={MC}>Salesforce Marketing Cloud consulting</Link>
                <Link className="sf-link" to="/services/salesforce-integration">Salesforce integration services</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c5">
            <div className="sf-readout">
              <span className="sf-readout-num">18</span>
              <p className="sf-readout-lab">months of recurring Marketing Cloud support for one client, not named</p>
              <p className="sf-readout-src sf-mono">OneAlgorithm project records</p>
            </div>
          </div>
        </SmartSection>

        {/* 3 · capabilities: hover cards */}
        <SmartSection id="what" tone="surface" labelledBy="h-what"
          heading={{ id: "h-what", kicker: "Capabilities", title: "What we build, and what we connect", lede: "Six things, and every one happens inside a platform you already license." }}>
          <HoverCards cols={3} numbered items={CAPABILITIES} />
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> A stack with a seventh tool in it is rarely the answer.</p>
        </SmartSection>

        {/* 4 · why us: night band */}
        <SmartSection id="why" tone="night" grid labelledBy="h-why">
          <SmartUnit className="sf-c12" headingId="h-why" title="Why OneAlgorithm for MarTech?"
            lede="We do the engineering as well as the strategy, so your stack ends up wired together and documented."
            lead="An integration that becomes somebody else's ticket is an integration that never gets finished."
            points={["Engineering and strategy from one team, so no integration becomes a ticket", WHY_US[1], "Automation for the manual steps: uploads, assignment, the Monday report"]}>
            <GoDeeper label="the fourth reason, and how we report">
              <p className="sf-rule">{WHY_US[3]}</p>
              <p>That matters most in the months when the CRM figure is the lower one: a report you can only trust when it flatters you is not a report. We are four people in Malvern who read the stack end to end, and 24/7 support and hypercare follow every launch.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 4b · NEW: work delivered */}
        <SmartSection id="delivered" labelledBy="h-delivered"
          heading={{ id: "h-delivered", kicker: "Proof", title: "MarTech work we have delivered", lede: "Two pieces of work, described as what they are, with no client named." }}>
          <div className="sf-grid" style={{ marginTop: 40 }}>
            <div className="sf-c6"><CaseCard title="Marketing Cloud support" built="Recurring support for one client's Salesforce Marketing Cloud account for about 18 months. The client is not named." to={MC} linkLabel="Salesforce Marketing Cloud consulting" /></div>
            <div className="sf-c6"><CaseCard title="Our own email outreach platform" built="A Salesforce email outreach platform with a send governor and reply matching. It is our own system, not a client result." to="/services/salesforce-integration" linkLabel="Salesforce integration services" /></div>
          </div>
        </SmartSection>

        {/* 5 · audit: split text + sample audit sheet */}
        <SmartSection id="audit" tone="surface" grid labelledBy="h-audit">
          <SmartUnit className="sf-c5" headingId="h-audit" title="MarTech audit: what you get"
            lede="We map what you own, what it costs, what is actually connected and what is duplicated."
            lead="You get a prioritized list, usually including a tool or two you can cancel."
            points={["Inventory of every marketing tool you own", "Cost set against actual use", "An integration map and a cancel list"]} measure={false}>
            <GoDeeper label="the four parts of the audit">
              <MarketingLedger items={AUDIT_ROWS} />
            </GoDeeper>
            <div style={{ marginTop: 24 }}><SfButton to={AUDIT} cta="audit">Request a MarTech audit</SfButton></div>
          </SmartUnit>
          <figure className="sf-c7" style={{ margin: 0 }}>
            <div className="sf-stage"><div className="sf-stage-in" style={{ padding: "20px 8px 8px" }}>
              <p style={{ padding: "0 14px 12px", display: "flex", justifyContent: "space-between", gap: 12 }}><span className="sf-mono">Audit sheet · tool inventory</span><span className="mk-sample">Sample, not a client</span></p>
              <div className="mk-table-wrap">
                <table className="mk-table">
                  <thead><tr><th scope="col">Tool</th><th scope="col">Used for</th><th scope="col">Connected to CRM</th><th scope="col">Verdict</th></tr></thead>
                  <tbody>
                    <tr><td data-th="Tool">Email platform</td><td data-th="Used for">Campaigns</td><td data-th="Connected to CRM">Yes</td><td data-th="Verdict">Keep</td></tr>
                    <tr><td data-th="Tool">Second email tool</td><td data-th="Used for">Rarely opened</td><td data-th="Connected to CRM">No</td><td data-th="Verdict">Cancel</td></tr>
                    <tr><td data-th="Tool">Form plugin</td><td data-th="Used for">Website forms</td><td data-th="Connected to CRM">No</td><td data-th="Verdict">Connect</td></tr>
                    <tr><td data-th="Tool">Ad reporting tool</td><td data-th="Used for">Weekly report</td><td data-th="Connected to CRM">Partly</td><td data-th="Verdict">Fold into CRM report</td></tr>
                  </tbody>
                </table>
              </div>
            </div><span className="sf-tick" aria-hidden="true" style={{ display: "block" }} /></div>
            <figcaption className="sf-mono" style={{ marginTop: 12 }}>A layout of the audit output with invented rows.</figcaption>
          </figure>
        </SmartSection>

        <OfferBand />

        {/* 6 · engagement: stage rail */}
        <SmartSection id="engagement" labelledBy="h-engagement"
          heading={{ id: "h-engagement", kicker: "Process", title: "How an engagement runs", lede: "Five steps, from audit to hand over, with the plan agreed before any build starts." }}>
          <div style={{ marginTop: 40 }}>
            <StageRail fig={2} stations={[
              { k: "s1", num: "01", title: "Audit", sub: "what you own" },
              { k: "s2", num: "02", title: "Plan", sub: "agreed first" },
              { k: "s3", num: "03", title: "Build", sub: "in your platforms" },
              { k: "s4", num: "04", title: "Document", sub: "written down" },
              { k: "s5", num: "05", title: "Hand over", sub: "support on call" },
            ]} title="Diagram of the five steps of a MarTech engagement" desc="A rail runs through five stations: audit, plan, build, document, hand over."
              stamp="How an engagement runs" caption="You see the scope and the order of work first, so nothing is built on a guess." />
          </div>
          <MarketingLedger items={STEPS} label="How an engagement runs" />
          <div className="sf-links" style={{ marginTop: 24 }}>
            <Link className="sf-link" to="/services/marketing">Marketing services</Link>
            <Link className="sf-link" to="/services/seo">SEO services</Link>
            <Link className="sf-link" to="/services/google-ads">Google Ads management</Link>
            <Link className="sf-link" to="/services/salesforce">Salesforce consulting</Link>
          </div>
        </SmartSection>

        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">MarTech and automation questions</h2>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SmartSection id="sources" compact labelledBy="h-sources">
          <p className="sf-mono" id="h-sources">Updated <time dateTime="2026-10-31">October 31, 2026</time>. The one proof point on this page has a record behind it. <Verify id="mc-pattern">Sources</Verify></p>
        </SmartSection>
        <EvidenceDialog
          id="mc-pattern"
          title="Sources for this page"
          intro="One client's Salesforce Marketing Cloud account, supported on a recurring basis. The client is not named."
          rows={[
            { th: "Work", td: "Recurring Marketing Cloud support" },
            { th: "Length", td: "About 18 months" },
            { th: "Source", td: "OneAlgorithm project records (two paid purchase orders)" },
          ]}
          primary={{ href: "/contact#need=martech", label: "Talk to us about your stack" }}
        />

        <DeskCTA
          form={{ topic: "martech", topicLabel: "MarTech", need: "martech", heading: "Tell us about your stack", prompt: "Which tools do you own, and which of them should talk to each other?", submitLabel: "Request a MarTech consultation" }}
          heading="Tell us about your marketing stack"
          lede="Name the tools you own, and we will tell you what we would connect first."
          coversLabel="What to have ready"
          covers={["The CRM, email and ad platforms you use", "Where leads and customer records live today", "The report you do not trust"]}
          next={["Send the short note on the contact page.", "A person at OneAlgorithm reads it and replies.", "If it fits, we start with the audit."]}
          hcLink={false}
        />
      </SfPage>
    </Layout>
  );
}

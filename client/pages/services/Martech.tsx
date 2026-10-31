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
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema } from "../../components/StructuredData";

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
  { title: "Campaign Management", body: "Planning, building and running multi-channel campaigns — including the unglamorous parts: UTM discipline, list hygiene, suppression rules." },
  { title: "Integration & Enablement", body: "APIs and middleware between marketing, CRM, e-commerce and support systems, plus written documentation so your team can run it after we go." },
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
  { q: "What is a marketing technology stack?", a: "A marketing technology stack is the set of tools that capture, nurture and measure your leads: the CRM, email, ad platforms, analytics and website. It works when they share one customer record instead of five separate lists." },
  { q: "What is MarTech consulting?", a: "Most marketing stacks are five tools that do not talk to each other and one person exporting spreadsheets between them. We connect them, including the CRM, email, ads, analytics and the website, so a lead's history follows it and the reporting adds up." },
  { q: "What does a MarTech audit include?", a: "We map what you own, what it costs, what is actually connected and what is duplicated. You get a prioritized list, usually including a tool or two you can cancel." },
  { q: "What does MarTech consulting cost?", a: "It depends on how many tools are in the stack and how many integrations need building or repairing. We start with the audit, agree the scope with you, and quote the build against that list." },
  { q: "Does Salesforce have marketing automation?", a: "Yes. Salesforce Marketing Cloud is its marketing automation and email product, and we have supported a Marketing Cloud account for about 18 months. We also build automation inside the CRM and email tool you already own.", link: { to: MC, label: "Salesforce Marketing Cloud consulting" } },
  { q: "How do you connect a CRM to marketing automation?", a: "We build the APIs and middleware between the two, agree which system owns each record, and resolve duplicates so one person is one contact. Journeys then trigger on what someone did, and the reporting reconciles with the CRM." },
  { q: "How long does it take to fix a marketing stack?", a: "It depends on the number of tools and integrations. The audit comes first and produces a prioritized plan, so you know the scope and the order of work before any build starts." },
  { q: "Will I need to buy another marketing tool?", a: "Usually not. Everything we build happens inside a platform you already license, because a stack with a seventh tool in it is rarely the answer." },
  { q: "Can my team run the integrations after you finish?", a: "Yes. We build the APIs and middleware between marketing, CRM, e-commerce and support systems, plus written documentation so your team can run it after we go." },
];

const TITLE = "MarTech Consulting & Marketing Automation | OneAlgorithm";
const DESCRIPTION = "MarTech consulting and marketing automation consultant services: connect your CRM, email, ads and analytics, audit your stack, and make the reporting reconcile.";

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
          "Marketing",
          "https://onealgorithm.com/services/martech",
        )}
      />

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

        {/* 2 · marketing automation consultant: split text + proof readout */}
        <SmartSection id="automation" tone="surface" grid labelledBy="h-auto">
          <SmartUnit className="sf-c7" headingId="h-auto" title="Marketing automation consultant for your existing tools"
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
              <p className="sf-readout-src sf-mono">OneAlgorithm's own paid-invoice records</p>
            </div>
          </div>
        </SmartSection>

        {/* 3 · capabilities: hover cards */}
        <SmartSection id="what" labelledBy="h-what"
          heading={{ id: "h-what", kicker: "Capabilities", title: "What we build, and what we connect", lede: "Six things, and every one happens inside a platform you already license." }}>
          <HoverCards cols={3} numbered items={CAPABILITIES} />
        </SmartSection>

        {/* 4 · why us: night band */}
        <SmartSection id="why" tone="night" grid labelledBy="h-why">
          <SmartUnit className="sf-c12" headingId="h-why" title="Why OneAlgorithm for MarTech?"
            lede="We do the engineering as well as the strategy, so your stack ends up wired together and documented."
            lead="An integration that becomes somebody else's ticket is an integration that never gets finished."
            points={["Engineering and strategy from one team, so no integration becomes a ticket", WHY_US[1], "Automation for the manual steps: uploads, assignment, the Monday report"]}>
            <GoDeeper label="the fourth reason, and how we report">
              <p className="sf-rule">{WHY_US[3]}</p>
              <p>That matters most in the months when the CRM figure is the lower one: a report you can only trust when it flatters you is not a report.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 5 · audit: split text + sample audit sheet */}
        <SmartSection id="audit" grid labelledBy="h-audit">
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

        {/* 6 · engagement: stage rail */}
        <SmartSection id="engagement" tone="surface" labelledBy="h-engagement"
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
          <GoDeeper label="the five steps in detail">
            <MarketingLedger items={STEPS} />
          </GoDeeper>
          <div className="sf-links" style={{ marginTop: 24 }}>
            <Link className="sf-link" to="/services/marketing">Marketing and social media management</Link>
            <Link className="sf-link" to="/services/seo">SEO services</Link>
            <Link className="sf-link" to="/services/website-development">Website development</Link>
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
          <p className="sf-mono" id="h-sources">The one proof point on this page has a record behind it. <Verify id="mc-pattern">Sources</Verify></p>
        </SmartSection>
        <EvidenceDialog
          id="mc-pattern"
          title="Sources for this page"
          intro="One client's Salesforce Marketing Cloud account, supported on a recurring basis. The client is not named."
          rows={[
            { th: "Work", td: "Recurring Marketing Cloud support" },
            { th: "Length", td: "About 18 months" },
            { th: "Source", td: "OneAlgorithm's own paid-invoice records" },
          ]}
          primary={{ href: "/contact?need=martech", label: "Talk to us about your stack" }}
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

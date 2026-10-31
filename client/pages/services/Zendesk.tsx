import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, SmartUnit, GoDeeper, Readouts, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseTable, EnterpriseFaq } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, Statement, EnterpriseSources } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Zendesk. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit); round 3 (SEO spec B
 * 4.6): primary "Zendesk implementation" first in the title, new section "Our Zendesk partner agreement", OfferBand x2,
 * ProofStrip, nine FAQs at 40-60 words.
 *
 * ⛔ WHAT THE RECORD SUPPORTS: a Zendesk Partner Agreement executed 28 May 2026 (DocuSign). "Zendesk partner",
 *    never "certified", never "implementation partner"; no tier is stated.
 * ⛔ NO DELIVERY CLAIMS: there is no Zendesk client, ticket or project in the record. This page sells the approach.
 * ⛔ Facts (80,000+ customers, 1,800+ Marketplace listings, the four ways to partner) are Zendesk's own, read 31 October
 *    2026, shown in the sources pop-up (id "zd"). HOLD: Zendesk's "90% deploy in 8 weeks" is not in facts.json, so it
 *    is not printed. No prices. */

const PATH = "/services/zendesk";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Zendesk implementation with Salesforce | OneAlgorithm";
const DESCRIPTION = "Zendesk implementation, migration and integration with Salesforce. Zendesk partner agreement signed 2026. Call (610) 890-9711.";

const SOURCES: SfSource[] = [
  { name: "Zendesk: Partners", what: "Ways to partner (resell, refer, implement, technology), with no requirements stated on the page; 80,000+ customers; 1,800+ Marketplace apps, partners and integrations", read: "read 31 October 2026", page: "https://www.zendesk.com/partners/" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const CHECKLIST = [
  "List the channels: email, web form, chat, phone, social",
  "Name every group and who owns each queue",
  "Write the ticket statuses and what each one means",
  "Set triggers and routing before any agent logs in",
  "Draft macros for the ten most common answers",
  "Structure help center categories around customer questions",
  "Define response and resolution targets per priority",
  "Connect Salesforce, mailboxes and Microsoft 365 in a sandbox first",
  "Build the dashboards a manager reads each morning",
  "Train agents on a copy of real tickets, then go live",
];

const FAQS: SfFaqItem[] = [
  { q: "How long does a Zendesk implementation take?", a: "It depends on the number of channels, the integrations and how much data has to come across. We do not quote a standard duration from a web page. After we have seen your setup, we write a plan with dates, so you know what happens first and who owns it." },
  { q: "Do you replace Zendesk support?", a: "No. Zendesk supports its own product, and that stays with Zendesk. We help you configure Zendesk around your team, connect it to other systems and design the workflow, then support what we set up. If a fault is in the product itself, Zendesk is the right door." },
  { q: "Can you migrate us from another help desk?", a: "A migration is a scoped project, and we would start with an inventory of tickets, users, macros and attachments. We would map each field, trial-load a copy and check the counts before cutover. This describes our method; we do not claim a past Zendesk migration.", link: { to: "#h-checklist", label: "The implementation checklist" } },
  { q: "What is Zendesk?", a: "Zendesk is customer service software that manages support tickets across email, chat, phone and web. Zendesk says it serves more than 80,000 companies and lists more than 1,800 apps, partners and integrations in its Marketplace. Our figures come from Zendesk's own partner page." },
  { q: "Is Zendesk a CRM?", a: "Not by itself. Zendesk handles support: tickets, queues, macros and a help center. The CRM role, with accounts, opportunities and pipeline, belongs to Salesforce or a similar system. Many teams run both and connect them, so an agent sees the account and a rep sees the open tickets.", link: { to: "#vs-h", label: "Zendesk or Salesforce Service Cloud?" } },
  { q: "Can Zendesk work with Microsoft 365?", a: "In principle, yes, through integrations. Shared mailboxes can route into Zendesk, and side conversations can go out to Outlook and Teams for people who are not agents. We scope it per tenant, because mailbox rules and permissions differ, and test it in a sandbox first." },
  { q: "How much does Zendesk cost?", a: "Zendesk sets and publishes its own plan prices, so check zendesk.com for the current plans. Our implementation work is scoped separately, in writing, once we know your channels, groups, automations and integrations. We publish no rate card, and we do not resell Zendesk plans." },
  { q: "What do you need from us to start?", a: "Four things: your ticket volume, the channels you answer on, the help desk you use today and the systems that must connect. A paragraph is enough to begin. We come back with questions and a view of what we would change first.", link: { to: "/contact?need=enterprise", label: "Talk to a consultant" } },
  { q: "How do I choose a Zendesk consultant?", a: "Ask for named references, a written scope, the name of the person who does the work and who owns the configuration afterwards. Ask what the consultant has and has not done. We have a partner agreement and no past Zendesk client to cite, and we say so.", link: { to: "/services/it-consulting", label: "IT consulting services" } },
];

export default function Zendesk() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "Zendesk implementation, Zendesk integration, Zendesk migration, Zendesk consultant, Zendesk partner, Zendesk Salesforce integration",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Zendesk Implementation with Salesforce",
          "Zendesk implementation, support workflow design, automation and routing, knowledge base structure, reporting, and integration with Salesforce and Microsoft 365, from a Zendesk partner based in Malvern, Pennsylvania.",
          "Zendesk implementation",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      <PageHero
        eyebrow="Zendesk partner"
        title={
          <>
            <span className="text-oa-orange">Zendesk</span> partner:
            implementation, support and Salesforce integration
          </>
        }
        lede="We're a Zendesk partner, under a partner agreement signed in 2026. A Zendesk implementation covers the ticket workflow, the routing and the link to the CRM you already run; here is how we would run it, so support and sales stop emailing each other for context."
        panel={{
          title: "What an implementation covers",
          items: [
            "Zendesk setup and configuration",
            "Support workflow design",
            "Automation and routing",
            "Reporting and dashboards",
            "Salesforce / CRM integration",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <SfPage crumbs={[{ label: "Zendesk" }]}>
        <EVStyles />
        <BridgePlate
          id="what"
          fig={1}
          heading={{ id: "h-do", title: "What a Zendesk implementation involves", lede: "A Zendesk implementation sets up channels, ticket workflow, routing and reporting around how your team works, then connects Zendesk to your CRM and mailboxes." }}
          title="How a ticket travels"
          desc="Four boxes joined by arrows: customer channels feed Zendesk, which routes tickets and hands them to Salesforce and to Microsoft 365 mailboxes and Teams."
          stamp="How a ticket travels"
          caption="Most of this is decisions, not software: who owns a ticket, when it escalates, what a customer answers alone."
          nodes={[
            { num: "01", title: "Channels", sub: "email, chat, phone, web" },
            { num: "02", title: "Zendesk", sub: "routing, macros, statuses", hl: true },
            { num: "03", title: "Salesforce", sub: "accounts, contacts, cases" },
            { num: "04", title: "Microsoft 365", sub: "mailboxes, Outlook, Teams" },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
          <GoDeeper label="the seven things an implementation covers">
            <p className="sf-rule">An implementation covers setup and configuration; support workflow design; automation and routing; knowledge base structure; reporting and dashboards; Salesforce and CRM integration; and the Microsoft 365 handoffs. The point of the workflow is that a ticket cannot quietly sit unowned for three days. This describes how we would run a project; see {L("/services/it-consulting", "IT consulting services")} for how we scope work.</p>
          </GoDeeper>
        </BridgePlate>

        <OfferBand heading="Planning a Zendesk project?" line="Tell us your channels and your CRM. We say what we would settle first." label="Talk to a consultant" />

        <SmartSection id="proof" compact labelledBy="proof-l">
          <h2 className="sf-h3" id="proof-l">Who you would work with</h2>
          <div style={{ marginTop: 20 }}><ProofStrip variant="local" /></div>
        </SmartSection>

        <SmartSection id="checklist" tone="surface" grid labelledBy="h-checklist">
          <SmartUnit
            className="sf-c7"
            headingId="h-checklist"
            title="Zendesk implementation checklist"
            lede="Ten checks, in the order they run, from listing channels to training agents on real tickets."
            lead="The order matters: ownership and routing come before anyone logs in."
          >
            <ol style={{ marginTop: 24 }}>
              {CHECKLIST.map((c, i) => (
                <li key={c} style={{ display: "flex", gap: 14, padding: "10px 0", borderTop: "1px solid var(--hair)" }}>
                  <span className="sf-mono" aria-hidden="true" style={{ color: "var(--orange-text)", paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            level={3}
            headingId="h-wrong"
            title="Where Zendesk projects go wrong"
            lede="Most Zendesk problems are not Zendesk problems; configuring the tool before settling ownership just automates the confusion."
            points={["No owner for tickets that cross teams", "Customer data split across systems", "Dashboards built before targets were agreed"]}
            delay={0.08}
          >
            <GoDeeper label="queues, macros and help centers">
              <p className="sf-rule">Typical causes: queues copied from demo data instead of your escalation paths, macros nobody maintains, a help center organized by your org chart, reports that need exporting to a spreadsheet, and an integration that shows the agent nothing useful. We fix ownership first.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        <SmartSection id="handoffs" tone="paper" heading={{ id: "h-handoffs", title: "Zendesk and Salesforce integration", lede: "The fix for most support problems sits in the systems around Zendesk." }}>
          <HoverCards
            cols={2}
            items={[
              { glyph: "link", kicker: "CRM side", title: "Zendesk and Salesforce", body: "An agent sees the account and its open opportunities, and a rep sees the open tickets. Standard integration; middleware only where the data models differ.", to: "/services/salesforce-integration", cta: "Salesforce integration" },
              { glyph: "mail", kicker: "Mailbox side", title: "Zendesk and Microsoft 365", body: "Shared mailboxes routed in, side conversations out to Outlook and Teams, and a path for people who are not agents but must still answer.", to: "/services/it-consulting", cta: "IT consulting services" },
            ]}
          />
        </SmartSection>

        <EnterpriseTable
          id="vs"
          tone="surface"
          title="Zendesk or Salesforce Service Cloud?"
          lede="Zendesk is built for support teams that want to be live quickly; Service Cloud suits organizations already running on Salesforce."
          caption="Zendesk compared with Salesforce Service Cloud"
          head={["Compared", "Zendesk", "Service Cloud"]}
          rows={[
            ["Fits best when", "Support is its own team with its own tools", "Sales and service already share Salesforce"],
            ["Setup", "Faster for a support team", "One platform with the CRM"],
            ["Together", "Either can connect to the other", "Either can connect to the other"],
          ]}
        />

        <OfferBand heading="Zendesk or Service Cloud?" line="Tell us where your customer data lives. We say which fits your team." label="Talk to a consultant" />

        <SmartSection id="agreement" tone="paper" grid heading={{ id: "h-agreement", title: "Our Zendesk partner agreement", lede: "We signed a Zendesk partner agreement on May 28, 2026. We claim no tier and no certification beyond it." }}>
          <div className="sf-c12">
            <Readouts
              withEvidence={false}
              className="ev-r2"
              items={[
                { value: 80000, label: "or more companies served, per Zendesk", source: <>Zendesk partner page</> },
                { value: 1800, label: "or more apps, partners and integrations in the Marketplace", source: <>Zendesk partner page</> },
              ]}
            />
          </div>
          <Statement className="sf-c7">A Zendesk partner under an agreement signed in 2026. We claim nothing beyond it.</Statement>
          <ul className="sf-points sf-c5">
            <li>Zendesk lists four ways to partner</li>
            <li>No past Zendesk client to cite</li>
            <li>Figures here are Zendesk's own</li>
          </ul>
          <div className="sf-c12">
            <GoDeeper label="what the agreement does and does not mean">
              <p className="sf-rule">Zendesk describes four ways to partner: resell, refer, implement and technology, and its page states no requirements. Our agreement is a signed record, not a ranking. This page describes our approach, not past Zendesk projects. {L("/contact", "Ask us exactly what we have and have not done")}. Related: {L("/services/salesforce", "Salesforce consulting")}, {L("/services/martech", "MarTech consulting")}, {L("/industries/ecommerce", "ecommerce website development")}.</p>
            </GoDeeper>
          </div>
        </SmartSection>

        <SmartSection id="cost" tone="surface" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c8"
            headingId="h-cost"
            title="What a Zendesk implementation costs"
            lede="Cost follows scope: channels, groups, automations, integrations and how much existing data comes across."
            lead="Zendesk publishes its own plan prices; our work is scoped in writing once we know the setup, and we publish no rate card."
            points={["Channels and groups to configure", "Integrations with Salesforce and Microsoft 365", "Data coming from another help desk"]}
          />
        </SmartSection>

        <EnterpriseFaq title="Zendesk questions" items={FAQS} />
        <EnterpriseSources id="zd" text="Zendesk partner page, read October 31, 2026." />
        <SourcesDialog id="zd" title="Where these figures come from" intro="The figures on this page are Zendesk's own, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
        <DeskCTA
          heading="Tell us where support is leaking"
          lede="A backlog nobody can explain, tickets bouncing between groups, or a Zendesk somebody set up and left."
          covers={["Channels, groups and queues", "Where tickets stall", "What connects to the CRM", "What we would change first"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would change first."]}
          hcLink={false}
          form={{ topic: "zendesk", topicLabel: "Zendesk", need: "zendesk", heading: "Talk to an expert", prompt: "What is your support setup, and what is not working?", submitLabel: "Talk to an expert" }}
        />
      </SfPage>
    </Layout>
  );
}

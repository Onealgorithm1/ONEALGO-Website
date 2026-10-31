import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, SmartUnit, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseFacts, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Zendesk. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit). The hero is unchanged.
 *
 * ⛔ WHAT THE RECORD SUPPORTS: a Zendesk Partner Agreement executed 28 May 2026 (DocuSign) and partner enablement.
 *    That is all. "Zendesk partner", never "certified"; no tier is stated because the agreement leaves the type and
 *    tier to Zendesk's Partner Connect, which we have not read.
 * ⛔ NO DELIVERY CLAIMS: there is no Zendesk client, ticket or project in the record. This page sells the approach:
 *    what we would set up, where these projects go wrong, the checklist. Nothing says "we have implemented".
 * ⛔ Facts (80,000+ customers, 1,800+ Marketplace listings, 90% deploy in 8 weeks or less) are Zendesk's own, from
 *    its partner page, read 31 October 2026, shown in the sources pop-up (id "zd"). No prices. */

const PATH = "/services/zendesk";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Zendesk setup and Salesforce integration | One Algorithm";
const DESCRIPTION = "Zendesk setup, migration and integration with Salesforce and Microsoft 365. Zendesk partner agreement signed 2026.";

const SOURCES: SfSource[] = [
  { name: "Zendesk: Partners", what: "Ways to partner (resell, refer, implement, technology); 80,000+ customers; 1,800+ Marketplace apps, partners and integrations; 90% of users deploy in 8 weeks or less", read: "read 31 October 2026", page: "https://www.zendesk.com/partners/" },
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

const WHAT: EUnit[] = [
  {
    id: "h-do", title: "What we do with Zendesk",
    lede: "We set Zendesk up around how your team already works, then connect it to the CRM and mailboxes you run.",
    lead: "Most of this is decisions, not software: who owns a ticket, when it escalates, what a customer answers alone.",
    leadIn: "What we do:",
    points: ["Setup: agent workspace, groups, brands, business rules", "Workflow: statuses, targets, triggers, escalation paths", "Automation: routing rules and macros"],
    label: "the seven things we cover",
    deep: (<>
      <p className="sf-rule">Configuration is the easy half. We cover setup and configuration; support workflow design; automation and routing; knowledge base structure; reporting and dashboards; Salesforce and CRM integration; and the Microsoft 365 handoffs.</p>
      <p>The point of the workflow is that a ticket cannot quietly sit unowned for three days. Routing and macros mean the tickets that can be answered from a template are, and the rest reach someone who can fix them.</p>
    </>),
  },
  {
    id: "h-wrong", title: "Where Zendesk projects go wrong",
    lede: "Most Zendesk problems are not Zendesk problems: they are a ticket that needs someone in finance, or a customer whose record lives in three systems.",
    lead: "Configuring the tool before settling ownership just automates the confusion.",
    leadIn: "Why it matters:",
    points: ["No owner for tickets that cross teams", "Customer data split across systems", "Dashboards built before targets were agreed"],
    label: "five common failure points",
    deep: (<>
      <p className="sf-rule">Five patterns repeat: queues copied from the demo data instead of your escalation paths; macros nobody maintains; a help center organized by your org chart rather than your customers' questions; reports that need exporting to a spreadsheet; and an integration that shows the agent nothing useful.</p>
      <p>Our approach is to fix the ownership questions first, because everything else in Zendesk hangs on them. That is also where the Salesforce, CRM and Microsoft 365 side usually has to be fixed.</p>
    </>),
  },
];

const HANDOFFS: EUnit[] = [
  {
    id: "h-sfdc", title: "Zendesk and Salesforce", lede: "Connect the two so an agent sees the account and its open opportunities, and a rep sees the open tickets.",
    lead: "Usually the standard integration; middleware only where the two data models do not line up.", points: ["Agent sees account and opportunities", "Rep sees open tickets", "Middleware only when the models differ"],
    label: "how we would connect them",
    deep: (<>
      <p className="sf-rule">We start by agreeing which system owns each record, then map accounts, contacts and cases. Where Zendesk tickets should become Salesforce cases, or the reverse, we decide that with you before building.</p>
      <p>See our {L("/services/salesforce", "Salesforce consulting")} and {L("/services/salesforce-integration", "Salesforce integration")} pages for the CRM side.</p>
    </>),
  },
  {
    id: "h-m365", title: "Zendesk and Microsoft 365", lede: "Shared mailboxes routed in, side conversations out to Outlook and Teams, and a path for people who are not agents.",
    lead: "Many tickets need an answer from someone outside the support team.", points: ["Shared mailboxes routed into Zendesk", "Side conversations to Outlook and Teams", "A path for non-agents who must answer"],
    label: "how the handoffs work",
    deep: <p className="sf-rule">The people who are not agents but still have to answer something, such as finance or a warehouse lead, need a route that does not require a Zendesk seat and does not lose the thread. We design that path with the mailboxes and Teams channels you already use.</p>,
  },
];

const PARTNER: EUnit[] = [
  {
    id: "h-partner", title: "Zendesk partner status",
    lede: "We are a Zendesk partner under a partner agreement signed in 2026, with partner enablement under way.",
    lead: "That is an agreement with Zendesk, and we claim nothing beyond it.",
    leadIn: "The bottom line:",
    points: ["Partner agreement signed in 2026", "No client or delivery claims on this page", "Zendesk's own partner page explains the program"],
    label: "what the agreement is",
    deep: <p className="sf-rule">The agreement makes us a Zendesk partner. This page therefore describes our approach and method, not past Zendesk projects. If you want to know exactly what we have done and not done, ask us directly: {L("/contact", "talk to an expert")}.</p>,
  },
  {
    id: "h-vs", title: "Zendesk or Salesforce Service Cloud?",
    lede: "Zendesk is built for support teams that want to be live quickly; Service Cloud suits organizations already running their business on Salesforce.",
    lead: "The right answer depends on where your customer data lives today.",
    leadIn: "Yes, but:",
    points: ["Zendesk: faster setup for a support team", "Service Cloud: one platform with the CRM", "Either can connect to the other"],
    label: "how to choose",
    deep: <p className="sf-rule">If your sales and service teams already share Salesforce, extending it can be simpler than adding another system. If support is its own team with its own tools, Zendesk is often the lighter fit. We will recommend the one that suits you, and our {L("/services/salesforce", "Salesforce practice")} covers the other option.</p>,
  },
];

const COST: EUnit[] = [
  {
    id: "h-cost", title: "What a Zendesk implementation costs",
    lede: "Cost follows scope: channels, groups, automations, integrations and how much existing data comes across.",
    lead: "We scope in writing once we know the setup, and publish no rate card.",
    points: ["Channels and groups to configure", "Integrations with Salesforce and Microsoft 365", "Data coming from another help desk"],
    label: "what moves the cost",
    deep: <p className="sf-rule">Zendesk's own subscription is separate from our work and is set by Zendesk. We can tell you which plan features your workflow needs, so you do not pay for tiers you will not use.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What does a Zendesk implementation involve?", a: "A Zendesk implementation covers channels, groups and queues, ticket statuses, triggers and routing, macros, the help center, reporting, and integrations with the CRM and mailboxes you run. We agree ownership and escalation first, then configure.", link: { to: "#h-checklist", label: "The implementation checklist" } },
  { q: "How long does a Zendesk implementation take?", a: "Zendesk reports that 90% of users deploy in 8 weeks or less. Your schedule depends on channels, integrations and migrated data, and we set it once we have seen your setup." },
  { q: "Do you replace Zendesk support?", a: "No. Zendesk supports its own product. We help you configure it around your team, integrate it with other systems and design the workflow." },
  { q: "Should we choose Zendesk or Salesforce Service Cloud?", a: "It depends on where your customer data lives. Service Cloud suits organizations already running on Salesforce, and Zendesk often suits a support team that wants to be live quickly.", link: { to: "/services/salesforce", label: "Salesforce consulting services" } },
  { q: "Can you migrate us from another help desk?", a: "That is a job we would run by mapping each ticket field, status and user from the old tool's export to Zendesk, trial-loading a copy and checking the counts before cutover. This page describes our method, not a past Zendesk migration." },
  { q: "Are you a Zendesk partner?", a: "Yes. We are a Zendesk partner under a partner agreement signed in 2026." },
  { q: "Can you connect Zendesk to Salesforce?", a: "Yes, as a service we offer. We agree which system owns each record, map accounts, contacts and cases, and use the standard integration unless the two data models need middleware.", link: { to: "/services/salesforce-integration", label: "Salesforce integration" } },
  { q: "What is Zendesk?", a: "Zendesk is customer service software for managing support tickets across email, chat, phone and web. Zendesk says it serves more than 80,000 companies and lists more than 1,800 apps, partners and integrations in its Marketplace." },
];

export default function Zendesk() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "Zendesk implementation, Zendesk setup, Zendesk Salesforce integration, Zendesk consultant, Zendesk partner",
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
          "Zendesk Setup and Salesforce Integration",
          "Zendesk setup, support workflow design, automation and routing, knowledge base structure, reporting, and integration with Salesforce and Microsoft 365, from a Zendesk partner based in Malvern, Pennsylvania.",
          "Customer Support & Service Operations",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      <PageHero
        eyebrow="Zendesk partner"
        title={
          <>
            <span className="text-oa-orange">Zendesk</span> implementation
            partner &amp; support
          </>
        }
        lede="We're a Zendesk partner, under a partner agreement signed in 2026. We set Zendesk up, build the ticket workflow around how your team already works, automate the routing, and connect it to the CRM you already run — so support and sales stop emailing each other for context."
        panel={{
          title: "What we help you do",
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
        <EnterpriseRow id="what" tone="surface" units={WHAT} />
        <EnterpriseRow id="handoffs" tone="night" heading={{ id: "h-handoffs", title: "Salesforce and Microsoft 365 handoffs", lede: "The fix for most support problems sits in the systems around Zendesk." }} units={HANDOFFS} />

        <SmartSection id="checklist" labelledBy="h-checklist">
          <SmartUnit
            headingId="h-checklist"
            title="Zendesk implementation checklist"
            lede="Ten checks, in the order they run, from listing channels to training agents on real tickets."
            lead="The order matters: ownership and routing come before anyone logs in."
          >
            <ol style={{ marginTop: 24, columns: "20em 2", columnGap: 40 }}>
              {CHECKLIST.map((c, i) => (
                <li key={c} style={{ display: "flex", gap: 14, padding: "10px 0", borderTop: "1px solid var(--hair)", breakInside: "avoid" }}>
                  <span className="sf-mono" aria-hidden="true" style={{ color: "var(--orange-text)", paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </SmartUnit>
        </SmartSection>

        <EnterpriseFacts
          id="zd-facts"
          tone="surface"
          title="Zendesk in numbers, from Zendesk"
          lede="These are Zendesk's own published figures about its platform, not claims about our work."
          items={[
            { n: "80,000+", t: "companies served, per Zendesk" },
            { n: "1,800+", t: "apps, partners and integrations in the Marketplace" },
            { n: "90%", t: "of users deploy in 8 weeks or less, per Zendesk" },
          ]}
          sourceLine="Zendesk partner page, read 31 October 2026"
          verifyId="zd"
        />
        <EnterpriseRow id="partner" units={PARTNER} />
        <EnterpriseRow id="cost" tone="surface" units={COST} />
        <SmartSection id="related" labelledBy="h-related">
          <SmartUnit
            headingId="h-related"
            title="Related services"
            lede="Zendesk work usually sits beside Salesforce, IT consulting or marketing technology."
            points={["Salesforce consulting for the CRM side", "IT consulting for the wider estate", "MarTech for marketing data"]}
          >
            <div className="sf-links" style={{ marginTop: 16 }}>
              {L("/services/it-consulting", "IT consulting")} {L("/services/salesforce", "Salesforce consulting")} {L("/services/martech", "MarTech consulting")}
            </div>
          </SmartUnit>
        </SmartSection>
        <DeskCTA
          heading="Tell us where support is leaking"
          lede="A backlog nobody can explain, tickets bouncing between groups, or a Zendesk somebody set up and left."
          covers={["Channels, groups and queues", "Where tickets stall", "What connects to the CRM", "What we would change first"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would change first."]}
          hcLink={false}
          form={{ topic: "zendesk", topicLabel: "Zendesk", need: "zendesk", heading: "Talk to an expert", prompt: "What is your support setup, and what is not working?", submitLabel: "Talk to an expert" }}
        />
        <EnterpriseFaq title="Zendesk questions" items={FAQS} />
        <SourcesDialog id="zd" title="Where these figures come from" intro="The figures on this page are Zendesk's own, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
      </SfPage>
    </Layout>
  );
}

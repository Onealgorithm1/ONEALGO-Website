import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, SmartUnit, GoDeeper, Readouts, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseTable, EnterpriseFaq } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, Statement, EnterpriseSources } from "../../components/v2/enterprise-Visuals";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Zendesk. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit), revised (round 2)
 * to seven sections: hand-off plate, handoff cards, checklist split, readouts, table, cost + proof; then FAQ, one
 * Sources line and the CTA last. The hero is unchanged.
 *
 * ⛔ WHAT THE RECORD SUPPORTS: a Zendesk Partner Agreement executed 28 May 2026 (DocuSign). "Zendesk partner",
 *    never "certified"; no tier is stated.
 * ⛔ NO DELIVERY CLAIMS: there is no Zendesk client, ticket or project in the record. This page sells the approach.
 * ⛔ Facts (80,000+ customers, 1,800+ Marketplace listings) are Zendesk's own (enterprise/facts.json), read 31 October
 *    2026, shown in the sources pop-up (id "zd"). The "90% deploy in 8 weeks" figure is NOT in facts.json and was cut
 *    (fact-check, round 2). No prices. */

const PATH = "/services/zendesk";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Zendesk setup and Salesforce integration | One Algorithm";
const DESCRIPTION = "Zendesk setup, migration and integration with Salesforce and Microsoft 365. Zendesk partner agreement signed 2026.";

const SOURCES: SfSource[] = [
  { name: "Zendesk: Partners", what: "Ways to partner (resell, refer, implement, technology); 80,000+ customers; 1,800+ Marketplace apps, partners and integrations", read: "read 31 October 2026", page: "https://www.zendesk.com/partners/" },
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
  { q: "What does a Zendesk implementation involve?", a: "A Zendesk implementation covers channels, groups and queues, ticket statuses, triggers and routing, macros, the help center, reporting, and integrations with the CRM and mailboxes you run. We agree ownership and escalation first, then configure.", link: { to: "#h-checklist", label: "The implementation checklist" } },
  { q: "How long does a Zendesk implementation take?", a: "It depends on channels, integrations and migrated data. We set a schedule once we have seen your setup, and we do not quote a standard duration." },
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
        <EVStyles />
        <BridgePlate
          id="what"
          fig={1}
          heading={{ id: "h-do", title: "What we do with Zendesk", lede: "We set Zendesk up around how your team already works, then connect it to the CRM and mailboxes you run." }}
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
          <GoDeeper label="the seven things we cover, and where projects go wrong">
            <p className="sf-rule">We cover setup and configuration; support workflow design; automation and routing; knowledge base structure; reporting and dashboards; Salesforce and CRM integration; and the Microsoft 365 handoffs. The point of the workflow is that a ticket cannot quietly sit unowned for three days.</p>
            <p>Most Zendesk problems are not Zendesk problems: queues copied from demo data instead of your escalation paths, macros nobody maintains, a help center organized by your org chart, reports that need exporting to a spreadsheet, and an integration that shows the agent nothing useful. We fix ownership first.</p>
          </GoDeeper>
        </BridgePlate>

        <SmartSection id="handoffs" tone="night" heading={{ id: "h-handoffs", title: "Salesforce and Microsoft 365 handoffs", lede: "The fix for most support problems sits in the systems around Zendesk." }}>
          <HoverCards
            cols={2}
            items={[
              { glyph: "link", kicker: "CRM side", title: "Zendesk and Salesforce", body: "An agent sees the account and its open opportunities, and a rep sees the open tickets. Standard integration; middleware only where the data models differ.", to: "/services/salesforce-integration", cta: "Salesforce integration" },
              { glyph: "mail", kicker: "Mailbox side", title: "Zendesk and Microsoft 365", body: "Shared mailboxes routed in, side conversations out to Outlook and Teams, and a path for people who are not agents but must still answer.", to: "/services/it-consulting", cta: "IT consulting" },
            ]}
          />
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
            lede="Configuring the tool before settling ownership just automates the confusion."
            points={["No owner for tickets that cross teams", "Customer data split across systems", "Dashboards built before targets were agreed"]}
            delay={0.08}
          />
        </SmartSection>

        <SmartSection id="zd-facts" tone="night" heading={{ id: "h-zdnum", title: "Zendesk in numbers, from Zendesk", lede: "These are Zendesk's own published figures about its platform, not claims about our work." }}>
          <Readouts
            withEvidence={false}
            className="ev-r2"
            items={[
              { value: 80000, label: "or more companies served, per Zendesk", source: <>Zendesk partner page</> },
              { value: 1800, label: "or more apps, partners and integrations in the Marketplace", source: <>Zendesk partner page</> },
            ]}
          />
        </SmartSection>

        <EnterpriseTable
          id="vs"
          tone="paper"
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

        <SmartSection id="cost" tone="surface" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c6"
            headingId="h-cost"
            title="What a Zendesk implementation costs"
            lede="Cost follows scope: channels, groups, automations, integrations and how much existing data comes across."
            lead="We scope in writing once we know the setup, and publish no rate card."
            points={["Channels and groups to configure", "Integrations with Salesforce and Microsoft 365", "Data coming from another help desk"]}
          />
          <div className="sf-c6" style={{ display: "grid", gap: 20, alignContent: "start" }}>
            <Statement className="">A Zendesk partner under an agreement signed in 2026. We claim nothing beyond it.</Statement>
            <p>This page describes our approach, not past Zendesk projects. {L("/contact", "Ask us exactly what we have and have not done")}. Related: {L("/services/it-consulting", "IT consulting")}, {L("/services/salesforce", "Salesforce consulting")}, {L("/services/martech", "MarTech consulting")}.</p>
          </div>
        </SmartSection>

        <EnterpriseFaq title="Zendesk questions" items={FAQS} />
        <EnterpriseSources id="zd" text="Zendesk partner page, read 31 October 2026." />
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

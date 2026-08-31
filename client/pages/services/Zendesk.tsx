import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Settings,
  LifeBuoy,
  Zap,
  BookOpen,
  BarChart3,
  Share2,
  Workflow,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Zendesk - 2026 refresh, copy rewritten 2026-08-12.
 *
 * WHERE THE PARTNER CLAIM LIVES NOW
 *
 * The previous pass moved "certified Zendesk partner" to the hero eyebrow so it
 * appeared once instead of three times. Since then PageHero stopped rendering
 * eyebrows at all (see the note in components/site.tsx), so the claim was
 * visible nowhere on the page while still sitting in the meta description. It
 * is back, once, in the hero lede.
 *
 * "CERTIFIED" WAS DROPPED, 2026-08-12. The partnership is real and documented:
 * a signed Zendesk Partner Agreement (SharePoint, 08_Contracts/
 * Partners_and_Subcontractors/Zendesk, executed May 2026), a completed Zendesk
 * Global Due Diligence Questionnaire signed 20 May 2026, and ongoing partner
 * enablement with a Zendesk account team. So "Zendesk partner" is supported.
 *
 * "Certified" is a different word. Zendesk uses it for individual exam-based
 * credentials, and nothing in the record shows anyone here holds one. Signing a
 * partner agreement makes you a partner, not a certified one, and on a site
 * whose whole argument is that its claims can be checked, the stronger move is
 * the smaller word.
 *
 * STILL OPEN: /services/salesforce names its AppExchange listing id, so a
 * reader can look it up without asking. There is no equivalent public
 * reference here -- Zendesk's partner directory could not be verified from
 * this machine. If OneAlgorithm appears in it, link the listing and this
 * becomes checkable rather than merely true.
 *
 * The capability copy was the least generic on the site and is kept in the same
 * order; each body now names the actual Zendesk object it means (triggers,
 * macros, Explore, side conversations) instead of describing the category.
 */

const CAPABILITIES = [
  {
    icon: Settings,
    title: "Zendesk setup and configuration",
    body: "Support, agent workspaces, groups, brands and business rules — set up around your existing team structure rather than around Zendesk's defaults.",
  },
  {
    icon: LifeBuoy,
    title: "Support workflow design",
    body: "Ticket lifecycle, statuses, SLAs, triggers and escalation paths. The point of all of it is that a ticket can't quietly sit unowned for three days.",
  },
  {
    icon: Zap,
    title: "Automation and routing",
    body: "Routing rules, macros and triggers, so the tickets that can be answered from a template are, and the rest reach someone who can actually fix them.",
  },
  {
    icon: BookOpen,
    title: "Knowledge base structure",
    body: "Help-center categories and articles arranged so customers find the answer themselves and agents can link to it instead of retyping it.",
  },
  {
    icon: BarChart3,
    title: "Reporting and dashboards",
    body: "Explore dashboards for ticket volume, first-response and resolution times, and backlog by group — so a manager can answer “are we behind?” without exporting anything.",
  },
  {
    icon: Share2,
    title: "Salesforce / CRM integration",
    body: "Connect Zendesk to Salesforce so an agent sees the account and its open opportunities, and a rep sees the open tickets. Usually the standard integration; middleware where the two data models don't line up.",
  },
  {
    icon: Workflow,
    title: "Microsoft 365 and the handoffs",
    body: "Shared mailboxes routed in, side conversations out to Outlook and Teams, and a path for the people who aren't agents but still have to answer something.",
  },
];

export default function Zendesk() {
  useSEO({
    title: "Zendesk Implementation & Support Services | OneAlgorithm",
    description:
      "Zendesk implementation and support: setup, workflow design, automation, knowledge base, reporting and Salesforce integration. A Zendesk partner.",
    canonical: getCanonicalUrl("/services/zendesk"),
    keywords:
      "Zendesk implementation, Zendesk support, Zendesk configuration, Zendesk automation, Zendesk Salesforce integration, customer support software, help desk setup",
    ogTitle: "Zendesk Implementation & Support Services | OneAlgorithm",
    ogDescription:
      "Implement, configure, integrate, and optimize Zendesk for customer support and service operations. Zendesk partner.",
    ogUrl: getCanonicalUrl("/services/zendesk"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Zendesk Implementation & Support — OneAlgorithm",
    twitterDescription:
      "Implement, configure, integrate, and optimize Zendesk for customer support and service operations.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Zendesk Implementation & Support",
          "OneAlgorithm helps organizations implement, configure, integrate, and optimize Zendesk for customer support, service operations, workflow automation, reporting, and CRM alignment.",
          "Customer Support & Service Operations",
          "https://onealgorithm.com/services/zendesk",
        )}
      />

      <PageHero
        eyebrow="Zendesk partner"
        title={
          <>
            <span className="text-oa-orange">Zendesk</span> Implementation &amp;
            Support
          </>
        }
        lede="We're a Zendesk partner, under a partner agreement signed in 2026. We set Zendesk up, build the ticket workflow around how your team already works, automate the routing, and connect it to the CRM you already run — so support and sales stop emailing each other for context."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written.
        //
        // The footer carries the SBA line only. The Zendesk partner status is
        // now stated in the lede directly above; repeating it in the same hero
        // is the repetition the file comment describes.
        panel={{
          title: "What we help you do",
          items: [
            "Zendesk setup and configuration",
            "Support workflow design",
            "Automation and routing",
            "Reporting and dashboards",
            "Salesforce / CRM integration",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Capabilities"
          title="What we help you do with Zendesk"
          lede="Most of this is decisions rather than software: who owns a ticket, when it escalates, what a customer should be able to answer themselves. Configuring it is the easy half."
        />
        <CardGrid columns={3} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Most Zendesk problems aren't Zendesk problems"
          lede="They're the ticket that needs someone in finance, or the customer whose record lives in three systems. We do the Salesforce, CRM and Microsoft 365 side too, which is usually where the fix has to happen."
        />
        <div className="mt-10">
          <CheckList
            items={[
              "Configuration built around your real escalation paths, not the demo data",
              "Automation for the repetitive tickets, so agents get the ones that need a person",
              "Integration with Salesforce, your CRM, and Microsoft 365",
              "Reporting a manager can read without exporting it to a spreadsheet first",
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Tell us where support is leaking"
        body="A backlog nobody can explain, tickets bouncing between groups, or a Zendesk somebody set up two years ago and left. We'll tell you what we'd change first."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper" compact>
        <SocialShare />
      </Section>
    </Layout>
  );
}

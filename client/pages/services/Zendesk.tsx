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

/* Zendesk - 2026 refresh.
 *
 * Presentation only; the SEO block and the service schema are unchanged.
 *
 * The "certified Zendesk partner" claim is pre-existing and is kept, but it now
 * appears ONCE on the page - in the hero eyebrow. It previously ran three
 * times in the visible copy (hero badge, section heading, opening sentence),
 * which reads as insistence rather than credential. The section heading and the
 * paragraph beneath it were tightened to remove the repetition only; no other
 * wording changed.
 *
 * Also gone: the 24rem decorative square holding a single LifeBuoy icon.
 */

const CAPABILITIES = [
  {
    icon: Settings,
    title: "Zendesk setup and configuration",
    body: "Stand up and configure Zendesk Support, agent workspaces, groups, and business rules aligned to how your team actually works.",
  },
  {
    icon: LifeBuoy,
    title: "Support workflow design",
    body: "Design ticket lifecycles, SLAs, triggers, and escalation paths that keep support responsive and organized.",
  },
  {
    icon: Zap,
    title: "Automation and routing",
    body: "Automate ticket routing, macros, and business rules to reduce manual work and speed resolution.",
  },
  {
    icon: BookOpen,
    title: "Knowledge base structure",
    body: "Structure help-center content and categories so customers can self-serve and agents resolve faster.",
  },
  {
    icon: BarChart3,
    title: "Reporting and dashboards",
    body: "Build reports and dashboards for visibility into ticket volume, response times, and team performance.",
  },
  {
    icon: Share2,
    title: "Salesforce / CRM integration",
    body: "Connect Zendesk with Salesforce or your CRM so support and sales share a single view of the customer.",
  },
  {
    icon: Workflow,
    title: "Microsoft 365 & operational workflow alignment",
    body: "Align Zendesk with Microsoft 365 and your operational workflows for a connected support operation.",
  },
];

export default function Zendesk() {
  useSEO({
    title: "OneAlgorithm — Zendesk Implementation & Support",
    description:
      "Zendesk Implementation & Support from OneAlgorithm — setup, configuration, support workflow design, automation, knowledge base, reporting, and Salesforce/CRM integration. One Algorithm is a certified Zendesk partner.",
    canonical: getCanonicalUrl("/services/zendesk"),
    keywords:
      "Zendesk implementation, Zendesk support, Zendesk configuration, Zendesk automation, Zendesk Salesforce integration, customer support software, help desk setup",
    ogTitle: "OneAlgorithm — Zendesk Implementation & Support",
    ogDescription:
      "Implement, configure, integrate, and optimize Zendesk for customer support and service operations. Certified Zendesk partner.",
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
        eyebrow="Certified Zendesk partner"
        title={
          <>
            <span className="text-oa-orange">Zendesk</span> Implementation &amp;
            Support
          </>
        }
        lede="One Algorithm helps organizations implement, configure, integrate, and optimize Zendesk for customer support, service operations, workflow automation, reporting, and CRM alignment."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written.
        //
        // The footer carries the SBA line only. "Certified Zendesk partner" is
        // true and belongs on this page, but it is already the hero eyebrow
        // directly above - repeating it inside the same hero is the exact
        // repetition the file comment above removed.
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
          lede="From first setup to ongoing optimization — a connected, efficient support operation."
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
          title="A support platform that fits the rest of your operation"
          lede="We pair Zendesk expertise with deep integration experience across Salesforce, CRM, and Microsoft 365 — so your support platform fits into the rest of your operation instead of standing alone."
        />
        <div className="mt-10">
          <CheckList
            items={[
              "Configuration aligned to your real support workflows",
              "Automation that reduces manual, repetitive work",
              "Integration with Salesforce / CRM and Microsoft 365",
              "Reporting that gives leadership real visibility",
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Ready to get more out of Zendesk?"
        body="Let's talk about implementing, integrating, or optimizing Zendesk for your team."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper" compact>
        <SocialShare />
      </Section>
    </Layout>
  );
}

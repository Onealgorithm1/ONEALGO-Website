import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Briefcase,
  Users,
  Zap,
  LifeBuoy,
  TrendingUp,
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

/* Salesforce - 2026 refresh, copy rewritten 2026-08-12.
 *
 * The refresh was presentation only. This pass replaces the copy, which was
 * category filler: "End-to-end Salesforce expertise that drives adoption,
 * delivers results, and accelerates business growth" is a sentence about no
 * firm in particular.
 *
 * THE CLAIM THAT WAS DELETED RATHER THAN REWORDED
 *
 * "Proven Track Record - Successful Salesforce implementations across
 * industries with strong adoption and ROI metrics." The previous pass flagged
 * this and left it for a human. There is no case study, client name, adoption
 * figure or ROI number anywhere in this repository, so the claim had nothing
 * behind it. It is now a card that says we have nothing published and offers a
 * sandbox walkthrough instead - which is a thing we can actually do.
 *
 * WHAT IS KEPT BECAUSE IT IS TRUE AND CHECKABLE
 * The AppExchange Consulting Partner listing (a0N3A00000EV7SwUAL, the same id
 * carried on the homepage credentials table) and the SBA certification. Naming
 * the listing id is deliberate: a reader can look it up, which is the whole
 * difference between a credential and an adjective.
 *
 * TKTK - if a client ever agrees to be named, the "nothing published" card is
 * where a real example goes. Do not fill it with anything else.
 */

const PILLARS = [
  {
    icon: Briefcase,
    title: "Before you buy licences",
    description:
      "How your sales and support teams work now, which edition you actually need, and whether Salesforce is the right answer at all. Sometimes it isn't, and that's a cheaper thing to find out at this stage.",
    details: [
      "What the current process is, including the workarounds",
      "Which clouds and edition you need — and which you don't",
      "A licence count and a rough cost, before anyone signs",
      "How the data gets in, and what it has to stay in step with",
      "Who owns and administers the org after we leave",
    ],
  },
  {
    icon: Zap,
    title: "Configuration and build",
    description:
      "Org setup, Sales Cloud and Service Cloud, and automation for the steps your team currently does by hand. Custom objects only where the standard model genuinely doesn't fit.",
    details: [
      "Org setup: profiles, permission sets, page layouts",
      "Sales Cloud and Service Cloud configuration",
      "Custom objects and fields where standard ones don't fit",
      "Flow automation for the manual steps",
      "Apex only where clicks genuinely can't do the job",
    ],
  },
  {
    icon: Users,
    title: "Data migration and integration",
    description:
      "Getting the records out of the system you're leaving, cleaning them, loading them, and proving the totals still match. Then the API work that keeps Salesforce in step with everything else.",
    details: [
      "Extract and profile the legacy data before moving any of it",
      "Dedupe and map fields; agree in writing what gets dropped",
      "Load, then reconcile record counts and totals",
      "REST and SOAP integrations, or middleware where that's cheaper",
      "Scheduled syncs, with an alert when one fails",
    ],
  },
  {
    icon: LifeBuoy,
    title: "After go-live",
    description:
      "Hypercare for the first 30-90 days, while the people who have to use it every day find the things nobody thought of. Then ongoing administration at whatever level you need.",
    details: [
      "Hypercare, typically 30-90 days",
      "Training for admins and for the people using it daily",
      "Reports and dashboards changed as the questions change",
      "Ongoing administration and release-window testing",
      "24/7 technical support across the time zones you operate in",
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: TrendingUp,
    title: "A listing you can look up",
    description:
      "Salesforce lists us on the AppExchange as a Consulting Partner, listing a0N3A00000EV7SwUAL. It's a record in someone else's registry, which is worth more than an adjective in ours.",
  },
  {
    icon: Users,
    title: "The same people throughout",
    description:
      "Salesforce-certified consultants and developers. The person who scopes your org is the person who configures it — with four of us, that isn't a promise, it's arithmetic.",
  },
  {
    icon: Zap,
    title: "No case studies to show you",
    description:
      "We haven't published Salesforce client work or adoption numbers, and we won't invent any. What we can do is build a slice of your process in a sandbox and let you judge that instead.",
  },
];

export default function Salesforce() {
  useSEO({
    title: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    description:
      "Salesforce implementation and consulting from a listed Consulting Partner: Sales Cloud and Service Cloud configuration, data migration from your current system, integrations, and Hypercare after go-live.",
    canonical: getCanonicalUrl("/services/salesforce"),
    keywords:
      "Salesforce implementation, Salesforce consulting, Salesforce CRM, Salesforce development, Salesforce migration, Salesforce administration, Salesforce optimization",
    ogTitle: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    ogDescription:
      "Salesforce implementation from a listed Consulting Partner: Sales Cloud and Service Cloud configuration, data migration, integrations, and Hypercare after go-live.",
    ogUrl: getCanonicalUrl("/services/salesforce"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Implementation & Consulting - OneAlgorithm",
    twitterDescription:
      "Sales Cloud and Service Cloud configuration, data migration, integrations, and Hypercare after go-live. Listed Salesforce Consulting Partner.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Implementation & Consulting Services",
          "Salesforce implementation and consulting: Sales Cloud and Service Cloud configuration, custom objects and Flow automation, data migration and reconciliation, API integrations, and Hypercare support after go-live.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce",
        )}
      />

      <PageHero
        eyebrow="Salesforce"
        title={
          <>
            <span className="text-oa-orange">Salesforce</span> implementation
            and consulting
          </>
        }
        lede="We configure Sales Cloud and Service Cloud, move the data off whatever you're on now, wire it to the other systems you run, and stay on afterwards while people learn it. We're a listed Salesforce Consulting Partner."
        // Panel items describe the four sections below. Each names a real
        // deliverable; nothing here is a claim about past work.
        panel={{
          title: "What that involves",
          items: [
            "Sales Cloud and Service Cloud configuration",
            "Custom objects where the standard model doesn't fit",
            "Migration from your current system, reconciled before cutover",
            "Integrations, with alerts when a sync fails",
            "Hypercare for 30-90 days after go-live",
          ],
          footer: [
            "Salesforce Consulting Partner",
            "SBA Certified WOSB / EDWOSB",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What the work actually is"
          lede="Most engagements run all four in order. If you have an admin already and only need the migration, take that one."
        />
        <CardGrid columns={2} className="mt-12">
          {PILLARS.map((p) => (
            <Card
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.description}
            >
              <div className="mt-6">
                <CheckList items={p.details} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why us, and what we can't show you"
          lede="Two of these are checkable in a public registry. The third is the thing most firms in this category would rather not put on the page."
        />
        <CardGrid columns={3} className="mt-12">
          {DIFFERENTIATORS.map((d) => (
            <Card
              key={d.title}
              icon={d.icon}
              title={d.title}
              body={d.description}
            />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Tell us what your Salesforce is doing wrong"
        body="An org nobody trusts the data in, a migration that stalled, or a renewal you're not sure you should sign. Describe the symptom and we'll tell you what we'd look at first."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare className="justify-center" />
      </Section>
    </Layout>
  );
}

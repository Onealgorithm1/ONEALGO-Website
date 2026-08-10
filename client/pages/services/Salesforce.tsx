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

/* Salesforce - 2026 refresh.
 *
 * Presentation only; all pillar and differentiator copy is carried over
 * verbatim. Three structural changes:
 *
 *  1. The four pillars no longer hide their detail behind a click. The old
 *     accordion was a plain <div> card with an onClick - not focusable, not
 *     keyboard operable, no aria state.
 *  2. The hero's three proof lines were <li> elements inside a <div>, which is
 *     invalid markup; they are now the hero's right-hand panel.
 *  3. The decorative Award medallion beside the hero is gone. It carried no
 *     copy and implied a certification the page does not name.
 *
 * Left alone deliberately: the "Proven Track Record" card. It is a
 * proof-shaped claim with no named proof behind it, which is a copy decision
 * for a human, not a presentation one.
 */

const PILLARS = [
  {
    icon: Briefcase,
    title: "Strategic Consulting",
    description:
      "Business requirements analysis and roadmap development to align Salesforce with corporate goals.",
    details: [
      "Current state assessment and gap analysis",
      "Salesforce edition and product roadmapping",
      "Organizational adoption and change management strategy",
      "ROI modeling and business case development",
      "Integration and data strategy planning",
    ],
  },
  {
    icon: Zap,
    title: "Core Implementation",
    description:
      "End-to-end Salesforce deployment including Sales Cloud, Service Cloud, and custom applications.",
    details: [
      "Salesforce org setup and configuration",
      "Sales Cloud and Service Cloud deployment",
      "Custom object and field design",
      "Workflow automation and process builder setup",
      "Integration with third-party applications",
    ],
  },
  {
    icon: Users,
    title: "Data Migration & Integration",
    description:
      "Secure data migration from legacy systems and seamless integration with your existing tech stack.",
    details: [
      "Data extraction and transformation",
      "Salesforce data loading and validation",
      "System integration using APIs and middleware",
      "Ongoing data synchronization setup",
      "Data quality assurance and reconciliation",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Post-Implementation Support",
    description:
      "Managed services, optimization, and Hypercare support following go-live.",
    details: [
      "30-90 day Hypercare support with dedicated resources",
      "User training and enablement programs",
      "Performance monitoring and optimization",
      "Ongoing administration and maintenance",
      "Continuous improvement and roadmap evolution",
    ],
  },
];

const DIFFERENTIATORS = [
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description:
      "Successful Salesforce implementations across industries with strong adoption and ROI metrics.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Certified Salesforce architects and developers who stay current with platform innovations.",
  },
  {
    icon: Zap,
    title: "End-to-End Partnership",
    description:
      "From strategy through post-implementation support, we're with you every step of the way.",
  },
];

export default function Salesforce() {
  useSEO({
    title: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    description:
      "Full-lifecycle Salesforce implementation services including strategic consulting, CRM deployment, custom development, data migration, and ongoing support. Expert Salesforce consultants for your business transformation.",
    canonical: getCanonicalUrl("/services/salesforce"),
    keywords:
      "Salesforce implementation, Salesforce consulting, Salesforce CRM, Salesforce development, Salesforce migration, Salesforce administration, Salesforce optimization",
    ogTitle: "OneAlgorithm — Salesforce Implementation & Consulting Services",
    ogDescription:
      "Full-lifecycle Salesforce implementation services from strategy to post-go-live support. Expert Salesforce consultants dedicated to your success.",
    ogUrl: getCanonicalUrl("/services/salesforce"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Implementation & Consulting - OneAlgorithm",
    twitterDescription:
      "Full-lifecycle Salesforce implementation services from strategy to post-go-live support.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Implementation & Consulting Services",
          "Expert Salesforce implementation, consulting, and support services for Sales Cloud, Service Cloud, and custom applications. Full-lifecycle expertise.",
          "CRM & Salesforce Solutions",
          "https://onealgorithm.com/services/salesforce",
        )}
      />

      <PageHero
        eyebrow="Salesforce"
        title={
          <>
            <span className="text-oa-orange">Salesforce</span> Implementation &
            Consulting
          </>
        }
        lede="End-to-end Salesforce expertise that drives adoption, delivers results, and accelerates business growth."
        // The hero bullets moved into the panel rather than being duplicated.
        // Same three lines, same words. No new claims. The footer names the
        // AppExchange listing, which is Salesforce-specific and belongs on
        // this page only.
        panel={{
          title: "How we deliver",
          items: [
            "Expert team of Salesforce-certified consultants and developers.",
            "Proven approach across Sales Cloud, Service Cloud, and custom applications.",
            "Post-implementation Hypercare and ongoing optimization.",
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
          title="Four pillars of success"
          lede="A comprehensive full-lifecycle approach to Salesforce implementation"
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
          title="Why choose OneAlgorithm for Salesforce?"
          lede="We combine Salesforce expertise with deep business transformation knowledge to deliver implementations that drive measurable impact."
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
        title="Ready to transform with Salesforce?"
        body="Let's discuss how Salesforce can drive growth and efficiency for your organization."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare className="justify-center" />
      </Section>
    </Layout>
  );
}

import React from "react";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { Factory, Cog, BarChart3, Shield, Clock, Zap } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  CTABand,
} from "../../components/site";

/* Manufacturing - 2026 refresh.
 *
 * Presentation only: the copy is carried over unchanged. This page was the
 * worst of the three for off-brand colour - green-500 was doing the job of the
 * brand orange in the hero, the CTA, the feature hovers and the tick discs.
 *
 * Section order is inverted relative to construction: the outcome list leads
 * and the feature grid follows, so the two pages do not read as one template
 * with the nouns swapped.
 */

const FEATURES = [
  {
    icon: BarChart3,
    title: "Production Tracking",
    body: "Track production, inventory, and supply chain activity in one unified platform.",
  },
  {
    icon: Cog,
    title: "Workflow Automation",
    body: "Automated workflows reduce downtime and optimize capacity planning.",
  },
  {
    icon: Shield,
    title: "Quality Control",
    body: "Real-time quality control monitoring and defect tracking.",
  },
  {
    icon: Clock,
    title: "Predictive Maintenance",
    body: "Predictive maintenance scheduling to prevent equipment failures.",
  },
  {
    icon: Zap,
    title: "Resource Optimization",
    body: "Resource optimization ensures maximum efficiency and minimal waste.",
  },
  {
    icon: Factory,
    title: "Connected Systems",
    body: "Integrated systems provide live data insights across all operations.",
  },
];

const BENEFITS = [
  "Increase Efficiency: streamlined workflows and automated processes reduce waste and maximize output.",
  "Prevent Downtime: predictive maintenance and real-time monitoring keep equipment running smoothly.",
  "Improve Quality: continuous monitoring and defect tracking ensure consistent product quality.",
  "Data-Driven Decisions: real-time analytics provide insights for continuous improvement.",
];

export default function Manufacturing() {
  useSEO({
    title: "Manufacturing Solutions — OneAlgorithm",
    description:
      "Production tracking, workflow automation, quality control, and predictive maintenance for manufacturers.",
    canonical: getCanonicalUrl("/industries/manufacturing"),
    ogTitle: "Manufacturing Solutions — OneAlgorithm",
    ogDescription:
      "Integrated systems delivering live data insights across operations.",
    ogUrl: getCanonicalUrl("/industries/manufacturing"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="Manufacturing"
        title={
          <>
            Manufacturing <span className="text-oa-orange">solutions</span>
          </>
        }
        lede="Boost efficiency with connected systems, streamlined production workflows, and live data insights."
        // Panel is the feature grid's own titles, read off the same array. No
        // new capability appears here that the page does not already describe.
        panel={{
          title: "What you get",
          items: FEATURES.map((f) => f.title),
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />

      <Section tone="surface">
        <SectionHeading
          eyebrow="Why us"
          title="Why choose our manufacturing solutions?"
        />
        <div className="mt-10 max-w-3xl">
          <CheckList items={BENEFITS} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What you get"
          title="Manufacturing management features"
          lede="Advanced tools designed to optimize production processes and increase operational efficiency."
        />
        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              body={feature.body}
            />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Ready to optimize production?"
        body="Discover how our manufacturing solutions can transform your operations and increase efficiency."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
    </Layout>
  );
}

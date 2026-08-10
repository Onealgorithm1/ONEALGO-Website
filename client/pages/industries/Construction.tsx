import React from "react";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  Shield,
  Zap,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  CTABand,
} from "../../components/site";

/* Construction - 2026 refresh.
 *
 * Presentation only: the copy is carried over unchanged. What went was the
 * bouncing 96px hero icon, the orange feature icons (1.95:1 on white), the
 * orange tick discs, and the shadowed "Ready to Transform Your Projects?" box -
 * that box was a second CTA sitting above the real one, so its copy now drives
 * the closing band instead of being duplicated.
 *
 * Section order here is features -> benefits. Manufacturing and e-commerce run
 * a different order deliberately; the three pages were byte-identical templates.
 */

const FEATURES = [
  {
    icon: Calendar,
    title: "Project Scheduling",
    body: "Centralize schedules, budgets, and communication to avoid delays and costly missteps.",
  },
  {
    icon: Users,
    title: "Team Coordination",
    body: "Integrations link field teams, subcontractors, and back-office operations seamlessly.",
  },
  {
    icon: Shield,
    title: "Safety Management",
    body: "Automated compliance tracking and safety protocol management keep projects secure.",
  },
  {
    icon: DollarSign,
    title: "Cost Control",
    body: "Real-time budget tracking and expense management prevent cost overruns.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    body: "Field updates sync directly with office management systems for instant visibility.",
  },
  {
    icon: Building2,
    title: "Project Tracking",
    body: "Single, clear view of every project milestone and progress tracking.",
  },
];

const BENEFITS = [
  "Reduce Project Delays: centralized communication and automated workflows keep everyone aligned.",
  "Improve Safety Compliance: automated tracking ensures all safety protocols are followed.",
  "Control Costs: real-time budget monitoring prevents expensive overruns.",
  "Enhance Collaboration: field teams and office staff work from the same real-time data.",
];

export default function Construction() {
  useSEO({
    title: "Construction Solutions — OneAlgorithm",
    description:
      "Project scheduling, team coordination, safety, and cost control solutions for construction firms.",
    canonical: getCanonicalUrl("/industries/construction"),
    ogTitle: "Construction Solutions — OneAlgorithm",
    ogDescription:
      "Smarter coordination and real-time visibility from field to office.",
    ogUrl: getCanonicalUrl("/industries/construction"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="Construction"
        title={
          <>
            Construction <span className="text-oa-orange">solutions</span>
          </>
        }
        lede="Keep projects on track with smarter coordination, automated task management, and real-time visibility from the field to the office."
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

      <Section tone="paper">
        <SectionHeading
          eyebrow="What you get"
          title="Construction management features"
          lede="Comprehensive tools designed specifically for construction project management and coordination."
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

      <Section tone="surface" bordered>
        <Split
          left={
            <SectionHeading
              eyebrow="Why us"
              title="Why choose our construction solutions?"
            />
          }
          right={<CheckList items={BENEFITS} />}
        />
      </Section>

      <CTABand
        title="Ready to transform your projects?"
        body="See how our construction solutions can streamline your operations and improve project outcomes."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
    </Layout>
  );
}

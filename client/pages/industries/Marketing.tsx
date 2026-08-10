import React from "react";
import Layout from "../../components/Layout";
import { Target, TrendingUp, Users, Zap, BarChart3, Mail } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";

/* Marketing industry page - 2026 refresh.
 *
 * Converted onto the shared primitives. Two things beyond the visual system:
 *
 *  1. The page was near-verbatim identical to /services/marketing. The copy is
 *     unchanged, but the framing now answers "you run marketing, here is what
 *     you get" rather than repeating the service capability list. The hero
 *     links across to the service page so the two stop competing.
 *  2. Purple was the accent on every icon, hover border and tick. It is not a
 *     brand colour. Icons are brand blue on light, orange on dark; the tick
 *     rows became cards so the bold lead-ins survive.
 *
 * No claim on this page changed. See REDESIGN-NOTES.md.
 */

const FEATURES = [
  {
    icon: Target,
    title: "Campaign Management",
    body: "Create campaigns that adapt instantly to customer behavior and preferences.",
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Insights",
    body: "Leverage artificial intelligence to understand customer patterns and optimize strategies.",
  },
  {
    icon: Users,
    title: "Customer Journeys",
    body: "Design personalized customer journeys from first touch to conversion.",
  },
  {
    icon: BarChart3,
    title: "ROI Tracking",
    body: "Advanced analytics for ROI tracking and campaign optimization.",
  },
  {
    icon: Mail,
    title: "Lead Nurturing",
    body: "Automated lead nurturing and customer retention workflows.",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    body: "Streamline repetitive tasks and focus on strategic initiatives.",
  },
];

/* Previously four tick rows with a bold lead-in. As cards the lead-in keeps its
 * own weight without a coloured bullet doing the work. Copy is unchanged. */
const BENEFITS = [
  {
    title: "Increase Conversions",
    body: "Personalized campaigns drive higher engagement and conversion rates.",
  },
  {
    title: "Optimize ROI",
    body: "Data-driven insights ensure marketing budgets deliver maximum returns.",
  },
  {
    title: "Automate Workflows",
    body: "Free your team to focus on strategy while automation handles routine tasks.",
  },
  {
    title: "Build Relationships",
    body: "Nurture leads and customers with personalized experiences.",
  },
];

export default function Marketing() {
  useSEO({
    title: "Marketing Solutions — OneAlgorithm",
    description:
      "Campaign management, AI insights, journeys, and automation for growth teams.",
    canonical: getCanonicalUrl("/industries/marketing"),
    ogTitle: "Marketing Solutions — OneAlgorithm",
    ogDescription:
      "Personalized experiences and measurable ROI across channels.",
    ogUrl: getCanonicalUrl("/industries/marketing"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="Industries — Marketing"
        title={
          <>
            Data-Driven Marketing{" "}
            <span className="text-oa-orange">Solutions</span>
          </>
        }
        lede="Create campaigns that adapt instantly to customer behavior and preferences with AI-driven insights and automated lead nurturing."
        // Panel is the feature grid's own titles, read off the same array. No
        // new capability appears here that the page does not already describe.
        panel={{
          title: "What a marketing team gets",
          items: FEATURES.map((f) => f.title),
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{
          label: "View marketing services",
          to: "/services/marketing",
        }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="For marketing and growth teams"
          title="What a marketing team gets"
          lede="Comprehensive marketing tools designed to drive engagement, conversions, and customer loyalty."
        />

        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((f) => (
            <Card key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why Choose Our Marketing Solutions?"
        />

        <CardGrid columns={2} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Ready to Transform Your Marketing?"
        body="See how our marketing solutions can drive better results and increase customer engagement."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
    </Layout>
  );
}

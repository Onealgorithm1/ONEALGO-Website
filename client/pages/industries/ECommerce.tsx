import React from "react";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Users,
  BarChart3,
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

/* E-Commerce - 2026 refresh.
 *
 * Presentation only: the copy is carried over unchanged. Same clean-up as the
 * other two industry pages - green-500 accents removed, bouncing hero icon
 * removed, the duplicate shadowed CTA box folded into the closing band.
 *
 * The outcome list runs as two columns here rather than construction's
 * heading-beside-list split or manufacturing's single stack.
 */

const FEATURES = [
  {
    icon: ShoppingCart,
    title: "Platform Integration",
    body: "Scale your online business with integrated platforms that connect inventory, payments, and customer data.",
  },
  {
    icon: Package,
    title: "Order Management",
    body: "Streamlined order processing from purchase to delivery with real-time tracking.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    body: "Secure, seamless payment processing with multiple gateway integrations.",
  },
  {
    icon: Users,
    title: "Customer Experience",
    body: "Personalized shopping experiences that drive conversion and customer loyalty.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    body: "Comprehensive analytics to understand customer behavior and optimize sales.",
  },
  {
    icon: Zap,
    title: "Automation",
    body: "Automated inventory management, pricing, and customer communications.",
  },
];

const BENEFITS = [
  "Increase Sales: optimized checkout processes and personalized experiences boost conversion rates.",
  "Streamline Operations: automated inventory and order management reduce manual work.",
  "Enhance Customer Loyalty: personalized shopping experiences keep customers coming back.",
  "Scale Efficiently: integrated systems grow with your business without complexity.",
];

export default function ECommerce() {
  useSEO({
    title: "E‑Commerce Solutions — OneAlgorithm",
    description:
      "Platform integration, order management, payments, and analytics for online retail.",
    canonical: getCanonicalUrl("/industries/ecommerce"),
    ogTitle: "E‑Commerce Solutions — OneAlgorithm",
    ogDescription:
      "Scale your online business with connected systems and automation.",
    ogUrl: getCanonicalUrl("/industries/ecommerce"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="E‑Commerce"
        title={
          <>
            E‑Commerce technology{" "}
            <span className="text-oa-orange">solutions</span>
          </>
        }
        lede="Scale your online business with integrated platforms that connect inventory, payments, and customer data for streamlined operations."
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
          title="E-Commerce management features"
          lede="Complete e-commerce solutions designed to maximize sales and enhance customer experiences."
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
        <SectionHeading
          eyebrow="Why us"
          title="Why choose our e-commerce solutions?"
        />
        <Split
          className="mt-10"
          left={<CheckList items={BENEFITS.slice(0, 2)} />}
          right={<CheckList items={BENEFITS.slice(2)} />}
        />
      </Section>

      <CTABand
        title="Ready to scale your e-commerce?"
        body="Discover how our e-commerce solutions can increase sales and streamline your online operations."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
    </Layout>
  );
}

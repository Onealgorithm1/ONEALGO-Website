import React from "react";
import Layout from "../components/Layout";
import {
  Building2,
  Factory,
  ShoppingCart,
  Landmark,
  Megaphone,
  Code,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createWebPageSchema,
} from "../components/StructuredData";

/* Industries hub - 2026 refresh.
 *
 * Three substantive changes beyond the visual system:
 *
 *  1. The grid was visually inconsistent - three cards used `border-2` and the
 *     two later additions used `border-0 shadow-lg`, so the same grid carried
 *     two card designs. All six are now the one shared <Card>.
 *  2. GOVERNMENT was missing. The nav links /industries/government and the page
 *     exists, but the hub a visitor actually browses had no route in.
 *  3. ELIGIBILITY IS NOT EXPERIENCE. The firm is SBA-certified WOSB/EDWOSB and
 *     SAM registered but has NOT been awarded a government contract, so the
 *     Government card is phrased as eligibility and registration only. It uses
 *     the same wording as the homepage. Nothing here claims federal delivery.
 *
 * Copy is carried over. The one claim dropped is the hero pill - "combined 40+
 * years of sector experience | Avg. 30-40% efficiency improvements
 * post-implementation" - two unsourced numbers in a proof-shaped box, the same
 * pattern removed from the services hub. See REDESIGN-NOTES.md.
 */

const INDUSTRIES = [
  {
    icon: Building2,
    title: "Construction",
    body: "Keep projects on track with smarter coordination, automated task management, and real-time visibility from the field to the office.",
    to: "/industries/construction",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    body: "Boost efficiency with connected systems, streamlined production workflows, and live data insights.",
    to: "/industries/manufacturing",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    body: "Scale your online business with integrated platforms that connect inventory, payments, and customer data for streamlined operations.",
    to: "/industries/ecommerce",
  },
  {
    icon: Landmark,
    title: "Government",
    body: "Set-aside eligible and SAM registered, with NAICS and PSC codes published for market research.",
    to: "/industries/government",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    body: "Connect the tools that generate demand — campaigns, analytics and CRM — so every enquiry is measured and nothing is lost between systems.",
    to: "/industries/marketing",
  },
  {
    icon: Code,
    title: "Website Development",
    body: "Sites built to be found and to convert — fast, accessible, and measurable, rather than rebuilt every time the business changes.",
    to: "/industries/website-development",
  },
];

export default function Industries() {
  useSEO({
    title: "OneAlgorithm — Industries We Serve",
    description:
      "Specialized technology solutions for Construction, Manufacturing, and E-Commerce. Tailored IT consulting, automation, and digital transformation services.",
    canonical: getCanonicalUrl("/industries"),
    keywords:
      "industry technology solutions, construction technology, manufacturing technology, e-commerce technology, industry-specific IT consulting, digital transformation by industry",
    ogTitle: "OneAlgorithm — Industries We Serve",
    ogDescription:
      "Specialized technology solutions for Construction, Manufacturing, and E-Commerce industries.",
    ogUrl: getCanonicalUrl("/industries"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle:
      "Industry-Focused Technology Solutions - OneAlgorithm | Construction, Manufacturing & E-Commerce",
    twitterDescription:
      "Specialized technology solutions for Construction, Manufacturing, and E-Commerce industries. Tailored IT consulting, automation, and digital transformation services by OneAlgorithm.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      <StructuredData
        data={createWebPageSchema(
          "Industry-Focused Technology Solutions - OneAlgorithm | Construction, Manufacturing & E-Commerce",
          "Specialized technology solutions for Construction, Manufacturing, and E-Commerce industries. Tailored IT consulting, automation, and digital transformation services.",
          "https://onealgorithm.com/industries",
        )}
      />

      <PageHero
        eyebrow="Industries"
        title={
          <>
            Industry-focused{" "}
            <span className="text-oa-orange">technology expertise</span>
          </>
        }
        lede="Deep understanding of your industry's operational challenges, compliance requirements, and competitive pressures. We deliver solutions tailored to your specific market dynamics."
        // The panel is the same six verticals the grid below lists, read off the
        // one array so the two can never disagree. No new sectors or claims.
        panel={{
          title: "Where we work",
          items: INDUSTRIES.map((i) => i.title),
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Where we work"
          title="We specialize in these key vertical markets"
          lede="Industry-focused consulting that understands your unique operational challenges, compliance requirements, and competitive pressures. Choose your industry below to see how we help companies like yours."
        />

        <CardGrid columns={3} className="mt-12">
          {INDUSTRIES.map((industry) => (
            <Card
              key={industry.title}
              icon={industry.icon}
              title={industry.title}
              body={industry.body}
              to={industry.to}
            />
          ))}
        </CardGrid>

        <p className="mt-10 max-w-3xl text-oa-ink2">
          <strong className="font-semibold text-oa-ink">
            Not sure if you fit a specific industry?
          </strong>{" "}
          Contact us to discuss your business model and technology needs.
        </p>
      </Section>

      <CTABand
        title="Don't see your industry?"
        body="We work with businesses across many sectors. Let's discuss how our solutions can be tailored to your specific industry needs."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View our services", to: "/services" }}
      />
    </Layout>
  );
}

import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Zap, Database, User2, Megaphone, Target, Plug } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* MarTech services - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx.
 *
 *  1. The closing "MarTech Success Stories" section is DELETED. A heading that
 *     announces its own absent content ("available on request") reads as "we
 *     have none", and it sat exactly where a buyer looks for evidence. Nothing
 *     was invented in its place. See REDESIGN-NOTES.md.
 *  2. The bouncing alert glyph above the H1 is gone, along with the orange
 *     card borders and drop shadows.
 *  3. This page argues first and lists second - the case for us opens, the
 *     stack capabilities follow on the dark ground, and the audit offer is its
 *     own band. That is deliberately not the order used on /services/seo or
 *     /services/google-ads, which were clones of this same template.
 *
 * All body copy is carried over unchanged.
 */

const CAPABILITIES = [
  {
    icon: Zap,
    title: "Marketing Automation",
    body: "Automate multi-channel campaigns, lead nurturing, and customer journeys to deliver the right message at the right time.",
  },
  {
    icon: Database,
    title: "Customer Data & Insights",
    body: "Collect, unify, and analyze customer data across channels to build a 360° customer profile and actionable dashboards.",
  },
  {
    icon: User2,
    title: "Personalization & CX",
    body: "Deliver tailored content, offers, and product recommendations across web, mobile, and email to increase engagement and retention.",
  },
  {
    icon: Megaphone,
    title: "Digital Advertising & Media",
    body: "Plan, execute, and optimize paid media across Google, Meta, LinkedIn, and programmatic channels to improve targeting and ROI.",
  },
  {
    icon: Target,
    title: "Campaign Management",
    body: "Strategy and execution for multi-channel campaigns with testing, optimization, and clear KPI-driven reporting.",
  },
  {
    icon: Plug,
    title: "Integration & Enablement",
    body: "Connect MarTech tools with CRM, e-commerce, and service systems and enable teams with training and operational playbooks.",
  },
];

const WHY_US = [
  "Combine marketing strategy and engineering to deliver scalable, measurable programs.",
  "Centralize customer data to power personalization and better ad targeting.",
  "Automate repetitive tasks so your team focuses on strategy and growth.",
  "Transparent reporting, experimentation, and optimization for continuous improvement.",
];

export default function Martech() {
  useSEO({
    title: "OneAlgorithm — MarTech Services",
    description:
      "MarTech services that make marketing data-driven, automated, and personalized. We help you connect tools, centralize customer data, and deliver tailored experiences that drive conversions.",
    canonical: getCanonicalUrl("/services/martech"),
    keywords:
      "MarTech, marketing technology, marketing automation, customer data platform, personalization, digital advertising, campaign management, marketing integration",
    ogTitle: "OneAlgorithm — MarTech Services",
    ogDescription:
      "Turn technology into marketing advantage. Our MarTech solutions automate campaigns, centralize customer data, and personalize experiences across channels to increase revenue and save time.",
    ogUrl: getCanonicalUrl("/services/martech"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — MarTech Services",
    twitterDescription:
      "Automate marketing, centralize customer data, and deliver personalized experiences with OneAlgorithm's MarTech services.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "MarTech Services",
          "Marketing technology services that automate campaigns, centralize customer data, and personalize customer experiences to increase revenue.",
          "Marketing",
          "https://onealgorithm.com/services/martech",
        )}
      />

      <PageHero
        eyebrow="MarTech"
        title={
          <>
            MarTech services —{" "}
            <span className="text-oa-orange">
              marketing technology that scales
            </span>
          </>
        }
        lede="Use technology to make marketing faster, smarter, and more personalized — from automation and advertising to customer data platforms and integrations."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. No platform credential exists for MarTech, so the footer
        // carries only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Marketing Automation",
            "Customer Data & Insights",
            "Personalization & CX",
            "Digital Advertising & Media",
            "Integration & Enablement",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Request a MarTech Consultation", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      {/* Argument first: heading on the left, the claims on the right, so the
          page opens with a position rather than another icon grid. */}
      <Section tone="paper">
        <Split
          left={
            <SectionHeading
              eyebrow="Why OneAlgorithm"
              title="Why OneAlgorithm for MarTech?"
            />
          }
          right={<CheckList items={WHY_US} />}
        />
      </Section>

      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="What we do"
          title="MarTech capabilities"
          lede="End-to-end MarTech solutions — automation, customer data, personalization, paid media, and integrations that deliver measurable ROI."
        />
        <CardGrid columns={3} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card
              key={c.title}
              tone="dark"
              icon={c.icon}
              title={c.title}
              body={c.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Low-commitment second CTA, given its own band rather than a boxed
          card, so it does not read as a third capability. */}
      <Section tone="surface" bordered>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-h3 font-semibold text-oa-ink">
              Get a MarTech Audit
            </h2>
            <p className="mt-4 leading-relaxed text-oa-ink2">
              Our audit evaluates your stack, data flows, automation, and
              personalization readiness with prioritized recommendations and
              estimated impact.
            </p>
          </div>
          <PrimaryCTA to="/contact">Request Audit</PrimaryCTA>
        </div>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        secondary={{ label: "Explore marketing", to: "/services/marketing" }}
      />
    </Layout>
  );
}

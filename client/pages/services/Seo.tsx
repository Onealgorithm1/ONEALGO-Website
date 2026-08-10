import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Globe,
  TrendingUp,
  Link as LinkIcon,
  CheckCircle,
  BarChart3,
} from "lucide-react";
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

/* SEO services - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx. Three things
 * went beyond the visual system:
 *
 *  1. The closing "Recent SEO Wins" section is DELETED. It was a heading whose
 *     only content was "case studies ... available on request", which reads to
 *     a buyer as "we have none". Nothing was invented to replace it - the share
 *     row it wrapped is kept as a plain utility band. See REDESIGN-NOTES.md.
 *  2. The bouncing exclamation-mark glyph in the hero is gone. It was a generic
 *     alert icon animating above the H1 of an SEO page.
 *  3. Section order runs capabilities -> case for us + the audit offer, so the
 *     page does not repeat the shape of the MarTech and Google Ads pages.
 *
 * All body copy is carried over unchanged.
 */

const CAPABILITIES = [
  {
    icon: Globe,
    title: "Technical SEO Audits",
    body: "Comprehensive audits to fix crawlability, indexability, site architecture, and Core Web Vitals issues.",
  },
  {
    icon: BarChart3,
    title: "Keyword & Content Strategy",
    body: "Data-driven content plans that target high-value queries and improve topical authority.",
  },
  {
    icon: LinkIcon,
    title: "Link Building & Outreach",
    body: "Ethical outreach and authority-building campaigns to improve domain signals and referral traffic.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & CRO",
    body: "Track performance, run experiments, and optimize pages to convert the traffic we bring.",
  },
  {
    icon: CheckCircle,
    title: "Local & Enterprise SEO",
    body: "Local listings, citation management, and scalable strategies for multi-location or large sites.",
  },
];

const WHY_US = [
  "Proven track record increasing organic sessions and conversions.",
  "Technical-first approach to fix root causes of poor visibility.",
  "Content programs aligned to product/market fit and revenue goals.",
  "Transparent reporting and continuous improvement via testing.",
];

export default function Seo() {
  useSEO({
    title: "OneAlgorithm — SEO Services",
    description:
      "SEO Services to increase organic visibility, improve technical health, and drive qualified traffic through content, technical optimizations, and data-driven strategies.",
    canonical: getCanonicalUrl("/services/seo"),
    keywords:
      "SEO services, technical SEO, content SEO, link building, organic traffic, search engine optimization, local SEO",
    ogTitle: "OneAlgorithm — SEO Services",
    ogDescription:
      "Increase organic visibility and drive qualified traffic with OneAlgorithm's technical SEO, content strategy, and analytics-driven optimizations.",
    ogUrl: getCanonicalUrl("/services/seo"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — SEO Services",
    twitterDescription:
      "Increase organic visibility and drive qualified traffic with OneAlgorithm's technical SEO, content strategy, and analytics-driven optimizations.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "SEO Services",
          "Technical SEO, content strategy, and data-driven optimization to grow organic traffic and visibility.",
          "Marketing",
          "https://onealgorithm.com/services/seo",
        )}
      />

      <PageHero
        eyebrow="SEO Services"
        title={
          <>
            SEO services{" "}
            <span className="text-oa-orange">for sustainable growth</span>
          </>
        }
        lede="Technical SEO, content strategy, and analytics-driven optimization to increase qualified organic traffic and revenue."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. No platform credential exists for SEO, so the footer carries
        // only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Technical SEO Audits",
            "Keyword & Content Strategy",
            "Link Building & Outreach",
            "Analytics & CRO",
            "Local & Enterprise SEO",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="SEO capabilities"
          lede="Full-service SEO: from technical fixes to content and outreach that drive measurable results."
        />
        <CardGrid columns={3} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      {/* The case for us and the audit offer sit side by side, so the argument
          and the low-commitment next step are read together. */}
      <Section tone="paper" bordered>
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Why OneAlgorithm"
                title="Why OneAlgorithm for SEO?"
              />
              <div className="mt-8">
                <CheckList items={WHY_US} />
              </div>
            </>
          }
          right={
            <Card>
              <h3 className="text-h3 font-semibold text-oa-ink">
                Get an SEO Audit
              </h3>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                Our audit includes site crawl, Core Web Vitals review, content
                gaps, and prioritized fixes with estimated impact.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="surface" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}

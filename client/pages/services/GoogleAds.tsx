import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  DollarSign,
  Target,
  Zap,
  BarChart3,
  RefreshCw,
  Users,
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

/* Google Ads management - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx.
 *
 *  1. The closing "Paid Media Success Stories" section is DELETED. It promised
 *     campaign examples and then offered them "on request", which tells a buyer
 *     there are none to show. No replacement was invented - the share row it
 *     wrapped survives as a utility band. See REDESIGN-NOTES.md.
 *  2. The bouncing alert glyph above the H1, the orange hover borders and the
 *     card shadows are gone.
 *  3. Structure differs from /services/seo and /services/martech, which were
 *     clones of the same template: six capabilities run two-up on the surface
 *     ground so each gets room for its longer body, and the argument plus the
 *     audit offer close the page together on the dark ground.
 *
 * All body copy is carried over unchanged.
 */

const CAPABILITIES = [
  {
    icon: DollarSign,
    title: "Campaign Setup & Strategy",
    body: "Structure accounts and campaigns to align with business goals, target high-intent keywords, and create scalable account architectures.",
  },
  {
    icon: Target,
    title: "Audience Targeting & Remarketing",
    body: "Advanced audience segmentation, remarketing lists, and customer match to re-engage users and improve conversion rates.",
  },
  {
    icon: Zap,
    title: "Bid Management & Optimization",
    body: "Continuous bid and budget optimization using data-driven rules and smart bidding strategies to maximize ROI.",
  },
  {
    icon: BarChart3,
    title: "Creative & Landing Page Testing",
    body: "A/B test ad creatives and landing pages to improve Quality Score and conversion rates across campaigns.",
  },
  {
    icon: RefreshCw,
    title: "Measurement & Attribution",
    body: "Implement tracking, conversion measurement, and attribution models that reveal true campaign performance and LTV.",
  },
  {
    icon: Users,
    title: "Reporting & Optimization",
    body: "Transparent dashboards and weekly optimizations with clear KPIs focused on cost-per-acquisition and revenue.",
  },
];

const WHY_US = [
  "Performance-first approach focused on reducing CPA and increasing ROAS.",
  "Technical tracking and attribution to understand true campaign impact.",
  "Continuous testing and optimization of creatives and landing pages.",
  "Transparent reporting with clear recommendations and next steps.",
];

export default function GoogleAds() {
  useSEO({
    title: "OneAlgorithm — Google Ads Management",
    description:
      "Drive measurable leads and revenue with expert Google Ads management. We build, optimize, and scale paid search campaigns focused on high-converting traffic and ROI.",
    canonical: getCanonicalUrl("/services/google-ads"),
    keywords:
      "Google Ads management, PPC agency, paid search, search advertising, Google Ads optimization, paid media, remarketing, conversion tracking",
    ogTitle: "OneAlgorithm — Google Ads Management",
    ogDescription:
      "Full-service Google Ads: campaign setup, targeting, bidding, creative testing, and measurement to maximize return on ad spend (ROAS).",
    ogUrl: getCanonicalUrl("/services/google-ads"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Google Ads Management",
    twitterDescription:
      "Scale paid search performance with OneAlgorithm's Google Ads strategy, optimization, and measurement services.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Google Ads Management",
          "Professional Google Ads management and paid search services to generate leads and revenue through optimized campaigns and measurement.",
          "Marketing",
          "https://onealgorithm.com/services/google-ads",
        )}
      />

      <PageHero
        eyebrow="Google Ads"
        title={
          <>
            Google Ads management —{" "}
            <span className="text-oa-orange">paid search that converts</span>
          </>
        }
        lede="Cut wasted spend and grow revenue with performance-focused Google Ads campaigns, expert optimization, and robust measurement."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. There is no Google Partner claim anywhere on this site, so
        // the footer carries only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Campaign Setup & Strategy",
            "Audience Targeting & Remarketing",
            "Bid Management & Optimization",
            "Creative & Landing Page Testing",
            "Measurement & Attribution",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Request Google Ads Audit", to: "/contact" }}
        secondary={{ label: "Back to Marketing", to: "/services/marketing" }}
      />

      {/* Two-up rather than three-up: these bodies are the longest of the three
          marketing pages, and a 3-column grid ragged them badly. */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What we do"
          title="Google Ads capabilities"
          lede="Full-service Google Ads: strategy, audience targeting, optimization, creative testing, and transparent reporting."
        />
        <CardGrid columns={2} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid>
        <Split
          left={
            <>
              <SectionHeading
                tone="dark"
                eyebrow="Why OneAlgorithm"
                title="Why OneAlgorithm for Google Ads?"
              />
              <div className="mt-8">
                <CheckList items={WHY_US} tone="dark" />
              </div>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Get a Google Ads Audit
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                Our audit examines account structure, conversion tracking,
                audience strategy, and recommendations to lower CPA and improve
                performance.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Request Audit</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}

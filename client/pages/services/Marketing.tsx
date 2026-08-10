import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Mail,
  Facebook,
  CalendarDays,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  Prose,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Marketing & Social Media - 2026 refresh.
 *
 * Presentation only. Two things to know before editing:
 *
 *  1. The page used to run on purple (#a855f7) - a fourth color that belongs
 *    to no part of the brand - plus a bouncing star. Both are gone; the page
 *    now uses the same blue/orange system as the rest of the site.
 *  2. The Social Media Management block below is COMPLIANCE COPY. See the
 *     comment on that section before touching a word of it.
 *
 * The mid-page "Ready to Transform Your Marketing?" card became the closing
 * CTA band, which the page previously did not have - its copy is unchanged.
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

const SOCIAL_CAPABILITIES = [
  {
    icon: Facebook,
    title: "Facebook & Instagram",
    body: "Day-to-day management of the Facebook Pages and Instagram business accounts our clients connect to us, kept consistent with their brand.",
  },
  {
    icon: CalendarDays,
    title: "Content Planning & Publishing",
    body: "Campaign calendars, scheduled posts and coordinated launches across every channel a client asks us to run.",
  },
  {
    icon: LineChart,
    title: "Performance Reporting",
    body: "Follower growth, reach and engagement collected from each connected account and reported back in plain language — not screenshots of dashboards.",
  },
  {
    icon: ShieldCheck,
    title: "Access & Governance",
    body: "Clients keep ownership of their own accounts and grant us access as a partner. They can withdraw it at any time.",
  },
];

/* The three "How it works" steps. Wording is fixed - see the section comment. */
const HOW_IT_WORKS = [
  {
    title: "You grant access",
    body: "You add One Algorithm as a partner on your own business account. Your Pages and profiles stay yours throughout.",
  },
  {
    title: "We manage and measure",
    body: "We publish and maintain your content, and collect the audience and engagement figures each platform reports.",
  },
  {
    title: "You see the results",
    body: "One report covering every channel, so you can tell what is working without logging into five different tools.",
  },
];

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
    title: "OneAlgorithm — Marketing & Social Media Management Services",
    description:
      "Marketing services including social media management for Facebook Pages and Instagram business accounts, campaign management, AI-driven insights, and performance reporting for our clients.",
    canonical: getCanonicalUrl("/services/marketing"),
    keywords:
      "social media management, Facebook Page management, Instagram management, marketing services, campaign management, AI marketing, customer journey optimization, marketing analytics, digital marketing automation",
    ogTitle: "OneAlgorithm — Marketing & Social Media Management Services",
    ogDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    ogUrl: getCanonicalUrl("/services/marketing"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Marketing & Social Media Management Services",
    twitterDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Marketing & Social Media Management Services",
          "Social media management for client-owned Facebook Pages and Instagram business accounts — content planning, publishing and performance reporting — alongside campaign management, AI-driven insights and customer journey optimization.",
          "Marketing",
          "https://onealgorithm.com/services/marketing",
        )}
      />

      <PageHero
        eyebrow="Marketing & Social Media"
        title={
          <>
            Marketing Services &amp;{" "}
            <span className="text-oa-orange">Automation Solutions</span>
          </>
        }
        lede="We manage social media accounts for our clients and build campaigns that adapt to customer behavior — with AI-driven insights, automated lead nurturing, and reporting that shows what their marketing is actually doing."
        // Panel items are the FEATURES card titles from further down this page,
        // verbatim. No hero bullets existed here and nothing new was written.
        panel={{
          title: "What we deliver",
          items: [
            "Campaign Management",
            "AI-Driven Insights",
            "Customer Journeys",
            "Lead Nurturing",
            "ROI Tracking",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Marketing management features"
          lede="Comprehensive marketing tools designed to drive engagement, conversions, and customer loyalty."
        />
        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((f) => (
            <Card key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Social Media Management
          Describes the service exactly as it is delivered, including which
          platform data we read and why. Meta's Access Verification review
          checks this page against what the business claims it does, so the
          wording here and in that submission must stay in step.

          DO NOT reword anything in this section - the capability cards, the
          "How it works" steps and the "How we use platform data" paragraphs are
          all compliance-facing copy. The 2026 refresh restyled it and left
          every word intact.

          The #social-media-management anchor is referenced from outside this
          page, so it is carried on a wrapper div - Section takes no id. */}
      <div id="social-media-management" className="scroll-mt-24">
        <Section tone="surface" bordered>
          <SectionHeading
            eyebrow="Social media"
            title="Social Media Management"
            lede="We manage the Facebook Pages and Instagram business accounts our clients own — planning and publishing content, keeping profiles current, and reporting on what each channel is delivering."
          />

          <CardGrid columns={4} className="mt-12">
            {SOCIAL_CAPABILITIES.map((c) => (
              <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
            ))}
          </CardGrid>

          <div className="mt-16">
            <SectionHeading title="How it works" />
            <div className="mt-10">
              <ProcessSteps steps={HOW_IT_WORKS} />
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading title="How we use platform data" />
            <Prose className="mt-6">
              <p>
                To deliver this service we read information from the accounts
                our clients connect to us: Page and profile details, follower
                counts, post performance and engagement figures. We use it for
                one purpose — running and reporting on that client&rsquo;s own
                marketing.
              </p>
              <p>
                We do not sell it, we do not combine one client&rsquo;s data
                with another&rsquo;s, and our access ends when the engagement
                ends. Nothing is published to a client&rsquo;s account without
                their approval.
              </p>
            </Prose>
          </div>
        </Section>
      </div>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why choose our marketing solutions?"
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

      <Section tone="paper" compact>
        <SocialShare title="Social Media Management & Marketing Solutions - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

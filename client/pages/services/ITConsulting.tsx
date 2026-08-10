import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Brain,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Users,
  Globe,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* IT Consulting - 2026 refresh.
 *
 * Presentation only. Every claim, the SEO block and the service schema are
 * carried over unchanged. What went:
 *
 *  - The frosted "Strategic IT Guidance" panel in the hero. It was a decorative
 *    box holding an icon and a tagline, and it pushed the hero bullets into a
 *    half-width column.
 *  - The mid-page "Ready to Transform Your IT Strategy?" card. It was the third
 *    identical CTA on the page; the closing band already carries that job.
 *
 * The four bolded "Industry Experience" rows became cards, so the internal
 * links to construction, manufacturing and e-commerce survive intact.
 */

const SERVICES = [
  {
    icon: Brain,
    title: "Strategic IT Planning",
    body: "Develop comprehensive IT strategies aligned with your business objectives and growth plans.",
  },
  {
    icon: Shield,
    title: "Security Assessment",
    body: "Evaluate your current security posture and implement robust cybersecurity measures.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    body: "Guide your organization through digital transformation initiatives and technology adoption.",
  },
  {
    icon: Globe,
    title: "Cloud Strategy",
    body: "Design and implement cloud migration strategies for scalability and cost optimization.",
  },
  {
    icon: BarChart3,
    title: "Performance Optimization",
    body: "Analyze and optimize your IT infrastructure for maximum efficiency and performance.",
  },
  {
    icon: Lightbulb,
    title: "Technology Innovation",
    body: "Identify emerging technologies and innovative solutions to drive competitive advantage.",
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Strategic Alignment",
    body: "Ensure IT investments align with business goals and deliver measurable ROI.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Advantage",
    body: "Leverage technology to gain a competitive edge in your market.",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    body: "Identify and mitigate technology risks before they impact your business.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    body: "Access to experienced IT consultants with deep industry knowledge.",
  },
];

const PROCESS = [
  {
    title: "Assessment",
    body: "Comprehensive evaluation of your current IT landscape and business requirements.",
  },
  {
    title: "Strategy",
    body: "Development of customized IT strategies and roadmaps aligned with your goals.",
  },
  {
    title: "Implementation",
    body: "Guided implementation of recommended solutions with ongoing support.",
  },
  {
    title: "Optimization",
    body: "Continuous monitoring and optimization to ensure maximum value and performance.",
  },
];

export default function ITConsulting() {
  useSEO({
    title: "OneAlgorithm — IT Consulting",
    description:
      "Expert IT consulting for strategic planning, technology audits, digital transformation, and cybersecurity. Drive business growth with proven IT expertise.",
    canonical: getCanonicalUrl("/services/it-consulting"),
    keywords:
      "IT consulting, strategic IT planning, technology audit, digital transformation, cybersecurity consulting, business process optimization, IT strategy",
    ogTitle: "OneAlgorithm — IT Consulting",
    ogDescription:
      "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization. Drive growth with OneAlgorithm's IT expertise.",
    ogUrl: getCanonicalUrl("/services/it-consulting"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "IT Consulting Services - OneAlgorithm",
    twitterDescription:
      "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization. Drive growth with OneAlgorithm's IT expertise.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "IT Consulting Services",
          "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization.",
          "IT Consulting",
          "https://onealgorithm.com/services/it-consulting",
        )}
      />

      <PageHero
        eyebrow="IT Consulting"
        title={
          <>
            IT <span className="text-oa-orange">Consulting</span> &amp; Digital
            Transformation
          </>
        }
        lede="Comprehensive IT consulting services to help you make informed technology decisions and drive business transformation."
        // The hero bullets moved into the panel rather than being duplicated.
        // Same four lines, same words. The lede is the "What we do" section
        // lede, verbatim. No new claims.
        panel={{
          title: "How we help",
          items: [
            "Strategic technology planning and roadmaps.",
            "Expert guidance for digital transformation.",
            "Risk assessment and security optimization.",
            "Technology solutions aligned with business goals.",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Our IT consulting services"
          lede="Comprehensive IT consulting services to help you make informed technology decisions and drive business transformation."
        />
        <CardGrid columns={3} className="mt-12">
          {SERVICES.map((s) => (
            <Card key={s.title} icon={s.icon} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why choose our IT consulting?"
          lede="Partner with us to unlock the full potential of technology for your business."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How we work"
          title="Our consulting process"
          lede="A proven methodology that delivers results and drives sustainable technology transformation."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Experience"
          title="Industry experience and expertise"
        />
        <CardGrid columns={2} className="mt-12">
          <Card
            title="Cross-Industry Knowledge"
            body={
              <>
                Experience across healthcare, finance,{" "}
                <Link
                  to="/industries/manufacturing"
                  className="text-oa-blue underline underline-offset-4"
                >
                  manufacturing
                </Link>
                , and technology sectors including{" "}
                <Link
                  to="/industries/construction"
                  className="text-oa-blue underline underline-offset-4"
                >
                  construction
                </Link>{" "}
                and{" "}
                <Link
                  to="/industries/ecommerce"
                  className="text-oa-blue underline underline-offset-4"
                >
                  e-commerce
                </Link>
                .
              </>
            }
          />
          <Card
            title="Proven Methodologies"
            body="ITIL, COBIT, and agile frameworks for structured consulting approaches."
          />
          <Card
            title="Technology Partnerships"
            body="Strategic relationships with leading technology vendors and platforms."
          />
          <Card
            title="Measurable Results"
            body="Track record of delivering quantifiable business value and ROI."
          />
        </CardGrid>
      </Section>

      <CTABand
        title="Transform Your Technology Strategy"
        body="Partner with our IT consulting experts to unlock technology's full potential for your business."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare title="IT Consulting & Digital Transformation - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

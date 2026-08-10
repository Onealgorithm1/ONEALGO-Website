import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Briefcase,
  Database,
  Zap,
  LifeBuoy,
  TrendingUp,
  Shield,
  Users,
  Target,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  ProcessSteps,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Oracle ERP - 2026 refresh.
 *
 * Presentation only; every pillar, benefit and process step is carried over
 * verbatim. Three structural changes:
 *
 *  1. The four pillars no longer hide their detail behind a click. The old
 *     accordion was a plain <div> card with an onClick - not focusable, not
 *     keyboard operable, no aria state - and it buried the specifics a buyer
 *     is actually scanning for. All five bullets per pillar now render inline.
 *  2. The frosted "Enterprise-Grade Expertise" hero panel is gone; it restated
 *     the bullets beside it in a decorative box.
 *  3. The mid-page CTA is a dark band rather than a white card with an orange
 *     left rule, so it reads as a break in the page rather than a stray widget.
 */

const PILLARS = [
  {
    icon: Briefcase,
    title: "Strategic Consulting",
    description:
      "Business process re-engineering and roadmap development to align Oracle Cloud ERP with corporate goals.",
    details: [
      "Assessment of current systems and processes",
      "Alignment with corporate strategic goals",
      "Detailed roadmap and timeline development",
      "Risk mitigation planning",
      "ROI projections and business case development",
    ],
  },
  {
    icon: Zap,
    title: "End-to-End Implementation",
    description:
      "Full-scale deployment including Financials, Supply Chain Management (SCM), and Human Capital Management (HCM).",
    details: [
      "Oracle Financials module implementation",
      "Supply Chain Management (SCM) setup and configuration",
      "Human Capital Management (HCM) deployment",
      "Change management and training programs",
      "Go-live coordination and cutover planning",
    ],
  },
  {
    icon: Database,
    title: "Data Migration & Integration",
    description:
      "Securely moving legacy data and connecting Oracle with existing third-party applications using OIC (Oracle Integration Cloud).",
    details: [
      "Legacy system data extraction and validation",
      "Data transformation and cleansing",
      "Oracle Integration Cloud (OIC) setup and configuration",
      "Third-party application connectors and integrations",
      "Data integrity verification and reconciliation",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Post-Implementation Support",
    description:
      "Managed services, performance tuning, and 'Hypercare' support following go-live.",
    details: [
      '"Hypercare" support following go-live (typically 30-90 days)',
      "Performance tuning and system optimization",
      "User support and ticket resolution",
      "Ongoing training and documentation",
      "System monitoring and preventive maintenance",
    ],
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Strategic Alignment",
    description:
      "Align your Oracle ERP investment with business objectives for maximum value and ROI.",
  },
  {
    icon: TrendingUp,
    title: "Business Transformation",
    description:
      "Optimize processes and unlock new capabilities to drive competitive advantage.",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    description:
      "Proven methodologies minimize implementation risks and ensure smooth go-live.",
  },
  {
    icon: Users,
    title: "Expert Partnership",
    description:
      "Work with Oracle-certified experts who understand your industry and challenges.",
  },
];

const PROCESS = [
  {
    title: "Discovery & Assessment",
    body: "Comprehensive evaluation of current systems, processes, and business requirements.",
  },
  {
    title: "Strategy & Planning",
    body: "Development of detailed implementation roadmap with clear milestones and deliverables.",
  },
  {
    title: "Implementation & Deployment",
    body: "Execute configuration, customization, data migration, and user training.",
  },
  {
    title: "Support & Optimization",
    body: "Post-go-live support, optimization, and continuous improvement for sustained success.",
  },
];

export default function OracleERP() {
  useSEO({
    title: "OneAlgorithm — Oracle ERP Implementation Services",
    description:
      "Full-lifecycle Oracle Cloud ERP implementation services including strategic consulting, end-to-end deployment, data migration, and post-implementation support. Position your enterprise for success with OneAlgorithm.",
    canonical: getCanonicalUrl("/services/oracle-erp"),
    keywords:
      "Oracle ERP implementation, Oracle Cloud ERP, Oracle Financials, Oracle SCM, Oracle HCM, ERP data migration, Oracle integration, enterprise resource planning",
    ogTitle: "OneAlgorithm — Oracle ERP Implementation Services",
    ogDescription:
      "Full-lifecycle Oracle Cloud ERP implementation services including strategic consulting, end-to-end deployment, data migration, and post-implementation support.",
    ogUrl: getCanonicalUrl("/services/oracle-erp"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Oracle ERP Implementation Services - OneAlgorithm",
    twitterDescription:
      "Full-lifecycle Oracle Cloud ERP implementation services from strategy to post-implementation support.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Oracle ERP Implementation Services",
          "Full-lifecycle Oracle Cloud ERP implementation including strategic consulting, end-to-end deployment, data migration, and post-implementation support.",
          "Oracle ERP Implementation",
          "https://onealgorithm.com/services/oracle-erp",
        )}
      />

      <PageHero
        eyebrow="Oracle ERP"
        title={
          <>
            Oracle ERP <span className="text-oa-orange">Implementation</span> &
            Transformation
          </>
        }
        lede="Full-lifecycle Oracle Cloud ERP delivery, from readiness assessment through go-live and the support that follows."
        // The hero bullets moved into the panel rather than being duplicated.
        // Same four lines, same words - they now fill the right-hand column
        // instead of leaving it empty. No new claims.
        panel={{
          title: "Delivered end to end",
          items: [
            "Strategic consulting aligned with corporate goals.",
            "Full-scale deployment across Financials, SCM, and HCM.",
            "Secure data migration with OIC integration.",
            "Post-implementation Hypercare and ongoing optimization.",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Four pillars of success"
          lede="A comprehensive full-lifecycle approach to Oracle ERP implementation"
        />
        <CardGrid columns={2} className="mt-12">
          {PILLARS.map((p) => (
            <Card
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.description}
            >
              <div className="mt-6">
                <CheckList items={p.details} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why choose OneAlgorithm for Oracle ERP?"
          lede="Partner with Oracle implementation experts to maximize your ERP investment."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card
              key={b.title}
              icon={b.icon}
              title={b.title}
              body={b.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid compact>
        <SectionHeading
          tone="dark"
          title="Ready to start your ERP transformation?"
          lede="Get expert guidance on your specific situation. Our consultants will assess your current systems and develop a personalized roadmap for Oracle ERP success."
        />
        <div className="mt-9">
          <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Process"
          title="Our proven implementation approach"
          lede="A structured methodology that ensures successful Oracle ERP deployment."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <CTABand
        title="Ready to transform your enterprise?"
        body="Partner with OneAlgorithm to implement Oracle ERP and position your organization for digital transformation and sustainable growth."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Oracle ERP Implementation Services - OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}

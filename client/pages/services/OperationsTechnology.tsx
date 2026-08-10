import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Cpu,
  Gauge,
  Activity,
  Shield,
  Zap,
  Cog,
  BarChart3,
  Monitor,
  Factory,
  Settings,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  ProcessSteps,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Operations Technology - 2026 refresh.
 *
 * Presentation only. Copy, SEO and the service schema are carried over. What
 * went:
 *
 *  - The frosted "Smart Operations" panel in the hero - decorative, and it
 *    squeezed the hero bullets into half the width.
 *  - The mid-page "Ready to Modernize Your Operations?" card. It was the third
 *    identical CTA; the closing band already does that job.
 *
 * The industry application feature lists became CheckLists inside their cards,
 * and the bolded "Technology Focus Areas" rows became cards, so every line of
 * copy survives.
 */

const SERVICES = [
  {
    icon: Factory,
    title: "Industrial Automation",
    body: "Implement automated systems to optimize manufacturing processes and increase efficiency.",
  },
  {
    icon: Monitor,
    title: "SCADA Systems",
    body: "Design and deploy supervisory control and data acquisition systems for real-time monitoring.",
  },
  {
    icon: Gauge,
    title: "Process Optimization",
    body: "Analyze and optimize operational processes using data-driven insights and advanced analytics.",
  },
  {
    icon: Cpu,
    title: "IoT Integration",
    body: "Connect industrial equipment and sensors for comprehensive operational visibility.",
  },
  {
    icon: Shield,
    title: "OT Security",
    body: "Secure operational technology environments against cyber threats and vulnerabilities.",
  },
  {
    icon: Settings,
    title: "Maintenance Systems",
    body: "Implement predictive and preventive maintenance systems to reduce downtime.",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Operational Efficiency",
    body: "Streamline operations and reduce waste through intelligent automation and optimization.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    body: "Make informed decisions with real-time operational data and advanced analytics.",
  },
  {
    icon: Activity,
    title: "Improved Reliability",
    body: "Enhance system reliability and reduce unplanned downtime through proactive monitoring.",
  },
  {
    icon: Cog,
    title: "Seamless Integration",
    body: "Integrate OT systems with existing IT infrastructure for unified operations.",
  },
];

const APPLICATIONS = [
  {
    title: "Manufacturing",
    body: "Smart factory solutions, production line automation, and quality control systems.",
    features: [
      "Production Monitoring",
      "Quality Assurance",
      "Equipment Optimization",
      "Supply Chain Integration",
    ],
  },
  {
    title: "Construction",
    body: "Project management, site coordination, and building information modeling (BIM) systems.",
    features: [
      "Project Planning",
      "Site Monitoring",
      "Equipment Tracking",
      "Safety Compliance",
    ],
  },
  {
    title: "E-Commerce",
    body: "Inventory management, warehouse automation, and fulfillment optimization systems.",
    features: [
      "Inventory Control",
      "Order Processing",
      "Logistics Automation",
      "Customer Analytics",
    ],
  },
];

const PROCESS = [
  {
    title: "Assessment",
    body: "Evaluate current operational technology infrastructure and identify improvement opportunities.",
  },
  {
    title: "Design",
    body: "Create comprehensive OT architecture and integration strategies tailored to your operations.",
  },
  {
    title: "Implementation",
    body: "Deploy OT solutions with minimal disruption to ongoing operations.",
  },
  {
    title: "Optimization",
    body: "Continuously monitor and optimize systems for peak performance and efficiency.",
  },
];

const FOCUS_AREAS = [
  {
    title: "Industrial IoT",
    body: "Connect equipment, sensors, and systems for comprehensive operational visibility.",
  },
  {
    title: "Edge Computing",
    body: "Process data at the source for real-time decision making and reduced latency.",
  },
  {
    title: "Digital Twins",
    body: "Create virtual representations of physical assets for predictive analytics.",
  },
  {
    title: "AI/ML Integration",
    body: "Apply machine learning for predictive maintenance and process optimization.",
  },
];

export default function OperationsTechnology() {
  useSEO({
    title: "OneAlgorithm — Operations Tech",
    description:
      "Professional operations technology with industrial automation, process optimization, and monitoring systems. Streamline operations with equipment integration.",
    canonical: getCanonicalUrl("/services/operations-technology"),
    keywords:
      "operations technology, industrial automation, process optimization, monitoring systems, equipment integration, OT services, manufacturing technology",
    ogTitle: "OneAlgorithm — Operations Tech",
    ogDescription:
      "Professional operations technology services including industrial automation, process optimization, monitoring systems, and equipment integration. Streamline your operations with OneAlgorithm.",
    ogUrl: getCanonicalUrl("/services/operations-technology"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Operations Technology Services - OneAlgorithm",
    twitterDescription:
      "Professional operations technology services including industrial automation, process optimization, monitoring systems, and equipment integration. Streamline your operations with OneAlgorithm.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Operations Technology Services",
          "Professional operations technology services including industrial automation, process optimization, monitoring systems, and equipment integration.",
          "Operations Technology",
          "https://onealgorithm.com/services/operations-technology",
        )}
      />

      <PageHero
        eyebrow="Operations Technology"
        title={
          <>
            Operations <span className="text-oa-orange">Technology</span>
          </>
        }
        // The hero bullets moved into the panel rather than being duplicated -
        // same four lines, same words, now filling the right-hand column.
        panel={{
          title: "What we deliver",
          items: [
            "Industrial automation and process optimization.",
            "SCADA systems and real-time monitoring.",
            "IoT integration and smart operations.",
            "Secure and reliable operational systems.",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="Operations technology solutions"
          lede="Comprehensive OT solutions that bridge the gap between operational processes and modern technology capabilities."
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
          title="Transform your operations"
          lede="Leverage operations technology to achieve operational excellence and competitive advantage."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Where we work"
          title="Industry applications"
          lede="Tailored operations technology solutions for diverse industrial sectors."
        />
        <CardGrid columns={3} className="mt-12">
          {APPLICATIONS.map((app) => (
            <Card key={app.title} title={app.title} body={app.body}>
              <div className="mt-6">
                <CheckList items={app.features} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="How we work"
          title="Our implementation process"
          lede="A systematic approach to implementing operations technology that ensures minimal disruption and maximum value."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Capabilities" title="Technology focus areas" />
        <CardGrid columns={2} className="mt-12">
          {FOCUS_AREAS.map((f) => (
            <Card key={f.title} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Optimize Your Operations Today"
        body="Transform your industrial operations with cutting-edge technology solutions and expert guidance."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare title="Operations Technology Solutions - SCADA, IoT & Automation - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

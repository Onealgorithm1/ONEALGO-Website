import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Users,
  Clock,
  Target,
  CheckCircle,
  Code,
  Database,
  Smartphone,
  Globe,
  Shield,
  Zap,
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

/* Staff augmentation - 2026 refresh.
 *
 * Presentation only. Every claim, benefit and engagement model is carried over
 * word for word. Two things went:
 *
 *  1. The frosted "Expert Teams / Ready to integrate with your projects" panel
 *     in the hero. It restated the bullets beside it in a decorative box, and
 *     the hero is now type-led rather than two-column.
 *  2. The green CheckCircle rows under each engagement model, replaced by the
 *     shared CheckList - green was a third accent colour nothing else used.
 */

const SKILLS = [
  {
    icon: Code,
    name: "Full-Stack Development",
    description: "React, Node.js, Python, .NET",
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description: "iOS, Android, React Native",
  },
  {
    icon: Database,
    name: "Data Engineering",
    description: "SQL, NoSQL, Big Data, Analytics",
  },
  {
    icon: Globe,
    name: "DevOps & Cloud",
    description: "AWS, Azure, Docker, Kubernetes",
  },
  {
    icon: Shield,
    name: "Cybersecurity",
    description: "Security Audits, Compliance",
  },
  {
    icon: Zap,
    name: "AI & Machine Learning",
    description: "Python, TensorFlow, Data Science",
  },
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Rapid Scaling",
    description:
      "Scale your team up or down quickly based on project needs without the overhead of traditional hiring.",
  },
  {
    icon: Target,
    title: "Specialized Expertise",
    description:
      "Access highly skilled professionals with specific technical expertise for your unique requirements.",
  },
  {
    icon: CheckCircle,
    title: "Cost Effective",
    description:
      "Reduce recruitment costs and overhead while maintaining high-quality deliverables.",
  },
  {
    icon: Users,
    title: "Seamless Integration",
    description:
      "Our professionals integrate seamlessly with your existing team and workflows.",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Dedicated Teams",
    description:
      "Full-time dedicated teams working exclusively on your projects with deep integration into your processes.",
    features: [
      "Full-time commitment",
      "Deep project knowledge",
      "Long-term partnership",
      "Direct communication",
    ],
  },
  {
    title: "Project-Based",
    description:
      "Expert professionals assigned to specific projects with defined deliverables and timelines.",
    features: [
      "Fixed scope delivery",
      "Milestone-based progress",
      "Specialized skills",
      "Defined timelines",
    ],
  },
  {
    title: "Hourly Consulting",
    description:
      "Flexible hourly engagement for specific tasks, code reviews, or technical consultation.",
    features: [
      "Flexible scheduling",
      "Expert consultation",
      "Task-specific help",
      "Cost-effective",
    ],
  },
];

const PROCESS = [
  {
    title: "Requirements Analysis",
    body: "We analyze your project requirements, technical stack, and team dynamics.",
  },
  {
    title: "Talent Matching",
    body: "We select professionals with the exact skills and experience you need.",
  },
  {
    title: "Integration",
    body: "Seamless onboarding and integration with your existing team and processes.",
  },
  {
    title: "Ongoing Support",
    body: "Continuous support and performance monitoring throughout the engagement.",
  },
];

export default function StaffAugmentation() {
  useSEO({
    title: "OneAlgorithm — Staff Augmentation",
    description:
      "Professional staff augmentation with skilled developers, IT specialists, and technical experts. Scale your team efficiently with proven talent solutions.",
    canonical: getCanonicalUrl("/services/staff-augmentation"),
    keywords:
      "staff augmentation, IT staffing, software developers, technical talent, team scaling, remote developers, IT specialists, talent solutions",
    ogTitle: "OneAlgorithm — Staff Augmentation",
    ogDescription:
      "Professional staff augmentation services providing skilled developers, IT specialists, and technical experts. Scale your team efficiently with OneAlgorithm's talent solutions.",
    ogUrl: getCanonicalUrl("/services/staff-augmentation"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Staff Augmentation Services - OneAlgorithm",
    twitterDescription:
      "Professional staff augmentation services providing skilled developers, IT specialists, and technical experts. Scale your team efficiently with OneAlgorithm's talent solutions.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Staff Augmentation Services",
          "Professional staff augmentation services providing skilled developers, IT specialists, and technical experts. Scale your team efficiently with OneAlgorithm's talent solutions.",
          "Staff Augmentation",
          "https://onealgorithm.com/services/staff-augmentation",
        )}
      />

      <PageHero
        eyebrow="Staff Augmentation"
        title={
          <>
            Staff <span className="text-oa-orange">Augmentation</span> Services
          </>
        }
        lede="Get the talent you need, when you need it, without the overhead of traditional hiring."
        // The hero bullets moved into the panel rather than being duplicated.
        // Same four lines, same words. The lede is the "Why it works" section
        // lede, verbatim. No new claims.
        panel={{
          title: "Why it works",
          items: [
            "Flexible staffing for exceptional outcomes.",
            "Scale your workforce without the overhead.",
            "On-demand experts for your projects.",
            "Expert support, exactly when you need it.",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why it works"
          title="Why choose staff augmentation?"
          lede="Get the talent you need, when you need it, without the overhead of traditional hiring."
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

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical expertise"
          lede="Our professionals bring deep expertise across a wide range of technologies and domains."
        />
        <CardGrid columns={3} className="mt-12">
          {SKILLS.map((s) => (
            <Card
              key={s.name}
              icon={s.icon}
              title={s.name}
              body={s.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How we engage"
          title="Flexible engagement models"
          lede="Choose the engagement model that best fits your project requirements and budget."
        />
        <CardGrid columns={3} className="mt-12">
          {ENGAGEMENT_MODELS.map((m) => (
            <Card key={m.title} title={m.title} body={m.description}>
              <div className="mt-6">
                <CheckList items={m.features} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Process"
          title="Our process"
          lede="We follow a structured approach to ensure the right talent for your specific needs."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <CTABand
        title="Ready to scale your team?"
        body="Let's discuss your staffing needs and find the perfect professionals for your projects."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Staff Augmentation - Dedicated Development Teams - OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}

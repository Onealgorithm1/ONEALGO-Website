import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Monitor,
  Smartphone,
  Zap,
  Search,
  Shield,
  Palette,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Website development - 2026 refresh.
 *
 * Presentation only, plus one real defect fixed: the "Schedule a Consultation"
 * button in the old benefits panel had no asChild, no `to` and no onClick, so
 * it did nothing when clicked. That panel is now the closing CTA band and the
 * button links to /contact.
 *
 * Also gone: the bouncing browser-window SVG in the hero (animate-bounce-slow),
 * and the four benefit rows' hand-rolled blue tick circles, which are now
 * hairline cards so the bold lead-in reads as the heading it always was.
 */

const FEATURES = [
  {
    icon: Monitor,
    title: "Modern Design",
    description:
      "Clean, professional websites that reflect your brand and engage your audience.",
  },
  {
    icon: Smartphone,
    title: "Responsive Development",
    description:
      "Websites that work perfectly across all devices and screen sizes.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description:
      "Fast-loading websites built for optimal user experience and search rankings.",
  },
  {
    icon: Search,
    title: "SEO Ready",
    description:
      "Built with search engine optimization best practices from the ground up.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security and reliable hosting for peace of mind.",
  },
  {
    icon: Palette,
    title: "Custom Solutions",
    description:
      "Tailored functionality and integrations to meet your specific business needs.",
  },
];

const BENEFITS = [
  {
    title: "Professional Results",
    description:
      "Clean, modern designs that establish credibility and trust.",
  },
  {
    title: "Better Performance",
    description:
      "Fast-loading, optimized websites improve user experience and search rankings.",
  },
  {
    title: "Mobile-First Design",
    description:
      "Responsive layouts ensure your site works perfectly on all devices.",
  },
  {
    title: "Custom Functionality",
    description:
      "Tailored solutions that meet your unique business requirements.",
  },
];

export default function WebsiteDevelopment() {
  useSEO({
    title: "OneAlgorithm — Website Development",
    description:
      "Professional website development with responsive design, SEO optimization, and e-commerce solutions. Transform your online presence with modern web apps.",
    canonical: getCanonicalUrl("/services/website-development"),
    keywords:
      "website development, web design, responsive websites, e-commerce development, SEO optimization, professional web development, custom websites",
    ogTitle: "OneAlgorithm — Website Development",
    ogDescription:
      "Professional website development services including responsive design, SEO optimization, e-commerce solutions, and modern web applications. Transform your online presence with OneAlgorithm.",
    ogUrl: getCanonicalUrl("/services/website-development"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Website Development Services - OneAlgorithm",
    twitterDescription:
      "Professional website development services including responsive design, SEO optimization, e-commerce solutions, and modern web applications. Transform your online presence with OneAlgorithm.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Website Development Services",
          "Professional website development services including responsive design, SEO optimization, e-commerce solutions, and modern web applications.",
          "Website Development",
          "https://onealgorithm.com/services/website-development",
        )}
      />

      <PageHero
        eyebrow="Website Development"
        title={
          <>
            Website <span className="text-oa-orange">Development</span> &
            Performance Optimization
          </>
        }
        lede="Modern, responsive websites built for performance and user experience. From corporate sites to complex web applications."
        // This hero carried no bullets, so the panel lists the six feature
        // titles from the "What you get" section below, verbatim. No new
        // claims.
        panel={{
          title: "What you get",
          items: [
            "Modern Design",
            "Responsive Development",
            "Performance Optimized",
            "SEO Ready",
            "Secure & Reliable",
            "Custom Solutions",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What you get"
          title="Website development features"
          lede="Comprehensive web development services that create digital experiences designed to engage users and drive results."
        />
        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              icon={f.icon}
              title={f.title}
              body={f.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why choose our web development services?"
        />
        <CardGrid columns={2} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} title={b.title} body={b.description} />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Ready to build your website?"
        body="Let's create a website that represents your brand and drives business results."
        primary={{ label: "Schedule a Consultation", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Website Development & Performance Optimization - OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}

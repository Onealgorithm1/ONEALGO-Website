import React from "react";
import Layout from "../../components/Layout";
import { Monitor, Smartphone, Zap, Search, Shield, Palette } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";

/* Website development industry page - 2026 refresh.
 *
 * Beyond the visual system:
 *
 *  1. The closing "Schedule a Consultation" button was inert - no asChild, no
 *     to, no onClick. It was the only conversion point in that block and it did
 *     nothing. It is now the primary CTA on the closing band and goes to
 *     /contact.
 *  2. The page was near-verbatim identical to /services/website-development.
 *     The copy is unchanged; the framing now reads as "you are buying a site,
 *     here is what you get", and the hero links across to the service page.
 *  3. The generic blue-500 accent on icons, hover borders and ticks was not the
 *     brand blue. Icons are now brand blue; the tick rows became cards so the
 *     bold lead-ins survive without a coloured bullet.
 *
 * No claim on this page changed. See REDESIGN-NOTES.md.
 */

const FEATURES = [
  {
    icon: Monitor,
    title: "Modern Design",
    body: "Clean, professional websites that reflect your brand and engage your audience.",
  },
  {
    icon: Smartphone,
    title: "Responsive Development",
    body: "Websites that work perfectly across all devices and screen sizes.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    body: "Fast-loading websites built for optimal user experience and search rankings.",
  },
  {
    icon: Search,
    title: "SEO Ready",
    body: "Built with search engine optimization best practices from the ground up.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    body: "Enterprise-grade security and reliable hosting for peace of mind.",
  },
  {
    icon: Palette,
    title: "Custom Solutions",
    body: "Tailored functionality and integrations to meet your specific business needs.",
  },
];

const BENEFITS = [
  {
    title: "Professional Results",
    body: "Clean, modern designs that establish credibility and trust.",
  },
  {
    title: "Better Performance",
    body: "Fast-loading, optimized websites improve user experience and search rankings.",
  },
  {
    title: "Mobile-First Design",
    body: "Responsive layouts ensure your site works perfectly on all devices.",
  },
  {
    title: "Custom Functionality",
    body: "Tailored solutions that meet your unique business requirements.",
  },
];

export default function WebsiteDevelopment() {
  useSEO({
    title: "Website Development Solutions — OneAlgorithm",
    description:
      "Modern design, responsive builds, performance, SEO, and security for business websites.",
    canonical: getCanonicalUrl("/industries/website-development"),
    ogTitle: "Website Development Solutions — OneAlgorithm",
    ogDescription:
      "Fast, secure, and SEO‑ready websites tailored to your needs.",
    ogUrl: getCanonicalUrl("/industries/website-development"),
  });

  return (
    <Layout>
      <PageHero
        eyebrow="Industries — Website Development"
        title={
          <>
            Website Development{" "}
            <span className="text-oa-orange">Solutions</span>
          </>
        }
        lede="Modern, responsive websites built for performance and user experience. From corporate sites to complex web applications."
        // Panel is the feature grid's own titles, read off the same array. No
        // new capability appears here that the page does not already describe.
        panel={{
          title: "What you get",
          items: FEATURES.map((f) => f.title),
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{
          label: "View development services",
          to: "/services/website-development",
        }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What you get"
          title="Website Development Features"
          lede="Comprehensive web development services that create digital experiences designed to engage users and drive results."
        />

        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((f) => (
            <Card key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="Why Choose Our Web Development Services?"
        />

        <CardGrid columns={2} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      {/* The "Schedule a Consultation" label is kept - it is the one the old
          page used - but the button now actually goes somewhere. */}
      <CTABand
        title="Ready to Build Your Website?"
        body="Let's create a website that represents your brand and drives business results."
        primary={{ label: "Schedule a Consultation", to: "/contact" }}
      />
    </Layout>
  );
}

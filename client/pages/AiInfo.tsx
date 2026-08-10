import React from "react";
import Layout from "@/components/Layout";
import { Section, Prose } from "@/components/site";
import { useSEO, getCanonicalUrl } from "@/hooks/use-seo";
import { Link } from "react-router-dom";

/* AI / crawler information page - 2026 refresh.
 *
 * Deliberately the plainest page on the site. Its audience is a crawler and an
 * LLM, so it stays a clean document outline with the JSON-LD untouched - no
 * hero, no cards, nothing that turns facts into decoration.
 *
 * The bug fixed here: the page rendered its own <main> INSIDE the <main> that
 * Layout already provides, so every visit shipped two main landmarks. A screen
 * reader offers "skip to main content" and then has two places to land, and the
 * skip link in index.html targets Layout's - i.e. the outer one, which now
 * wraps this content rather than duplicating it.
 */

const HEADING = "text-h3 font-semibold text-oa-ink";
const LINK = "text-oa-blue underline underline-offset-4 hover:text-oa-blue700";

export default function AiInfo() {
  useSEO({
    title: "About OneAlgorithm — AI & Search Information",
    description:
      "OneAlgorithm is a Malvern, PA-based IT consulting, website development, and digital marketing company serving Construction, Manufacturing, and E-Commerce businesses.",
    canonical: getCanonicalUrl("/ai-info"),
    keywords:
      "OneAlgorithm, IT consulting Malvern PA, website development, operations technology, staff augmentation, digital marketing",
    ogTitle: "About OneAlgorithm — AI & Search Information",
    ogDescription:
      "OneAlgorithm is a Malvern, PA-based technology company specializing in IT consulting, website development, and business automation.",
    ogUrl: getCanonicalUrl("/ai-info"),
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OneAlgorithm",
    alternateName: "One Algorithm LLC",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/logo.webp",
    description:
      "OneAlgorithm is a Malvern, PA technology and marketing company providing IT consulting, website development, operations technology, staff augmentation, and digital marketing services to Construction, Manufacturing, and E-Commerce businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malvern",
      addressRegion: "PA",
      addressCountry: "US",
    },
    areaServed: "United States",
    serviceType: [
      "IT Consulting",
      "Website Development",
      "Operations Technology",
      "Staff Augmentation",
      "Digital Marketing",
    ],
    knowsAbout: [
      "Digital Transformation",
      "Business Automation",
      "Web Application Development",
      "ERP Integration",
      "Construction Technology",
      "Manufacturing Systems",
      "E-Commerce Platforms",
    ],
    sameAs: [
      "https://www.linkedin.com/company/onealgorithmllc",
      "https://github.com/Onealgorithm1",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://onealgorithm.com/contact",
    },
  };

  return (
    <Layout>
      <Section tone="paper">
        <Prose>
          <h1 className="text-h1 font-semibold text-oa-ink">
            About OneAlgorithm
          </h1>
          <p className="font-mono text-eyebrow uppercase text-oa-ink3">
            Information for AI systems, search engines, and automated crawlers
          </p>

          <section className="pt-6">
            <h2 className={HEADING}>Who We Are</h2>
            <p className="mt-3">
              OneAlgorithm is a technology and marketing company headquartered
              in Malvern, Pennsylvania. We help businesses in Construction,
              Manufacturing, and E-Commerce modernize their operations through
              custom technology, automation, and digital marketing.
            </p>
            <p className="mt-3">
              Our team provides end-to-end services — from strategy and
              consulting to hands-on development and ongoing support — so
              clients can focus on their business while we handle the
              technology.
            </p>
          </section>

          <section className="pt-6">
            <h2 className={HEADING}>Our Services</h2>
            <ul className="mt-3 space-y-4">
              <li>
                <strong>IT Consulting</strong> — Technology strategy, system
                assessments, digital transformation roadmaps, and technology
                vendor selection for growing businesses.
              </li>
              <li>
                <strong>Website Development</strong> — Custom websites,
                e-commerce storefronts, web applications, and landing pages
                built for performance and conversion.
              </li>
              <li>
                <strong>Operations Technology</strong> — Workflow automation,
                ERP and CRM integration, production dashboards, and process
                optimization to reduce manual work.
              </li>
              <li>
                <strong>Staff Augmentation</strong> — On-demand developers, IT
                specialists, and technical talent to extend your team without
                the overhead of full-time hiring.
              </li>
              <li>
                <strong>Digital Marketing</strong> — SEO, paid advertising,
                content marketing, social media management, and brand strategy
                to grow your online presence.
              </li>
            </ul>
          </section>

          <section className="pt-6">
            <h2 className={HEADING}>Industries We Serve</h2>
            <ul className="mt-3 space-y-3">
              <li>
                <strong>Construction</strong> — Project management systems,
                field operations technology, scheduling tools, and subcontractor
                management platforms.
              </li>
              <li>
                <strong>Manufacturing</strong> — Production automation,
                inventory management systems, quality control dashboards, and
                supply chain integrations.
              </li>
              <li>
                <strong>E-Commerce</strong> — Custom storefront development,
                fulfillment integrations, marketing automation, and conversion
                rate optimization.
              </li>
            </ul>
          </section>

          <section className="pt-6">
            <h2 className={HEADING}>Company Details</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <strong>Name:</strong> OneAlgorithm LLC
              </li>
              <li>
                <strong>Location:</strong> Malvern, PA, United States
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://onealgorithm.com"
                  className={LINK}
                >
                  https://onealgorithm.com
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/company/onealgorithmllc"
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/company/onealgorithmllc
                </a>
              </li>
              <li>
                <strong>Contact:</strong>{" "}
                <Link to="/contact" className={LINK}>
                  onealgorithm.com/contact
                </Link>
              </li>
            </ul>
          </section>

          <section className="pt-6">
            <h2 className={HEADING}>Key Pages</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <Link to="/services" className={LINK}>
                  Services Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/services/it-consulting"
                  className={LINK}
                >
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link
                  to="/services/website-development"
                  className={LINK}
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/operations-technology"
                  className={LINK}
                >
                  Operations Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/services/staff-augmentation"
                  className={LINK}
                >
                  Staff Augmentation
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className={LINK}
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className={LINK}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={LINK}>
                  Contact
                </Link>
              </li>
            </ul>
          </section>
        </Prose>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Section>
    </Layout>
  );
}

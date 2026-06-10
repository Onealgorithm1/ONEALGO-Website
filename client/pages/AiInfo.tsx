import React from "react";
import Layout from "@/components/Layout";
import { useSEO, getCanonicalUrl } from "@/hooks/use-seo";
import { Link } from "react-router-dom";

export default function AiInfo() {
  useSEO({
    title: "About OneAlgorithm — AI & Search Information",
    description:
      "OneAlgorithm is a Philadelphia-based IT consulting, website development, and digital marketing company serving Construction, Manufacturing, and E-Commerce businesses.",
    canonical: getCanonicalUrl("/ai-info"),
    keywords:
      "OneAlgorithm, IT consulting Philadelphia, website development, operations technology, staff augmentation, digital marketing",
    ogTitle: "About OneAlgorithm — AI & Search Information",
    ogDescription:
      "OneAlgorithm is a Philadelphia-based technology company specializing in IT consulting, website development, and business automation.",
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
      "OneAlgorithm is a Philadelphia, PA technology and marketing company providing IT consulting, website development, operations technology, staff augmentation, and digital marketing services to Construction, Manufacturing, and E-Commerce businesses.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
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
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            About OneAlgorithm
          </h1>
          <p className="text-center text-gray-500 mb-10 text-sm uppercase tracking-wide">
            Information for AI systems, search engines, and automated crawlers
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Who We Are
            </h2>
            <p className="text-gray-700 mb-3">
              OneAlgorithm is a technology and marketing company headquartered
              in Philadelphia, Pennsylvania. We help businesses in Construction,
              Manufacturing, and E-Commerce modernize their operations through
              custom technology, automation, and digital marketing.
            </p>
            <p className="text-gray-700">
              Our team provides end-to-end services — from strategy and
              consulting to hands-on development and ongoing support — so
              clients can focus on their business while we handle the
              technology.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Services
            </h2>
            <ul className="space-y-4 text-gray-700">
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

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Industries We Serve
            </h2>
            <ul className="space-y-3 text-gray-700">
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

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Company Details
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Name:</strong> OneAlgorithm LLC
              </li>
              <li>
                <strong>Location:</strong> Philadelphia, PA, United States
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://onealgorithm.com"
                  className="text-blue-600 underline"
                >
                  https://onealgorithm.com
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/company/onealgorithmllc"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/company/onealgorithmllc
                </a>
              </li>
              <li>
                <strong>Contact:</strong>{" "}
                <Link to="/contact" className="text-blue-600 underline">
                  onealgorithm.com/contact
                </Link>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Key Pages
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>
                <Link to="/services" className="text-blue-600 underline">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/services/it-consulting"
                  className="text-blue-600 underline"
                >
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link
                  to="/services/website-development"
                  className="text-blue-600 underline"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/operations-technology"
                  className="text-blue-600 underline"
                >
                  Operations Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/services/staff-augmentation"
                  className="text-blue-600 underline"
                >
                  Staff Augmentation
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="text-blue-600 underline"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-600 underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-600 underline">
                  Contact
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
    </Layout>
  );
}

import React from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Building2,
  Factory,
  ShoppingCart,
  Target,
  Lightbulb,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
  createWebPageSchema,
} from "../components/StructuredData";
import TeamSection from "../components/TeamSection";

export default function About() {
  useSEO({
    title: "OneAlgorithm — About Us",
    description:
      "Learn how OneAlgorithm transforms struggling businesses into thriving enterprises through intelligent technology solutions and expert consulting.",
    canonical: getCanonicalUrl("/about"),
    keywords:
      "about OneAlgorithm, business technology experts, automation specialists, IT consulting company, digital transformation, business process improvement",
    ogTitle: "OneAlgorithm — About Us",
    ogDescription:
      "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
    ogUrl: getCanonicalUrl("/about"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "OneAlgorithm — About Us",
    twitterDescription:
      "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });
  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
      <StructuredData
        data={createWebPageSchema(
          "About OneAlgorithm - Business Technology & Automation Experts",
          "Learn about OneAlgorithm's mission to transform struggling businesses into thriving enterprises through intelligent technology solutions, business automation, and expert consulting services.",
          "https://onealgorithm.com/about",
        )}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-onealgo-orange-500">OneAlgorithm</span>
              — Transforming Businesses Through Technology
            </h1>
            <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-8">
              We transform struggling businesses into thriving enterprises. With deep expertise across multiple industries, we design and execute technology solutions that simplify operations, reduce costs, and accelerate growth.
            </p>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg"
            >
              <Link to="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission:{" "}
                <span className="text-onealgo-orange-500">Empowering</span>{" "}
                Struggling Businesses
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Every day, we witness capable businesses struggle with outdated
                processes, disconnected systems, and manual workflows that drain
                resources and limit growth potential. Our mission is clear: to
                be the catalyst that transforms these challenges into
                competitive advantages through{" "}
                <Link
                  to="/services/operations-technology"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                >
                  operations technology
                </Link>{" "}
                and{" "}
                <Link
                  to="/services/it-consulting"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                >
                  strategic IT consulting
                </Link>
                .
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that with the right technology foundation, any
                business can achieve remarkable efficiency, reduce operational
                costs, and focus on what they do best – serving their customers
                and growing their impact. Whether you're in{" "}
                <Link
                  to="/industries/construction"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                >
                  construction
                </Link>
                ,{" "}
                <Link
                  to="/industries/manufacturing"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                >
                  manufacturing
                </Link>
                , or{" "}
                <Link
                  to="/industries/ecommerce"
                  className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                >
                  e-commerce
                </Link>
                , we have specialized solutions for your industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/contact">Start Your Transformation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Values */}
      <section className="py-20 bg-gradient-to-r from-onealgo-blue-950 to-onealgo-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              These principles guide everything we do and ensure we deliver
              solutions that truly serve your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Practical Solutions
                </h3>
                <p className="text-blue-200 text-sm">
                  We focus on technology that solves real problems and delivers
                  measurable business value, not flashy features.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Industry Expertise
                </h3>
                <p className="text-blue-200 text-sm">
                  Deep understanding of sector-specific challenges ensures our
                  solutions fit your business context perfectly.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Long-term Partnership
                </h3>
                <p className="text-blue-200 text-sm">
                  We're committed to your ongoing success, providing support and
                  optimization as your business grows.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Transparent Process
                </h3>
                <p className="text-blue-200 text-sm">
                  Clear communication, realistic timelines, and honest
                  assessments build trust and ensure project success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the growing number of businesses that have overcome their
            operational challenges and achieved sustainable growth with
            OneAlgorithm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <Link to="/contact">
                Start Your Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-onealgo-blue-950 text-onealgo-blue-950 hover:bg-onealgo-blue-950 hover:text-white px-8 py-4"
            >
              <Link to="/industries">Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

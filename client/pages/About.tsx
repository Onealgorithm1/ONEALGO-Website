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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to help organizations modernize, automate, and grow. We deliver practical technology solutions that simplify operations, improve efficiency, and create lasting business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Call to Action */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Think Bigger. Build Smarter. Move Faster.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Partner with One Algorithm to modernize operations, automate processes, and accelerate growth.
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
          </div>
        </div>
      </section>
    </Layout>
  );
}

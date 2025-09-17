import React from "react";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Code, Users, Megaphone, Brain, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../components/StructuredData";

export default function Services() {
  useSEO({
    title: "Technology Services - OneAlgorithm | IT Consulting, Website Development & More",
    description: "Comprehensive technology services including website development, IT consulting, operations technology, staff augmentation, and marketing solutions. Accelerate your business growth with OneAlgorithm.",
    canonical: getCanonicalUrl("/services"),
    keywords: "technology services, IT consulting services, website development services, operations technology, staff augmentation, marketing services, business technology solutions",
    ogTitle: "Technology Services - OneAlgorithm | IT Consulting, Website Development & More",
    ogDescription: "Comprehensive technology services including website development, IT consulting, operations technology, staff augmentation, and marketing solutions. Accelerate your business growth with OneAlgorithm.",
    ogUrl: getCanonicalUrl("/services"),
    ogImage: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
    twitterTitle: "Technology Services - OneAlgorithm | IT Consulting, Website Development & More",
    twitterDescription: "Comprehensive technology services including website development, IT consulting, operations technology, staff augmentation, and marketing solutions. Accelerate your business growth with OneAlgorithm.",
    twitterImage: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200"
  });
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Technology{" "}
              <span className="text-onealgo-orange-500">Services</span> —{" "}
              <span className="text-white">
                Website Development, IT Consulting & Staff Augmentation
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Comprehensive technology solutions designed to accelerate your
              business growth and digital transformation. Specialized for{" "}
              <Link
                to="/industries/construction"
                className="text-onealgo-orange-500 hover:text-onealgo-orange-400 underline"
              >
                construction
              </Link>
              ,{" "}
              <Link
                to="/industries/manufacturing"
                className="text-onealgo-orange-500 hover:text-onealgo-orange-400 underline"
              >
                manufacturing
              </Link>
              , and{" "}
              <Link
                to="/industries/ecommerce"
                className="text-onealgo-orange-500 hover:text-onealgo-orange-400 underline"
              >
                e-commerce
              </Link>{" "}
              industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From{" "}
              <Link
                to="/services/website-development"
                className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
              >
                website development
              </Link>{" "}
              to{" "}
              <Link
                to="/services/staff-augmentation"
                className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
              >
                staff augmentation
              </Link>
              , we provide the technical expertise and resources you need to
              succeed. Learn more{" "}
              <Link
                to="/about"
                className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
              >
                about our mission
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Website Development */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Code className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-blue-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">
                  Website Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Modern, responsive websites built for performance and user
                  experience. From corporate sites to complex web applications.
                </p>
                <Button
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/services/website-development">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Marketing */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Megaphone className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-purple-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">
                  Marketing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create campaigns that adapt instantly to customer behavior and
                  preferences with AI-driven insights and automated lead
                  nurturing.
                </p>
                <Button
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/services/marketing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Staff Augmentation */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Users className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-green-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">
                  Staff Augmentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Scale your team with expert developers and technical
                  professionals. Flexible engagement models to meet your project
                  needs.
                </p>
                <Button
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/services/staff-augmentation">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* IT Consulting */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Brain className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-indigo-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">
                  IT Consulting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Strategic technology planning and expert guidance for digital
                  transformation. Optimize your IT infrastructure and processes.
                </p>
                <Button
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/services/it-consulting">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Operations Technology */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Cpu className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-orange-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">
                  Operations Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Industrial automation, SCADA systems, and IoT integration.
                  Optimize operations with smart technology solutions.
                </p>
                <Button
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/services/operations-technology">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OneAlgorithm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver
              solutions that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our team consists of seasoned professionals with deep expertise
                in modern technologies and methodologies.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Agile Approach
              </h3>
              <p className="text-gray-600">
                We use agile methodologies to ensure rapid delivery, continuous
                improvement, and adaptability to changing requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Long-term Partnership
              </h3>
              <p className="text-gray-600">
                We're not just service providers - we're your technology
                partners, committed to your long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our services can help accelerate your business
            goals and digital transformation.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-8 py-4"
          >
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}

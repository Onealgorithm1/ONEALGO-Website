import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import OneAlgorithmText from "../components/OneAlgorithmText";
import CollapsibleDetails from "../components/CollapsibleDetails";
import DetailedCollapsible from "../components/DetailedCollapsible";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Collapsible } from "../components/ui/collapsible";
import {
  Target,
  Link as LinkIcon,
  TrendingUp,
  Settings,
  Building2,
  Factory,
  ShoppingCart,
  CheckCircle,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createOrganizationSchema } from "../components/StructuredData";

export default function Index() {
  useSEO({
    title: "OneAlgorithm - IT Consulting, Website Development & Operations Technology Solutions",
    description: "Transform your business with OneAlgorithm's expert IT consulting, website development, operations technology, and staff augmentation services. Specialized solutions for Construction, Manufacturing, and E-Commerce industries.",
    canonical: getCanonicalUrl("/"),
    keywords: "IT consulting, website development, operations technology, staff augmentation, business automation, construction technology, manufacturing systems, e-commerce solutions, digital transformation, OneAlgorithm",
    ogTitle: "OneAlgorithm - IT Consulting, Website Development & Operations Technology Solutions",
    ogDescription: "Transform your business with expert IT consulting, website development, operations technology, and staff augmentation services for Construction, Manufacturing, and E-Commerce.",
    ogUrl: getCanonicalUrl("/"),
    ogImage: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
    twitterTitle: "OneAlgorithm - IT Consulting, Website Development & Operations Technology Solutions",
    twitterDescription: "Transform your business with expert IT consulting, website development, operations technology, and staff augmentation services for Construction, Manufacturing, and E-Commerce.",
    twitterImage: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200"
  });
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 94, 170, 0.7), rgba(0, 94, 170, 0.5)), url('https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fe4cc18ffb8df4986a719ab3b27dcbabc?format=webp&width=1920')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              <span className="text-white drop-shadow-lg">OneAlgorithm —</span>{" "}
              <span className="text-onealgo-orange-500 drop-shadow-lg">
                Business Technology
              </span>{" "}
              <span className="text-white drop-shadow-lg">
                & Automation Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-onealgo-orange-500/90 mb-4 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up font-semibold italic">
              Reimagine. Connect. Accelerate.
            </p>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto drop-shadow-md animate-fade-in-up">
              Think bigger. Build smarter. Move faster — with{" "}
              <Link
                to="/services"
                className="text-onealgo-orange-500 hover:text-onealgo-orange-400 underline"
              >
                technology solutions
              </Link>{" "}
              tailored to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why OneAlgorithm Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Why <span className="text-onealgo-orange-500">One</span>
              <span className="text-onealgo-blue-950">Algorithm</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              We streamline operations, automate the busywork, and build tools
              that let you focus on what matters: growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Goals-First Approach */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <Target className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" />
                <CardTitle className="text-onealgo-blue-950">
                  Goals-First Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Solutions designed around your business goals — not the other
                  way around. Every system is built to drive measurable results.
                </p>
                <Collapsible trigger="Learn More">
                  Our process begins with discovery workshops, process mapping,
                  and data analysis that align technology with revenue,
                  efficiency, and customer satisfaction outcomes.
                </Collapsible>
              </CardContent>
            </Card>

            {/* Complete Connection */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <LinkIcon
                  className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float"
                  style={{ animationDelay: "0.5s" }}
                />
                <CardTitle className="text-onealgo-blue-950">
                  Complete Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sales, Service,{" "}
                  <Link
                    to="/services/marketing"
                    className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                  >
                    Marketing
                  </Link>
                  , Finance, and{" "}
                  <Link
                    to="/services/operations-technology"
                    className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                  >
                    Operations
                  </Link>{" "}
                  connected into one seamless system.
                </p>
                <Collapsible trigger="Learn More">
                  A single source of truth across all business units delivers
                  leadership visibility, stronger collaboration, and a smoother
                  customer journey from first touch to fulfillment. Explore our{" "}
                  <Link
                    to="/services/it-consulting"
                    className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                  >
                    IT consulting services
                  </Link>{" "}
                  to learn more.
                </Collapsible>
              </CardContent>
            </Card>

            {/* Focus on Growth */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <TrendingUp
                  className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float"
                  style={{ animationDelay: "1s" }}
                />
                <CardTitle className="text-onealgo-blue-950">
                  Focus on Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automation and streamlined operations free teams to focus on
                  strategy and growth.
                </p>
                <Collapsible trigger="Learn More">
                  From lead routing to financial reporting, efficient workflows
                  reduce errors, increase accountability, and empower teams to
                  innovate instead of handling routine admin tasks.
                </Collapsible>
              </CardContent>
            </Card>

            {/* Tailored Solutions */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <Settings
                  className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float"
                  style={{ animationDelay: "1.5s" }}
                />
                <CardTitle className="text-onealgo-blue-950">
                  Tailored Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every implementation is customized to unique processes,
                  industry standards, and long-term vision.
                </p>
                <Collapsible trigger="Learn More">
                  Specialized solutions adapt technology to your business across
                  construction, finance, healthcare, and beyond — aligning with
                  workflows, compliance needs, and customer expectations.
                </Collapsible>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Specialized technology solutions designed for your industry's
              unique challenges and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Construction */}
            <Link to="/industries/construction" className="group">
              <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
                <Building2 className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-onealgo-orange-500 transition-colors duration-300" />
                <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-onealgo-orange-500 transition-colors">
                  Construction
                </h3>
              </div>
            </Link>

            {/* Manufacturing */}
            <Link to="/industries/manufacturing" className="group">
              <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
                <Factory className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-green-500 transition-colors duration-300" />
                <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-green-500 transition-colors">
                  Manufacturing
                </h3>
              </div>
            </Link>

            {/* E-Commerce */}
            <Link to="/industries/ecommerce" className="group">
              <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
                <ShoppingCart className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-green-500 transition-colors duration-300" />
                <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-green-500 transition-colors">
                  E-Commerce
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

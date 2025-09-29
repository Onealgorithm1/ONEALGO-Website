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
import {
  StructuredData,
  createOrganizationSchemaDetailed,
  createFAQSchema,
  createLocalBusinessSchema,
} from "../components/StructuredData";

export default function Index() {
  useSEO({
    title: "One Algorithm | Custom Software Development & Integration Agency | Malvern, PA",
    description:
      "One Algorithm delivers custom software development, system integration, and growth marketing services. Based in Malvern, PA, we build scalable applications, automate workflows, and integrate 200+ platforms. Fast delivery, no vendor lock-in, 24/7 support. Founded 2020.",
    canonical: getCanonicalUrl("/"),
    keywords:
      "custom software development Malvern PA, system integration agency, API integration, CRM integration, marketing automation, Philadelphia software development, enterprise software, SaaS development, mobile app development, One Algorithm",
    ogTitle: "One Algorithm | Custom Software Development & Integration Agency | Malvern, PA",
    ogDescription:
      "One Algorithm delivers custom software development, system integration, and growth marketing services. Based in Malvern, PA, we build scalable applications, automate workflows, and integrate 200+ platforms. Fast delivery, no vendor lock-in, 24/7 support. Founded 2020.",
    ogUrl: getCanonicalUrl("/"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
    twitterTitle:
      "One Algorithm | Custom Software Development & Integration Agency | Malvern, PA",
    twitterDescription:
      "One Algorithm delivers custom software development, system integration, and growth marketing services. Based in Malvern, PA, we build scalable applications, automate workflows, and integrate 200+ platforms. Fast delivery, no vendor lock-in, 24/7 support. Founded 2020.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
  });
  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
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

            {/* Mobile-only heading so key SEO text is visible on small screens */}
            <h2 className="text-2xl md:hidden font-bold text-gray-900 mb-6 mt-8 text-center">
              Leading Technology Solutions for Business Transformation
            </h2>
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

      {/* Comprehensive SEO Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Leading Technology Solutions for Business Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              OneAlgorithm empowers businesses across Construction,
              Manufacturing, and E-Commerce industries with cutting-edge
              technology solutions that drive growth, efficiency, and
              competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                Expert IT Consulting Services
              </h3>
              <p className="text-gray-700 mb-4">
                Our certified IT consultants provide strategic technology
                planning, cybersecurity assessments, and digital transformation
                roadmaps.
              </p>
              <Collapsible trigger="Read More">
                <p className="text-gray-700 mb-4">
                  We analyze your current infrastructure, identify optimization
                  opportunities, and develop comprehensive strategies that align
                  technology investments with business objectives. Our expert
                  team brings 15+ years of experience across multiple technology
                  domains.
                </p>
                <p className="text-gray-700">
                  From cloud migration and system integration to technology
                  audits and performance optimization, our IT consulting
                  services have helped over 200 businesses reduce operational
                  costs while improving efficiency and scalability. Our proven
                  methodologies deliver measurable results with an average 40%
                  cost reduction within 6 months.
                </p>
              </Collapsible>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                Professional Website Development
              </h3>
              <p className="text-gray-700 mb-4">
                We create responsive, high-performance websites and web
                applications that drive conversions and enhance user experience.
              </p>
              <Collapsible trigger="Read More">
                <p className="text-gray-700 mb-4">
                  Our development team specializes in modern frameworks,
                  e-commerce platforms, content management systems, and SEO
                  optimization. We follow industry best practices for security,
                  accessibility, and performance optimization.
                </p>
                <p className="text-gray-700">
                  Whether you need a corporate website, e-commerce platform, or
                  custom web application, our development process ensures fast
                  loading times, mobile responsiveness, and search engine
                  optimization for maximum online visibility. Our websites
                  consistently achieve 95+ PageSpeed scores and deliver
                  exceptional user experiences across all devices.
                </p>
              </Collapsible>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                Operations Technology Solutions
              </h3>
              <p className="text-gray-700 mb-4">
                Transform your operations with industrial automation, IoT
                integration, SCADA systems, and process optimization solutions.
              </p>
              <Collapsible trigger="Read More">
                <p className="text-gray-700 mb-4">
                  Our operations technology experts design and implement systems
                  that improve efficiency, reduce downtime, and enhance
                  operational visibility. We specialize in integrating
                  cutting-edge OT solutions with existing enterprise systems for
                  seamless data flow and comprehensive insights.
                </p>
                <p className="text-gray-700">
                  From manufacturing automation to construction project
                  management systems, we deliver OT solutions that integrate
                  seamlessly with existing infrastructure while providing
                  real-time insights and predictive maintenance capabilities.
                  Our implementations typically result in 30-50% reduction in
                  operational downtime and significant improvements in overall
                  equipment effectiveness (OEE).
                </p>
              </Collapsible>
            </div>
          </div>

          {/* Mobile-only CTA: make the Ready to Transform heading visible on small screens */}
          <div className="md:hidden text-center p-6">
            <h3 className="text-2xl font-bold mb-2">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-700 mb-4 max-w-md mx-auto">
              Join industry leaders who trust OneAlgorithm for their technology
              transformation. Our expert consultants are ready to assess your
              current systems and develop a customized roadmap for success.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="bg-onealgo-light rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                  Industry-Specific Technology Expertise
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Construction Technology
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Project management systems, BIM integration, field data
                      collection, equipment tracking, safety compliance tools,
                      and workforce management solutions tailored for
                      construction companies.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Manufacturing Systems
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Production planning, quality control systems, inventory
                      management, supply chain optimization, equipment
                      monitoring, and lean manufacturing implementations.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      E-Commerce Solutions
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Online store development, payment integration, inventory
                      synchronization, customer analytics, marketing automation,
                      and multi-channel selling platforms.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                  Why Businesses Choose OneAlgorithm
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Proven Track Record
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Successfully delivered 500+ technology projects with 98%
                        client satisfaction rate
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Expert Team
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Certified consultants with 15+ years of industry
                        experience across multiple technology domains
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Measurable Results
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Average 40% cost reduction and 60% efficiency
                        improvement within 6 months of implementation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        24/7 Support
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Round-the-clock technical support and maintenance across
                        all time zones and geographic locations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-onealgo-blue-950 to-onealgo-blue-800 text-white rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-blue-200 mb-6 max-w-3xl mx-auto">
              Join industry leaders who trust OneAlgorithm for their technology
              transformation. Our expert consultants are ready to assess your
              current systems and develop a customized roadmap for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg"
              >
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4 text-lg"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

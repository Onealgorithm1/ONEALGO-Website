import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import SocialShare from "../../components/SocialShare";
import {
  Brain,
  Shield,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Users,
  Globe,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function ITConsulting() {
  useSEO({
    title: "OneAlgorithm — IT Consulting",
    description:
      "Expert IT consulting for strategic planning, technology audits, digital transformation, and cybersecurity. Drive business growth with proven IT expertise.",
    canonical: getCanonicalUrl("/services/it-consulting"),
    keywords:
      "IT consulting, strategic IT planning, technology audit, digital transformation, cybersecurity consulting, business process optimization, IT strategy",
    ogTitle: "OneAlgorithm — IT Consulting",
    ogDescription:
      "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization. Drive growth with OneAlgorithm's IT expertise.",
    ogUrl: getCanonicalUrl("/services/it-consulting"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
    twitterTitle: "IT Consulting Services - OneAlgorithm",
    twitterDescription:
      "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization. Drive growth with OneAlgorithm's IT expertise.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
  });
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Strategic IT Planning",
      description:
        "Develop comprehensive IT strategies aligned with your business objectives and growth plans.",
    },
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Security Assessment",
      description:
        "Evaluate your current security posture and implement robust cybersecurity measures.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Digital Transformation",
      description:
        "Guide your organization through digital transformation initiatives and technology adoption.",
    },
    {
      icon: <Globe className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Cloud Strategy",
      description:
        "Design and implement cloud migration strategies for scalability and cost optimization.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Performance Optimization",
      description:
        "Analyze and optimize your IT infrastructure for maximum efficiency and performance.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Technology Innovation",
      description:
        "Identify emerging technologies and innovative solutions to drive competitive advantage.",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Strategic Alignment",
      description:
        "Ensure IT investments align with business goals and deliver measurable ROI.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Advantage",
      description:
        "Leverage technology to gain a competitive edge in your market.",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description:
        "Identify and mitigate technology risks before they impact your business.",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description:
        "Access to experienced IT consultants with deep industry knowledge.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Assessment",
      description:
        "Comprehensive evaluation of your current IT landscape and business requirements.",
    },
    {
      step: "2",
      title: "Strategy",
      description:
        "Development of customized IT strategies and roadmaps aligned with your goals.",
    },
    {
      step: "3",
      title: "Implementation",
      description:
        "Guided implementation of recommended solutions with ongoing support.",
    },
    {
      step: "4",
      title: "Optimization",
      description:
        "Continuous monitoring and optimization to ensure maximum value and performance.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "IT Consulting Services",
          "Expert IT consulting services including strategic IT planning, technology audits, digital transformation, cybersecurity, and business process optimization.",
          "IT Consulting",
          "https://onealgorithm.com/services/it-consulting",
        )}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                IT <span className="text-onealgo-orange-500">Consulting</span> &
                Digital Transformation
              </h1>
              <ul className="text-xl text-blue-200 mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Strategic technology planning and roadmaps.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Expert guidance for digital transformation.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Risk assessment and security optimization.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Technology solutions aligned with business goals.
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Get Expert Consultation</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <Brain className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-4" />
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Strategic IT Guidance
                  </h3>
                  <p className="text-blue-200">
                    Transforming technology into business value
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our IT Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT consulting services to help you make informed
              technology decisions and drive business transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-lg"
              >
                <CardHeader>
                  {service.icon}
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our IT Consulting?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with us to unlock the full potential of technology for
              your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-blue-950 transition-colors h-full"
              >
                <CardHeader className="text-center">
                  <benefit.icon className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Consulting Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers results and drives sustainable
              technology transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Experience */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Industry Experience & Expertise
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Cross-Industry Knowledge:</strong> Experience across
                    healthcare, finance,{" "}
                    <Link
                      to="/industries/manufacturing"
                      className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                    >
                      manufacturing
                    </Link>
                    , and technology sectors including{" "}
                    <Link
                      to="/industries/construction"
                      className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                    >
                      construction
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/industries/ecommerce"
                      className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline"
                    >
                      e-commerce
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Proven Methodologies:</strong> ITIL, COBIT, and
                    agile frameworks for structured consulting approaches.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Technology Partnerships:</strong> Strategic
                    relationships with leading technology vendors and platforms.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Measurable Results:</strong> Track record of
                    delivering quantifiable business value and ROI.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Transform Your IT Strategy?
              </h3>
              <p className="text-gray-600 mb-6">
                Let's discuss how our IT consulting expertise can help you
                achieve your technology goals and drive business success.
              </p>
              <Button
                asChild
                className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
              >
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-onealgo-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Transform Your Technology Strategy
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Partner with our IT consulting experts to unlock technology's full
            potential for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialShare
            title="IT Consulting & Digital Transformation - OneAlgorithm"
            className="justify-center"
          />
        </div>
      </section>
    </Layout>
  );
}

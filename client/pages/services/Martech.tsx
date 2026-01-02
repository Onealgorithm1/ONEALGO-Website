import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import SocialShare from "../../components/SocialShare";
import { Zap, Database, User2, Megaphone, Target, Plug } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function Martech() {
  useSEO({
    title: "OneAlgorithm — MarTech Services",
    description:
      "MarTech services that make marketing data-driven, automated, and personalized. We help you connect tools, centralize customer data, and deliver tailored experiences that drive conversions.",
    canonical: getCanonicalUrl("/services/martech"),
    keywords:
      "MarTech, marketing technology, marketing automation, customer data platform, personalization, digital advertising, campaign management, marketing integration",
    ogTitle: "OneAlgorithm — MarTech Services",
    ogDescription:
      "Turn technology into marketing advantage. Our MarTech solutions automate campaigns, centralize customer data, and personalize experiences across channels to increase revenue and save time.",
    ogUrl: getCanonicalUrl("/services/martech"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "OneAlgorithm — MarTech Services",
    twitterDescription:
      "Automate marketing, centralize customer data, and deliver personalized experiences with OneAlgorithm's MarTech services.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Marketing Automation",
      description:
        "Automate multi-channel campaigns, lead nurturing, and customer journeys to deliver the right message at the right time.",
    },
    {
      icon: <Database className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Customer Data & Insights",
      description:
        "Collect, unify, and analyze customer data across channels to build a 360° customer profile and actionable dashboards.",
    },
    {
      icon: <User2 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Personalization & CX",
      description:
        "Deliver tailored content, offers, and product recommendations across web, mobile, and email to increase engagement and retention.",
    },
    {
      icon: <Megaphone className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Digital Advertising & Media",
      description:
        "Plan, execute, and optimize paid media across Google, Meta, LinkedIn, and programmatic channels to improve targeting and ROI.",
    },
    {
      icon: <Target className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Campaign Management",
      description:
        "Strategy and execution for multi-channel campaigns with testing, optimization, and clear KPI-driven reporting.",
    },
    {
      icon: <Plug className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Integration & Enablement",
      description:
        "Connect MarTech tools with CRM, e-commerce, and service systems and enable teams with training and operational playbooks.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "MarTech Services",
          "Marketing technology services that automate campaigns, centralize customer data, and personalize customer experiences to increase revenue.",
          "Marketing",
          "https://onealgorithm.com/services/martech",
        )}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg
              className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-6 animate-bounce-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 6h2v6h-2zM11 14h2v2h-2z" />
            </svg>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MarTech Services &nbsp;
              <span className="text-onealgo-orange-500">
                Marketing Technology that Scales
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Use technology to make marketing faster, smarter, and more
              personalized — from automation and advertising to customer data
              platforms and integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <a href="/contact">Request a MarTech Consultation</a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4"
              >
                <a href="/services">View Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MarTech Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              End-to-end MarTech solutions — automation, customer data,
              personalization, paid media, and integrations that deliver
              measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-orange-500 transition-colors"
              >
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="text-onealgo-blue-950">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why OneAlgorithm for MarTech?
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li>
                  Combine marketing strategy and engineering to deliver
                  scalable, measurable programs.
                </li>
                <li>
                  Centralize customer data to power personalization and better
                  ad targeting.
                </li>
                <li>
                  Automate repetitive tasks so your team focuses on strategy and
                  growth.
                </li>
                <li>
                  Transparent reporting, experimentation, and optimization for
                  continuous improvement.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Get a MarTech Audit
              </h4>
              <p className="text-gray-600 mb-6">
                Our audit evaluates your stack, data flows, automation, and
                personalization readiness with prioritized recommendations and
                estimated impact.
              </p>
              <Button
                asChild
                size="md"
                className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-6 py-3"
              >
                <a href="/contact">Request Audit</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">MarTech Success Stories</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Case studies and results from clients who used MarTech to drive
            growth — available on request.
          </p>
          <SocialShare />
        </div>
      </section>
    </Layout>
  );
}

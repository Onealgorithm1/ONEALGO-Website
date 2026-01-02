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
  DollarSign,
  Target,
  Zap,
  BarChart3,
  RefreshCw,
  Users,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function GoogleAds() {
  useSEO({
    title: "OneAlgorithm — Google Ads Management",
    description:
      "Drive measurable leads and revenue with expert Google Ads management. We build, optimize, and scale paid search campaigns focused on high-converting traffic and ROI.",
    canonical: getCanonicalUrl("/services/google-ads"),
    keywords:
      "Google Ads management, PPC agency, paid search, search advertising, Google Ads optimization, paid media, remarketing, conversion tracking",
    ogTitle: "OneAlgorithm — Google Ads Management",
    ogDescription:
      "Full-service Google Ads: campaign setup, targeting, bidding, creative testing, and measurement to maximize return on ad spend (ROAS).",
    ogUrl: getCanonicalUrl("/services/google-ads"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "OneAlgorithm — Google Ads Management",
    twitterDescription:
      "Scale paid search performance with OneAlgorithm's Google Ads strategy, optimization, and measurement services.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });

  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Campaign Setup & Strategy",
      description:
        "Structure accounts and campaigns to align with business goals, target high-intent keywords, and create scalable account architectures.",
    },
    {
      icon: <Target className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Audience Targeting & Remarketing",
      description:
        "Advanced audience segmentation, remarketing lists, and customer match to re-engage users and improve conversion rates.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Bid Management & Optimization",
      description:
        "Continuous bid and budget optimization using data-driven rules and smart bidding strategies to maximize ROI.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Creative & Landing Page Testing",
      description:
        "A/B test ad creatives and landing pages to improve Quality Score and conversion rates across campaigns.",
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Measurement & Attribution",
      description:
        "Implement tracking, conversion measurement, and attribution models that reveal true campaign performance and LTV.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Reporting & Optimization",
      description:
        "Transparent dashboards and weekly optimizations with clear KPIs focused on cost-per-acquisition and revenue.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Google Ads Management",
          "Professional Google Ads management and paid search services to generate leads and revenue through optimized campaigns and measurement.",
          "Marketing",
          "https://onealgorithm.com/services/google-ads",
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
              Google Ads Management &nbsp;
              <span className="text-onealgo-orange-500">
                Paid Search That Converts
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Cut wasted spend and grow revenue with performance-focused Google
              Ads campaigns, expert optimization, and robust measurement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <a href="/contact">Request Google Ads Audit</a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4"
              >
                <a href="/services/marketing">Back to Marketing</a>
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
              Google Ads Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Full-service Google Ads: strategy, audience targeting,
              optimization, creative testing, and transparent reporting.
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
                Why OneAlgorithm for Google Ads?
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li>
                  Performance-first approach focused on reducing CPA and
                  increasing ROAS.
                </li>
                <li>
                  Technical tracking and attribution to understand true campaign
                  impact.
                </li>
                <li>
                  Continuous testing and optimization of creatives and landing
                  pages.
                </li>
                <li>
                  Transparent reporting with clear recommendations and next
                  steps.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Get a Google Ads Audit
              </h4>
              <p className="text-gray-600 mb-6">
                Our audit examines account structure, conversion tracking,
                audience strategy, and recommendations to lower CPA and improve
                performance.
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
          <h3 className="text-2xl font-bold mb-4">
            Paid Media Success Stories
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Examples of campaigns that scaled efficiently and delivered revenue
            — available on request.
          </p>
          <SocialShare />
        </div>
      </section>
    </Layout>
  );
}

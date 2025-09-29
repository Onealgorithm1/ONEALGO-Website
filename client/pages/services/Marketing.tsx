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
import { Target, TrendingUp, Users, Zap, BarChart3, Mail } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function Marketing() {
  useSEO({
    title: "OneAlgorithm — Marketing Services",
    description:
      "Comprehensive marketing services with AI-driven insights, campaign management, and customer journey optimization. Boost your marketing ROI with data analytics.",
    canonical: getCanonicalUrl("/services/marketing"),
    keywords:
      "marketing services, campaign management, AI marketing, customer journey optimization, marketing analytics, digital marketing automation",
    ogTitle: "Marketing Services - OneAlgorithm",
    ogDescription:
      "Comprehensive marketing services including campaign management, AI-driven insights, customer journey optimization, and data analytics. Boost your marketing ROI with OneAlgorithm.",
    ogUrl: getCanonicalUrl("/services/marketing"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
    twitterTitle: "Marketing Services - OneAlgorithm",
    twitterDescription:
      "Comprehensive marketing services including campaign management, AI-driven insights, customer journey optimization, and data analytics. Boost your marketing ROI with OneAlgorithm.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200",
  });
  const features = [
    {
      icon: <Target className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Campaign Management",
      description:
        "Create campaigns that adapt instantly to customer behavior and preferences.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-onealgo-orange-500" />,
      title: "AI-Driven Insights",
      description:
        "Leverage artificial intelligence to understand customer patterns and optimize strategies.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Customer Journeys",
      description:
        "Design personalized customer journeys from first touch to conversion.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "ROI Tracking",
      description:
        "Advanced analytics for ROI tracking and campaign optimization.",
    },
    {
      icon: <Mail className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Lead Nurturing",
      description: "Automated lead nurturing and customer retention workflows.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Marketing Automation",
      description:
        "Streamline repetitive tasks and focus on strategic initiatives.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Marketing Services",
          "Comprehensive marketing services including campaign management, AI-driven insights, customer journey optimization, and data analytics.",
          "Marketing",
          "https://onealgorithm.com/services/marketing",
        )}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg
              className="w-24 h-24 text-purple-500 mx-auto mb-6 animate-bounce-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Marketing <span className="text-purple-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Create campaigns that adapt instantly to customer behavior and
              preferences with AI-driven insights and automated lead nurturing.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Marketing Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive marketing tools designed to drive engagement,
              conversions, and customer loyalty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-purple-500 transition-colors"
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

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Marketing Solutions?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Increase Conversions:</strong> Personalized
                    campaigns drive higher engagement and conversion rates.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Optimize ROI:</strong> Data-driven insights ensure
                    marketing budgets deliver maximum returns.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Automate Workflows:</strong> Free your team to focus
                    on strategy while automation handles routine tasks.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Build Relationships:</strong> Nurture leads and
                    customers with personalized experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Marketing?
              </h3>
              <p className="text-gray-600 mb-6">
                See how our marketing solutions can drive better results and
                increase customer engagement.
              </p>
              <Button
                asChild
                className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
              >
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialShare
            title="Marketing Solutions - AI-Driven Campaigns & Automation - OneAlgorithm"
            className="justify-center"
          />
        </div>
      </section>
    </Layout>
  );
}

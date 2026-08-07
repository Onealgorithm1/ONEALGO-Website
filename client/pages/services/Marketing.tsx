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
  Target,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Mail,
  Facebook,
  CalendarDays,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function Marketing() {
  useSEO({
    title: "OneAlgorithm — Marketing & Social Media Management Services",
    description:
      "Marketing services including social media management for Facebook Pages and Instagram business accounts, campaign management, AI-driven insights, and performance reporting for our clients.",
    canonical: getCanonicalUrl("/services/marketing"),
    keywords:
      "social media management, Facebook Page management, Instagram management, marketing services, campaign management, AI marketing, customer journey optimization, marketing analytics, digital marketing automation",
    ogTitle: "OneAlgorithm — Marketing & Social Media Management Services",
    ogDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    ogUrl: getCanonicalUrl("/services/marketing"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Marketing & Social Media Management Services",
    twitterDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
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
          "Marketing & Social Media Management Services",
          "Social media management for client-owned Facebook Pages and Instagram business accounts — content planning, publishing and performance reporting — alongside campaign management, AI-driven insights and customer journey optimization.",
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
              Marketing Services &{" "}
              <span className="text-purple-500">Automation Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              We manage social media accounts for our clients and build
              campaigns that adapt to customer behavior — with AI-driven
              insights, automated lead nurturing, and reporting that shows what
              their marketing is actually doing.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4"
            >
              <Link to="/contact">Talk to an Expert</Link>
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

      {/* Social Media Management
          Describes the service exactly as it is delivered, including which
          platform data we read and why. Meta's Access Verification review
          checks this page against what the business claims it does, so the
          wording here and in that submission must stay in step. */}
      <section id="social-media-management" className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Social Media Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We manage the Facebook Pages and Instagram business accounts our
              clients own — planning and publishing content, keeping profiles
              current, and reporting on what each channel is delivering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-2 hover:border-purple-500 transition-colors bg-white">
              <CardHeader>
                <Facebook className="w-8 h-8 text-onealgo-orange-500" />
                <CardTitle className="text-onealgo-blue-950">
                  Facebook &amp; Instagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Day-to-day management of the Facebook Pages and Instagram
                  business accounts our clients connect to us, kept consistent
                  with their brand.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-colors bg-white">
              <CardHeader>
                <CalendarDays className="w-8 h-8 text-onealgo-orange-500" />
                <CardTitle className="text-onealgo-blue-950">
                  Content Planning &amp; Publishing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Campaign calendars, scheduled posts and coordinated launches
                  across every channel a client asks us to run.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-colors bg-white">
              <CardHeader>
                <LineChart className="w-8 h-8 text-onealgo-orange-500" />
                <CardTitle className="text-onealgo-blue-950">
                  Performance Reporting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Follower growth, reach and engagement collected from each
                  connected account and reported back in plain language — not
                  screenshots of dashboards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-colors bg-white">
              <CardHeader>
                <ShieldCheck className="w-8 h-8 text-onealgo-orange-500" />
                <CardTitle className="text-onealgo-blue-950">
                  Access &amp; Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clients keep ownership of their own accounts and grant us
                  access as a partner. They can withdraw it at any time.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              How it works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  1
                </div>
                <h4 className="font-semibold text-onealgo-blue-950 mb-2">
                  You grant access
                </h4>
                <p className="text-gray-600">
                  You add One Algorithm as a partner on your own business
                  account. Your Pages and profiles stay yours throughout.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  2
                </div>
                <h4 className="font-semibold text-onealgo-blue-950 mb-2">
                  We manage and measure
                </h4>
                <p className="text-gray-600">
                  We publish and maintain your content, and collect the audience
                  and engagement figures each platform reports.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  3
                </div>
                <h4 className="font-semibold text-onealgo-blue-950 mb-2">
                  You see the results
                </h4>
                <p className="text-gray-600">
                  One report covering every channel, so you can tell what is
                  working without logging into five different tools.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How we use platform data
            </h3>
            <p className="text-gray-600 mb-4">
              To deliver this service we read information from the accounts our
              clients connect to us: Page and profile details, follower counts,
              post performance and engagement figures. We use it for one purpose
              — running and reporting on that client&rsquo;s own marketing.
            </p>
            <p className="text-gray-600">
              We do not sell it, we do not combine one client&rsquo;s data with
              another&rsquo;s, and our access ends when the engagement ends.
              Nothing is published to a client&rsquo;s account without their
              approval.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
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
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialShare
            title="Social Media Management & Marketing Solutions - OneAlgorithm"
            className="justify-center"
          />
        </div>
      </section>
    </Layout>
  );
}

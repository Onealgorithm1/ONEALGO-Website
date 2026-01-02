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
  Globe,
  TrendingUp,
  Link as LinkIcon,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function Seo() {
  useSEO({
    title: "OneAlgorithm — SEO Services",
    description:
      "SEO Services to increase organic visibility, improve technical health, and drive qualified traffic through content, technical optimizations, and data-driven strategies.",
    canonical: getCanonicalUrl("/services/seo"),
    keywords:
      "SEO services, technical SEO, content SEO, link building, organic traffic, search engine optimization, local SEO",
    ogTitle: "OneAlgorithm — SEO Services",
    ogDescription:
      "Increase organic visibility and drive qualified traffic with OneAlgorithm's technical SEO, content strategy, and analytics-driven optimizations.",
    ogUrl: getCanonicalUrl("/services/seo"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "OneAlgorithm — SEO Services",
    twitterDescription:
      "Increase organic visibility and drive qualified traffic with OneAlgorithm's technical SEO, content strategy, and analytics-driven optimizations.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Technical SEO Audits",
      description:
        "Comprehensive audits to fix crawlability, indexability, site architecture, and Core Web Vitals issues.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Keyword & Content Strategy",
      description:
        "Data-driven content plans that target high-value queries and improve topical authority.",
    },
    {
      icon: <LinkIcon className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Link Building & Outreach",
      description:
        "Ethical outreach and authority-building campaigns to improve domain signals and referral traffic.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Analytics & CRO",
      description:
        "Track performance, run experiments, and optimize pages to convert the traffic we bring.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Local & Enterprise SEO",
      description:
        "Local listings, citation management, and scalable strategies for multi-location or large sites.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "SEO Services",
          "Technical SEO, content strategy, and data-driven optimization to grow organic traffic and visibility.",
          "Marketing",
          "https://onealgorithm.com/services/seo",
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
              SEO Services &nbsp;
              <span className="text-onealgo-orange-500">
                for Sustainable Growth
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Technical SEO, content strategy, and analytics-driven optimization
              to increase qualified organic traffic and revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Request an SEO Audit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4"
              >
                <Link to="/services">View Services</Link>
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
              SEO Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Full-service SEO: from technical fixes to content and outreach
              that drive measurable results.
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
                Why OneAlgorithm for SEO?
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li>
                  Proven track record increasing organic sessions and
                  conversions.
                </li>
                <li>
                  Technical-first approach to fix root causes of poor
                  visibility.
                </li>
                <li>
                  Content programs aligned to product/market fit and revenue
                  goals.
                </li>
                <li>
                  Transparent reporting and continuous improvement via testing.
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Get an SEO Audit
              </h4>
              <p className="text-gray-600 mb-6">
                Our audit includes site crawl, Core Web Vitals review, content
                gaps, and prioritized fixes with estimated impact.
              </p>
              <Button
                asChild
                size="md"
                className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-6 py-3"
              >
                <Link to="/contact">Request Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Recent SEO Wins</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Case studies, improved rankings, and traffic growth across client
            sites — available on request.
          </p>
          <SocialShare />
        </div>
      </section>
    </Layout>
  );
}

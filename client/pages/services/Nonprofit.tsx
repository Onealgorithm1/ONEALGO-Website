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
  Users,
  CreditCard,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

export default function Nonprofit() {
  useSEO({
    title: "OneAlgorithm — Nonprofit Launch & Infrastructure Services",
    description:
      "Empowering nonprofits with a complete digital, operational, and marketing blueprint to launch, fundraise, and scale.",
    canonical: getCanonicalUrl("/services/nonprofit"),
    keywords:
      "nonprofit services, nonprofit infrastructure, fundraising, CRM, Google for Nonprofits, QuickBooks, donation forms",
    ogTitle: "OneAlgorithm — Nonprofit Launch & Infrastructure Services",
    ogDescription:
      "Empowering nonprofits with a complete digital, operational, and marketing blueprint to launch, fundraise, and scale.",
    ogUrl: getCanonicalUrl("/services/nonprofit"),
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
    twitterTitle: "OneAlgorithm — Nonprofit Launch & Infrastructure Services",
    twitterDescription:
      "Empowering nonprofits with a complete digital, operational, and marketing blueprint to launch, fundraise, and scale.",
    twitterImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=png&width=1200",
  });

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Digital Infrastructure",
      description:
        "Domain registration, hosting, website build, Google Business profile, and social media setup to establish your nonprofit's digital presence.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Marketing Infrastructure",
      description:
        "Google for Nonprofits setup, SEO, social media strategy, and email campaign setup focused on donor acquisition and engagement.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-onealgo-orange-500" />,
      title: "CRM & Fundraising",
      description:
        "Salesforce Nonprofit Success Pack configuration, Zeffy integration, donation and event forms to streamline contributions and donor management.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Financial Management",
      description:
        "QuickBooks Online integration, donation tracking, and nonprofit accounting workflows to keep finances transparent and audit-ready.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Launch & Growth Support",
      description:
        "Donor campaigns, content creation, and automated workflows to scale your impact while minimizing overhead.",
    },
  ];

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Nonprofit Launch & Infrastructure Services",
          "Turnkey nonprofit launch, fundraising, and infrastructure services to help mission-driven organizations start and scale.",
          "Marketing",
          "https://onealgorithm.com/services/nonprofit",
        )}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Nonprofit Launch &amp; Infrastructure Services
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mb-8">
                Empowering nonprofits with a complete digital, operational, and
                marketing blueprint.
              </p>
              <div className="flex gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
                >
                  <a href="/contact">Get Started</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4"
                >
                  <a href="/contact">Contact Us Today</a>
                </Button>
              </div>
            </div>

            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F33f56ea89d674e2eb7334b03e9c57fd8?format=webp&width=1200"
                alt="Nonprofit mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Nonprofit Services Include
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end services tailored for nonprofits to
              minimize friction and maximize impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-onealgo-orange-500 transition-colors h-full"
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
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose OneAlgorithm for Your Nonprofit?
            </h3>
            <p className="text-gray-600">
              We deliver turnkey solutions that combine technical expertise and
              cost-efficient operations so you can focus on your mission. From
              launch to sustained growth, our systems are built to reduce
              overhead and accelerate impact.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-onealgo-blue-900 to-onealgo-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Launch Your Nonprofit?
          </h3>
          <p className="text-blue-200 mb-8">
            Let's build the infrastructure and campaigns that help you reach
            donors and supporters.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <a href="/contact">Contact Us Today</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SocialShare />
        </div>
      </section>
    </Layout>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Factory, Cog, BarChart3, Shield, Clock, Zap } from "lucide-react";

export default function Manufacturing() {
  useSEO({
    title: "Manufacturing Solutions — OneAlgorithm",
    description:
      "Production tracking, workflow automation, quality control, and predictive maintenance for manufacturers.",
    canonical: getCanonicalUrl("/industries/manufacturing"),
    ogTitle: "Manufacturing Solutions — OneAlgorithm",
    ogDescription:
      "Integrated systems delivering live data insights across operations.",
    ogUrl: getCanonicalUrl("/industries/manufacturing"),
  });
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Production Tracking",
      description:
        "Track production, inventory, and supply chain activity in one unified platform.",
    },
    {
      icon: <Cog className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Workflow Automation",
      description:
        "Automated workflows reduce downtime and optimize capacity planning.",
    },
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Quality Control",
      description: "Real-time quality control monitoring and defect tracking.",
    },
    {
      icon: <Clock className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Predictive Maintenance",
      description:
        "Predictive maintenance scheduling to prevent equipment failures.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Resource Optimization",
      description:
        "Resource optimization ensures maximum efficiency and minimal waste.",
    },
    {
      icon: <Factory className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Connected Systems",
      description:
        "Integrated systems provide live data insights across all operations.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Factory className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Manufacturing <span className="text-green-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Boost efficiency with connected systems, streamlined production
              workflows, and live data insights.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4"
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
              Manufacturing Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced tools designed to optimize production processes and
              increase operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-green-500 transition-colors"
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
                Why Choose Our Manufacturing Solutions?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Increase Efficiency:</strong> Streamlined workflows
                    and automated processes reduce waste and maximize output.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Prevent Downtime:</strong> Predictive maintenance
                    and real-time monitoring keep equipment running smoothly.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Improve Quality:</strong> Continuous monitoring and
                    defect tracking ensure consistent product quality.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Data-Driven Decisions:</strong> Real-time analytics
                    provide insights for continuous improvement.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Optimize Production?
              </h3>
              <p className="text-gray-600 mb-6">
                Discover how our manufacturing solutions can transform your
                operations and increase efficiency.
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
    </Layout>
  );
}

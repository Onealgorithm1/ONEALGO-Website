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
  Monitor,
  Smartphone,
  Zap,
  Search,
  Shield,
  Palette,
} from "lucide-react";

export default function WebsiteDevelopment() {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Modern Design",
      description:
        "Clean, professional websites that reflect your brand and engage your audience.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Responsive Development",
      description:
        "Websites that work perfectly across all devices and screen sizes.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Performance Optimized",
      description:
        "Fast-loading websites built for optimal user experience and search rankings.",
    },
    {
      icon: <Search className="w-8 h-8 text-onealgo-orange-500" />,
      title: "SEO Ready",
      description:
        "Built with search engine optimization best practices from the ground up.",
    },
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security and reliable hosting for peace of mind.",
    },
    {
      icon: <Palette className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Custom Solutions",
      description:
        "Tailored functionality and integrations to meet your specific business needs.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg
              className="w-24 h-24 text-blue-500 mx-auto mb-6 animate-bounce-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3a2 2 0 002 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2zm0 12H9V5h10v10z" />
            </svg>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Website <span className="text-blue-500">Development</span> &
              Performance Optimization
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Modern, responsive websites built for performance and user
              experience. From corporate sites to complex web applications.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4"
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
              Website Development Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive web development services that create digital
              experiences designed to engage users and drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-blue-500 transition-colors"
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
                Why Choose Our Web Development Services?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Professional Results:</strong> Clean, modern designs
                    that establish credibility and trust.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Better Performance:</strong> Fast-loading, optimized
                    websites improve user experience and search rankings.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Mobile-First Design:</strong> Responsive layouts
                    ensure your site works perfectly on all devices.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Custom Functionality:</strong> Tailored solutions
                    that meet your unique business requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Build Your Website?
              </h3>
              <p className="text-gray-600 mb-6">
                Let's create a website that represents your brand and drives
                business results.
              </p>
              <Button className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

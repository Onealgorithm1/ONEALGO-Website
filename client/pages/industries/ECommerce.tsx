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
import {
  ShoppingCart,
  CreditCard,
  Package,
  Users,
  BarChart3,
  Zap,
} from "lucide-react";

export default function ECommerce() {
  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Platform Integration",
      description:
        "Scale your online business with integrated platforms that connect inventory, payments, and customer data.",
    },
    {
      icon: <Package className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Order Management",
      description:
        "Streamlined order processing from purchase to delivery with real-time tracking.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Payment Processing",
      description:
        "Secure, seamless payment processing with multiple gateway integrations.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Customer Experience",
      description:
        "Personalized shopping experiences that drive conversion and customer loyalty.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Analytics & Insights",
      description:
        "Comprehensive analytics to understand customer behavior and optimize sales.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Automation",
      description:
        "Automated inventory management, pricing, and customer communications.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-green-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              E-Commerce <span className="text-green-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Scale your online business with integrated platforms that connect
              inventory, payments, and customer data for streamlined operations.
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
              E-Commerce Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete e-commerce solutions designed to maximize sales and
              enhance customer experiences.
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
                Why Choose Our E-Commerce Solutions?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Increase Sales:</strong> Optimized checkout
                    processes and personalized experiences boost conversion
                    rates.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Streamline Operations:</strong> Automated inventory
                    and order management reduce manual work.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Enhance Customer Loyalty:</strong> Personalized
                    shopping experiences keep customers coming back.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Scale Efficiently:</strong> Integrated systems grow
                    with your business without complexity.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Scale Your E-Commerce?
              </h3>
              <p className="text-gray-600 mb-6">
                Discover how our e-commerce solutions can increase sales and
                streamline your online operations.
              </p>
              <Button
                asChild
                className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
              >
                <Link to="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

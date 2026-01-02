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
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  Shield,
  Zap,
} from "lucide-react";

export default function Construction() {
  useSEO({
    title: "Construction Solutions — OneAlgorithm",
    description:
      "Project scheduling, team coordination, safety, and cost control solutions for construction firms.",
    canonical: getCanonicalUrl("/industries/construction"),
    ogTitle: "Construction Solutions — OneAlgorithm",
    ogDescription:
      "Smarter coordination and real-time visibility from field to office.",
    ogUrl: getCanonicalUrl("/industries/construction"),
  });
  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Project Scheduling",
      description:
        "Centralize schedules, budgets, and communication to avoid delays and costly missteps.",
    },
    {
      icon: <Users className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Team Coordination",
      description:
        "Integrations link field teams, subcontractors, and back-office operations seamlessly.",
    },
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Safety Management",
      description:
        "Automated compliance tracking and safety protocol management keep projects secure.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Cost Control",
      description:
        "Real-time budget tracking and expense management prevent cost overruns.",
    },
    {
      icon: <Zap className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Real-Time Updates",
      description:
        "Field updates sync directly with office management systems for instant visibility.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Project Tracking",
      description:
        "Single, clear view of every project milestone and progress tracking.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-6 animate-bounce-slow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Construction{" "}
              <span className="text-onealgo-orange-500">Solutions</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Keep projects on track with smarter coordination, automated task
              management, and real-time visibility from the field to the office.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
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
              Construction Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for construction project
              management and coordination.
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

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Construction Solutions?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Reduce Project Delays:</strong> Centralized
                    communication and automated workflows keep everyone aligned.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Improve Safety Compliance:</strong> Automated
                    tracking ensures all safety protocols are followed.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Control Costs:</strong> Real-time budget monitoring
                    prevents expensive overruns.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Enhance Collaboration:</strong> Field teams and
                    office staff work from the same real-time data.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Projects?
              </h3>
              <p className="text-gray-600 mb-6">
                See how our construction solutions can streamline your
                operations and improve project outcomes.
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

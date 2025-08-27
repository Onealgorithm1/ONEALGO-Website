import React from "react";
import Layout from "../components/Layout";
import OneAlgorithmText from "../components/OneAlgorithmText";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Target, 
  Link as LinkIcon, 
  TrendingUp, 
  Settings, 
  Building2, 
  Factory, 
  ShoppingCart,
  CheckCircle,
  Globe,
  Users,
  Zap
} from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-lighter via-white to-onealgo-light py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <OneAlgorithmText size="xl" className="justify-center" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-onealgo-blue-950">Reimagine.</span>{" "}
              <span className="text-onealgo-orange-500">Connect.</span>{" "}
              <span className="text-onealgo-blue-950">Accelerate.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Think bigger. Build smarter. Move faster — with solutions tailored to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-8 py-4 text-lg"
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-onealgo-blue-950 text-onealgo-blue-950 hover:bg-onealgo-blue-950 hover:text-white px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why OneAlgorithm Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-onealgo-orange-500">One</span>
              <span className="text-onealgo-blue-950">Algorithm</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We streamline operations, automate the busywork, and build tools that let you focus on what matters: growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Goals-First Approach */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <Target className="w-12 h-12 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">Goals-First Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Solutions designed around your business goals — not the other way around. Every system is built to drive measurable results.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> The process begins with a deep understanding of your model, challenges, and growth targets before any technology is recommended.</p>
                  <p><strong>Go deeper:</strong> Discovery workshops, process mapping, and data analysis ensure that every solution aligns with the outcomes that matter most — revenue, efficiency, and customer satisfaction.</p>
                </div>
              </CardContent>
            </Card>

            {/* Complete Connection */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <LinkIcon className="w-12 h-12 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">Complete Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sales, Service, Marketing, Finance, and Operations connected into one seamless system.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> A connected business runs faster, with fewer silos and less friction between departments.</p>
                  <p><strong>Go deeper:</strong> A single source of truth across all business units delivers leadership visibility, stronger collaboration, and a smoother customer journey from first touch to fulfillment.</p>
                </div>
              </CardContent>
            </Card>

            {/* Focus on Growth */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">Focus on Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automation and streamlined operations free teams to focus on strategy and growth.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> Repetitive tasks are replaced with efficient workflows, saving valuable time every week.</p>
                  <p><strong>Go deeper:</strong> From lead routing to financial reporting, automation reduces errors, increases accountability, and empowers teams to focus on innovation instead of routine admin.</p>
                </div>
              </CardContent>
            </Card>

            {/* Tailored Solutions */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
              <CardHeader>
                <Settings className="w-12 h-12 text-onealgo-orange-500 mb-4" />
                <CardTitle className="text-onealgo-blue-950">Tailored Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Every implementation is customized to unique processes, industry standards, and long-term vision.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> No cookie-cutter setups — technology adapts to the business, not the other way around.</p>
                  <p><strong>Go deeper:</strong> Specialized solutions are built for complex industries. Construction, finance, healthcare, and beyond — each system is aligned to workflows, compliance needs, and customer expectations.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We Specialize In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored Salesforce solutions for your industry's unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Construction */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
              <CardHeader>
                <Building2 className="w-16 h-16 text-onealgo-blue-950 mb-4" />
                <CardTitle className="text-2xl text-onealgo-blue-950">Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Keep projects on track with smarter coordination, automated task management, and real-time visibility from the field to the office.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> Centralize schedules, budgets, and communication to avoid delays and costly missteps.</p>
                  <p><strong>Go deeper:</strong> Integrations link field teams, subcontractors, and back-office operations — delivering a single, clear view of every project milestone.</p>
                </div>
              </CardContent>
            </Card>

            {/* Manufacturing */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
              <CardHeader>
                <Factory className="w-16 h-16 text-onealgo-blue-950 mb-4" />
                <CardTitle className="text-2xl text-onealgo-blue-950">Manufacturing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Boost efficiency with connected systems, streamlined production workflows, and live data insights.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> Track production, inventory, and supply chain activity in one place.</p>
                  <p><strong>Go deeper:</strong> Automated workflows reduce downtime, optimize capacity planning, and ensure every resource is used at its best.</p>
                </div>
              </CardContent>
            </Card>

            {/* Marketing & Commerce */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
              <CardHeader>
                <ShoppingCart className="w-16 h-16 text-onealgo-blue-950 mb-4" />
                <CardTitle className="text-2xl text-onealgo-blue-950">Marketing & Commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Deliver personalized experiences, fuel customer loyalty, and turn data into scalable commerce growth.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Learn more:</strong> Create campaigns that adapt instantly to customer behavior.</p>
                  <p><strong>Go deeper:</strong> AI-driven insights connect marketing, sales, and commerce — giving every customer interaction a consistent, engaging touch.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AMC Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Annual Maintenance Contract <span className="text-onealgo-orange-500">(AMC)</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                End-to-end management of your systems, so the team can stay focused on driving sales.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Learn more:</strong> Proactive monitoring, regular updates, and 24/7 support keep operations running without disruption.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <strong>Go deeper:</strong> AMC covers everything from system optimization and troubleshooting to user training and performance tuning — ensuring technology stays aligned with evolving business goals.
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
              >
                Learn About AMC
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Globe className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock monitoring and support</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Expert Team</h3>
                <p className="text-gray-600">Dedicated specialists for your systems</p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Proactive Updates</h3>
                <p className="text-gray-600">Stay ahead with regular optimizations</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Performance Tuning</h3>
                <p className="text-gray-600">Continuous system optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-onealgo-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Let's talk about how OneAlgorithm can streamline your operations and accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4 text-lg"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

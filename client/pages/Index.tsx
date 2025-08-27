import React from "react";
import Layout from "../components/Layout";
import OneAlgorithmText from "../components/OneAlgorithmText";
import CollapsibleDetails from "../components/CollapsibleDetails";
import DetailedCollapsible from "../components/DetailedCollapsible";
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
      <section
        className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 94, 170, 0.7), rgba(0, 94, 170, 0.5)), url('https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fe4cc18ffb8df4986a719ab3b27dcbabc?format=webp&width=1920')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              <span className="text-white drop-shadow-lg">Reimagine.</span>{" "}
              <span className="text-onealgo-orange-500 drop-shadow-lg">Connect.</span>{" "}
              <span className="text-white drop-shadow-lg">Accelerate.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto drop-shadow-md animate-fade-in-up">
              Think bigger. Build smarter. Move faster — with solutions tailored to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why OneAlgorithm Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Why <span className="text-onealgo-orange-500">One</span>
              <span className="text-onealgo-blue-950">Algorithm</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              We streamline operations, automate the busywork, and build tools that let you focus on what matters: growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Goals-First Approach */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <Target className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" />
                <CardTitle className="text-onealgo-blue-950">Goals-First Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Solutions designed around your business goals — not the other way around. Every system is built to drive measurable results.
                </p>
                <CollapsibleDetails
                  learnMore="The process begins with a deep understanding of your model, challenges, and growth targets before any technology is recommended."
                  goDeeper="Discovery workshops, process mapping, and data analysis ensure that every solution aligns with the outcomes that matter most — revenue, efficiency, and customer satisfaction."
                />
              </CardContent>
            </Card>

            {/* Complete Connection */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <LinkIcon className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{animationDelay: '0.5s'}} />
                <CardTitle className="text-onealgo-blue-950">Complete Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Sales, Service, Marketing, Finance, and Operations connected into one seamless system.
                </p>
                <CollapsibleDetails
                  learnMore="A connected business runs faster, with fewer silos and less friction between departments."
                  goDeeper="A single source of truth across all business units delivers leadership visibility, stronger collaboration, and a smoother customer journey from first touch to fulfillment."
                />
              </CardContent>
            </Card>

            {/* Focus on Growth */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{animationDelay: '1s'}} />
                <CardTitle className="text-onealgo-blue-950">Focus on Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automation and streamlined operations free teams to focus on strategy and growth.
                </p>
                <CollapsibleDetails
                  learnMore="Repetitive tasks are replaced with efficient workflows, saving valuable time every week."
                  goDeeper="From lead routing to financial reporting, automation reduces errors, increases accountability, and empowers teams to focus on innovation instead of routine admin."
                />
              </CardContent>
            </Card>

            {/* Tailored Solutions */}
            <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <Settings className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{animationDelay: '1.5s'}} />
                <CardTitle className="text-onealgo-blue-950">Tailored Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Every implementation is customized to unique processes, industry standards, and long-term vision.
                </p>
                <CollapsibleDetails
                  learnMore="No cookie-cutter setups — technology adapts to the business, not the other way around."
                  goDeeper="Specialized solutions are built for complex industries. Construction, finance, healthcare, and beyond — each system is aligned to workflows, compliance needs, and customer expectations."
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Industries We Specialize In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Tailored Salesforce solutions for your industry's unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Construction */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Building2 className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-onealgo-orange-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailedCollapsible
                  title="Construction"
                  summary="Keep projects on track with smarter coordination, automated task management, and real-time visibility from the field to the office."
                  details={[
                    "Centralize schedules, budgets, and communication to avoid delays and costly missteps",
                    "Integrations link field teams, subcontractors, and back-office operations",
                    "Single, clear view of every project milestone and progress tracking",
                    "Real-time field updates sync directly with office management systems",
                    "Automated compliance tracking and safety protocol management"
                  ]}
                />
              </CardContent>
            </Card>

            {/* Manufacturing */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Factory className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-green-500 transition-colors duration-300" style={{animationDelay: '0.5s'}} />
                <CardTitle className="text-2xl text-onealgo-blue-950">Manufacturing</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailedCollapsible
                  title="Manufacturing"
                  summary="Boost efficiency with connected systems, streamlined production workflows, and live data insights."
                  details={[
                    "Track production, inventory, and supply chain activity in one unified platform",
                    "Automated workflows reduce downtime and optimize capacity planning",
                    "Real-time quality control monitoring and defect tracking",
                    "Predictive maintenance scheduling to prevent equipment failures",
                    "Resource optimization ensures maximum efficiency and minimal waste"
                  ]}
                />
              </CardContent>
            </Card>

            {/* Marketing & Commerce */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <ShoppingCart className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-purple-500 transition-colors duration-300" style={{animationDelay: '1s'}} />
                <CardTitle className="text-2xl text-onealgo-blue-950">Marketing & Commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailedCollapsible
                  title="Marketing & Commerce"
                  summary="Deliver personalized experiences, fuel customer loyalty, and turn data into scalable commerce growth."
                  details={[
                    "Create campaigns that adapt instantly to customer behavior and preferences",
                    "AI-driven insights connect marketing, sales, and commerce platforms",
                    "Personalized customer journeys from first touch to conversion",
                    "Advanced analytics for ROI tracking and campaign optimization",
                    "Automated lead nurturing and customer retention workflows"
                  ]}
                />
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                Annual Maintenance Contract <span className="text-onealgo-orange-500">(AMC)</span>
              </h2>
              <DetailedCollapsible
                title="AMC Benefits"
                summary="End-to-end system management with proactive monitoring, 24/7 support, and continuous optimization — keeping your team focused on driving sales while technology evolves with your business goals."
                details={[
                  "24/7 proactive monitoring and immediate issue resolution",
                  "Regular system updates and security patches",
                  "Comprehensive user training and onboarding support",
                  "Performance tuning and system optimization",
                  "Troubleshooting and technical support",
                  "Strategic technology alignment with business goals",
                  "Backup and disaster recovery management",
                  "Custom workflow development and refinement"
                ]}
              />
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
                    <strong>Go deeper:</strong> AMC covers everything from system optimization and troubleshooting to user training and performance tuning �� ensuring technology stays aligned with evolving business goals.
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
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Globe className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock monitoring and support</p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Users className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4 animate-pulse-slow" style={{animationDelay: '0.5s'}} />
                <h3 className="text-lg font-semibold text-gray-900">Expert Team</h3>
                <p className="text-gray-600">Dedicated specialists for your systems</p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Zap className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4 animate-pulse-slow" style={{animationDelay: '1s'}} />
                <h3 className="text-lg font-semibold text-gray-900">Proactive Updates</h3>
                <p className="text-gray-600">Stay ahead with regular optimizations</p>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4 animate-pulse-slow" style={{animationDelay: '1.5s'}} />
                <h3 className="text-lg font-semibold text-gray-900">Performance Tuning</h3>
                <p className="text-gray-600">Continuous system optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}

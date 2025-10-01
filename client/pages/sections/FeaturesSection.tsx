import * as React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { Target, Link as LinkIcon, TrendingUp, Settings } from "lucide-react";

export default function FeaturesSection() {
  return (
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
          <h2 className="text-2xl md:hidden font-bold text-gray-900 mb-6 mt-8 text-center">
            Leading Technology Solutions for Business Transformation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <Target className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" />
              <CardTitle className="text-onealgo-blue-950">Goals-First Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Solutions designed around your business goals — not the other way around. Every system is built to drive measurable results.
              </p>
              <Collapsible trigger="Learn More">
                Our process begins with discovery workshops, process mapping, and data analysis that align technology with revenue, efficiency, and customer satisfaction outcomes.
              </Collapsible>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <LinkIcon className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{ animationDelay: "0.5s" }} />
              <CardTitle className="text-onealgo-blue-950">Complete Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sales, Service, <Link to="/services/marketing" className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline">Marketing</Link>, Finance, and <Link to="/services/operations-technology" className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline">Operations</Link> connected into one seamless system.
              </p>
              <Collapsible trigger="Learn More">
                A single source of truth across all business units delivers leadership visibility, stronger collaboration, and a smoother customer journey from first touch to fulfillment. Explore our {" "}
                <Link to="/services/it-consulting" className="text-onealgo-blue-950 hover:text-onealgo-orange-500 underline">IT consulting services</Link> {" "}
                to learn more.
              </Collapsible>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{ animationDelay: "1s" }} />
              <CardTitle className="text-onealgo-blue-950">Focus on Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Automation and streamlined operations free teams to focus on strategy and growth.</p>
              <Collapsible trigger="Learn More">
                From lead routing to financial reporting, efficient workflows reduce errors, increase accountability, and empower teams to innovate instead of handling routine admin tasks.
              </Collapsible>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-onealgo-orange-500 transition-colors hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <Settings className="w-12 h-12 text-onealgo-orange-500 mb-4 animate-float" style={{ animationDelay: "1.5s" }} />
              <CardTitle className="text-onealgo-blue-950">Tailored Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Every implementation is customized to unique processes, industry standards, and long-term vision.</p>
              <Collapsible trigger="Learn More">
                Specialized solutions adapt technology to your business across construction, finance, healthcare, and beyond — aligning with workflows, compliance needs, and customer expectations.
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

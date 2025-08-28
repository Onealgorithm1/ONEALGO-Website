import React from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Building2, Factory, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Industries() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Industries We <span className="text-onealgo-orange-500">Serve</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Specialized technology solutions designed for your industry's unique challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Industry Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that every industry has unique challenges. Our solutions are tailored to meet the specific needs of your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Construction */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Building2 className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-onealgo-orange-500 transition-colors duration-300" />
                <CardTitle className="text-2xl text-onealgo-blue-950">Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Keep projects on track with smarter coordination, automated task management, and real-time visibility from the field to the office.
                </p>
                <Button 
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/industries/construction">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Manufacturing */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <Factory className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-green-500 transition-colors duration-300" style={{animationDelay: '0.5s'}} />
                <CardTitle className="text-2xl text-onealgo-blue-950">Manufacturing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Boost efficiency with connected systems, streamlined production workflows, and live data insights.
                </p>
                <Button 
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/industries/manufacturing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Marketing */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <svg className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-purple-500 transition-colors duration-300" style={{animationDelay: '1s'}} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <CardTitle className="text-2xl text-onealgo-blue-950">Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create campaigns that adapt instantly to customer behavior and preferences with AI-driven insights and automated lead nurturing.
                </p>
                <Button 
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/industries/marketing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* E-Commerce */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <ShoppingCart className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-green-500 transition-colors duration-300" style={{animationDelay: '1.2s'}} />
                <CardTitle className="text-2xl text-onealgo-blue-950">E-Commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Scale your online business with integrated platforms that connect inventory, payments, and customer data for streamlined operations.
                </p>
                <Button 
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/industries/ecommerce">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Website Development */}
            <Card className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <svg className="w-16 h-16 text-onealgo-blue-950 mb-4 animate-bounce-slow hover:text-blue-500 transition-colors duration-300" style={{animationDelay: '1.5s'}} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3a2 2 0 002 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2zm0 12H9V5h10v10z"/>
                </svg>
                <CardTitle className="text-2xl text-onealgo-blue-950">Website Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Modern, responsive websites built for performance and user experience. From corporate sites to complex web applications.
                </p>
                <Button 
                  asChild
                  className="w-full bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white"
                >
                  <Link to="/industries/website-development">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-onealgo-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We work with businesses across many sectors. Let's discuss how our solutions can be tailored to your specific industry needs.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white px-8 py-4"
          >
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}

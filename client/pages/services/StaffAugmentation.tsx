import React from "react";
import Layout from "../../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Users,
  Clock,
  Target,
  CheckCircle,
  Code,
  Database,
  Smartphone,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StaffAugmentation() {
  const skills = [
    { icon: Code, name: "Full-Stack Development", description: "React, Node.js, Python, .NET" },
    { icon: Smartphone, name: "Mobile Development", description: "iOS, Android, React Native" },
    { icon: Database, name: "Data Engineering", description: "SQL, NoSQL, Big Data, Analytics" },
    { icon: Globe, name: "DevOps & Cloud", description: "AWS, Azure, Docker, Kubernetes" },
    { icon: Shield, name: "Cybersecurity", description: "Security Audits, Compliance" },
    { icon: Zap, name: "AI & Machine Learning", description: "Python, TensorFlow, Data Science" },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Rapid Scaling",
      description: "Scale your team up or down quickly based on project needs without the overhead of traditional hiring."
    },
    {
      icon: Target,
      title: "Specialized Expertise",
      description: "Access highly skilled professionals with specific technical expertise for your unique requirements."
    },
    {
      icon: CheckCircle,
      title: "Cost Effective",
      description: "Reduce recruitment costs and overhead while maintaining high-quality deliverables."
    },
    {
      icon: Users,
      title: "Seamless Integration",
      description: "Our professionals integrate seamlessly with your existing team and workflows."
    },
  ];

  const engagementModels = [
    {
      title: "Dedicated Teams",
      description: "Full-time dedicated teams working exclusively on your projects with deep integration into your processes.",
      features: ["Full-time commitment", "Deep project knowledge", "Long-term partnership", "Direct communication"]
    },
    {
      title: "Project-Based",
      description: "Expert professionals assigned to specific projects with defined deliverables and timelines.",
      features: ["Fixed scope delivery", "Milestone-based progress", "Specialized skills", "Defined timelines"]
    },
    {
      title: "Hourly Consulting",
      description: "Flexible hourly engagement for specific tasks, code reviews, or technical consultation.",
      features: ["Flexible scheduling", "Expert consultation", "Task-specific help", "Cost-effective"]
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Staff <span className="text-onealgo-orange-500">Augmentation</span>
              </h1>
              <ul className="text-xl text-blue-200 mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Flexible staffing for exceptional outcomes.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Scale your workforce without the overhead.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  On-demand experts for your projects.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Expert support, exactly when you need it.
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Get Started Today</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <Users className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-4" />
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Expert Teams</h3>
                  <p className="text-blue-200">Ready to integrate with your projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Staff Augmentation?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the talent you need, when you need it, without the overhead of traditional hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
                <CardHeader className="text-center">
                  <benefit.icon className="w-12 h-12 text-onealgo-blue-950 mx-auto mb-4" />
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our professionals bring deep expertise across a wide range of technologies and domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-lg">
                <CardHeader>
                  <skill.icon className="w-12 h-12 text-onealgo-blue-950 mb-4" />
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {skill.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Engagement Models
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the engagement model that best fits your project requirements and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <Card key={index} className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-onealgo-blue-950 text-center">
                    {model.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 text-center">{model.description}</p>
                  <ul className="space-y-2">
                    {model.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a structured approach to ensure the right talent for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Requirements Analysis", description: "We analyze your project requirements, technical stack, and team dynamics." },
              { step: "2", title: "Talent Matching", description: "We select professionals with the exact skills and experience you need." },
              { step: "3", title: "Integration", description: "Seamless onboarding and integration with your existing team and processes." },
              { step: "4", title: "Ongoing Support", description: "Continuous support and performance monitoring throughout the engagement." },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-onealgo-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Scale Your Team?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Let's discuss your staffing needs and find the perfect professionals for your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

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
  Cpu,
  Gauge,
  Wrench,
  Activity,
  Shield,
  Zap,
  CheckCircle,
  Cog,
  BarChart3,
  Monitor,
  Factory,
  Settings,
} from "lucide-react";

export default function OperationsTechnology() {
  const services = [
    {
      icon: <Factory className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Industrial Automation",
      description:
        "Implement automated systems to optimize manufacturing processes and increase efficiency.",
    },
    {
      icon: <Monitor className="w-8 h-8 text-onealgo-orange-500" />,
      title: "SCADA Systems",
      description:
        "Design and deploy supervisory control and data acquisition systems for real-time monitoring.",
    },
    {
      icon: <Gauge className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Process Optimization",
      description:
        "Analyze and optimize operational processes using data-driven insights and advanced analytics.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-onealgo-orange-500" />,
      title: "IoT Integration",
      description:
        "Connect industrial equipment and sensors for comprehensive operational visibility.",
    },
    {
      icon: <Shield className="w-8 h-8 text-onealgo-orange-500" />,
      title: "OT Security",
      description:
        "Secure operational technology environments against cyber threats and vulnerabilities.",
    },
    {
      icon: <Settings className="w-8 h-8 text-onealgo-orange-500" />,
      title: "Maintenance Systems",
      description:
        "Implement predictive and preventive maintenance systems to reduce downtime.",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Operational Efficiency",
      description: "Streamline operations and reduce waste through intelligent automation and optimization."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Decisions",
      description: "Make informed decisions with real-time operational data and advanced analytics."
    },
    {
      icon: Activity,
      title: "Improved Reliability",
      description: "Enhance system reliability and reduce unplanned downtime through proactive monitoring."
    },
    {
      icon: Cog,
      title: "Seamless Integration",
      description: "Integrate OT systems with existing IT infrastructure for unified operations."
    },
  ];

  const applications = [
    {
      title: "Manufacturing",
      description: "Smart factory solutions, production line automation, and quality control systems.",
      features: ["Production Monitoring", "Quality Assurance", "Equipment Optimization", "Supply Chain Integration"]
    },
    {
      title: "Construction",
      description: "Project management, site coordination, and building information modeling (BIM) systems.",
      features: ["Project Planning", "Site Monitoring", "Equipment Tracking", "Safety Compliance"]
    },
    {
      title: "E-Commerce",
      description: "Inventory management, warehouse automation, and fulfillment optimization systems.",
      features: ["Inventory Control", "Order Processing", "Logistics Automation", "Customer Analytics"]
    },
  ];

  const process = [
    { step: "1", title: "Assessment", description: "Evaluate current operational technology infrastructure and identify improvement opportunities." },
    { step: "2", title: "Design", description: "Create comprehensive OT architecture and integration strategies tailored to your operations." },
    { step: "3", title: "Implementation", description: "Deploy OT solutions with minimal disruption to ongoing operations." },
    { step: "4", title: "Optimization", description: "Continuously monitor and optimize systems for peak performance and efficiency." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-blue-950 via-onealgo-blue-900 to-onealgo-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Operations <span className="text-onealgo-orange-500">Technology</span>
              </h1>
              <ul className="text-xl text-blue-200 mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Industrial automation and process optimization.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  SCADA systems and real-time monitoring.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  IoT integration and smart operations.
                </li>
                <li className="flex items-start">
                  <span className="text-onealgo-orange-500 mr-3">•</span>
                  Secure and reliable operational systems.
                </li>
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4"
              >
                <Link to="/contact">Optimize Your Operations</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <Cpu className="w-24 h-24 text-onealgo-orange-500 mx-auto mb-4" />
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Smart Operations</h3>
                  <p className="text-blue-200">Connecting technology to operational excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Operations Technology Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive OT solutions that bridge the gap between operational processes
              and modern technology capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-onealgo-blue-950 transition-colors h-full hover:shadow-lg">
                <CardHeader>
                  {service.icon}
                  <CardTitle className="text-xl text-onealgo-blue-950">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-onealgo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage operations technology to achieve operational excellence and competitive advantage.
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

      {/* Industry Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored operations technology solutions for diverse industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="border-2 hover:border-onealgo-blue-950 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-onealgo-blue-950 text-center">
                    {app.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 text-center">{app.description}</p>
                  <ul className="space-y-2">
                    {app.features.map((feature, featureIndex) => (
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
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to implementing operations technology that ensures minimal
              disruption and maximum value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-onealgo-blue-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Technology Focus Areas
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Industrial IoT:</strong> Connect equipment, sensors, and systems for comprehensive operational visibility.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Edge Computing:</strong> Process data at the source for real-time decision making and reduced latency.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>Digital Twins:</strong> Create virtual representations of physical assets for predictive analytics.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    <strong>AI/ML Integration:</strong> Apply machine learning for predictive maintenance and process optimization.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-onealgo-light rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to Modernize Your Operations?
              </h3>
              <p className="text-gray-600 mb-6">
                Let's discuss how operations technology can transform your industrial processes
                and drive operational excellence.
              </p>
              <Button
                asChild
                className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
              >
                <Link to="/contact">Start Your OT Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-onealgo-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Optimize Your Operations Today
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Transform your industrial operations with cutting-edge technology solutions and expert guidance.
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

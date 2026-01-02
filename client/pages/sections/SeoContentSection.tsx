import * as React from "react";
import { Link } from "react-router-dom";
import { Collapsible } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SeoContentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Leading Technology Solutions for Business Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            OneAlgorithm empowers businesses across Construction, Manufacturing,
            and E-Commerce industries with cutting-edge technology solutions
            that drive growth, efficiency, and competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
              Expert IT Consulting Services
            </h3>
            <p className="text-gray-700 mb-4">
              Our certified IT consultants provide strategic technology
              planning, cybersecurity assessments, and digital transformation
              roadmaps.
            </p>
            <Collapsible trigger="Read More">
              <p className="text-gray-700 mb-4">
                We analyze your current infrastructure, identify optimization
                opportunities, and develop comprehensive strategies that align
                technology investments with business objectives. Our expert team
                brings 15+ years of experience across multiple technology
                domains.
              </p>
              <p className="text-gray-700">
                From cloud migration and system integration to technology audits
                and performance optimization, our IT consulting services have
                helped over 200 businesses reduce operational costs while
                improving efficiency and scalability. Our proven methodologies
                deliver measurable results with an average 40% cost reduction
                within 6 months.
              </p>
            </Collapsible>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
              Professional Website Development
            </h3>
            <p className="text-gray-700 mb-4">
              We create responsive, high-performance websites and web
              applications that drive conversions and enhance user experience.
            </p>
            <Collapsible trigger="Read More">
              <p className="text-gray-700 mb-4">
                Our development team specializes in modern frameworks,
                e-commerce platforms, content management systems, and SEO
                optimization. We follow industry best practices for security,
                accessibility, and performance optimization.
              </p>
              <p className="text-gray-700">
                Whether you need a corporate website, e-commerce platform, or
                custom web application, our development process ensures fast
                loading times, mobile responsiveness, and search engine
                optimization for maximum online visibility. Our websites
                consistently achieve 95+ PageSpeed scores and deliver
                exceptional user experiences across all devices.
              </p>
            </Collapsible>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
              Operations Technology Solutions
            </h3>
            <p className="text-gray-700 mb-4">
              Transform your operations with industrial automation, IoT
              integration, SCADA systems, and process optimization solutions.
            </p>
            <Collapsible trigger="Read More">
              <p className="text-gray-700 mb-4">
                Our operations technology experts design and implement systems
                that improve efficiency, reduce downtime, and enhance
                operational visibility. We specialize in integrating
                cutting-edge OT solutions with existing enterprise systems for
                seamless data flow and comprehensive insights.
              </p>
              <p className="text-gray-700">
                From manufacturing automation to construction project management
                systems, we deliver OT solutions that integrate seamlessly with
                existing infrastructure while providing real-time insights and
                predictive maintenance capabilities. Our implementations
                typically result in 30-50% reduction in operational downtime and
                significant improvements in overall equipment effectiveness
                (OEE).
              </p>
            </Collapsible>
          </div>
        </div>

        <div className="md:hidden text-center p-6">
          <h3 className="text-2xl font-bold mb-2">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-700 mb-4 max-w-md mx-auto">
            Join industry leaders who trust OneAlgorithm for their technology
            transformation. Our expert consultants are ready to assess your
            current systems and develop a customized roadmap for success.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
        <div className="bg-onealgo-light rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                Industry-Specific Technology Expertise
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Construction Technology
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Project management systems, BIM integration, field data
                    collection, equipment tracking, safety compliance tools, and
                    workforce management solutions tailored for construction
                    companies.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Manufacturing Systems
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Production planning, quality control systems, inventory
                    management, supply chain optimization, equipment monitoring,
                    and lean manufacturing implementations.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    E-Commerce Solutions
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Online store development, payment integration, inventory
                    synchronization, customer analytics, marketing automation,
                    and multi-channel selling platforms.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-onealgo-blue-950 mb-6">
                Why Businesses Choose OneAlgorithm
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Proven Track Record
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Successfully delivered 500+ technology projects with 98%
                      client satisfaction rate
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Team</h4>
                    <p className="text-gray-700 text-sm">
                      Certified consultants with 15+ years of industry
                      experience across multiple technology domains
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Measurable Results
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Average 40% cost reduction and 60% efficiency improvement
                      within 6 months of implementation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      24/7 Support
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Round-the-clock technical support and maintenance across
                      all time zones and geographic locations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-onealgo-blue-950 to-onealgo-blue-800 text-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-blue-200 mb-6 max-w-3xl mx-auto">
            Join industry leaders who trust OneAlgorithm for their technology
            transformation. Our expert consultants are ready to assess your
            current systems and develop a customized roadmap for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-onealgo-orange-500 hover:bg-onealgo-orange-600 text-white px-8 py-4 text-lg"
            >
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-onealgo-blue-950 px-8 py-4 text-lg"
            >
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

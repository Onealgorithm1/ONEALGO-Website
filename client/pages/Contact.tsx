import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Mail, Phone, MapPin, Loader2, CheckCircle, Clock } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createContactPageSchema,
} from "../components/StructuredData";

// TypeScript declarations for Google Analytics tracking
declare global {
  interface Window {
    trackFormSubmission?: () => void;
  }
}

export default function Contact() {
  useSEO({
    title: "OneAlgorithm — Contact Us",
    description:
      "Contact OneAlgorithm for IT consulting, web development, and automation solutions.",
    canonical: getCanonicalUrl("/contact"),
    ogTitle: "OneAlgorithm — Contact Us",
    ogDescription:
      "Get in touch with OneAlgorithm for technology consulting and services.",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whatYouNeed: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Create and submit Salesforce form
      const salesforceForm = document.createElement("form");
      salesforceForm.method = "POST";
      salesforceForm.action =
        "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dbn00000plgUf";
      salesforceForm.style.display = "none";

      // Add hidden fields
      const addHiddenField = (name: string, value: string) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = name;
        hiddenField.value = value;
        salesforceForm.appendChild(hiddenField);
      };

      addHiddenField("oid", "00Dbn00000plgUf");
      addHiddenField("retURL", window.location.href);

      // Map form data to Salesforce fields
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      addHiddenField("first_name", firstName);
      addHiddenField("last_name", lastName);
      addHiddenField("email", formData.email);
      addHiddenField("company", formData.company);
      addHiddenField("description", `Service: ${formData.whatYouNeed}\n\n${formData.message}`);

      // Submit in a hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "salesforce-submit";
      document.body.appendChild(iframe);

      salesforceForm.target = "salesforce-submit";
      document.body.appendChild(salesforceForm);
      salesforceForm.submit();

      // Show success message
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track form submission with Google Analytics
      if (typeof window.trackFormSubmission === "function") {
        window.trackFormSubmission();
      }

      // Clean up after submission
      setTimeout(() => {
        if (document.body.contains(salesforceForm)) {
          document.body.removeChild(salesforceForm);
        }
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("An error occurred while submitting your message. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <Layout>
      <StructuredData data={createContactPageSchema()} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-lighter via-white to-onealgo-light py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Let's Talk About Growing Your{" "}
              <span className="text-onealgo-orange-500">Business</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below, and we'll get back to you within 24
              hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                    Get Expert Consultation
                  </h2>
                  <p className="text-gray-600 mb-6 sm:mb-8">
                    We'll respond within 24 hours with a personalized recommendation.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="polite">
                        <p className="text-red-800 text-sm">{submitError}</p>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="name" className="text-gray-700">
                        Your Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="First and last name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-gray-700">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatYouNeed" className="text-gray-700">
                        What do you need? <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.whatYouNeed}
                        onValueChange={(value) =>
                          handleSelectChange("whatYouNeed", value)
                        }
                        required
                      >
                        <SelectTrigger className="mt-1" disabled={isSubmitting}>
                          <SelectValue placeholder="Select your service needs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oracle ERP Implementation">
                            Oracle ERP Implementation
                          </SelectItem>
                          <SelectItem value="IT Consulting">
                            IT Consulting & Strategy
                          </SelectItem>
                          <SelectItem value="Website Development">
                            Website Development
                          </SelectItem>
                          <SelectItem value="Operations Technology">
                            Operations Technology
                          </SelectItem>
                          <SelectItem value="Marketing Services">
                            Marketing Services
                          </SelectItem>
                          <SelectItem value="Staff Augmentation">
                            Staff Augmentation
                          </SelectItem>
                          <SelectItem value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700">
                        Tell us more (optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Describe your project, challenges, or goals..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 min-h-[100px]"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Schedule a Consultation"
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                /* Thank You Card */
                <div className="text-center space-y-6 animate-in fade-in-50 duration-700">
                  {/* Success Icon */}
                  <div className="relative mb-8">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    {/* Animated rings */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-green-400 opacity-20 animate-ping"></div>
                  </div>

                  {/* Thank You Message */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      Thank You!
                    </h2>
                    <p className="text-xl text-gray-700 mb-2 font-medium">
                      Your message has been sent successfully
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      We've received your inquiry and our team will get back to
                      you within 24 hours.
                    </p>
                  </div>

                  {/* What Happens Next */}
                  <div className="bg-gradient-to-r from-onealgo-blue-950 to-onealgo-blue-900 rounded-xl p-6 text-white text-left">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      What happens next?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            1
                          </span>
                        </div>
                        <p className="text-sm">
                          You'll receive a confirmation email shortly
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            2
                          </span>
                        </div>
                        <p className="text-sm">
                          Our team will review your requirements
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-onealgo-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">
                            3
                          </span>
                        </div>
                        <p className="text-sm">
                          We'll contact you within 24 hours with next steps
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact for Urgent Matters */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Clock className="w-4 h-4 text-onealgo-orange-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Need immediate assistance?
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      For urgent matters, contact us directly:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                      <a
                        href="tel:16108909711"
                        className="text-onealgo-blue-950 hover:text-onealgo-orange-500 font-medium"
                      >
                        📞 1 (610) 890-9711
                      </a>
                      <span className="hidden sm:inline text-gray-400">|</span>
                      <a
                        href="mailto:Service@onealgorithm.com"
                        className="text-onealgo-blue-950 hover:text-onealgo-orange-500 font-medium"
                      >
                        ✉️ Service@onealgorithm.com
                      </a>
                    </div>
                  </div>

                  {/* Send Another Message Button */}
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        whatYouNeed: "",
                        message: "",
                      });
                      setSubmitError(null);
                    }}
                    variant="outline"
                    size="lg"
                    className="border-2 border-onealgo-orange-500 text-onealgo-orange-500 hover:bg-onealgo-orange-500 hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-onealgo-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">Service@onealgorithm.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-onealgo-orange-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">1 (610) 890-9711</p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mb-8">
                <div className="w-full rounded overflow-hidden shadow-sm">
                  <iframe
                    title="OneAlgorithm Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.4774062403612!2d-75.5771397!3d40.042445799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f327d5340c9d%3A0x218ca530a72f1726!2sOneAlgorithm%20Consulting!5e0!3m2!1sen!2sus!4v1759511875621!5m2!1sen!2sus"
                    className="w-full h-64 sm:h-96 border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Global Offices - full width row under the contact form and map */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Our Global Offices
          </h3>
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="h-full border-2 hover:border-onealgo-orange-500 transition-colors p-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-onealgo-blue-950 text-lg">
                    <span className="text-xl">🇺🇸</span>
                    USA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-sm">
                        625 Swedesford Rd
                        <br />
                        Malvern, PA 19355
                        <br />
                        1 (610) 890-9711
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border-2 hover:border-onealgo-orange-500 transition-colors p-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-onealgo-blue-950 text-lg">
                    <span className="text-xl">🇮🇳</span>
                    India
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-sm">
                        2nd Floor, Plot No. 536
                        <br />
                        Madhapur, Hyderabad
                        <br />
                        Telangana 500081, IN
                        <br />
                        +91 98765 43211
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border-2 hover:border-onealgo-orange-500 transition-colors p-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-onealgo-blue-950 text-lg">
                    <span className="text-xl">🇦🇪</span>
                    UAE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-sm">
                        Building R118, Suite 201-A-42
                        <br />
                        Al Suq Al Kabeer, Dubai
                        <br />
                        +971 4 123 4567
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border-2 hover:border-onealgo-orange-500 transition-colors p-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-onealgo-blue-950 text-lg">
                    <span className="text-xl">🇨🇦</span>
                    Canada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 text-sm">
                        120 Adelaide St W<br />
                        Toronto, ON M5H 1T1
                        <br />
                        +1 (416) 555-1234
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose OneAlgorithm for Your Technology Needs?
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  OneAlgorithm is a leading technology consultancy specializing
                  in IT consulting, website development, operations technology,
                  and staff augmentation services. Our expert team has helped
                  hundreds of businesses across Construction, Manufacturing, and
                  E-Commerce industries transform their operations through
                  intelligent technology solutions.
                </p>
                <p>
                  We understand that every business faces unique challenges.
                  That's why our approach begins with a comprehensive assessment
                  of your current systems, processes, and goals. Our certified
                  consultants work closely with your team to develop customized
                  technology roadmaps that align with your business objectives
                  and drive measurable results.
                </p>
                <p>
                  From strategic IT planning and cybersecurity assessments to
                  custom website development and industrial automation,
                  OneAlgorithm delivers end-to-end technology solutions. Our
                  proven methodologies have helped clients reduce operational
                  costs by up to 40% while improving efficiency and scalability.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Comprehensive Technology Services
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-onealgo-blue-950 mb-2">
                    IT Consulting & Strategic Planning
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Technology audits, digital transformation strategies,
                    cybersecurity assessments, cloud migration planning, and
                    business process optimization to align IT infrastructure
                    with business goals.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-onealgo-blue-950 mb-2">
                    Website Development & Design
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Custom website development, responsive design, e-commerce
                    platforms, SEO optimization, content management systems, and
                    performance optimization for enhanced user experience.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-onealgo-blue-950 mb-2">
                    Operations Technology Solutions
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Industrial automation, SCADA systems, IoT integration,
                    process optimization, equipment monitoring, predictive
                    maintenance, and operational efficiency improvements.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-onealgo-blue-950 mb-2">
                    Staff Augmentation & Talent Solutions
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Skilled developers, IT specialists, project managers,
                    technical consultants, and subject matter experts to scale
                    your team with the right talent for short-term or long-term
                    projects.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-onealgo-blue-950 mb-2">
                    Marketing Technology & Automation
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Campaign management, marketing automation, customer journey
                    optimization, data analytics, CRM integration, and ROI
                    tracking to maximize marketing effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Ready to Transform Your Business with Technology?
            </h3>
            <p className="text-gray-700 text-center mb-6 max-w-3xl mx-auto">
              Join hundreds of successful businesses that have partnered with
              OneAlgorithm to streamline operations, reduce costs, and
              accelerate growth. Our technology experts are ready to analyze
              your current systems and develop a customized roadmap for digital
              transformation.
            </p>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Contact us today for a free consultation and discover how
                OneAlgorithm's proven technology solutions can drive your
                business forward. We serve clients across the United States,
                Canada, India, and the UAE with 24/7 support and expert
                guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

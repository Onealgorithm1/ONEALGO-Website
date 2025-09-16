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

// TypeScript declarations for Google Analytics tracking
declare global {
  interface Window {
    trackFormSubmission?: () => void;
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companySize: "",
    companyAddress: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show thank you message first
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track form submission with Google Analytics
      if (typeof window.trackFormSubmission === "function") {
        window.trackFormSubmission();
      }

      // Submit to Salesforce after showing thank you message
      setTimeout(() => {
        const salesforceForm = document.createElement("form");
        salesforceForm.method = "POST";
        salesforceForm.action =
          "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dbn00000plgUf";
        salesforceForm.style.display = "none"; // Hide the form

        // Add hidden fields
        const addHiddenField = (name: string, value: string) => {
          const hiddenField = document.createElement("input");
          hiddenField.type = "hidden";
          hiddenField.name = name;
          hiddenField.value = value;
          salesforceForm.appendChild(hiddenField);
        };

        addHiddenField("oid", "00Dbn00000plgUf");
        addHiddenField("retURL", window.location.href); // Keep user on current page

        // Map form data to Salesforce fields
        addHiddenField("first_name", formData.firstName);
        addHiddenField("last_name", formData.lastName);
        addHiddenField("email", formData.email);
        addHiddenField("company", formData.company);
        addHiddenField("employees", formData.companySize);
        addHiddenField("street", formData.companyAddress);
        addHiddenField("phone", formData.phone);
        addHiddenField("description", formData.message);

        // Submit in a hidden iframe to avoid page redirect
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.name = "salesforce-submit";
        document.body.appendChild(iframe);

        salesforceForm.target = "salesforce-submit";
        document.body.appendChild(salesforceForm);
        salesforceForm.submit();

        // Clean up after submission
        setTimeout(() => {
          document.body.removeChild(salesforceForm);
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }, 800);
  };

  return (
    <Layout>
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
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                    Send Your Message
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
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
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-gray-700">
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="companySize" className="text-gray-700">
                          Company Size
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("companySize", value)
                          }
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">
                              11-50 employees
                            </SelectItem>
                            <SelectItem value="51-200">
                              51-200 employees
                            </SelectItem>
                            <SelectItem value="201-500">
                              201-500 employees
                            </SelectItem>
                            <SelectItem value="501-1000">
                              501-1000 employees
                            </SelectItem>
                            <SelectItem value="1000+">
                              1000+ employees
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="companyAddress"
                          className="text-gray-700"
                        >
                          Company Address
                        </Label>
                        <Input
                          id="companyAddress"
                          name="companyAddress"
                          type="text"
                          placeholder="Enter your company address"
                          value={formData.companyAddress}
                          onChange={handleInputChange}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700">
                        Message / Inquiry Details{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your project or how we can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 min-h-[120px]"
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
                          Sending Message...
                        </>
                      ) : (
                        "Send My Message"
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
                        href="tel:6102989069"
                        className="text-onealgo-blue-950 hover:text-onealgo-orange-500 font-medium"
                      >
                        📞 (610) 298-9069
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
                        firstName: "",
                        lastName: "",
                        email: "",
                        company: "",
                        companySize: "",
                        companyAddress: "",
                        phone: "",
                        message: "",
                      });
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
                    <p className="text-gray-600">(610) 298-9069</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Global Offices
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* USA Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
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
                          (610) 298-9069
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* India Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
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

                {/* UAE Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
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

                {/* Canada Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
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
        </div>
      </section>
    </Layout>
  );
}

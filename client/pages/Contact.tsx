import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-onealgo-lighter via-white to-onealgo-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Talk About Growing Your{" "}
              <span className="text-onealgo-orange-500">Business</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below, and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Your Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companySize" className="text-gray-700">
                      Company Size
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("companySize", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companyAddress" className="text-gray-700">
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
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    Message / Inquiry Details <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your project or how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
                >
                  Send My Message
                </Button>
              </form>

            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
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

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Global Offices</h3>
              
              <div className="space-y-6">
                {/* USA Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
                      <span className="text-2xl">🇺🇸</span>
                      USA Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600">
                          625 Swedesford Rd<br />
                          Malvern, PA 19355<br />
                          (610) 298-9069
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* India Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
                      <span className="text-2xl">🇮🇳</span>
                      India Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600">
                          2nd Floor, Plot No. 536, 100 Ft Road<br />
                          Ayyappa Society, Madhapur<br />
                          Hyderabad, Telangana 500081, IN<br />
                          +91 98765 43211
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* UAE Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
                      <span className="text-2xl">🇦🇪</span>
                      UAE Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600">
                          Building No: R118, Suite 201-A-42<br />
                          Al Suq Al Kabeer, Dubai, UAE<br />
                          +971 4 123 4567
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Canada Office */}
                <Card className="border-2 hover:border-onealgo-orange-500 transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-onealgo-blue-950">
                      <span className="text-2xl">����🇦</span>
                      Canada Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-onealgo-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600">
                          120 Adelaide St W<br />
                          Toronto, ON M5H 1T1<br />
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

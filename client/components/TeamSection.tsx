import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleSummary: string;
  expertise: string[];
  industries: ("Construction" | "Manufacturing" | "E-commerce")[];
  background: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "swapna",
    name: "Swapna Amirisetti",
    title: "President & CEO",
    roleSummary:
      "Exercises executive leadership over all corporate, financial, and contractual matters, guiding IT program management, systems integration, and data-driven transformation across federal, state, local, and commercial sectors.",
    expertise: ["Executive Leadership", "Systems Integration", "IT Program Management", "Salesforce", "Digital Transformation"],
    industries: ["Manufacturing", "Construction", "E-commerce"],
    background:
      "Over 15 years leading complex technology initiatives, Swapna drives corporate strategy, financial planning, and workforce management while ensuring compliance and operational readiness. A certified Woman EDWOSB with an MCA in Computer Applications (First with Distinction), she holds Salesforce CPQ and Administrator certifications and has directed transformations for federal and commercial clients.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fc97eeccc0a134f3daa828669d60e53fa?format=webp&width=800&height=1200",
  },
  {
    id: "sreenivas",
    name: "Sreenivas Amirisetti, MBA",
    title: "Secretary & Director of Operations",
    roleSummary:
      "Leads technology operations strategy and business development, overseeing technical project management, solution architecture, and enterprise CRM modernization across cloud and data transformation services.",
    expertise: ["Salesforce Ecosystem", "Enterprise Systems Integration", "Cloud Strategy", "CRM Modernization", "Data Integration"],
    industries: ["Manufacturing", "E-commerce"],
    background:
      "With 20+ years in enterprise systems integration and cloud transformation, Sreenivas has architected Salesforce Centers of Excellence and led global CRM implementations. At Solenis, he managed enterprise platform strategy; at KPMG, he advised executives on Salesforce optimization and digital transformation ROI—building scalable solutions for enterprise-level organizations.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Faa0c0ed3c6814eb2a787fe9850b47cb7?format=webp&width=800&height=1200",
  },
  {
    id: "louis",
    name: "Louis C. Rubino",
    title: "Director of Compliance & Contract Administration",
    roleSummary:
      "Leads federal and state compliance operations supporting government contracting initiatives, managing SAM.gov registration, certifications, cybersecurity frameworks, and strategic partnerships.",
    expertise: ["FAR/DFARS Compliance", "Government Contracting", "Proposal Coordination", "NIST 800-171", "Operations Management"],
    industries: ["Construction", "Manufacturing", "E-commerce"],
    background:
      "Over 20 years in federal compliance and operations, Louis brings hands-on construction management expertise from Full Circle Builders and compliance strategy from corporate technology roles. He has managed SAM.gov registrations, cybersecurity frameworks, and compliance initiatives while building successful startups—combining operational rigor with business development acumen.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F2428c49dc5994d6c9ed10fc80d4a1792?format=webp&width=800&height=1200",
  },
  {
    id: "sahith",
    name: "Sahith Valluru",
    title: "E-Commerce & Supply Chain Lead",
    roleSummary:
      "Designs and executes end-to-end supply chain and e-commerce solutions that accelerate growth, improve fulfillment efficiency, and enhance customer experience at scale.",
    expertise: ["E-commerce Integration", "Supply Chain Optimization", "Order Management", "Inventory Systems", "Digital Transformation"],
    industries: ["E-commerce", "Manufacturing"],
    background:
      "Sahith brings 14+ years of e-commerce and supply chain technology expertise, having optimized fulfillment operations for 30+ companies ranging from startups to $500M+ enterprises. His solutions consistently reduce order-to-delivery times by 20-30% while improving inventory accuracy and operational efficiency across complex supply networks.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F6316b03e1737454cba79334edff02d65?format=webp&width=800&height=1200",
  },
];

const industryIcons: Record<string, React.ReactNode> = {
  Construction: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  ),
  Manufacturing: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  ),
  "E-commerce": (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  ),
};

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team brings hands-on experience from the industries we serve — so
            we speak your language from day one. Each member combines deep
            technical expertise with proven track records of transforming
            operations for mid-market businesses.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-onealgo-orange-500 font-medium mb-3">
                    {member.title}
                  </p>

                  {/* Role Summary */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {member.roleSummary}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((exp) => (
                        <Badge
                          key={exp}
                          variant="secondary"
                          className="bg-onealgo-blue-50 text-onealgo-blue-950 border-onealgo-blue-200 text-xs"
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="mb-4 flex flex-wrap gap-3">
                    {member.industries.map((industry) => (
                      <div
                        key={industry}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="text-onealgo-orange-500">
                          {industryIcons[industry]}
                        </span>
                        <span>{industry}</span>
                      </div>
                    ))}
                  </div>

                  {/* Background */}
                  <p className="text-sm text-gray-600 leading-relaxed border-t pt-4">
                    {member.background}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

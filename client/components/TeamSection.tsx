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
  linkedinUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "swapna",
    name: "Swapna Amirisetti",
    title: "President & CEO",
    roleSummary:
      "Leads One Algorithm's strategy, operations, and growth. Oversees client delivery, technology solutions, and business operations across government and commercial sectors.",
    expertise: ["Executive Leadership", "Systems Integration", "IT Program Management", "Salesforce", "Digital Transformation"],
    industries: ["Manufacturing", "Construction", "E-commerce"],
    background:
      "Leads One Algorithm's strategy, operations, and growth. Oversees client delivery, technology solutions, and business operations across government and commercial sectors.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Fc97eeccc0a134f3daa828669d60e53fa?format=webp&width=800&height=1200",
    linkedinUrl: "https://www.linkedin.com/in/swapna-amirisetti/",
  },
  {
    id: "sreenivas",
    name: "Sreenivas Amirisetti, MBA",
    title: "Secretary & Director of Operations",
    roleSummary:
      "Leads technology operations, project delivery, and business development at One Algorithm. Oversees cloud solutions, CRM modernization, and technology initiatives that help organizations improve efficiency and performance.",
    expertise: ["Salesforce Ecosystem", "Enterprise Systems Integration", "Cloud Strategy", "CRM Modernization", "Data Integration"],
    industries: ["Manufacturing", "E-commerce"],
    background:
      "Leads technology operations, project delivery, and business development at One Algorithm. Oversees cloud solutions, CRM modernization, and technology initiatives that help organizations improve efficiency and performance.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2Faa0c0ed3c6814eb2a787fe9850b47cb7?format=webp&width=800&height=1200",
    linkedinUrl: "https://www.linkedin.com/in/samirisetti/",
  },
  {
    id: "louis",
    name: "Louis Rubino",
    title: "Director",
    roleSummary:
      "Leads compliance, operations, and government contracting initiatives at One Algorithm. Oversees certifications, partnerships, and regulatory requirements that support federal, state, and commercial opportunities.",
    expertise: ["FAR/DFARS Compliance", "Government Contracting", "Proposal Coordination", "NIST 800-171", "Operations Management"],
    industries: ["Construction", "Manufacturing", "E-commerce"],
    background:
      "Leads compliance, operations, and government contracting initiatives at One Algorithm. Oversees certifications, partnerships, and regulatory requirements that support federal, state, and commercial opportunities.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F2428c49dc5994d6c9ed10fc80d4a1792?format=webp&width=800&height=1200",
    linkedinUrl: "https://www.linkedin.com/in/louiscrubino/",
  },
  {
    id: "sahith",
    name: "Sahith Valluru",
    title: "Business Development Manager & Communications Expert",
    roleSummary:
      "Leads business development and strategic partnerships at One Algorithm. Builds relationships, supports growth initiatives, and helps connect clients with solutions that drive business success.",
    expertise: ["Strategic Partnerships", "Business Development", "Executive Communications", "Relationship Management", "Salesforce CRM"],
    industries: ["E-commerce", "Manufacturing"],
    background:
      "Leads business development and strategic partnerships at One Algorithm. Builds relationships, supports growth initiatives, and helps connect clients with solutions that drive business success.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F6316b03e1737454cba79334edff02d65?format=webp&width=800&height=1200",
    linkedinUrl: "https://www.linkedin.com/in/sahith-valluru/",
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
                  {/* Name & Title with LinkedIn Link */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-onealgo-orange-500 font-medium">
                        {member.title}
                      </p>
                    </div>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-onealgo-blue-950 transition-colors flex-shrink-0"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.249-.129.597-.129.946v5.422h-3.554s.05-8.736 0-9.646h3.554v1.366c.43-.664 1.199-1.61 2.922-1.61 2.134 0 3.734 1.398 3.734 4.403v5.487zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.957.771-1.71 1.958-1.71 1.187 0 1.915.753 1.94 1.71 0 .952-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  </div>

                  {/* Bio */}
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

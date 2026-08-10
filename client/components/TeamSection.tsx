import React from "react";
import { Badge } from "./ui/badge";
import { Section, SectionHeading, Card, CardGrid } from "./site";

/* Leadership - 2026 refresh.
 *
 * Three substantive changes beyond the visual system:
 *
 *  1. `expertise` and `industries` were fully populated in the data and never
 *     rendered - the file even imported Badge without using it. They are real,
 *     already-published detail a buyer weighs, so they now render as tags under
 *     each bio. No new facts were added to either array.
 *  2. `roleSummary` was byte-identical to `background` on all four members and
 *     only `background` was ever rendered. The duplicate field is gone.
 *  3. All four bios opened with the word "Leads", which read as one paragraph
 *     copied four times. Only the opening clause was rephrased - no credential,
 *     employer, date or claim was changed.
 *
 * The dead `industryIcons` map (three entries, all the same circle path, never
 * referenced) has been deleted.
 *
 * Accessibility: #ffa634 is 1.95:1 on white, so job titles use the
 * `oa.orangeText` token (#9a4f00, 6.01:1) rather than the brand orange.
 */

interface TeamMember {
  id: string;
  name: string;
  title: string;
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
    expertise: [
      "Executive Leadership",
      "Systems Integration",
      "IT Program Management",
      "Salesforce",
      "Digital Transformation",
    ],
    industries: ["Manufacturing", "Construction", "E-commerce"],
    background:
      "Leads One Algorithm's strategy, operations, and growth. Oversees client delivery, technology solutions, and business operations across government and commercial sectors.",
    image: "/media/team-1.webp",
    linkedinUrl: "https://www.linkedin.com/in/swapna-amirisetti/",
  },
  {
    id: "sreenivas",
    name: "Sreenivas Amirisetti, MBA",
    title: "Secretary & Director of Operations",
    expertise: [
      "Salesforce Ecosystem",
      "Enterprise Systems Integration",
      "Cloud Strategy",
      "CRM Modernization",
      "Data Integration",
    ],
    industries: ["Manufacturing", "E-commerce"],
    background:
      "Directs technology operations, project delivery, and business development at One Algorithm. Oversees cloud solutions, CRM modernization, and technology initiatives that help organizations improve efficiency and performance.",
    image: "/media/team-2.webp",
    linkedinUrl: "https://www.linkedin.com/in/samirisetti/",
  },
  {
    id: "louis",
    name: "Louis Rubino",
    title: "Director",
    expertise: [
      "FAR/DFARS Compliance",
      "Government Contracting",
      "Proposal Coordination",
      "NIST 800-171",
      "Operations Management",
    ],
    industries: ["Construction", "Manufacturing", "E-commerce"],
    background:
      "Responsible for compliance, operations, and government contracting initiatives at One Algorithm. Oversees certifications, partnerships, and regulatory requirements that support federal, state, and commercial opportunities.",
    image: "/media/team-3.webp",
    linkedinUrl: "https://www.linkedin.com/in/louiscrubino/",
  },
  {
    id: "sahith",
    name: "Sahith Valluru",
    title: "Business Development Manager & Communications Expert",
    expertise: [
      "Strategic Partnerships",
      "Business Development",
      "Executive Communications",
      "Relationship Management",
      "Salesforce CRM",
    ],
    industries: ["E-commerce", "Manufacturing"],
    background:
      "Drives business development and strategic partnerships at One Algorithm. Builds relationships, supports growth initiatives, and helps connect clients with solutions that drive business success.",
    image: "/media/team-4.webp",
    linkedinUrl: "https://www.linkedin.com/in/sahith-valluru/",
  },
];

export default function TeamSection() {
  return (
    <Section tone="surface" bordered>
      <SectionHeading
        eyebrow="Leadership"
        title="Meet the team"
        lede="Four people accountable for the work — strategy, delivery, compliance and partnerships."
      />

      <CardGrid columns={2} className="mt-12">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div className="flex items-start gap-5">
              {/* width/height give the browser an aspect ratio before the file
                  arrives, so the grid stops shifting as portraits load; lazy +
                  async keeps below-the-fold faces off the critical path. */}
              <img
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-28 w-28 shrink-0 rounded-lg bg-oa-sunk object-cover"
              />

              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-oa-ink">
                  {member.name}
                </h3>
                <p className="mt-1 font-medium text-oa-orangeText">
                  {member.title}
                </p>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-oa-blue transition-colors hover:text-oa-blue700"
                  aria-label={`${member.name} LinkedIn profile`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.249-.129.597-.129.946v5.422h-3.554s.05-8.736 0-9.646h3.554v1.366c.43-.664 1.199-1.61 2.922-1.61 2.134 0 3.734 1.398 3.734 4.403v5.487zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.957.771-1.71 1.958-1.71 1.187 0 1.915.753 1.94 1.71 0 .952-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <p className="mt-6 border-t border-oa-hairline pt-5 text-sm leading-relaxed text-oa-ink2">
              {member.background}
            </p>

            {/* Focus areas and industries were carried in the data all along
                and never shown. Blue tint marks an industry, neutral an area
                of expertise. */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {member.industries.map((industry) => (
                <Badge
                  key={industry}
                  variant="outline"
                  className="border-oa-blue/25 bg-oa-blueTint font-medium text-oa-blue700"
                >
                  {industry}
                </Badge>
              ))}
              {member.expertise.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-oa-hairlineStrong bg-oa-sunk font-medium text-oa-ink2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}

import React from "react";
import { Section, SectionHeading, Card, CardGrid } from "./site";

/* Leadership - 2026 refresh, revised 2026-08-12.
 *
 * This section is no longer a footer to the About page. It runs directly under
 * the hero, because this firm has no client logos, no testimonials and no
 * awarded contracts - the named people, with links a buyer can open, are the
 * only third-party-checkable proof the page has. Burying them under a mission
 * statement wasted the one asset the page owns.
 *
 * DETECTOR FIX (nested-cards x4): the four member cards were flagged as cards
 * inside a card. The container was not another card - it was this Section's own
 * `bordered` prop, which draws `border-y` over a filled `bg-oa-surface` ground
 * and so reads as a card wrapping four cards. `bordered` exists for when two
 * SAME-tone sections meet; here the section above is the dark hero, so the tone
 * change already separates them and the rule was pure decoration. Dropped.
 *
 * `expertise` and `industries` also rendered as Badge pills - rounded-full,
 * bordered, tinted, padded, fifteen of them per member. The detector skips
 * anything under 30px tall so it never counted them, but a card carrying
 * fifteen inner borders is the thing that rule is describing. The information
 * was worth keeping; the boxes were not. Both lists now render as plain
 * dividing text rows. `Badge` is no longer imported.
 *
 * DETECTOR FIX (all-caps-body): the row labels are sentence case. Nothing on
 * this page sets text-transform: uppercase any more.
 *
 * Bios: rewritten to one line each. Every fact is carried over from the
 * previous copy - no employer, credential, date or claim was added. The
 * previous versions all ran to two sentences of near-identical shape
 * ("Oversees X, Y, and Z ... that help organizations improve efficiency"),
 * which is the padding that made four real people read as generated filler.
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
      "Leads strategy, operations and client delivery, and owns the certifications the firm bids under.",
    image: "/media/team-1.webp",
    linkedinUrl: "https://www.linkedin.com/in/swapna-amirisetti/",
  },
  {
    id: "sreenivas",
    name: "Sreenivas Amirisetti, MBA",
    /* Was "Secretary & Director of Operations". He was simultaneously CTO on
       /capabilities and "Salesforce Practice Director" on his own LinkedIn — three
       titles for one person, which the company's own notes call a live credibility
       risk. This version matches the public profile a buyer will actually check.
       "Secretary" is a corporate-officer role and belongs in the filings, not here.
       ⚠️ Confirm with Sreenivas before this ships. Changed 2026-08-24. */
    title: "Chief Technology Officer",
    expertise: [
      "Salesforce Ecosystem",
      "Enterprise Systems Integration",
      "Cloud Strategy",
      "CRM Modernization",
      "Data Integration",
    ],
    industries: ["Manufacturing", "E-commerce"],
    background:
      "Owns technology operations and project delivery — cloud solutions, CRM modernization and enterprise integration.",
    image: "/media/team-2.webp",
    linkedinUrl: "https://www.linkedin.com/in/samirisetti/",
  },
  {
    id: "louis",
    name: "Louis Rubino",
    title: "Director of Operations",
    /* Title is OPERATIONS, deliberately. Louis runs marketing, internal
       integrations, invoicing, tooling and subscriptions, paperwork, email
       campaigns, compliance and contracts. An earlier pass titled him
       "Director, Compliance & Contract Administration", which he rejected as
       pinning him to one slice — correctly. But the answer to a wide remit is
       not a wider LIST: nine bullets in a four-person firm reads as "they only
       have one guy". Operations is the word that contains all of it, and the
       closing line claims the scope outright instead of enumerating it.
       Revised 2026-08-24 on Louis's correction.
       ⚠️ "NIST 800-171" was removed from this list. The company does not hold
       NIST 800-171 compliance (confirmed by Louis 2026-08-24) and that claim was
       stripped from the AppExchange listing the same day; leaving it as personal
       expertise invites the same question from the same buyer.
       ⚠️ No PMI credential is implied anywhere here. Louis holds three PMI
       CERTIFICATES OF COMPLETION, not PMP/CAPM/PgMP. "Program oversight"
       describes work, not a credential — keep it that way. */
    expertise: [
      "Business Operations",
      "Government Contracting",
      "Contract & Invoice Administration",
      "Marketing Operations",
      "Systems & Tooling",
    ],
    industries: ["Construction", "Manufacturing", "E-commerce"],
    background:
      "Runs operations — contracts and invoicing, the federal registrations and small-business certifications the firm bids under, the internal systems it runs on, and marketing.",
    image: "/media/team-3.webp",
    linkedinUrl: "https://www.linkedin.com/in/louiscrubino/",
  },
  {
    id: "sahith",
    name: "Sahith Valluru",
    title: "Business Development Manager",
    expertise: [
      "Strategic Partnerships",
      "Business Development",
      "Executive Communications",
      "Relationship Management",
      "Salesforce CRM",
    ],
    industries: ["E-commerce", "Manufacturing"],
    background:
      "Handles business development, strategic partnerships and client relationships.",
    image: "/media/team-4.webp",
    linkedinUrl: "https://www.linkedin.com/in/sahith-valluru/",
  },
];

/** One labelled row of plain text. Replaces the badge pills - same information,
 *  no second border inside the card. */
function DetailRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="grid gap-0.5 py-3 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="text-sm text-oa-ink3">{label}</dt>
      <dd className="text-sm leading-relaxed text-oa-ink2">
        {values.join(" · ")}
      </dd>
    </div>
  );
}

export default function TeamSection() {
  return (
    <Section tone="surface">
      <SectionHeading
        title="The four people who run it"
        lede="Four people, named, with public profiles you can open. The person who scopes your work stays on it through delivery."
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
                className="h-32 w-32 shrink-0 rounded-lg bg-oa-sunk object-cover"
              />

              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-oa-ink">
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
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.249-.129.597-.129.946v5.422h-3.554s.05-8.736 0-9.646h3.554v1.366c.43-.664 1.199-1.61 2.922-1.61 2.134 0 3.734 1.398 3.734 4.403v5.487zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.957.771-1.71 1.958-1.71 1.187 0 1.915.753 1.94 1.71 0 .952-.753 1.71-1.983 1.71zm1.581 11.597H3.635V9.861h3.283v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  View profile
                </a>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-oa-ink">
              {member.background}
            </p>

            {/* Focus areas and industries were carried in the data all along
                and never shown. Plain rows, not pills - see the header note. */}
            <dl className="mt-6 divide-y divide-oa-hairline border-t border-oa-hairline">
              <DetailRow label="Focus" values={member.expertise} />
              <DetailRow label="Industries" values={member.industries} />
            </dl>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}

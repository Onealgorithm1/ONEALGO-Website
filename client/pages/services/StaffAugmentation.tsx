import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
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
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  ProcessSteps,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Staff augmentation - 2026 refresh, copy rewritten 2026-08-12.
 *
 * This is one of the two services actually producing revenue (see the homepage
 * ordering note), and it was described in lines like "Flexible staffing for
 * exceptional outcomes" and "Our professionals integrate seamlessly with your
 * existing team and workflows" - true of every staffing firm that has ever
 * existed, and therefore evidence of nothing.
 *
 * NO NUMBERS WERE INVENTED. The obvious things to write here - time to first
 * candidate, bench size, average tenure, fill rate - are exactly the figures a
 * buyer wants and exactly the ones this repository does not contain. Where a
 * number would have carried a sentence, the sentence is hedged instead
 * ("usually", "faster than a hiring process") or cut.
 *
 * TKTK - if any of these are ever measured, the "You need the person now" card
 * and the placement process are where they belong: typical days to first
 * CV, how many practitioners are available, how often a replacement is needed.
 *
 * The SKILLS list is untouched. It is already concrete - named stacks, no
 * adjectives - and it is the one thing on the page a technical buyer scans for.
 */

const SKILLS = [
  {
    icon: Code,
    name: "Full-Stack Development",
    description: "React, Node.js, Python, .NET",
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description: "iOS, Android, React Native",
  },
  {
    icon: Database,
    name: "Data Engineering",
    description: "SQL, NoSQL, Big Data, Analytics",
  },
  {
    icon: Globe,
    name: "DevOps & Cloud",
    description: "AWS, Azure, Docker, Kubernetes",
  },
  {
    icon: Shield,
    name: "Cybersecurity",
    description: "Security Audits, Compliance",
  },
  {
    icon: Zap,
    name: "AI & Machine Learning",
    description: "Python, TensorFlow, Data Science",
  },
];

const BENEFITS = [
  {
    icon: Clock,
    title: "You need the person now",
    description:
      "Recruiting a permanent engineer takes months you may not have — advertising, screening, notice periods. We can usually put candidates in front of you faster than a hiring process can.",
  },
  {
    icon: Target,
    title: "You need one skill, not one head",
    description:
      "An Oracle Integration Cloud specialist for a few weeks isn't a job you can advertise for. It is something you can rent for exactly as long as the work lasts.",
  },
  {
    icon: CheckCircle,
    title: "The role might not outlast the project",
    description:
      "If the work has an end date, the contract should too. You're not carrying a seat, a licence and a laptop after the thing ships.",
  },
  {
    icon: Users,
    title: "They work inside your process",
    description:
      "Our people use your repo, your board and your review process, and your lead sets their priorities. Anything else turns into a second team you have to manage separately.",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Dedicated team",
    description:
      "People assigned to you full time and to nobody else. You run them day to day. Best when the work is ongoing and the domain takes a while to learn.",
    features: [
      "Full time, assigned to one client",
      "They learn your domain and keep it",
      "You set priorities week to week",
      "Direct access, no account manager in between",
    ],
  },
  {
    title: "Fixed scope",
    description:
      "A defined deliverable with a date on it. This works when you can write down what finished means. Where you can't, hourly is honestly the cheaper option.",
    features: [
      "Scope agreed in writing before we start",
      "Milestones you sign off",
      "Specialists brought in for the phase that needs them",
      "A date, and what we do when it moves",
    ],
  },
  {
    title: "Hourly",
    description:
      "For a code review, a second opinion on an architecture, or an outage nobody can explain. No commitment past the hours you use.",
    features: [
      "Billed by the hour, no retainer",
      "Code and architecture review",
      "A second opinion on somebody else's estimate",
      "Useful when you don't yet know the size of the problem",
    ],
  },
];

const PROCESS = [
  {
    title: "What you actually need",
    body: "Not the job description — the work. Which system, which stack, who they'd report to, and what will block them in week one.",
  },
  {
    title: "Candidates, with the gaps stated",
    body: "You interview them. We tell you where each one is light before you find it out yourself in week three.",
  },
  {
    /* E-Verify earns its place on THIS page rather than only on /capabilities:
       it is the one credential that does commercial work, because a client
       taking on contract staff is the person who actually carries the risk.
       ⛔ The wording is deliberately limited to our own employees — the
       company's E-Verify account is configured to "Verify Its Own Employees",
       and we do engage subcontractors, who are their own employers' hires.
       "Everyone we place is E-Verified" would be false. Do not widen it. */
    title: "Onboarding",
    body: "Access, accounts, environment, context. One of us stays involved through the first weeks so the ramp-up isn't your lead's second job. Our own employees have their work authorisation confirmed through E-Verify — we have been enrolled since 2024.",
  },
  {
    title: "While they're with you",
    body: "We check in with you, not only with them. If it isn't working we replace the person — that part is what you're paying us for.",
  },
];

export default function StaffAugmentation() {
  useSEO({
    title: "OneAlgorithm — Staff Augmentation",
    description:
      "Staff augmentation: senior developers, data and cloud engineers and security specialists who join your team, use your tools and report to your lead. Dedicated, fixed-scope or hourly.",
    canonical: getCanonicalUrl("/services/staff-augmentation"),
    keywords:
      "staff augmentation, IT staffing, software developers, technical talent, team scaling, remote developers, IT specialists, talent solutions",
    ogTitle: "OneAlgorithm — Staff Augmentation",
    ogDescription:
      "Senior developers, data and cloud engineers and security specialists who join your team, use your tools and report to your lead. Dedicated, fixed-scope or hourly.",
    ogUrl: getCanonicalUrl("/services/staff-augmentation"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Staff Augmentation - OneAlgorithm",
    twitterDescription:
      "Senior developers, data and cloud engineers and security specialists who join your team, use your tools and report to your lead.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Staff Augmentation Services",
          "Senior developers, data and cloud engineers, and security specialists embedded in your team, working on your tools and reporting to your lead. Dedicated, fixed-scope and hourly engagements.",
          "Staff Augmentation",
          "https://onealgorithm.com/services/staff-augmentation",
        )}
      />

      <PageHero
        eyebrow="Staff Augmentation"
        title={
          <>
            Staff <span className="text-oa-orange">augmentation</span> — our
            people, inside your team
          </>
        }
        lede="Senior practitioners who join your standups, work in your repo and your ticket queue, and take direction from your lead. We carry the employment and the paperwork. For a sprint, or for a year."
        panel={{
          title: "How it works",
          items: [
            "Your tools, your process, your lead setting priorities",
            "Senior practitioners, not a rotating bench",
            "Dedicated, fixed scope, or hourly",
            "We carry the employment and the paperwork",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why it works"
          title="When this beats hiring"
          lede="Hiring takes months and commits you for years. Often that's the right call. These are the four cases where it isn't."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card
              key={b.title}
              icon={b.icon}
              title={b.title}
              body={b.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Capabilities"
          title="The stacks our people work in"
          lede="If what you need isn't on this list, say so. We'd rather tell you we don't have it than send you someone who read the documentation last week."
        />
        <CardGrid columns={3} className="mt-12">
          {SKILLS.map((s) => (
            <Card
              key={s.name}
              icon={s.icon}
              title={s.name}
              body={s.description}
            />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How we engage"
          title="Three ways to buy this"
          lede="The real difference between them is who carries the risk on scope. Pick the one that matches how well you can define the work today."
        />
        <CardGrid columns={3} className="mt-12">
          {ENGAGEMENT_MODELS.map((m) => (
            <Card key={m.title} title={m.title} body={m.description}>
              <div className="mt-6">
                <CheckList items={m.features} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Process"
          title="How we place someone"
          lede="Four steps, and the second one is where this is usually won or lost."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <CTABand
        title="Tell us about the role you can't fill"
        body="The skill you need for three months, the seat that has been open too long, or the deadline that needs two more pairs of hands. Tell us what the work is and we'll tell you whether we have the person."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare
          title="Staff Augmentation - Dedicated Development Teams - OneAlgorithm"
          className="justify-center"
        />
      </Section>
    </Layout>
  );
}

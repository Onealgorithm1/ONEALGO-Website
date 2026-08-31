import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Brain,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Users,
  Globe,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* IT Consulting - 2026 refresh, copy rewritten 2026-08-12.
 *
 * The 2026 refresh was presentation only and left the copy alone. The copy was
 * the problem: "Comprehensive IT consulting services to help you make informed
 * technology decisions and drive business transformation" describes no firm in
 * particular, and it ran twice on the page.
 *
 * Every line below now names a real task, a real system or a real deliverable.
 * The rule applied throughout: say what we do, in the order we do it, and admit
 * where the answer is "it depends" rather than smoothing it over.
 *
 * TWO CLAIMS DELETED as unevidenced, not reworded:
 *  - "Measurable Results - Track record of delivering quantifiable business
 *    value and ROI." There is no published case study, client name or outcome
 *    figure anywhere in this repository. The card is replaced by one that says
 *    so, because a reader who wants proof should be told the truth rather than
 *    handed an adjective.
 *  - "Leverage technology to gain a competitive edge in your market."
 *
 * The sector card is phrased as the TEAM's experience, earned as employees,
 * which is what /about and shared/capabilities-data.ts say it is. Do not let it
 * drift back into sounding like company past performance.
 *
 * The internal links to construction, manufacturing and e-commerce are load-
 * bearing for SEO. They survive this rewrite; keep them.
 */

const SERVICES = [
  {
    icon: Brain,
    title: "Technology planning",
    body: "We write down what you run, what each piece costs, and what breaks. Then a two- or three-year order for replacing or keeping each one, with a budget attached to each step.",
  },
  {
    icon: Shield,
    title: "Security review",
    body: "Accounts and access, backup and restore, patching, and what your vendors can reach. You get a ranked list of gaps, not a scored report nobody acts on.",
  },
  {
    icon: Zap,
    title: "Modernization roadmaps",
    body: "Moving off an aging system is mostly sequencing: what moves first, what runs in parallel, and which data has to reconcile before you can switch. We plan that sequence and stay for the cutover.",
  },
  {
    icon: Globe,
    title: "Cloud migration planning",
    body: "Which workloads move to AWS or Azure, which stay where they are, and what the monthly bill looks like afterwards. We size it before anyone commits to it.",
  },
  {
    icon: BarChart3,
    title: "Performance and cost review",
    body: "When a system is slow or a cloud bill keeps climbing, we find where the time and the money go — queries, indexes, oversized instances, licences nobody uses.",
  },
  {
    icon: Lightbulb,
    title: "Tool and vendor selection",
    body: "We run the evaluation: requirements, a shortlist, demos scored against your actual workflows. The point is a decision you can still defend in a year.",
  },
];

const BENEFITS = [
  {
    icon: Target,
    title: "Recommendations you can price",
    body: "Every recommendation comes with an order, an owner and a rough cost. A roadmap you can't budget is a document, not a plan.",
  },
  {
    icon: TrendingUp,
    title: "We'll tell you not to buy something",
    body: "Often the fix is a configuration change or a licence you already pay for. We'd rather say that than sell you a project.",
  },
  {
    icon: Shield,
    title: "Risks named early",
    body: "Single points of failure, support contracts about to expire, one person who is the only one who knows how something works. We write those down in week one, because they're the expensive ones.",
  },
  {
    icon: Users,
    title: "The people who assess it build it",
    body: "No handoff from whoever sold the work to a delivery team who weren't in the room. There are four of us; you'll meet all of them.",
  },
];

const PROCESS = [
  {
    title: "Assessment",
    body: "We sit with the people doing the work and read what the systems actually report — not what the process diagram says happens.",
  },
  {
    title: "Plan",
    body: "A written sequence: what changes, in what order, who owns each piece, what it costs. You can hand it to another firm if you'd rather.",
  },
  {
    title: "Delivery",
    body: "We build it, or we advise the team you already have while they build it. Short cycles, so you can change your mind while that's still cheap.",
  },
  {
    title: "Support",
    body: "We stay on after go-live. Hypercare first, then ongoing support, 24/7 across the time zones you operate in.",
  },
];

export default function ITConsulting() {
  useSEO({
    title: "Small Business IT Consulting in Malvern, PA | OneAlgorithm",
    description:
      "IT consulting for the systems you already run: technology planning, security reviews, cloud migration sizing and tool selection. Malvern, PA.",
    canonical: getCanonicalUrl("/services/it-consulting"),
    // `keywords` is kept as-is. Google ignores it, and it is the only record on
    // the page of the terms this URL has historically been optimised for -
    // including "digital transformation", which is now off the visible copy.
    keywords:
      "IT consulting, strategic IT planning, technology audit, digital transformation, cybersecurity consulting, business process optimization, IT strategy",
    ogTitle: "Small Business IT Consulting in Malvern, PA | OneAlgorithm",
    ogDescription:
      "IT consulting for the systems you already run: technology planning, security reviews, cloud migration sizing, and tool selection. Malvern, Pennsylvania.",
    ogUrl: getCanonicalUrl("/services/it-consulting"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "IT Consulting — OneAlgorithm",
    twitterDescription:
      "IT consulting for the systems you already run: technology planning, security reviews, cloud migration sizing, and tool selection.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "IT Consulting Services",
          "IT consulting covering technology planning, security review, modernization roadmaps, cloud migration sizing, performance and cost review, and tool and vendor selection.",
          "IT Consulting",
          "https://onealgorithm.com/services/it-consulting",
        )}
      />

      <PageHero
        eyebrow="IT Consulting"
        title={
          <>
            IT <span className="text-oa-orange">consulting</span> for the
            systems you already run
          </>
        }
        lede="We inventory what you actually run — servers, licences, the spreadsheet holding a process together — then tell you what to fix first, what to leave alone, and roughly what each will cost. Most of what we recommend reuses something you already own."
        // Panel items are the SERVICES card titles from further down the page.
        // Nothing here is written for the panel; if a line changes below, change
        // it here too.
        panel={{
          title: "What we're usually asked for",
          items: [
            "Technology planning",
            "Security review",
            "Cloud migration planning",
            "Performance and cost review",
            "Tool and vendor selection",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What IT consulting means here"
          lede="Six things clients ask us for. Each one ends in a document or a change you can point at, not a conversation."
        />
        <CardGrid columns={3} className="mt-12">
          {SERVICES.map((s) => (
            <Card key={s.title} icon={s.icon} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="How we work, in four sentences"
          lede="We're a small firm. The person who scopes the work is the person who does it, which changes what we're willing to recommend."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="How we work"
          title="How an engagement runs"
          lede="The same four steps whether the job is two weeks or two years. We stay for the fourth."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Experience"
          title="What we bring, and what we can't show you"
        />
        <CardGrid columns={2} className="mt-12">
          <Card
            title="Where the experience came from"
            body={
              <>
                Between us the team has worked in healthcare, finance,{" "}
                <Link
                  to="/industries/manufacturing"
                  className="text-oa-blue underline underline-offset-4"
                >
                  manufacturing
                </Link>
                ,{" "}
                <Link
                  to="/industries/construction"
                  className="text-oa-blue underline underline-offset-4"
                >
                  construction
                </Link>{" "}
                and{" "}
                <Link
                  to="/industries/ecommerce"
                  className="text-oa-blue underline underline-offset-4"
                >
                  e-commerce
                </Link>
                . Most of it was earned inside those organizations, as
                employees, before this firm existed — and we say so rather than
                letting it read as company past performance.
              </>
            }
          />
          <Card
            title="ITIL, COBIT and agile"
            body="Which one you get depends on who has to sign the work off. Regulated clients usually want the governance; a five-person product team almost never does, and forcing it on them wastes their money."
          />
          <Card
            title="Partner status you can look up"
            body={
              <>
                We're a listed Salesforce Consulting Partner and a certified
                Zendesk partner. Both are somebody else's record, not ours —{" "}
                <Link
                  to="/about"
                  className="text-oa-blue underline underline-offset-4"
                >
                  the links to check them
                </Link>{" "}
                are on our about page.
              </>
            }
          />
          <Card
            title="No case studies on this site"
            body={
              <>
                We haven't published client names, testimonials or outcome
                figures, and we're not going to invent any. What we can offer
                instead is{" "}
                <Link
                  to="/about"
                  className="text-oa-blue underline underline-offset-4"
                >
                  four named people
                </Link>{" "}
                you can question directly about work you care about.
              </>
            }
          />
        </CardGrid>
      </Section>

      <CTABand
        title="Tell us what's actually broken"
        body="The system everyone complains about, the roadmap nobody believes, or a renewal you're not sure you should sign. We'll tell you what we'd do first and roughly what it costs."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare title="IT Consulting - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

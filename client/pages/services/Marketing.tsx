import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Mail,
  Facebook,
  CalendarDays,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  Prose,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Marketing & Social Media - 2026 refresh.
 *
 * Presentation only. Two things to know before editing:
 *
 *  1. The page used to run on purple (#a855f7) - a fourth color that belongs
 *    to no part of the brand - plus a bouncing star. Both are gone; the page
 *    now uses the same blue/orange system as the rest of the site.
 *  2. The Social Media Management block below is COMPLIANCE COPY. See the
 *     comment on that section before touching a word of it.
 *
 * The mid-page "Ready to Transform Your Marketing?" card became the closing
 * CTA band, which the page previously did not have.
 *
 * COPY REWRITE 2026-08-12. The two ledes on this page - the hero and the Social
 * Media Management heading - were rewritten earlier and are the model the rest
 * of the services section has now been brought in line with. They are unchanged
 * here. What changed is everything around them: the FEATURES and BENEFITS card
 * bodies, the "what we do" and "why us" headings, and the closing band, all of
 * which were still the generic version ("Personalized campaigns drive higher
 * engagement and conversion rates").
 *
 * The compliance section below is untouched, as its own comment requires.
 *
 * "Build Relationships" became "No case studies to show you". The old card
 * claimed an outcome; the new one states a fact, and the fact is more use to a
 * buyer deciding whether to believe the rest of the page.
 */

const FEATURES = [
  {
    icon: Target,
    title: "Campaign Management",
    body: "Campaign calendars, builds and launches across email, social and paid — planned far enough ahead that nothing ships the morning it is due.",
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Insights",
    body: "We use AI on the analysis side: clustering what an audience responds to, drafting variants worth testing. It suggests; a person decides what actually goes out.",
  },
  {
    icon: Users,
    title: "Customer Journeys",
    body: "The sequence someone sees from first click to enquiry, written down and built in your CRM rather than held in one person's head.",
  },
  {
    icon: BarChart3,
    title: "ROI Tracking",
    body: "Spend, leads and cost per lead in one place, tied back to the CRM record — so the numbers hold up when somebody disputes them.",
  },
  {
    icon: Mail,
    title: "Lead Nurturing",
    body: "Automated follow-up that stops the moment someone replies. Most nurture sequences fail on exactly that detail.",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    body: "The repetitive work — list uploads, tagging, assignment, the weekly report — handed to the tool instead of to a person on Friday afternoon.",
  },
];

const SOCIAL_CAPABILITIES = [
  {
    icon: Facebook,
    title: "Facebook & Instagram",
    body: "Day-to-day management of the Facebook Pages and Instagram business accounts our clients connect to us, kept consistent with their brand.",
  },
  {
    icon: CalendarDays,
    title: "Content Planning & Publishing",
    body: "Campaign calendars, scheduled posts and coordinated launches across every channel a client asks us to run.",
  },
  {
    icon: LineChart,
    title: "Performance Reporting",
    body: "Follower growth, reach and engagement collected from each connected account and reported back in plain language — not screenshots of dashboards.",
  },
  {
    icon: ShieldCheck,
    title: "Access & Governance",
    body: "Clients keep ownership of their own accounts and grant us access as a partner. They can withdraw it at any time.",
  },
];

/* The three "How it works" steps. Wording is fixed - see the section comment. */
const HOW_IT_WORKS = [
  {
    title: "You grant access",
    body: "You add One Algorithm as a partner on your own business account. Your Pages and profiles stay yours throughout.",
  },
  {
    title: "We manage and measure",
    body: "We publish and maintain your content, and collect the audience and engagement figures each platform reports.",
  },
  {
    title: "You see the results",
    body: "One report covering every channel, so you can tell what is working without logging into five different tools.",
  },
];

const BENEFITS = [
  {
    title: "You own the accounts",
    body: "Your Pages, your ad accounts, your CRM. We work inside them as a partner, and you can withdraw that access whenever you like — including the day we stop working together.",
  },
  {
    title: "Reporting in plain numbers",
    body: "Reach, leads and spend in one place, in language you can repeat to someone else without opening the tool. Not a screenshot of a dashboard.",
  },
  {
    title: "The routine work runs itself",
    body: "Scheduling, list handling and the recurring report are automated. Your team's time goes to the parts that need a judgment call.",
  },
  {
    title: "No case studies to show you",
    body: "We have not published client marketing results, and we are not going to invent any. Ask us what we would run in your first ninety days and judge the answer instead.",
  },
];

export default function Marketing() {
  useSEO({
    title: "Marketing & Social Media Management Services | OneAlgorithm",
    description:
      "Marketing services: social media management for Facebook and Instagram business accounts, campaign management, and performance reporting.",
    canonical: getCanonicalUrl("/services/marketing"),
    keywords:
      "social media management, Facebook Page management, Instagram management, marketing services, campaign management, AI marketing, customer journey optimization, marketing analytics, digital marketing automation",
    ogTitle: "Marketing & Social Media Management Services | OneAlgorithm",
    ogDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    ogUrl: getCanonicalUrl("/services/marketing"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Marketing & Social Media Management Services",
    twitterDescription:
      "Social media management for client Facebook Pages and Instagram business accounts, plus campaign management, AI-driven insights, and performance reporting.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Marketing & Social Media Management Services",
          "Social media management for client-owned Facebook Pages and Instagram business accounts — content planning, publishing and performance reporting — alongside campaign management, AI-driven insights and customer journey optimization.",
          "Marketing",
          "https://onealgorithm.com/services/marketing",
        )}
      />

      <PageHero
        eyebrow="Marketing & Social Media"
        title={
          <>
            Marketing services &amp;{" "}
            <span className="text-oa-orange">social media management</span>
          </>
        }
        lede="We manage social media accounts for our clients and build campaigns that adapt to customer behavior — with AI-driven insights, automated lead nurturing, and reporting that shows what their marketing is actually doing."
        // Panel items are the FEATURES card titles from further down this page,
        // verbatim. No hero bullets existed here and nothing new was written.
        panel={{
          title: "What we deliver",
          items: [
            "Campaign Management",
            "AI-Driven Insights",
            "Customer Journeys",
            "Lead Nurturing",
            "ROI Tracking",
          ],
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What we run for a client, beyond the posting"
          lede="Six things, and none of them is a tool we sell you. They all happen inside platforms you already own."
        />
        <CardGrid columns={3} className="mt-12">
          {FEATURES.map((f) => (
            <Card key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Social Media Management
          Describes the service exactly as it is delivered, including which
          platform data we read and why. Meta's Access Verification review
          checks this page against what the business claims it does, so the
          wording here and in that submission must stay in step.

          DO NOT reword anything in this section - the capability cards, the
          "How it works" steps and the "How we use platform data" paragraphs are
          all compliance-facing copy. The 2026 refresh restyled it and left
          every word intact.

          The #social-media-management anchor is referenced from outside this
          page, so it is carried on a wrapper div - Section takes no id. */}
      <div id="social-media-management" className="scroll-mt-24">
        <Section tone="surface" bordered>
          <SectionHeading
            eyebrow="Social media"
            title="Social Media Management"
            lede="We manage the Facebook Pages and Instagram business accounts our clients own — planning and publishing content, keeping profiles current, and reporting on what each channel is delivering."
          />

          <CardGrid columns={4} className="mt-12">
            {SOCIAL_CAPABILITIES.map((c) => (
              <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
            ))}
          </CardGrid>

          <div className="mt-16">
            <SectionHeading title="How it works" />
            <div className="mt-10">
              <ProcessSteps steps={HOW_IT_WORKS} />
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading title="How we use platform data" />
            <Prose className="mt-6">
              <p>
                To deliver this service we read information from the accounts
                our clients connect to us: Page and profile details, follower
                counts, post performance and engagement figures. We use it for
                one purpose — running and reporting on that client&rsquo;s own
                marketing.
              </p>
              <p>
                We do not sell it, we do not combine one client&rsquo;s data
                with another&rsquo;s, and our access ends when the engagement
                ends. Nothing is published to a client&rsquo;s account without
                their approval.
              </p>
            </Prose>
          </div>
        </Section>
      </div>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why OneAlgorithm"
          title="What this is, and what it isn't"
        />
        <CardGrid columns={2} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Tell us what your marketing is meant to do"
        body="More enquiries, a channel that has gone quiet, or a calendar nobody has time to fill. Tell us which one it is and we'll tell you what we'd run first."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper" compact>
        <SocialShare title="Social Media Management & Marketing - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

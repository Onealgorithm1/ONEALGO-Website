import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  LayoutDashboard,
  Smartphone,
  Workflow,
  Boxes,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Application Development — new page, 2026-08-27.
 *
 * WHAT THIS PAGE MAY NOT DO, and why it is shaped the way it is.
 *
 * An application development page normally proves itself with client logos,
 * app-store badges, download counts and case studies. Every one of those is
 * unavailable here, and it is important that a future editor knows why rather
 * than "fixing" it by adding them back:
 *
 *  1. NO CLIENT NAMES. DESIGN.md records that no client names, logos or
 *     testimonials exist WITH CONSENT. That has not changed. The apps this
 *     firm has built are therefore described by their shape and problem, never
 *     by the client's name, until written consent is on file.
 *  2. NO ADOPTION NUMBERS. Measured 2026-08-26: the three consumer apps have
 *     1+, 0+ and 0+ store downloads. A built app is real work and can be shown
 *     as craft; it cannot carry a traction claim. None is made here.
 *  3. NO "OUR PRODUCT" FRAMING FOR IDEAFORGE. Production for that system
 *     currently deploys from a contractor's private personal GitHub account and
 *     a Cloudflare account this company does not control (verified
 *     2026-08-27). Presenting it publicly as a OneAlgorithm product would be a
 *     claim of ownership the company cannot presently make good on. It is not
 *     named on this page.
 *
 * WHAT THE PAGE LEADS WITH INSTEAD. One Hub is unambiguously our own work and
 * honest to describe: a control plane built FOR a client so they can see and
 * steer their own company. It is NOT a licensed product and is NOT monetised,
 * so no pricing, no "get a demo", no seat count. It is described as what it is
 * — the kind of system we build.
 *
 * THE PAGE'S POINT OF VIEW — "What you own when we finish". This is the one
 * section that could not have been written by an agency that had not lived it.
 * Every item in OWNERSHIP is a specific failure this firm has personally hit
 * and can therefore speak to credibly: production deploying from a personal
 * repo, a frontend on a cloud account the owner cannot log into, an upload
 * key nobody could locate, a Salesforce trial org with no production to
 * promote into. It follows the house pattern set by the SEO page — where a
 * claim is unavailable, publish the verifiable thing you actually own instead.
 */

const BUILDS = [
  {
    icon: LayoutDashboard,
    title: "Internal tools and control panels",
    body: "The system a business runs itself on: what is happening across the company, who owes what, what needs a decision today. Usually replacing a spreadsheet that three people email around and nobody trusts.",
  },
  {
    icon: Smartphone,
    title: "Mobile apps, iOS and Android",
    body: "Native store builds from one codebase, signed and shipped through App Store Connect and Google Play, with the release pipeline set up so a fix reaches users without a specialist.",
  },
  {
    icon: Boxes,
    title: "Customer-facing web applications",
    body: "Portals, booking, marketplaces and ordering. Accounts, payments and permissions built as the load-bearing parts they are, rather than bolted on once the design is signed off.",
  },
  {
    icon: Workflow,
    title: "Salesforce and platform apps",
    body: "Lightning applications, Flow automation and API integration inside an org you already own. We are a listed Salesforce Consulting Partner, so this work sits next to the CRM rather than beside it.",
  },
];

/* Every line here is a failure this firm has personally hit on its own
   projects. That is why the section can be this specific — and why it must not
   be softened into generic reassurance by a later edit. */
const OWNERSHIP = [
  "The source code, in a repository your company owns — not a developer's personal account.",
  "The cloud accounts the app runs on, in your company's name, with your billing and your login.",
  "The signing keys and store listings, so you can publish a new version without tracking down a contractor.",
  "A production environment that exists — not a trial org or a demo instance the app can never be promoted out of.",
  "Written-down operations: how it deploys, how it is restored, and what to do at 2am.",
];

const DISCIPLINE = [
  {
    icon: KeyRound,
    title: "You hold the keys from day one",
    body: "Repositories, cloud accounts and signing keys are created in your name at the start, not transferred at the end. Handover stops being an event that can go wrong.",
  },
  {
    icon: ShieldCheck,
    title: "Security review before launch, not after",
    body: "Access control on every record, secrets kept out of the codebase, dependencies checked, and a restore actually tested. The failures we look hardest for are the ones we have had to fix ourselves.",
  },
];

export default function ApplicationDevelopment() {
  useSEO({
    title: "OneAlgorithm — Application Development",
    description:
      "Custom application development: internal control panels, iOS and Android apps, and Salesforce platform apps, built so you own the code and the keys.",
    canonical: getCanonicalUrl("/services/application-development"),
    keywords:
      "application development, custom software development, mobile app development, web application development, internal tools, Salesforce application development, Philadelphia, Chester County",
    ogTitle: "OneAlgorithm — Application Development",
    ogDescription:
      "Internal control panels, mobile apps, web applications and Salesforce platform apps — built so you own the code, the accounts and the keys.",
    ogUrl: getCanonicalUrl("/services/application-development"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Application Development",
    twitterDescription:
      "Internal control panels, mobile apps, web applications and Salesforce platform apps — built so you own the code, the accounts and the keys.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Application Development",
          "Custom application development covering internal control panels and business dashboards, native iOS and Android mobile applications, customer-facing web applications, and Salesforce Lightning platform applications — delivered with the source code, cloud accounts and signing keys held by the client.",
          "Software Development",
          "https://onealgorithm.com/services/application-development",
        )}
      />

      <PageHero
        eyebrow="Application Development"
        title={
          <>
            Software your company{" "}
            <span className="text-oa-orange">actually owns</span>
          </>
        }
        lede="We build the applications a business runs on — internal control panels, mobile apps, customer portals and Salesforce applications. The part most people find out about too late is ownership: whose repository it lives in, whose cloud account it runs on, and who holds the keys. We set that up in your name on day one."
        panel={{
          title: "What we build",
          items: [
            "Internal tools and control panels",
            "Mobile apps, iOS and Android",
            "Customer-facing web applications",
            "Salesforce and platform apps",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      {/* FEATURED WORK — One Hub. Described as what it is: a system built for a
          client, not a product for sale. No pricing, no demo CTA, no seat
          count, because none of that exists. The client is not named. */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Featured work"
          title="One Hub"
          lede="The clearest example of what we mean by an application a business runs on."
        />
        <div className="mt-10 max-w-[68ch] space-y-5 text-oa-ink2 leading-relaxed">
          <p>
            One Hub is a control plane. It pulls the systems a company already
            pays for — accounting, CRM, search, advertising, reviews — into one
            place, so the people running the business can see what is actually
            happening without logging into six dashboards and reconciling them
            by hand.
          </p>
          <p>
            On top of that sits the part that makes it worth building: the
            routine reading and summarising is done for you. What changed since
            yesterday, what looks wrong, and what needs a decision — surfaced,
            rather than waiting to be noticed by someone with the time to go
            looking.
          </p>
          <p>
            We build One Hub <strong className="font-semibold text-oa-ink">
            for clients</strong>, as part of the engagement. It is not a
            product we license and there is no subscription — it is an example
            of the kind of system this team builds, and the client owns their
            instance outright.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What we build"
          lede="Four shapes of application, and the honest test for all of them is whether the work gets easier once it ships."
        />
        <CardGrid columns={2} className="mt-12">
          {BUILDS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      {/* The page's point of view. See the header comment — every OWNERSHIP
          line is a real failure mode this firm has hit and fixed. */}
      <Section tone="paper" bordered>
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Why OneAlgorithm"
                title="What you own when we finish"
              />
              <p className="mt-6 max-w-[60ch] leading-relaxed text-oa-ink2">
                The most expensive problem in custom software is rarely the
                code. It is discovering, a year later, that the thing you paid
                for deploys from an account nobody at your company can log into.
                At handover you have:
              </p>
              <div className="mt-8">
                <CheckList items={OWNERSHIP} />
              </div>
              <p className="mt-8 max-w-[60ch] leading-relaxed text-oa-ink2">
                We are specific about this because we have audited projects
                where it was not true, and the repair is far more expensive than
                doing it correctly at the start.
              </p>
            </>
          }
          right={
            <Card>
              <h3 className="text-h3 font-semibold text-oa-ink">
                Already have an app?
              </h3>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                We will review what exists and tell you where it stands: who
                controls the code and the accounts, what the security exposure
                is, and what it would take to get it launch-ready. You get the
                findings whether or not you hire us to act on them.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="How we work"
          title="The parts nobody demos"
          lede="Two things that decide whether an application is still maintainable in a year."
        />
        <CardGrid columns={2} className="mt-12">
          {DISCIPLINE.map((d) => (
            <Card key={d.title} icon={d.icon} title={d.title} body={d.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}

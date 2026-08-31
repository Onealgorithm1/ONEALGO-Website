import React from "react";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Cpu,
  Gauge,
  Activity,
  Shield,
  Zap,
  Cog,
  BarChart3,
  Monitor,
  Factory,
  Settings,
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

/* Operations Technology - 2026 refresh; copy rewritten 2026-08-12.
 *
 * The page previously opened with "Comprehensive OT solutions that bridge the
 * gap between operational processes and modern technology capabilities", which
 * is a sentence that survives having every noun in it replaced. It also had no
 * hero lede at all, so a reader arriving cold was told the page's subject only
 * by its two-word H1.
 *
 * The rewrite says what the work is: getting a number that already exists on
 * the floor into a system where somebody can act on it. Every capability keeps
 * its subject - the SCADA card is still about SCADA - so nothing this page has
 * ever ranked for is dropped.
 *
 * SCOPE OF THE CLAIMS. Every capability listed here was already claimed on this
 * page and is left in place; the rewrite describes them, it does not add any.
 * Nothing anywhere in this repository evidences a delivered OT project - no
 * plant, no client, no reference - so nothing below says or implies that one
 * exists. TKTK: confirm which of these have actually been delivered, and by
 * whom. If some have not, they should come off the page rather than be softened.
 *
 * From the earlier presentation-only pass:
 *
 *  - The frosted "Smart Operations" panel in the hero - decorative, and it
 *    squeezed the hero bullets into half the width.
 *  - The mid-page "Ready to Modernize Your Operations?" card. It was the third
 *    identical CTA; the closing band already does that job.
 *
 * The industry application feature lists became CheckLists inside their cards,
 * and the bolded "Technology Focus Areas" rows became cards, so every line of
 * copy survives.
 */

const SERVICES = [
  {
    icon: Factory,
    title: "Industrial automation",
    body: "Automating the steps still done by hand between machines — the clipboard, the whiteboard, the person walking a number from one screen to another.",
  },
  {
    icon: Monitor,
    title: "SCADA systems",
    body: "Supervisory control and data acquisition: screens showing what the line is doing now, alarms when it stops, and history you can go back through when somebody asks why.",
  },
  {
    icon: Gauge,
    title: "Process analysis",
    body: "We instrument a line before changing it, then look at where the time actually goes. It is rarely where people expect, which is the reason for measuring first.",
  },
  {
    icon: Cpu,
    title: "IoT integration",
    body: "Sensors and equipment connected to a network and reporting somewhere useful — run hours, temperature, vibration, counts.",
  },
  {
    icon: Shield,
    title: "OT security",
    body: "Plant networks were built to trust everything on them, and most still do. We segment them from the office network, control remote vendor access, and inventory what is actually connected.",
  },
  {
    icon: Settings,
    title: "Maintenance systems",
    body: "Run hours and condition data feeding the maintenance schedule, so parts get changed on evidence rather than on a calendar.",
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Less manual re-entry",
    body: "Any number typed in twice will eventually disagree with itself. Removing that duplication is usually the fastest win available on a plant floor.",
  },
  {
    icon: BarChart3,
    title: "Answers during the shift",
    body: "Downtime, scrap and throughput visible while the shift is still running, rather than in a report that arrives next week when nobody can act on it.",
  },
  {
    icon: Activity,
    title: "Fewer surprise stoppages",
    body: "Condition data and alerting mean you find out a bearing is running hot before it takes the line down — in most cases, and not for faults that arrive without warning.",
  },
  {
    icon: Cog,
    title: "OT and IT that agree",
    body: "The plant system and the ERP holding the same numbers, so nobody has to decide which one to believe in a Monday meeting.",
  },
];

const APPLICATIONS = [
  {
    title: "Manufacturing",
    body: "Production counts, downtime reasons and quality checks captured where they happen, then fed to the systems that plan the next run.",
    features: [
      "Production monitoring",
      "Quality assurance",
      "Equipment optimization",
      "Supply chain integration",
    ],
  },
  {
    title: "Construction",
    body: "Site progress, equipment location and inspection records reaching the office the same day rather than at the end of the week.",
    features: [
      "Project planning",
      "Site monitoring",
      "Equipment tracking",
      "Safety compliance",
    ],
  },
  {
    title: "E-Commerce",
    body: "Warehouse scanning, stock levels and order status kept in step between the floor, the storefront and the finance system.",
    features: [
      "Inventory control",
      "Order processing",
      "Logistics automation",
      "Customer analytics",
    ],
  },
];

const PROCESS = [
  {
    title: "Survey",
    body: "What is installed, what it can already output, and what is still on paper. This part is mostly walking around and asking the people who run it.",
  },
  {
    title: "Design",
    body: "What connects to what, where the data lands, and what happens when a link drops. We design for the network being down, because at some point it will be.",
  },
  {
    title: "Install",
    body: "Staged, usually inside planned downtime. Production keeps running while we cut over one piece at a time.",
  },
  {
    title: "Tune",
    body: "Alarm thresholds are always wrong at first. We revisit them once you have lived with the system, otherwise people learn to ignore the alarms.",
  },
];

const FOCUS_AREAS = [
  {
    title: "Industrial IoT",
    body: "Equipment and sensors connected and reporting — including older kit that predates all of this and only speaks one protocol.",
  },
  {
    title: "Edge computing",
    body: "Processing at the machine, so a control decision never waits on a link to a data centre.",
  },
  {
    title: "Digital twins",
    body: "A model of the asset fed by its live data. Mostly useful for testing a change before you make it on the real thing.",
  },
  {
    title: "AI/ML integration",
    body: "Pattern detection on run data — predicting a failure, spotting quality drift. Worth doing once you have enough history to train on, and not before.",
  },
];

export default function OperationsTechnology() {
  useSEO({
    title: "Operations Technology (OT) Consulting | OneAlgorithm",
    description:
      "Operations technology: industrial automation, SCADA and real-time monitoring, IoT and sensor integration, OT network security and maintenance systems.",
    canonical: getCanonicalUrl("/services/operations-technology"),
    keywords:
      "operations technology, industrial automation, process optimization, monitoring systems, equipment integration, OT services, manufacturing technology",
    ogTitle: "Operations Technology (OT) Consulting | OneAlgorithm",
    ogDescription:
      "Industrial automation, SCADA and monitoring, IoT integration, OT network security and maintenance systems — connecting what happens on the floor to the systems that plan the work.",
    ogUrl: getCanonicalUrl("/services/operations-technology"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Operations Technology - OneAlgorithm",
    twitterDescription:
      "Industrial automation, SCADA and monitoring, IoT integration, OT network security and maintenance systems.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Operations Technology Services",
          "Operations technology services: industrial automation, SCADA and real-time monitoring, IoT and sensor integration, OT network security, and condition-based maintenance systems, connected to the IT systems that plan the work.",
          "Operations Technology",
          "https://onealgorithm.com/services/operations-technology",
        )}
      />

      <PageHero
        eyebrow="Operations Technology"
        title={
          <>
            Operations <span className="text-oa-orange">technology</span>
          </>
        }
        lede="Operations technology is the equipment side: controllers, SCADA, sensors, and plant systems that were never meant to talk to the software the office runs on. We connect the two, so what happens on the floor reaches the people who need it without anyone retyping it off a screen."
        panel={{
          title: "What we work on",
          items: [
            "Industrial automation",
            "SCADA and real-time monitoring",
            "IoT and sensor integration",
            "OT network security",
            "Condition-based maintenance",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="What the work looks like"
          lede="Most of it is plumbing: taking a number that already exists somewhere on the floor and getting it to a place where somebody can act on it."
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
          title="What connecting the floor to the office gets you"
          lede="Four outcomes, in the order they usually arrive. The first one pays for most of the work."
        />
        <CardGrid columns={4} className="mt-12">
          {BENEFITS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Where we work"
          title="Where this work usually lands"
          lede="Same idea in three settings: capture the thing where it happens, and stop it being retyped later."
        />
        <CardGrid columns={3} className="mt-12">
          {APPLICATIONS.map((app) => (
            <Card key={app.title} title={app.title} body={app.body}>
              <div className="mt-6">
                <CheckList items={app.features} />
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="How we work"
          title="How we install it without stopping you"
          lede="Nothing changes on a running line until we can show what that line is doing now."
        />
        <div className="mt-12">
          <ProcessSteps steps={PROCESS} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Capabilities" title="Technology focus areas" />
        <CardGrid columns={2} className="mt-12">
          {FOCUS_AREAS.map((f) => (
            <Card key={f.title} title={f.title} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      <CTABand
        title="Tell us what the floor can't see"
        body="A line that stops for reasons nobody records, a report somebody assembles by hand every Monday, or a plant network nobody has mapped in years."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View All Services", to: "/services" }}
      />

      <Section tone="paper" compact>
        <SocialShare title="Operations Technology - SCADA, IoT & Automation - OneAlgorithm" />
      </Section>
    </Layout>
  );
}

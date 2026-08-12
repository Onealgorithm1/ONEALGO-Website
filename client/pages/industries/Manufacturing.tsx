import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  Cpu,
  Network,
  Database,
  ShieldCheck,
  Boxes,
  Users,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  Prose,
  Split,
  CTABand,
} from "../../components/site";

/* Manufacturing - copy rewritten 2026-08-12.
 *
 * WHAT WAS WRONG WITH THIS PAGE
 *
 * Six feature cards describing a manufacturing product suite this firm does not
 * sell - "Predictive maintenance scheduling to prevent equipment failures",
 * "Real-time quality control monitoring and defect tracking" - followed by four
 * outcome claims ("Increase Efficiency", "Prevent Downtime") with nothing
 * behind them. No plant, no engagement and no number anywhere in this
 * repository supports any of it.
 *
 * WHY THIS PAGE STILL DESERVES TO EXIST
 *
 * Of the four commercial industry pages this one has the strongest claim: the
 * Operations Technology service is genuinely plant-facing (SCADA, industrial
 * IoT, OT security, maintenance systems) and Oracle ERP is genuinely a
 * manufacturer's back office. So the page now describes those two services
 * where they meet, and says outright that predictive maintenance is a data
 * question before it is a product.
 *
 * Every capability named below maps to /services/operations-technology or
 * /services/oracle-erp. Nothing new was invented, and the outcome claims are
 * gone rather than rewritten.
 */

const WORK = [
  {
    icon: Network,
    title: "Getting data off the equipment",
    body: "Most plants already emit far more than anyone reads. The work is getting it off the line and into something a person looks at weekly — sensors, historians and industrial IoT integration before anything called a dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "The boundary between OT and IT",
    body: "Plant networks and business systems have different uptime rules, different security models and often different owners. We work both sides, and we treat the boundary as the actual project rather than a wiring detail.",
  },
  {
    icon: Database,
    title: "Oracle ERP, full lifecycle",
    body: "Finance, supply chain and operations: readiness assessment, configuration, data migration, go-live, and the hypercare and support that follow it.",
  },
  {
    icon: Cpu,
    title: "SCADA and industrial automation",
    body: "Supervisory control and data acquisition, automated line processes, and edge processing where the round trip to a data centre is too slow to be useful.",
  },
  {
    icon: Boxes,
    title: "Maintenance systems, honestly scoped",
    body: "Before a model can tell you a bearing is going, something has to have been recording that bearing for long enough to know what normal looks like. Often that record does not exist yet, and we would rather say so than sell a pilot.",
  },
  {
    icon: Users,
    title: "Engineers added to your team",
    body: "Integration and platform people working inside your team, on your tools, for a sprint or for a year — including through a go-live when your own staff still have a plant to run.",
  },
];

export default function Manufacturing() {
  useSEO({
    title: "Manufacturing Technology, OT and ERP — OneAlgorithm",
    description:
      "Operations technology and ERP work for manufacturers: SCADA, industrial IoT, OT security, and full-lifecycle Oracle ERP. A small IT consultancy in Malvern, PA.",
    canonical: getCanonicalUrl("/industries/manufacturing"),
    keywords:
      "manufacturing technology consulting, operations technology, SCADA integration, industrial IoT, OT security, Oracle ERP for manufacturers, plant floor systems integration",
    ogTitle: "Manufacturing Technology, OT and ERP — OneAlgorithm",
    ogDescription:
      "Plant-floor operations technology and the ERP work behind it — and a plain account of what we have not done.",
    ogUrl: getCanonicalUrl("/industries/manufacturing"),
  });

  return (
    <Layout>
      <PageHero
        title={
          <>
            Manufacturing:{" "}
            <span className="text-oa-orange">
              the plant floor and the systems behind it
            </span>
          </>
        }
        lede="We do two kinds of work for manufacturers. Operations technology on the floor — SCADA, industrial IoT, OT security, maintenance systems — and the ERP and integration work behind it. Usually the data already exists; it just stops at the machine."
        panel={{
          title: "What that means in practice",
          items: [
            "SCADA and industrial IoT integration",
            "OT-to-IT network and security work",
            "Oracle ERP implementation and support",
            "Production reporting from real sources",
            "Maintenance systems, scoped honestly",
            "Engineers added to your team",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="Six things we get called about"
          lede="Each is a service on this site. What changes in a plant is what sits on the other end: a PLC, a historian, a line that cannot be stopped for a migration."
        />
        <CardGrid columns={3} className="mt-12">
          {WORK.map((w) => (
            <Card key={w.title} icon={w.icon} title={w.title} body={w.body} />
          ))}
        </CardGrid>

        <p className="mt-10 max-w-[68ch] text-oa-ink2">
          The full descriptions live on{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/operations-technology"
          >
            operations technology
          </Link>{" "}
          and{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/oracle-erp"
          >
            Oracle ERP
          </Link>
          .
        </p>
      </Section>

      <Section tone="surface" bordered>
        <Split
          left={<SectionHeading title="What we are not" />}
          right={
            <Prose>
              <p>
                We are not an MES or a quality-management product, and we do not
                resell one. We work on the equipment, networks and business
                systems you already run.
              </p>
              <p>
                We have published no manufacturing case study and we will not
                imply one. One Algorithm is a small IT consultancy in Malvern,
                Pennsylvania, founded in 2020, and the plant and enterprise
                experience behind this work was earned by the team as employees
                at larger organizations — set out on our{" "}
                <Link
                  className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                  to="/about"
                >
                  about page
                </Link>
                .
              </p>
              <p>
                The useful conversation is a specific one: which line, which
                system, and what happens today when the two disagree.
              </p>
            </Prose>
          }
        />
      </Section>

      <CTABand
        title="Tell us where the data stops"
        body="At the machine, at the historian, or at the ledger. Bring one line and the report someone builds by hand about it, and we will tell you what it would take to close that gap."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
    </Layout>
  );
}

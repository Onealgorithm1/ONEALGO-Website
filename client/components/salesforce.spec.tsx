import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import {
  AnswerBand,
  CTAProof,
  DataTable,
  DeliveredLedger,
  Desk,
  HcLink,
  JumpList,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
} from "./salesforce";
import { RecordLine } from "./SalesforceRecordCard";
import { PageHero, PrimaryCTA, ProcessSteps, SecondaryCTA, Section } from "./site";
import { PLATES } from "../data/plates/hub";
import { SF_PAGES, SF_VERIFIED_LABEL } from "../data/salesforceProof";

/* Server-renders the Salesforce plate-system primitives (spec 2.x). What these
   guard is the stuff that fails silently: an owner-gated block rendering a
   placeholder, the current page linking to itself, a tel: link opening a tab,
   the first plate going lazy, the Desk losing its anchor or its labels. */
const at = (path: string, node: React.ReactNode) =>
  renderToStaticMarkup(<MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>);

describe("site-wide CTA fix", () => {
  it("never opens tel:, mailto: or # in a new tab; documents still do", () => {
    expect(at("/", <SecondaryCTA href="tel:+16108909711">Call</SecondaryCTA>)).not.toContain("_blank");
    expect(at("/", <PrimaryCTA href="#start">Go</PrimaryCTA>)).not.toContain("_blank");
    expect(at("/", <PrimaryCTA href="mailto:a@b.co">Mail</PrimaryCTA>)).not.toContain("_blank");
    expect(at("/", <SecondaryCTA href="/docs/capability-statement.pdf">PDF</SecondaryCTA>)).toContain('target="_blank"');
  });
  it("adds data-cta and the arrow only when opted in", () => {
    const plain = at("/", <PrimaryCTA href="#start">Go</PrimaryCTA>);
    expect(plain).not.toContain("data-cta");
    expect(plain).not.toContain("<svg");
    const sf = at("/", <PrimaryCTA href="#start" cta="hero">Go</PrimaryCTA>);
    expect(sf).toContain('data-cta="hero"');
    expect(sf).toContain("<svg");
  });
  it("Section is unchanged unless clip is set", () => {
    expect(at("/", <Section>x</Section>)).not.toContain("oa-fx");
    expect(at("/", <Section clip>x</Section>)).toContain("oa-fx overflow-hidden supports-[overflow:clip]:overflow-clip");
  });
});

describe("Salesforce primitives", () => {
  it("hangs Salesforce children off the hub in the breadcrumb", () => {
    const html = at("/services/salesforce-integration", <PageHero title="t" />);
    expect(html).toMatch(/Home[\s\S]*Services[\s\S]*Salesforce[\s\S]*Integration/);
    expect(html).toContain('"item":"https://onealgorithm.com/services/salesforce"');
  });

  it("renders the first plate eager and static, later plates lazy and drawable", () => {
    const spec = PLATES["salesforce-implementation-stages"];
    const first = at("/", <PlateScope><Plate spec={spec} fig={1} first stamp={["DIAGRAM", "ONEALGORITHM"]} caption="c" /></PlateScope>);
    expect(first).toContain('loading="eager"');
    expect(first).not.toContain("data-draw");
    expect(first).toContain(`alt="${spec.alt}"`);
    expect(first).toContain("FIG. 1 · DIAGRAM");
    const later = at("/", <PlateScope><Plate spec={spec} fig={2} legend stamp={["A", "B"]} caption="c" /></PlateScope>);
    expect(later).toContain('loading="lazy"');
    expect(later).toContain("data-draw");
    expect(later).toContain('aria-pressed="false"');
  });

  it("PeopleStrip renders the approved lead line, verify link and Person schema, never a photo", () => {
    const html = at("/services/salesforce", <PeopleStrip />);
    expect(html).toContain("Sreenivas Amirisetti leads our Salesforce practice. He holds Salesforce certifications from Administrator to Application Architect and earned his first in 2014.");
    expect(html).toContain("Verify on his Trailblazer profile");
    expect(html).not.toContain("<img");
    const ld = JSON.parse(html.split('<script type="application/ld+json">')[1].split("</script>")[0]);
    expect(ld[0]).toMatchObject({
      "@type": "Person",
      name: "Sreenivas Amirisetti",
      jobTitle: "Salesforce practice lead",
      worksFor: { "@id": "https://onealgorithm.com/#org" },
      sameAs: ["https://www.salesforce.com/trailblazer/samirisetti", "https://www.linkedin.com/in/samirisetti/"],
    });
  });

  it("DeliveredLedger carries no deficit line and RouteBoard can leave a card out", () => {
    expect(at("/services/salesforce", <DeliveredLedger title="t" />)).not.toMatch(/invent|do not name/i);
    const board = at("/services/salesforce-health-check", <RouteBoard groups={["services"]} exclude={["mc"]} />);
    expect(board).not.toContain("marketing-cloud");
    expect(board).toContain("xl:grid-cols-3"); // 5 cards: 3 + 2, never a lone card
  });

  it("JumpList needs six items", () => {
    const five = Array.from({ length: 5 }, (_, i) => ({ id: `s${i}`, label: `S${i}` }));
    expect(at("/", <JumpList items={five} />)).toBe("");
    expect(at("/", <JumpList items={[...five, { id: "x", label: "X" }]} />)).toContain('href="#x"');
  });

  it("RouteBoard leaves out the current page and puts `first` first", () => {
    const html = at("/services/salesforce-data-migration", <RouteBoard groups={["services", "cities"]} first="int" />);
    expect(html).not.toContain('href="/services/salesforce-data-migration"');
    expect(html.indexOf("/services/salesforce-integration")).toBeLessThan(html.indexOf("/services/salesforce-health-check"));
    expect(html.match(/salesforce-consultant-/g)?.length).toBe(SF_PAGES.cities.length);
  });

  it("DeliveredLedger marks this page's row instead of linking it", () => {
    const html = at("/services/salesforce-integration", <DeliveredLedger title="t" lead="sap" />);
    expect(html).toContain("THIS PAGE · DELIVERED");
    expect(html).not.toContain('href="/services/salesforce-integration"');
    expect(html.indexOf("An SAP-to-Salesforce sync")).toBeLessThan(html.indexOf("lending company"));
  });

  it("the Desk is the #start anchor with labelled fields, the honeypot and the phone", () => {
    const html = at(
      "/services/salesforce-integration",
      <Desk heading="h" body="b" form={{ topic: "int", topicLabel: "Integration", heading: "Tell us", prompt: "Which two systems?", submitLabel: "Send" }} />,
    );
    expect(html).toContain('id="start"');
    expect(html).toContain('id="start-title"');
    for (const f of ["firstName", "lastName", "email", "phone", "company", "message"]) expect(html).toContain(`for="sf-desk-${f}"`);
    expect(html).toContain('name="company_website"');
    expect(html).toContain('href="tel:+16108909711"');
    expect(html).toContain("Which two systems? (optional)");
    expect(html).toContain("What the free health check covers");
    // Nothing in the Desk starts hidden (the off-screen honeypot is the one
    // deliberate opacity:0, same markup as Contact.tsx).
    expect(html.replace(/<input[^>]*company_website[^>]*>/, "")).not.toMatch(/opacity:\s*0(?![.\d])/);
  });

  it("HcLink is absent on the health check page", () => {
    expect(at("/services/salesforce-health-check", <HcLink />)).toBe("");
  });

  it("proof lines carry the read date and the listing link", () => {
    for (const html of [at("/", <CTAProof />), at("/", <RecordLine />)]) {
      expect(html).toContain(`read ${SF_VERIFIED_LABEL}`);
      expect(html).toContain("a0N3A00000EV7SwUAL");
    }
    expect(SF_VERIFIED_LABEL).toBe("23 October 2026");
  });

  it("DataTable shows a next-step row only for our own column", () => {
    const rows = [{ k: "a", cells: ["Scope", "Tool", "Review"] }];
    expect(at("/", <DataTable label="t" head={["", "Tool", "Review"]} rows={rows} source="s" />)).not.toContain("Next step");
    const own = at("/", <DataTable label="t" head={["", "Tool", "Review"]} rows={rows} source="s" own={2} nextStep={{ label: "Book" }} />);
    expect(own).toContain("Next step");
    expect(own).toContain('data-cta="table"');
    expect(own).toContain('role="region"');
  });

  it("ProcessSteps is unchanged without rail; rail adds nodes and the terminal", () => {
    const steps = [{ title: "One", body: "b" }, { title: "Two", body: "b", to: "/x" }];
    expect(at("/", <ProcessSteps steps={steps} />)).not.toContain("step-node");
    const rail = at("/", <ProcessSteps rail terminal={{ label: "Book" }} steps={steps} />);
    expect(rail.match(/step-node/g)?.length).toBe(3);
    expect(rail).toContain('data-cta="rail"');
    expect(rail).toContain('href="/x"');
  });

  it("AnswerBand renders the answer with no motion wrapper", () => {
    const html = at("/", <AnswerBand question="Q?" answer="A." leads={[{ label: "What it costs", body: "Free." }]} />);
    expect(html).toContain('id="answer"');
    expect(html).not.toContain("opacity");
  });
});

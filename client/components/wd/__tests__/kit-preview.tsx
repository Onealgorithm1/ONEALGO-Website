/* Kit preview: mounts every wd component on one page, the way the website-development page will use them,
 * so the motion can be driven in a real browser before any route exists. Not routed; not in the build.
 *
 *   Served by the dev server as a module:  http://127.0.0.1:5190/client/components/wd/__tests__/kit-preview.tsx
 *   Driven by the harness in onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/build-wave0/kit-harness.mjs
 *   (a page on another port with <div id="root"> and this file as its module script; /work, /fonts and /vendor
 *   served from public/). Hash #reduce opens it with nothing moving, which the harness pairs with the OS setting.
 */
import * as React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, GoDeeper, LedgerRule, DeskCTA } from "../../sf";
import { WORK, type WorkItem } from "../../../data/work";
import { Preview } from "../../WorkCarousel";
import { SiteWindow, BuildStage, DemoSheet, HandoverPlate, AccessibilityPlate, RegionPlate } from "..";
import "../../../styles/wd.css";

const COUNTIES = ["Chester County, PA", "Delaware County, PA", "Montgomery County, PA", "Bucks County, PA", "Philadelphia County, PA", "New Castle County, DE"];

function Kit() {
  const [open, setOpen] = React.useState<{ item: WorkItem; opener: HTMLElement } | null>(null);
  const close = React.useCallback(() => setOpen(null), []);
  const onPreview = (item: WorkItem, opener: HTMLElement) => setOpen({ item, opener });
  return (
    <SfPage crumbs={[{ label: "Website development" }]} className="wd">
      <div className="wd-progress" aria-hidden="true" />
      <div style={{ height: "60vh", display: "grid", placeItems: "center" }} className="sf-mono">(hero stand-in: 60vh)</div>

      <SmartSection id="work" tone="night" grid>
        <SmartUnit className="sf-c12" headingId="h-work" title="Websites we built, open them here" lede="OneAlgorithm is a web design and development company in Malvern, PA, and these six sites are our work: open any of them here." lead="a live site shows what a template cannot, how it loads, reads and sells on the device in your hand." />
        <div className="sf-c12 wd-windows-6">
          {WORK.map((w, i) => <SiteWindow key={w.slug} item={w} eager={i < 3} sweep={i >= 3} onPreview={onPreview} reviewDialogId={w.review ? `review-${w.slug}` : undefined} />)}
        </div>
      </SmartSection>

      <SmartSection id="what" grid>
        <div className="sf-c12 sf-grid" data-pin="" style={{ alignItems: "start" }}>
          <SmartUnit className="sf-c5" headingId="h-what" title="What is custom website development?" lede="Custom website development means a site designed and coded for one business, its content and its systems, instead of a template filled in." lead="the page you are reading was built this way, and the build stage beside it shows the same process in miniature." points={["Designed around one business, from its content outward", "Coded, not configured: no theme, no page builder", "Owned outright: code, domain and hosting in your name"]}>
            <GoDeeper label="what custom excludes"><div className="sf-deep-body"><p>Stand-in text for the harness.</p></div></GoDeeper>
          </SmartUnit>
          <BuildStage fig={1} className="sf-c7" />
        </div>
      </SmartSection>

      <SmartSection id="build" tone="surface" grid>
        <DemoSheet className="sf-c7" />
        <SmartUnit className="sf-c5" headingId="h-build" title="What we design and build" lede="We design and build marketing and lead-generation sites, online stores and web applications, wired to the forms, CRM, bookings and payments you use." leadIn="What you get:" lead="one team for design, code and integrations, with the scope and price written down before the build starts." />
      </SmartSection>

      <SmartSection id="redesign" grid>
        <SmartUnit className="sf-c5" headingId="h-redesign" title="Website redesign that keeps what already works" lede="A website redesign replaces the design and code while keeping your domain, your content and every address search engines already know, each one redirected." />
        <SiteWindow item={WORK[0]} screen="second" size="wide" sweep onPreview={onPreview} className="sf-c7" />
      </SmartSection>

      <SmartSection id="small" tone="surface" grid>
        <div className="sf-c7 wd-windows-3">
          {[WORK[1], WORK[2], WORK[4]].map((w) => <SiteWindow key={w.slug} item={w} screen="second" size="third" sweep onPreview={onPreview} reviewDialogId={w.review ? `review-${w.slug}` : undefined} />)}
        </div>
        <SmartUnit className="sf-c5" headingId="h-small" title="Website design for small businesses" lede="Small business website design is scoped to three jobs: be found, explain the service, and turn a visit into a call, booking or order." />
      </SmartSection>

      <SmartSection id="a11y" grid>
        <AccessibilityPlate className="sf-c5" />
        <SmartUnit className="sf-c7" headingId="h-a11y" title="ADA compliance and accessible websites" lede="An ADA compliant website is one people with disabilities can use; we build and test it against WCAG 2.1 AA." />
      </SmartSection>

      <SmartSection id="after" tone="surface" grid>
        <SmartUnit className="sf-c5" headingId="h-after" title="After launch: support, hosting and security" lede="After launch the site runs on hosting and a domain you control, with HTTPS and security headers in place, and we stay on for support.">
          <ul className="sf-points">
            <li data-hl-for="fig5" data-hl-key="host"><a className="sf-link" href="#after">Hosting and domain in your name</a></li>
            <li data-hl-for="fig5" data-hl-key="repo"><a className="sf-link" href="#after">Source in your own repository</a></li>
            <li data-hl-for="fig5" data-hl-key="docs"><a className="sf-link" href="#after">Written so another developer can pick it up</a></li>
          </ul>
        </SmartUnit>
        <HandoverPlate className="sf-c7" />
      </SmartSection>

      <SmartSection id="check" grid>
        <SmartUnit className="sf-c7" headingId="h-check" title="A web design company you can check" lede="OneAlgorithm is a web design and development company in Malvern, PA, founded in 2020 and rated 5.0 from 6 Google reviews (read 23 October 2026)." />
        <RegionPlate className="sf-c5" counties={COUNTIES} office={{ l1: "625 Swedesford Rd, Unit B", l2: "Malvern, PA 19355" }} />
        <LedgerRule className="sf-c12"><p className="sf-mono">ledger rule stand-in</p></LedgerRule>
      </SmartSection>

      <DeskCTA form={{ need: "website", topic: "website", topicLabel: "Website", heading: "Start a project", prompt: "What does the site have to do?", submitLabel: "Start a project" }} heading="Tell us what the site has to do" lede="Describe what the site needs to do and you get the scope, price and schedule in writing before anyone builds anything." covers={["What the site has to do (sell, book, explain, log people in)", "The sites you like, and why", "What you have: domain, hosting, content, logins"]} coversLabel="What to have ready" next={["Send it on the contact page, or call", "A person at OneAlgorithm reads it and replies", "If it fits, the written scope and price follow"]} hcLink={false} />

      {open && <Preview item={open.item} onClose={close} opener={open.opener} />}
    </SfPage>
  );
}

createRoot(document.getElementById("root")!).render(<MemoryRouter><Kit /></MemoryRouter>);

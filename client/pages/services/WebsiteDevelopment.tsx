import React, { Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import HeroFrame from "../../components/HeroSlides";
import {
  SfPage, SmartSection, SmartUnit, LedgerRule, GoDeeper, EvidenceDialog, SourcesDialog, Verify, DeskCTA, SfButton,
  StageRail, StageUnits,
} from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { SiteWindow, BuildStage, DemoSheet, HandoverPlate, AccessibilityPlate, RegionPlate } from "../../components/wd";
import { WdFaq } from "../../components/wd/WdFaq";
import { FoundRoad } from "../../components/wd/FoundRoad";
import { Preview } from "../../components/WorkCarousel";
import { WORK, type WorkItem } from "../../data/work";
import {
  U, PAGE_PATH, PAGE_URL, PAGE_UPDATED, PAGE_UPDATED_LABEL, TITLE, DESCRIPTION, OG_IMAGE, OG_ALT,
  BUILD_KINDS, AFTER_ROWS, HANDOVER, SECTOR_LINKS, LOCAL_LINKS, NAP, DESK,
} from "../../data/wd-copy";
import { COST_DRIVERS, COMPARE, WD_STAGES } from "../../data/wd-tables";
import { WD_FAQ } from "../../data/wd-faq";
import {
  GOOGLE_LISTING, FOUNDED, REVIEWS, HERO_BUILD_ROWS, PHANTOM_CONFIGURATOR, PHANTOM_REDESIGN, WCAG_SOURCES, CHECK_POSTS, READ_LISTING,
} from "../../data/wd-proof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema } from "../../components/StructuredData";
import "../../styles/wd.css";
import "../../components/wd/wd-page.css";
import { PLACES } from "../../data/wd-local/places";

/* U13 "Where we work": every state page, then the 12 largest metros (places.ts is in page-map build order, by Semrush sum)
   plus every metro whose state has no page of its own, so each place page is at most two clicks from here. */
const PLACE_STATES = PLACES.filter((p) => p.kind === "state").sort((a, b) => a.name.localeCompare(b.name));
const STATE_NAMES = new Set(PLACE_STATES.map((p) => p.state));
const PLACE_METROS = PLACES.filter((p) => p.kind === "metro").filter((p, i) => i < 12 || !STATE_NAMES.has(p.state));

/* /services/website-development, THE SHOWCASE. Rebuilt 2026-10-24 around the 17 Smart Brevity units of
 * onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/structure-spec.md §4 (title, meta, H2 list in order, answer
 * blocks, proof pop-ups §5, FAQ §6, schema §10.1, E-E-A-T §11, CTA §12) on the design of design-contract-webdev.md §4
 * (layouts, motion, hover, reduced motion) with the kit in client/components/wd (foundation: build-wave0/foundation.md).
 *
 * ⛔ THE HERO IS FROZEN (owner 2026-10-23 ~21:10, 2026-10-24): <HeroFrame /> is called exactly as before and
 * HeroSlides.tsx is byte-identical. The two proposals (A film gate, B identity line) render only behind ?hero=a /
 * ?hero=b on the preview (wd/HeroProposal.tsx, lazy); the prerender has no query string, so nothing ships.
 *
 * PROOF, and only this proof: the six work.ts sites (listing rule 2026-10-01; Atlas stays, GATED on Louis), the three
 * Google reviews verbatim (Sean's text and Lou's full text TKTK until pulled from the listing), the Google listing
 * figures (5.0 / 6, read 2026-10-23), founded 2020 (PA entity 7068842), the two Phantom case studies' figures (the
 * redesign pop-up is GATED: Louis sees the wording first), WCAG 2.1 and the DOJ rules as text. ⛔ Never a price,
 * turnaround, "affordable", "we work fast", WordPress delivery, years, WOSB/EDWOSB, awards, a named lead, a photo.
 *
 * LINKS: in-site only in the body; the client domain links stay plain crawlable <a> (the association is wanted);
 * the one off-site control per record is the secondary button inside its dialog (GATED #13: Google as salesforce.com).
 * CTA: a button to /contact#need=website&topic=Website&from=… (DeskCTA.contactHref), twice (U7, U17) + the frozen hero's.
 *
 * GATED, rendered as company facts only until Louis answers (structure-spec.md §13): "Who leads website work"
 * (no H3), "customer portals" (U3), "backups" (U10), WordPress (U8/U11), the Atlas window. */

// Preview builds only (__OA_HERO_PROPOSALS__): a production build neither ships the chunk nor reads ?hero=.
const HeroProposal = __OA_HERO_PROPOSALS__ ? lazy(() => import("../../components/wd/HeroProposal").then((m) => ({ default: m.HeroProposal }))) : () => null;
const CONTACT = contactHref(DESK.form.topicLabel, PAGE_PATH, DESK.form.need);
const BY_SLUG = Object.fromEntries(WORK.map((w) => [w.slug, w])) as Record<string, WorkItem>;
const SMALL = [BY_SLUG["inspect-this-home"], BY_SLUG["boards-professor"], BY_SLUG["starzi-bros"]].filter(Boolean);
const reviewId = (w: WorkItem) => (w.review ? `review-${w.slug}` : undefined);
/* A site shown twice (U1 card, U4/U5 second screen) must not repeat its H3 text (gate 4: no duplicate headings); the
   second window is named for what it is. ponytail: a `heading` prop on SiteWindow would keep the alt text cleaner; listed for integrate. */
const second = (w: WorkItem): WorkItem => ({ ...w, name: `${w.name}, second screen` });

export default function WebsiteDevelopment() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    keywords: "custom website design, custom web development services, website redesign, small business website design, ADA compliant website, website cost, own your website code",
    canonical: getCanonicalUrl(PAGE_PATH),
    // The LCP element is the hero film's poster (Lighthouse 2026-08-25 and 2026-10-24); preloading it is unchanged.
    preloadImage: "/media/hero-poster.webp",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
  });

  const search = useLocation().search;
  const hero = __OA_HERO_PROPOSALS__ ? new URLSearchParams(search).get("hero") : null; // production ignores ?hero=
  const [open, setOpen] = React.useState<{ item: WorkItem; opener: HTMLElement } | null>(null);
  const close = React.useCallback(() => setOpen(null), []);
  const onPreview = React.useCallback((item: WorkItem, opener: HTMLElement) => setOpen({ item, opener }), []);

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Custom website design and development",
          "Custom website design and development for businesses across the United States: designed and coded for one business, built to WCAG 2.1 AA, integrated with the forms, CRM, bookings and payments the business runs, and handed over outright: source, domain and hosting in the client's name.",
          "Website design and development",
          PAGE_URL,
          { providerId: "https://onealgorithm.com/#org", areaServed: { "@type": "Country", name: "United States" }, image: OG_IMAGE },
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Websites built by OneAlgorithm",
          itemListElement: WORK.map((w, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "WebSite", name: w.name, url: w.url } })),
        }}
      />

      {/* S0 · the frozen hero. Proposals A/B only behind ?hero= (preview). */}
      {hero === "a" || hero === "b" ? (
        <div style={{ position: "relative" }}>
          <p className="wd-hero-note" aria-hidden="true">Hero proposal {hero.toUpperCase()} · preview only</p>
          <Suspense fallback={null}><HeroProposal variant={hero} /></Suspense>
        </div>
      ) : (
        <HeroFrame />
      )}

      <SfPage crumbs={[{ label: "Website development" }]} className="wd">
        <div className="wd-progress" aria-hidden="true" />

        {/* U1 · S1 night band: the six live-site windows (signature 2). Windows 1-3 eager (under the hero), 4-6 lazy + sweep. */}
        <SmartSection id={U.work.id} tone="night" grid labelledBy="h-work">
          <SmartUnit className="sf-c12" headingId="h-work" title={U.work.title} lede={U.work.lede} leadIn={U.work.leadIn} lead={U.work.lead}>
            <GoDeeper label={U.work.deep!}>
              <p className="sf-rule">The live site loads inside a sandboxed frame on this page, so you use it without leaving. A site that refuses framing shows our full-page capture, with its date in the stamp. The sandbox blocks top navigation and downloads; the framed site's own scripts, fonts and media are its own and load only when you press Preview. The domain link under each window opens the site itself in a new tab.</p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c12 wd-windows-6">
            {WORK.map((w, i) => (
              <SiteWindow key={w.slug} item={w} eager={i < 3} sweep={i >= 3} onPreview={onPreview} reviewDialogId={reviewId(w)} />
            ))}
          </div>
        </SmartSection>

        {/* U2 · S2 THE BUILD STAGE (signature 1): the one pin on the site; the row (unit + stage) is what pins. */}
        <SmartSection id={U.what.id} grid labelledBy="h-what">
          <div className="sf-c12 sf-grid wd-pin-row" data-pin="">
            <SmartUnit className="sf-c5" headingId="h-what" title={U.what.title} lede={U.what.lede} leadIn={U.what.leadIn} lead={U.what.lead} points={U.what.points}>
              <GoDeeper label={U.what.deep!}>
                <p className="sf-rule">A builder or a theme rents you a layout: you fill the slots it offers and pay monthly for what you cannot change. Custom work starts from your content and your systems and ends in code you own.</p>
                <p>The hero on this page is the same idea in miniature: a particle field rasterised from live text, drawn on a canvas in your browser, no library, built for this site after the published 21st.dev “Magic Text Reveal” pattern.</p>
                <div className="sf-links"><Verify id="hero-build">How the hero was built</Verify></div>
              </GoDeeper>
            </SmartUnit>
            <BuildStage fig={1} className="sf-c7" />
          </div>
        </SmartSection>

        {/* U3 · stage row: the three finished demos dealt onto one sheet, the four kinds of build beside them. */}
        <SmartSection id={U.build.id} tone="surface" grid labelledBy="h-build">
          <DemoSheet className="sf-c7" />
          <SmartUnit className="sf-c5" headingId="h-build" title={U.build.title} lede={U.build.lede} leadIn={U.build.leadIn} lead={U.build.lead} measure={false}>
            <ul className="wd-rows">
              {BUILD_KINDS.map((k) => (
                <li key={k.title}>
                  <h3 className="sf-h4">{k.title}</h3>
                  <p>{k.line}</p>
                  {k.to && <div className="sf-links"><Link className="sf-link" to={k.to}>{k.linkLabel}</Link></div>}
                </li>
              ))}
            </ul>
            <GoDeeper label={U.build.deep!}>
              <p className="sf-rule">Which of the six sites is which: Phantom Arcades is a web application and a shop, with an eight-cabinet 3D configurator that prices the machine as you build it. The Gorband and Atlas Peptides are online stores; The Gorband runs on Square, one catalogue for the website and the market stall. Inspect This Home Inspections, The Boards Professor and Starzi Brothers are lead-generation sites, with online scheduling, booking and a quote form that lands in the office inbox.</p>
              <p>Every build includes the forms, the analytics and the search groundwork; the integrations are named in the written scope.</p>
              <div className="sf-links"><Verify id="phantom-configurator">The Phantom configurator, with figures</Verify></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* U4 · window: Phantom's second screen (the configurator), the one measured redesign; its figures behind Verify (GATED wording). */}
        <SmartSection id={U.redesign.id} grid labelledBy="h-redesign">
          <SmartUnit className="sf-c5" headingId="h-redesign" title={U.redesign.title} lede={U.redesign.lede} leadIn={U.redesign.leadIn} lead={U.redesign.lead} points={U.redesign.points}>
            <p className="sf-mono wd-verify-line">Measured on one redesign · <Verify id="phantom-redesign">Phantom redesign figures</Verify></p>
            <GoDeeper label={U.redesign.deep!}>
              <h3>How a redesign keeps your rankings</h3>
              <p className="sf-rule">We crawl the old site first and map every address to its new one, so the redirect list exists before the first screen is designed. The content audit keeps what ranks and rewrites what does not. The redirects are tested before launch, and Search Console is read after it.</p>
              <h3>Working with the site you already have</h3>
              <p>Often, yes. Sometimes the honest answer is that rebuilding is cheaper than fixing, and we tell you which one you are looking at rather than quoting whichever is bigger.</p>
              <p><Link className="sf-link" to="/services/website-redesign">Website redesign that keeps your rankings</Link></p>
            </GoDeeper>
          </SmartUnit>
          <SiteWindow item={second(BY_SLUG["phantom-arcades"])} screen="second" size="wide" sweep onPreview={onPreview} className="sf-c7" />
        </SmartSection>

        {/* U5 · the unit, then ITH · TBP · Starzi second screens as one full-width strip (legible at 1440; 2-up / scroller below). */}
        <SmartSection id={U.small.id} tone="surface" grid labelledBy="h-small">
          <SmartUnit className="sf-c12" headingId="h-small" title={U.small.title} lede={U.small.lede} leadIn={U.small.leadIn} lead={U.small.lead} points={U.small.points} measure={false}>
            <GoDeeper label={U.small.deep!}>
              <h3>What a small business site has to do</h3>
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li>Business Profile linked, titles and schema written, Search Console and analytics connected at launch</li>
                <li>Forms to the inbox and the CRM; booking where the business books; the phone one tap away</li>
                <li>Service pages in the owner's words, and a page per area where the work is local</li>
              </ul>
              <h3>Three small-business sites we built</h3>
              <p>Inspect This Home Inspections: service pages by area, online scheduling, and reports the owner updates himself. The Boards Professor: booking, tutor profiles and reviews pulled from two platforms into one page. Starzi Brothers: moved off Squarespace to a page for each service and town, and a quote form that lands in the office inbox.</p>
              <p><Link className="sf-link" to="/services/small-business-website-design">Small business website design</Link></p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c12 wd-windows-6 wd-strip">
            {SMALL.map((w) => <SiteWindow key={w.slug} item={second(w)} screen="second" sweep onPreview={onPreview} />)}
          </div>
        </SmartSection>

        {/* U6 · S3 the rail, five stations; hovering a stage unit lights its station. */}
        <SmartSection id={U.process.id} labelledBy="h-process">
          <SmartUnit className="sf-c12" headingId="h-process" title={U.process.title} lede={U.process.lede} leadIn={U.process.leadIn} lead={U.process.lead} />
          <StageRail
            fig={3}
            stations={WD_STAGES}
            className="sf-rail-top"
            title="Diagram of the five stages of a custom website build"
            desc="A rail runs through five stations: agree what the site is for; scope, price and schedule in writing; design in the browser; build and wire it up; launch, hand over and stay on."
            stamp="The five stages · in the order they run"
            caption="The five stages in the order they run. The scope, price and schedule are in writing before stage three; the site is in your own accounts at stage five."
          />
          <StageUnits items={WD_STAGES} className="wd-stages-5" />
        </SmartSection>

        {/* U7 · S5 cost: the answer is a visible table with no figures; the mid-page CTA (magnet 1 of 2) sits under it. #cost is an open unit. */}
        <SmartSection id={U.cost.id} tone="surface" grid labelledBy="h-cost">
          <SmartUnit className="sf-c5" headingId="h-cost" title={U.cost.title} lede={U.cost.lede} leadIn={U.cost.leadIn} lead={U.cost.lead}>
            <GoDeeper label={U.cost.deep!}>
              <p className="sf-rule">The proposal lists the pages and layouts, the integrations, the content we need from you and the dates, with the price against that list. If the number is wrong for you, we say what we would cut to get there.</p>
              <p>After signing, the two things that move a quote are content that has not been written and feedback that sits unanswered, so both carry dates in the schedule.</p>
              <p><Link className="sf-link" to="/services/website-cost">How much does a website cost?</Link></p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c7">
            <table className="wd-table">
              <caption className="sr-only">What sets the price of a website, and what we ask you for each</caption>
              <thead><tr><th scope="col">What sets the price</th><th scope="col">What it changes</th><th scope="col">What we ask you</th></tr></thead>
              <tbody>
                {COST_DRIVERS.map((r) => (
                  <tr key={r.driver}><th scope="row">{r.driver}</th><td>{r.changes}</td><td>{r.ask}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sf-c12 wd-cta-row">
            <SfButton to={CONTACT} magnet cta="cost">Start a project</SfButton>
            <a className="sf-link" href={NAP.phone.href}>Call {NAP.phone.display}</a>
          </div>
        </SmartSection>

        {/* U8 · builder versus custom: the six-row table, the builder's wins stated. */}
        <SmartSection id={U.builder.id} grid labelledBy="h-builder">
          <SmartUnit className="sf-c12" headingId="h-builder" title={U.builder.title} lede={U.builder.lede} leadIn={U.builder.leadIn} lead={U.builder.lead}>
            <GoDeeper label={U.builder.deep!}>
              <p className="sf-rule">If you need a handful of pages, you are happy to lay them out yourself, and nothing has to connect to another system, a builder gets you online this week for a monthly fee, and that is a sensible answer. It stops working when you want something the template cannot do, when the site has to integrate with software you already run, when performance starts costing you visitors, or when the monthly fee never ends and the site cannot move off the platform. A built site costs more once and then it is yours.</p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c12">
            <table className="wd-table wd-compare">
              <caption className="sr-only">Squarespace, Wix or WordPress compared with a custom-coded site, six rows</caption>
              <thead><tr><th scope="col">Compared on</th><th scope="col">Builder</th><th scope="col">Custom</th></tr></thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row}>
                    <th scope="row">{r.row}</th>
                    <td>{r.builder}{r.builderWins && <span className="wd-chip">Builder wins</span>}</td>
                    <td className="ours">{r.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SmartSection>

        {/* U9 · accessibility: the plate draws its three checks; the law in Go deeper as facts; sources as text in the pop-up. */}
        <SmartSection id={U.a11y.id} tone="surface" grid labelledBy="h-a11y">
          <AccessibilityPlate className="sf-c5" />
          <SmartUnit className="sf-c7" headingId="h-a11y" title={U.a11y.title} lede={U.a11y.lede} leadIn={U.a11y.leadIn} lead={U.a11y.lead} points={U.a11y.points}>
            <GoDeeper label={U.a11y.deep!}>
              <h3>Do websites have to be ADA compliant?</h3>
              <p className="sf-rule">For state and local governments, yes: the Department of Justice's 2024 rule under Title II adopts WCAG 2.1 AA, with compliance dates of 26 April 2027 for entities of 50,000 people or more and 26 April 2028 for smaller entities and special districts, after the Interim Final Rule published on 20 April 2026. For private businesses the Department of Justice has no regulation setting out detailed standards and calls WCAG helpful guidance (its web guidance of 18 March 2022). Ask counsel about your own obligations; we build to WCAG 2.1 AA either way.</p>
              <h3>How we test accessibility</h3>
              <p>Press Tab now: the ring you see is the one in the figure. Every build runs the automated rules an auditor runs, then a keyboard pass for what no rule catches: order, focus, names, and text contrast at 4.5:1 or better.</p>
              <div className="sf-links"><Verify id="wcag">Sources: WCAG 2.1 and the DOJ rules</Verify></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* U10 · after launch: three H3 rows light their node on the handover plate. */}
        <SmartSection id={U.after.id} grid labelledBy="h-after">
          <SmartUnit className="sf-c5" headingId="h-after" title={U.after.title} lede={U.after.lede} leadIn={U.after.leadIn} lead={U.after.lead} measure={false}>
            <ul className="wd-rows">
              {AFTER_ROWS.map((r) => (
                <li key={r.title} data-hl-for="fig5" data-hl-key={r.hl}>
                  <h3 className="sf-h4">{r.title}</h3>
                  <p>{r.line}</p>
                </li>
              ))}
            </ul>
            <GoDeeper label={U.after.deep!}>
              <p className="sf-rule">At handover you hold the repository, the domain and its DNS, the hosting account and the written notes another developer would need. HTTPS and the security headers are set at launch; this site runs the same way.</p>
              <p>Support after launch is scoped in the written proposal, project by project: there is no standard plan, so no standard price, response time or term is printed here. Updates, content changes and the checks after a browser or platform change are agreed the same way.</p>
            </GoDeeper>
          </SmartUnit>
          <HandoverPlate className="sf-c7" />
        </SmartSection>

        {/* U11 · the handover ledger beside the unit (a figure, not the unit's bullet slot). #ownership is linked from the local pages. */}
        <SmartSection id={U.own.id} tone="surface" grid labelledBy="h-own">
          <ul className="sf-c7 wd-ledger" aria-label="What transfers to you">
            {HANDOVER.map((r, i) => (
              <LedgerRule as="li" key={r.k} className="wd-lrow" delay={i * 0.08}>
                <span className="sf-mono">{r.k}</span>
                <p>{r.text}</p>
              </LedgerRule>
            ))}
          </ul>
          <SmartUnit className="sf-c5" headingId="h-own" title={U.own.title} lede={U.own.lede} leadIn={U.own.leadIn} lead={U.own.lead} measure={false}>
            <GoDeeper label={U.own.deep!}>
              <h3>Platforms we build on</h3>
              <p className="sf-rule">HTML, CSS and TypeScript, and three.js where a 3D configurator earns it. Stores run on the platform that fits the business: The Gorband is on Square; Atlas Peptides checks out through Stripe.</p>
              <h3>What transfers to you</h3>
              <p>“Written so another developer can pick it up” means a README, the build scripts and the deploy steps in the repository, no proprietary builder in the chain, and nothing that stops working when we are not in the room.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* U12 · S4 the road after launch, across the full width; each stop links its owner service page. */}
        <SmartSection id={U.found.id} tone="night" labelledBy="h-found">
          <SmartUnit className="sf-c12" headingId="h-found" title={U.found.title} lede={U.found.lede} leadIn={U.found.leadIn} lead={U.found.lead} />
          <FoundRoad />
        </SmartSection>

        {/* U13 + U14 abreast. #industries is the 301 target of the old sector page. */}
        <SmartSection id={U.who.id} grid labelledBy="h-who">
          <SmartUnit className="sf-c6" headingId="h-who" title={U.who.title} lede={U.who.lede} leadIn={U.who.leadIn} lead={U.who.lead} measure={false}>
            <ul className="wd-linkrows">
              <li>
                <h3 className="sf-h4">Website development by industry</h3>
                <div className="sf-links">{SECTOR_LINKS.map((l) => <Link key={l.to} className="sf-link" to={l.to}>{l.label}</Link>)}</div>
              </li>
              <li>
                <h3 className="sf-h4">Web design for Philadelphia and Chester County</h3>
                <div className="sf-links">{LOCAL_LINKS.map((l) => <Link key={l.to} className="sf-link" to={l.to}>{l.label}</Link>)}</div>
              </li>
              <li>
                <h3 className="sf-h4">Where we work: web design by state</h3>
                <div className="sf-links">{PLACE_STATES.map((p) => <Link key={p.path} className="sf-link" to={p.path}>{p.name}</Link>)}</div>
              </li>
              <li>
                <h3 className="sf-h4">Where we work: the largest metros</h3>
                <div className="sf-links">{PLACE_METROS.map((p) => <Link key={p.path} className="sf-link" to={p.path}>{p.name}</Link>)}</div>
              </li>
            </ul>
            <GoDeeper label={U.who.deep!}>
              <p className="sf-rule">Construction: the owner-facing project pages and whatever sits behind a login, and whether either can read from the systems that hold the job data. Manufacturing: product and specification catalogues that stay in step with the system of record instead of being retyped into a CMS. E-commerce: the surrounding pages, the joins to stock and support, and a checkout that is not the slow part. Government and the public sector: Section 508 and WCAG conformance become the acceptance criteria, which is how we build anyway.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit className="sf-c6" headingId="h-choose" id={U.choose.id} delay={0.08} title={U.choose.title} lede={U.choose.lede} leadIn={U.choose.leadIn} lead={U.choose.lead} points={U.choose.points} measure={false}>
            <GoDeeper label={U.choose.deep!}>
              <p className="sf-rule">The scope: pages and layouts, integrations, the content you supply, and the dates. The price against that scope. Ownership: the repository, the domain and the hosting account in your name, named in the proposal. The standards: WCAG 2.1 AA and the performance budget, and how both are checked before launch. Support: what happens after launch, and on what terms. A firm that will not write these down is asking you to take its word.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* U15 · the company you can check: the rating readout with its source + Verify, the three reviews, the NAP band, the region plate. "Who leads website work" is GATED. */}
        <SmartSection id={U.check.id} tone="surface" grid labelledBy="h-check">
          <SmartUnit className="sf-c7" headingId="h-check" title={U.check.title} lede={U.check.lede} leadIn={U.check.leadIn} lead={U.check.lead} measure={false}>
            <div className="sf-readouts wd-readouts">
              <div className="sf-readout">
                <span className="sf-readout-num">{GOOGLE_LISTING.rating}</span>
                <p className="sf-readout-lab">Google rating</p>
                <p className="sf-readout-src sf-mono">{GOOGLE_LISTING.reviews} Google reviews · read {READ_LISTING} · <Verify id="google-listing" /></p>
              </div>
            </div>
            <div className="sf-links wd-review-row">
              {WORK.filter((w) => w.review).map((w) => (
                <button key={w.slug} type="button" className="sf-verify" data-evidence={reviewId(w)} aria-haspopup="dialog">
                  <span aria-hidden="true" className="wd-stars">★★★★★</span>&nbsp;{w.review!.author}’s review of us
                </button>
              ))}
            </div>
            <address className="wd-nap">
              <h3 className="sf-h4">Where we are</h3>
              <p>{NAP.name} · {NAP.l1}, {NAP.l2}</p>
              <p><a href={NAP.phone.href}>{NAP.phone.display}</a> · {NAP.hours}</p>
              <p className="sf-mono">{NAP.counties.join(" · ")}</p>
              <p className="sf-mono">Founded {GOOGLE_LISTING.founded} · PA entity {FOUNDED.paEntity} · <Verify id="founded" /></p>
              <p>{NAP.travel}</p>
            </address>
            <p className="sf-mono wd-updated">Updated {PAGE_UPDATED_LABEL}</p>
            <GoDeeper label={U.check.deep!}>
              <p className="sf-rule">Open our Google listing ({GOOGLE_LISTING.name}) and read the six reviews; three are from Dennis, Lou and Sean, whose sites are on this page. Open the sites themselves from the windows above. Read the case studies, by Louis Rubino, for the figures and their sources.</p>
              <div className="sf-links">{CHECK_POSTS.map((p) => <Link key={p.to} className="sf-link" to={p.to}>{p.label}</Link>)}</div>
            </GoDeeper>
          </SmartUnit>
          <RegionPlate className="sf-c5" counties={NAP.counties} office={{ l1: NAP.l1, l2: NAP.l2 }} />
        </SmartSection>

        {/* U16 · S6 the FAQ on the local pages' layout (heading + phone left, accordion right): nine APG items, answers in the HTML. */}
        <SmartSection id={U.faq.id} grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">{U.faq.title}</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={NAP.phone.href} data-cta="faq">{NAP.phone.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><WdFaq items={WD_FAQ} /></div>
        </SmartSection>

        {/* U17 · S7 the desk: the one primary action (magnet 2 of 2), the phone, no form. */}
        <DeskCTA form={DESK.form} heading={U.desk.title} lede={U.desk.lede} covers={DESK.covers} coversLabel={DESK.coversLabel} next={DESK.next} hcLink={false} />

        {/* The in-page preview of a live site (WorkCarousel's dialog); Esc returns focus to the Preview button. */}
        {open && <Preview item={open.item} onClose={close} opener={open.opener} />}

        {/* Proof pop-ups (structure-spec.md §5): one <dialog> per id, content in the HTML. */}
        {WORK.filter((w) => w.review).map((w) => {
          const r = REVIEWS[w.slug];
          return (
            <EvidenceDialog
              key={w.slug}
              id={reviewId(w)!}
              title={`${r.author}’s review of OneAlgorithm on Google`}
              intro={r.text ? `Five stars on OneAlgorithm's Google listing, quoted as posted. Read ${READ_LISTING}.` : `Five stars on OneAlgorithm's Google listing; the review text is on Google, behind the link below. Read ${READ_LISTING}.`}
              rows={[
                { th: "Reviewer", td: r.authorLine },
                { th: "Rating", td: "5 of 5" },
                ...(r.disclosure ? [{ th: "Disclosure", td: r.disclosure }] : []),
                ...(r.textNote ? [{ th: "Note", td: r.textNote }] : []),
                { th: "Source", td: "maps.google.com, OneAlgorithm Consulting, Malvern, PA" },
              ]}
              external={{ href: r.url, label: "Open on Google (new tab)" }}
            >
              {r.text && <blockquote><p>“{r.text}”</p></blockquote>}
            </EvidenceDialog>
          );
        })}
        <EvidenceDialog id="hero-build" title="How the hero on this page was built" intro="What the animation at the top of this page is, in this page's own terms." rows={HERO_BUILD_ROWS} />
        <EvidenceDialog
          id="phantom-configurator"
          title="The Phantom Arcades configurator"
          intro="What our case study states, with the source it names. Figures are the site's own analytics for the period given."
          rows={PHANTOM_CONFIGURATOR.rows}
          primary={{ href: PHANTOM_CONFIGURATOR.post, label: "Read the case study" }}
        />
        <EvidenceDialog
          id="phantom-redesign"
          title="Phantom Arcades: the redesign, measured"
          intro="Search figures after the redesign, as published in our case study with Google Search Console as the source. One client, one window; no revenue claim is made."
          rows={PHANTOM_REDESIGN.rows}
          primary={{ href: PHANTOM_REDESIGN.post, label: "Read the case study" }}
        />
        <SourcesDialog
          id="wcag"
          title="WCAG 2.1 and the ADA rules: sources"
          intro="The standard we build to and the two Department of Justice documents the answer above relies on, as text with the date a person at OneAlgorithm read them."
          sources={WCAG_SOURCES}
        />
        <EvidenceDialog
          id="google-listing"
          title="OneAlgorithm's Google listing"
          intro="What Google's Places record for our listing said when a person at OneAlgorithm read it. We quote the figures; we do not mark them up as a rating."
          rows={[
            { th: "Listing", td: GOOGLE_LISTING.name },
            { th: "Rating", td: GOOGLE_LISTING.rating },
            { th: "Reviews", td: GOOGLE_LISTING.reviews },
            { th: "Place id", td: GOOGLE_LISTING.placeId },
            { th: "Read on", td: GOOGLE_LISTING.read },
            { th: "Source", td: "maps.google.com" },
          ]}
          external={{ href: GOOGLE_LISTING.mapUrl, label: "Open on Google (new tab)" }}
        />
        <EvidenceDialog
          id="founded"
          title="Founded in 2020"
          intro="The company record behind the year on the page."
          rows={[
            { th: "Legal name", td: FOUNDED.legalName },
            { th: "Pennsylvania entity", td: FOUNDED.paEntity },
            { th: "Formed", td: FOUNDED.formed },
            { th: "Source", td: FOUNDED.source },
          ]}
        />
      </SfPage>
    </Layout>
  );
}

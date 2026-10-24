import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SfButton, SmartSection, SmartUnit, LedgerRule, GoDeeper, DeskCTA, StageRail, SourcesDialog, EvidenceDialog, Verify, type Tone,
} from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { SiteWindow, DemoSheet, BuildStage, HandoverPlate, AccessibilityPlate, RegionPlate } from "../../components/wd";
import { WdFaq } from "../../components/wd/WdFaq";
import { Preview } from "../../components/WorkCarousel";
import { WORK, type WorkItem } from "../work";
import { NAP, COUNTIES, LISTING, STAGES } from "../wd-local/shared";
import { SITE, SEMRUSH, TRENDS } from "./shared";
import type { ServicePageData, ServiceSection, ServiceUnitCopy, ServiceCard, PlateKind, ServiceTable } from "./types";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createLocalBusinessSchema } from "../../components/StructuredData";
import "../../styles/wd.css";
import "../../components/wd/local.css";

/*
 * THE SERVICE-PAGE TEMPLATE for /services/website-cost, /services/small-business-website-design and
 * /services/website-redesign (build-wave12; owner bar 2026-10-24 14:05: >= 1,200 words, >= 10 units, >= 8 FAQ, staged
 * pictures with alt text, per-page OG image, full schema). Same family as LocalPage.tsx (hub look, no pin, no build
 * stage): text-led hero whose H1 and lede are the LCP and never animate, Smart Brevity units, the wd kit's plates as
 * the pictures, the live-site windows where the page has sites to show, readouts for search demand with the source
 * in a pop-up, the NAP band, the APG FAQ, the desk.
 *
 * ⛔ Every proof action opens an in-site <dialog>; the only off-site anchors are the client domains in the windows.
 * ⛔ One CTA: a button to /contact?need=website&topic=…&from=… (contactHref), plus tel: links. No form, no chat.
 * ⛔ Schema mirrors what is visible: BreadcrumbList (SfPage), LocalBusiness (NAP band shown), Service (areaServed US),
 *    WebPage (dateModified = the visible "Updated" line). FAQPage only when the section asks for it.
 * integrate: this file belongs in client/components/wd/; it sits in data/wd-service because of the wave's ownership split.
 */

const ogFor = (path: string) => ({ url: `${SITE}/og/services/${path.split("/").pop()}.jpg`, width: 1200, height: 630 });
const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const BY_SLUG = Object.fromEntries(WORK.map((w) => [w.slug, w])) as Record<string, WorkItem>;

/** "[label](/path)" inside copy → an in-site router link (or an in-page anchor). */
function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    out.push(text.slice(last, m.index));
    out.push(m[2].startsWith("#") ? <a key={m.index} className="sf-link" href={m[2]}>{m[1]}</a> : <Link key={m.index} className="sf-link" to={m[2]}>{m[1]}</Link>);
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

function Deeper({ d }: { d: ServiceUnitCopy["deeper"] }) {
  if (!d) return null;
  return (
    <GoDeeper label={d.label}>
      {d.paras.map((p, i) => <p key={i} className={i === 0 ? "sf-rule" : undefined}><Rich text={p} /></p>)}
    </GoDeeper>
  );
}

/** The unit every section opens with: H2, lede, lead-in, points, verify line, links, Go deeper. */
function Unit({ s, className, children }: { s: ServiceUnitCopy; className: string; children?: React.ReactNode }) {
  return (
    <SmartUnit className={className} headingId={`h-${s.id}`} title={s.h2} lede={s.lede} leadIn={s.leadIn} lead={s.lead} points={s.points} measure={false}>
      {s.verify && <p className="sf-mono wd-verify-line">{s.verify.line} · <Verify id={s.verify.id}>{s.verify.label}</Verify></p>}
      {children}
      {s.links && s.links.length > 0 && (
        <div className="sf-links" style={{ marginTop: 16 }}>
          {s.links.map((l) => l.to.startsWith("#") ? <a key={l.to} className="sf-link" href={l.to}>{l.label}</a> : <Link key={l.to} className="sf-link" to={l.to}>{l.label}</Link>)}
        </div>
      )}
      <Deeper d={s.deeper} />
    </SmartUnit>
  );
}

function Cards({ cards }: { cards: ServiceCard[] }) {
  return (
    <ol className="wd-local-cards">
      {cards.map((c, i) => (
        <LedgerRule as="li" key={c.h3} delay={i * 0.08}>
          <h3 className="sf-h3">{c.h3}</h3>
          <p data-lede=""><Rich text={c.line} /></p>
        </LedgerRule>
      ))}
    </ol>
  );
}

function Table({ t }: { t: ServiceTable }) {
  return (
    <table className="wd-table wd-local-table">
      <caption className="sr-only">{t.caption}</caption>
      <thead><tr>{t.cols.map((c, i) => <th scope="col" key={i}>{c}</th>)}</tr></thead>
      <tbody>{t.rows.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
    </table>
  );
}

/* FIG. the redirect map: six old addresses on the left, their new pages on the right, a 301 on every line. Staged
   sample addresses, labelled DEMO; the one plate this template adds to the kit (integrate: components/wd/RedirectPlate.tsx). */
const OLD = ["/services.html", "/about-us.php", "/gallery/old-site", "/contact.htm", "/blog?p=12", "/page2.html"];
const NEW = ["/services", "/about", "/work", "/contact", "/blog/first-post", "/services/repairs"];
function RedirectPlate({ fig, className = "", caption }: { fig: number; className?: string; caption: string }) {
  const id = `fig${fig}`;
  const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace" };
  return (
    <figure className={`sf-stage sf-sweep wd-plate wd-redirect ${className}`} id={id} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <svg viewBox="0 0 610 300" role="img" aria-labelledby={`${id}-t ${id}-d`} style={{ aspectRatio: "610/300" }}>
          <title id={`${id}-t`}>Diagram of a redirect map for a website redesign, sample addresses</title>
          <desc id={`${id}-d`}>Six old addresses in a column on the left, six new addresses on the right, each pair joined by a line marked 301; a footer reads every old address answers.</desc>
          <text x="40" y="34" fontFamily={F.mono} fontSize="10" fill="var(--ink3)" letterSpacing=".12em">OLD SITE · CRAWLED</text>
          <text x="570" y="34" textAnchor="end" fontFamily={F.mono} fontSize="10" fill="var(--ink3)" letterSpacing=".12em">NEW SITE · MAPPED</text>
          {OLD.map((o, i) => {
            const y = 64 + i * 34;
            return (
              <g key={o} fontFamily={F.mono}>
                <rect x="40" y={y - 16} width="190" height="24" fill="var(--surface)" stroke="var(--hair-s)" />
                <text className="type-in" style={{ ["--d" as string]: `${i * 0.08}s` } as React.CSSProperties} x="50" y={y} fontSize="11.5" fill="var(--ink)">{o}</text>
                <path className="draw" style={{ ["--d" as string]: `${0.2 + i * 0.1}s` } as React.CSSProperties} d={`M232 ${y - 4} H378`} fill="none" stroke="var(--orange)" strokeWidth="2" pathLength="1" />
                <g className="stamp-in" style={{ ["--d" as string]: `${0.6 + i * 0.1}s` } as React.CSSProperties}>
                  <rect x="289" y={y - 15} width="32" height="20" fill="var(--tint)" stroke="var(--navy)" />
                  <text x="305" y={y - 1} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--navy)">301</text>
                </g>
                <rect x="380" y={y - 16} width="190" height="24" fill="var(--surface)" stroke="var(--navy)" strokeWidth="1.5" />
                <text className="type-in" style={{ ["--d" as string]: `${0.3 + i * 0.08}s` } as React.CSSProperties} x="390" y={y} fontSize="11.5" fill="var(--ink)">{NEW[i]}</text>
              </g>
            );
          })}
          <path d="M40 272 H570" stroke="var(--hair-s)" strokeWidth="1" />
          <text x="40" y="290" fontFamily={F.mono} fontSize="10" fill="var(--orange-text)" letterSpacing=".12em">EVERY OLD ADDRESS ANSWERS · TESTED BEFORE LAUNCH</text>
          <text x="570" y="290" textAnchor="end" fontFamily={F.mono} fontSize="10" fill="var(--ink3)" letterSpacing=".12em">DEMO</text>
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Redirect map · sample addresses</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

/** One finished demo frame from the build stage (restaurant 0 · roofer 1 · dentist 2) framed as a figure. */
function DemoFrame({ scene, fig, className = "", caption }: { scene: 0 | 1 | 2; fig: number; className?: string; caption: string }) {
  const id = `fig${fig}`;
  const kinds = ["restaurant", "roofer", "dentist"];
  return (
    <figure className={`sf-stage sf-sweep wd-sheet ${className}`} id={id} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <div className="wd-cut" aria-hidden="true" style={{ background: "var(--night)", padding: "6%" }}><BuildStage finished scene={scene} /></div>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · Demo {kinds[scene]} site · not client work</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

function Plate({ kind, fig, className, caption }: { kind: PlateKind; fig: number; className: string; caption?: string }) {
  switch (kind) {
    case "sheet": return <DemoSheet fig={fig} className={className} caption={caption ?? "The same blank page, three demo businesses: full-bleed, split, centred. Every layout is designed once; what sets the price is how many a site needs. Nothing here is client work."} />;
    case "handover": return <HandoverPlate fig={fig} className={className} caption={caption} />;
    case "a11y": return <AccessibilityPlate fig={fig} className={className} caption={caption} />;
    case "redirect": return <RedirectPlate fig={fig} className={className} caption={caption ?? "A redirect map, with sample addresses: every address the old site had is crawled, mapped one to one to its new page and answered with a 301 before launch."} />;
    case "build-restaurant": return <DemoFrame scene={0} fig={fig} className={className} caption={caption ?? "A demo restaurant site built from a blank page: menu, hours, a booking button. Nothing here is client work."} />;
    case "build-roofer": return <DemoFrame scene={1} fig={fig} className={className} caption={caption ?? "A demo roofing contractor site built from a blank page: services, service area, a quote form and the phone one tap away. Nothing here is client work."} />;
    case "build-dentist": return <DemoFrame scene={2} fig={fig} className={className} caption={caption ?? "A demo dental practice site built from a blank page: services, the team, online booking. Nothing here is client work."} />;
  }
}

/** Contact band in <main>: the one NAP, the listing figures with Verify, the visible Updated line. */
function NapBand({ updated }: { updated: string }) {
  return (
    <address className="wd-nap">
      <span className="wd-nap-name">{NAP.name}</span>
      <span>{NAP.l1}, {NAP.l2}</span>
      <a className="sf-phone" href={NAP.phone.href} data-cta="nap">{NAP.phone.display}</a>
      <span className="sf-mono">{NAP.hours}</span>
      <span className="sf-mono wd-nap-row">
        Google Business Profile: {LISTING.rating} from {LISTING.reviews} reviews, read {LISTING.readShort} <Verify id="listing">Verify</Verify>
      </span>
      <span className="sf-mono">Updated {updated}</span>
    </address>
  );
}

const fmtNum = (n: number) => n.toLocaleString("en-US");

function Block({ s, page, tone, fig, onPreview }: { s: ServiceSection; page: ServicePageData; tone: Tone; fig: number; onPreview: (item: WorkItem, opener: HTMLElement) => void }) {
  const cta = contactHref(`Website · ${page.name}`, page.path, "website");
  switch (s.kind) {
    case "text":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className={s.figure || s.table ? "sf-c5" : s.cards ? "sf-c5" : "sf-c7"} />
          {(s.cards || s.table) && (
            <div className="sf-c7">
              {s.cards && <Cards cards={s.cards} />}
              {s.table && <Table t={s.table} />}
            </div>
          )}
          {s.figure && <Plate kind={s.figure} fig={fig} className="sf-c7" caption={s.figureCaption} />}
          {s.cta && (
            <div className="sf-c12 wd-cta-row">
              <SfButton to={cta} magnet cta={s.id}>Start a project</SfButton>
              <a className="sf-link" href={NAP.phone.href}>Call {NAP.phone.display}</a>
            </div>
          )}
        </SmartSection>
      );
    case "windows": {
      const items = s.slugs.map((k) => BY_SLUG[k]).filter(Boolean);
      const three = items.length === 3;
      return (
        <SmartSection id={s.id} tone="night" grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className={three ? "sf-c5" : "sf-c7"} />
          <div className={three ? "sf-c7 wd-windows-3" : "sf-c12 wd-windows-6"}>
            {items.map((w) => <SiteWindow key={w.slug} item={w} screen={s.screen} size={three ? "third" : "grid"} sweep onPreview={onPreview} />)}
          </div>
        </SmartSection>
      );
    }
    case "process":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c7" />
          <StageRail
            fig={fig}
            stations={STAGES}
            className="sf-c12 sf-rail-top"
            title={`Diagram of the five stages of a website project: ${page.name.toLowerCase()}`}
            desc="A rail runs through five stations: agree what the site is for; scope, price and schedule in writing; design in the browser; build and wire it up; launch, hand over and stay on."
            stamp="The five stages · in the order they run"
            caption="The five stages in order; the written scope, price and schedule come at stage two, and the site is in your own accounts at stage five."
          />
          <ol className="sf-c12 wd-stages5">
            {STAGES.map((st) => (
              <LedgerRule as="li" key={st.k} data-station={st.k}>
                <span className="sf-num" aria-hidden="true">{st.num}</span>
                <h3 className="sf-h3">{st.title}</h3>
                <p data-lede="">{st.line}</p>
              </LedgerRule>
            ))}
          </ol>
        </SmartSection>
      );
    case "demand":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c12">
            <div className="sf-readouts wd-readouts" style={{ marginTop: 28 }}>
              {s.rows.map((r, i) => (
                <div className="sf-readout" key={r.phrase}>
                  <span className="sf-readout-num" data-count={r.volume}>{fmtNum(r.volume)}</span>
                  <p className="sf-readout-lab">{r.label ?? <>“{r.phrase}”, searches a month</>}</p>
                  <p className="sf-readout-src sf-mono">
                    {r.src ?? <>{r.cpc != null ? `CPC ${r.cpc.toFixed(2)} USD · ` : ""}{SEMRUSH.line}</>}
                    {i === 0 && <> · <Verify id="demand-src">Where these figures come from</Verify></>}
                  </p>
                </div>
              ))}
            </div>
          </Unit>
        </SmartSection>
      );
    case "office":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <SmartUnit className="sf-c7" headingId={`h-${s.id}`} title={s.h2} lede={s.lede} leadIn={s.leadIn} lead={s.lead} measure={false}>
            <NapBand updated={fmtDate(page.seo.dateModified)} />
            <h3 className="sf-h3" style={{ marginTop: 32 }}>{s.question.q}</h3>
            <p style={{ marginTop: 8 }}><Rich text={s.question.a} /></p>
            {s.links && (
              <div className="sf-links" style={{ marginTop: 16 }}>
                {s.links.map((l) => <Link key={l.to} className="sf-link" to={l.to}>{l.label}</Link>)}
              </div>
            )}
            <Deeper d={s.deeper} />
          </SmartUnit>
          <RegionPlate className="sf-c5" fig={fig} counties={COUNTIES} office={{ l1: NAP.l1, l2: NAP.l2 }} note="Remote delivery nationwide" caption="Schematic of the six counties in our Business Profile, office marked; the street address is in the contact band. Website work runs remotely for businesses anywhere in the United States." />
        </SmartSection>
      );
    case "faq":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <div className="sf-c4">
            <h2 className="sf-h2" id={`h-${s.id}`}>{s.h2}</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={NAP.phone.href} data-cta="faq">{NAP.phone.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><WdFaq items={s.items} schema={!!s.schema} /></div>
        </SmartSection>
      );
    case "routes":
      return (
        <SmartSection id={s.id} tone={tone} heading={{ id: `h-${s.id}`, title: s.h2, lede: s.lede }}>
          <div className="sf-ledger">
            {s.items.map((r) => (
              <Link key={r.to} className="sf-lrow" to={r.to}>
                <h3 className="sf-h4">{r.title}</h3>
                <span className="sf-mono">{r.tag}</span>
              </Link>
            ))}
          </div>
        </SmartSection>
      );
  }
}

export function ServicePage({ page }: { page: ServicePageData }) {
  const url = `${SITE}${page.path}`;
  const OG = ogFor(page.path);
  const [open, setOpen] = React.useState<{ item: WorkItem; opener: HTMLElement } | null>(null);
  const onPreview = React.useCallback((item: WorkItem, opener: HTMLElement) => setOpen({ item, opener }), []);
  const close = React.useCallback(() => setOpen(null), []);
  const cta = contactHref(`Website · ${page.name}`, page.path, "website");
  const hasTrends = page.sections.some((s) => s.kind === "demand" && s.rows.some((r) => r.src?.includes("Trends")));

  useSEO({
    title: page.seo.title,
    description: page.seo.description,
    canonical: getCanonicalUrl(page.path),
    ogTitle: page.seo.title,
    ogDescription: page.seo.description,
    ogUrl: getCanonicalUrl(page.path),
    ogImage: OG.url,
    ogImageSize: [OG.width, OG.height],
    ogImageAlt: page.seo.ogAlt,
    twitterTitle: page.seo.title,
    twitterDescription: page.seo.description,
    twitterImage: OG.url,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  // LocalBusiness mirrors the NAP band: no email or priceRange (neither is shown), hasMap = the Business Profile.
  const lb: Record<string, unknown> = { ...createLocalBusinessSchema("LocalBusiness"), hasMap: NAP.map };
  delete lb.email;
  delete lb.priceRange;
  lb.sameAs = [...(lb.sameAs as string[]), NAP.map];
  const service = {
    "@context": "https://schema.org", "@type": "Service", name: page.service.name, serviceType: "Website design and development",
    description: page.service.description, url, provider: { "@id": `${SITE}/#org` }, areaServed: { "@type": "Country", name: "United States" },
    image: OG.url,
  };
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", url, name: page.seo.title, description: page.seo.description,
    dateModified: page.seo.dateModified, publisher: { "@id": `${SITE}/#org` }, isPartOf: { "@id": `${SITE}/#website` },
    primaryImageOfPage: { "@type": "ImageObject", url: OG.url, width: OG.width, height: OG.height },
  };

  let alt = 0; // sections alternate surface / paper down the page; the windows band is always night
  let fig = page.hero.figure ? 1 : 0;
  return (
    <Layout>
      <StructuredData data={lb} />
      <StructuredData data={service} />
      <StructuredData data={webPage} />

      <SfPage crumbs={[{ label: "Website development", to: "/services/website-development" }, { label: page.name }]} className="wd wd-local wd-service">
        <div className="wd-progress" aria-hidden="true" />

        <section className="sf-hero sf-hero-wide" aria-labelledby="h1">
          <div className="sf-wrap sf-grid">
            <div className="sf-hero-text" style={page.hero.figure ? { alignSelf: "start" } : undefined}>
              <p className="sf-kicker">{page.hero.kicker}</p>
              <h1 className="sf-h1" id="h1">{page.hero.h1}</h1>
              <p className="sf-lede sf-measure" data-lede="">{page.hero.lede}</p>
              <div className="sf-ctas">
                <SfButton to={cta} magnet cta="hero">Start a project</SfButton>
                <a className="sf-phone" href={NAP.phone.href} data-cta="hero">Call {NAP.phone.display}</a>
              </div>
            </div>
            {page.hero.figure && <Plate kind={page.hero.figure} fig={1} className="sf-hero-fig" caption={page.hero.figureCaption} />}
          </div>
        </section>

        {page.sections.map((s) => {
          const tone: Tone = s.kind === "windows" ? "night" : alt++ % 2 === 0 ? "surface" : "paper";
          const needsFig = (s.kind === "text" && !!s.figure) || s.kind === "process" || s.kind === "office";
          const n = needsFig ? ++fig : fig;
          return <Block key={s.id} s={s} page={page} tone={tone} fig={n} onPreview={onPreview} />;
        })}

        <DeskCTA
          form={{ need: "website", topic: page.desk.topic, topicLabel: `Website · ${page.name}`, heading: "Start a project", prompt: page.desk.prompt, submitLabel: "Start a project" }}
          heading={page.desk.h2}
          lede={page.desk.lede}
          covers={page.desk.covers}
          coversLabel="What to have ready"
          next={["Send it on the contact page, or call the office.", "A person at OneAlgorithm reads it and replies.", "If it fits, the written scope, price and schedule follow."]}
          hcLink={false}
        />

        <SourcesDialog
          id="demand-src"
          intro="Every search figure on this page is a third-party measurement of what people type into Google, named with its source and the date a person at OneAlgorithm read it. None of it is a price for our work, and nothing on the page links to a data endpoint."
          sources={[{ name: SEMRUSH.name, what: SEMRUSH.what, read: SEMRUSH.read, page: SEMRUSH.page }, ...(hasTrends ? [{ name: TRENDS.name, what: TRENDS.what, read: TRENDS.read, page: TRENDS.page }] : [])]}
        />
        <EvidenceDialog
          id="listing"
          title="Our Google Business Profile figures"
          intro="What our Google listing showed when a person at OneAlgorithm read it. We quote the figures; the reviews are not marked up as ratings on this page."
          rows={[
            { th: "Listing", td: LISTING.name },
            { th: "Rating", td: `${LISTING.rating} from ${LISTING.reviews} reviews` },
            { th: "Place id", td: LISTING.placeId },
            { th: "Read on", td: LISTING.read },
            { th: "Map link", td: NAP.map.replace(/^https:\/\//, "") },
          ]}
        />
        {page.dialogs?.map((d) => <EvidenceDialog key={d.id} id={d.id} title={d.title} intro={d.intro} rows={d.rows} primary={d.primary} />)}
        {open && <Preview item={open.item} onClose={close} opener={open.opener} />}
      </SfPage>
    </Layout>
  );
}

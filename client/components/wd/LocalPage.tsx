import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import {
  SfPage, SfButton, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeskCTA, StageRail, SourcesDialog,
  EvidenceDialog, Verify, type Readout, type Tone,
} from "../sf";
import { contactHref } from "../sf/DeskCTA";
import { SiteWindow } from "./SiteWindow";
import { RegionPlate } from "./RegionPlate";
import { LocalFaq } from "./LocalFaq";
import { Preview } from "../WorkCarousel";
import { WORK, type WorkItem } from "../../data/work";
import { NAP, COUNTIES, LISTING, STAGES, CENSUS_SOURCES } from "../../data/wd-local/shared";
import type { LocalPlace, LocalSection, LocalUnitCopy, LocalCard } from "../../data/wd-local/types";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createLocalBusinessSchema } from "../StructuredData";
import "../../styles/wd.css";
import "./local.css";

/*
 * THE LOCAL WEB-DESIGN TEMPLATE (structure-spec.md §7-§8.1; design-contract-webdev.md "The local pages (shared
 * look)"). One component, one data file per place (client/data/wd-local/*.ts, shape in types.ts):
 *
 *   export default function WebDesignPhiladelphia() { return <LocalPage place={PHILADELPHIA} />; }
 *
 * Look: the hub's family (SfPage .wd scope, ledger rules, orange wire, the six live-site windows, the five-station
 * rail, readouts, the region plate, the desk), with NO pin and NO build stage: one signature scene per site keeps
 * the hub the showcase and the local chunks small. Text-led hero; the H1 and lede are the LCP and never animate.
 * Reduced motion = the finished page (every moving rule in sf.css / wd.css is gated; readouts carry final values).
 *
 * ⛔ Every proof action opens an in-site <dialog> (Verify → EvidenceDialog / SourcesDialog; Preview → WorkCarousel's
 *    dialog). The only off-site anchors are the client domains (crawlable association, WD-PF-04).
 * ⛔ One CTA: a button to /contact?need=website&topic=…&from=… (contactHref), plus tel: links. No form, no chat.
 * ⛔ Schema mirrors what is visible: LocalBusiness (NAP band + hours shown), Service (areaServed per place), WebPage
 *    (dateModified = the visible "Updated" line), FAQPage (verbatim). Never priceRange, email, AggregateRating.
 */

const SITE = "https://onealgorithm.com";
/* Per-route og:image (SS §10.3): public/og/{last path segment}.jpg, 1200x630, made by build-wave0/og-local.mjs. */
const ogFor = (path: string) => ({ url: `${SITE}/og/${path.split("/").pop()}.jpg`, width: 1200, height: 630 });

const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "[label](/path)" inside copy → an in-site router link. */
function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    out.push(text.slice(last, m.index));
    out.push(<Link key={m.index} className="sf-link" to={m[2]}>{m[1]}</Link>);
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

function Deeper({ d }: { d: LocalUnitCopy["deeper"] }) {
  if (!d) return null;
  return (
    <GoDeeper label={d.label}>
      {d.paras.map((p, i) => <p key={i} className={i === 0 ? "sf-rule" : undefined}><Rich text={p} /></p>)}
    </GoDeeper>
  );
}

/** The unit every section opens with: H2, lede, lead-in, points, Go deeper. */
function Unit({ s, className, children }: { s: LocalUnitCopy; className: string; children?: React.ReactNode }) {
  return (
    <SmartUnit className={className} headingId={`h-${s.id}`} title={s.h2} lede={s.lede} leadIn={s.leadIn} lead={s.lead} points={s.points} measure={false}>
      {children}
      <Deeper d={s.deeper} />
    </SmartUnit>
  );
}

function Cards({ cards }: { cards: LocalCard[] }) {
  return (
    <ol className="wd-local-cards">
      {cards.map((c, i) => (
        <LedgerRule as="li" key={c.h3} delay={i * 0.08}>
          <h3 className="sf-h3">{c.h3}</h3>
          <p data-lede="">{c.line}</p>
        </LedgerRule>
      ))}
    </ol>
  );
}

/** Contact band in <main>: the one NAP (SS §8.1), three of the page's tel links counted here and in hero/FAQ/desk. */
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

function Block({ s, place, tone, onPreview }: { s: LocalSection; place: LocalPlace; tone: Tone; onPreview: (item: WorkItem, opener: HTMLElement) => void }) {
  switch (s.kind) {
    case "intro":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c5" />
          <div className="sf-c7"><Cards cards={s.cards} /></div>
        </SmartSection>
      );
    case "work": {
      const first = s.first ?? [];
      const items = [...WORK.filter((w) => first.includes(w.slug)), ...WORK.filter((w) => !first.includes(w.slug))];
      return (
        <SmartSection id={s.id} tone="night" grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c7" />
          <div className="sf-c12 wd-windows-6">
            {items.map((w) => <SiteWindow key={w.slug} item={w} sweep onPreview={onPreview} />)}
          </div>
        </SmartSection>
      );
    }
    case "text":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c5">
            {s.links && (
              <div className="sf-links" style={{ marginTop: 16 }}>
                {s.links.map((l) => <Link key={l.to} className="sf-link" to={l.to}>{l.label}</Link>)}
              </div>
            )}
          </Unit>
          <div className="sf-c7">
            {s.cards && <Cards cards={s.cards} />}
            {s.table && (
              <table className="wd-table wd-local-table">
                <caption className="sr-only">{s.table.caption}</caption>
                <thead><tr>{s.table.cols.map((c, i) => <th scope="col" key={i}>{c || <span className="sr-only">Point</span>}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
              </table>
            )}
          </div>
        </SmartSection>
      );
    case "process":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c7">
            <div className="sf-links" style={{ marginTop: 16 }}>
              <Link className="sf-link" to="/services/website-development#process">How a custom website build runs</Link>
            </div>
          </Unit>
          <StageRail
            fig={1}
            stations={STAGES}
            className="sf-c12 sf-rail-top"
            title={`Diagram of the five stages of a ${place.name} web project`}
            desc="A rail runs through five stations: agree what the site is for; scope, price and schedule in writing; design in the browser; build and wire it up; launch, hand over and stay on."
            stamp="The five stages · in the order they run"
            caption="The five stages in order; the written scope, price and schedule come at stage two."
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
    case "facts": {
      const items: Readout[] = s.readouts.map((k, i) => {
        const f = place.facts.rows[k];
        return { value: f.value, label: f.label, source: i === 2 ? <>{f.source} · <Verify id="figures-src">Where these figures come from</Verify></> : f.source };
      });
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <Unit s={s} className="sf-c12">
            <Readouts items={items} withEvidence={false} />
          </Unit>
        </SmartSection>
      );
    }
    case "office":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <SmartUnit className="sf-c7" headingId={`h-${s.id}`} title={s.h2} lede={s.lede} leadIn={s.leadIn} lead={s.lead} measure={false}>
            <NapBand updated={fmtDate(place.seo.dateModified)} />
            <h3 className="sf-h3" style={{ marginTop: 32 }}>{s.question.q}</h3>
            <p style={{ marginTop: 8 }}>{s.question.a}</p>
            <Deeper d={s.deeper} />
          </SmartUnit>
          <RegionPlate className="sf-c5" fig={2} counties={COUNTIES} office={{ l1: NAP.l1, l2: NAP.l2 }} note={s.plateNote} caption="Schematic of the six counties in our Business Profile, office marked; the street address is in the contact band." />
        </SmartSection>
      );
    case "faq":
      return (
        <SmartSection id={s.id} tone={tone} grid labelledBy={`h-${s.id}`}>
          <div className="sf-c4">
            <h2 className="sf-h2" id={`h-${s.id}`}>{s.h2}</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={NAP.phone.href} data-cta="faq">{NAP.phone.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><LocalFaq items={s.items} /></div>
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

export function LocalPage({ place }: { place: LocalPlace }) {
  const url = `${SITE}${place.path}`;
  const OG = ogFor(place.path);
  const [open, setOpen] = React.useState<{ item: WorkItem; opener: HTMLElement } | null>(null);
  const onPreview = React.useCallback((item: WorkItem, opener: HTMLElement) => setOpen({ item, opener }), []);
  const close = React.useCallback(() => setOpen(null), []);
  const cta = contactHref(`Website · ${place.name}`, place.path, "website");
  const faq = place.sections.find((s) => s.kind === "faq");

  useSEO({
    title: place.seo.title,
    description: place.seo.description,
    canonical: getCanonicalUrl(place.path),
    ogTitle: place.seo.title,
    ogDescription: place.seo.description,
    ogUrl: getCanonicalUrl(place.path),
    ogImage: OG.url,
    ogImageSize: [OG.width, OG.height],
    ogImageAlt: "OneAlgorithm, web design and development from Malvern, PA",
    twitterTitle: place.seo.title,
    twitterDescription: place.seo.description,
    twitterImage: OG.url,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  // LocalBusiness mirrors the NAP band: no email or priceRange (neither is shown), hasMap = the Business Profile.
  const lb: Record<string, unknown> = { ...createLocalBusinessSchema("LocalBusiness"), hasMap: NAP.map };
  delete lb.email;
  delete lb.priceRange;
  lb.sameAs = [...(lb.sameAs as string[]), NAP.map];
  const service = {
    "@context": "https://schema.org", "@type": "Service", name: place.hero.h1, serviceType: "Website design and development",
    description: place.seo.description, url, provider: { "@id": `${SITE}/#org` }, areaServed: place.areaServed,
  };
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", url, name: place.seo.title, description: place.seo.description,
    dateModified: place.seo.dateModified, publisher: { "@id": `${SITE}/#org` },
    primaryImageOfPage: { "@type": "ImageObject", url: OG.url, width: OG.width, height: OG.height },
  };
  const faqLd = faq && faq.kind === "faq" && faq.schema && {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const fr = place.facts.rows;
  const has = (p: string) => fr.some((f) => f.period === p);
  const read = `read ${fmtDate(place.facts.pulled)}`;
  let alt = 0; // sections alternate surface / paper down the page; the windows band is always night
  return (
    <Layout>
      <StructuredData data={lb} />
      <StructuredData data={service} />
      <StructuredData data={webPage} />
      {faqLd && <StructuredData data={faqLd} />}

      <SfPage crumbs={[{ label: "Website development", to: "/services/website-development" }, { label: place.name }]} className="wd wd-local">
        <div className="wd-progress" aria-hidden="true" />

        <section className="sf-hero sf-hero-wide" aria-labelledby="h1">
          <div className="sf-wrap sf-grid">
            <div className="sf-hero-text">
              <p className="sf-kicker">{place.hero.kicker}</p>
              <h1 className="sf-h1" id="h1">{place.hero.h1}</h1>
              <p className="sf-lede sf-measure" data-lede="">{place.hero.lede}</p>
              <div className="sf-ctas">
                <SfButton to={cta} magnet cta="hero">Start a project</SfButton>
                <a className="sf-phone" href={NAP.phone.href} data-cta="hero">Call {NAP.phone.display}</a>
              </div>
            </div>
          </div>
        </section>

        {place.sections.map((s) => {
          const tone: Tone = s.kind === "work" ? "night" : alt++ % 2 === 0 ? "surface" : "paper";
          return <Block key={s.id} s={s} place={place} tone={tone} onPreview={onPreview} />;
        })}

        <DeskCTA
          form={{ need: "website", topic: `website-${place.path.split("web-design-")[1]}`, topicLabel: `Website · ${place.name}`, heading: "Start a project", prompt: place.desk.prompt, submitLabel: "Start a project" }}
          heading={place.desk.h2}
          lede={place.desk.lede}
          covers={place.desk.covers}
          coversLabel="What to have ready"
          next={["Send it on the contact page, or call the office.", "A person at OneAlgorithm reads it and replies.", "If it fits, the written scope, price and schedule follow."]}
          hcLink={false}
        />

        <SourcesDialog
          id="figures-src"
          intro={`Every figure in the numbers section covers the ${place.facts.geoName}, names its source and gives the date a person at OneAlgorithm read it. Nothing on the page links to a data endpoint.`}
          sources={[
            { name: CENSUS_SOURCES.cbp.name, what: `Employer establishments by size and by industry (NAICS), ${has("2018") ? "2018 and 2023" : "2023"}`, read, page: CENSUS_SOURCES.cbp.page },
            { name: CENSUS_SOURCES.acs.name, what: "Total population, table B01003, 2024", read, page: CENSUS_SOURCES.acs.page },
          ]}
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
        {open && <Preview item={open.item} onClose={close} opener={open.opener} />}
      </SfPage>
    </Layout>
  );
}

import type React from "react";
import { SF_CERTIFIED_PEOPLE, SF_CERTIFICATIONS, SF_PLATFORM_CERTS, SF_LISTING_ID, SF_APPEXCHANGE_URL, SF_VERIFIED_LABEL } from "../data/salesforceProof";
import { PrimaryCTA } from "./site";

/* The hero verification card from /services/salesforce, shared 2026-10-23 so
   the health check page shows the same checkable record. Figures come from
   data/salesforceProof.ts only. */
const RECORD = [
  { figure: String(SF_CERTIFIED_PEOPLE), label: "Salesforce-certified people", short: "certified people" },
  { figure: String(SF_CERTIFICATIONS), label: "Salesforce certifications held", short: "certifications" },
  { figure: String(SF_PLATFORM_CERTS), label: "of them on the Platform competency", short: "on Platform" },
];

export function SalesforceRecordCard() {
  return (
      <div>
        {/* Louis, 2026-09-01: "I don't like that Logo I like the Cloud."
            So the cloud leads the card. This is Salesforce's CORPORATE
            mark used REFERENTIALLY — it labels Salesforce's own registry
            record, which is what the card contains, and it links to that
            record. That is the permitted use.
            ⛔ It is NOT a partnership credential and must never stand in
            for one: the "Salesforce Partner" badge lower down is the only
            mark that says we are a partner. ⛔ Never pair this with the
            OneAlgorithm logo as a lockup, never recolour or crop it, and
            never let it become the page's own hero graphic.
            ⛔ Use the repo SVG, not the 4000x2250 JPG from the Salesforce
            media pack — same official mark, but the JPG has a baked WHITE
            ground that would sit as a white box on this night panel, and
            it is vector here for a fraction of the bytes. */}
        <img
          src="/media/platforms/salesforce.svg"
          alt="Salesforce"
          width={273}
          height={191}
          className="mb-7 h-auto w-[124px]"
        />
        <dl className="grid grid-cols-3 gap-x-4">
          {RECORD.map((r) => (
            <div key={r.label} className="flex flex-col">
              <dt className="order-2 mt-1.5 text-xs leading-tight text-oa-nightInk3">
                {r.short}
              </dt>
              <dd className="order-1 font-mono text-3xl leading-none text-oa-orange">
                {r.figure}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-oa-nightInk3">
            AppExchange listing
          </p>
          <p className="mt-1.5 font-mono text-sm text-oa-nightInk">
            {SF_LISTING_ID}
          </p>
          <p className="mt-2 font-mono text-[11px] text-oa-nightInk3">
            Read from the listing's stat box on {SF_VERIFIED_LABEL}
          </p>
        </div>
        <a
          className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-medium text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
          href={SF_APPEXCHANGE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify on AppExchange
          <span aria-hidden="true">→</span>
        </a>
      </div>
  );
}

/**
 * Light, compact registry strip (spec 2.4). Static figures, never animated.
 *   <RecordLine />
 *   <RecordLine extra={<Link className="oa-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check a Salesforce partner</Link>} />
 */
export function RecordLine({ extra }: { extra?: React.ReactNode }) {
  const Dot = () => <span aria-hidden="true">·</span>;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-oa-hairline py-3 font-mono text-[13px] text-oa-ink2">
      <span>Salesforce Consulting Partner</span>
      <Dot />
      <span>
        <b className="font-medium tabular-nums text-oa-ink">{SF_CERTIFIED_PEOPLE}</b> certified people
      </span>
      <Dot />
      <span>
        <b className="font-medium tabular-nums text-oa-ink">{SF_CERTIFICATIONS}</b> certifications,{" "}
        <b className="font-medium tabular-nums text-oa-ink">{SF_PLATFORM_CERTS}</b> Platform
      </span>
      <Dot />
      <span>listing {SF_LISTING_ID}</span>
      <Dot />
      <span>read {SF_VERIFIED_LABEL}</span>
      <a className="oa-link -my-2.5 inline-block py-2.5" href={SF_APPEXCHANGE_URL} target="_blank" rel="noopener noreferrer">
        Verify on AppExchange ↗
      </a>
      {extra}
    </p>
  );
}

/**
 * Night registry band for PA's "What you will find when you check us" (spec 2.4).
 * `facts` = true, checkable statements about the listing, stated positively.
 * ⛔ Never list what the listing lacks (voice addendum rule 4) and never claim a
 * tier, badge or rating it does not show. Place inside `<Section tone="night">`.
 *   <RecordBand facts={["Listed as a Consulting Partner on AppExchange", …]} />
 */
export function RecordBand({ facts }: { facts: string[] }) {
  return (
    <div>
      <dl className="grid grid-cols-3 gap-x-6">
        {RECORD.map((r) => (
          <div key={r.label} className="flex flex-col">
            <dt className="order-2 mt-2 text-sm text-oa-nightInk3">{r.label}</dt>
            <dd className="order-1 font-mono text-5xl leading-none tabular-nums text-oa-orange">{r.figure}</dd>
          </div>
        ))}
      </dl>
      {facts.length > 0 && (
        <ul className="mt-10 border-t border-white/10">
          {facts.map((f) => (
            <li key={f} className="border-b border-white/10 py-3 text-oa-nightInk2">
              {f}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 font-mono text-[11px] text-oa-nightInk3">
        Listing {SF_LISTING_ID} · read from the listing's stat box on {SF_VERIFIED_LABEL}
      </p>
      <div className="mt-8">
        <PrimaryCTA href={SF_APPEXCHANGE_URL} cta="record">
          Open our AppExchange listing
        </PrimaryCTA>
      </div>
    </div>
  );
}

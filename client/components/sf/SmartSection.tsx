import * as React from "react";

/*
 * The Smart Brevity unit (design-contract.md, "Smart Brevity section anatomy", HARD limits; enforced by
 * scripts/sf-smart-brevity-check.mjs on the prerendered HTML):
 *
 *   H2 (or H3 inside a section)   <= 8 words
 *   lede                           1 sentence, <= 25 words
 *   lead-in sentence               "Why it matters:" (or What we do / What you get / By the numbers /
 *                                  Yes, but / The bottom line), 1 sentence <= 25 words, ONE per unit
 *   bullets                        <= 3, each <= 15 words
 *   <GoDeeper>                     everything else (<= 220 words), in the HTML at load
 *
 * Every unit opens with the ledger rule (signature 2): a 10px corner tick, then a 2px rule drawn out of
 * it as the unit enters (CSS; the runtime adds `.in`). Text never animates.
 */

export type LeadIn = "Why it matters:" | "What we do:" | "What you get:" | "By the numbers:" | "Yes, but:" | "The bottom line:";

/**
 * The bare ledger-ruled block: tick + rule + whatever you put inside. SmartUnit builds on it; use it directly
 * for a block that is not Smart Brevity shaped (a people block, a ledger of rows).
 *   <LedgerRule as="aside" className="sf-c5" delay={0.08}><h3 className="sf-h3">Who leads your Salesforce work</h3>…</LedgerRule>
 */
export type LedgerRuleProps = {
  as?: "div" | "article" | "aside" | "li" | "section";
  className?: string;
  /** Stagger in seconds for units side by side (the second column gets 0.08). */
  delay?: number;
  id?: string;
  /** Extra inline style (grid placement); merged with the stagger variable. */
  style?: React.CSSProperties;
  "aria-labelledby"?: string;
  children: React.ReactNode;
} & Record<`data-${string}`, string | undefined>;

export function LedgerRule({ as: Tag = "div", className = "", delay, id, style, children, ...rest }: LedgerRuleProps) {
  const merged = delay ? ({ ...style, "--d": `${delay}s` } as React.CSSProperties) : style;
  return (
    <Tag id={id} className={`sf-unit ${className}`} style={merged} data-unit="" {...rest}>
      {children}
    </Tag>
  );
}

/**
 * One Smart Brevity unit. `level` picks the heading element (2 for a section's unit, 3 for units inside a
 * section that already has its H2, e.g. the two-buyer split). The lead-in defaults to "Why it matters:".
 *
 *   <SmartUnit id="what" className="sf-c7" headingId="h-what"
 *     title="What are Salesforce implementation services?"
 *     lede="Salesforce implementation services set Salesforce up for how a business runs: …"
 *     lead="The expensive mistakes happen before anything is configured: …"
 *     points={["Choose the edition and license count before anyone signs", "…", "…"]}>
 *     <GoDeeper label="the four stages and what they cost">…</GoDeeper>
 *   </SmartUnit>
 */
export function SmartUnit({ level = 2, title, headingId, kicker, lede, leadIn = "Why it matters:", lead, points, children, className = "", id, delay, as, measure = true, style, ...rest }: {
  level?: 2 | 3;
  title: React.ReactNode;
  headingId?: string;
  /** Mono eyebrow above the heading (a label, not a heading). */
  kicker?: React.ReactNode;
  lede: React.ReactNode;
  leadIn?: LeadIn;
  /** The one lead-in sentence. Omit for a unit that has only a lede (a card group's header). */
  lead?: React.ReactNode;
  /** <= 3 bullets, <= 15 words each. */
  points?: React.ReactNode[];
  /** GoDeeper, figure captions, links: anything below the bullets. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "div" | "article" | "aside" | "li" | "section";
  /** Constrain copy to 68ch (default). Off for narrow grid columns. */
  measure?: boolean;
  style?: React.CSSProperties;
} & Record<`data-${string}`, string | undefined>) {
  const H = (`h${level}` as unknown) as "h2";
  const m = measure ? " sf-measure" : "";
  return (
    <LedgerRule as={as || "article"} className={className} id={id} delay={delay} style={style} {...rest}>
      {kicker && <p className="sf-kicker">{kicker}</p>}
      <H className={level === 2 ? "sf-h2" : "sf-h3"} id={headingId}>{title}</H>
      <p className={`sf-lede${m}`} data-lede="">{lede}</p>
      {lead && (
        <p className={`sf-lead${m}`} data-lead="">
          <span className="sf-lead-in">{leadIn}</span> {lead}
        </p>
      )}
      {points && points.length > 0 && (
        <ul className={`sf-points${m}`}>
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
      {children}
    </LedgerRule>
  );
}

export type Tone = "paper" | "surface" | "night";

/**
 * A page section: full-bleed ground + the 1440 frame. Put SmartUnits (and a figure for the 7/5 spread) inside.
 *   <SmartSection id="what" tone="surface" grid>
 *     <SmartUnit className="sf-c7" … />
 *     <FlowMigration fig={2} className="sf-c5" />
 *   </SmartSection>
 * With `heading`, the section opens with its own H2 + lede (for sections whose body is cards, a rail or several
 * H3 units); the heading block is then the section's unit and children follow it.
 */
export function SmartSection({ id, tone = "paper", grid, compact, className = "", heading, children, labelledBy }: {
  id?: string;
  tone?: Tone;
  /** Lay children on the 12-column grid. */
  grid?: boolean;
  compact?: boolean;
  className?: string;
  /** Optional section header: H2 (+ lede) before the children, on the 7-column measure. */
  heading?: { title: React.ReactNode; id: string; lede?: React.ReactNode; kicker?: React.ReactNode };
  children: React.ReactNode;
  labelledBy?: string;
}) {
  const toneCls = tone === "surface" ? " sf-surface" : tone === "night" ? " sf-night" : "";
  return (
    <section id={id} className={`sf-section${compact ? " sf-section-compact" : ""}${toneCls} ${className}`} aria-labelledby={labelledBy ?? heading?.id}>
      <div className={`sf-wrap${grid && !heading ? " sf-grid" : ""}`}>
        {heading && (
          <div className="sf-grid" style={{ rowGap: 0 }}>
            <div className="sf-c7">
              {heading.kicker && <p className="sf-kicker">{heading.kicker}</p>}
              <h2 className="sf-h2" id={heading.id} style={heading.kicker ? { marginTop: 12 } : undefined}>{heading.title}</h2>
              {heading.lede && <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">{heading.lede}</p>}
            </div>
          </div>
        )}
        {heading && grid ? <div className="sf-grid" style={{ marginTop: 40 }}>{children}</div> : children}
      </div>
    </section>
  );
}

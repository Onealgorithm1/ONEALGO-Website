import * as React from "react";

/*
 * FIG. 6 · where we work from (design-contract-webdev.md U15; PHL #6, CHE #7). A schematic, not a map: six
 * labelled county tiles in a 3 x 2 grid and the office marker in one of them. As the plate enters (`.in`): the
 * crosshair lands (scale 0 → 1, .35 s), its leader line draws (scaleX .4 s), the label clips in (.35 s); the tiles
 * are static. Reduced motion: final. The counties and the address are also in the unit's text (the NAP band).
 *
 *   <RegionPlate counties={["Chester County, PA", "Delaware County, PA", "Montgomery County, PA", "Bucks County, PA", "Philadelphia County, PA", "New Castle County, DE"]}
 *                office={{ l1: "625 Swedesford Rd, Unit B", l2: "Malvern, PA 19355" }} />
 */
const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace" };

export function RegionPlate({ counties, office, officeTile = 0, note, fig = 6, id = `fig${fig}`, stamp = "Where we work from · schematic, not to scale", caption, className = "" }: {
  /** Up to six, as Google has them. */
  counties: string[];
  office: { l1: string; l2: string };
  /** Index of the tile that holds the office marker (default the first). */
  officeTile?: number;
  /** One mono line under the tiles, e.g. "25 miles from Center City Philadelphia". */
  note?: string;
  fig?: number;
  id?: string;
  stamp?: string;
  caption?: React.ReactNode;
  className?: string;
}) {
  const TW = 170, TH = 110, GAP = 20, X0 = 40, Y0 = 40;
  const tiles = counties.slice(0, 6).map((c, i) => ({ c, x: X0 + (i % 3) * (TW + GAP), y: Y0 + Math.floor(i / 3) * (TH + GAP) }));
  const o = tiles[Math.min(officeTile, tiles.length - 1)] ?? { x: X0, y: Y0, c: "" };
  const mx = o.x + TW * 0.62, my = o.y + TH * 0.6; // the marker, off the tile's centre so the label has room
  const lx = Math.min(mx + 44, 420), ly = Y0 + 2 * (TH + GAP) + 10; // the label sits under the tiles
  const cap = caption ?? `${office.l1}, ${office.l2}. ${counties.slice(0, 6).join(" · ")}.`;
  return (
    <figure className={`sf-stage sf-sweep wd-plate wd-region ${className}`} id={id} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <svg viewBox="0 0 610 350" role="img" aria-labelledby={`${id}-t ${id}-d`} style={{ aspectRatio: "610/350" }}>
          <title id={`${id}-t`}>Schematic of the counties OneAlgorithm works in, with the office marked</title>
          <desc id={`${id}-d`}>Six labelled tiles, one per county, and a crosshair marking the office at {office.l1}, {office.l2}. Not to scale.</desc>
          {tiles.map((t) => (
            <g key={t.c} fontFamily={F.body}>
              <rect x={t.x} y={t.y} width={TW} height={TH} fill="var(--surface)" stroke="var(--hair-s)" strokeWidth="1" />
              <path d={`M${t.x} ${t.y + 0.5} H${t.x + TW}`} stroke="var(--navy)" strokeWidth="2" />
              <text x={t.x + 12} y={t.y + 26} fontSize="12.5" fontWeight="600" fill="var(--ink)">{t.c.split(",")[0]}</text>
              {t.c.includes(",") && <text x={t.x + 12} y={t.y + 44} fontFamily={F.mono} fontSize="10.5" fill="var(--ink3)" letterSpacing=".08em">{t.c.split(",")[1].trim()}</text>}
            </g>
          ))}
          {/* office marker: crosshair lands, leader draws, label clips in */}
          <g className="mark" style={{ transformOrigin: `${mx}px ${my}px` }}>
            <circle cx={mx} cy={my} r="9" fill="none" stroke="var(--orange)" strokeWidth="2" />
            <path d={`M${mx - 15} ${my} H${mx - 11} M${mx + 11} ${my} H${mx + 15} M${mx} ${my - 15} V${my - 11} M${mx} ${my + 11} V${my + 15}`} stroke="var(--orange)" strokeWidth="2" />
            <circle cx={mx} cy={my} r="2.5" fill="var(--orange)" />
          </g>
          <path className="leader" style={{ transformOrigin: `${mx}px ${my}px` }} d={`M${mx} ${my} L${lx} ${ly}`} fill="none" stroke="var(--orange)" strokeWidth="1.5" />
          <g className="type-in" fontFamily={F.body}>
            <text x={lx + 8} y={ly + 4} fontSize="13" fontWeight="600" fill="var(--ink)">{office.l1}</text>
            <text x={lx + 8} y={ly + 22} fontFamily={F.mono} fontSize="11" fill="var(--ink3)" letterSpacing=".04em">{office.l2}</text>
          </g>
          {note && <text x={X0} y={ly + 30} fontFamily={F.mono} fontSize="10.5" fill="var(--ink3)" letterSpacing=".08em">{note}</text>}
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{cap}</figcaption>
    </figure>
  );
}

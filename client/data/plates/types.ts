/* Shapes of the generated per-page plate files (client/data/plates/<page>.ts).
 * Written by scripts/plates.mjs from scripts/plates/<page>.mjs. Hand-edit neither the
 * generated .ts nor the SVGs: edit the page's spec and re-run the generator. */

/** One diagram/chart/map. `src`/`mSrc` are the desktop and phone (<1024px) SVGs;
 *  `traces`/`nodes` are the desktop overlay geometry, from the same wires the SVG draws. */
export type PlateSpec = {
  id: string;
  alt: string;
  src: string;
  w: number;
  h: number;
  mSrc: string;
  mw: number;
  mh: number;
  /** `i` = draw-order group (0..6); the scroll range of each group starts 4% later. */
  traces: { k: string; d: string; i: number }[];
  nodes: { k: string; x: number; y: number; w: number; h: number }[];
  legend?: { k: string; label: string }[];
};

/** One demo-org screenshot (owner-gated, spec §7.1). Files live at
 *  /media/salesforce/{id}-{width}.{avif,webp}; `cssW` is half the master width. */
export type ShotSpec = { id: string; widths: number[]; w: number; h: number; cssW: number };

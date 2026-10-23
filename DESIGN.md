---
name: OneAlgorithm
description: Design tokens for onealgorithm.com. Brand-locked palette; two places carry their own motif - the instrument layer on /services/website-development and the Salesforce plate system on the 22 Salesforce routes.
colors:
  night:        "#04182b"   # primary dark ground
  nightInk:     "#ffffff"   # text on night
  nightInk2:    "#dbe4ee"   # body text on night
  nightInk3:    "#9fb3c8"   # meta text on night
  ink:          "#0d1b2a"   # text on light
  ink2:         "#35485c"   # body text on light
  ink3:         "#5a6b7d"   # meta text on light
  primary:      "#005eaa"   # = blue. Declared so the palette is never auto-generated.
  blue:         "#005eaa"   # brand blue. 6.60:1 on paper, 6.19:1 on surface - safe as text on light.
  orange:       "#ffa634"   # brand accent. Backgrounds and dark-ground text ONLY.
  orangeText:   "#9a4f00"   # the ONLY orange permitted as text on a light ground (6.01:1)
  paper:        "#f7f8fa"   # page ground (tailwind oa.paper - what ships)
  surface:      "#ffffff"   # cards raised off the paper (oa.surface)
  sunk:         "#eef1f5"   # recessed wells, inputs (oa.sunk)
  blueTint:     "#eaf2f9"   # row highlight, own-offer table column
  hairline:     "#e3e8ef"
  hairlineStrong: "#d3dae4"
typography:
  display:
    fontFamily: "IBM Plex Sans"
  body:
    fontFamily: "IBM Plex Sans"
  mono:
    fontFamily: "JetBrains Mono"
rounded:
  none:   "0px"    # every instrument element; Salesforce plates, pins, form fields, chips
  button: "8px"    # buttons only
  card:   "16px"
spacing:
  base: "8px"
---

# OneAlgorithm design contract

## Palette is brand-locked, deliberately

The palette is **not** drawn from `onealgo-design-kb/.../colors.csv`. This is an
existing 26-page site with a live brand: navy `#04182b`, orange `#ffa634`, IBM
Plex Sans. Introducing a KB palette on one page would break the other 25. The
KB was used for **motion tiers** and **layout style** instead, which is where
the real decision was.

⛔ `orange` (`#ffa634`) fails contrast as text on a light ground. `orangeText`
(`#9a4f00`, 6.01:1) is the only orange permitted for text on paper/surface.
On night grounds, `orange` is fine.

## The instrument layer — /services/website-development

That page may show **no client names, logos, testimonials, case studies,
government past performance, stock photography or AI imagery**. None exist with
consent. It therefore has zero conventional proof available, and every ordinary
agency-page move is unavailable.

So the page instruments itself. Every figure it displays is read off the live
document at runtime — the reader's own viewport, this page's real DOM node
count, its actual first paint, the number of images in the body. ⛔ **No number
in `client/components/Instrument.tsx` may ever be hard-coded.** A typed-in
number inside an instrument is a lie in a lab coat, and it would destroy the
only argument the page has.

### Signature elements

1. **Live readout panel** — fills the column the page used to leave empty, and
   updates as the reader resizes the window.
2. **Measure rule** — a hairline that draws itself as the section enters,
   carrying the section index and a true measured width in its margin.
3. **Specimen rows** — shift 2px and light their top hairline orange on hover.

### Rules

- Radius **0** on every instrument element. The site's 8px radius belongs to
  buttons. That contrast is what makes the layer read as measured, not decorated.
- Motion follows `onealgo-design-kb/ui-ux-pro-max/data/motion.csv`: parallax at
  the **Subtle** tier (small delta, scrubbed to scroll), hover at the **Subtle**
  tier (under 2px displacement, 150–200ms).
- Everything collapses under `prefers-reduced-motion`.

## Banlist compliance

No Inter/Roboto/system display face, no blue→violet gradient, no three equal
feature cards, no stock people, no emoji icons, no lorem, no single global
radius.

**Numbering is used and is allowed here** because the content genuinely is a
sequence: `BUILD` is an ordered list of four things and `PROCESS` is four
stages that happen in order. The measure-rule indices are not decorative
eyebrows — each carries a real measurement alongside.

## Token source of truth

`tailwind.config.ts` (`theme.extend.colors.oa`) is what ships. The front-matter
above was corrected to match it on 2026-10-23: it used to say paper `#ffffff`,
surface `#f5f8fb` and hairline `#e3e9f0`, which no class on the site produces.
Use the `oa-*` Tailwind tokens; change a colour there first, then here.

## The Salesforce plate system - the 22 Salesforce routes

The second place with its own motif (pending owner sign-off, spec section 7.11).
Spec: `onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md`.
Components: `client/components/salesforce.tsx` (Salesforce-only, so the main
chunk does not carry them) plus opt-in props in `site.tsx` (`Section clip`,
`PrimaryCTA`/`SecondaryCTA` `cta`+`tone`, `Card wire`, `ProcessSteps rail`/`terminal`).

### Signature elements

1. **Provenance-stamped plates.** Every diagram, chart, map or demo-org
   screenshot sits in a radius-0 hairline frame with 9px corner registration
   ticks and a two-cell mono stamp on its bottom edge saying what it is and
   where it came from (`FIG. 2 · DIAGRAM · TYPICAL SAP-TO-SALESFORCE PATTERN, NOT A CLIENT BUILD` | `ONEALGORITHM`).
2. **Signal wires.** Diagram connectors ship hairline grey (`#7d8da0`). At
   1024px+ they draw in brand blue (orange on night) as the plate scrolls
   through; on phones the `-m` file has them already drawn. Table rows, legend
   rows and step blocks are wired to their line: hover, focus or tap thickens
   it and dims the rest. No packet animation.
3. **Registry readouts.** Every figure in JetBrains Mono tabular numerals with
   its source and read date (`16 · 53 · 38 Platform · listing a0N3A00000EV7SwUAL · read 23 October 2026`).
   Figures are static in the HTML; the AppExchange record is HTML, never a screenshot.

### Rules

- Radius **0** on plates, pins, form fields and chips. Buttons keep 8px.
- **Stamp wording rule:** the stamp says what the image is and whose it is. A
  diagram of a typical pattern says `NOT A CLIENT BUILD`; a screenshot says
  `SALESFORCE SOFTWARE · ONEALGORITHM DEMO ORG · SAMPLE DATA`. No image may pass
  for client work. No Salesforce logos inside or next to diagrams, no
  AppExchange screenshots, no text copied from Salesforce (paraphrase + link).
- **Motion budget per page** (spec 4.12): at most one trace-drawing plate in
  view at a time; at most 3 sweeping elements (the first image never sweeps);
  at most 2 specimens; one rail-mode ProcessSteps (two on the health check);
  nothing above the fold animates; only `transform`, `clip-path` and
  `stroke-dashoffset` change; cross-highlight changes `stroke-width`,
  `opacity` and `background-color` only. Every scroll effect is gated by
  `@supports`, `prefers-reduced-motion: no-preference` and a `Section clip`
  ancestor; the default is always the final, fully drawn state.
- Hand-written hovers live in `@media (hover:hover)`; focus styles always on.

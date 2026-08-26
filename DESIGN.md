---
name: OneAlgorithm
description: Design tokens for onealgorithm.com. Brand-locked palette; the instrument layer on /services/website-development is the one place with its own motif.
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
  paper:        "#ffffff"
  surface:      "#f5f8fb"
  hairline:     "#e3e9f0"
  hairlineStrong: "#d3dae4"
typography:
  display:
    fontFamily: "IBM Plex Sans"
  body:
    fontFamily: "IBM Plex Sans"
  mono:
    fontFamily: "JetBrains Mono"
rounded:
  none:   "0px"    # every instrument element
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

/* /services/website-development: what the proof pop-ups say (structure-spec.md §5; claims-and-assets.md §A, §B3,
 * §B5, §C2, §D1, §G). Every pop-up is an in-site <dialog> whose content is in the prerendered HTML: the figure, what
 * was read, the date, the source address as text; the one off-site control is the secondary "Open on … (new tab)".
 *
 * GATES (missing.md #3, #13; structure-spec.md §13): the Phantom redesign figures and any review quote are shown to
 * Louis as client-facing text before release; the "Open on Google" secondary extends OD:63 (salesforce.com) to Google
 * and is Louis's call (default if silent: address as text only, i.e. drop `external`). TKTK = a fact not on file. */

export const READ_LISTING = "23 October 2026";
export const READ_SOURCES = "24 October 2026";

export const GOOGLE_LISTING = {
  name: "OneAlgorithm Consulting, Malvern, PA",
  placeId: "ChIJnQw01SfzxokRJhcvpzCljCE",
  rating: "5.0",
  reviews: 6,
  founded: 2020,
  mapUrl: "https://maps.app.goo.gl/kVEeTz9dCyB64CGk6",
  read: READ_LISTING,
};

export const FOUNDED = {
  legalName: "ONE ALGORITHM LLC",
  paEntity: "7068842",
  formed: "4 June 2020",
  source: "Pennsylvania Department of State, business entity records",
};

/** The three client reviews of us on the Google listing (work.ts slugs). `text` verbatim where on file. */
export const REVIEWS: Record<string, { author: string; authorLine: string; text: string; textNote?: string; disclosure?: string; url: string }> = {
  "phantom-arcades": {
    author: "Dennis",
    authorLine: "Dennis Riese, Phantom Arcades, Valrico, FL",
    // Quoted unedited in our case study of 2026-10-22 (/blog/product-configurator-case-study-phantom-arcades).
    text: "Lou is an absolute pleasure to work with. From the moment we started working together till when my website went live, Lou has helped me every step of the way. I have never worked with someone so knowledgeable about what product they offer. I recommend OneAlgorithm but if you do reach out to them make sure you ask for Lou!",
    textNote: "He paid for the work: read it as a client saying the process was worth it.",
    url: "https://maps.app.goo.gl/s3mparNt8wi9qEtU9",
  },
  "inspect-this-home": {
    author: "Lou",
    authorLine: "Louis Rubino, Inspect This Home Inspections, Long Island, NY",
    // Excerpt as quoted in /blog/home-inspector-website-design; the full text is TKTK (pull from the listing at build).
    text: "One algorithm did a great job on my new web site design and development… They are also directing more traffic to my site resulting in more business.",
    textNote: "Excerpt as quoted in our case study; the full review is on Google. TKTK full text.",
    disclosure: "Lou is Louis's father",
    url: "https://maps.app.goo.gl/vvpRdMq7cGVZD9mg6",
  },
  "boards-professor": {
    author: "Sean",
    authorLine: "Sean, The Boards Professor (posts on Google as “Shiggity”)",
    text: "TKTK: the review text, verbatim from the Google listing, pulled at build.",
    url: "https://maps.app.goo.gl/ssMbAsPBu5wBcgNu6",
  },
};

/** U2: how the hero was built (HeroSlides.tsx; never "invented here"). */
export const HERO_BUILD_ROWS: { th: string; td: string }[] = [
  { th: "Drawn with", td: "Canvas 2D in your browser; no library" },
  { th: "The text", td: "The two lines of the heading, rasterised and sampled; every opaque pixel becomes a particle" },
  { th: "Pattern", td: "Built for this site after the published 21st.dev “Magic Text Reveal” pattern" },
  { th: "The film", td: "Our brand film plays behind the particles; the poster stands in when the film is withheld" },
  { th: "Reduced motion", td: "Particles parked on their home pixels, no loop, no film" },
  { th: "Source", td: "This page's own code, open in your browser's inspector" },
];

/** U3: the Phantom configurator (the live post's closing credit and its stated figures). */
export const PHANTOM_CONFIGURATOR = {
  post: "/blog/product-configurator-case-study-phantom-arcades",
  rows: [
    { th: "Credit", td: "OneAlgorithm designed and developed phantomarcades.com, including the eight-cabinet 3D configurator, the generated build archive and the room fit checker." },
    { th: "Designs started", td: "1,995 (9 September to 19 October 2026)" },
    { th: "Full builds", td: "157" },
    { th: "Checkouts opened", td: "471" },
    { th: "Enquiries", td: "15" },
    { th: "Source", td: "Our case study of 8 September 2026, updated 22 October 2026, by Louis Rubino; figures from the site's own analytics" },
  ],
};

/** U4: the Phantom redesign figures. GATED: Louis sees this wording before it publishes (claims-and-assets.md §B3). */
export const PHANTOM_REDESIGN = {
  post: "/blog/seo-case-study-phantom-arcades",
  rows: [
    { th: "Redirects", td: "80+ old addresses mapped to new ones" },
    { th: "Search clicks", td: "1,112 → 2,130 (+92%), 13 August to 19 October 2026 against the same dates in 2025" },
    { th: "Non-brand clicks", td: "95 → 314 (+231%), same window" },
    { th: "Control period", td: "6 June to 12 August: clicks −6% against 2025" },
    { th: "Revenue", td: "No revenue claim yet" },
    { th: "Source", td: "Google Search Console property totals, in our case study of 22 October 2026, by Louis Rubino" },
  ],
};

/** U9: the standards and the law, as text with read dates (verify/sources/ada-*.html; W3C WCAG 2.1). */
export const WCAG_SOURCES = [
  { name: "W3C, Web Content Accessibility Guidelines (WCAG) 2.1", what: "The standard named in every proposal: Level AA, including 4.5:1 text contrast", read: `read ${READ_SOURCES}`, page: "https://www.w3.org/TR/WCAG21/" },
  { name: "U.S. Department of Justice, 2024 rule on web and mobile accessibility under ADA Title II", what: "WCAG 2.1 AA for state and local governments; compliance 26 April 2027 (50,000 people or more) and 26 April 2028 (smaller entities, special districts), after the Interim Final Rule of 20 April 2026", read: `read ${READ_SOURCES}`, page: "https://www.ada.gov/resources/2024-03-08-web-rule/" },
  { name: "U.S. Department of Justice, Guidance on Web Accessibility and the ADA (18 March 2022)", what: "For businesses open to the public: no regulation setting out detailed standards; WCAG described as helpful guidance", read: `read ${READ_SOURCES}`, page: "https://www.ada.gov/resources/web-guidance/" },
];

/** U15: the three posts a reader can check us against. */
export const CHECK_POSTS = [
  { to: "/blog/seo-case-study-phantom-arcades", label: "Phantom Arcades: +92% search clicks in 68 days" },
  { to: "/blog/product-configurator-case-study-phantom-arcades", label: "Build it, price it, send it: the configurator" },
  { to: "/blog/home-inspector-website-design", label: "How we built a home inspector's website" },
];

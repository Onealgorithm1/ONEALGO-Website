#!/usr/bin/env node
/**
 * Build the One Algorithm email signatures from shared/signature-template.html.
 *
 * Replaces Blinq. Blinq hosted our headshots on its own Firebase bucket behind
 * signed URLs, which meant the signature stopped working the day the account
 * lapsed. Everything here is served from onealgorithm.com.
 *
 * Identifiers are imported from shared/companyProfile.ts — the same object the
 * website renders and scripts/identifiers-check.mjs asserts against — so a
 * signature can never carry a UEI or D-U-N-S the site disagrees with.
 *
 *   node scripts/build-signatures.mjs              # build to build-artifacts/signatures
 *   node scripts/build-signatures.mjs --preview    # + a side-by-side preview page
 *   node scripts/build-signatures.mjs --assets     # rebuild public/sig/ (icons, headshots, globe)
 *   node scripts/build-signatures.mjs --install    # + copy into Outlook's Signatures folder
 *   node scripts/build-signatures.mjs --base=.     # local asset paths instead of the live site
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../shared/companyProfile.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "build-artifacts", "signatures");

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n, d) => (argv.find((a) => a.startsWith(`--${n}=`)) || `=${d}`).split("=").slice(1).join("=");

const BASE = opt("base", "https://onealgorithm.com").replace(/\/$/, "");

/* Where the <img> files are read from. Two very different answers:
 *   web paste  -> the hosted /sig folder, because Gmail and Outlook-on-the-web
 *                 can only fetch images over http.
 *   --install  -> the signature's own _files folder. Classic Outlook EMBEDS a
 *                 relatively-referenced image into the outgoing message as an
 *                 attachment, and Outlook never blocks embedded images, only
 *                 remote ones. That is how the old SBA signature already works,
 *                 and it is why the icons cannot silently vanish on the desktop.
 * Links always stay absolute; only image srcs move. */
let ASSETS = `${BASE}/sig`;

/* The socioeconomic set a contracting officer scans for. Verified 2026-08-18 from
 * the certificates on file; the same list /about publishes. ⛔ Certifications are
 * TEXT, never seal images — we hold no licensed seal artwork, and the D&B and
 * E-Verify marks both require a licence we have not bought. ⛔ Small Disadvantaged
 * Business is self-certified in SAM only and is deliberately absent. */
const CERTIFICATIONS = [
  "SBA EDWOSB",
  "SBA WOSB",
  "WBENC WBE",
  "NMSDC MBE",
  "VA SWaM",
  "Nassau MWBE",
];

/* Salesforce AppExchange consulting-partner listing — the one image credential
 * on the signature, and the only one a recipient can independently open. */
const SF_LISTING =
  "https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N3A00000EV7SwUAL";

/**
 * Logo marks. ⛔ EVERY FILE HERE IS OFFICIAL ARTWORK ISSUED TO US. Nothing on this
 * row may ever be drawn, traced or approximated — see the 15 fake vendor logos this
 * repo already carries. A mark we do not hold stays off the signature as TEXT until
 * someone downloads the real file from the issuer. --assets only ever SCALES the
 * supplied file; it never recolours, crops or redraws one.
 *
 * ⭐ SBA WOSB / EDWOSB — the official decals from decals-and-icons.zip, the pack the
 *    SBA issues to certified firms (held at 06_Compliance/.../Federal/SBA_CERT/).
 *    The READ-FIRST.txt in that pack quotes the SBA Marketing SOP: permitted on
 *    "website, business cards, social media profiles, capability statements and
 *    proposal bids", NOT on "letterhead, marketing materials or advertising". An
 *    email signature is not named either way. Louis Rubino, Director of Compliance
 *    and Contract Administration, reviewed that wording on 2026-08-31 and directed
 *    that the decals be used here. That is his call to make and it is his to revisit.
 *
 * ⭐ NMSDC's guidance is the opposite of the SBA's and worth not confusing with it:
 *    a certified MBE using the graphic "in email tags or online" SHOULD make it a
 *    clickable link. Every mark in this row is linked, which satisfies that.
 *
 * ⭐ NMSDC MBE — the official certified badge, supplied by Louis 2026-08-31 from the
 *    NMSDC portal and filed at .../Third_Party/NMSDC/NMSDC_MBE_Certified_Badge.png.
 *    ⛔ NMSDC only licenses it while the certification is ACTIVE — currently to
 *    31 Jan 2027 (PT100000051). It comes off this row the day that lapses.
 *
 * Still missing, all behind a login or a licence — text-only until the file exists:
 * ⛔ VA SWaM — certification-app.sbsd.virginia.gov (login). SBSD encourages its use.
 * ⛔ Nassau County MWBE — the county publishes no mark at all; certification buys a
 *    directory listing. There may be nothing to obtain.
 * ⛔ Zendesk — zendesk.com/company/brand-guidelines: "Third-party use of Zendesk
 *    logos requires a license or written permission from Zendesk" (IP@zendesk.com).
 *
 * WBENC's "Women Owned" mark must be reproduced unaltered.
 */
/**
 * Partner marks — the PARTNER row, logos only, no text (Louis, 2026-08-31).
 * Each company's OWN primary form: Salesforce's is the cloud alone, Zendesk's is the
 * stacked mark-plus-wordmark. They differ in structure because the brands do; balancing
 * them by ink after a trim() is what makes them read as a pair.
 *
 * ⛔ Provenance, because this is the row most likely to acquire a fake:
 *   salesforce — public/media/logos/salesforce.svg, listed REAL in that folder's
 *     README (official simple-icons path data, CC0 paths, trademark used nominatively).
 *   zendesk — Zendesk's own Logo_Primary_Coal, supplied by Louis 2026-08-31 and filed at
 *     08_Contracts/Partners_and_Subcontractors/Zendesk/Brand/. Zendesk's brand page says
 *     third-party use "requires a license or written permission" (IP@zendesk.com); we
 *     hold an executed partner agreement dated 28 May 2026 and Louis directed its use.
 * Both partnerships are real, so naming them is nominative, not implied endorsement.
 */
const PARTNERS = [
  { file: "p-salesforce.png", alt: "Salesforce", w: 26, h: 18, href: SF_LISTING },
  { file: "p-zendesk.png", alt: "Zendesk", w: 35, h: 26, href: `${BASE}/services/zendesk` },
];

/* Heights differ on purpose. The SBA decals are portrait, WBENC is landscape and the
 * Salesforce badge carries its own solid plate — matching pixel heights would make the
 * plate dominate and shrink the decals to illegibility. These match OPTICAL weight. */
const MARKS = [
  { file: "m-sba-wosb.png", alt: "SBA-certified WOSB", w: 34, h: 42, href: `${BASE}/capabilities` },
  { file: "m-sba-edwosb.png", alt: "SBA-certified EDWOSB", w: 34, h: 42, href: `${BASE}/capabilities` },
  { file: "m-wbenc.png", alt: "Women Owned — certified by WBENC", w: 60, h: 34, href: `${BASE}/capabilities` },
  { file: "m-nmsdc.png", alt: "NMSDC-certified Minority Business Enterprise (MBE)", w: 44, h: 44, href: `${BASE}/capabilities` },
  { file: "m-swam.png", alt: "SWaM-certified — Virginia DSBSD", w: 103, h: 40, href: `${BASE}/capabilities` },
];

/**
 * The roster. `photo` files live in public/sig/ at 240x240 (2x of the 120px display size),
 * circle-cropped at 208x208 (2x of 104) from Brand_Assets/Website Pics, with a
 * 2px #d3dae4 ring baked in. Palette PNG
 * with alpha: a circle needs transparency, and 8-bit takes it from 105KB to 25KB.
 *
 * ⛔ A person with a `null` field is NOT generated. Titles are facts, not
 * guesses — fill them in rather than letting the script invent one.
 */
const TEAM = [
  {
    slug: "louis-rubino",
    name: "Louis Rubino",
    title: "Director",
    photo: "lou-circle.png",
    /* Head-and-shoulders box in the 1024x1024 source, read off a coordinate grid:
     * head top y=65, chin y=563, shoulders begin y=666, face centre x=537. Ends just
     * into the shoulders. ⛔ Per person — a fixed box is wrong for anyone framed
     * differently, so everyone else falls back to content-aware placement until
     * someone actually looks at their crop. */
    crop: { left: 172, top: 30, width: 730, height: 730 },
    email: "lrubino@onealgorithm.com",
    direct: "610.890.9722 ext. 1002",
    mobile: "516.451.5139",
    book: "https://cal.com/mr-rubino",
  },
  {
    slug: "swapna-amirisetti",
    name: "Swapna Amirisetti",
    title: null, // TKTK — key principal on the D&B profile; needs her actual title
    photo: "swapna-circle.png",
    email: "samirisetti@onealgorithm.com",
    direct: null,
    mobile: null,
    book: null,
  },
  {
    slug: "sreenivas-amirisetti",
    name: "Sreenivas Amirisetti",
    title: null, // TKTK — "Executive, lead technical" on the Adobe record is not a title
    photo: "sreenivas-circle.png",
    email: "sreeni@onealgorithm.com",
    direct: null,
    mobile: null,
    book: null,
  },
  {
    slug: "sahith-valluru",
    name: "Sahith Valluru",
    title: null, // TKTK
    photo: "sahith-circle.png",
    email: null,
    direct: null,
    mobile: null,
    book: null,
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* An extension has to survive the tap, or the tel: link dials the switchboard and
 * strands the caller. A comma is a dial pause, which is what phones actually honour. */
const tel = (s) => {
  const [main, ext] = String(s).split(/ext\.?/i);
  const digits = main.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  return "+1" + digits + (ext ? ",," + ext.replace(/\D/g, "") : "");
};

/* Outlook decides a link is blue-and-underlined unless every anchor says
 * otherwise, so colour and text-decoration are stated on each one. */
const link = (href, text, color = "#005eaa") =>
  `<a href="${href}" style="color:${color};text-decoration:none;">${esc(text)}</a>`;

/**
 * Row icons. ⛔ Email cannot render inline SVG — the Word engine has no SVG support
 * at all and Gmail strips it — so these ship as hosted PNGs at 2x, built by --assets
 * from lucide's own path data (ISC, already a dependency of this repo).
 *
 * The icon IS the field label, so its alt text is the label, never alt="". Corporate
 * Outlook blocks remote images by default and shows the alt text in the placeholder;
 * a decorative alt would leave the recipient with a number and no idea what it is.
 */
const ICONS = {
  direct: ["phone", "Direct"],
  mobile: ["smartphone", "Mobile"],
  email: ["mail", "Email"],
  web: ["globe", "Website"],
};

const iconImg = (kind) => {
  const [file, label] = ICONS[kind];
  return `<img src="${ASSETS}/i-${file}.png" width="16" height="16" alt="${label}" title="${label}" style="display:block;border:0;outline:none;width:16px;height:16px;">`;
};

function contactRows(p) {
  const rows = [];
  const row = (kind, valueHtml) =>
    `                      <tr>` +
    `<td width="24" valign="top" style="width:24px;padding-top:2px;">${iconImg(kind)}</td>` +
    `<td valign="top" style="font-size:12px;line-height:20px;mso-line-height-rule:exactly;color:#35485c;">${valueHtml}</td>` +
    `</tr>`;

  if (p.direct) rows.push(row("direct", link(`tel:${tel(p.direct)}`, p.direct, "#35485c")));
  if (p.mobile) rows.push(row("mobile", link(`tel:${tel(p.mobile)}`, p.mobile, "#35485c")));
  if (p.email) rows.push(row("email", link(`mailto:${p.email}`, p.email)));
  rows.push(
    row(
      "web",
      link(`${BASE}/`, "onealgorithm.com") +
        (p.book ? `<span style="color:#d3dae4;"> &nbsp;|&nbsp; </span>${link(p.book, "Book a time")}` : ""),
    ),
  );
  return rows.join("\n");
}

function plainText(p) {
  // The machine-readable half. The signature we are replacing was a single PNG,
  // so an ATS or a triage model extracted nothing from it at all.
  const { identifiers, codes } = siteConfig;
  return [
    p.name,
    p.title,
    "One Algorithm LLC",
    "",
    p.direct && `Direct  ${p.direct}`,
    p.mobile && `Mobile  ${p.mobile}`,
    p.email && `Email   ${p.email}`,
    `Web     onealgorithm.com`,
    p.book && `Book    ${p.book}`,
    "",
    `Certified   ${CERTIFICATIONS.join(" | ")}`,
    `Registered  UEI ${identifiers.uei} | CAGE ${identifiers.cage} | D-U-N-S ${identifiers.duns} | NAICS ${codes.naics[0]} | E-Verify participant`,
    "Partner      Salesforce Consulting Partner | Zendesk",
    "",
    "This message is confidential and intended only for the named recipient. If it reached you in error, please reply to let us know and delete it.",
  ]
    .filter((l) => l !== undefined && l !== null && l !== false)
    .join("\r\n");
}

/* One row of official marks, each linked to something a recipient can actually open. */
const partnersRow = () =>
  present(PARTNERS).map(
    (m, i, arr) =>
      `<a href="${m.href}" style="text-decoration:none;border:0;display:inline-block;vertical-align:middle;margin-right:${i === arr.length - 1 ? 0 : 10}px;">` +
      `<img src="${ASSETS}/${m.file}" width="${m.w}" height="${m.h}" alt="${esc(m.alt)}" title="${esc(m.alt)}" ` +
      `style="display:inline-block;border:0;outline:none;width:${m.w}px;height:${m.h}px;vertical-align:middle;"></a>`,
  ).join("");

const present = (list) => list.filter((m) => existsSync(join(ROOT, "public", "sig", m.file)));

const marksRow = () =>
  present(MARKS).map(
    (m, i, arr) =>
      `<td valign="middle" style="padding:0 ${i === arr.length - 1 ? 0 : 10}px 0 0;">` +
      `<a href="${m.href}" style="text-decoration:none;border:0;">` +
      `<img src="${ASSETS}/${m.file}" width="${m.w}" height="${m.h}" alt="${esc(m.alt)}" title="${esc(m.alt)}" ` +
      `style="display:block;border:0;outline:none;width:${m.w}px;height:${m.h}px;"></a></td>`,
  ).join("");

/* The template is heavily commented for whoever maintains it; none of that belongs in
 * a recipient's mailbox, and it is dead weight on every copy-paste into a signature
 * editor. ⛔ Leaves conditional comments alone - `<!--[if mso]>` is functional. */
const stripComments = (html) =>
  html.replace(/<!--(?!\[if)[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n");

function render(template, p) {
  const { identifiers, codes } = siteConfig;
  const sep = `<span style="color:#d3dae4;"> &middot; </span>`;
  return stripComments(
    template
    .replace(/\{\{ASSETS\}\}/g, ASSETS)
    .replace(/\{\{BASE\}\}/g, BASE)
    .replace(/\{\{PHOTO\}\}/g, p.photo)
    .replace(/\{\{NAME\}\}/g, esc(p.name))
    .replace(/\{\{TITLE\}\}/g, esc(p.title))
    .replace(/\{\{CONTACT_ROWS\}\}/g, contactRows(p))
    .replace(/\{\{CERTIFICATIONS\}\}/g, CERTIFICATIONS.map(esc).join(sep))
    .replace(
      /\{\{IDENTIFIERS\}\}/g,
      [
        `UEI ${identifiers.uei}`,
        `CAGE ${identifiers.cage}`,
        `D-U-N-S ${identifiers.duns}`,
        `NAICS ${codes.naics[0]}`,
      ]
        .map(esc)
        .join(sep),
    )
    .replace(/\{\{MARKS\}\}/g, marksRow())
    .replace(/\{\{PARTNERS\}\}/g, partnersRow())
    .replace(/\{\{SF_LISTING\}\}/g, SF_LISTING),
  );
}

/* Classic Outlook reads a signature as a complete document, not a fragment. */
const wrap = (name, body) =>
  `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>${esc(name)}</title></head>\n` +
  `<body style="margin:0;padding:0;">\n${body}\n</body></html>\n`;

/**
 * ⛔ THE INSTALL WRAPPER IS NOT THE SAME DOCUMENT. A plain <html><head> file loads and
 * displays fine in Outlook — the first install proved that, the text all arrived — but
 * every image was silently dropped from the sent mail (`hasAttachments: false`).
 *
 * Outlook does not scan the body for images to package. It reads a Word manifest:
 * `<link rel=File-List>` pointing at a filelist.xml that names every supporting file.
 * Without it Word treats the images as external references it does not own, and they
 * are neither embedded nor linked — they just vanish. Copied from the structure of the
 * working `SBA (…).htm` that Outlook itself wrote; `AllowPNG` is from the same file and
 * keeps Word from converting the PNGs.
 */
const wrapForOutlook = (name, body) =>
  `<html xmlns:v="urn:schemas-microsoft-com:vml"\n` +
  `xmlns:o="urn:schemas-microsoft-com:office:office"\n` +
  `xmlns:w="urn:schemas-microsoft-com:office:word"\n` +
  `xmlns="http://www.w3.org/TR/REC-html40">\n` +
  `<head>\n` +
  `<meta http-equiv=Content-Type content="text/html; charset=utf-8">\n` +
  `<meta name=ProgId content=Word.Document>\n` +
  `<meta name=Generator content="Microsoft Word 15">\n` +
  `<meta name=Originator content="Microsoft Word 15">\n` +
  `<!--[if gte mso 9]><xml>\n <o:OfficeDocumentSettings>\n  <o:AllowPNG/>\n </o:OfficeDocumentSettings>\n</xml><![endif]-->\n` +
  `<title>${esc(name)}</title>\n</head>\n` +
  `<body lang=EN-US style="margin:0;padding:0;">\n${body}\n</body></html>\n`;

// --- assets ----------------------------------------------------------------

/**
 * Rebuild everything public/sig/ serves. Rarely run, but it has to exist: without
 * it the crop and the icon weights live only in someone's shell history.
 *
 * Icons are drawn at 32px (2x the 16px display box) from lucide's __iconNode data
 * rather than redrawn by hand. Headshots are circle-cropped with content-aware
 * placement — a blind centre crop puts the frame on the chest of anyone standing
 * off-centre. 8-bit palette PNG because a circle needs alpha and 24-bit costs 105KB.
 */
async function buildAssets() {
  const sharp = (await import("sharp")).default;
  const dir = join(ROOT, "public", "sig");
  mkdirSync(dir, { recursive: true });

  const STROKE = "#5a6b7d"; // ink3, 5.48:1 on white. The icons label the data; they must not outshout it.
  for (const [file] of Object.values(ICONS)) {
    const { __iconNode } = await import(`lucide-react/dist/esm/icons/${file}.js`);
    const body = __iconNode
      .map(([tag, props]) =>
        `<${tag} ${Object.entries(props)
          .filter(([k]) => k !== "key")
          .map(([k, v]) => `${k}="${v}"`)
          .join(" ")}/>`,
      )
      .join("");
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" ` +
      `stroke="${STROKE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(dir, `i-${file}.png`));
  }

  const BRAND =
    "C:/Users/User/OneDrive - One Algorithm LLC/One Algorithm LLC – Corporate Records/10_Strategy_and_Planning/01_Marketing/Brand_Assets";
  const HEADSHOTS = {
    lou: "/Website Pics/Louis rubino.png",
    swapna: "/Website Pics/Swapna Amirisetti.png",
    sreenivas: "/Website Pics/Sreenivas Amirisetti.png",
    sahith: "/Website Pics/Sahith Valluru.png",
  };
  const D = 208; // 2x the 104px display box
  const r = D / 2;
  const circle = Buffer.from(`<svg width="${D}" height="${D}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`);
  // A ring baked into the PNG. ⛔ Not a CSS border: Word will not round one, so a square
  // border around a circular photo is what Outlook would have drawn.
  const ring = Buffer.from(
    `<svg width="${D}" height="${D}"><circle cx="${r}" cy="${r}" r="${r - 2}" fill="none" stroke="#d3dae4" stroke-width="4"/></svg>`,
  );
  for (const [slug, file] of Object.entries(HEADSHOTS)) {
    const person = TEAM.find((t) => t.photo === `${slug}-circle.png`);
    let img = sharp(BRAND + file);
    if (person?.crop) img = img.extract(person.crop).resize(D, D);
    else img = img.resize(D, D, { fit: "cover", position: sharp.strategy.attention });
    await img
      .composite([{ input: circle, blend: "dest-in" }, { input: ring }])
      .png({ palette: true, quality: 80, effort: 10 })
      .toFile(join(dir, `${slug}-circle.png`));
  }

  const SBA =
    BRAND.replace("/10_Strategy_and_Planning/01_Marketing/Brand_Assets", "") +
    "/06_Compliance/Registrations_and_Certifications/Federal/SBA_CERT";
  for (const [src, out] of [["WOSB Certified.png", "m-sba-wosb.png"], ["EDWOSB Certified.png", "m-sba-edwosb.png"]]) {
    // extracted from decals-and-icons.zip alongside the READ-FIRST.txt quoted above
    await sharp(join(SBA, "decals", src)).resize({ height: 100 }).flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 }).toFile(join(dir, out));
  }

  /* NMSDC certified badge. ⛔ It is a dense hexagon with stacked text inside, so it
     needs a TALLER box than the wordmarks to stay legible, not a shorter one — at 46px
     it read as a coloured blob. Square badges carry less than their bounding box. */
  await sharp(
    BRAND.replace("/10_Strategy_and_Planning/01_Marketing/Brand_Assets", "") +
      "/06_Compliance/Registrations_and_Certifications/One Algorithm Certifications/Third_Party/NMSDC/NMSDC_MBE_Certified_Badge.png",
  ).resize({ height: 112 }).flatten({ background: "#ffffff" }).png({ compressionLevel: 9 }).toFile(join(dir, "m-nmsdc.png"));

  /* SWaM. ⛔ NOT publicly downloadable — SBSD gates it behind the certification portal
     plus a written permission form (sbsd@sbsd.virginia.gov), and the only copies on the
     open web are aggregator traces. Glob rather than guess a filename: it arrives from
     the portal named whatever the portal calls it (SWAM_LOGO.jpg, so far). */
  const swamDirs = [
    join(process.env.USERPROFILE || "", "Downloads"),
    BRAND.replace("/10_Strategy_and_Planning/01_Marketing/Brand_Assets", "") +
      "/06_Compliance/Registrations_and_Certifications/One Algorithm Certifications/State/Virginia",
  ];
  for (const d of swamDirs) {
    if (!existsSync(d)) continue;
    const hit = readdirSync(d).find((f) => /swam/i.test(f) && /\.(png|jpe?g|svg)$/i.test(f));
    if (!hit) continue;
    await sharp(join(d, hit)).resize({ height: 80 }).flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 }).toFile(join(dir, "m-swam.png"));
    console.log(`  swam mark built from ${join(d, hit)}`);
    break;
  }

  /* Partner marks. trim() strips each SVG's transparent padding so the pair can be
     balanced by their ink rather than their canvas. ⛔ Scale only. */
  for (const [src, out, h] of [
    ["C:/Users/User/OneDrive - One Algorithm LLC/One Algorithm LLC – Corporate Records/08_Contracts/Partners_and_Subcontractors/Zendesk/Brand/Zendesk_Logo_Primary_Coal.svg", "p-zendesk.png", 52],
    [join(ROOT, "public", "media", "logos", "salesforce.svg"), "p-salesforce.png", 36],
  ]) {
    const big = await sharp(src).resize({ height: 200 }).png().toBuffer();
    await sharp(big).trim().resize({ height: h }).flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 }).toFile(join(dir, out));
  }

  /* Official marks, at 2x the display height. ⛔ SCALE ONLY — never recolour,
     crop or redraw. WBENC's licence requires the mark be reproduced unaltered, and a
     traced logo is the defect this repo already carries 15 times over. */
  await sharp(
    BRAND.replace("/10_Strategy_and_Planning/01_Marketing/Brand_Assets", "") +
      "/06_Compliance/Registrations_and_Certifications/One Algorithm Certifications/Third_Party/WBENC/WBENC_Official_Logo.png",
  ).resize({ height: 80 }).flatten({ background: "#ffffff" }).png({ compressionLevel: 9 }).toFile(join(dir, "m-wbenc.png"));
  // ⛔ No m-salesforce here: the Salesforce partner BADGE left the certification strip
  // when Salesforce moved to the PARTNER row as its own logo (p-salesforce.png). A
  // partnership was never a certification.

  // the globe that stands in for the "o" in the wordmark, at 2x its 24px box
  await sharp(join(ROOT, "public", "globe-logo.png")).resize(48, 48).png({ compressionLevel: 9 }).toFile(join(dir, "globe.png"));

  /* The wordmark. Rendered by a headless browser rather than composed here, because it
     needs the real IBM Plex Sans; see scripts/render-wordmark.mjs for why it is a PNG. */
  const { execFileSync } = await import("node:child_process");
  execFileSync(process.execPath, [join(ROOT, "scripts", "render-wordmark.mjs")], { stdio: "inherit" });

  /* The orange accent rule, 2x of 26x3. ⛔ It has to be an image: Word gives a
     background-coloured <td> a paragraph with margin-bottom:6pt, which rendered the
     rule as a 14px orange block in Outlook. */
  await sharp({ create: { width: 52, height: 6, channels: 3, background: "#ffa634" } })
    .png({ compressionLevel: 9 }).toFile(join(dir, "rule.png"));
  console.log(`assets rebuilt -> ${dir}`);
}

if (flag("assets")) await buildAssets();

// ---------------------------------------------------------------------------

const template = readFileSync(join(ROOT, "shared", "signature-template.html"), "utf8");
mkdirSync(OUT, { recursive: true });

const built = [];
const skipped = [];

for (const p of TEAM) {
  const missing = ["title", "email"].filter((k) => !p[k]);
  if (missing.length) {
    skipped.push(`${p.name} — missing ${missing.join(", ")}`);
    continue;
  }
  const body = render(template, p);
  writeFileSync(join(OUT, `${p.slug}.htm`), wrap(p.name, body), "utf8");
  writeFileSync(join(OUT, `${p.slug}.txt`), plainText(p), "utf8");
  built.push({ ...p, body });
}

if (flag("preview")) {
  const page =
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>One Algorithm signatures</title></head>` +
    `<body style="margin:0;padding:40px;background:#f5f8fb;font-family:'IBM Plex Sans','Segoe UI',Arial,sans-serif;">` +
    built
      .map(
        (p) =>
          `<div style="max-width:640px;margin:0 auto 40px;">` +
          `<div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#5a6b7d;padding-bottom:10px;">${esc(p.name)}</div>` +
          `<div style="background:#ffffff;padding:26px;border:1px solid #e3e9f0;">` +
          `<div style="font-size:13px;line-height:20px;color:#35485c;padding-bottom:18px;">Thanks — the signed copy is attached. Happy to walk through the pricing volume this week.<br><br>Best,</div>` +
          p.body +
          `</div></div>`,
      )
      .join("") +
    `</body></html>`;
  writeFileSync(join(OUT, "preview.html"), page, "utf8");

  /* A bare page holding ONLY the signature, for Ctrl+A / Ctrl+C into the Outlook-on-the-web
   * signature editor. ⛔ That editor is the real install path on this mailbox: roaming
   * signatures live in the MAILBOX, so a file dropped in %APPDATA%\Microsoft\Signatures
   * is read once and then superseded by whatever Outlook uploaded. Paste beats file copy. */
  for (const p2 of built) {
    writeFileSync(
      join(OUT, `copy-${p2.slug}.html`),
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(p2.name)} — select all and copy</title></head>` +
        `<body style="margin:0;padding:24px;background:#ffffff;">${p2.body}</body></html>`,
      "utf8",
    );
  }
}

if (flag("install")) {
  const dir = join(process.env.APPDATA || "", "Microsoft", "Signatures");
  if (!existsSync(dir)) throw new Error(`Outlook Signatures folder not found: ${dir}`);
  const sigDir = join(ROOT, "public", "sig");

  for (const p of built) {
    // ⛔ A NEW name. Never overwrite "SBA" or "One Algorithm" — those are Louis's
    // working signatures and the old one is still on unsent drafts.
    const label = `OneAlgorithm 2026 (${p.email})`;
    /* ⛔ IMAGES MUST BE HOSTED URLs, NOT LOCAL FILES — proven the hard way 2026-08-31.
     *
     * The obvious approach is a relative `<signature>_files/` folder, the way Outlook's
     * own "SBA (…).htm" does it. It does not work here. This mailbox has ROAMING
     * SIGNATURES enabled (the M365 default: HKCU\...\Outlook\Setup     * DisableRoamingSignaturesTemporaryToggle is unset), so Outlook keeps the signature
     * in the MAILBOX and the local folder is only a cache. A local folder cannot roam,
     * so on insert Outlook strips every local-file <img> and keeps the text.
     *
     * The delivered message proved it exactly: `hasAttachments: false`, and every anchor
     * that had wrapped an image arrived empty — `<a href="...capabilities"></a>`.
     * The SBA signature survives only because Outlook authored it, which put its image
     * into the roaming store.
     *
     * So the install uses the same hosted URLs as the web build. It also means the
     * signature roams to his phone and OWA, which is what "works globally" required.
     * ⛔ Do NOT reintroduce a _files folder without first checking that toggle. */
    const body = render(template, p);

    writeFileSync(join(dir, `${label}.htm`), wrapForOutlook(p.name, body), "utf8");
    writeFileSync(join(dir, `${label}.txt`), plainText(p), "utf8");
    console.log(`  ${label}`);
  }
  console.log(`installed into ${dir} — pick it in Outlook under Signatures`);
}

console.log(`base   ${BASE}`);
console.log(`built  ${built.map((p) => p.slug).join(", ") || "(none)"} -> ${OUT}`);
if (skipped.length) console.log(`skipped:\n  ${skipped.join("\n  ")}`);

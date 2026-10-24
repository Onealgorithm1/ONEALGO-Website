// Licensed place photos for the web-design place pages (Salesforce city-hero method, cities-credits.md).
//   node scripts/wd-place-photos.mjs cand <slug> "<query>"...   -> candidates json + thumbnail sheet in CAND dir
//   node scripts/wd-place-photos.mjs build                      -> copy the 16 SF heroes, fetch+verify+crop the rest,
//      write public/places/*, client/data/wd-local/photos.ts, place-photos-credits.md; asserts byte budgets (exit 1).
// Picks (which Commons file per place, focal point, alt) live in scripts/wd-place-photos.picks.json.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('C:/Users/louis/oa-sf-redesign/node_modules/sharp'); // ponytail: borrow the SF worktree's sharp, no new dep in this repo
sharp.cache(false);
const UA = 'OneAlgoImageSourcing/1.0 (https://onealgorithm.com)';
const REPO = 'C:/Users/louis/oa-sf-redesign';
const SF = 'C:/Users/louis/onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/redesign-v2';
const RUN = 'C:/Users/louis/onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo/build-wave12';
const CAND = `${RUN}/place-photo-candidates`;
const OUT = `${REPO}/public/places`;
const ALLOW = /^(CC BY(-SA)? [1234]\.0( [A-Za-z-]+)?|CC0( 1\.0)?|Public domain)$/;
const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const api = async params => {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries({ action: 'query', format: 'json', ...params }).forEach(([a, b]) => u.searchParams.set(a, b));
  for (let t = 0; ; t++) {
    const r = await fetch(u, { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    if (t > 3) throw new Error('api ' + r.status);
    await new Promise(z => setTimeout(z, 3000 * (t + 1)));
  }
};

const mode = process.argv[2];
if (mode === 'cand') {
  const [slug, ...qs] = process.argv.slice(3);
  const seen = new Map();
  for (const q of qs) {
    const j = await api({ generator: 'search', gsrnamespace: '6', gsrlimit: '50', gsrsearch: q, prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime', iiurlwidth: '420' });
    for (const p of Object.values(j.query?.pages || {})) {
      const ii = p.imageinfo?.[0];
      if (!ii || seen.has(p.title)) continue;
      const m = ii.extmetadata || {}, lic = strip(m.LicenseShortName?.value), ar = ii.width / ii.height;
      if (ii.width < 2400 || ar < 1.3 || ar > 3.2 || !/jpeg|png|tiff/.test(ii.mime) || !ALLOW.test(lic)) continue;
      seen.set(p.title, { title: p.title, w: ii.width, h: ii.height, lic, assess: m.Assessments?.value || '', artist: strip(m.Artist?.value).slice(0, 60), thumb: ii.thumburl });
    }
  }
  const c = [...seen.values()].sort((a, b) => (!!b.assess - !!a.assess)).slice(0, 20);
  fs.mkdirSync(CAND, { recursive: true });
  fs.writeFileSync(`${CAND}/${slug}.json`, JSON.stringify(c, null, 1));
  const TW = 420, TH = 236, LH = 26, COLS = 5, tiles = [];
  for (let i = 0; i < c.length; i++) {
    try {
      const b = Buffer.from(await (await fetch(c[i].thumb, { headers: { 'User-Agent': UA } })).arrayBuffer());
      tiles.push({ i, img: await sharp(b).resize(TW, TH, { fit: 'cover' }).toBuffer() });
    } catch {}
  }
  const comp = tiles.flatMap((t, k) => {
    const x = (k % COLS) * (TW + 4), y = Math.floor(k / COLS) * (TH + LH + 4);
    const lab = `${t.i} ${c[t.i].lic} ${c[t.i].assess ? '*' : ''}`;
    return [{ input: t.img, left: x, top: y }, { input: Buffer.from(`<svg width="${TW}" height="${LH}"><rect width="100%" height="100%" fill="#111"/><text x="5" y="19" font-family="Arial" font-size="16" fill="#fff">${lab}</text></svg>`), left: x, top: y + TH }];
  });
  await sharp({ create: { width: COLS * (TW + 4), height: Math.max(1, Math.ceil(tiles.length / COLS)) * (TH + LH + 4), channels: 3, background: '#000' } })
    .composite(comp).jpeg({ quality: 70 }).toFile(`${CAND}/${slug}-sheet.jpg`);
  c.forEach((x, i) => console.log(slug, i, `${x.w}x${x.h}`, x.lic, x.assess || '-', x.title.slice(5, 90)));
  process.exit(0);
}

if (mode !== 'build') { console.error('usage: cand <slug> <q>... | build'); process.exit(2); }
// [{slug, name, sf?: SF hero slug to copy} | {slug, name, title: "File:...", fx, fy, alt, credit?}]
const PLACES = JSON.parse(fs.readFileSync(new URL('./wd-place-photos.picks.json', import.meta.url)));
const crop = (w, h, ar, fx, fy) => {
  let cw = w, ch = Math.round(w / ar);
  if (ch > h) { ch = h; cw = Math.round(h * ar); }
  return { left: Math.round((w - cw) * fx), top: Math.round((h - ch) * fy), width: cw, height: ch };
};
const kb = f => Math.round(fs.statSync(f).size / 1024);
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(`${RUN}/place-photo-originals`, { recursive: true });
const sfPicks = JSON.parse(fs.readFileSync(`${SF}/cities/picks.json`));
const sfHeroes = JSON.parse(fs.readFileSync(`${SF}/cities/heroes.json`));
const sfMeta = JSON.parse(fs.readFileSync(`${SF}/scripts/city-meta.json`));
const rows = [], fails = [];
for (const P of PLACES) {
  let rec;
  if (P.sf) { // copy, do not refetch
    const pk = sfPicks.find(x => x.slug === P.sf), h = sfHeroes.find(x => x.slug === P.sf), m = sfMeta[P.sf];
    for (const f of Object.values(h.files)) fs.copyFileSync(`${SF}/${f}`, `${OUT}/${f.split('/').pop().replace(P.sf, P.slug)}`);
    rec = { page: pk.page, artist: m.authorLabel, lic: pk.lic, licUrl: pk.licUrl, credit: m.credit, alt: P.alt || m.alt, w: pk.w, h: pk.h, sha1ok: pk.sha1ok, reused: true, focal: h.focal };
    if (kb(`${OUT}/${P.slug}-2400.avif`) > 250) { // over budget: re-encode only the 2400 AVIF from the SF original (local, not refetched)
      const box = crop(pk.w, pk.h, 16 / 9, pk.fx, pk.fy);
      const img = sharp(`${SF}/${pk.file}`, { limitInputPixels: false }).rotate().extract(box).resize(2400, 1350);
      let q = 45;
      do { await img.clone().avif({ quality: q, effort: 6 }).toFile(`${OUT}/${P.slug}-2400.avif`); q -= 5; } while (kb(`${OUT}/${P.slug}-2400.avif`) > 250 && q >= 30);
      rec.reencoded = q + 5;
    }
  } else {
    const j = await api({ titles: P.title, prop: 'imageinfo|categories', cllimit: '100', iiprop: 'url|size|sha1|extmetadata|mime|user' });
    const p = Object.values(j.query.pages)[0], ii = p.imageinfo?.[0];
    if (!ii) { fails.push(`${P.slug} no such file ${P.title}`); continue; }
    const m = ii.extmetadata, lic = strip(m.LicenseShortName?.value);
    if (!ALLOW.test(lic)) { fails.push(`${P.slug} licence not allowed: ${lic}`); continue; }
    const flags = (p.categories || []).map(x => x.title).filter(x => /deletion|disputed|unfree|copyvio|no license|license review needed/i.test(x));
    if (flags.length) fails.push(`${P.slug} flagged: ${flags.join('; ')}`);
    const dest = `${RUN}/place-photo-originals/${P.slug}.${/png$/i.test(P.title) ? 'png' : 'jpg'}`;
    let buf = fs.existsSync(dest) ? fs.readFileSync(dest) : null;
    if (!buf || crypto.createHash('sha1').update(buf).digest('hex') !== ii.sha1) {
      const r = await fetch(ii.url, { headers: { 'User-Agent': UA } });
      if (!r.ok) { fails.push(`${P.slug} download ${r.status}`); continue; }
      buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(dest, buf);
      await new Promise(z => setTimeout(z, 1200));
    }
    const sha1ok = crypto.createHash('sha1').update(buf).digest('hex') === ii.sha1;
    const artist = strip(m.Artist?.value) || ii.user, attribution = strip(m.Attribution?.value);
    const pd = /^(CC0|Public domain)/.test(lic);
    const credit = P.credit || (pd ? `Photo: ${artist} / Wikimedia Commons, ${lic === 'Public domain' ? 'public domain' : 'CC0'} (no credit required)`
      : `${attribution || artist} / Wikimedia Commons / ${lic} (cropped, resized)`);
    rec = { page: ii.descriptionurl, artist, lic, licUrl: m.LicenseUrl?.value || '', credit, alt: P.alt, w: ii.width, h: ii.height, sha1ok, sha1: ii.sha1 };
    const fx = P.fx ?? 0.5, fy = P.fy ?? 0.5;
    const hero = crop(ii.width, ii.height, 16 / 9, fx, fy);
    const heroBuf = await sharp(dest, { limitInputPixels: false }).rotate().extract(hero).toBuffer();
    for (const W of [2400, 1600]) {
      const img = sharp(heroBuf, { limitInputPixels: false }).resize(W, Math.round(W * 9 / 16));
      let q = 50;
      do { await img.clone().avif({ quality: q, effort: 6 }).toFile(`${OUT}/${P.slug}-${W}.avif`); q -= 5; }
      while (W === 2400 && kb(`${OUT}/${P.slug}-${W}.avif`) > 250 && q >= 30);
      await img.clone().webp({ quality: 72, effort: 6 }).toFile(`${OUT}/${P.slug}-${W}.webp`);
    }
    const og = crop(ii.width, ii.height, 1200 / 630, fx, fy);
    let q = 82;
    do {
      await sharp(dest, { limitInputPixels: false }).rotate().extract(og).resize(1200, 630).jpeg({ quality: q, mozjpeg: true, progressive: true }).toFile(`${OUT}/${P.slug}-og.jpg`);
      q -= 6;
    } while (kb(`${OUT}/${P.slug}-og.jpg`) > 160 && q > 40);
    rec.focal = { x: +(((hero.left + hero.width / 2) / ii.width) * 100).toFixed(1), y: +(((hero.top + hero.height / 2) / ii.height) * 100).toFixed(1) };
  }
  const sizes = Object.fromEntries(['2400.avif', '2400.webp', '1600.avif', '1600.webp', 'og.jpg'].map(s => [s, kb(`${OUT}/${P.slug}-${s}`)]));
  if (sizes['2400.avif'] > 250) fails.push(`${P.slug} 2400 AVIF ${sizes['2400.avif']} KB > 250`);
  if (sizes['og.jpg'] > 160) fails.push(`${P.slug} OG ${sizes['og.jpg']} KB > 160`);
  const md = await sharp(`${OUT}/${P.slug}-og.jpg`).metadata();
  if (md.width !== 1200 || md.height !== 630) fails.push(`${P.slug} og ${md.width}x${md.height}`);
  if (!rec.sha1ok || rec.w < 2400) fails.push(`${P.slug} sha1ok=${rec.sha1ok} w=${rec.w}`);
  if (!rec.alt || !rec.alt.includes(P.name.split(',')[0])) fails.push(`${P.slug} alt must name ${P.name}`);
  rows.push({ P, rec, sizes });
  console.log(P.slug, rec.lic, JSON.stringify(sizes));
}

const esc = s => String(s).replace(/\|/g, '\\|');
const notesFile = new URL('./wd-place-photos.notes.md', import.meta.url);
const missing = PLACES.filter(P => !rows.some(r => r.P.slug === P.slug)).map(P => P.slug);
let md = `# Place photos (web-design place pages) — credits and licences\n\n` +
  `Built ${new Date().toISOString().slice(0, 10)} by \`scripts/wd-place-photos.mjs\` (oa-wd-wave). Same method as the Salesforce city heroes (2026-10-23_sf-audit/redesign-v2/cities-credits.md): Wikimedia Commons only, licence + author + SHA-1 checked against the Commons API for every file; allowed licences CC0, public domain, CC BY, CC BY-SA (no ND/NC, no non-free).\n` +
  `Web versions are 16:9 focal-point crops: AVIF (q50, lowered only if the 2400 file would exceed 250 KB) + WebP q72 at 2400x1350 and 1600x900, plus a 1200x630 OG JPEG (<= 160 KB). Files live in \`public/places/\`.\n` +
  `Rows marked "reused" are byte-for-byte copies of the licensed Salesforce city files (not refetched). CC BY / CC BY-SA credits say "(cropped, resized)"; show each credit line in the in-site credits pop-up (licence name + URL as text). Public-domain and CC0 files need no credit; a courtesy line is given.\n\n` +
  `| Place | Files (public/places/) | Source | Author | Licence | Exact credit line | Original | Alt text |\n|---|---|---|---|---|---|---|---|\n`;
for (const { P, rec, sizes } of rows)
  md += `| ${esc(P.name)} | \`${P.slug}-{2400,1600}.{avif,webp}\`, \`${P.slug}-og.jpg\` (${sizes['2400.avif']}/${sizes['2400.webp']} KB @2400, OG ${sizes['og.jpg']} KB)${rec.reused ? `; reused from SF \`cities/${P.sf}\`` : `; SHA-1 ${rec.sha1}`} | ${rec.page} | ${esc(rec.artist)} | ${esc(rec.lic)}${rec.licUrl ? ` — ${rec.licUrl}` : ''} | ${esc(rec.credit)} | ${rec.w}x${rec.h} | ${esc(rec.alt)} |\n`;
md += `\n## Notes\n\n- Places: the ${PLACES.length} entries of page-map-webdev.json build_order (Philadelphia, Chester County, 42 metros, Pennsylvania, New Jersey, Delaware).\n- Places with no acceptable photo: ${missing.length ? missing.join(', ') : 'none'}.\n` +
  (fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8') : '');
fs.writeFileSync(`${RUN}/place-photos-credits.md`, md);

const data = Object.fromEntries(rows.map(({ P, rec }) => [P.slug, {
  avif2400: `/places/${P.slug}-2400.avif`, webp2400: `/places/${P.slug}-2400.webp`, avif1600: `/places/${P.slug}-1600.avif`, webp1600: `/places/${P.slug}-1600.webp`, og: `/places/${P.slug}-og.jpg`,
  width: 2400, height: 1350, alt: rec.alt, credit: rec.credit, licence: rec.lic, licenceUrl: rec.licUrl, source: rec.page, focal: rec.focal }]));
fs.writeFileSync(`${REPO}/client/data/wd-local/photos.ts`, `/* Licensed place photos for the web-design place pages. GENERATED by scripts/wd-place-photos.mjs; do not hand-edit.
 * Credits and licences: build-wave12/place-photos-credits.md. A slug missing here renders the RegionPlate schematic (TKTK-photo). */
export type PlacePhoto = {
  /** Public paths (served from /places/). */
  avif2400: string; webp2400: string; avif1600: string; webp1600: string; og: string;
  width: 2400; height: 1350;
  /** Alt text naming the place. */
  alt: string;
  /** Exact credit line for the in-site credits pop-up. */
  credit: string;
  licence: string; licenceUrl: string;
  /** Commons file page. */
  source: string;
  /** Crop centre in the original, percent; use as object-position on narrow screens. */
  focal: { x: number; y: number };
};

export const PLACE_PHOTOS: Record<string, PlacePhoto> = ${JSON.stringify(data, null, 2)};
`);
if (missing.length) fails.push('no photo: ' + missing.join(', '));
if (fails.length) { console.error('SELF-CHECK FAILED:\n' + fails.join('\n')); process.exit(1); }
console.log('self-check ok:', rows.length, 'places');

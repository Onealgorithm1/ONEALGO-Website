/**
 * Every page in the sitemap must be reachable by following links.
 *
 *     node scripts/orphan-check.mjs            # checks the built output
 *     SITE=https://onealgorithm.com node scripts/orphan-check.mjs   # checks live
 *
 * A URL listed only in the sitemap is routinely left undiscovered — Google's
 * own guidance is that a sitemap is a hint, not a substitute for a link. Search
 * Console reported eight of this site's pages as orphans, four of them as
 * literally "URL is unknown to Google", including /services and /careers.
 *
 * The cause was invisible in the source: the header's Services menu is
 * conditionally rendered (`{open && ...}`), so on a PRERENDERED page none of
 * those links exist in the HTML, and the menu's trigger is a <button> rather
 * than a link. Reading the JSX suggests the pages are linked. Reading the
 * output shows they are not — which is why this check parses the built HTML.
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist', 'spa');
const SITE = process.env.SITE || '';

const normalise = u => (u.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/');

/** Every URL the site publishes, from the sitemap it actually ships. */
function sitemapUrls() {
    const file = path.join(root, 'public', 'sitemap.xml');
    if (!fs.existsSync(file)) return [];
    const xml = fs.readFileSync(file, 'utf8');
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => normalise(m[1].trim()));
}

/** The rendered HTML for one path, from the build or the live site. */
async function htmlFor(page) {
    if (SITE) return fetch(SITE + page).then(r => r.text()).catch(() => '');
    const nested = path.join(dist, page === '/' ? 'index.html' : `${page.slice(1)}/index.html`);
    const flat = path.join(dist, page === '/' ? 'index.html' : `${page.slice(1)}.html`);
    const found = fs.existsSync(nested) ? nested : (fs.existsSync(flat) ? flat : null);
    return found ? fs.readFileSync(found, 'utf8') : '';
}

/**
 * Every internal URL reachable by CRAWLING from the homepage.
 *
 * Sampling a handful of pages was not good enough and produced false orphans:
 * the industry sub-pages are linked from /industries and nowhere else, so
 * checking only /, /about and /contact reported them as unreachable when a
 * crawler would find them one hop later. This follows links transitively, which
 * is what the thing being modelled actually does.
 */
async function linkedUrls(seeds) {
    const seen = new Set();
    const queue = [...seeds];
    while (queue.length) {
        const page = queue.shift();
        if (seen.has(page)) continue;
        seen.add(page);
        const html = await htmlFor(page);
        if (!html) continue;
        for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/gi)) {
            const link = normalise(m[1]);
            // Only follow pages, not assets - a PDF has no links to give us.
            if (/\.[a-z0-9]{2,4}$/i.test(link)) { seen.add(link); continue; }
            if (!seen.has(link)) queue.push(link);
        }
    }
    return seen;
}

const urls = sitemapUrls();
if (!urls.length) {
    console.log('No sitemap found — nothing to check.');
    process.exit(0);
}

// Start where a crawler starts, and follow links from there.
const linked = await linkedUrls(['/']);

if (!linked.size) {
    console.log('No rendered HTML found. Run `npm run build:static` first, or set SITE=https://onealgorithm.com');
    process.exit(0);
}

const orphans = urls.filter(u => !linked.has(u));

console.log(`  ${urls.length} sitemap URLs, ${urls.length - orphans.length} reachable by following links`);
for (const o of orphans) console.log(`  ORPHAN  ${o}`);

assert.strictEqual(orphans.length, 0,
    `${orphans.length} page(s) are in the sitemap and linked from nowhere a crawler can read. ` +
    `Add a real <a> to each — remember the header dropdown does not count, it is not rendered until opened.`);

console.log('\n  no orphans');

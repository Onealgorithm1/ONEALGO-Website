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

/** Every internal link a crawler would find, read from rendered HTML. */
async function linkedUrls(pages) {
    const links = new Set();
    for (const page of pages) {
        let html = '';
        if (SITE) {
            html = await fetch(SITE + page).then(r => r.text()).catch(() => '');
        } else {
            const file = path.join(dist, page === '/' ? 'index.html' : `${page.slice(1)}/index.html`);
            const flat = path.join(dist, page === '/' ? 'index.html' : `${page.slice(1)}.html`);
            const found = fs.existsSync(file) ? file : (fs.existsSync(flat) ? flat : null);
            if (!found) continue;
            html = fs.readFileSync(found, 'utf8');
        }
        for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/gi)) links.add(normalise(m[1]));
    }
    return links;
}

const urls = sitemapUrls();
if (!urls.length) {
    console.log('No sitemap found — nothing to check.');
    process.exit(0);
}

// The footer is on every page, so checking a handful is enough to see it.
const sample = ['/', '/about', '/contact'].filter(p => urls.includes(p));
const linked = await linkedUrls(sample.length ? sample : ['/']);

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

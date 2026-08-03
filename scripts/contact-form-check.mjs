/**
 * Guards the two ways the contact form could silently lose an enquiry.
 *
 *     node scripts/contact-form-check.mjs
 *
 * Both failures were real and both were invisible: the form posts into a hidden
 * iframe and shows the success message on iframe load, so it cannot tell the
 * visitor that anything went wrong. That makes "it looked like it worked" the
 * symptom of every fault, and it is why these need a test rather than a glance.
 *
 * 1. Salesforce Web-to-Lead REQUIRES last_name. The old split put everything
 *    after the first space into last_name, so a one-word name sent an empty one
 *    and Salesforce rejected the lead without telling anyone.
 *
 * 2. The form calls window.trackFormSubmission() behind a typeof guard. Nothing
 *    defined it, so no conversion event ever reached GA4 - which is why three
 *    key events are configured there and none has ever fired.
 */

import assert from 'node:assert';
import fs from 'node:fs';

let passed = 0;
const ok = (label, fn) => {
    fn();
    passed++;
    console.log(`  ok  ${label}`);
};

// --- 1. the name split, lifted from Contact.tsx ------------------------------

const contact = fs.readFileSync(new URL('../client/pages/Contact.tsx', import.meta.url), 'utf8');

/** Mirrors the mapping in Contact.tsx. Kept in step by the assertion below. */
function splitName(raw) {
    const nameParts = String(raw).trim().split(/\s+/).filter(Boolean);
    const firstName = nameParts.length > 1 ? nameParts[0] : '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0] || '';
    return {firstName, lastName};
}

ok('Contact.tsx still splits on whitespace, not a single space', () =>
    assert.ok(/split\(\/\\s\+\/\)/.test(contact),
        'the source no longer matches this check - update splitName() here to match Contact.tsx'));

for (const [input, expected] of [
    ['Bob', 'Bob'],
    ['  Bob  ', 'Bob'],
    ['Madonna', 'Madonna'],
    ['Louis Rubino', 'Rubino'],
    ['Louis  Rubino', 'Rubino'],           // double space
    ['Ana Maria Diaz Ortiz', 'Maria Diaz Ortiz']
]) {
    ok(`last_name is never empty for "${input}"`, () => {
        const {lastName} = splitName(input);
        assert.ok(lastName.length > 0, `empty last_name - Salesforce would reject this lead silently`);
        assert.strictEqual(lastName, expected);
    });
}

ok('a one-word name goes to last_name, not first_name', () => {
    const {firstName, lastName} = splitName('Bob');
    assert.strictEqual(lastName, 'Bob');
    assert.strictEqual(firstName, '', 'first_name is optional in Web-to-Lead; last_name is not');
});

// --- 2. the conversion hook --------------------------------------------------

const indexHtml = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

ok('window.trackFormSubmission is actually defined', () =>
    assert.ok(/window\.trackFormSubmission\s*=\s*function/.test(indexHtml),
        'the contact form calls this behind a typeof guard; undefined means no conversion is ever recorded'));

ok('it sends a GA4 event', () =>
    assert.ok(/gtag\(\s*["']event["']\s*,\s*["']generate_lead["']/.test(indexHtml),
        'the hook exists but sends nothing to GA4'));

ok('it stays off preview and staging hosts', () =>
    assert.ok(/trackFormSubmission[\s\S]{0,200}ANALYTICS_HOSTS\.includes/.test(indexHtml),
        'conversions from *.pages.dev builds would pollute the production property'));

ok('Contact.tsx still calls the hook', () =>
    assert.ok(/window\.trackFormSubmission\(\)/.test(contact)));

// --- 3. the Salesforce target ------------------------------------------------

ok('the form still posts to the BPO org', () =>
    assert.ok(contact.includes('00Dbn00000plgUf'),
        'the org id changed - confirm it is still the org that owns the leads'));

ok('lead_source uses a value the org actually has', () => {
    const m = /addHiddenField\("lead_source",\s*"([^"]+)"\)/.exec(contact);
    assert.ok(m, 'lead_source is no longer sent');
    // The LeadSource picklist in 00Dbn00000plgUfEAI has "Web" and does NOT have
    // "Website". Salesforce drops an invalid picklist value without erroring,
    // so the lead would arrive unattributed.
    assert.strictEqual(m[1], 'Web',
        'only "Web" exists in this org\'s LeadSource picklist; anything else is silently dropped');
});

console.log(`\n${passed} checks passed`);

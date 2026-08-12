import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, Prose, Card } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { siteConfig } from "../../shared/companyProfile";

/* Terms & Conditions — rewritten 2026-08-12.
 *
 * The old version was six short paragraphs that never named the legal entity,
 * never said what the site is, and never disclaimed the accuracy of anything on
 * it. Every substantive protection it did carry — acceptable use, intellectual
 * property, limitation of liability, third-party links, Pennsylvania governing
 * law — is still here, in plainer words. What is new is the part that was
 * missing: that the pages are marketing material rather than an offer, that
 * nothing here is a warranty, that the contact form is not a secure channel,
 * and that a certification is not a contract award.
 *
 * That last point matters more here than it looks. This firm sells to
 * government buyers, the site publishes a UEI and a CAGE code, and /about
 * already says in terms that a set-aside certification is not an award. These
 * Terms now say the same thing, so the two documents cannot be read against
 * each other.
 *
 * TKTK markers are decisions a lawyer or the owner has to make. Leave them.
 */

const LAST_UPDATED = "August 12, 2026";

const HEADING = "text-h3 font-semibold text-oa-ink scroll-mt-24 pt-6";
const LIST = "list-disc space-y-2 pl-5 marker:text-oa-ink3";
const LINK =
  "text-oa-blue underline underline-offset-4 hover:text-oa-blue700 break-words";

/* Single source for the section list — see the same note in Privacy.tsx. The
   contents list and the headings are generated from this one array, so they
   cannot drift apart. */
const SECTIONS = [
  { id: "who", title: "Who this agreement is with" },
  { id: "accept", title: "Accepting these terms" },
  { id: "what", title: "What this site is, and what it is not" },
  { id: "use", title: "How you may use the site" },
  { id: "form", title: "Sending us information" },
  { id: "ip", title: "Our content" },
  { id: "links", title: "Links to other sites" },
  { id: "warranty", title: "No warranty" },
  { id: "liability", title: "Limitation of liability" },
  { id: "law", title: "Governing law and disputes" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "How to reach us" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function H2({ id }: { id: SectionId }) {
  const { title } = SECTIONS.find((s) => s.id === id)!;
  return (
    <h2 id={id} className={HEADING}>
      {title}
    </h2>
  );
}

function Contents() {
  return (
    <nav aria-label="Contents" className="rounded-xl border border-oa-hairline bg-oa-surface p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-oa-ink3">
        Contents
      </h2>
      <ol className="mt-4 space-y-2 text-sm">
        {SECTIONS.map((s, i) => (
          /* min-h-11 (44px), not the natural 20px line box. These are the
             primary navigation for a 2,000-word legal document on a phone, and
             a 20px target fails WCAG 2.5.8 outright -- the inline-text
             exception does not apply to a list of links. The number is inside
             the anchor so the whole row is tappable rather than just the
             words. */
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex min-h-11 items-center gap-3 py-1 ${LINK}`}
            >
              <span
                className="font-mono text-oa-ink3 no-underline"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Terms() {
  useSEO({
    title: "Terms & Conditions — OneAlgorithm",
    description:
      "The terms for using onealgorithm.com: acceptable use, our content, no warranty, limitation of liability, and Pennsylvania governing law.",
    canonical: getCanonicalUrl("/terms"),
    ogTitle: "Terms & Conditions — OneAlgorithm",
    ogDescription:
      "The terms governing your use of the OneAlgorithm website.",
    ogUrl: getCanonicalUrl("/terms"),
    twitterTitle: "Terms & Conditions — OneAlgorithm",
    twitterDescription:
      "The terms governing your use of the OneAlgorithm website.",
  });

  const { legalName, address, contact } = siteConfig;

  return (
    <Layout>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions — using the OneAlgorithm website"
        meta={[
          { label: "Document", value: "OneAlgorithm Terms & Conditions" },
          { label: "Last updated", value: LAST_UPDATED },
        ]}
      />

      <Section tone="paper">
        <Prose>
          <p>
            These terms cover{" "}
            <strong className="text-oa-ink">onealgorithm.com</strong> and the
            blog at /blog. They are about using the website. They are not the
            contract for any work we do for you — that is a separate signed
            agreement, and if the two ever conflict, the signed agreement wins.
          </p>

          <div className="pt-4">
            <Contents />
          </div>

          <H2 id="who" />
          <p>
            This site is run by <strong className="text-oa-ink">{legalName}</strong>,
            trading as {siteConfig.name}, a limited liability company registered
            in Pennsylvania, United States, with its head office at{" "}
            {address.street}, {address.streetUnit}, {address.city},{" "}
            {address.region} {address.postalCode}. "We", "us" and "our" mean
            that company. "You" means you, and any organisation you are
            browsing on behalf of.
          </p>

          <H2 id="accept" />
          <p>
            By using the site you accept these terms. If you do not accept them,
            please stop using the site — that is the whole remedy on both sides.
            Your use of the site is also governed by our{" "}
            <Link to="/privacy" className={LINK}>
              Privacy Policy
            </Link>
            , which explains what we collect and who receives it.
          </p>

          <H2 id="what" />
          <p>
            This website is marketing material. It describes services we offer
            and the firm that offers them. It is not an offer to enter a
            contract, a quotation, a proposal, or professional advice you should
            act on without talking to us first. Nothing here creates a client
            relationship or an obligation to provide anything until we have both
            signed something.
          </p>
          <p>
            We try to keep the site accurate and current, but we do not promise
            that it is. Prices, availability, capabilities and descriptions can
            change, and pages can go out of date.
          </p>
          <p>
            Where we publish registrations, certifications and identifiers —
            such as our SBA WOSB/EDWOSB certification, our SAM.gov UEI, our CAGE
            code, or state supplier registrations — those are exactly what they
            say and no more. They establish eligibility. They are not contract
            awards, and we do not present them as evidence of past performance.
            Every one of them is a public record you can check for yourself, and
            the links to do so are on our{" "}
            <Link to="/about" className={LINK}>
              About
            </Link>{" "}
            page.
          </p>

          <H2 id="use" />
          <p>
            Use the site lawfully and leave it working for everyone else.
            Specifically, do not:
          </p>
          <ul className={LIST}>
            <li>
              try to gain unauthorised access to the site, its hosting, or any
              connected system;
            </li>
            <li>
              upload or transmit malware, or anything designed to interfere with
              how the site runs;
            </li>
            <li>
              overload the site with automated requests, or scrape it in a way
              that degrades it for other visitors;
            </li>
            <li>
              use the contact form or our contact details to send unsolicited
              marketing, spam, or fraudulent enquiries;
            </li>
            <li>
              impersonate anyone, or misrepresent who you are or who you work
              for;
            </li>
            <li>
              use anything on the site in a way that infringes someone else's
              rights.
            </li>
          </ul>
          <p>
            We may block access to the site from any source that does these
            things, without notice.
          </p>

          <H2 id="form" />
          <p>
            If you contact us through the form, tell us the truth: give your own
            name, an email address you control, and an accurate description of
            what you need. We rely on it to reply to the right person.
          </p>
          <p>
            The form is an ordinary business enquiry channel, not a secure one.
            Do not send passwords, payment card details, classified or
            controlled unclassified information, protected health information,
            or anyone else's personal data through it. If you need to send us
            something sensitive, call us first and we will agree a suitable way
            to do it.
          </p>
          <p>
            What happens to what you send is set out in the{" "}
            <Link to="/privacy" className={LINK}>
              Privacy Policy
            </Link>
            . In short: it goes into our CRM and a person reads it.
          </p>

          <H2 id="ip" />
          <p>
            The text, layout, graphics, logos, code and other content on this
            site belong to us or to our licensors, and are protected by
            copyright and trade mark law. The OneAlgorithm name and logo are
            ours.
          </p>
          <p>
            You may read the site, print pages, and share links to it. You may
            quote short extracts if you credit us and link back. You may not
            republish, resell, or build a substantially similar site from our
            content, and you may not remove attribution or use our name or logo
            in a way that suggests we endorse you.
          </p>
          <p>
            If we have published something that we should not have, tell us and
            we will look into it and take it down if you are right.
          </p>

          <H2 id="links" />
          <p>
            This site links to places we do not control — public registries,
            partner directories, our own social profiles, and third-party
            services. Those sites have their own terms and their own privacy
            practices, and following a link means leaving ours. We include links
            because they are useful or verifiable, not as an endorsement of
            everything on the other end, and we are not responsible for their
            content.
          </p>

          <H2 id="warranty" />
          <p>
            The site is provided as it is and as it happens to be available. To
            the fullest extent the law allows, we make no warranties of any kind
            about it — express or implied — including any implied warranty of
            merchantability, fitness for a particular purpose, non-infringement,
            accuracy, or that the site will be uninterrupted, secure, or free of
            errors and harmful code.
          </p>
          <p>
            Some jurisdictions do not allow certain warranties to be excluded.
            If yours is one of them, that exclusion does not apply to you and
            the rest of this section still stands.
          </p>

          <H2 id="liability" />
          <p>
            To the fullest extent the law allows, we are not liable for any
            indirect, incidental, special, consequential or punitive damages, or
            for lost profits, lost revenue, lost data, or business interruption,
            arising out of your use of this site or your inability to use it —
            whether the claim is in contract, negligence, or anything else, and
            even if we were told the loss was possible.
          </p>
          <p>
            Nothing in these terms limits our liability for anything that cannot
            lawfully be limited — including death or personal injury caused by
            negligence, and fraud or fraudulent misrepresentation.
          </p>
          {/* TKTK — LEGAL. There is no monetary cap on direct damages here, because
              picking one is a legal and commercial decision, not a drafting one.
              Most site terms cap aggregate liability at a small fixed sum (often
              USD 100) or at amounts paid in the preceding 12 months, which is
              nil for a visitor who has paid nothing. Counsel should decide the
              figure and whether it survives in the states this firm sells into;
              an invented number that a court strikes is worse than none. */}

          <H2 id="law" />
          <p>
            These terms are governed by the laws of the Commonwealth of
            Pennsylvania, United States, without regard to its conflict of law
            rules. Any dispute about the site or these terms goes to the state
            or federal courts located in the Commonwealth of Pennsylvania, and
            you and we both agree those courts may hear it.
          </p>
          {/* TKTK — LEGAL. Two open decisions:
              1. VENUE. Nothing in this repository evidences a specific county or
                 courthouse, so this says "the Commonwealth of Pennsylvania"
                 rather than naming one. The registered office is in Malvern,
                 Chester County, but that is an inference, not a filed choice of
                 venue — counsel should confirm before it is narrowed.
              2. ARBITRATION. No arbitration clause and no class-action waiver is
                 included, because whether to compel arbitration is a business
                 preference with real trade-offs (cheaper for small claims,
                 unusable against a government customer in some contexts) and
                 nobody here has expressed one. Decide, then add or leave out. */}

          <H2 id="changes" />
          <p>
            We update these terms when the site changes or the law does. The
            current version is always the one on this page, and the "Last
            updated" date at the top tells you when it changed. There is no
            notification list — if the terms matter to you, check the date.
            Continuing to use the site after a change means you accept the new
            version.
          </p>
          <p>
            If a court finds any part of these terms unenforceable, that part is
            removed and the rest still applies.
          </p>
          <p>This version was published on {LAST_UPDATED}.</p>

          <H2 id="contact" />
          <p>Questions about these terms:</p>
          <Card>
            <p>
              <strong className="text-oa-ink">Email:</strong>{" "}
              <a href={`mailto:${contact.emailPrimary}`} className={LINK}>
                {contact.emailPrimary}
              </a>
            </p>
            <p className="mt-2">
              <strong className="text-oa-ink">Phone:</strong>{" "}
              {contact.phonePrimary}
            </p>
            <p className="mt-2">
              <strong className="text-oa-ink">Post:</strong> {legalName},{" "}
              {address.street}, {address.streetUnit}, {address.city},{" "}
              {address.region} {address.postalCode}, USA
            </p>
          </Card>

          <div className="border-t border-oa-hairlineStrong pt-8">
            <p className="text-sm text-oa-ink3">
              © {new Date().getFullYear()} {legalName}. All rights reserved.
            </p>
          </div>
        </Prose>
      </Section>
    </Layout>
  );
}

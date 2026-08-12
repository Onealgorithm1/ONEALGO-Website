import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, Prose, Card } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { siteConfig } from "../../shared/companyProfile";

/* Privacy Policy — rewritten 2026-08-12.
 *
 * WHY IT WAS REWRITTEN
 *
 * The previous text was generic and, in three places, simply not true of this
 * website. It claimed Cloudflare Web Analytics (there is no beacon anywhere in
 * this repo), a newsletter signup (no such form exists on this site), and
 * surveys and feedback forms (there are none). It said nothing at all about
 * the things that DO happen: the contact form POSTs straight from the
 * visitor's browser to webto.salesforce.com, the contact page embeds a Google
 * Maps iframe, and GA4 fires a generate_lead event when you tap the phone
 * number. A policy that describes a site other than this one is a false
 * statement about data handling, and this firm sells to government buyers who
 * read these documents.
 *
 * Every claim below was checked against the code on 2026-08-12:
 *   index.html                  GA4 G-RC48CMQ05T, generate_lead, trackContactClick
 *   client/pages/Contact.tsx    the six form fields, Turnstile, the honeypot, the map
 *   functions/api/lead.js       siteverify, then a server-side POST to Salesforce
 *   client/global.css           fonts are genuinely self-hosted (real woff2)
 *   public/_headers             no cookies set by the edge config itself
 *   client/App.tsx              Sentry is present but dormant — see the note below
 *
 * ⚠️ The contact form's route changed on 2026-08-12, and this document was
 * corrected mid-rewrite because of it. It used to POST from the visitor's
 * browser straight to webto.salesforce.com, which meant Salesforce saw every
 * submitter's IP address and the page they submitted from. It now posts to
 * /api/lead on this domain, which forwards server-side. That is a different
 * disclosure, not a rewording. If the form's plumbing changes again, the
 * "contact form" section below is wrong until someone reads the code again.
 *
 * NOT MENTIONED, DELIBERATELY: client/App.tsx will load the Sentry browser SDK
 * from browser.sentry-cdn.com, but only if window.__SENTRY_DSN__ is set, and
 * nothing in this repo or the build ever sets it. No request is made, so there
 * is nothing to disclose. ⚠️ If a DSN is ever wired up, error reports carrying
 * URLs, browser details and IP addresses start leaving the page and this
 * document needs a paragraph about it.
 *
 * TKTK markers below are questions only a lawyer or a business decision can
 * close. They are honest gaps. Do not close them by inventing an answer.
 */

const LAST_UPDATED = "August 12, 2026";

const HEADING = "text-h3 font-semibold text-oa-ink scroll-mt-24 pt-6";
const SUBHEADING = "text-lg font-semibold text-oa-ink pt-2";
const LIST = "list-disc space-y-2 pl-5 marker:text-oa-ink3";
const LINK =
  "text-oa-blue underline underline-offset-4 hover:text-oa-blue700 break-words";

/* One source of truth for the section list. The contents list and the headings
   are both generated from this, so an anchor can never point at a heading that
   was renamed or removed — the `SectionId` union makes that a type error. */
const SECTIONS = [
  { id: "short", title: "The short version" },
  { id: "form", title: "What happens when you use the contact form" },
  { id: "browsing", title: "What we collect when you are just reading" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "embeds", title: "The map and the blog" },
  { id: "processors", title: "Who else sees your information" },
  { id: "notdo", title: "What this site does not do" },
  { id: "retention", title: "How long we keep it" },
  { id: "rights", title: "Your rights, and how to use them" },
  { id: "security", title: "Security" },
  { id: "changes", title: "Changes to this policy" },
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

/* In-page contents. This document is long, and the alternative is scrolling
   past eleven headings to find the one you came for. Plain anchor links: one
   column, no sticky rail, so it costs nothing at 390px. */
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

export default function Privacy() {
  useSEO({
    title: "Privacy Policy — OneAlgorithm",
    description:
      "Exactly what onealgorithm.com collects, who it goes to — Salesforce, Google Analytics, Cloudflare — how long we keep it, and how to get it deleted.",
    canonical: getCanonicalUrl("/privacy"),
    ogTitle: "Privacy Policy — OneAlgorithm",
    ogDescription:
      "What this website collects, who processes it, and how to exercise your rights.",
    ogUrl: getCanonicalUrl("/privacy"),
    twitterTitle: "Privacy Policy — OneAlgorithm",
    twitterDescription:
      "What this website collects, who processes it, and how to exercise your rights.",
  });

  const { legalName, address, contact } = siteConfig;

  return (
    <Layout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy — what this website does with your data"
        meta={[
          { label: "Document", value: "OneAlgorithm Privacy Policy" },
          { label: "Last updated", value: LAST_UPDATED },
        ]}
      />

      <Section tone="paper">
        <Prose>
          <p>
            This policy covers{" "}
            <strong className="text-oa-ink">onealgorithm.com</strong>, including
            the blog at /blog. It is written by {legalName} ({siteConfig.name}),
            a company registered in Pennsylvania, United States. It describes
            what this website actually does — not what a privacy policy usually
            says.
          </p>

          <div className="pt-4">
            <Contents />
          </div>

          <H2 id="short" />
          <Card>
            <ul className={LIST}>
              <li>
                If you read the site and do nothing, we get anonymous analytics
                and our hosting provider gets a normal web server record.
              </li>
              <li>
                If you fill in the contact form, your details go into our
                Salesforce CRM and we email or call you back.
              </li>
              <li>
                We do not sell your information, run advertising pixels, or
                record your screen.
              </li>
              <li>
                You can ask us to delete anything we hold about you by emailing{" "}
                <a href={`mailto:${contact.emailPrimary}`} className={LINK}>
                  {contact.emailPrimary}
                </a>
                .
              </li>
            </ul>
          </Card>

          <H2 id="form" />
          <p>
            The contact form is the only place on this site where you type
            anything about yourself. It asks for six things:
          </p>
          <ul className={LIST}>
            <li>First name</li>
            <li>Last name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>What you need — a service picked from a list</li>
            <li>A free-text message</li>
          </ul>
          <p>
            Before it sends, the form runs two anti-spam checks. The first is a
            hidden field that people never see and automated scripts fill in — if
            it has a value, the submission is discarded in your browser and
            nothing is sent anywhere. The second is{" "}
            <strong className="text-oa-ink">Cloudflare Turnstile</strong>. Your
            browser loads a small script from Cloudflare (only on the contact
            page, nowhere else on the site) and sends Cloudflare a token along
            with technical signals about the browser itself. Cloudflare checks
            it and tells us pass or fail. We receive only that answer, never the
            underlying signals. Cloudflare states that Turnstile does not use
            this data to track individuals or to target advertising.
          </p>
          <p>
            When you press send, your browser posts the six fields and that
            token to <strong className="text-oa-ink">/api/lead</strong> on this
            domain — our own code, running on Cloudflare's network. It confirms
            the token with Cloudflare, which involves sending Cloudflare your IP
            address so the token can be tied to the browser that solved it. If
            the check passes, our code forwards your details to{" "}
            <strong className="text-oa-ink">Salesforce Web-to-Lead</strong>.
          </p>
          <p>
            That forwarding happens server to server, so Salesforce receives
            what you typed but not your IP address and not the page you were
            reading. The result is a Lead record in our Salesforce CRM. We use
            it to reply to you, to work out whether we can help, and to keep
            track of the conversation if one follows. If you are in the EU or
            UK, the legal basis is taking steps at your request before entering
            a contract, together with our legitimate interest in answering
            enquiries about our own services and in keeping the form free of
            spam.
          </p>
          <p>
            You can also just email or call us. Those arrive in our normal
            company email and phone systems (Microsoft 365) and are kept like
            any other business correspondence.
          </p>

          <H2 id="browsing" />
          <p>
            This site is hosted on Cloudflare Pages, and every request to it
            passes through Cloudflare's network. As with any web host, that
            produces a server-side record containing your IP address, the page
            you asked for, the time, your browser and operating system, and the
            page that referred you. Cloudflare also uses this to tell automated
            traffic from real visitors and to absorb attacks, and it may set a
            cookie of its own for that purpose. We rely on our legitimate
            interest in keeping the site up and secure.
          </p>
          <p>
            We do not have a login, a shopping basket, or any feature that
            builds a profile of you across visits.
          </p>

          <H2 id="cookies" />
          <p>
            We use{" "}
            <strong className="text-oa-ink">Google Analytics 4</strong>{" "}
            (measurement ID G-RC48CMQ05T). It loads from Google's servers and
            sets cookies in your browser. It records which pages you look at,
            how long for, where you arrived from, your device and browser, and
            an approximate location that Google derives from your IP address.
          </p>
          <p>We also send Google three specific events:</p>
          <ul className={LIST}>
            <li>You submitted the contact form.</li>
            <li>You tapped the phone number.</li>
            <li>You tapped the email address.</li>
          </ul>
          <p>
            Each carries which of the three it was and the address of the page
            you were on. None of them carries your name, your email address, or
            anything you typed into the form. Analytics only runs on
            onealgorithm.com and www.onealgorithm.com — preview and staging
            copies of this site are silent.
          </p>
          <p>
            There is currently no cookie banner on this site, so these cookies
            are set when the page loads. If you would rather they were not, you
            can install the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            , block cookies for this site in your browser settings, or turn on
            your browser's tracking protection. Nothing on this site stops
            working if you do.
          </p>
          {/* TKTK — LEGAL. EU/UK ePrivacy rules generally require consent BEFORE
              analytics cookies are set, and this site has no consent banner.
              Closing this is a decision, not a wording change: either add a
              consent gate in index.html, or restrict GA4 so it does not run for
              EU/UK visitors, or accept the risk knowingly. The paragraph above
              states the fact without characterising it either way. */}
          {/* TKTK — BUSINESS FACT. Whether Google Signals / Google Ads linking is
              enabled on the GA4 property. If it is, analytics data can feed ad
              personalisation, which counts as "sharing" under the CPRA and would
              require a "Do Not Sell or Share My Personal Information" link. The
              CPRA section below is written on the assumption that it is OFF.
              Check the GA4 admin, then confirm or correct that section. */}

          <H2 id="embeds" />
          <p>
            <strong className="text-oa-ink">The map.</strong> Our contact page
            embeds a Google Maps frame showing our Malvern office. It only loads
            if you scroll down far enough to reach it. When it does, your
            browser connects to Google, which means Google receives your IP
            address and the fact that you were on our contact page, and may set
            its own cookies. If you never scroll to the map, none of that
            happens.
          </p>
          <p>
            <strong className="text-oa-ink">The blog.</strong> Our blog at /blog
            is a separate application built on Ghost, served under this domain
            through Cloudflare. It keeps its own server logs and sets its own
            cookies, and if you sign up there to get posts by email, it stores
            the address you give it. Unsubscribe links are in every email it
            sends.
          </p>
          {/* TKTK — BUSINESS FACT. Name the company that hosts the Ghost instance,
              so this policy names every processor rather than describing one.
              Ghost is not hosted from this repository, so it cannot be
              established from the code here. Add it to the processor list below
              once confirmed. */}

          <H2 id="processors" />
          <p>
            We do not sell or rent your information. These are the companies
            that handle it on our behalf, and what each one gets:
          </p>
          <ul className={LIST}>
            <li>
              <strong className="text-oa-ink">Salesforce</strong> — everything
              you type into the contact form, but not your IP address and not
              the page you submitted from. It is our CRM.
            </li>
            <li>
              <strong className="text-oa-ink">Google</strong> — analytics about
              your visit, and, if you scroll to the map on the contact page, the
              request that loads it.
            </li>
            <li>
              <strong className="text-oa-ink">Cloudflare</strong> — every
              request to this site, as our host and network provider; the
              Turnstile bot check, including your IP address; and the form
              endpoint that passes your enquiry to Salesforce.
            </li>
            <li>
              <strong className="text-oa-ink">Ghost</strong> — anything you do
              on the blog, including a subscription email address if you give
              one.
            </li>
            <li>
              <strong className="text-oa-ink">Microsoft</strong> — email and
              calls you send us directly, because our company email runs on
              Microsoft 365.
            </li>
          </ul>
          <p>
            Beyond those, we will disclose information if the law requires it,
            if we need to defend our legal rights, or if the business is sold or
            merged — in which case the buyer inherits this policy until they
            publish their own. Anything else needs your say-so.
          </p>
          {/* TKTK — LEGAL / CONTRACTS. Whether a signed Data Processing Agreement
              exists with each processor above, and what mechanism covers
              transfers of EU/UK personal data to the United States (Standard
              Contractual Clauses, the EU-US Data Privacy Framework, or neither).
              Every one of these vendors publishes standard terms that can be
              accepted; whether this company has accepted them is a fact nobody
              here can check from the code. The EU/UK section below therefore
              describes where the data goes and stops short of naming a
              safeguard. */}

          <H2 id="notdo" />
          <ul className={LIST}>
            <li>
              We do not sell or rent personal information, and we never have.
            </li>
            <li>
              There are no advertising or social pixels on this site — no Meta,
              no LinkedIn, no TikTok, no retargeting tags.
            </li>
            <li>
              There is no session recording, no heatmap tool, and no chat widget
              watching what you type.
            </li>
            <li>
              Our fonts are served from this domain, not from Google Fonts, so
              reading the site does not send your IP address to a font provider.
            </li>
            <li>
              This site is not aimed at children, and we do not knowingly
              collect information from anyone under 13. If you believe a child
              has sent us something, email us and we will delete it.
            </li>
          </ul>

          <H2 id="retention" />
          <p>
            We have not set a fixed retention schedule. Enquiries stay in our
            Salesforce CRM until we delete them, because a business enquiry can
            turn into a live conversation years later. Analytics data is kept
            for as long as the retention setting on our Google Analytics
            property allows, which Google enforces. Cloudflare and Ghost keep
            their logs on their own schedules.
          </p>
          <p>
            We would rather tell you that a period is undefined than print a
            number we do not actually enforce. If you want your record removed,
            ask and we will remove it.
          </p>
          {/* TKTK — BUSINESS DECISION. Set an actual retention period for Lead and
              Contact records in Salesforce (e.g. delete or anonymise dead leads
              after N years) and state it here. Until someone decides the number
              AND something enforces it, the honest wording above stands. Do not
              replace it with a figure that no process implements. */}

          <H2 id="rights" />
          <p>
            Wherever you live, you can ask us to show you what we hold about
            you, correct it, or delete it. Email{" "}
            <a href={`mailto:${contact.emailPrimary}`} className={LINK}>
              {contact.emailPrimary}
            </a>{" "}
            with "Privacy request" in the subject line and tell us what you
            want. We may need to ask a question or two to confirm you are the
            person the record is about. We do not charge for this, and asking
            will not change how we treat you.
          </p>
          {/* TKTK — BUSINESS FACT. Who owns privacy requests day to day, and what
              response time can actually be met? CCPA allows 45 days and the GDPR
              30, but a statutory maximum is not a commitment this company has
              made, so no timeframe is promised above. Name an owner and a target,
              then state it here. */}

          <h3 className={SUBHEADING}>If you are in California</h3>
          <p>
            Under the CCPA as amended by the CPRA, the categories of personal
            information this site collects are identifiers (name, email address,
            employer, IP address), internet activity (pages viewed, referrer),
            approximate geolocation derived from your IP address, and whatever
            you choose to write in the message box. It comes from you directly,
            or from your browser as you use the site. We collect it to respond
            to enquiries, provide our services, keep the site working, and meet
            legal obligations.
          </p>
          <p>
            You have the right to know what we have collected, to have it
            deleted, to have it corrected, and not to be discriminated against
            for asking. You may use an authorised agent. We do not sell personal
            information, and we do not share it for cross-context behavioural
            advertising — this site runs no advertising tags. We do not use or
            disclose sensitive personal information beyond what is needed to
            provide what you asked for.
          </p>

          <h3 className={SUBHEADING}>If you are in the EU or the UK</h3>
          <p>
            We are a US company and we do not have an establishment in the EU or
            UK, but if the GDPR or UK GDPR applies to you: our legal bases are
            your request and our legitimate interests, as set out in each
            section above. You have the right to access, correct, erase,
            restrict, port, or object to our processing of your data, and to
            complain to your national data protection authority or, in the UK,
            the Information Commissioner's Office.
          </p>
          <p>
            Be aware that this website is hosted in the United States and every
            processor named above is a US company, so your data is transferred
            to and stored in the United States.
          </p>
          <p>
            We are not going to claim a certification or a compliance framework
            we do not hold. This policy describes what we do; it is not a
            statement that we have been audited against any standard.
          </p>

          <h3 className={SUBHEADING}>
            If you are in Canada, the UAE, or India
          </h3>
          <p>
            We work in those countries, but this website and everything it
            collects sit in the United States. Local law may give you rights
            beyond the ones above; if it does, ask us using the same email
            address and we will deal with your request on the same terms.
          </p>

          <H2 id="security" />
          <p>
            The site is served only over HTTPS, with HSTS, a strict referrer
            policy, and headers that stop it being framed by another site. The
            contact form travels over encrypted connections the whole way, and
            the bot check that guards it is verified by our own server rather
            than in your browser, where anyone could skip it. Access to the CRM
            is limited to people at this company who need it.
          </p>
          <p>
            No website can promise perfect security, and we are not going to.
            The contact form is a normal business enquiry channel: please do not
            send us passwords, payment details, classified or controlled
            unclassified information, or anything else you would not put in an
            ordinary email.
          </p>

          <H2 id="changes" />
          <p>
            If we change what this site does with data, we change this page and
            move the "Last updated" date at the top. There is no mailing list
            for policy changes, so the date is the thing to check. Material
            changes take effect when they are published here.
          </p>
          <p>This version was published on {LAST_UPDATED}.</p>

          <H2 id="contact" />
          <p>
            Privacy questions, or a request to see or delete your data, go to
            the same place as everything else:
          </p>
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
          <p>
            Our <Link to="/terms" className={LINK}>Terms &amp; Conditions</Link>{" "}
            cover the rest of your use of this site.
          </p>

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

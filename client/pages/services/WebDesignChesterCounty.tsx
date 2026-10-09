import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { MapPin, Search, Wrench, KeyRound, Gauge, Phone } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
  CTABand,
  Reveal,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Web design — Chester County. Added 2026-08-30.
 *
 * WHY THIS PAGE EXISTS. Search Console, 90 days to 2026-08-28: 468 impressions,
 * 59 clicks, and every one of those clicks came from someone typing "one
 * algorithm" or "one algorithm llc". Zero non-branded clicks, and not a single
 * local query anywhere in the data. The site had no page targeting a place,
 * despite the Google Business Profile serving six named counties. This is the
 * first of three pages testing whether that is the gap.
 *
 * ⛔ IT IS A TEST, NOT A CERTAINTY. Bing's keyword tool returns NO DATA for every
 * local variant we tried ("web design chester county", "web design malvern pa"
 * and the rest) — its sample is too small to measure local long tail, so nobody
 * has validated the demand. Read Search Console at 60-90 days: if local queries
 * appear, build the rest of the matrix; if they do not, stop at three.
 *
 * ⛔ NO INVENTED LOCAL PROOF. There are no Chester County client names, logos,
 * counts or testimonials on this page, because we do not have ones we can
 * publish. Every claim here is true of the firm generally: the Malvern office,
 * the service area from the GBP, the ownership terms already promised on
 * /services/website-development, and the WOSB certification. If a local case
 * study ever exists, it belongs here — until then the page argues from what the
 * work actually is, not from social proof we would have to make up.
 */

const WHAT_YOU_GET = [
  {
    icon: Wrench,
    title: "A site built for the job, not a template",
    body: "Written in HTML, CSS and TypeScript rather than assembled in a page builder. That matters most when the site has to do something specific — take a booking, quote a job, talk to the system you already run.",
  },
  {
    icon: Search,
    title: "Built so people can find it",
    body: "The build and the being-found are the same project here. Page structure, titles, headings and schema are set up while the site is being made, rather than bolted on by someone else six months later.",
  },
  {
    icon: Gauge,
    title: "Fast on a phone, on a bad connection",
    body: "Designed at 390 pixels first and opened out from there, because that is where most people will see it. Accessible to WCAG 2.1 AA, measured rather than assumed.",
  },
  {
    icon: KeyRound,
    title: "Yours outright when it is done",
    body: "The source code in your repository, the domain in your account, hosting you control. No proprietary builder you would have to keep paying to stay online, and another developer can pick it up without us.",
  },
  {
    icon: MapPin,
    title: "Close enough to sit down with",
    body: "Our office is on Swedesford Road in Malvern. Most of a build runs remotely and you review it in your own browser, but if you would rather do the first conversation across a table, that is a short drive for both of us.",
  },
  {
    icon: Phone,
    title: "One number, and a person on it",
    body: "You get the people doing the work. There is no account manager relaying questions to a team you never meet.",
  },
];

/* ⛔ This list used to enumerate fourteen towns across four bullets — Malvern,
   Paoli, Berwyn, Devon, West Chester, Exton, Downingtown and the rest. Measured
   after publishing: 24 place mentions in 673 words, 3.57% density, against 1.24%
   and 0.76% on the two sibling local pages.
   Google's keyword-stuffing policy names this shape exactly: "blocks of text
   that list cities and regions that a web page is trying to rank for."
   A visitor needs to know whether we cover them, which one sentence does. The
   town list was for the crawler, and it went. */
/* Added 2026-10-09 (GSC: pos 17-19 for "custom website designers in chester county").
   ⛔ Steps restate PROCESS and the price/schedule promise on /services/website-development;
   no new prices, durations or results. Towns are places served, never clients. */
const STEPS = [
  {
    title: "Agree what the site is for",
    body: "Who the site is talking to and what it has to make them do. If the honest answer is that a one-page site would work, we say that before anyone builds five.",
  },
  {
    title: "Scope, price and schedule in writing",
    body: "You get the price and the schedule in writing before anyone starts building. If the number is wrong for you, we will say what we would cut to get there. Your project starts when the scope is agreed, rather than joining a queue.",
  },
  {
    title: "Design in the browser",
    body: "Real type, real content, real widths, not a picture of a website. You review it on your own phone, early, rather than waiting for a reveal at the end.",
  },
  {
    title: "Build and wire it up",
    body: "The site gets written, the forms get connected to email or your CRM, the tracking goes on and the content goes in. Page titles, headings and schema are set up as part of the build.",
  },
  {
    title: "Launch, hand over, stay on",
    body: "We deploy it and check it on real devices. The source goes in your repository and the domain stays in your account, and we stay on afterwards for support.",
  },
];

const TOWNS = [
  {
    title: "Malvern",
    body: "Our office is on Swedesford Road. If you would rather have the first conversation across a table, it is a short trip.",
  },
  {
    title: "West Chester",
    body: "The county seat. For shops, restaurants and offices people visit, the site has to answer the basics fast on a phone: where you are, when you are open, how to book.",
  },
  {
    title: "Exton",
    body: "For businesses that quote jobs or take bookings, a custom site can do the specific thing a template cannot, such as sending a quote request straight into the system you already run.",
  },
  {
    title: "Chester Springs",
    body: "Trades and home services that work at the customer's property need one clear page per service and a quote form that reaches a person.",
  },
  {
    title: "Phoenixville",
    body: "Independent businesses that want a site that looks like them, not like everyone else using the same theme, and that they own outright.",
  },
];

/* ⛔ Every answer restates something already on this page or /services/website-development. */
const FAQS = [
  { q: "What makes a custom website different from a template?", a: "A custom site is written in HTML, CSS and TypeScript for your business rather than assembled in a page builder. That matters most when the site has to do something specific: take a booking, quote a job, or talk to the system you already run." },
  { q: "How much does a custom website cost in Chester County?", a: "It depends on what the site has to do. Describe the scope and you get the price and the schedule in writing before anyone starts building. If the number is wrong for you, we will say what we would cut to get there." },
  { q: "Who owns the website when it is finished?", a: "You do. The source code is in your repository, the domain is in your account and the hosting is somewhere you control. Another developer can pick it up without us." },
  { q: "Do you build WordPress sites?", a: "We write sites in HTML, CSS and TypeScript rather than a page builder, so there is no builder licence to keep paying. Where you will genuinely edit content yourself, we set up a CMS you can actually use." },
];

const COVERAGE = [
  "The whole of Chester County, and we are inside it rather than driving in",
  "The surrounding counties: Delaware, Montgomery, Bucks and Philadelphia",
  "New Castle County, Delaware, which is closer to us than most of Philadelphia",
  "Anywhere in the United States remotely, which is how most builds run anyway",
];

export default function WebDesignChesterCounty() {
  useSEO({
    title: "Custom Website Designers in Chester County, PA | OneAlgorithm",
    description:
      "Custom website designers in Chester County, PA, based in Malvern. You own the code, domain and hosting, with no licence to renew.",
    canonical: getCanonicalUrl("/services/web-design-chester-county"),
    ogTitle: "Custom Website Designers in Chester County, PA | OneAlgorithm",
    ogDescription:
      "Custom website designers in Chester County, PA, based in Malvern. You own the code, domain and hosting, with no licence to renew.",
    ogUrl: getCanonicalUrl("/services/web-design-chester-county"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Custom Website Designers in Chester County, PA | OneAlgorithm",
    twitterDescription:
      "Custom website designers in Chester County, PA, based in Malvern. You own the code, domain and hosting, with no licence to renew.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData data={createFAQSchema(FAQS)} />
      <StructuredData
        data={createServiceSchema(
          "Web Design and Development in Chester County, Pennsylvania",
          "Custom website design and development for businesses in Chester County, Pennsylvania, from an office in Malvern: accessible to WCAG 2.1 AA, built without a page builder, integrated with the systems a business already runs, and owned outright by the client.",
          "Web Design",
          "https://onealgorithm.com/services/web-design-chester-county",
        )}
      />

      {/* Google's Local Business structured-data doc: a page targeting a
          locality should carry the business itself — address, geo, hours,
          areaServed — not only the Service. Same helper the homepage,
          /services/salesforce and /services/website-development already use, so
          the entity stays consistent rather than becoming a second business. */}
      <StructuredData data={createLocalBusinessSchema()} />

      <PageHero
        eyebrow="Chester County · Malvern, PA"
        title={
          <>
            Web design in Chester County —{" "}
            <span className="text-oa-orange">built here, owned by you</span>
          </>
        }
        lede="We are a web development firm on Swedesford Road in Malvern, and we build sites for businesses in West Chester and across Chester County. Custom work rather than a template with your logo dropped into it, and when it is finished the code, the domain and the hosting are in your name — not ours."
        panel={{
          title: "What the build includes",
          items: [
            "Custom design and development, no page builder",
            "Accessible to WCAG 2.1 AA, measured",
            "Built mobile-first and tested at real widths",
            "Search structure set up during the build",
            "Code, domain and hosting in your name",
          ],
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Start a project", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What you get"
          title="What a build with us actually involves"
          lede="The same work whether you are in Malvern or Manhattan. Being nearby changes how easy the first conversation is, not what gets built."
        />
        <CardGrid columns={2} className="mt-12">
          {WHAT_YOU_GET.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Step by step"
          title="How custom website designers in Chester County should work"
          lede="This is the order a build runs in with us. You see real pages early, and nothing is built before the price and the schedule are agreed in writing."
        />
        <ol className="mt-12 space-y-8">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
            >
              <h3 className="text-lg font-semibold text-oa-ink">
                <span className="mr-3 text-oa-orange">{i + 1}.</span>
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Who it is for"
          title="Website design for Malvern, West Chester, Exton, Chester Springs and Phoenixville"
          lede="Local businesses that have outgrown a template, or never had a proper site at all. What the site needs to do first depends on how your customers reach you."
        />
        <CardGrid columns={2} className="mt-12">
          {TOWNS.map((t) => (
            <Card key={t.title} title={t.title} body={t.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid>
        <Split
          left={
            <>
              <SectionHeading
                tone="dark"
                eyebrow="Where we work"
                title="Across Chester County and the surrounding counties"
              />
              <div className="mt-8">
                <CheckList items={COVERAGE} tone="dark" />
              </div>
              <p className="mt-8 max-w-xl leading-relaxed text-oa-nightInk2">
                If you are wondering whether you are close enough: you almost
                certainly are. Being nearby changes how easy the first
                conversation is, not what gets built or how long it takes.
              </p>
              {/* "How much does a website cost" is the one demand-verified
                  question near these pages (Bing, 90d: 136 impressions; the
                  local-modified terms all measured zero) — link the existing
                  vetted answer instead of duplicating it here. */}
              <p className="mt-4 max-w-xl leading-relaxed text-oa-nightInk2">
                Wondering what it costs?{" "}
                <a
                  href="/services/website-development#faq-cost"
                  className="font-semibold text-oa-orange underline underline-offset-4"
                >
                  The straight answer is on the build page
                </a>
                . Want to be found once it is live?{" "}
                <a
                  href="/services/seo-chester-county"
                  className="font-semibold text-oa-orange underline underline-offset-4"
                >
                  Local SEO in Chester County
                </a>
                .
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Tell us what the site has to do
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                A first site, a rebuild, or a page that looks fine and converts
                nobody. Describe the scope and you get the price and the
                schedule in writing before anyone starts building. If the number
                is wrong for you, we will say what we would cut to get there.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Get a written quote</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <Section tone="paper" bordered>
        <SectionHeading eyebrow="Questions" title="What Chester County businesses ask about custom web design" />
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <div className="mt-3 md:mt-0">
                  <p className="leading-relaxed text-oa-ink2">{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        secondary={{
          label: "How a build runs",
          to: "/services/website-development",
        }}
      />
    </Layout>
  );
}

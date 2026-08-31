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
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
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
const COVERAGE = [
  "The whole of Chester County, and we are inside it rather than driving in",
  "The surrounding counties: Delaware, Montgomery, Bucks and Philadelphia",
  "New Castle County, Delaware, which is closer to us than most of Philadelphia",
  "Anywhere in the United States remotely, which is how most builds run anyway",
];

export default function WebDesignChesterCounty() {
  useSEO({
    title: "Web Design Chester County PA — OneAlgorithm",
    description:
      "Custom web design and development for Chester County businesses, from an office in Malvern. You own the code, the domain and the hosting.",
    canonical: getCanonicalUrl("/services/web-design-chester-county"),
    ogTitle: "Web Design Chester County PA — OneAlgorithm",
    ogDescription:
      "Custom websites for Chester County businesses, built in Malvern. Accessible, fast, and yours outright — no page builder and no licence to renew.",
    ogUrl: getCanonicalUrl("/services/web-design-chester-county"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Web Design Chester County PA — OneAlgorithm",
    twitterDescription:
      "Custom websites for Chester County businesses, built in Malvern. Yours outright, with no page builder and no licence to renew.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
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
        lede="We are a web development firm on Swedesford Road in Malvern, and we build sites for businesses across Chester County. Custom work rather than a template with your logo dropped into it, and when it is finished the code, the domain and the hosting are in your name — not ours."
        panel={{
          title: "What the build includes",
          items: [
            "Custom design and development, no page builder",
            "Accessible to WCAG 2.1 AA, measured",
            "Built mobile-first and tested at real widths",
            "Search structure set up during the build",
            "Code, domain and hosting in your name",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
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

      <CTABand
        secondary={{
          label: "How a build runs",
          to: "/services/website-development",
        }}
      />
    </Layout>
  );
}

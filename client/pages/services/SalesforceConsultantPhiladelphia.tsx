import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Users, ClipboardCheck, Workflow, Plug, MapPin, Phone } from "lucide-react";
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

/* Salesforce consulting — Philadelphia. Added 2026-09-01. First of three
 * Salesforce local pages (Philadelphia / Chester County / Pennsylvania).
 *
 * WHY THESE THREE EXIST, AND WHY THEY ARE NOT THE SAME PAGE THREE TIMES.
 * Live SERP check 2026-08-31: no Accenture, Deloitte, Slalom or IBM appears
 * anywhere in the local Salesforce results — that tier does not compete for
 * local terms. The competition is boutique firms plus directories, and on the
 * tighter geographies (Malvern, Chester County) between one and three organic
 * slots are taken by Indeed / ZipRecruiter / LinkedIn JOB ADS. The winning
 * competitor pattern is explicit and copyable: a place-named page carrying an
 * FAQ.
 *
 * ⛔ THREE NEAR-IDENTICAL CITY PAGES WOULD BE DOORWAY PAGES and Google treats
 * them as such. So the split is by BUYER, not by place name:
 *   - Philadelphia (this page) — already owns Salesforce, often has an in-house
 *     admin, and the org is not earning its keep.
 *   - Chester County — smaller firms, often still CHOOSING, at risk of buying
 *     the wrong edition. Carries the licence arithmetic.
 *   - Pennsylvania — "is there a real Salesforce partner near me, and how would
 *     I check?" Carries what a Consulting Partner is and how to verify one.
 * ⛔ No FAQ question is repeated across the three. If you add one, check the
 * other two first.
 *
 * ⛔ WE ARE NOT IN PHILADELPHIA and this page does not pretend to be — same rule
 * as WebDesignPhiladelphia.tsx. The office is in Malvern, about 25 miles west,
 * and the page says so in the lede. It is checkable in one second and the
 * Google Business Profile would contradict any other claim immediately.
 *
 * ⛔ NO INVENTED LOCAL PROOF. No Philadelphia client names, logos, counts or
 * testimonials, because none exist that we can publish. Every claim here is
 * true of the firm generally: the Malvern office, the AppExchange record, and
 * the free review already offered on /services/salesforce.
 *
 * ⛔ NO TOWN LISTS. A block of place names is the exact shape Google's
 * keyword-stuffing policy names ("blocks of text that list cities and regions
 * that a web page is trying to rank for"); one such list was already removed
 * from WebDesignChesterCounty.tsx for measuring 3.57% place density. One
 * sentence tells a visitor whether they are covered. That is enough.
 */

const CITY_ENGAGEMENTS = [
  {
    icon: Workflow,
    title: "An org that grew sideways",
    body: "Fields nobody fills, three ways to record the same thing, and reports leadership has quietly stopped opening. Usually the result of five years of small changes rather than one bad decision.",
  },
  {
    icon: Users,
    title: "Working alongside your admin",
    body: "Plenty of city firms already have someone running Salesforce. We are not there to replace them. The common split is that they keep the day-to-day and we take the piece that needs a specialism they were never hired for.",
  },
  {
    icon: Plug,
    title: "The integration that fails quietly",
    body: "A sync between Salesforce and the ERP, the finance system or the warehouse that broke months ago and told nobody. Finding these is usually the fastest money we save anyone.",
  },
  {
    icon: ClipboardCheck,
    title: "A build somebody else left",
    body: "Inherited orgs are normal and we do not editorialise about the last firm. We tell you what is there, what is worth keeping and what is costing you, then you decide.",
  },
];

/* ⛔ Every line here has to stay true if a reader checks it. "25 miles west" is
   the same figure already published on /services/web-design-philadelphia. */
const HONEST = [
  "Our office is in Malvern, about 25 miles west of Center City",
  "Most of the work runs remotely, which is how Salesforce work runs anyway",
  "We will come into the city for the conversations that are better in person",
  "You deal with the people doing the work, not an account manager",
];

/* ⛔ These three questions are asked ONLY on this page. "What does a Salesforce
   consultant do?" is a real Google People-Also-Ask question, observed live on
   2026-08-31 on both `salesforce consultant` and `do i need a salesforce
   consultant`. The cost questions deliberately live on the Chester County page
   and the partner-definition questions on the Pennsylvania page. */
const FAQS = [
  {
    q: "What does a Salesforce consultant actually do?",
    a: "Three things, mostly. Works out what your business process really is, including the workarounds nobody documents. Configures Salesforce around that rather than the other way round. Then hands over an org your own people can run without calling anyone. Where it goes wrong is when a consultant does the middle part without the first, which is how you end up with a technically correct system nobody uses.",
  },
  {
    q: "We already have a Salesforce admin. What would you actually add?",
    a: "A specialism, not a replacement. An admin keeps the org running day to day and is usually very good at it. What most admins have not been given is time or cover for the deeper Platform work — Flow that replaces manual steps, permission sets doing a profile's job, integrations that fail silently. That is where our bench sits: 38 of our 52 Salesforce certifications are on the Platform competency. Your admin usually knows exactly what is wrong and has not had the room to fix it.",
  },
  {
    q: "Are you actually in Philadelphia?",
    a: "No, and we would rather say so than put a city phone number on the page. We are on Swedesford Road in Malvern, roughly 25 miles west of Center City. In practice it changes nothing about how the work runs, because Salesforce work is done in the org rather than in a room — but if you would rather sit down with someone, that is a short drive and we will make it.",
  },
];

export default function SalesforceConsultantPhiladelphia() {
  useSEO({
    /* Query-first, brand last, per Google's own title-link guidance — the same
       convention the 13 pages retitled on 2026-08-31 follow. 59 characters. */
    title: "Salesforce Consultant Philadelphia | OneAlgorithm",
    description:
      "Salesforce consulting for Philadelphia companies from a listed AppExchange Consulting Partner in Malvern. Fix an org that is not earning its keep, free one-week review.",
    canonical: getCanonicalUrl("/services/salesforce-consultant-philadelphia"),
    ogTitle: "Salesforce Consultant Philadelphia — OneAlgorithm",
    ogDescription:
      "Salesforce consulting for Philadelphia companies, from an office 25 miles west in Malvern. Sales and Service Cloud, Flow automation, integrations, and a free one-week org review.",
    ogUrl: getCanonicalUrl("/services/salesforce-consultant-philadelphia"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Consultant Philadelphia — OneAlgorithm",
    twitterDescription:
      "Salesforce consulting for Philadelphia companies from a listed AppExchange Consulting Partner in Malvern. Free one-week org review.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Philadelphia, Pennsylvania",
          "Salesforce consulting for companies in Philadelphia from a listed AppExchange Consulting Partner: Sales Cloud and Service Cloud configuration, Flow automation, permission and integration work, data migration, and a free one-week review of an existing org. Delivered from an office in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-consultant-philadelphia",
        )}
      />
      {/* A page targeting a locality carries the BUSINESS as well as the
          Service — address, geo, areaServed. Same helper as the homepage and
          /services/salesforce, so the entity never forks into a second
          business. ⛔ The scriptId collision that silently dropped one of two
          schemas per page was fixed in StructuredData.tsx on 2026-08-24; do not
          reintroduce a second schema keyed on the same id. */}
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Philadelphia"
        title={
          <>
            Salesforce consulting for{" "}
            <span className="text-oa-orange">Philadelphia companies</span>
          </>
        }
        lede="Most people who call us already own Salesforce and suspect it is not earning what they pay for it. We are a listed AppExchange Consulting Partner working from Malvern, about 25 miles west of Center City."
        panel={{
          title: "Salesforce's record of us",
          items: [
            "16 Salesforce-certified people",
            "52 certifications, 38 on Platform",
            "Listed AppExchange Consulting Partner",
            "Free one-week review of your org",
          ],
        }}
        primary={{ label: "Get a free org review", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What the work usually is"
          title="Four things city engagements almost always turn out to be"
          lede="Rarely a fresh install. Usually an org with five years of history in it and nobody left who remembers why."
        />
        <CardGrid columns={2} className="mt-12">
          {CITY_ENGAGEMENTS.map((c) => (
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
                eyebrow="Straight about it"
                title="We are not a Center City firm"
              />
              <div className="mt-8">
                <CheckList items={HONEST} tone="dark" />
              </div>
              <p className="mt-8 max-w-xl leading-relaxed text-oa-nightInk2">
                Plenty of firms carry a Philadelphia number and work from
                somewhere else entirely. We would rather tell you where we sit
                and let you decide whether it matters.
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Start with the org you already have
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                A free, fixed, one-week look at your Salesforce: licences
                against actual use, data quality, what is still done by hand,
                who can see what, and which integrations fail quietly. You get a
                written, ranked list and no obligation attached to it.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Get a free org review</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Questions"
          title="What Philadelphia callers ask first"
        />
        {/* Real <h3>s rather than a <dl>: wrapping each pair in Reveal puts a
            div between the list and its dt/dd, which axe flags as
            dlitem/definition-list. The FAQPage schema carries the pairing
            regardless, and the questions join the heading outline. */}
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Tell us what your Salesforce is doing wrong"
        body="An org nobody trusts the data in, a migration that stalled, or a renewal you are not sure you should sign. Describe the symptom and we will tell you what we would look at first."
        primary={{ label: "Get a free org review", to: "/contact" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}

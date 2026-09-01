import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Search, BadgeCheck, ListChecks, Globe2 } from "lucide-react";
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

/* Salesforce Consulting Partner — Pennsylvania. Added 2026-09-01. Third of
 * three. Read the header of SalesforceConsultantPhiladelphia.tsx first for the
 * strategy, the doorway-page rule and the no-town-list rule.
 *
 * THIS PAGE'S DISTINCT JOB: the buyer asking "what even is a Salesforce
 * Consulting Partner, and how would I know if one is real?" That is the
 * best-evidenced question we found — "What is a Salesforce consulting partner?"
 * appeared in THREE separate live Google People-Also-Ask boxes on 2026-08-31
 * (on `salesforce implementation partner`, `salesforce consulting partner vs
 * freelancer` and `salesforce consulting partner`). Nobody in the category
 * answers it properly.
 *
 * ⭐ THE HOW-TO-VERIFY SECTION IS THE POINT OF THIS PAGE. It teaches a reader
 * to check ANY partner, including us, and it names the things our own listing
 * does NOT have. That is the whole trust mechanism: a page that only flatters
 * us would be worth nothing, and a reader who follows these steps ends up on
 * our AppExchange record anyway.
 *
 * ⛔ EVERY FACT IN THAT SECTION WAS VERIFIED and several are commonly got
 * wrong. Partner tiers are Provisional / Select / Summit — NOT the old
 * Base/Ridge/Crest/Summit. Only Summit partners display a tier badge. An
 * Accredited competency needs 2+ Salesforce-verified projects, CSAT >= 4.0 AND
 * 4+ certifications in that competency, which is why 52 certifications alone
 * earn none. Salesforce certifies INDIVIDUALS, never companies — "certified
 * partner" as a company status does not exist. Do not soften any of this.
 *
 * ⛔ We have no customer ratings on the listing and the page says so. Removing
 * that line would break the section's credibility, which is its only asset.
 */

const HOW_TO_CHECK = [
  {
    icon: Search,
    title: "Find them on the AppExchange",
    body: "Salesforce runs its own public register of consulting partners. Search the firm's name there and open the Consultants tab. If a company describing itself as a Salesforce partner has no listing at all, that is worth asking about.",
  },
  {
    icon: ListChecks,
    title: "Read the certification count, not the adjective",
    body: "A real listing shows how many certified people the firm has and how many certifications they hold between them, broken down by competency. Those numbers are published by Salesforce, not written by the partner, which is what makes them worth reading.",
  },
  {
    icon: BadgeCheck,
    title: "Know what the badges do and do not mean",
    body: "Partner tiers are Provisional, Select and Summit, and only Summit partners display a tier badge. A competency badge — Accredited or Expert — needs Salesforce-verified projects and a customer satisfaction score, not just certifications. A dash in a competency row means nothing has been earned there yet.",
  },
  {
    icon: Globe2,
    title: "Check who the certifications belong to",
    body: "Salesforce certifies people, not companies, so there is no such thing as a 'certified partner' firm. A partner with a large certification count and a small team is telling you something different from one with the same count across fifty people. Ask which.",
  },
];

/* ⛔ True of our own listing, stated plainly. This list is what stops the
   section above reading as marketing. Do not trim it. */
const OUR_RECORD = [
  "16 certified people and 52 certifications, published by Salesforce",
  "38 of those certifications are on the Platform competency",
  "No tier badge — we are not a Summit partner and do not claim to be",
  "No competency badges earned yet; certifications alone do not earn one",
  "No customer ratings on the listing — nobody has reviewed us there",
];

/* ⛔ Asked ONLY here. Partner-definition and verification questions live on this
   page; cost lives on Chester County; consultant-role lives on Philadelphia. */
const FAQS = [
  {
    q: "What is a Salesforce Consulting Partner?",
    a: "A firm that Salesforce has admitted to its consulting partner programme and lists in its own public register on the AppExchange. The listing is the meaningful part: Salesforce publishes how many certified people the firm has, how many certifications they hold and in which competencies, and any customer ratings. It is not a quality guarantee — it is a record you can check rather than a claim you have to take on trust.",
  },
  {
    q: "How do I tell a partner from a freelancer, and does it matter?",
    a: "A freelancer can be excellent and is often cheaper. What a listed partner gives you is a public record and, usually, cover — someone else who can pick the work up. The honest test is not the label but the answer to two questions: who specifically will do the work, and what happens to your org if that person becomes unavailable. Ask both of any firm, us included.",
  },
  {
    q: "Do you have to be in Pennsylvania to work with you?",
    a: "No. Our office is on Swedesford Road in Malvern and we work with companies across the United States. Salesforce work happens inside the org rather than in a room, so location changes very little in practice — it mostly decides whether the first conversation is a video call or a drive.",
  },
];

export default function SalesforcePartnerPennsylvania() {
  useSEO({
    title: "Salesforce Consulting Partner in Pennsylvania | OneAlgorithm",
    description:
      "A listed Salesforce Consulting Partner based in Pennsylvania — and how to check any partner's record on the AppExchange before you hire one.",
    canonical: getCanonicalUrl(
      "/services/salesforce-consulting-partner-pennsylvania",
    ),
    ogTitle: "Salesforce Consulting Partner in Pennsylvania — OneAlgorithm",
    ogDescription:
      "A listed AppExchange Consulting Partner in Malvern, PA, working across Pennsylvania — plus how to verify any Salesforce partner's record before hiring.",
    ogUrl: getCanonicalUrl(
      "/services/salesforce-consulting-partner-pennsylvania",
    ),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Consulting Partner in Pennsylvania",
    twitterDescription:
      "A listed AppExchange Consulting Partner in Malvern, PA — and how to check any partner's record before you hire one.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting Partner Services in Pennsylvania",
          "A listed AppExchange Salesforce Consulting Partner based in Malvern, Pennsylvania, working with companies across Pennsylvania and the United States: Sales Cloud and Service Cloud configuration, Flow automation, integration and data migration, and a free one-week review of an existing org.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-consulting-partner-pennsylvania",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Pennsylvania"
        title={
          <>
            A Salesforce Consulting Partner{" "}
            <span className="text-oa-orange">based in Pennsylvania</span>
          </>
        }
        lede="Salesforce keeps a public register of its consulting partners, and ours is in it. Below is how to read that register — for us, and for anyone else you are considering."
        panel={{
          title: "Our AppExchange record",
          items: [
            "16 Salesforce-certified people",
            "52 certifications, 38 on Platform",
            "Listing a0N3A00000EV7SwUAL",
            "Office in Malvern, Chester County",
          ],
        }}
        primary={{ label: "Talk to us", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Before you hire anyone"
          title="How to check a Salesforce partner is what they say"
          lede="Four steps, none of which need us. Do them to any firm you are considering, this one included."
        />
        <CardGrid columns={2} className="mt-12">
          {HOW_TO_CHECK.map((c) => (
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
                eyebrow="Our own record"
                title="What you will find when you check us"
                lede="Including the parts that are not flattering, because a page that only listed the good ones would not be worth reading."
              />
              <div className="mt-8">
                <CheckList items={OUR_RECORD} tone="dark" />
              </div>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Go and read it yourself
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                Everything above is published by Salesforce rather than by us,
                which means you can check it before you ever pick up the phone.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/services/salesforce">
                  See the full record
                </PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="Partner questions we get" />
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
        title="Check the record, then talk to us"
        body="If you are weighing up Salesforce partners in Pennsylvania, read our AppExchange listing first and call afterwards. It is a shorter conversation when you already know what we are."
        primary={{ label: "Talk to us", to: "/contact" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}

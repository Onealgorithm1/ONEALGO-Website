import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Building2, Search, Plug, KeyRound, Gauge, Clock } from "lucide-react";
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
} from "../../components/StructuredData";

/* Web design — Philadelphia. Added 2026-08-30. Second of three local pages.
 *
 * ⛔ WE ARE NOT IN PHILADELPHIA and this page does not pretend to be. The office
 * is in Malvern, about 25 miles west, and the page says so in the lede. Claiming
 * a city presence we do not have is the one thing that would make a local page
 * worse than no local page — it is checkable in a second, and the Google
 * Business Profile (a real Malvern address, service-area counties) would
 * contradict it immediately.
 *
 * See WebDesignChesterCounty.tsx for why these three pages exist and what
 * measurement decides whether more get built.
 */

const CITY_WORK = [
  {
    icon: Plug,
    title: "Sites that have to talk to something",
    body: "Most city work is not a brochure. It is a site that has to reach a booking system, a CRM, an inventory or a payment flow — and stay working when one of them changes.",
  },
  {
    icon: Search,
    title: "Findable, not just handsome",
    body: "A site nobody finds is an expensive business card. Structure, titles, headings and schema go in during the build, and we set up Search Console so you can see what it is actually ranking for.",
  },
  {
    icon: Gauge,
    title: "Fast and accessible, measured",
    body: "WCAG 2.1 AA and Core Web Vitals treated as a budget rather than an afterthought. Designed at 390 pixels first, because that is where most of your visitors will arrive.",
  },
  {
    icon: KeyRound,
    title: "You own all of it",
    body: "Source in your repository, domain in your account, hosting you control. No proprietary platform you would have to keep paying to stay online, and no accounts you are locked out of.",
  },
  {
    icon: Building2,
    title: "A firm you can actually reach",
    body: "Woman-owned, founded in 2020, four people you will meet. Not a network of subcontractors you find out about after the invoice.",
  },
  {
    icon: Clock,
    title: "A date, not a guess",
    body: "The schedule goes in writing next to the price. Across this industry the delays are almost never technical — they are content that has not been written, and we plan around that instead of pretending otherwise.",
  },
];

const HONEST = [
  "Our office is in Malvern, roughly 25 miles west of Center City.",
  "Most of a build runs remotely; you review it in your own browser as it goes.",
  "We will come into the city for a first conversation if you would rather meet.",
  "If a builder would genuinely serve you better, we will say so before quoting.",
];

export default function WebDesignPhiladelphia() {
  useSEO({
    title: "Web Design Philadelphia — OneAlgorithm",
    description:
      "Custom web design and development for Philadelphia businesses. Accessible, fast, integrated with what you already run, and yours to own outright.",
    canonical: getCanonicalUrl("/services/web-design-philadelphia"),
    ogTitle: "Web Design Philadelphia — OneAlgorithm",
    ogDescription:
      "Custom websites for Philadelphia businesses: accessible, fast, integrated with the systems you already run, and owned outright by you.",
    ogUrl: getCanonicalUrl("/services/web-design-philadelphia"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Web Design Philadelphia — OneAlgorithm",
    twitterDescription:
      "Custom websites for Philadelphia businesses. Accessible, fast, and owned outright by you.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Web Design and Development in Philadelphia, Pennsylvania",
          "Custom website design and development for businesses in Philadelphia: accessible to WCAG 2.1 AA, built without a page builder, integrated with existing booking, CRM and payment systems, and owned outright by the client. Delivered from an office in Malvern, Pennsylvania.",
          "Web Design",
          "https://onealgorithm.com/services/web-design-philadelphia",
        )}
      />

      <PageHero
        eyebrow="Philadelphia"
        title={
          <>
            Web design in Philadelphia —{" "}
            <span className="text-oa-orange">custom, and yours to keep</span>
          </>
        }
        lede="We build websites for Philadelphia businesses from an office in Malvern, about 25 miles west of Center City. Custom work rather than a template, wired to whatever already runs your business, and handed over so the code, the domain and the hosting sit in your name."
        panel={{
          title: "What the build includes",
          items: [
            "Custom design and development, no page builder",
            "Integration with booking, CRM or payments",
            "Accessible to WCAG 2.1 AA, measured",
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
          eyebrow="What we build"
          title="What city projects usually need"
          lede="Rarely just pages. Usually a site that has to connect to something and keep working when that something changes."
        />
        <CardGrid columns={2} className="mt-12">
          {CITY_WORK.map((c) => (
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
                title="We are not a Center City agency"
              />
              <div className="mt-8">
                <CheckList items={HONEST} tone="dark" />
              </div>
              <p className="mt-8 max-w-xl leading-relaxed text-oa-nightInk2">
                Plenty of firms with a Philadelphia phone number are working
                from somewhere else entirely. We would rather tell you where we
                sit and let you decide whether it matters — in our experience it
                makes no practical difference to how a project runs.
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Tell us what the site has to do
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                Scope sets the price, so describe what the site needs to do and
                you get the number and the schedule in writing before anyone
                builds anything.
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

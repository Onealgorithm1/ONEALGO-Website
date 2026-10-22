import React from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, PrimaryCTA } from "../components/site";
import { JSONLDScript } from "../components/JSONLDScript";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { usePosts, isJob, longDate, CAREERS, type Post } from "../lib/blogger";

/* /careers and /careers/:slug — job listings are Blogger posts labelled
 * "Careers" (lib/blogger.ts). Open a role: publish a post with that label.
 * Close it: revert the post to draft and it disappears here.
 *
 * Each listing carries JobPosting structured data so it can appear in
 * Google's job search. Its location is read from the "Malvern PA"-style
 * label on the post; ⚠️ no salary or employment type is published because
 * none is in the listing — add them to the post and to JobPosting together.
 */

const APPLY = "careers@onealgorithm.com";
const META = "font-mono text-[12px] uppercase tracking-wider text-oa-ink3";

// Labels other than "Careers" double as the listing's facts. A label naming a
// place ("Malvern PA") is the location; the rest are the discipline.
const placeOf = (p: Post) => p.labels.find((l) => /\b[A-Z]{2}$/.test(l)) ?? "";
const tagsOf = (p: Post) => p.labels.filter((l) => l !== CAREERS && l !== placeOf(p) && l !== "One Algorithm" && l !== "jobs");

function Job({ p }: { p: Post }) {
  return (
    <li>
      <Link to={`/careers/${p.slug}`}
        className="group grid gap-3 border-t border-oa-hairline py-7 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-oa-orange motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-h3 font-semibold text-oa-ink group-hover:text-oa-blue">{p.title}</h2>
          <p className={`${META} mt-2`}>{[placeOf(p), ...tagsOf(p)].filter(Boolean).join(" · ")}</p>
        </div>
        <p className={META}>Posted <time dateTime={p.published}>{longDate(p.published)}</time> →</p>
      </Link>
    </li>
  );
}

function List({ jobs }: { jobs: Post[] }) {
  return (
    <>
      <PageHero eyebrow="Careers" siblings={false}
        title="Work on the systems companies run on"
        lede="Open roles at OneAlgorithm, based in Malvern, Pennsylvania." />
      <Section>
        <p className={META}>{jobs.length} open {jobs.length === 1 ? "role" : "roles"}</p>
        {jobs.length ? <ul className="mt-4">{jobs.map((p) => <Job key={p.slug} p={p} />)}</ul>
          : <p className="mt-4 text-oa-ink2">No roles open right now. You are welcome to send your résumé to <a className="text-oa-blue underline" href={`mailto:${APPLY}`}>{APPLY}</a>.</p>}
      </Section>
    </>
  );
}

function Listing({ p }: { p: Post }) {
  const place = placeOf(p);
  const [city, region] = place ? [place.replace(/\s+[A-Z]{2}$/, ""), place.slice(-2)] : ["", ""];
  const apply = `mailto:${APPLY}?subject=${encodeURIComponent(`Application: ${p.title}`)}`;
  return (
    <>
      <JSONLDScript data={{
        "@context": "https://schema.org", "@type": "JobPosting",
        title: p.title.replace(/\s+[–-]\s+.*$/, ""), description: p.html, datePosted: p.published,
        hiringOrganization: { "@type": "Organization", name: "One Algorithm LLC", sameAs: "https://onealgorithm.com" },
        ...(place && { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "US" } } }),
        directApply: false,
      }} />
      <Section>
        <nav aria-label="Breadcrumb" className={META}>
          <Link to="/careers" className="hover:text-oa-blue">← All roles</Link>
        </nav>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <h1 className="text-h1 font-semibold text-oa-ink">{p.title}</h1>
            <article className="oa-article mt-10" dangerouslySetInnerHTML={{ __html: p.html }} />
          </div>
          {/* The facts panel: radius 0 like every measured element on the site. */}
          <aside className="h-fit border border-oa-hairlineStrong bg-oa-surface p-6 lg:sticky lg:top-24">
            <dl className="space-y-4">
              {place && <div><dt className={META}>Location</dt><dd className="mt-1 text-oa-ink">{place}</dd></div>}
              <div><dt className={META}>Posted</dt><dd className="mt-1 text-oa-ink"><time dateTime={p.published}>{longDate(p.published)}</time></dd></div>
              {tagsOf(p).length > 0 && <div><dt className={META}>Discipline</dt><dd className="mt-1 text-oa-ink">{tagsOf(p).join(", ")}</dd></div>}
              <div><dt className={META}>Apply</dt><dd className="mt-1 break-words text-oa-ink">Email your résumé to {APPLY}</dd></div>
            </dl>
            <PrimaryCTA href={apply} className="mt-6 w-full">Email your résumé</PrimaryCTA>
          </aside>
        </div>
      </Section>
    </>
  );
}

export default function Careers() {
  const { slug } = useParams();
  const { posts, error } = usePosts();
  const jobs = posts?.filter(isJob);
  const job = slug ? jobs?.find((p) => p.slug === slug) : undefined;

  const careersUrl = getCanonicalUrl(slug ? `/careers/${slug}` : "/careers");
  useSEO({
    title: job ? `${job.title} — Careers at OneAlgorithm` : "Careers — OneAlgorithm",
    description: job?.summary || "Open roles at OneAlgorithm in Malvern, Pennsylvania.",
    canonical: careersUrl,
    ogUrl: careersUrl,
  });

  const status = (msg: React.ReactNode) => <Section><p className="text-oa-ink2">{msg}</p></Section>;
  return (
    <Layout>
      {error ? status(`Open roles could not be loaded (${error}).`)
        : !jobs ? status("Loading…")
        : !slug ? <List jobs={jobs} />
        : !job ? status(<>That role is no longer open. <Link className="text-oa-blue underline" to="/careers">See open roles</Link></>)
        : <Listing p={job} />}
    </Layout>
  );
}

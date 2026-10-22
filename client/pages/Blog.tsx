import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero, Section, CTABand } from "../components/site";
import { JSONLDScript } from "../components/JSONLDScript";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { usePosts, isJob, longDate, type Post } from "../lib/blogger";

/* /blog and /blog/:slug — articles written in Blogger (see lib/blogger.ts).
 * Job listings share the feed but live on /careers, never here.
 *
 * Layout: newest post as a wide lead, the rest as hairline "specimen rows"
 * (the site's own row motif: 2px lift, top rule lights orange on hover).
 * Meta — date, read time, labels — is set in JetBrains Mono, like every
 * measured value elsewhere on the site.
 */

const META = "font-mono text-[12px] uppercase tracking-wider text-oa-ink3";

function Meta({ p }: { p: Post }) {
  return (
    <p className={META}>
      <time dateTime={p.published}>{longDate(p.published)}</time> · {p.minutes} min read
    </p>
  );
}

function Labels({ labels }: { labels: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {labels.map((l) => (
        <li key={l} className="border border-oa-hairlineStrong px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-oa-ink2">
          {l}
        </li>
      ))}
    </ul>
  );
}

function Lead({ p }: { p: Post }) {
  return (
    <Link to={`/blog/${p.slug}`} className="group grid gap-8 border-t border-oa-hairlineStrong pt-8 md:grid-cols-[1.15fr_1fr] md:items-center">
      {p.image && (
        <img src={p.image} alt="" width={1200} height={630} loading="eager"
          className="aspect-[1200/630] w-full rounded-[16px] border border-oa-hairline object-cover" />
      )}
      <div>
        <p className="font-mono text-[12px] uppercase tracking-wider text-oa-orangeText">Latest</p>
        <h2 className="mt-3 text-h2 font-semibold text-oa-ink group-hover:text-oa-blue">{p.title}</h2>
        <p className="mt-4 text-lede text-oa-ink2">{p.summary}…</p>
        <div className="mt-5"><Meta p={p} /></div>
      </div>
    </Link>
  );
}

function Row({ p }: { p: Post }) {
  return (
    <li>
      <Link to={`/blog/${p.slug}`}
        className="group grid gap-2 border-t border-oa-hairline py-7 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-oa-orange motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[12rem_1fr] md:gap-8">
        <Meta p={p} />
        <div>
          <h3 className="text-h3 font-semibold text-oa-ink group-hover:text-oa-blue">{p.title}</h3>
          <p className="mt-2 text-oa-ink2">{p.summary}…</p>
        </div>
      </Link>
    </li>
  );
}

function Index({ posts }: { posts: Post[] }) {
  const [topic, setTopic] = useState("");
  const topics = [...new Set(posts.flatMap((p) => p.labels))].sort();
  const shown = topic ? posts.filter((p) => p.labels.includes(topic)) : posts;
  const [lead, ...rest] = shown;
  return (
    <>
      <PageHero eyebrow="Blog" siblings={false}
        title="Notes from the work"
        lede="Case notes, measured results and straight answers from the Salesforce, website and SEO projects we run." />
      <Section>
        {topics.length > 1 && (
          <div role="group" aria-label="Filter by topic" className="mb-10 flex flex-wrap gap-2">
            {["", ...topics].map((t) => (
              <button key={t || "all"} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t}
                className={`min-h-[44px] border px-4 font-mono text-[12px] uppercase tracking-wider transition-colors ${topic === t ? "border-oa-night bg-oa-night text-oa-nightInk" : "border-oa-hairlineStrong text-oa-ink2 hover:border-oa-ink"}`}>
                {t || "All"}
              </button>
            ))}
          </div>
        )}
        {lead ? <Lead p={lead} /> : <p className="text-oa-ink2">No posts yet.</p>}
        {rest.length > 0 && <ul className="mt-12">{rest.map((p) => <Row key={p.slug} p={p} />)}</ul>}
      </Section>
      <CTABand />
    </>
  );
}

function Article({ p, related }: { p: Post; related: Post[] }) {
  const url = getCanonicalUrl(`/blog/${p.slug}`);
  return (
    <>
      <JSONLDScript data={{
        "@context": "https://schema.org", "@type": "BlogPosting",
        headline: p.title, datePublished: p.published, dateModified: p.updated,
        author: { "@type": "Organization", name: "OneAlgorithm", url: "https://onealgorithm.com" },
        publisher: { "@type": "Organization", name: "OneAlgorithm" },
        mainEntityOfPage: url, ...(p.image && { image: new URL(p.image, "https://onealgorithm.com").href }),
        keywords: p.labels.join(", "),
      }} />
      <JSONLDScript data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onealgorithm.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://onealgorithm.com/blog" },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      }} />
      <Section>
        <nav aria-label="Breadcrumb" className={META}>
          <Link to="/blog" className="hover:text-oa-blue">← Blog</Link>
        </nav>
        <header className="mt-8 max-w-[68ch]">
          <h1 className="text-h1 font-semibold text-oa-ink">{p.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-oa-hairline py-4">
            <Meta p={p} />
            {p.updated.slice(0, 10) > p.published.slice(0, 10) && (
              <p className={META}>Updated <time dateTime={p.updated}>{longDate(p.updated)}</time></p>
            )}
            <Labels labels={p.labels} />
          </div>
        </header>
        {/* Authored by our own Blogger account, not by visitors. */}
        <article className="oa-article mt-10" dangerouslySetInnerHTML={{ __html: p.html }} />
      </Section>
      {related.length > 0 && (
        <Section tone="surface">
          <h2 className="text-h3 font-semibold text-oa-ink">Keep reading</h2>
          <ul className="mt-4">{related.map((r) => <Row key={r.slug} p={r} />)}</ul>
        </Section>
      )}
      <CTABand />
    </>
  );
}

export default function Blog() {
  const { slug } = useParams();
  const { posts, error } = usePosts();
  const articles = posts?.filter((p) => !isJob(p));
  const post = slug ? articles?.find((p) => p.slug === slug) : undefined;

  useSEO({
    title: post ? `${post.title} — OneAlgorithm` : "Blog — OneAlgorithm",
    description: post?.summary || "Case notes, measured results and straight answers from OneAlgorithm's Salesforce, website and SEO projects.",
    canonical: getCanonicalUrl(slug ? `/blog/${slug}` : "/blog"),
    ...(post?.image && { ogImage: new URL(post.image, "https://onealgorithm.com").href }),
  });

  const status = (msg: React.ReactNode) => <Section><p className="text-oa-ink2">{msg}</p></Section>;
  return (
    <Layout>
      {error ? status(`The blog could not be loaded (${error}).`)
        : !articles ? status("Loading…")
        : !slug ? <Index posts={articles} />
        : !post ? status(<>Post not found. <Link className="text-oa-blue underline" to="/blog">All posts</Link></>)
        : <Article p={post} related={articles.filter((r) => r !== post && r.labels.some((l) => post.labels.includes(l))).slice(0, 2)} />}
    </Layout>
  );
}

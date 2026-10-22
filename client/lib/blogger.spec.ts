import { describe, expect, it } from "vitest";
import { toPost } from "./blogger";

function entry(contentHtml: string) {
  return {
    link: [{ rel: "alternate", href: "https://onealgorithm-blog-test.blogspot.com/2026/10/a-post.html" }],
    title: { $t: "A post" },
    content: { $t: contentHtml },
    published: { $t: "2026-10-22T00:00:00Z" },
    updated: { $t: "2026-10-22T00:00:00Z" },
    category: [],
  };
}

describe("toPost", () => {
  it("pulls a leading image out as the hero, not into the body", () => {
    const post = toPost(entry('<img src="/hero.jpg" alt="A chart">\n<p>Body text.</p>'));
    expect(post.heroImage).toBe("/hero.jpg");
    expect(post.heroAlt).toBe("A chart");
    expect(post.html).not.toContain("/hero.jpg");
    expect(post.html).toContain("Body text.");
  });

  it("leaves a post with no leading image with no hero", () => {
    const post = toPost(entry("<p>Just text, no image.</p>"));
    expect(post.heroImage).toBeUndefined();
    expect(post.html).toContain("Just text, no image.");
  });

  it("opens an external link in a new tab without losing the reader's place", () => {
    const post = toPost(entry('<p><a href="https://aclient.com/">their site</a></p>'));
    expect(post.html).toContain('target="_blank"');
    expect(post.html).toContain('rel="noopener noreferrer"');
  });

  it("leaves our own links as normal same-tab navigation", () => {
    const post = toPost(
      entry('<p><a href="https://onealgorithm.com/services/seo">SEO</a> and <a href="/services/salesforce">Salesforce</a></p>'),
    );
    expect(post.html).not.toContain("target=");
  });
});

describe("leadSentences and headings", () => {
  it("ends the summary at a sentence, never mid-word with an ellipsis", async () => {
    const { toPost } = await import("./blogger");
    const long = "First sentence here. Second one follows it. " + "Third goes on and on about the matter at hand. ".repeat(6);
    const post = toPost(entry(`<p>${long}</p>`));
    expect(post.summary).toMatch(/[.!?]$/);
    expect(post.summary).not.toContain("…");
    expect(post.summary.length).toBeLessThanOrEqual(240);
  });

  it("gives every h2 an id and lists them for the table of contents", () => {
    const post = toPost(entry("<p>Intro.</p><h2>The client</h2><p>x</p><h2>What we changed</h2>"));
    expect(post.toc).toEqual([{ id: "the-client", text: "The client" }, { id: "what-we-changed", text: "What we changed" }]);
    expect(post.html).toContain('<h2 id="the-client">');
  });
});

describe("lede promotion", () => {
  it("moves a real opening paragraph into the lede and out of the body", () => {
    const opener = "In the 68 days after we took over search, Google sent the site 2,130 clicks, up from 1,112 a year earlier.";
    const post = toPost(entry(`<p>${opener}</p><p>Second paragraph.</p>`));
    expect(post.lede).toBe(opener);
    expect(post.html).not.toContain(opener);
    expect(post.html).toContain("Second paragraph.");
  });

  it("leaves a one-line opener in the body rather than promoting it", () => {
    const post = toPost(entry("<p>Short.</p><p>Real text follows here.</p>"));
    expect(post.lede).toBeUndefined();
    expect(post.html).toContain("Short.");
  });
});

describe("splitSections", () => {
  it("keeps the opening open and folds each h2 section with its id", async () => {
    const { splitSections } = await import("./blogger");
    const secs = splitSections('<p>Lede.</p><p><strong>Why it matters:</strong> x</p><h2 id="by-the-numbers">By the numbers</h2><p>1</p><h2 id="whats-next">What\'s next</h2><ul><li>2</li></ul>');
    expect(secs.map((s) => s.id)).toEqual(["", "by-the-numbers", "whats-next"]);
    expect(secs[0].html).toContain("Why it matters");
    expect(secs[1]).toMatchObject({ title: "By the numbers" });
    expect(secs[2].html).toContain("<li>2</li>");
  });
});

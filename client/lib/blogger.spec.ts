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

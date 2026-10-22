/* One author today. A plain record, not a CMS, because there is exactly one
 * fact to hold per author and Blogger carries no author data of its own.
 * Add a new entry here the day a second person publishes under their own
 * name; attribute an individual post to them in Blog.tsx's toPost mapping
 * if posts ever need different authors (right now every post is Louis's). */
export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  photo?: string; // set once a real headshot exists (client/public, see README note below)
};

export const AUTHOR: Author = {
  slug: "louis-rubino",
  name: "Louis Rubino",
  role: "Director of Operations and Program Manager, OneAlgorithm",
  bio: "Writes the case notes and SEO reports from the Salesforce, website and automation projects OneAlgorithm runs.",
  linkedin: "https://www.linkedin.com/in/louiscrubino/", // same URL already on /about's own schema
};

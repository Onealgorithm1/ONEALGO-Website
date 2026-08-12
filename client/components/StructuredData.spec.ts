import { describe, expect, it } from "vitest";
import { createFAQSchema } from "./StructuredData";

/* The FAQ schema and the FAQ section on the page were maintained separately and
   drifted: six marked-up questions against four rendered ones, disagreeing
   answers where the topics overlapped, and three answers -- prices, delivery
   times, and platforms named nowhere else on the site -- that no visitor could
   ever see. Google's FAQPage guidance is that marked-up content must be present
   on the page, so the block was non-compliant on top of being unevidenced.

   The fix was to generate the schema from the rendered array. These tests exist
   so that stays true: they fail if anyone reintroduces a hand-written entry, and
   they fail if an answer is passed through altered. */

describe("createFAQSchema", () => {
  const faqs = [
    { q: "Where is OneAlgorithm located?", a: "Malvern, PA 19355." },
    { q: "Do you offer support after launch?", a: "Yes. Every engagement..." },
  ];

  it("emits exactly the questions it was given, and no others", () => {
    const schema = createFAQSchema(faqs);
    expect(schema.mainEntity).toHaveLength(faqs.length);
    expect(schema.mainEntity.map((e) => e.name)).toEqual(faqs.map((f) => f.q));
  });

  it("passes each answer through verbatim", () => {
    // If this ever fails, the schema is telling a search engine something
    // different from what the page shows a person.
    for (const [i, entry] of createFAQSchema(faqs).mainEntity.entries()) {
      expect(entry.acceptedAnswer.text).toBe(faqs[i].a);
    }
  });

  it("produces a valid, empty FAQPage rather than throwing on no input", () => {
    const schema = createFAQSchema([]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toEqual([]);
  });
});

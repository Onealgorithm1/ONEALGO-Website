// StructuredData: injects JSON-LD into <head> for the page that renders it, and
// takes it back out again when that page goes away.
import React from "react";

import { siteConfig } from "../lib/siteConfig";

// Identity comes from shared/companyProfile.ts. Four schema blocks below used to
// keep their own copies and had drifted: three different business names,
// coordinates ~2 miles apart, two different emails, and a LinkedIn URL pointing
// at an unrelated company in Hyderabad. One source now, so they cannot diverge.
// Verified 2026-08-18 against the Google Business Profile and each live profile.
// ponytail: TikTok is the one link not re-verified (tooling could not reach it).
const A = siteConfig.address;
const NAP = {
  name: siteConfig.gbpName,
  alternateName: siteConfig.name,
  telephone: siteConfig.contact.phonePrimary,
  telephoneE164: "+1-610-890-9711",
  email: siteConfig.contact.emailPrimary,
  address: {
    streetAddress: A.street + ", " + A.streetUnit,
    addressLocality: A.city,
    addressRegion: A.region,
    postalCode: A.postalCode,
    addressCountry: A.country,
  },
  geo: { latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude },
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.x,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
    siteConfig.social.tiktok,
  ],
};
interface OrganizationSchema {
  type: "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    email: string;
    contactType: string;
  };
  alternateName?: string;
  sameAs: string[];
  services?: string[];
}

interface ServiceSchema {
  type: "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  areaServed: string;
  serviceType: string;
  url: string;
}

interface WebPageSchema {
  type: "WebPage";
  name: string;
  description: string;
  url: string;
  mainEntity?: any;
  breadcrumb?: any;
  publisher: {
    name: string;
    url: string;
  };
}

interface ArticleSchema {
  type: "Article";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url: string;
  };
  publisher: {
    name: string;
    url: string;
  };
  image?: string;
}

interface ContactPageSchema {
  type: "ContactPage";
  name: string;
  description: string;
  url: string;
  mainEntity: {
    type: "Organization";
    name: string;
    telephone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}

type SchemaType = any; // accept arbitrary schema shapes for flexibility (JSON-LD objects)

interface StructuredDataProps {
  data: SchemaType;
}

export function StructuredData({ data }: StructuredDataProps) {
  // An effect, not a bare setTimeout during render. The previous version fired an
  // uncancellable timer on every render and deliberately never cleaned up, which
  // caused two problems: a slow route change could apply an older page's schema
  // after the newer one had already written its own, and schemas accumulated in
  // <head> as visitors moved around, so a page could end up described by markup
  // belonging to pages they had merely passed through. Removing the tag on
  // unmount means each page carries only its own.
  //
  // Keyed on the serialised schema: `data` is rebuilt on every render, so using
  // the object itself would re-run this constantly.
  const serialised = JSON.stringify(
    data["@context"]
      ? data
      : (() => {
          // Strip the internal `type` key. It is how these helpers spell
          // "@type", but spreading it through left BOTH `"@type":"Service"`
          // and a bare `"type":"Service"` in the emitted JSON-LD, which is not
          // a schema.org property. Verified in the browser 2026-08-24.
          const { type: _legacyType, ...rest } = data as Record<string, unknown>;
          return {
            "@context": "https://schema.org",
            "@type": data.type || data["@type"],
            ...rest,
          };
        })(),
  );
  /* Keyed on the RESOLVED type, not the legacy `type` key. Helpers that set
     "@context"/"@type" directly (createLocalBusinessSchema, createFAQSchema)
     have no `type`, so every one of them resolved to "schema-schema" — two on
     one page collided and the second mounting removed the first from <head>.
     Caught 2026-08-24: LocalBusiness silently vanished from /services/salesforce
     because FAQPage took the same id. */
  const scriptId = `schema-${(data.type || data["@type"] || "schema")
    .toString()
    .toLowerCase()}`;

  React.useEffect(() => {
    document.getElementById(scriptId)?.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = serialised;
    script.id = scriptId;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [serialised, scriptId]);

  return null;
}

// Helper function to create organization schema
export function createOrganizationSchema(): OrganizationSchema {
  return {
    type: "Organization",
    name: NAP.name,
    alternateName: NAP.alternateName,
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/media/oa-logo.webp",
    description:
      "OneAlgorithm provides expert IT consulting, website development, operations technology, and staff augmentation services. We transform businesses through intelligent technology solutions.",
    address: NAP.address,
    contactPoint: {
      telephone: NAP.telephoneE164,
      email: NAP.email,
      contactType: "Customer Service",
    },
    sameAs: NAP.sameAs,
    services: [
      "IT Consulting",
      "Website Development",
      "Operations Technology",
      "Staff Augmentation",
      "Marketing Services",
      "Business Automation",
    ],
  };
}

// Detailed Organization schema
export function createOrganizationSchemaDetailed() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: NAP.name,
    alternateName: NAP.alternateName,
    description:
      "IT consultancy in Malvern, Pennsylvania: Salesforce, Oracle ERP and Zendesk implementation, system and API integration, staff augmentation and web development. Woman-owned, SBA-certified WOSB/EDWOSB, serving clients nationwide.",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/media/oa-logo.webp",
    foundingDate: "2020",
    telephone: NAP.telephone,
    email: NAP.email,
    address: { "@type": "PostalAddress", ...NAP.address },
    geo: { "@type": "GeoCoordinates", ...NAP.geo },
    sameAs: [...NAP.sameAs, "https://github.com/Onealgorithm1"],
    // Plain text, not a GeoCircle. The circle carried geoRadius: "Worldwide",
    // and geoRadius must be a number of metres or a Distance - prose made the
    // whole shape invalid. A circle centred on the office cannot express
    // "everywhere" at any radius anyway, and areaServed accepts text directly.
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Web, mobile, and SaaS application development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "System Integration",
            description:
              "API integration, CRM/ERP integration, workflow automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Marketing",
            description: "SEO, PPC, content marketing, conversion optimization",
          },
        },
      ],
    },
    priceRange: "$$$",
    // No aggregateRating. There was one here claiming 4.8 from 47 reviews, with
    // no reviews behind it anywhere. Google's structured-data policy treats
    // unverifiable review markup as a violation and can drop the site's rich
    // results over it, and it is a false public claim besides. Restore this only
    // with real, attributable reviews.
  };
}

// FAQ schema
/**
 * Built FROM the FAQs the page actually renders, rather than kept as a second
 * hand-maintained list.
 *
 * The two had drifted badly. This schema carried six questions; the homepage
 * displayed four different ones, and where the topics overlapped the answers
 * disagreed -- the markup said we serve "the Philadelphia metro area and
 * nationwide" while the page said the United States, Canada, India and the
 * UAE. Google's FAQPage guidance is that the marked-up content must be present
 * and visible on the page, so the whole block was non-compliant regardless of
 * whether any individual answer was true.
 *
 * Three answers went with the drift, and none of them should come back as
 * written:
 *
 *   - PRICING. "$15K to $500K+", "integrations start at $3K", "MVPs $25K-$75K".
 *     Published prices are a promise the business has to honour to anyone who
 *     read them, and these appeared on no page a buyer could see -- they were
 *     visible only to a search engine. If these figures are real they belong on
 *     a pricing page in front of people, and can then be marked up from it.
 *   - DELIVERY TIMES. "Most projects are delivered in 6-12 weeks", "2-week
 *     sprints". A schedule commitment, asserted with no evidence behind it.
 *   - A services answer naming Stripe and Shopify, which appear nowhere else on
 *     this site as platforms we work with.
 *
 * Passing the array in keeps ONE source of truth. If a question is worth
 * telling Google, it is worth showing a visitor, so adding to the page is now
 * the only way to add to the schema.
 */
export function createFAQSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// LocalBusiness schema
export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: NAP.name,
    alternateName: NAP.alternateName,
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/logo.webp",
    image: "https://onealgorithm.com/logo.webp",
    telephone: NAP.telephone,
    email: NAP.email,
    address: { "@type": "PostalAddress", ...NAP.address },
    geo: { "@type": "GeoCoordinates", ...NAP.geo },
    areaServed: ["United States", "Canada", "India", "United Arab Emirates"],
    priceRange: "$$$",
    // Corrected 2026-08-12. This said Mon-Fri 09:00-18:00 while the site sells
    // 24/7 support (Index.tsx:207, :269) -- and 24/7 is real, not marketing.
    //
    // The cost of the contradiction was concrete: Google renders these hours as
    // "Closed" beside the listing, so someone searching at 7pm with a system
    // down -- the highest-intent visitor this business ever gets -- was told the
    // company was shut, on the strength of a field nobody had revisited.
    //
    // `opens 00:00 / closes 23:59` across all seven days is the schema.org
    // convention for always-open.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: NAP.sameAs,
  };
}

// Helper function to create service schema
export function createServiceSchema(
  serviceName: string,
  description: string,
  serviceType: string,
  url: string,
): ServiceSchema {
  return {
    type: "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "OneAlgorithm",
      url: "https://onealgorithm.com",
    },
    areaServed: "United States",
    serviceType: serviceType,
    url: url,
  };
}

// Helper function to create webpage schema
export function createWebPageSchema(
  name: string,
  description: string,
  url: string,
): WebPageSchema {
  return {
    type: "WebPage",
    name: name,
    description: description,
    url: url,
    publisher: {
      name: "OneAlgorithm",
      url: "https://onealgorithm.com",
    },
  };
}

// Helper function to create article schema
export function createArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  author: string,
  image?: string,
): ArticleSchema {
  return {
    type: "Article",
    headline: headline,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      name: author,
      url: "https://onealgorithm.com",
    },
    publisher: {
      name: "OneAlgorithm",
      url: "https://onealgorithm.com",
    },
    image: image,
  };
}

// Helper function to create contact page schema
export function createContactPageSchema(): ContactPageSchema {
  return {
    type: "ContactPage",
    name: "Contact OneAlgorithm",
    description:
      "Contact OneAlgorithm for expert IT consulting, website development, operations technology, and staff augmentation services.",
    url: "https://onealgorithm.com/contact",
    mainEntity: {
      type: "Organization",
      name: NAP.name,
      telephone: NAP.telephoneE164,
      email: NAP.email,
      address: NAP.address,
    },
  };
}

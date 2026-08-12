// StructuredData: injects JSON-LD into <head> for the page that renders it, and
// takes it back out again when that page goes away.
import React from "react";

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
  sameAs: string[];
  services?: string[];
}

interface ServiceSchema {
  type: "Service";
  name: string;
  description: string;
  provider: {
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
      : {
          "@context": "https://schema.org",
          "@type": data.type || data["@type"],
          ...data,
        },
  );
  const scriptId = `schema-${(data.type || "schema").toString().toLowerCase()}`;

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
    name: "OneAlgorithm",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/media/oa-logo.webp",
    description:
      "OneAlgorithm provides expert IT consulting, website development, operations technology, and staff augmentation services. We transform businesses through intelligent technology solutions.",
    address: {
      streetAddress: "625 Swedesford Rd",
      addressLocality: "Malvern",
      addressRegion: "PA",
      postalCode: "19355",
      addressCountry: "US",
    },
    contactPoint: {
      telephone: "+1-610-890-9711",
      email: "service@onealgorithm.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.linkedin.com/company/onealgorithmllc",
      "https://www.facebook.com/share/1694s7Yy3p/",
      "https://www.instagram.com/onealgorithm",
      "https://youtube.com/@onealgorithm",
      "https://www.tiktok.com/@one.algorithm",
    ],
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
    name: "One Algorithm",
    description:
      "Custom software development, system integration, and growth marketing agency serving Philadelphia and nationwide clients",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/media/oa-logo.webp",
    foundingDate: "2020",
    telephone: "1 (610) 890-9711",
    email: "contact@onealgorithm.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "625 Swedesford Rd",
      addressLocality: "Malvern",
      addressRegion: "PA",
      postalCode: "19355",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.0366",
      longitude: "-75.5135",
    },
    // Corrected 2026-08-12. These three pointed at profiles that are NOT ours:
    // linkedin.com/company/onealgorithm (ours is /onealgorithmllc),
    // twitter.com/onealgorithm and github.com/onealgorithm (neither appears
    // anywhere on this site).
    //
    // `sameAs` is how Google resolves this website to the entity behind it, so
    // wrong URLs weaken the Knowledge Panel -- and ~97% of this site's search
    // traffic is people typing the company name, which is exactly the traffic a
    // Knowledge Panel serves. This was quietly costing the one thing that works.
    //
    // Sourced from the footer in Layout.tsx, which is the source of truth, and
    // kept identical to the Organization block's `sameAs` above -- two schema
    // objects describing one company must not disagree about which accounts are
    // ours, or the contradiction is the thing a crawler has to resolve.
    sameAs: [
      "https://www.linkedin.com/company/onealgorithmllc",
      "https://www.facebook.com/share/1694s7Yy3p/",
      "https://www.instagram.com/onealgorithm",
      "https://youtube.com/@onealgorithm",
      "https://www.tiktok.com/@one.algorithm",
    ],
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
export function createFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does One Algorithm provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One Algorithm provides custom software development, system integration (connecting CRMs, ERPs, marketing tools), API development, mobile app development, growth marketing, and DevOps services. We specialize in building scalable web applications, automating workflows, and integrating platforms like Salesforce, HubSpot, Stripe, and Shopify.",
        },
      },
      {
        "@type": "Question",
        name: "Where is One Algorithm located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One Algorithm is located at 625 Swedesford Rd, Malvern, PA 19355. We serve clients in the Philadelphia metro area and nationwide, with experience working with companies across the United States and internationally.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical software development project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects are delivered in 6-12 weeks. Simple integrations can be completed in 2-4 weeks, MVPs typically take 8-12 weeks, and complex enterprise applications may take 3-6 months. We use agile methodology with 2-week sprints for continuous delivery.",
        },
      },
      {
        "@type": "Question",
        name: "What platforms does One Algorithm integrate?",
        acceptedAnswer: {
          "@type": "Answer",
          // "200+ platforms" removed 2026-08-12: it asserted a count nobody can
          // evidence. The named list is the honest version of the same answer --
          // it says what we actually work with, and it matches Index.tsx.
          text: "Oracle, Salesforce, Zendesk, HubSpot, QuickBooks and custom APIs. We connect the platforms you already own rather than assuming a replacement is required.",
        },
      },
      {
        "@type": "Question",
        name: "How much does custom software development cost?",
        acceptedAnswer: {
          "@type": "Answer",
          // ⚠️ UNVERIFIED — Louis to confirm or replace. Left in place rather
          // than deleted because, unlike the removed statistics, these are
          // PRICES we choose, not evidence we claim to hold: if they are real,
          // publishing them helps qualified buyers self-select and deleting
          // them would cost conversions. If they are not real, they are a
          // promise the business has to honour to anyone who read them here.
          // Confirm the numbers or replace this answer with a scoping offer.
          text: "Project costs range from $15K to $500K+ depending on complexity. Simple integrations start at $3K, MVPs typically range from $25K-$75K, and enterprise applications $100K+. We offer free consultations and detailed project scoping to provide accurate estimates.",
        },
      },
      {
        "@type": "Question",
        name: "What makes One Algorithm different from other development agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          // Rewritten 2026-08-12. The previous answer claimed "3-5x faster than
          // traditional agencies", "200+ successful integrations" and a "95%
          // client retention rate". None of those can be evidenced, and they
          // were being served to Google as structured data -- the one format
          // built for a search engine to extract and republish a claim.
          //
          // The distinction applied here, and worth keeping: a COMMITMENT we
          // control (clients own the code, 24/7 cover, certifications we hold)
          // is fair to state. A COUNT or a RATE asserts evidence, and we have
          // none. This company is pursuing government work, where an
          // unevidenced statistic is a procurement problem, not a marketing one.
          text: "Founded in 2020 and based in Malvern, Pennsylvania. One Algorithm is a woman-owned business, SBA-certified WOSB/EDWOSB, a Salesforce Consulting Partner, and registered on SAM.gov (UEI W8DYK38MEKP3, CAGE 14G18) -- all independently verifiable. Engagements carry zero vendor lock-in: clients own all code. Support is available 24/7, and the people who scope the work are the people who build it.",
        },
      },
    ],
  };
}

// LocalBusiness schema
export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "One Algorithm",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/logo.webp",
    image: "https://onealgorithm.com/logo.webp",
    telephone: "1 (610) 890-9711",
    email: "service@onealgorithm.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "625 Swedesford Rd",
      addressLocality: "Malvern",
      addressRegion: "PA",
      postalCode: "19355",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.0424458,
      longitude: -75.5771397,
    },
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
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    // Corrected 2026-08-12: this was the THIRD sameAs list in this file and the
    // second one pointing at accounts that are not ours -- /onealgorithm rather
    // than /onealgorithmllc, a Twitter account that does not appear anywhere on
    // this site, and facebook.com/onealgorithm rather than the share link the
    // footer actually uses. All three schema objects now carry the identical
    // list, taken from the footer in Layout.tsx.
    sameAs: [
      "https://www.linkedin.com/company/onealgorithmllc",
      "https://www.facebook.com/share/1694s7Yy3p/",
      "https://www.instagram.com/onealgorithm",
      "https://youtube.com/@onealgorithm",
      "https://www.tiktok.com/@one.algorithm",
    ],
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
      name: "OneAlgorithm",
      telephone: "+1-610-890-9711",
      email: "service@onealgorithm.com",
      address: {
        streetAddress: "625 Swedesford Rd",
        addressLocality: "Malvern",
        addressRegion: "PA",
        postalCode: "19355",
        addressCountry: "US",
      },
    },
  };
}

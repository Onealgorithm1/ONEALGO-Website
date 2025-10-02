// StructuredData: perform DOM-safe updates without relying on React hooks

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
  if (typeof document === "undefined") return null;

  setTimeout(() => {
    // Handle data that already has @context vs legacy data with 'type' field
    const schema = data["@context"]
      ? data
      : {
          "@context": "https://schema.org",
          "@type": data.type || data["@type"],
          ...data,
        };

    const scriptId = `schema-${(data.type || "schema").toString().toLowerCase()}`;

    // Remove existing schema of the same type
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = scriptId;

    document.head.appendChild(script);

    // Note: we intentionally do not attempt to remove the script on unmount here.
    // Subsequent calls will replace the existing script by id.
  }, 0);

  return null;
}

// Helper function to create organization schema
export function createOrganizationSchema(): OrganizationSchema {
  return {
    type: "Organization",
    name: "OneAlgorithm",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/logo.webp",
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
      telephone: "+1-610-298-9069",
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

// Detailed Organization schema matching Builder.io request
export function createOrganizationSchemaDetailed() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "One Algorithm",
    description:
      "Custom software development, system integration, and growth marketing agency serving Philadelphia and nationwide clients",
    url: "https://onealgorithm.com",
    logo: "https://onealgorithm.com/logo.png",
    foundingDate: "2020",
    telephone: "(610) 298-9069",
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
    sameAs: [
      "https://linkedin.com/company/onealgorithm",
      "https://twitter.com/onealgorithm",
      "https://github.com/onealgorithm",
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "40.0366",
        longitude: "-75.5135",
      },
      geoRadius: "Worldwide",
    },
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
    },
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
          text: "We integrate 200+ platforms including Salesforce, HubSpot, Stripe, Shopify, Mailchimp, Slack, QuickBooks, and custom APIs. Whether you need CRM integration, payment processing, marketing automation, or custom middleware, we handle any integration need.",
        },
      },
      {
        "@type": "Question",
        name: "How much does custom software development cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project costs range from $15K to $500K+ depending on complexity. Simple integrations start at $3K, MVPs typically range from $25K-$75K, and enterprise applications $100K+. We offer free consultations and detailed project scoping to provide accurate estimates.",
        },
      },
      {
        "@type": "Question",
        name: "What makes One Algorithm different from other development agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Founded in 2020, One Algorithm delivers projects 3-5x faster than traditional agencies through agile sprints and modern tech stacks. We offer zero vendor lock-in (clients own all code), 24/7 support, and performance-based engagement options. With 200+ successful integrations and a 95% client retention rate, we focus on delivering measurable ROI.",
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
    image: "https://onealgorithm.com/logo.png",
    telephone: "(610) 298-9069",
    email: "contact@onealgorithm.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "625 Swedesford Rd",
      addressLocality: "Malvern",
      addressRegion: "PA",
      postalCode: "19355",
      addressCountry: "US",
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
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
      telephone: "+1-610-298-9069",
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

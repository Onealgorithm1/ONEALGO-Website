import { useEffect } from "react";

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
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": data.type,
      ...data,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = `schema-${data.type.toLowerCase()}`;

    // Remove existing schema of the same type
    const existingScript = document.getElementById(
      `schema-${data.type.toLowerCase()}`,
    );
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(
        `schema-${data.type.toLowerCase()}`,
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}

// Helper function to create organization schema
export function createOrganizationSchema(): OrganizationSchema {
  return {
    type: "Organization",
    name: "OneAlgorithm",
    url: "https://onealgorithm.com",
    logo: "https://cdn.builder.io/api/v1/image/assets%2Fb90cab62d3d34e0087abec352888a96d%2F7ac5062ee651476bb378c8bccb3f5456",
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

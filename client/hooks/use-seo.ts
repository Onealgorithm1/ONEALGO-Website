// Safe DOM updates for SEO metadata without relying on React hooks at runtime
// We avoid calling React.useEffect directly to prevent issues when multiple React contexts
// or unexpected runtimes cause the hook dispatcher to be unavailable.

interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export function useSEO({
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SEOConfig) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Create canonical link
    if (canonical) {
      // Remove existing canonical link
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // Add new canonical link
      const canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = canonical;
      document.head.appendChild(canonicalLink);
    }

    // Set meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    // Set meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // Set Open Graph meta tags
    if (ogTitle) {
      let ogTitleMeta = document.querySelector('meta[property="og:title"]');
      if (!ogTitleMeta) {
        ogTitleMeta = document.createElement("meta");
        ogTitleMeta.setAttribute("property", "og:title");
        document.head.appendChild(ogTitleMeta);
      }
      ogTitleMeta.setAttribute("content", ogTitle);
    }

    if (ogDescription) {
      let ogDescMeta = document.querySelector(
        'meta[property="og:description"]',
      );
      if (!ogDescMeta) {
        ogDescMeta = document.createElement("meta");
        ogDescMeta.setAttribute("property", "og:description");
        document.head.appendChild(ogDescMeta);
      }
      ogDescMeta.setAttribute("content", ogDescription);
    }

    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement("meta");
        ogImageMeta.setAttribute("property", "og:image");
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute("content", ogImage);
    }

    if (ogUrl) {
      let ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (!ogUrlMeta) {
        ogUrlMeta = document.createElement("meta");
        ogUrlMeta.setAttribute("property", "og:url");
        document.head.appendChild(ogUrlMeta);
      }
      ogUrlMeta.setAttribute("content", ogUrl);
    }

    // Set Twitter Card meta tags (using name attribute, not property)
    // Set Twitter card type
    let twitterCardMeta = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCardMeta) {
      twitterCardMeta = document.createElement("meta");
      twitterCardMeta.setAttribute("name", "twitter:card");
      document.head.appendChild(twitterCardMeta);
    }
    twitterCardMeta.setAttribute("content", "summary_large_image");

    if (twitterTitle) {
      let twitterTitleMeta = document.querySelector(
        'meta[name="twitter:title"]',
      );
      if (!twitterTitleMeta) {
        twitterTitleMeta = document.createElement("meta");
        twitterTitleMeta.setAttribute("name", "twitter:title");
        document.head.appendChild(twitterTitleMeta);
      }
      twitterTitleMeta.setAttribute("content", twitterTitle);
    }

    if (twitterDescription) {
      let twitterDescMeta = document.querySelector(
        'meta[name="twitter:description"]',
      );
      if (!twitterDescMeta) {
        twitterDescMeta = document.createElement("meta");
        twitterDescMeta.setAttribute("name", "twitter:description");
        document.head.appendChild(twitterDescMeta);
      }
      twitterDescMeta.setAttribute("content", twitterDescription);
    }

    if (twitterImage) {
      let twitterImageMeta = document.querySelector(
        'meta[name="twitter:image"]',
      );
      if (!twitterImageMeta) {
        twitterImageMeta = document.createElement("meta");
        twitterImageMeta.setAttribute("name", "twitter:image");
        document.head.appendChild(twitterImageMeta);
      }
      twitterImageMeta.setAttribute("content", twitterImage);
    }

    // Cleanup function to remove canonical link when component unmounts
    return () => {
      if (canonical) {
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink && canonicalLink.getAttribute("href") === canonical) {
          canonicalLink.remove();
        }
      }
    };
  }, [
    title,
    description,
    canonical,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);
}

// Helper function to get the current page URL
export function getCurrentPageUrl(): string {
  return window.location.href;
}

// Helper function to construct canonical URL
export function getCanonicalUrl(path: string): string {
  const baseUrl = "https://onealgorithm.com";
  return `${baseUrl}${path}`;
}

import { useEffect } from "react";

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

export function SEOMeta({
  title,
  description,
  keywords,
  ogImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
  ogType = "website",
  canonicalUrl,
  schema,
}: SEOMetaProps) {
  useEffect(() => {
    // Update title
    document.title = `${title} | Sam Roi Yot Insider`;

    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords || "Sam Roi Yot, Thailand, property, real estate, buying guide" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: ogType },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    metaTags.forEach((tag: any) => {
      let element = document.querySelector(
        `meta[${tag.property ? "property" : "name"}="${tag.property || tag.name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        if (tag.property) {
          element.setAttribute("property", tag.property);
        } else {
          element.setAttribute("name", tag.name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute("content", (tag.content as string) || "");
    });

    // Update canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    // Add schema markup
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup is handled by React
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, schema]);

  return null;
}

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, any>;
}

export function SEO({
  title = "Sam Roi Yot Lifestyle - Beachfront Properties & Relocation Services",
  description = "Discover your dream beachfront property in Sam Roi Yot, Thailand. Affordable luxury condos, villas, and houses near Hua Hin. Full relocation and concierge services.",
  keywords = "Sam Roi Yot real estate, beachfront property Thailand, Hua Hin properties, Thailand retirement, expat living Thailand, Sam Roi Yot condos, beach houses Thailand, property investment Thailand",
  ogImage = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
  ogType = "website",
  schema,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    // Open Graph tags
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:url", window.location.href, true);
    
    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    // Schema.org structured data
    if (schema) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, ogImage, ogType, schema]);

  return null;
}

// Pre-defined schema templates
export const schemas = {
  realEstateAgent: {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Sam Roi Yot Lifestyle",
    description: "Real estate and relocation services in Sam Roi Yot, Thailand",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sam Roi Yot",
      addressRegion: "Prachuap Khiri Khan",
      addressCountry: "TH",
    },
    email: "info@samroiyotlifestyle.com",
    areaServed: {
      "@type": "City",
      name: "Sam Roi Yot",
    },
  },
  
  property: (property: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: property.images?.[0],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "THB",
      availability: property.status === "available" 
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }),
};

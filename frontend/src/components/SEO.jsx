import { useEffect } from 'react';

/**
 * Dynamic SEO Component for Althaf Jewellery Makers
 * Automatically manages:
 * - document.title
 * - meta[name="description"]
 * - meta[name="keywords"]
 * - meta[name="robots"]
 * - link[rel="canonical"]
 * - Open Graph tags (og:title, og:description, og:url, og:image, og:type)
 * - Twitter Card tags (twitter:title, twitter:description, twitter:image, twitter:card)
 * - Structured Data JSON-LD (<script type="application/ld+json" id="dynamic-seo-schema">)
 */
export default function SEO({
  title = "Althaf Jewellery Makers | Best 22K Gold, Polki & Bridal Jewellery in Tenali AP",
  description = "Discover handcrafted 22K Gold, Polki, Kundan, and Antique Temple Jewellery at Althaf Jewellery Makers in Tenali, Andhra Pradesh. 100% BIS 916 Hallmarked heritage designs, transparent live gold pricing & custom bridal orders.",
  keywords = "Althaf Jewellery Makers, Sk. Anwar Basha, Gold Jewellery Tenali, 22K Gold Rate Tenali, Bridal Gold Jewellery Andhra Pradesh, Polki Diamond Necklace, Kundan Choker Tenali, Temple Jhumkas, Antique Nakshi Gold, 916 BIS Hallmarked Gold, BNI Cents Group",
  canonical = "https://althafjewellery.com/",
  ogType = "website",
  ogImage = "https://althafjewellery.com/images/hero-bg-full.png",
  schema = null
}) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'title', title);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', canonical);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 6. Schema.org JSON-LD script injection
    const SCRIPT_ID = 'dynamic-page-schema';
    let schemaScript = document.getElementById(SCRIPT_ID);

    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = SCRIPT_ID;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Cleanup dynamically injected schema on route unmount if needed
      const currentScript = document.getElementById(SCRIPT_ID);
      if (currentScript && !schema) {
        currentScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema]);

  return null;
}

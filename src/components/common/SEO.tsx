import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'FLEX | Engineered Performance & Streetwear Apparel';
const DEFAULT_DESCRIPTION = 'FLEX is a luxury performance gym-wear and streetwear brand. Engineered compression tees, oversized muscle shirts, joggers, and tanks built for movement and discipline.';
const DEFAULT_IMAGE = 'https://www.flex-fit.shop/assets/branding/homepage-mockup.webp';
const BASE_URL = 'https://www.flex-fit.shop';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical = '',
  ogType = 'website',
  ogImage,
  schema,
}) => {
  const fullTitle = title ? `${title} | FLEX` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : BASE_URL;
  const imageUrl = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`)
    : DEFAULT_IMAGE;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to update or create meta tags
    const setMetaTag = (selector: string, attribute: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Description
    setMetaTag('meta[name="description"]', 'name', 'description', description);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);

    // Twitter Card
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    // 3. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 4. Dynamic Route JSON-LD Schema
    const scriptId = 'dynamic-route-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      const schemaData = Array.isArray(schema)
        ? { '@context': 'https://schema.org', '@graph': schema }
        : { '@context': 'https://schema.org', ...schema };
      scriptEl.textContent = JSON.stringify(schemaData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Clean up script on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, ogType, imageUrl, schema]);

  return null;
};

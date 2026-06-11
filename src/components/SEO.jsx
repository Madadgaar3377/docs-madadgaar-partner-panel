import { useEffect } from 'react';
import { DOCS_SITE } from '../constants/api';

const SITE_NAME = 'Madadgaar Partner API Docs';

function setMeta(nameOrProp, value, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value || '');
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SEO({
  title,
  description,
  canonicalPath = '/',
  keywords = 'Madadgaar API, partner API, installment integration Pakistan',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${DOCS_SITE}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setCanonical(url);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', `${DOCS_SITE}/madadgaar-logo.png`, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [fullTitle, description, url, keywords]);

  return null;
}

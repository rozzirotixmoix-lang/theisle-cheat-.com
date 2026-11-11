import type { LinkItem } from '@astrojs/sitemap';
import { localizePath, stripLocalePrefix } from '../i18n/paths';
import { DEFAULT_LOCALE, LOCALES, type SiteLocale } from '../i18n/locales';
import { canonicalUrl } from './seo';
import { normalizeSeoPath } from './pageSeo';

export type HreflangAlternate = { hreflang: string; href: string };

/**
 * HTML `<link rel="alternate" hreflang>` for a page cluster.
 * `pageCanonical` must match that page's `<link rel="canonical">`; the current locale (and x-default on English) use it exactly.
 */
export function hreflangAlternatesForPath(
  canonicalPath: string,
  pageCanonical: string,
  currentLocale: SiteLocale = DEFAULT_LOCALE,
): HreflangAlternate[] {
  const base = normalizeSeoPath(stripLocalePrefix(canonicalPath));
  const alternates: HreflangAlternate[] = LOCALES.map((locale) => ({
    hreflang: locale,
    href: canonicalUrl(localizePath(base, locale)),
  }));
  alternates.push({
    hreflang: 'x-default',
    href: canonicalUrl(localizePath(base, DEFAULT_LOCALE)),
  });

  const selfIndex = alternates.findIndex((alt) => alt.hreflang === currentLocale);
  if (selfIndex >= 0) {
    alternates[selfIndex] = { hreflang: currentLocale, href: pageCanonical };
  }

  if (currentLocale === DEFAULT_LOCALE) {
    const xDefaultIndex = alternates.findIndex((alt) => alt.hreflang === 'x-default');
    if (xDefaultIndex >= 0) {
      alternates[xDefaultIndex] = { hreflang: 'x-default', href: pageCanonical };
    }
    const enIndex = alternates.findIndex((alt) => alt.hreflang === 'en');
    if (enIndex >= 0) {
      alternates[enIndex] = { hreflang: 'en', href: pageCanonical };
    }
  }

  return alternates;
}

/** Sitemap `xhtml:link` alternates for the same pathname cluster. */
export function sitemapAlternateLinks(pathname: string): LinkItem[] {
  const base = normalizeSeoPath(stripLocalePrefix(pathname));
  const pageCanonical = canonicalUrl(localizePath(base, DEFAULT_LOCALE));
  return hreflangAlternatesForPath(base, pageCanonical, DEFAULT_LOCALE).map(({ hreflang, href }) => ({
    lang: hreflang,
    url: href,
  }));
}

export function isIndexablePath(pathname: string): boolean {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;

  if (path.includes('/404') || path.startsWith('/go/') || path.includes('/rss.xml')) {
    return false;
  }
  if (/^\/(es|de|fr)\/404\//.test(path)) return false;
  if (path === '/en/' || path.startsWith('/en/')) return false;
  if (/^\/(es|de|fr)\/go(\/|$)/.test(path)) return false;

  const base = stripLocalePrefix(path);
  if (base === '/privacy/' || base === '/terms/') return false;

  return true;
}

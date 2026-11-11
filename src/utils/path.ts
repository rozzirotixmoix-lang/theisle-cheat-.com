import { HWID_SPOOFER_PATH, PRODUCT_BASE } from '../config/site';
import { CHEATS_PRIMARY_SLUG } from '../config/catalog';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [beforeHash, hash = ''] = path.split('#');
  const [pathname, query = ''] = beforeHash.split('?');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  const withQuery = query ? `${normalized}?${query}` : normalized;
  return hash ? `${withQuery}#${hash}` : withQuery;
}

const legacyProductRoot = '/products/dota-2-cheats';

/** Former product URLs → `/product/` (301 targets match scripts/redirects.mjs). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': PRODUCT_BASE,
  '/cheats/lite/': PRODUCT_BASE,
  '/cheats/pro': PRODUCT_BASE,
  '/cheats/pro/': PRODUCT_BASE,
  '/cheats/elite': PRODUCT_BASE,
  '/cheats/elite/': PRODUCT_BASE,
  [legacyProductRoot]: PRODUCT_BASE,
  [`${legacyProductRoot}/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/lite`]: PRODUCT_BASE,
  [`${legacyProductRoot}/lite/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/pro`]: PRODUCT_BASE,
  [`${legacyProductRoot}/pro/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/elite`]: PRODUCT_BASE,
  [`${legacyProductRoot}/elite/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/utilities`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/utilities/`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/hwid-spoofer`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/hwid-spoofer/`]: HWID_SPOOFER_PATH,
  [`${legacyProductRoot}/ugc`]: PRODUCT_BASE,
  [`${legacyProductRoot}/ugc/`]: PRODUCT_BASE,
  [`${legacyProductRoot}/unlock-all`]: PRODUCT_BASE,
  [`${legacyProductRoot}/unlock-all/`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}lite`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}lite/`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}pro`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}pro/`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}elite`]: PRODUCT_BASE,
  [`${PRODUCT_BASE}elite/`]: PRODUCT_BASE,
  '/cheats/compare': '/blog/',
  '/cheats/compare/': '/blog/',
  '/product/compare': '/blog/',
  '/product/compare/': '/blog/',
  '/contact': '/support/',
  '/contact/': '/support/',
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  blog: '/blog/',
  forum: '/forum/',
  products: PRODUCT_BASE,
  cheats: PRODUCT_BASE,
  productsElite: PRODUCT_BASE,
  hwidSpoofer: HWID_SPOOFER_PATH,
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: '/support/',
  privacy: '/privacy/',
} as const;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function productPath(slug: string): string {
  if (slug === CHEATS_PRIMARY_SLUG || slug === 'dota-2-cheats') {
    return PRODUCT_BASE;
  }
  if (slug === 'hwid-spoofer') {
    return HWID_SPOOFER_PATH;
  }
  if (slug === 'skin-changer') {
    return '/go/skin-changer/';
  }
  return `${PRODUCT_BASE}${slug}/`;
}

import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * Partner destinations live in `checkout-redirects.mjs`.
 * Visible buy links stay on `/go/…` so the status bar does not show the referral URL.
 * Click → server 302 (and static `_redirects` / fallback HTML) to the configured URL.
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  theIsle: 'the-isle',
  ugc: 'ugc',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal path shown on hover. Redirect target is `CHECKOUT[product]`. */
export function checkoutPath(product: CheckoutProduct): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Default main-product buy URL (header, hero CTAs, support). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('theIsle');

/** HWID Spoofer buy URL. Hover shows this path; click 302s to the configured referral. */
export const HWID_CHECKOUT_PATH = checkoutPath('hwidSpoofer');

/** Map internal product slugs to cloaked checkout paths. */
export function checkoutForSlug(slug: string): string {
  if (slug === 'hwid-spoofer') {
    return checkoutPath('hwidSpoofer');
  }
  if (slug === 'ugc') {
    return checkoutPath('ugc');
  }
  if (slug === 'skin-changer' || slug === 'unlock-all') {
    return checkoutPath('skinChanger');
  }
  return checkoutPath('theIsle');
}

/** Blog / legacy hrefs → cloaked `/go/…` paths (never the partner URL). */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    const goMatch = normalized.match(/^\/go\/([^/?#]+)\/?/);
    if (goMatch) {
      const slug = goMatch[1];
      if (slug === 'the-isle' || slug === 'escape-from-tarkov') {
        return checkoutPath('theIsle');
      }
      if (slug === 'hwid-spoofer') {
        return checkoutPath('hwidSpoofer');
      }
      const product = CHECKOUT_SLUG_TO_PRODUCT[slug];
      if (product) return checkoutPath(product);
    }
    return normalized;
  }

  if (
    href.includes('%2Fproducts%2Fhwid-spoofer') ||
    href.includes('/products/hwid-spoofer') ||
    (href.includes('zadeyo.com/go/') && href.includes('hwid-spoofer'))
  ) {
    return checkoutPath('hwidSpoofer');
  }

  if (
    href.includes('%2Fproducts%2Fugc') ||
    href.includes('/products/ugc')
  ) {
    return checkoutPath('ugc');
  }

  if (
    href.includes('%2Fproducts%2Fskin-changer') ||
    href.includes('/products/skin-changer')
  ) {
    return checkoutPath('skinChanger');
  }

  if (
    href.includes('%2Fproducts%2Fvalorant') ||
    href.includes('/products/valorant') ||
    href.includes('%2Fproducts%2Fthe-isle-novaxware') ||
    href.includes('/products/the-isle-novaxware') ||
    href.includes('%2Fproducts%2Fescape-from-tarkov') ||
    href.includes('/products/escape-from-tarkov')
  ) {
    return checkoutPath('theIsle');
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    const base = url.split('?')[0];
    if (href === url || href.startsWith(`${url}&`) || href.startsWith(`${base}?`) || href.startsWith(`${base}/`)) {
      return checkoutPath(product);
    }
  }

  return href;
}

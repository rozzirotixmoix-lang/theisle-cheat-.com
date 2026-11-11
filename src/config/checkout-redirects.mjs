/**
 * Partner checkout destinations (affiliate / ref links).
 * Visible buy buttons use `/go/…` from `checkout.ts`. These URLs are the 302 targets only.
 */
export const CHECKOUT_URLS = {
  theIsle: 'https://zadeyo.com/go/MOIX?to=%2Fproducts%2Fthe-isle-novaxware',
  ugc: 'https://zadeyo.com/go/MOIX?to=%2Fproducts%2Fugc',
  skinChanger: 'https://zadeyo.com/go/MOIX?to=%2Fproducts%2Fskin-changer',
  hwidSpoofer: 'https://zadeyo.com/go/MOIX?to=%2Fproducts%2Fhwid-spoofer',
};

const MAIN_CHECKOUT = CHECKOUT_URLS.theIsle;

const PREFIXED_LOCALES = ['es', 'de', 'fr'];

/** Checkout paths → external product URLs (Node serve, Astro middleware, static `_redirects`). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/the-isle', MAIN_CHECKOUT],
  ['/go/the-isle/', MAIN_CHECKOUT],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
]);

function stripLocaleFromCheckoutPath(pathname) {
  for (const locale of PREFIXED_LOCALES) {
    const prefix = `/${locale}`;
    if (pathname === `${prefix}/go` || pathname.startsWith(`${prefix}/go/`)) {
      return pathname.slice(prefix.length);
    }
  }
  if (pathname.startsWith('/en/go/') || pathname === '/en/go') {
    return pathname.slice('/en'.length);
  }
  return pathname;
}

export function resolveCheckoutPathRedirect(pathname) {
  const path = stripLocaleFromCheckoutPath(pathname);
  const direct = CHECKOUT_PATH_REDIRECTS.get(path);
  if (direct) return direct;

  if (path !== '/' && !path.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${path}/`) ?? null;
  }

  return null;
}

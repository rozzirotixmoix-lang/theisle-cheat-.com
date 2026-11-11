import { SITE_DOMAIN, SITE_URL } from './site-url.mjs';

export { SITE_DOMAIN, SITE_URL };

/** Public brand string (header, legal, schema). Override via env when re-skinning the template. */
const publicSiteName =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_SITE_NAME as string | undefined)
    : undefined;

export const SITE_NAME = publicSiteName?.trim() || 'the isle cheats';
export const PRODUCT_BASE = '/product/';
export const HWID_SPOOFER_PATH = '/hwid-spoofer/';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;

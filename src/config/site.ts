import { SITE_DOMAIN as SITE_DOMAIN_VALUE } from './site-url.mjs';

export const SITE_DOMAIN = SITE_DOMAIN_VALUE;

const envSiteUrl =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_SITE_URL as string | undefined)?.trim().replace(/\/$/, '')
    : undefined;

export const SITE_URL = envSiteUrl || `https://${SITE_DOMAIN}`;
/** Public brand string (header, legal, schema). Override via env when re-skinning the template. */
const publicSiteName =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_SITE_NAME as string | undefined)
    : undefined;

export const SITE_NAME = publicSiteName?.trim() || 'the isle cheats';
export const PRODUCT_BASE = '/product/';
export const HWID_SPOOFER_PATH = '/hwid-spoofer/';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;

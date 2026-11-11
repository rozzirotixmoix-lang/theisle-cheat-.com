import { getTranslations } from '../i18n';
import {
  DEFAULT_OG_GAMEPLAY_ALT,
  DEFAULT_OG_GAMEPLAY_HEIGHT,
  DEFAULT_OG_GAMEPLAY_IMAGE,
  DEFAULT_OG_GAMEPLAY_WIDTH,
} from './gameplayMedia';
import { SITE_DOMAIN as INDEXNOW_HOST_NAME, SITE_URL, SITE_DOMAIN } from './site';
import { getPageSeoEntry } from './pageSeo';

export const SITE_ORIGIN = SITE_URL;

export const DEFAULT_OG_IMAGE = DEFAULT_OG_GAMEPLAY_IMAGE;

export const DEFAULT_OG_IMAGE_ALT = DEFAULT_OG_GAMEPLAY_ALT;

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @handle */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

/** Absolute canonical URL for a site path (trailing slash on all paths except query/fragment). */
export function absoluteUrl(pathname: string): string {
  return canonicalUrl(pathname);
}

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

/** Approximate Google SERP snippet width (Arial 20px heuristic). */
export function metaDescriptionPixelWidth(text: string): number {
  let w = 0;
  for (const ch of text) {
    if (ch === ' ') w += 4;
    else if (/[WMmw@%]/.test(ch)) w += 12;
    else if (/[A-Z]/.test(ch)) w += 8;
    else w += 7;
  }
  return w;
}

function metaDescriptionFits(text: string, maxChars: number, maxPx: number): boolean {
  return text.length <= maxChars && metaDescriptionPixelWidth(text) <= maxPx;
}

/** SERP-safe meta description (≤155 chars and ≤990px for Seobility). */
export function clampMetaDescription(text: string, min = 110, maxChars = 155, maxPx = 990): string {
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (!normalized) return normalized;
  if (normalized.length < min && metaDescriptionFits(normalized, maxChars, maxPx)) return normalized;

  let out = normalized;
  const floor = Math.min(min, 90);
  while (!metaDescriptionFits(out, maxChars, maxPx) && out.length > floor) {
    let end = Math.min(out.length - 1, maxChars);
    while (
      end > floor &&
      (end > maxChars || metaDescriptionPixelWidth(out.slice(0, end)) > maxPx)
    ) {
      const slice = out.slice(0, end);
      const boundary = Math.max(slice.lastIndexOf(' '), slice.lastIndexOf(';'), slice.lastIndexOf(','));
      end = boundary > floor ? boundary : end - 4;
    }
    const next = out.slice(0, end).replace(/[,;:–-]\s*$/, '').trim();
    if (!next || next === out) break;
    out = next;
  }
  if (out.length < min) {
    const suffix = ` More on ${SITE_DOMAIN}.`;
    const extended = `${out.replace(/[.!?]\s*$/, '')}${suffix}`;
    if (metaDescriptionFits(extended, maxChars, maxPx)) out = extended;
  }
  return out;
}

function collapseRepeatedTitleWords(title: string): string {
  return title
    .replace(/\b(The Isle Cheats)\s+\1\b/gi, '$1')
    .replace(/\b(The Isle)\s+\1\b/gi, '$1')
    .replace(/\b(theisle-cheat\.com)\s+\1\b/gi, '$1')
    .replace(/\b(Bans),\s+\1\b/gi, '$1')
    .replace(/\b(Cheats),\s+\1\b/gi, '$1');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Visible H1 / hero title only — keeps `normalizeDocumentTitle` output in `<title>` and meta. */
export function visiblePageTitle(title: string): string {
  const domain = SITE_DOMAIN;
  const escaped = escapeRegExp(domain);
  let out = title.trim();
  const suffixPatterns = [
    new RegExp(`\\s*[|–—:\\-]\\s*${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+on\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+at\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+for\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+sur\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+en\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+auf\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+über\\s+${escaped}\\s*$`, 'i'),
    new RegExp(`\\s+para\\s+${escaped}\\s*$`, 'i'),
  ];
  for (const pattern of suffixPatterns) {
    out = out.replace(pattern, '');
  }
  return out.replace(/\s*[|–—:\-]\s*$/, '').trim();
}

export function normalizeDocumentTitle(title: string, locale?: string): string {
  const trimmed = collapseRepeatedTitleWords(title.trim().replace(/\s+/g, ' '));
  if (!trimmed) return trimmed;
  const t = getTranslations(locale);
  let out = trimmed.length > 60 ? pageTitle(trimmed, undefined, locale) : trimmed;
  if (out.length < 50) {
    const suffix = ` | ${SITE_DOMAIN}`;
    const withDomain = `${out}${suffix}`;
    if (withDomain.length <= 60) {
      out = withDomain;
    } else {
      const maxBase = Math.max(28, 60 - suffix.length);
      const trimmedBase = pageTitle(out, undefined, locale);
      const base = trimmedBase.length > maxBase ? trimmedBase.slice(0, maxBase).replace(/\s+\S*$/, '').trim() : trimmedBase;
      const candidate = `${base}${suffix}`;
      out = candidate.length <= 60 ? candidate : pageTitle(withDomain, undefined, locale);
    }
  }
  if (out.length > 60) out = pageTitle(out, undefined, locale);
  return out;
}

export function resolvePageSeo(pathname: string, locale?: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname, locale);
  const t = getTranslations(locale);
  const raw = entry ?? { title: t.site.title, description: t.site.description };
  return {
    title: normalizeDocumentTitle(raw.title, locale),
    description: clampMetaDescription(raw.description),
  };
}

export function pageTitle(keyword: string, brand?: string, locale?: string): string {
  const t = getTranslations(locale);
  const brandName = brand ?? t.site.name;
  const suffix = ` | ${brandName}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  if (keyword.length <= max) return keyword;
  const cut = keyword.slice(0, max + 1);
  const clauseBreak = Math.max(...[...cut.matchAll(/[.?!:;,](?=\s)/g)].map((m) => m.index ?? -1), -1);
  const boundary = cut.lastIndexOf(' ');
  let trimmed =
    clauseBreak >= 30
      ? cut.slice(0, /[?!]/.test(cut[clauseBreak]) ? clauseBreak + 1 : clauseBreak)
      : boundary > 20
        ? cut.slice(0, boundary)
        : keyword.slice(0, max);
  const danglingWord =
    /[\s,;:.·|&-]+$|\s+(a|an|the|and|or|of|for|to|in|on|with|is|it|be|without|after|de|del|al|el|la|los|las|y|o|en|con|para|un|una|es|sin|der|die|das|und|oder|mit|für|von|im|ein|eine|ist|ob|ohne|nach|le|les|et|ou|du|des|à|au|pour|avec|sur|sans|après|est)$/iu;
  while (danglingWord.test(trimmed)) trimmed = trimmed.replace(danglingWord, '');
  return trimmed.trim();
}

export const DEFAULT_OG_IMAGE_WIDTH = DEFAULT_OG_GAMEPLAY_WIDTH;
export const DEFAULT_OG_IMAGE_HEIGHT = DEFAULT_OG_GAMEPLAY_HEIGHT;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;

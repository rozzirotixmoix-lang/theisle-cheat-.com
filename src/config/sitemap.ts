import { ChangeFreqEnum, type SitemapItem } from '@astrojs/sitemap';
import { blogPosts, getAllBlogSlugs } from '../data/blog';
import { getForumPosts } from '../data/forum/locale';
import { getAllProductSlugs } from '../data/products';
import { LOCALES } from '../i18n/locales';
import { localizePath } from '../i18n/paths';
import { isIndexablePath } from './hreflang';
import { canonicalUrl } from './seo';
import { ROUTES, blogPostPath, productPath } from '../utils/path';
import { parseBlogDate } from '../utils/schema';

const buildDate = new Date().toISOString();

const blogLastmod = new Map<string, string>(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (!isIndexablePath(path)) {
    return undefined;
  }

  delete item.lastmod;

  if (path === '/') {
    item.priority = 1;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (path === '/blog/') {
    item.priority = 0.9;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (path === '/forum/') {
    item.priority = 0.8;
    item.changefreq = ChangeFreqEnum.DAILY;
    return item;
  }

  if (path.startsWith('/forum/')) {
    item.priority = 0.6;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (path.startsWith('/blog/')) {
    item.priority = 0.7;
    item.changefreq = ChangeFreqEnum.MONTHLY;
    item.lastmod = blogLastmod.get(path) ?? buildDate;
    return item;
  }

  if (path === '/product/' || path.startsWith('/product/') || path === '/hwid-spoofer/') {
    item.priority = 0.8;
    item.changefreq = ChangeFreqEnum.WEEKLY;
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.priority = 0.5;
    item.changefreq = ChangeFreqEnum.YEARLY;
    return item;
  }

  item.priority = 0.6;
  item.changefreq = ChangeFreqEnum.MONTHLY;
  return item;
}

const STATIC_INDEXABLE_BASES = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.blog,
  ROUTES.forum,
  ROUTES.faq,
  ROUTES.support,
  ROUTES.products,
  ROUTES.hwidSpoofer,
] as const;

/** Ensures i18n fallback routes (blog/forum/product slugs per locale) appear in the sitemap. */
export function customSitemapPageUrls(): string[] {
  const paths = new Set<string>();

  for (const base of STATIC_INDEXABLE_BASES) {
    for (const locale of LOCALES) {
      const localized = localizePath(base, locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const slug of getAllProductSlugs()) {
    for (const locale of LOCALES) {
      const localized = localizePath(productPath(slug), locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const slug of getAllBlogSlugs()) {
    for (const locale of LOCALES) {
      const localized = localizePath(blogPostPath(slug), locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  for (const post of getForumPosts('en')) {
    for (const locale of LOCALES) {
      const localized = localizePath(`/forum/${post.slug}/`, locale);
      if (isIndexablePath(localized)) paths.add(localized);
    }
  }

  return [...paths].map((path) => canonicalUrl(path));
}

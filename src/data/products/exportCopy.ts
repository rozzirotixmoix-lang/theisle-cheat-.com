/**
 * English long-form product copy exported for locale translation (Part 4).
 * Slugs, prices, and feature name lists stay in products.ts / pricing modules.
 */

import type { ProductAcquisition, ProductOverview, ProductPage } from '../products';

export interface ProductCopyBundle {
  sharedGoodToKnow: string;
  sharedLimitations: string;
  acquisitionSteps: { num: string; title: string; desc: string }[];
  systemRequirements: string[];
  gallery: { alt: string; caption: string; captionDesc: string }[];
  /** Optional HWID utility gallery captions (falls back to English if omitted). */
  hwidGallery?: { alt: string; caption: string; captionDesc: string }[];
  tiers: Record<
    string,
    {
      about?: ProductPage['about'];
      body: ProductPage['body'];
      overview: ProductOverview;
      goodToKnow: string;
      limitations: string;
      acquisitionTitle: string;
    }
  >;
  utilities: Record<
    string,
    {
      body: ProductPage['body'];
      overview: ProductOverview;
      goodToKnow: string;
      limitations: string;
      acquisitionTitle: string;
    }
  >;
}

/** Populated at build time from products.ts via registerProductCopyBundle. */
let bundle: ProductCopyBundle | null = null;

export function registerProductCopyBundle(next: ProductCopyBundle) {
  bundle = next;
}

export function getProductCopyBundle(): ProductCopyBundle {
  if (!bundle) {
    throw new Error('Product copy bundle not registered, import products.ts before reading locales.');
  }
  return bundle;
}

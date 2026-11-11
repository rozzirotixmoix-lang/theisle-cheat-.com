export type ProductPlanId = 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  /** Shown on the checkout card, and used as the preselected plan. */
  recommended?: boolean;
  badge?: string;
}

/** Main Product plans from the Pricing Reference URL (Monthly 31 days $35, Lifetime $150). */
const mainProductPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / 31 days' },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: 150,
    priceNote: 'USD · one-time',
    recommended: true,
    badge: 'Best value',
  },
];

/** HWID Spoofer plans stay as on the template page (Part 3 must not change them). */
const hwidSpooferPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month' },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: 150,
    priceNote: 'USD · one-time',
    recommended: true,
    badge: 'Best value',
  },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'hwid-spoofer') return hwidSpooferPlans;
  return mainProductPlans;
}

export function getFeaturedPlan(productSlug: string): ProductPlan | undefined {
  const plans = getProductPlans(productSlug);
  return plans.find((plan) => plan.recommended) ?? plans[0];
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}

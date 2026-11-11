import { CHEAT_PRODUCT_SLUGS, CHEATS_PRIMARY_SLUG, HWID_SPOOFER_SLUG } from '../config/catalog';
import { PRODUCT_BASE } from '../config/site';
import { getTranslations } from '../i18n';
import { deepApplySiteTokens } from '../i18n/brandTokens';
import type { SiteLocale } from '../i18n/locales';
import type { Translations } from '../i18n/types';
import { checkoutForSlug } from '../config/checkout';
import { SHOWCASE_GALLERY_KEYS } from '../config/gameplayMedia';
import { HWID_GALLERY_KEYS } from '../config/hwidMedia';
import type { IconName } from '../components/icons/types';
import { getProductCopyBundle, registerProductCopyBundle, type ProductCopyBundle } from './products/exportCopy';
import esProductCopy from './products/locales/es.json';
import deProductCopy from './products/locales/de.json';
import frProductCopy from './products/locales/fr.json';

export interface ProductSlide {
  /** Still image, or the poster frame when `videoSrc` is set. */
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  /** `image` unless a clip is attached. */
  kind?: 'image' | 'video';
  /** MP4 or WebM. The slider shows this instead of the still; `src` stays the poster. */
  videoSrc?: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
  relatedForumSlugs: string[];
}

/** Guides paired with each product detail page. Cleared in Part 2; refilled in Part 11. */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  elite: [
    'the-isle-esp-options-explained',
    'how-to-set-up-the-isle-cheats-windows',
    'the-isle-cheat-not-working-fixes',
    'the-isle-anti-cheat-bans-and-risk',
    'the-isle-evrima-growth-guide',
  ],
  'hwid-spoofer': ['the-isle-hwid-spoofer-ban-recovery', 'the-isle-anti-cheat-bans-and-risk'],
};

/** Community threads paired with each product detail page. */
export const productRelatedForumSlugs: Record<string, string[]> = {
  elite: [
    'what-does-esp-mean-in-gaming',
    'the-isle-third-party-software-buying-checklist',
    'the-isle-third-party-software-ban-risk',
    'the-isle-technical-support-request-checklist',
  ],
  'hwid-spoofer': [
    'what-is-an-hwid-spoofer-explained',
    'the-isle-third-party-software-ban-risk',
    'verify-the-isle-third-party-tool-updates',
    'the-isle-update-problems-troubleshooting',
  ],
};

const productBase = PRODUCT_BASE;

const hwidAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check status before buying',
    desc: 'After anti-cheat updates, open the live banner on {siteDomain} plus Discord #status. The status page holds compatibility notes.',
  },
  {
    num: '02',
    title: 'Choose monthly or lifetime',
    desc: 'Both monthly and lifetime unlock the same portal tools. Match the plan length to how long you need hardware recovery access.',
  },
  {
    num: '03',
    title: 'Review setup with ops',
    desc: 'Bring your order email and Windows version into Discord so staff can spot clear driver issues or shared-PC problems early.',
  },
  {
    num: '04',
    title: 'Finish the portal checklist',
    desc: 'Take a restore point, clean drivers, run the spoof, cold reboot, verify identifiers, and only afterward sign into a fresh The Isle account.',
  },
];

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on {siteDomain} and Discord #status before purchase, especially after a The Isle or Easy Anti-Cheat update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select the isle cheats or the utility that matches your goal. Review the feature list before checkout via our partner checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Windows setup, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test offline, load presets, then play when status is online.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'The Isle and Easy Anti-Cheat receive frequent updates. Confirm module availability on the live status panel at {siteDomain} before you purchase or launch. Cloud DMA is a separate purchase and is required for full functionality.';

const sharedLimitations =
  'Third-party software in The Isle can violate the game publisher terms and lead to Easy Anti-Cheat bans or account action. You use this software at your own risk. Compatibility and availability can change after game, Easy Anti-Cheat, or Windows updates without notice.';

const productSystemRequirements: SystemRequirement[] = [
  {
    icon: 'reqWindows',
    text: 'Windows 10 or 11 (64-bit) with HVCI, Core Isolation, TPM, and Secure Boot enabled.',
  },
  { icon: 'reqWifi', text: 'Stable internet and loader access after purchase.' },
  { icon: 'reqSettings', text: 'Steam client; The Isle: Evrima only. Check status after patches.' },
  { icon: 'reqShieldGuide', text: 'Cloud DMA is a separate purchase and is required for full functionality.' },
];

const galleryRaw = {
  gpDaylightValley: {
    src: '/images/gameplay/isle-daylight-valley-minimap-esp.webp',
    alt: 'Striped raptor on a tropical beach with ESP tracers, radar, and survival HUD in The Isle.',
    caption: 'Dino stats and radar',
    captionDesc: 'Growth, hunger, and bone bars beside minimap and distance ESP in the forest.',
  },
  gpNightForest: {
    src: '/images/gameplay/isle-night-forest-esp-distance-labels.webp',
    alt: 'Night jungle with white snaplines and player distance labels in The Isle.',
    caption: 'Shoreline night ESP',
    captionDesc: 'Moonlit sand with tracers and nameplates across the waterline.',
  },
  gpBeachShoreline: {
    src: '/images/gameplay/isle-beach-shoreline-player-esp.webp',
    alt: 'Valley overlook with minimap radar and colored ESP entity tags in The Isle.',
    caption: 'Jungle raptor ESP',
    captionDesc: 'Third-person run through foliage with tracers and corner radar.',
  },
  gpTallGrass: {
    src: '/images/gameplay/isle-tall-grass-esp-boxes.webp',
    alt: 'Omniraptor crouched in fallen jungle logs with species and growth ESP readouts in The Isle.',
    caption: 'Herd in tall grass',
    captionDesc: 'Open field flock silhouetted against pines and morning haze.',
  },
  gpForestOmniraptor: {
    src: '/images/gameplay/isle-forest-omniraptor-esp-panel.webp',
    alt: 'Dense jungle grass with white tracers and distance readouts through foliage in The Isle.',
    caption: 'World loot ESP',
    captionDesc: 'In-game world tab with distance slider and colored object filters.',
  },
  gpBeachDual: {
    src: '/images/gameplay/isle-shoreline-duel-theropods-esp.webp',
    alt: 'Two theropods on a sunny shoreline with name and health overlays in The Isle.',
    caption: 'Predator standoff',
    captionDesc: 'Two theropods at a carcass with misty forest behind.',
  },
  gpFreeCameraDeer: {
    src: '/images/gameplay/isle-free-camera-deer-esp.webp',
    alt: 'Show Entities menu in jungle with species labels and distance slider.',
    caption: 'Entity list ESP',
    captionDesc: 'Tall grass scene with snaplines, weights, and growth readouts.',
  },
  gpCombatWireframe: {
    src: '/images/gameplay/isle-combat-wireframe-dinosaurs.webp',
    alt: 'Combat showcase with holographic wireframe dinosaurs in a grassy arena in The Isle.',
    caption: 'Wireframe target ESP',
    captionDesc: 'Chams-style overlay with boxes, skeletons, and range text.',
  },
  gpCombatTriceratops: {
    src: '/images/gameplay/isle-combat-wireframe-triceratops.webp',
    alt: 'Exploit toggles over night grass with Triceratops ESP labels.',
    caption: 'Exploit and FOV controls',
    captionDesc: 'Menu for FOV, sky, and fog with labeled dinosaurs in the field.',
  },
  gpCombatJungleAim: {
    src: '/images/gameplay/isle-combat-jungle-wireframe-aim.webp',
    alt: 'Visuals menu with player, dinosaur, world, and radar cheat toggles.',
    caption: 'Visuals config panel',
    captionDesc: 'Purple-themed UI for ESP boxes, species info, loot, and radar range.',
  },
  gpCombatLatch: {
    src: '/images/gameplay/isle-combat-latch-wireframe.webp',
    alt: 'Misc settings menu with cloud DMA status and stream-proof toggles.',
    caption: 'Misc and cloud status',
    captionDesc: 'Hotkeys, config save, and connected Cloud DMA relay indicators.',
  },
} satisfies Record<
  string,
  { src: string; alt: string; caption: string; captionDesc: string; videoSrc?: string }
>;

type GalleryKey = keyof typeof galleryRaw;

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item = galleryRaw[key];
    if (!item) throw new Error(`Missing gallery key: ${String(key)}`);
    const { src, alt, caption, captionDesc, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const showcaseSlides = slide(...SHOWCASE_GALLERY_KEYS);

const hwidGalleryRaw = {
  hwidStatusPanel: {
    src: '/images/hwid-spoofer/hwid-status-panel-not-spoofed.webp',
    alt: 'Visuals menu with player, dinosaur, world, and radar cheat toggles.',
    caption: 'Visuals config panel',
    captionDesc: 'ESP modules for players, dinos, world loot, and on-screen radar.',
  },
  hwidCleanerRun: {
    src: '/images/hwid-spoofer/hwid-cleaner-run-panel.webp',
    alt: 'Misc settings menu with cloud DMA status and stream-proof toggles.',
    caption: 'Misc and cloud status',
    captionDesc: 'Panic keys, config profiles, and live Cloud DMA connection state.',
  },
  hwidMotherboardReady: {
    src: '/images/hwid-spoofer/hwid-motherboard-spoof-ready.webp',
    alt: 'Show Entities menu in jungle with species labels and distance slider.',
    caption: 'Entity list ESP',
    captionDesc: 'Distance-filtered labels for dinos, AI, and world objects.',
  },
  hwidMotherboardProgress: {
    src: '/images/hwid-spoofer/hwid-motherboard-spoof-progress.webp',
    alt: 'World ESP menu over tall grass showing corpses, food, and water toggles.',
    caption: 'World loot ESP',
    captionDesc: 'Corpse, meat, fruit, and water filters with a 2000 m range slider.',
  },
} satisfies Record<
  string,
  { src: string; alt: string; caption: string; captionDesc: string; videoSrc?: string }
>;

type HwidGalleryKey = keyof typeof hwidGalleryRaw;

function hwidSlide(...keys: HwidGalleryKey[]): ProductSlide[] {
  return keys.map((key) => {
    const item = hwidGalleryRaw[key];
    const { src, alt, caption, captionDesc, videoSrc } = item;
    return {
      src,
      alt,
      caption,
      captionDesc,
      ...(videoSrc ? { videoSrc, kind: 'video' as const } : {}),
    };
  });
}

const hwidShowcaseSlides = hwidSlide(...HWID_GALLERY_KEYS);

function slugFromHref(href: string): string {
  const normalized = href.replace(/^\//, '').replace(/\/$/, '');
  if (normalized === HWID_SPOOFER_SLUG || normalized.endsWith(`/${HWID_SPOOFER_SLUG}`)) {
    return HWID_SPOOFER_SLUG;
  }
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  if (!segment || segment === 'dota-2-cheats' || segment === 'cheats') {
    return CHEATS_PRIMARY_SLUG;
  }
  return segment;
}

const tierAbout: Record<string, ProductPage['about']> = {
  elite: [
    {
      type: 'p',
      text: 'This license is for The Isle: Evrima on Windows. It adds player, NPC, and animal ESP with boxes, names, distance, health, stamina, growth, species, player direction, head dots, visible checks, and snaplines, plus world markers for corpses, gore, fruit, and water. Interface options include crosshair, fullbright, show FPS, resolution, time, custom menu and panic keys, and custom ESP colors, with saveable configs. Menus are available in English and Russian. Cloud DMA is a separate purchase and is required for full functionality. Verify system requirements and the live status page before you install or launch.',
    },
    { type: 'h2', text: 'Tune before you play' },
    {
      type: 'p',
      text: 'Load portal presets offline first, then raise ESP max distance and label density over several sessions. Discord staff help with loader tabs if a module conflicts after an Easy Anti-Cheat patch.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  elite: [
    { type: 'h2', text: 'Plans and delivery' },
    {
      type: 'p',
      text: 'Choose monthly or lifetime at checkout. The operator portal unlocks instantly with loader download, preset library and patch notes. Check the live status banner before every session.',
    },
    { type: 'h2', text: 'Module layout' },
    {
      type: 'p',
      text: 'Player, dinosaur, world, and misc panels sit in the loader menu so you can enable only the overlays and HUD helpers you need for each session.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When this tool matches' },
    {
      type: 'p',
      text: 'Use it if brand-new The Isle logins die on one PC but work on a different machine. That pattern points to hardware enforcement, not an account-only anti-cheat result. Skip this utility when the penalty stays on the account alone. After identifiers look fresh, pair a clean login with conservative presets from [the isle cheats](/product/). Start with the portal compatibility scan, create a Windows restore point, finish a cold reboot, and confirm the IDs actually changed before opening the game.',
    },
    { type: 'h2', text: 'Step sequence' },
    {
      type: 'p',
      text: 'Create a restore point, clean drivers, run the spoof, cold reboot, verify identifiers, then load a low-profile cheat profile. Portal docs and the HWID blog guide follow that same order. Never stack two spoof tools. Shared or work PCs may be unsuitable. Driver-level edits stay your risk. Check {siteDomain} status once before you pay and once more before you launch.',
    },
    { type: 'h2', text: 'What you need to run it' },
    {
      type: 'p',
      text: 'Use an administrator account on 64-bit Windows 10 or 11. Create a Windows restore point first. Keep a steady connection while portal verification tools run. Complete every portal guide step before opening The Isle again.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  elite: {
    images: showcaseSlides,
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: productSystemRequirements,
    fullFeatures: [
      'NPC ESP and animal ESP',
      'World markers: corpse, gore, fruit, and water',
      'World ESP max-distance controls',
      'Misc: crosshair, fullbright, show FPS, resolution, time, custom menu key, panic key, custom ESP colors',
      'Saveable configs',
      'English and Russian menus',
      'Designed for Easy Anti-Cheat; check status after patches',
      'Instant delivery via operator portal',
      'Windows 10/11 with HVCI, Core Isolation, TPM, and Secure Boot enabled',
      'The Isle: Evrima only (Steam)',
      'Cloud DMA required for full functionality (separate purchase)',
    ],
    overview: {
      title: 'ESP and visuals for The Isle: Evrima',
      paragraphs: [
        'Enhance Evrima sessions with player, NPC, and animal ESP, environmental markers, and a configurable visuals menu. Overlays can show boxes, names, distance, health, stamina, growth, species, direction, snaplines, and loot indicators so you pick up situational detail without guessing in the bush.',
        'Built for Windows 10 and 11 when HVCI, Core Isolation, TPM, and Secure Boot are enabled. Monthly and lifetime plans are available at checkout. Cloud DMA is a separate purchase and is required for full functionality. Confirm compatibility and online status on {siteDomain} before you buy or launch.',
      ],
    },
  },
  'skin-changer': {
    images: showcaseSlides.slice(0, 1),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: productSystemRequirements,
    fullFeatures: [
      'High-tier weapon skins',
      'Outfit packs',
      'Knife finish library',
      'Multi-title support',
    ],
    overview: {
      title: 'Skin Changer',
      paragraphs: [
        'Low-footprint client that applies premium weapon skins, outfits, and knife styles on supported PC games.',
      ],
    },
  },
  'hwid-spoofer': {
    images: hwidShowcaseSlides,
    goodToKnow:
      'Before any spoof pass, run the portal compatibility scan. Create a Windows restore point first. After a cold reboot, confirm the identifier changes before launching The Isle.',
    limitations:
      'Designed for hardware-level flags rather than account-only anti-cheat restrictions. Do not run two spoof tools at once. Shared or work PCs may be unsuitable. Driver-level edits stay your risk. Check the status page on {siteDomain} before checkout.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Administrator rights on 64-bit Windows 10 or 11 for portal steps.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a Windows restore point before the first spoof.' },
      { icon: 'reqShieldGuide', text: 'Complete the full portal guide before opening The Isle after a spoof.' },
      { icon: 'reqWifi', text: 'Steady internet while portal verification and identifier diff tools run.' },
    ],
    fullFeatures: [
      'Disk serial profiling panel',
      'MAC rotation controls in portal',
      'Restore-point setup walkthrough',
      'Compatibility scan before spoof',
      'Driver collision checks',
      'After-spoof validation prompts',
      'Changed-ID report view',
      'Cold-reboot step guide',
      'Portal milestone checklist UI',
      'Discord hardware recovery channel',
    ],
    overview: {
      title: 'Recovery aimed at the machine fingerprint',
      paragraphs: [
        'Anti-cheat can bind bans to PC fingerprints even when the The Isle account still looks clean. This utility groups disk, MAC, and GPU ID tooling with a restore-point checklist, a portal compatibility scan, and post-reboot verification prompts designed to confirm changes before you play again.',
        'Choose it when brand-new accounts fail on one rig yet work elsewhere, not when the penalty is account-only. After the spoof, pull conservative presets on {siteDomain}, then re-check the status banner ahead of your next session.',
      ],
    },
  },
};

function buildTierPages(t: Translations): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = 'the isle cheats';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.heroDesc ?? cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(t: Translations): ProductPage[] {
  const pages: ProductPage[] = [];

  for (const product of t.products.items) {
    const slug = slugFromHref(product.href);
    const content = productContent[slug];
    if (!content) continue;

    pages.push({
      slug,
      kind: 'utility',
      badge: product.badge,
      category: product.category,
      name: product.title,
      title: product.title,
      subtitle: product.subtitle,
      desc: product.desc,
      features: product.features,
      more: product.more,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition:
        slug === 'hwid-spoofer'
          ? { title: 'How to get HWID Spoofer', steps: hwidAcquisitionSteps }
          : acquisitionFor(product.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      body: utilityBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
    });
  }

  return pages;
}

export function getProductPages(locale: SiteLocale): ProductPage[] {
  const t = getTranslations(locale);
  return [...buildTierPages(t), ...buildUtilityPages(t)].map((page) =>
    deepApplySiteTokens(applyProductCopy(page, locale)),
  );
}

export function getCheatPages(locale: SiteLocale) {
  return getProductPages(locale).filter((p) => p.kind === 'tier');
}

export function getProductPage(slug: string, locale: SiteLocale) {
  return getProductPages(locale).find((p) => p.slug === slug);
}

/** Tier slugs for sitemap extras, store lives at `PRODUCT_BASE` only. */
export function getAllProductSlugs(): string[] {
  const slugs = getAllCheatSlugs();
  const catalog = new Set<string>(CHEAT_PRODUCT_SLUGS);
  for (const slug of slugs) {
    if (!catalog.has(slug as (typeof CHEAT_PRODUCT_SLUGS)[number])) {
      throw new Error(`Cheat slug "${slug}" missing from CHEAT_PRODUCT_SLUGS in src/config/catalog.ts`);
    }
  }
  return [];
}

export function getHwidSpooferPage(locale: SiteLocale) {
  return getProductPage(HWID_SPOOFER_SLUG, locale);
}

export function getAllCheatSlugs() {
  return getCheatPages('en').map((p) => p.slug);
}

export function getHeroSlides(_locale: SiteLocale): ProductSlide[] {
  return showcaseSlides;
}

const productCopyByLocale: Record<Exclude<SiteLocale, 'en'>, ProductCopyBundle> = {
  es: esProductCopy as ProductCopyBundle,
  de: deProductCopy as ProductCopyBundle,
  fr: frProductCopy as ProductCopyBundle,
};

function acquisitionTitleFor(productName: string) {
  return `How to get ${productName}`;
}

function buildEnglishProductCopyBundle(): ProductCopyBundle {
  const tierSlugs = ['elite'] as const;
  const utilitySlugs = ['hwid-spoofer'] as const;

  const tiers = Object.fromEntries(
    tierSlugs.map((slug) => {
      const content = productContent[slug];
      const displayName = 'the isle cheats';
      return [
        slug,
        {
          about: tierAbout[slug],
          body: tierBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: acquisitionTitleFor(displayName),
        },
      ];
    }),
  ) as ProductCopyBundle['tiers'];

  const utilities = Object.fromEntries(
    utilitySlugs.map((slug) => {
      const content = productContent[slug];
      const title = 'HWID Spoofer';
      return [
        slug,
        {
          body: utilityBodies[slug] ?? [],
          overview: content.overview,
          goodToKnow: content.goodToKnow,
          limitations: content.limitations,
          acquisitionTitle: acquisitionTitleFor(title),
        },
      ];
    }),
  ) as ProductCopyBundle['utilities'];

  return {
    sharedGoodToKnow,
    sharedLimitations,
    acquisitionSteps: defaultAcquisitionSteps.map(({ num, title, desc }) => ({ num, title, desc })),
    systemRequirements: productSystemRequirements.map((r) => r.text),
    gallery: Object.values(galleryRaw).map(({ alt, caption, captionDesc }) => ({
      alt,
      caption,
      captionDesc,
    })),
    hwidGallery: HWID_GALLERY_KEYS.map((key) => {
      const { alt, caption, captionDesc } = hwidGalleryRaw[key];
      return { alt, caption, captionDesc };
    }),
    tiers,
    utilities,
  };
}

registerProductCopyBundle(buildEnglishProductCopyBundle());

export const heroSlides = getHeroSlides('en');

function productCopyFor(locale: SiteLocale): ProductCopyBundle {
  if (locale === 'en') return getProductCopyBundle();
  return productCopyByLocale[locale];
}

function applyProductCopy(page: ProductPage, locale: SiteLocale): ProductPage {
  if (locale === 'en') return page;
  const copy = productCopyFor(locale);
  const bucket = page.kind === 'tier' ? copy.tiers[page.slug] : copy.utilities[page.slug];
  if (!bucket) return page;

  const steps = copy.acquisitionSteps.map((step) => ({ ...step }));
  const acquisition: ProductAcquisition = {
    title: bucket.acquisitionTitle,
    steps,
  };

  const gallerySource =
    page.kind === 'tier' ? copy.gallery : (copy.hwidGallery ?? []);
  const images = page.images.map((slide, index) => {
    const g = gallerySource[index];
    if (!g) return slide;
    return { ...slide, alt: g.alt, caption: g.caption, captionDesc: g.captionDesc };
  });

  const systemRequirements = page.systemRequirements.map((req, index) => ({
    ...req,
    text: copy.systemRequirements[index] ?? req.text,
  }));

  return {
    ...page,
    overview: bucket.overview,
    body: bucket.body,
    about: 'about' in bucket ? bucket.about : page.about,
    goodToKnow: bucket.goodToKnow,
    limitations: bucket.limitations,
    acquisition,
    images,
    systemRequirements,
  };
}

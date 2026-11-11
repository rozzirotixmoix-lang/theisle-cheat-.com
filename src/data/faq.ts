import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, ROUTES } from '../utils/path';
import type { SiteLocale } from '../i18n/locales';
import { getSiteFaqs as getSiteFaqsForLocale } from './faq/locale';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'aim'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const cheats = link('the isle cheats', ROUTES.cheats);
const hwid = link('HWID Spoofer', ROUTES.hwidSpoofer);
const faqPage = link('full FAQ', ROUTES.faq);
const blog = link('blog guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if The Isle cheats are online?',
    a: a(
      'The live status banner is on {siteDomain} and in the Discord #status channel. Always check after a The Isle or Easy Anti-Cheat update.',
    ),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a(
      'Your portal unlocks the loader, setup guide and config library via our partner checkout. Follow the guide before launching The Isle.',
    ),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party the isle cheats?',
    a: a(
      'Yes, any modification carries risk. Easy Anti-Cheat and report systems evolve. Read current status and accept the risk before use.',
    ),
    aHtml: `Yes, any modification carries risk. Easy Anti-Cheat and report systems evolve. Read current status and accept the risk before use.`,
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('The Isle on Windows 10/11 64-bit only. macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes. Trigger the portal HWID reset, or file a Discord ticket if the portal option is unavailable. Limits depend on your tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `${cheats} and ${hwid} are the two products we sell, feature lists and checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is The Isle ESP?',
    a: `Survivor overlays show box, snapline, name, distance, health, stamina, growth, and species readouts. World ESP covers NPC and animal overlays plus corpse, gore, fruit, and water markers. ${cheats} also includes aim assistance and radar.`,
    scopes: ['elite'],
  },
  {
    id: 'esp-vs-aim',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP and aim assistance?',
    a: `ESP is an information overlay; it does not move your aim. Aim assistance on ${cheats} adds FOV, smoothing, lock, and head-only options you tune separately in the loader.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why are the isle cheats slots limited?',
    a: `It is a private build with direct dev support and priority patch delivery. Slot caps keep patch cycles fast. Check the status banner before checkout.`,
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: `Stream-proof mode on ${cheats} hides overlays from OBS and Discord share. Test a local recording before going live.`,
  },
  {
    id: 'build-status',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Will the build stay online after every patch?',
    a: a(
      'No. Online status is shown on the product page and status banner at purchase time only. Stop if the build shows updating, testing, or offline after an Easy Anti-Cheat update.',
    ),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP lower-profile than aim assistance?',
    a: a(
      'ESP is often less obvious than maxed aim assistance, but it is still a cheat. Easy Anti-Cheat does not ignore overlays because you left aim help off.',
    ),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When does HWID Spoofer belong in a setup?',
    a: `Add ${hwid} when new The Isle logins fail on one PC but succeed elsewhere. That pattern points to hardware enforcement, not an account-only anti-cheat result. Once identifiers verify clean, pair a fresh account with ${cheats} and check status on {siteDomain} before you play.`,
    scopes: ['hwid-spoofer', 'elite'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader injected into the game folder?',
    a: `The loader runs external with cloud config sync, no files injected into the The Isle directory. Easy Anti-Cheat risk still applies. See ${cheats}.`,
  },
  {
    id: 'blog-vs-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog cheat codes the same as the live loader?',
    a: `No. Blog articles about offline or local testing do not replace the live loader. Live sessions use ${cheats} when status is online.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do blog setup guides point for purchase?',
    a: `Guides link to ${cheats} and ${hwid}. Checkout runs through our partner, never paste loader files from random Discord DMs.`,
  },
  {
    id: 'who-cheats',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who should buy the isle cheats?',
    a: `Windows players who want player ESP, world ESP, aim assistance, radar, and priority patch delivery for The Isle Evrima and Horde when slots are open.`,
    scopes: ['elite'],
  },
  {
    id: 'vac-update',
    topic: 'safety',
    icon: 'faqVacUpdate',
    q: 'What should I do after an Easy Anti-Cheat update?',
    a: a(
      'Check {siteDomain} status and Discord #status. Do not launch until the banner shows online. Load conservative presets after any patch.',
    ),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: a(
      'Open Discord after purchase with your order email, Windows version and The Isle client build. Staff walk through loader setup live.',
    ),
  },
  {
    id: 'evrima-horde',
    topic: 'plans',
    icon: 'faqTurboRanked',
    q: 'Do modules work on Evrima and Horde?',
    a: `Yes. ${cheats} covers The Isle Evrima and Horde. Tune ESP distance caps and aim smoothing before your first live session.`,
  },
  {
    id: 'zoom-hack',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Which tier includes radar?',
    a: `Radar ships with ${cheats} alongside player and world ESP. Use it to orient when foliage blocks sightlines.`,
    scopes: ['elite'],
  },
  {
    id: 'trigger-bot',
    topic: 'aim',
    icon: 'faqAutoFarm',
    q: 'Does the product include movement and combat utilities?',
    a: `Yes. Movement and combat utilities ship with ${cheats} beside aim assistance. Start with conservative portal presets.`,
    scopes: ['elite'],
  },
  {
    id: 'private-cheats',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What are private The Isle cheats?',
    a: a(
      'Private means per-user keys and maintained builds, not public zip packs. Portal delivery covers the full Windows suite on one cheats license.',
    ),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the ${faqPage} for all product, cheat and blog answers, or read ${blog} for deep guides.`,
  },
];

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter plans, ESP, aim, products, setup, and blog answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'aim',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading. Visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export { getProductFaqs, getSiteFaqs, getLandingFaqs, getAllFaqs } from './faq/locale';

const blogGuideFaqs: SiteFaqItem[] = [
  {
    id: 'blog-guide-start',
    topic: 'blog',
    icon: 'faqBlogGuideStart',
    q: 'Do offline cheat codes replace the live loader?',
    a: a(
      'No. Local or offline testing does not replace the operator loader. Live sessions use the product on {siteDomain} when status shows online.',
    ),
  },
  {
    id: 'blog-guide-tier',
    topic: 'blog',
    icon: 'faqBlogGuideTier',
    q: 'Which tier matches this guide?',
    a: `Setup and feature guides map to modules on ${cheats}. HWID and ban articles pair with ${hwid} when hardware is flagged.`,
  },
  {
    id: 'blog-guide-status',
    topic: 'blog',
    icon: 'faqBlogGuideStatus',
    q: 'Is this guide still valid after a patch?',
    a: a(
      'Check the article date and the live status banner. Patch-day articles note when modules change: Discord #status has the latest build notes.',
    ),
  },
];

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: blogGuideFaqs,
  'Game Cheats Guides': blogGuideFaqs,
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout, not from third-party links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test settings before a live session?',
      a: a(
        'Yes. Load conservative ESP and aim presets offline first. Raise FOV, smoothing, and world ESP distance caps over several sessions.',
      ),
    },
  ],
  Security: [
    {
      id: 'blog-sec-vac',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article mean the build stays online?',
      a: a(
        'No article replaces the live status banner. Check {siteDomain} and Discord #status after every patch before you launch.',
      ),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${cheats} and ${hwid}. Feature lists on those pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a(
      'Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.',
    ),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a(
      'Re-check status after every The Isle update. Portal presets update with patch notes, reload configs instead of copying old sliders.',
    ),
  },
];

export function getBlogFaqs(tag: string, slug: string, locale: SiteLocale = 'en'): SiteFaqItem[] {
  if (locale !== 'en') {
    const localized = getSiteFaqsForLocale(locale);
    const topicFaqs = localized.filter((f) => f.topic === 'blog').slice(0, 4);
    const extras: SiteFaqItem[] = [];
    if (slug.includes('esp') || slug.includes('loot') || slug.includes('radar')) {
      extras.push(...localized.filter((f) => f.topic === 'esp').slice(0, 2));
    }
    if (slug.includes('aim') || slug.includes('recoil') || slug.includes('trigger')) {
      extras.push(...localized.filter((f) => f.topic === 'aim').slice(0, 2));
    }
    if (slug.includes('hwid') || slug.includes('ban') || slug.includes('vac')) {
      extras.push(...localized.filter((f) => f.id === 'hwid-when' || f.topic === 'products').slice(0, 2));
    }
    extras.push(...localized.filter((f) => ['setup', 'safety'].includes(f.topic)).slice(0, 2));
    const seen = new Set<string>();
    return [...extras, ...topicFaqs, ...localized.filter((f) => f.topic === 'blog')]
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .slice(0, 8);
  }
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('esp') || slug.includes('loot') || slug.includes('radar') || slug.includes('world')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which product covers ESP from this article?',
      a: `${cheats} includes survivor overlays, world ESP, and radar described in our The Isle guides.`,
    });
  }
  if (slug.includes('aim') || slug.includes('recoil') || slug.includes('trigger') || slug.includes('combat')) {
    slugHints.push({
      id: 'blog-slug-aim',
      topic: 'aim',
      icon: 'faqBlogSlugScripts',
      q: 'Which product includes aim modules from this article?',
      a: `${cheats} ships aim assistance with FOV, smoothing, lock, and head-only options in the loader.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('vac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Do recovery guides replace HWID Spoofer or cheat product pages?',
      a: `Guides sit beside ${hwid} and ${cheats}. Product pages define workflow scope and realistic outcomes.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

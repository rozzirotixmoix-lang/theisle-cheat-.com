import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { PRODUCT_BASE, SITE_DOMAIN, SITE_NAME } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: SITE_NAME,
    domain: SITE_DOMAIN,
    title: 'The Isle Cheats for Evrima: ESP and HUD on Windows',
    description:
      'The Isle cheats for Evrima on Windows: ESP overlays, world markers and HUD tools. Compare monthly and lifetime plans; check live status before checkout.',
  },
  nav: [
    {
      id: 'products',
      href: `${productBase}`,
      label: 'Product',
      shortLabel: 'Product',
      ariaLabel: 'Open product page',
    },
    { id: 'blog', href: '/blog/', label: 'Blog', ariaLabel: 'Browse blog' },
    { id: 'forum', href: '/forum/', label: 'Forum', ariaLabel: 'Open forum' },
    { id: 'faq', href: '/faq/', label: 'FAQ', ariaLabel: 'Open FAQ' },
    { id: 'support', href: '/support/', label: 'Support', ariaLabel: 'Open support' },
  ],
  hero: {
    status: 'The Isle, patch build online',
    eyebrow: '#1 CHEATS PROVIDER',
    titleLine1: 'The Isle Cheats for Evrima:',
    titleLine2: 'ESP and HUD on Windows',
    subtitle:
      'Bring the menu online for Evrima after you read the status banner. Windows loader, portal presets, then ESP distance and overlay tuning.',
    ctaPrimary: 'View products',
    metrics: [
      { label: 'Stream-proof', strong: 'Yes' },
      { label: 'Patch speed', strong: '<24h' },
      { label: 'Users', strong: '300+' },
      { label: 'Live support', strong: '24/7' },
    ],
    statusPills: [
      'ESP Active',
      'Radar Online',
      'Season Build',
      'Aim Ready',
      'Soft Aim Ready',
      'World Markers',
      'Stream Proof',
      'World ESP',
      'Skeleton ESP',
      'Minimap Radar',
      'Player Labels',
      '24/7 Support',
      'Instant Delivery',
      'Evrima Ready',
      'Combat Utils',
      'Head Lock',
      'Live Status',
      'Auto Updates',
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need in one package',
    subtitle:
      'Player, NPC, and animal ESP, environmental tracking, and visual HUD options for The Isle: Evrima, maintained after Easy Anti-Cheat patches.',
    items: [
      {
        title: 'World ESP',
        subtitle: 'Mark the island around you.',
        desc: 'NPC and animal ESP plus corpse, gore, fruit, and water markers with max-distance controls.',
        bullets: [
          'NPC ESP and animal ESP',
          'Corpse, gore, fruit, and water markers',
          'World ESP max distance controls',
          'Tune range per session in the portal',
        ],
        tags: ['world esp', 'animal esp', 'the isle markers'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'NPC & animal ESP',
        subtitle: 'Track dinosaurs and AI.',
        desc: 'Species, growth, health, and distance readouts for NPCs and animals with the same overlay controls as survivor ESP.',
        bullets: [
          'NPC ESP and animal ESP toggles',
          'Species, growth, and health labels',
          'Distance filters per target type',
          'Pairs with overlay distance caps',
        ],
        tags: ['animal esp', 'npc esp', 'dinosaur esp'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Snaplines & distance',
        subtitle: 'Line up what matters.',
        desc: 'Snaplines and meter readouts tie overlays to targets so you judge range quickly in tall grass and night runs.',
        bullets: [
          'Snaplines to players and dinos',
          'Distance display on labels',
          'Visible-check filters',
          'Tune max range in the portal',
        ],
        tags: ['snaplines', 'distance esp', 'visible check'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-2',
      },
      {
        title: 'Environmental ESP',
        subtitle: 'Loot and resources on the map.',
        desc: 'Corpse, gore, fruit, and water markers with max-distance sliders so you spot resources without wandering blind.',
        bullets: [
          'Corpse, gore, fruit, and water toggles',
          'World ESP max-distance slider',
          'Colored filters per resource type',
          'Enable only what the session needs',
        ],
        tags: ['world esp', 'corpse esp', 'water esp'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Visual options',
        subtitle: 'See the feed your way.',
        desc: 'Crosshair, fullbright, show FPS, resolution, time, custom menu and panic keys, plus custom ESP colors.',
        bullets: [
          'Crosshair, fullbright, show FPS',
          'Resolution and time helpers',
          'Custom menu and panic keys',
          'Custom ESP colors',
        ],
        tags: ['fullbright', 'custom esp', 'panic key'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-3',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Built for creators.',
        desc: 'Keep overlays on your monitor while capture software records a clean game feed.',
        bullets: ['OBS and Game Bar capture modes', 'Toggle stream proof per module', 'Test checklist in portal docs'],
        tags: ['obs capture', 'stream proof', 'capture hide'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-5',
      },
      {
        title: 'Misc utilities',
        subtitle: 'Menus and configs.',
        desc: 'English and Russian menus, saveable configs, and the leftover session toggles grouped with the rest of the loader.',
        bullets: [
          'English and Russian menus',
          'Saveable configs per PC',
          'Session toggles in one place',
          'Reload after Easy Anti-Cheat patches',
        ],
        tags: ['saveable configs', 'ru menu', 'the isle utilities'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-5',
      },
      {
        title: 'Cloud Config & Updates',
        subtitle: 'Patch day ready.',
        desc: 'Same presets on every PC; portal updates track The Isle and Easy Anti-Cheat patch days.',
        bullets: ['Cloud backup for slider profiles', 'Loader push within hours of patches', 'Discord #status for build notes'],
        tags: ['cloud sync', 'auto update', 'presets'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-1',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'Island tooling backed by patches, not promises',
    subtitle:
      'Many cheat shops ship stale loaders, obvious rage presets, and ticket bots. The Isle Cheats on {siteDomain} focus on patch-day loader builds, conservative ESP defaults, and live Discord operators.',
    usLabel: 'the isle cheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Patch-day loader updates',
        desc: 'Easy Anti-Cheat-aware builds pushed within hours of The Isle updates; check Discord #status before you join a server.',
      },
      {
        title: 'Humanized aim & ESP defaults',
        desc: 'FOV caps, smoothing and distance filters ship conservative in the portal so overlays stay readable, not wall-of-box rage modes.',
      },
      {
        title: 'Live Discord operators',
        desc: 'Real engineers for loader setup, Evrima configs and HWID resets: 24/7 shift coverage, not copy-paste FAQ tickets.',
      },
      {
        title: 'External loader + stream proof',
        desc: 'Overlay suite with OBS capture modes, without DLL injection into the The Isle process like legacy providers still sell.',
      },
      {
        title: 'Cloud preset sync',
        desc: 'Evrima, Horde, and per-session profiles backup to the portal, same sliders on any PC without rebuilding from scratch.',
      },
      {
        title: 'HWID reset & license moves',
        desc: 'HWID clears and machine transfers handled through Discord ops, most providers lock one rig or charge for every swap.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Average time to ship a loader build after major The Isle or Easy Anti-Cheat changes.',
      },
      {
        value: '24/7',
        title: 'Operator support',
        desc: 'Discord engineers on shift for setup, configs and account issues.',
      },
      {
        value: '300+',
        title: 'Active operators',
        desc: 'Windows players running ESP, aim assistance and utilities on {siteDomain}.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to your first session in just',
    titleHighlight: 'three simple steps',
    intro:
      'Follow the operator portal flow to download the loader, load presets, and launch The Isle on Windows. Discord help is available if a step blocks you.',
    ctaPrimary: 'View products',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Unlock portal & download loader',
        desc: 'Complete checkout, open your operator dashboard, and pull the latest patch loader build for Windows.',
      },
      {
        step: 'Step 2',
        title: 'Launch & configure modules',
        desc: 'Run the external loader, import portal presets, and tune ESP and aim assistance sliders offline first.',
      },
      {
        step: 'Step 3',
        title: 'Verify status & launch The Isle',
        desc: 'Check the live status banner, launch the Steam client, and play with cloud-backed profiles saved in the portal.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check the live status banner before launching The Isle after updates.',
    items: [
      'Windows 10 & 11 (HVCI + Secure Boot)',
      'The Isle: Evrima only',
      'Easy Anti-Cheat',
      'Steam',
      'Cloud DMA (separate purchase)',
      'Config cloud sync',
      'Discord support',
      'External loader',
    ],
  },
  cheats: {
    eyebrow: 'Main product',
    title: 'the isle cheats',
    subtitle:
      'Player, NPC, and animal ESP, environmental markers, and visual HUD tools for The Isle: Evrima.',
    viewAll: 'View product details',
    explore: 'Explore',
    items: [
      {
        badge: 'Limited slots',
        tier: 'Private',
        name: 'Elite',
        title: 'The Isle Cheats',
        desc: 'Player, NPC, and animal ESP, corpse and resource markers, snaplines, distance labels, and misc HUD tools for The Isle: Evrima. Cloud DMA is a separate purchase and is required for full functionality. Instant delivery; check status after patches.',
        heroDesc:
          'Feature-rich ESP and visual overlays for Evrima on Windows. Verify HVCI, Core Isolation, TPM, Secure Boot, and Cloud DMA before checkout.',
        features: ['NPC ESP', 'Animal ESP', 'World markers', 'Misc HUD', 'Evrima only'],
        more: 6,
        href: productBase,
        variant: 'limited',
      },
    ],
  },
  products: {
    eyebrow: 'Store',
    title: 'Our products',
    subtitle: 'Main The Isle license plus HWID Spoofer: separate checkout paths for Evrima play and machine recovery.',
    viewAll: 'View all cheats',
    backToCheats: 'Back to product',
    showcaseHeading: 'Product Overview',
    experience: {
      eyebrow: 'Experience',
      title: 'Loader layers · After checkout',
      subtitle:
        'Use the screenshots above for module layout; below is what each layer does and how portal access works after purchase.',
      previewLabel: 'In-game layers',
      accessDividerTop: 'Preview',
      accessDividerBottom: 'Access',
    },
    hwidPage: {
      showcaseHeading: 'Portal panel screenshots',
      overviewSubtitle:
        'Disk, MAC, and GPU ID tools for prep, verification, and launches after a spoof. Confirm status on {siteDomain} first.',
      highlights: {
        eyebrow: 'Quick read',
        title: 'What this utility covers',
        desc: 'Recover a machine fingerprint before linking a fresh The Isle account. The full tool list is below.',
      },
      featuresSection: {
        eyebrow: 'Tooling',
        title: 'Modules in the portal',
        desc: 'Ten recovery utilities you turn on and adjust from the operator portal after checkout.',
      },
      experience: {
        eyebrow: 'Post-purchase',
        title: 'Panel shots · Access flow',
        subtitle:
          'Screenshots sit on the left; the right side covers portal access and spoof milestones after payment.',
        previewLabel: 'Panel views',
        accessDividerTop: 'UI',
        accessDividerBottom: 'Steps',
      },
      highlightsMore: 'Plus {count} more recovery tools inside the portal. Scroll to the full module grid.',
    },
    swipeHint: 'Swipe for more screenshots',
    checkoutEyebrow: 'Checkout',
    checkoutSelect: 'Access length',
    checkoutSingle: 'Purchase option',
    checkoutTotal: 'Total',
    bestValue: 'Best value',
    planMonthly: 'Monthly',
    planLifetime: 'Lifetime',
    planOneTime: 'One-time access',
    planPerMonth: 'USD / month',
    planOneTimeNote: 'USD, one time',
    get: 'Get',
    explore: 'Explore',
    buyNow: 'Buy now',
    buy: 'Buy',
    viewDetails: 'View details',
    items: [
      {
        badge: 'Available',
        category: 'System utility',
        title: 'HWID Spoofer',
        subtitle:
          'Pick this utility when the isle easy anti cheat stack blocks new logins on one PC that still work elsewhere. Spoof, cold reboot, then confirm identifiers.',
        desc: 'Through the operator portal, change disk serials, MAC addresses, and GPU IDs, then complete the setup checklist before launching The Isle.',
        features: [
          'Drive cleanup and spoof kit',
          'Serial profile rotation',
          'Compatibility scan before spoof',
          'Post-reboot verification prompts',
        ],
        more: 9,
        href: '/hwid-spoofer/',
      },
      {
        badge: 'Available',
        category: 'Cosmetic',
        title: 'Skin Changer',
        subtitle: '',
        desc: 'Low-footprint client that applies premium weapon skins, outfits, and knife styles on supported PC games.',
        features: [
          'High-tier weapon skins',
          'Outfit packs',
          'Knife finish library',
          'Multi-title support',
        ],
        more: 0,
        href: '/skin-changer/',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Guides and updates',
    pageH1: 'The Isle cheat guides on theisle-cheat.com',
    subtitle: 'ESP and aim setup, world markers, and Easy Anti-Cheat patch-day checks for The Isle.',
    latestTitle: 'Browse guides by topic',
    latestSubtitle: 'Filter by topic to find setup guides, feature deep-dives, and patch-day notes.',
    filterAll: 'All articles',
    emptyFilter: 'No articles match this filter.',
    emptyArchive: 'No articles yet. New guides will show up here.',
    viewAll: 'View all articles',
    read: 'Read full guide',
    articleActionsAria: 'Continue reading',
    buyCta: 'Buy the isle cheats',
    buyHwidCta: 'Buy HWID Spoofer',
    moreArticles: 'More articles',
    sidebarAria: 'Article sidebar',
    tocTitle: 'In this article',
    relatedTitle: 'Related guides',
    filterToolbarAria: 'Filter articles by topic',
    navHome: 'Return to homepage',
    navProduct: 'Open Evrima product checkout',
    navForum: 'Browse forum archive threads',
    items: [],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from status check to an Evrima profile you can reuse every session.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check live status',
        desc: 'Read the live banner on {siteDomain} before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Choose your product',
        desc: 'Pick the isle cheats or HWID Spoofer, whichever matches flags, rigs, or account resets you face.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch & configure',
        desc: 'Download from the portal, enable modules, and tune ESP and aim sliders offline first.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your profile',
        desc: 'When settings feel right, save Evrima and Horde presets to the cloud.',
      },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'the isle cheats Support',
    subtitle:
      'Loader, checkout, and status questions for The Isle Evrima and Horde on Windows. Operators cover the main license and HWID Spoofer. Check the live status banner before you open a ticket after a game or Easy Anti-Cheat patch.',
    channels: [
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Ask about monthly vs lifetime plans and what Cloud DMA covers before you pay. Confirm which product page matches your goal: the isle cheats or HWID Spoofer.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Chat to support',
        desc: 'After purchase on Steam Windows builds: loader errors, HWID Spoofer tickets, license moves, and portal access that fails to unlock after payment.',
        linkLabel: '{supportEmail}',
        href: 'mailto:{supportEmail}',
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, Easy Anti-Cheat status, plans, and setup steps before you buy or before you file a ticket.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Live operators',
        desc: 'Discord engineers on shift 24/7 for portal, loader, and patch-day questions. Include the ticket checklist below so the first reply can move faster.',
        linkLabel: 'Open contact page',
        href: '/support/',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      {
        title: 'Order email',
        desc: 'The address used at checkout on {siteDomain} or via our partner checkout. Add the order ID if the receipt shows one.',
      },
      {
        title: 'Platform',
        desc: 'Windows 10 or 11, Steam, and your The Isle Evrima or Horde build. Note CPU and GPU brands when the loader fails to start.',
      },
      {
        title: 'Error detail',
        desc: 'Screenshot or exact message from the loader or game client. Say whether the status banner was online when the error happened.',
      },
      {
        title: 'Product',
        desc: 'Name the isle cheats or HWID Spoofer, and whether you bought monthly or lifetime, so operators open the right portal path.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, bans and access, no vague promises.',
    items: [
      {
        num: '01',
        q: 'Where do I check if The Isle cheats are online?',
        a: 'The live status banner is on {siteDomain} and in the Discord #status channel. Always check after a The Isle or Easy Anti-Cheat update.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Your portal unlocks the loader, setup guide and config library via our partner checkout. Follow the guide before launching The Isle.',
      },
      {
        num: '03',
        q: 'Can I get banned using third-party the isle cheats?',
        a: 'Yes, any modification carries risk. Easy Anti-Cheat and report systems evolve. Read current status and accept the risk before use.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'The Isle on Windows 10/11 64-bit only. macOS and Linux are not supported.',
      },
      {
        num: '05',
        q: 'Can I move my license to a new PC?',
        a: 'Yes. Trigger the portal HWID reset, or file a Discord ticket if the portal option is unavailable. Limits depend on your tier.',
      },
      {
        num: '06',
        q: 'Where are products and utilities listed?',
        a: 'Product and HWID Spoofer live at {siteDomain}/product/ and {siteDomain}/hwid-spoofer/ with feature lists and checkout via our partner.',
      },
    ],
  },
  footer: {
    tagline:
      'The Isle cheats with ESP overlays, world markers, aim assistance and radar for Windows. Guides and live status on {siteDomain}.',
    explore: 'Explore',
    exploreLinks: [
      { id: 'features', href: '/', label: 'Homepage feature overview', ariaLabel: 'Homepage features section', scrollTarget: 'features' },
      { id: 'products', href: productBase, label: 'Evrima cheats product page', ariaLabel: 'Evrima cheats product' },
      { id: 'hwidSpoofer', href: '/hwid-spoofer/', label: 'HWID spoofer utility', ariaLabel: 'HWID spoofer product page' },
      { id: 'blog', href: '/blog/', label: 'The Isle setup guides', ariaLabel: 'Blog guides' },
      { id: 'forum', href: '/forum/', label: 'Community forum archive', ariaLabel: 'Forum discussions' },
    ],
    supportLinks: [
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
      { href: '/support/', label: 'Contact support', ariaLabel: 'Support' },
    ],
    support: 'Support',
    share: 'Share this page',
    shareOnX: 'Share on X (Twitter)',
    shareOnFacebook: 'Share on Facebook',
    shareOnReddit: 'Share on Reddit',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About the isle cheats',
      description:
        'the isle cheats publishes The Isle product pages, status notes, and support channels for buyers.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'the isle cheats is a PC resource for players evaluating ESP overlays, world markers, aim assistance, and radar for The Isle Evrima. We publish setup notes and live status so you can read the facts before checkout.',
            'The main license is available on monthly and lifetime plans at checkout. Cloud DMA is a separate purchase and is required for full functionality. All product names are used for identification only.',
            'Editorial coverage on {siteDomain} includes step-by-step Windows setup, ESP tuning walkthroughs, Easy Anti-Cheat patch-day checklists, and HWID recovery notes so buyers know what the loader covers before payment.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'This site covers the isle cheats and HWID Spoofer. Guides explain loader presets, Cloud DMA requirements, and Easy Anti-Cheat patch-day checks.',
            'Content updates when patches land or when loader modules shift. Check the homepage status banner and Discord #status before every session. Feature lists on the product pages are the source of truth for checkout.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Compatibility, loader errors, and checkout questions go through Discord and email. Include your order email, Steam account, Windows 10 or 11 build, and The Isle Evrima or Horde client version when you open a ticket.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How we handle analytics, cookies, and contact data for the isle cheats visitors.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages; we do not store payment card data on {siteDomain}.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us see which product and FAQ pages get used so we can fix broken links and clarify setup steps. Support tickets may retain the email address and message you send until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for the isle cheats products.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: September 2026. By using {siteDomain} or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell the isle cheats and HWID Spoofer delivered through an operator portal and loader for The Isle Evrima and Horde on Windows.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when The Isle or Easy Anti-Cheat systems update. Cloud DMA is a separate purchase and is required for full functionality of the isle cheats.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. {siteDomain} does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching The Isle.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, Easy Anti-Cheat penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup (The Isle on Windows 10/11 via Steam, current loader from the portal, and the live status banner showing online when you started), contact us through the Support page. Include your order email, Windows version, game build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for The Isle can conflict with game updates and Easy Anti-Cheat. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not launch while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'the isle cheats Support',
      description:
        'Get support for loader, HWID, and checkout questions.',
    },
  },
  common: {
    breadcrumbHome: 'Home',
    breadcrumbProducts: 'Product',
    breadcrumbBlog: 'Blog',
    breadcrumbForum: 'Forum',
    breadcrumbFaq: 'FAQ',
    breadcrumbAbout: 'About',
    breadcrumbPrivacy: 'Privacy',
    breadcrumbTerms: 'Terms',
    breadcrumbSupport: 'Support',
    contactSupport: 'Contact support',
  },
  notFound: {
    metaDescription:
      'This page was not found on {siteDomain}. Return to the homepage, product page, or support hub to continue browsing The Isle cheats guides.',
    title: 'Page not found',
    body: 'That URL does not exist or may have moved. Head back to the homepage or open the product and HWID pages.',
    backHome: 'Back to home',
    viewProducts: 'View products',
    viewElite: 'View product page',
  },
  pages: {
    faq: {
      eyebrow: 'Help center',
      title: 'The Isle Cheats FAQ: Plans, ESP and Setup Help',
      description:
        'Setup, pricing, ESP, aim, and Easy Anti-Cheat status answers for The Isle on Windows.',
      schemaName: 'the isle cheats FAQ',
      schemaDescription:
        'Answers on The Isle ESP, aim assistance, radar, loader setup, pricing, and checkout at {siteDomain}.',
      linkProduct: 'Compare Evrima cheat plans',
      linkHwid: 'Review HWID spoofer details',
      linkSupport: 'Open support contact form',
      linkBlog: 'Read setup and patch guides',
    },
    forum: {
      eyebrow: 'The Isle community forum',
      title: 'The Isle Cheats Forum: Setup and HWID Threads',
      description:
        'Archived, read-only threads on loader setup, ESP modules, patch status, and HWID flags. Replies are closed.',
      linkProduct: 'View Evrima product specifications',
      linkSupport: 'Contact support before checkout',
      exploreGuides: 'Explore the guides',
      postsAria: 'Community posts',
      sortAria: 'Post sorting',
      sortPopular: 'Popular',
      sortLatest: 'Latest',
      sortTop: 'Most discussed',
      filterAria: 'Filter discussions by topic',
      filterAll: 'All topics',
      resultsCount: 'guide discussions',
      voteAria: 'Discussion voting',
      upvoteAria: 'Upvote this discussion',
      downvoteUnavailableAria: 'Downvoting is unavailable',
      guideTeam: 'the isle cheats guide team',
      guideBasedQa: 'Guide-based Q&A',
      fromGuide: 'From the guide:',
      comments: 'comments',
      closedThread: 'Closed thread',
      closedBy: 'Closed by archive',
      repliesClosed: 'Replies are closed',
      readDiscussion: 'Read discussion',
      empty: 'No discussions match. Try another search or topic.',
      emptyArchive: 'No discussions yet. New threads will show up here.',
      categoryGeneral: 'General',
      categoryGuides: 'Guides & Builds',
      categoryPatch: 'Patch Talk',
      categoryCommunity: 'Community',
      paginationAria: 'Discussion pages',
      pagePrevious: 'Previous',
      pageNext: 'Next',
      sidebarTitle: 'the isle cheats Community',
      sidebarIntro: 'Read-only archive. Threads stay up for reference, you cannot start a thread or reply.',
      statsDiscussions: 'guide discussions',
      statsTopics: 'topics',
      exploreAllGuides: 'Explore all guides',
      communitiesHeading: 'Communities',
      browseRelated: 'Browse related Q&A',
      browseAllCommunities: 'Browse all communities',
      guidelinesHeading: 'Community guidelines',
      guideline1: 'Keep it friendly and constructive',
      guideline2: 'Stay on topic and add context',
      guideline3: 'Mark spoilers and sensitive content',
      readFullGuidelines: 'Read the full guidelines',
      sidebarFoot: 'About · Guidelines · Privacy · Terms',
    },
    utilities: {
      title: 'HWID Spoofer',
      description: 'Recover the PC when new accounts succeed elsewhere but fail at once here.',
      viewDetails: 'View',
      includes: 'Includes:',
      schemaName: 'HWID Spoofer',
    },
  },
  pageSeo: {
    '/': {
      title: 'The Isle Cheats for Evrima: ESP and HUD on Windows',
      description:
        'The Isle cheats for Evrima on Windows: ESP overlays, world markers and HUD tools. Compare monthly and lifetime plans; check live status before checkout.',
    },
    '/product/': {
      title: 'The Isle Evrima Cheats: ESP Overlays and HUD',
      description:
        'The Isle Evrima cheats with ESP for players, dinosaurs, loot and radar-style HUD. Review features, Windows requirements and buy when status shows online.',
    },
    '/hwid-spoofer/': {
      title: 'The Isle HWID Spoofer: Reset PC Hardware IDs',
      description:
        'HWID spoofer for The Isle buyers: reset disk, MAC and GPU identifiers after hardware bans. Follow the portal checklist, then verify IDs before a new login.',
    },
    '/blog/': {
      title: 'The Isle Cheat Guides: ESP Setup and Patch Notes',
      description:
        'The Isle cheat guides for Windows setup, ESP tuning, Easy Anti-Cheat checks and plan picks. Browse guides by topic.',
    },
    '/forum/': {
      title: 'The Isle Cheats Forum: Setup and HWID Threads',
      description:
        'Read-only The Isle cheats forum threads on loader setup, patches, ban recovery and HWID notes. Browse community posts; new replies are closed.',
    },
    '/faq/': {
      title: 'The Isle Cheats FAQ: Plans and ESP',
      description:
        'The Isle cheats FAQ: monthly vs lifetime plans, ESP modules, Windows security, Easy Anti-Cheat status and checkout help on {siteDomain}.',
    },
    '/terms/': {
      title: 'The Isle Cheats Terms: Sale, License and Refunds',
      description:
        'Terms for The Isle cheats and HWID tools sold via {siteDomain}: refunds, license limits, checkout delivery, Cloud DMA notes and risk disclosure.',
    },
    '/privacy/': {
      title: 'The Isle Cheats Privacy: Cookies and Analytics',
      description:
        'Privacy policy for {siteDomain}: how cookies, analytics and support ticket data are used when you browse The Isle cheats pages or contact support.',
    },
    '/about/': {
      title: 'About The Isle Cheats Store',
      description:
        'Learn who publishes The Isle cheats product pages, live status notes and Discord support for buyers before you checkout.',
    },
    '/support/': {
      title: 'The Isle Cheats Support: Loader and HWID Help',
      description:
        'The Isle cheats support for portal access, loader errors, HWID tickets and billing questions. Open a ticket from {siteDomain} with your order details ready.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheatsNav: 'Try Now',
    homeAria: 'the isle cheats home',
    menuOpen: 'Open menu',
    themeLight: 'Switch to light mode',
    languageSwitcherLabel: 'Language',
    languageNames: {
      en: 'English',
      es: 'Español',
      de: 'Deutsch',
      fr: 'Français',
    },
  },
};

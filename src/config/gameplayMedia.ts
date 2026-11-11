/** Default Open Graph / Twitter preview (first hero slide). */
export const DEFAULT_OG_GAMEPLAY_IMAGE = '/images/gameplay/isle-daylight-valley-minimap-esp.webp';

export const DEFAULT_OG_GAMEPLAY_ALT =
  'Striped raptor on a tropical beach with ESP tracers, radar, and survival HUD in The Isle.';

/** Intrinsic size of the default OG master (after format normalize). */
export const DEFAULT_OG_GAMEPLAY_WIDTH = 1024;
export const DEFAULT_OG_GAMEPLAY_HEIGHT = 576;

/** Homepage + product gallery: every attached gameplay screenshot once per slider. */
export const SHOWCASE_GALLERY_KEYS = [
  'gpDaylightValley',
  'gpNightForest',
  'gpBeachShoreline',
  'gpTallGrass',
  'gpForestOmniraptor',
  'gpBeachDual',
  'gpFreeCameraDeer',
  'gpCombatWireframe',
  'gpCombatTriceratops',
  'gpCombatJungleAim',
  'gpCombatLatch',
] as const;

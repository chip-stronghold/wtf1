/**
 * Production configuration for the WTF Games lobby.
 *
 * Desktop is Cinematic D (signed off). The lobby concepts under review are the
 * three MOBILE treatments of how the live-show video and the promo banners share
 * the top of the lobby: 1 D Tile · 2 D Swipe. Preview with `?hero=1..2`.
 */
export type HeroConcept = 1 | 2

/** Login/sign-up modal redesign variants (review switcher). */
export type AuthVersion = 1 | 2 | 3
/** Profile / account page redesign variants (review switcher). */
export type ProfileVersion = 1 | 2 | 3 | 4 | 5 | 6 | 7
/** Wallet (balance dropdown + deposit/withdraw modal) redesign variants. */
export type WalletVersion = 1 | 2 | 3
/** Promotions / offers page concepts (review switcher). */
export type PromotionsVersion = 1 | 2 | 3 | 4 | 5
/** Which review screen the harness is showing. */
export type ReviewScreen = 'lobby' | 'auth' | 'profile' | 'wallet' | 'promotions' | 'casino'

/**
 * Areas of the site available in the review harness. The control-bar dropdown
 * swaps between them — add a new entry here (plus its screen in App) to start
 * iterating on another part of the product.
 */
export const REVIEW_AREAS: { id: ReviewScreen; label: string; desc: string }[] = [
  { id: 'casino', label: 'Casino lobby', desc: 'Brief concepts — 3 directions, no hero video' },
  { id: 'lobby', label: 'Lobby', desc: 'Casino lobby + WTF Live hero' },
  { id: 'auth', label: 'Login / Sign-up', desc: 'Login & sign-up modal' },
  { id: 'profile', label: 'Profile', desc: 'Account / profile page' },
  { id: 'wallet', label: 'Wallet', desc: 'Balance dropdown + top-up modal' },
  { id: 'promotions', label: 'Promotions', desc: 'Offers / promotions page' },
]
/** The lobby concept shown behind the auth / wallet overlays. */
export const AUTH_BACKDROP_HERO: HeroConcept = 2

/** The mobile concept picked for dev (gets the PICK badge). null = not chosen yet. */
export const SHIPPED_HERO: HeroConcept | null = null

/** Single source of truth for the weekly prize string. */
export const WEEKLY_PRIZE = '$1,000'

/** Wallet chip (would come from the real wallet/balance feed in production). */
export const WALLET = { balance: '1,250', currency: 'USDC' } as const

/**
 * Weekly live-show schedule. The countdown ticks to the next occurrence and the
 * lobby flips to LIVE while a show is on air. In production this would be backed
 * by the show's real status feed.
 *
 * showDay: 0=Sun … 6=Sat. Times are local.
 */
export const SHOW_SCHEDULE = {
  showDay: 5, // Friday
  showHour: 20, // 20:00
  showMinute: 0,
  durationMs: 60 * 60 * 1000, // 1h on air
} as const

/** Viewport width (px) at/above which the desktop sidebar layout renders. */
export const DESKTOP_BREAKPOINT = 1024

/**
 * Show the design-review control bar (swap hero concept / device / live state).
 * Set to false (or pass `?controls=0`) for the clean production build.
 */
export const SHOW_CONTROLS = true

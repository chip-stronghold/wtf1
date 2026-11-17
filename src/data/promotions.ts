// Promotions page content — modelled on the CMS constraint from product:
// the ONLY dynamic text is the hero (headline / sub / 2 CTA labels); every
// promo below it is just a swappable IMAGE the team can replace in the CMS.
// Tiles without real art here render a gradient placeholder standing in for
// a baked-text banner (marked "placeholder art" in the mock).
import { asset } from '../lib/assets'

/** Hero copy block — maps 1:1 to the proposed CMS fields. */
export const promoHero = {
  kicker: 'More ways to win. Every single day.',
  title: 'Join. Deposit. Get rewarded.',
  sub: 'A crypto casino with its own live game show. Free raffle entries every week, cash back when luck sucks, and racing leagues you have to see to believe.',
  ctaPrimary: 'Deposit & start earning',
  ctaSecondary: 'Enter the free raffle',
  trust: ['Crypto only', 'Fast & secure', 'No KYC for small limits'],
  img: asset('mrl_1.jpg'),
}

/**
 * Image tiles. `group` drives the "what's on today / this week / always"
 * hierarchy some concepts use; `feature` marks the tile that gets the big slot.
 */
export interface PromoTile {
  id: string
  /** What the banner says — baked into the image in production. */
  label: string
  sub?: string
  /** Real banner art (1106×580) or league photo; absent = gradient placeholder. */
  art?: string
  /** objectPosition for tall art inside landscape slots. */
  pos?: string
  color: string
  group: 'today' | 'week' | 'always'
  feature?: boolean
  archived?: boolean
}

export const tiles: PromoTile[] = [
  {
    id: 'welcome',
    label: '$500 Welcome Offer',
    sub: '100% cash back on first-session losses',
    art: asset('Promo=Promo5.png'),
    color: '#00ff00',
    group: 'today',
    feature: true,
  },
  {
    id: 'weekly-draw',
    label: 'Free to Play · $1,000 Weekly Draw',
    sub: 'Play along with WTF Live for free entries',
    art: asset('Daily_draw.png'),
    color: '#00ff00',
    group: 'today',
  },
  {
    id: 'hamster-league',
    label: 'Hamster Racing League',
    sub: 'Bet the rodents · live every week',
    art: asset('hrl_2.jpg'),
    pos: 'center 62%',
    color: '#cf640d',
    group: 'week',
  },
  {
    id: 'marble-league',
    label: 'Marble Racing League',
    sub: 'Pick your marble, win the pot',
    art: asset('mrl_2.jpg'),
    color: '#05c5ff',
    group: 'week',
  },
  {
    id: 'originals',
    label: 'Bet Crazy · WTF Originals',
    sub: 'Ridiculous in-house games',
    art: asset('WTF-Orginals.png'),
    color: '#e128ff',
    group: 'week',
  },
  {
    id: 'loyalty',
    label: 'WTF Loyalty',
    sub: 'Degen → Whale · launches soon',
    art: asset('Promo=loalty.png'),
    color: '#e128ff',
    group: 'always',
  },
  {
    id: 'space',
    label: "We're Sending You to Space",
    sub: 'VIP program · watch this space',
    art: asset('Promo=space.png'),
    color: '#00ff00',
    group: 'always',
  },
]

/** Past promos shown under the Archived tab. */
export const archivedTiles: PromoTile[] = [
  { id: 'token2049', label: 'WTF @ Token 2049', sub: 'Ended Oct 2025', color: '#4800ff', group: 'always', archived: true },
  { id: 'ep12', label: 'EP12 Winner Special', sub: 'Ended Feb 2026', color: '#05c5ff', group: 'always', archived: true },
  { id: 'march-reload', label: 'March Reload Weekend', sub: 'Ended Mar 2026', color: '#cf640d', group: 'always', archived: true },
]

/* ── Figma board concept (05) — WTF-Games file, nodes 33370:30838 / 31253 ── */

/** Hero copy from the Figma design (CMS text slot). \n = authored line break.
 *  The two nodes end the headline differently ("!" desktop, "." mobile). */
export const figmaHero = {
  kicker: 'More ways to win. Every day.',
  title: 'Big reason to take one of 2\nactions for WTF!',
  titleMobile: 'Big reason to take one of 2 actions for WTF.',
  sub: 'Lorem ipsum dolor sit amet consectetur. Nulla augue eu sit mus. Ipsum metus purus semper ut nisl non aliquet.',
  ctaPrimary: 'Sign up now',
  ctaSecondary: 'Deposit now',
  /** Marble-league studio photo exported from the Figma hero. */
  img: asset('Promo=hero.png'),
}

/** Advert slots — image cells the CMS fills. Gradient placeholders for now,
 *  exactly as drawn in the Figma (green → #4d29ff). */
export interface Advert {
  id: string
  art?: string
  gradient?: string
}
const AD_GRADIENT = 'linear-gradient(180deg, #00ff00 0%, #4d29ff 100%)'
export const adverts: Advert[] = [
  { id: 'ad-1', gradient: AD_GRADIENT },
  { id: 'ad-2', gradient: AD_GRADIENT },
  { id: 'ad-3', gradient: AD_GRADIENT },
]

/** "What's in it for you" strip — static code, changes rarely. */
export interface ValueProp {
  icon: 'gift' | 'ticket' | 'tv' | 'cash'
  title: string
  sub: string
}
export const valueProps: ValueProp[] = [
  { icon: 'gift', title: 'Daily bonuses', sub: 'Free rewards every day' },
  { icon: 'ticket', title: 'Raffle tickets', sub: 'Play & earn free entries' },
  { icon: 'tv', title: 'Live shows', sub: 'Win huge prizes on air' },
  { icon: 'cash', title: 'Cashback', sub: 'Up to $500 back on losses' },
]

/** "Us vs everyone else" — plants the seed that no one else has the show. */
export const comparison = {
  others: ['One-time bonus, then silence', 'No cashback when you lose', 'Same promos, different logo', 'You never see a winner'],
  wtf: ['Something new every single day', 'Up to $500 back on losses', 'A live game show with free entries', 'Winners drawn on air, every week'],
}

/** How to earn more — 4 steps, static code. */
export const howItWorks = [
  { step: 'Deposit', sub: 'Crypto in, playing in minutes' },
  { step: 'Play', sub: 'Games & missions earn tickets' },
  { step: 'Earn tickets', sub: 'Raffle entries stack up free' },
  { step: 'Win on air', sub: 'Drawn live on the weekly show' },
]

// Casino lobby concepts (brief: "WTF Games — Casino Lobby Design Concepts").
// Everything here is ILLUSTRATIVE mock data: game inventory, providers, tags,
// play history and the suggestion rules. In production the catalogue comes
// from the platform provider; the rules below are deliberately simple so they
// can be explained to a player in one sentence.
import { asset, cover } from '../lib/assets'

export type Interest = 'originals' | 'quick' | 'multipliers' | 'live' | 'shows' | 'strategy' | 'weird' | 'classics'

export const INTERESTS: { id: Interest; label: string; blurb: string }[] = [
  { id: 'originals', label: 'WTF Originals', blurb: 'Plinko, Mines, Dice and the rest of the house games' },
  { id: 'weird', label: 'Weird stuff', blurb: 'The WTF Studios character games' },
  { id: 'quick', label: 'Quick rounds', blurb: 'Games that resolve in seconds' },
  { id: 'multipliers', label: 'Big multipliers', blurb: 'High-volatility slots and crash-style games' },
  { id: 'live', label: 'Live dealers', blurb: 'Real tables with a real dealer' },
  { id: 'shows', label: 'Game shows', blurb: 'Wheels, money drops and the WTF Live show' },
  { id: 'strategy', label: 'Skill & strategy', blurb: 'Games where your choices matter' },
  { id: 'classics', label: 'Classic slots', blurb: 'Reels, fish and fruit' },
]

export type Kind = 'studio' | 'original' | 'slot' | 'live' | 'show'

export interface Game {
  id: string
  title: string
  src: string
  provider: string
  kind: Kind
  /** Made by WTF Studios (house titles + originals). */
  studio: boolean
  tags: Interest[]
  isNew?: boolean
}

const studio = (id: string, title: string, file: string, tags: Interest[], kind: Kind = 'studio', isNew = false): Game => ({
  id,
  title,
  src: asset(`studios/${file}`),
  provider: 'WTF Studios',
  kind,
  studio: true,
  tags,
  isNew,
})
const original = (id: string, title: string, file: string, tags: Interest[]): Game => ({
  id,
  title,
  src: cover(file),
  provider: 'WTF Studios',
  kind: 'original',
  studio: true,
  tags: ['originals', ...tags],
})
const slot = (id: string, title: string, file: string, provider: string, tags: Interest[]): Game => ({
  id,
  title,
  src: cover(file),
  provider,
  kind: 'slot',
  studio: false,
  tags,
})
const live = (id: string, title: string, file: string, tags: Interest[], kind: Kind = 'live'): Game => ({
  id,
  title,
  src: cover(file),
  provider: 'Pragmatic Play Live',
  kind,
  studio: false,
  tags,
})

export const GAMES: Game[] = [
  // WTF Studios character titles (covers from the WTF Studios brand guide)
  studio('royal-flush', 'Royal Flush', 'royal-flush.png', ['weird', 'strategy']),
  studio('what-the-cluck', 'What The Cluck?', 'what-the-cluck.png', ['weird', 'quick'], 'studio', true),
  studio('lost-my-marbles', 'Lost My Marbles', 'lost-my-marbles.png', ['weird', 'multipliers']),
  studio('split-the-g', 'Split The G', 'split-the-g.png', ['weird', 'quick', 'strategy']),
  studio('numbface', 'Numbface', 'numbface.png', ['weird', 'multipliers'], 'studio', true),
  studio('token-tower', 'Token Tower', 'token-tower.png', ['weird', 'strategy']),
  studio('bubble-wrap', 'Bubble Wrap', 'bubble-wrap.png', ['weird', 'quick']),
  studio('wtf-live', 'WTF Live', 'wtf-live.png', ['shows', 'weird'], 'show'),
  // WTF Originals (house crypto games)
  original('plinko', 'Plinko', 'WTF_original_plinko.png', ['quick', 'multipliers']),
  original('mines', 'Mines', 'WTF_original_mines.png', ['quick', 'strategy']),
  original('towers', 'Towers', 'WTF_original_towers.png', ['strategy', 'multipliers']),
  original('dice', 'Dice', 'WTF_original_dice.png', ['quick']),
  original('keno', 'Keno', 'WTF_original_keno.png', ['strategy']),
  original('wheel', 'Wheel', 'WTF_original_wheel.png', ['quick', 'shows']),
  original('launchx', 'LaunchX', 'WTF_original_launchx.png', ['multipliers', 'quick']),
  // Partner slots (existing wtfgames.com thumbnails — reuse permissions unverified)
  slot('sweet-bonanza', 'Sweet Bonanza 1000', 'Sweet Bonanza 1000_800x800_EN.png', 'Pragmatic Play', ['multipliers', 'classics']),
  slot('gates', 'Gates of Olympus', 'Gates of Olympus_600x600.png', 'Pragmatic Play', ['multipliers']),
  slot('big-bass', 'Big Bass Splash', 'BigBassSplash.png', 'Pragmatic Play', ['classics']),
  slot('overdose', 'Overdose', 'WG_Overdose_Thumbnails_600x600px_en -2-.png', 'Partner studio', ['multipliers']),
  slot('last-call', 'Last Call', 'WG_LAST CALL_Thumbnails_600x600px_en.png', 'Partner studio', ['classics']),
  slot('transformers', 'Transformers', 'WG_Transformers_Thumbnail_1200x1200px_en.jpg', 'Partner studio', ['classics', 'multipliers']),
  slot('ivy', 'Ivy', 'WG_Ivy_Thumbnails_1200x1200px_en.jpg', 'Partner studio', ['classics']),
  slot('blazin-quinn', 'Blazin Quinn', 'WG_Blazin-Quinn_Thumbnails_1200x1200px_en.png', 'Partner studio', ['classics', 'multipliers']),
  // Live tables + game shows
  live('dice-city', 'Dice City', 'Dice City_Product logo_800x800_female dealer_EN.png', ['live', 'quick']),
  live('money-time', 'Money Time', 'Money Time_Product logo_800x800_mixed dealer_EN.png', ['shows', 'live'], 'show'),
  live('powerup-roulette', 'PowerUP Roulette', 'PowerUP Roulette_Product logo_800x800_female dealer.png', ['live', 'multipliers']),
  live('mega-wheel', 'Mega Wheel', 'Mega Wheel_Animated_No_Logo_800x800_67.png', ['shows', 'live'], 'show'),
  live('bingo-spot', 'The Bingo Spot', 'The Bingo Spot_Product logo_800x800_female dealer_EN.png', ['shows'], 'show'),
  live('candyland', 'Sweet Bonanza Candyland', 'Sweet Bonanza Candyland_800x800_Product logo_Female Dealer.png', ['shows', 'live'], 'show'),
]

const byId = new Map(GAMES.map((g) => [g.id, g]))
export const game = (id: string): Game => byId.get(id)!

export const STUDIO_TITLES = GAMES.filter((g) => g.kind === 'studio' || g.id === 'wtf-live')
export const ORIGINALS = GAMES.filter((g) => g.kind === 'original')
export const SLOTS = GAMES.filter((g) => g.kind === 'slot')
export const LIVE = GAMES.filter((g) => g.kind === 'live')
export const SHOWS = GAMES.filter((g) => g.kind === 'show')
export const ALL_STUDIO = GAMES.filter((g) => g.studio)

/** Illustrative play history for the "returning visit" state. */
export const HISTORY: Game[] = ['plinko', 'royal-flush', 'sweet-bonanza', 'mega-wheel'].map(game)

/** The interests pre-selected by the review harness's "interests on" state. */
export const PRESET_INTERESTS: Interest[] = ['shows', 'quick']

export const INTEREST_LABEL = (id: Interest) => INTERESTS.find((i) => i.id === id)?.label ?? id

const joinNames = (names: string[]) => (names.length <= 1 ? names.join('') : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1])

/** Score games by how many of the wanted tags they carry; stable order on ties. */
function rank(tags: Interest[], exclude: Set<string>, n: number): Game[] {
  return GAMES.filter((g) => !exclude.has(g.id))
    .map((g, i) => ({ g, i, s: g.tags.filter((t) => tags.includes(t)).length }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.g)
}

/** Rule 1 — interest pills → suggestions. */
export function pickedFor(interests: Interest[], exclude: string[] = [], n = 8): { games: Game[]; because: string } {
  const games = rank(interests, new Set(exclude), n)
  return { games, because: `Because you picked ${joinNames(interests.map(INTEREST_LABEL))}.` }
}

/** Rule 2 — recently played → "more like these". History itself is never mixed in. */
export function moreLike(history: Game[], n = 8): { games: Game[]; because: string } {
  const tags = Array.from(new Set(history.flatMap((g) => g.tags)))
  const games = rank(tags, new Set(history.map((g) => g.id)), n)
  return { games, because: `Because you played ${joinNames(history.slice(0, 2).map((g) => g.title))} this week.` }
}

/** Rule 3 — a daily set: deterministic shuffle seeded by the date, so everyone
 *  sees the same six for a day and it quietly changes tomorrow. No countdown. */
export function dailyPicks(date = new Date(), n = 6, seedOffset = 0): { games: Game[]; label: string } {
  let seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate() + seedOffset * 7919
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const pool = [...GAMES]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const label = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
  return { games: pool.slice(0, n), label }
}

/** Default for first-timers with no interests: a curated mix, Studios first. */
export const START_HERE: Game[] = ['what-the-cluck', 'plinko', 'royal-flush', 'sweet-bonanza', 'mega-wheel', 'mines', 'gates', 'dice-city'].map(game)

export interface Category {
  id: string
  label: string
}
export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'studios', label: 'WTF Studios' },
  { id: 'originals', label: 'Originals' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live' },
  { id: 'shows', label: 'Game shows' },
  { id: 'new', label: 'New' },
]

export interface Promo {
  src: string
  title: string
  line: string
}
/** Existing promo artwork from the current lobby (1104 × 674). */
export const PROMOS: Promo[] = [
  { src: asset('Welcome-offer.png'), title: 'Welcome offer', line: 'Up to $500 on your first deposit' },
  { src: asset('banner_draw.png'), title: '$1,000 weekly draw', line: 'Free to enter, every Friday' },
  { src: asset('banner_vip.png'), title: 'WTF VIP', line: 'Earn while you play' },
]

export const KEY_ART = asset('studios/key-art-hamster-vegas.jpg')
export const HAMSTER = asset('studios/studio-hamster.png')
export const STUDIOS_LOGO = asset('brand/wtf-studios-primary.png')
export const STUDIOS_LOGO_WHITE = asset('brand/wtf-studios-mono-white.png')
export const PILL_LOGO = asset('brand/wtf-watermark-white.svg')
export const PILL_LOGO_GREEN = asset('brand/wtf-watermark-green.svg')
export const WTF_MARK = asset('brand/wtf-logo-white.svg')

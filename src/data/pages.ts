/**
 * The pages of demo.vegangster.com (Nov 2026) that the canvas reproduces, plus
 * the mock content each one shows. Paths are theirs, for side-by-side checks.
 */
import { asset } from '../lib/assets'
import { GAMES, STUDIO_GAMES, type Game } from './demo'

export type PageId =
  | 'home'
  | 'casino'
  | 'slots'
  | 'live'
  | 'sport'
  | 'predictions'
  | 'packs'
  | 'pvp'
  | 'promotions'
  | 'tournaments'
  | 'contests'
  | 'lotteries'
  | 'game'

export type ModalId = 'login' | 'signup' | null

export const PAGES: { id: PageId; label: string; theirs: string; group: 'Product' | 'Casino' | 'Promo' | 'Other' }[] = [
  { id: 'home', label: 'Home', theirs: '/', group: 'Product' },
  { id: 'casino', label: 'Casino hub', theirs: '/casino', group: 'Product' },
  { id: 'slots', label: 'Casino · category grid', theirs: '/casino/slots', group: 'Casino' },
  { id: 'live', label: 'Live Casino', theirs: '/live-casino/all', group: 'Product' },
  { id: 'sport', label: 'Sport', theirs: '/sports', group: 'Product' },
  { id: 'predictions', label: 'Predictions', theirs: '/sports/predictions', group: 'Product' },
  { id: 'packs', label: 'Studio Packs (their Phygitals)', theirs: '/pokemon', group: 'Product' },
  { id: 'pvp', label: 'PVP Arena', theirs: '/pvp', group: 'Product' },
  { id: 'promotions', label: 'Promotions', theirs: '/casino-promo/all-promo', group: 'Promo' },
  { id: 'tournaments', label: 'Tournaments', theirs: '/casino-promo/tournaments', group: 'Promo' },
  { id: 'contests', label: 'Contests', theirs: '/casino-promo/contests', group: 'Promo' },
  { id: 'lotteries', label: 'Lotteries', theirs: '/casino-promo/lotteries', group: 'Promo' },
  { id: 'game', label: 'Game page', theirs: '/game/…', group: 'Other' },
]

export const isPageId = (v: string | null): v is PageId => PAGES.some((p) => p.id === v)

/* ------------------------------------------------------------------ casino hub */

export const HUB_BANNERS = [
  { file: 'banner_vip.png', alt: 'WTF VIP — earn while you play' },
  { file: 'banner_bigbass.png', alt: 'Big Bass — 25 free spins' },
  { file: 'banner_draw.png', alt: 'Free to play — $1,000 weekly draw' },
].map((b) => ({ ...b, src: asset(b.file) }))

export const QUICK_LINKS: { label: string; page: PageId }[] = [
  { label: 'Welcome', page: 'promotions' },
  { label: 'New Games', page: 'slots' },
  { label: 'Promotions', page: 'promotions' },
  { label: 'Refer a Friend', page: 'promotions' },
  { label: 'WTF Live', page: 'home' },
]

export const BENTO: { label: string; page: PageId; art: string; wide?: boolean }[] = [
  { label: 'Tournaments', page: 'tournaments', art: asset('studios/token-tower.png'), wide: true },
  { label: 'Live', page: 'live', art: asset('WTF Games/Mega Wheel_Animated_No_Logo_800x800_67.png') },
  { label: 'Sports', page: 'sport', art: asset('studios/split-the-g.png') },
  { label: 'Casino', page: 'slots', art: asset('WTF Games/WTF_original_plinko.png') },
  { label: 'Providers', page: 'slots', art: asset('studios/numbface.png') },
  { label: 'Promotions', page: 'promotions', art: asset('studios/what-the-cluck.png') },
]

/* ------------------------------------------------------------------ category grids */

export const CASINO_CHIPS = ['Top', 'New', 'Crash', 'Mines', 'Megaways', 'Bonus Buy', 'Hold And Win', 'Jackpot Slots', 'Tables', 'Other']
export const LIVE_CHIPS = ['Most Popular', 'Baccarat', 'Blackjack', 'Roulette', 'Online Now', 'TV Shows', 'Other']

/** Enough tiles to fill a category page: studios + originals + partner slots, repeated. */
export const CATALOGUE: Game[] = [...STUDIO_GAMES, ...GAMES, ...STUDIO_GAMES.slice(0, 6), ...GAMES.slice(0, 6)]
export const LIVE_CATALOGUE: Game[] = (() => {
  const live = GAMES.filter((g) => g.provider === 'Pragmatic Play Live')
  const extra: Game[] = [
    { name: 'Money Time', provider: 'Pragmatic Play Live', src: asset('WTF Games/Money Time_Product logo_800x800_mixed dealer_EN.png') },
    { name: 'PowerUP Roulette', provider: 'Pragmatic Play Live', src: asset('WTF Games/PowerUP Roulette_Product logo_800x800_female dealer.png') },
    { name: 'The Bingo Spot', provider: 'Pragmatic Play Live', src: asset('WTF Games/The Bingo Spot_Product logo_800x800_female dealer_EN.png') },
  ]
  const base = [...live, ...extra]
  return [...base, ...base, ...base]
})()

/* ------------------------------------------------------------------ sport + predictions */

export const SPORT_TABS = ['Live', 'Upcoming', 'Predictions', 'Lotteries', 'SlotBets']
export const SPORTS = ['Soccer', 'Tennis', 'American Football', 'Basketball', 'Counter-Strike', 'FIFA', 'Baseball', 'Ice Hockey', 'MMA', 'Cricket']
export interface Match {
  comp: string
  status: string
  live: boolean
  home: string
  away: string
  hs: number
  as: number
  odds: [string, string, string]
}
export const MATCHES: Match[] = [
  { comp: 'eSoccer · FIFA Club World Cup (2×6 min)', status: "62' 2nd half", live: true, home: 'Juventus (E)', away: 'Manchester City (E)', hs: 1, as: 0, odds: ['1.35', '4.20', '7.50'] },
  { comp: 'eSoccer · Coppa Italia (2×6 min)', status: "79' 2nd half", live: true, home: 'Torino (E)', away: 'Milan (E)', hs: 0, as: 2, odds: ['12.0', '5.60', '1.18'] },
  { comp: 'eSoccer · Bundesliga (2×6 min)', status: "63' 2nd half", live: true, home: 'Eintracht Frankfurt (E)', away: 'Wolfsburg (E)', hs: 3, as: 0, odds: ['1.05', '9.00', '21.0'] },
  { comp: 'eSoccer · Copa del Rey (2×6 min)', status: "78' 2nd half", live: true, home: 'Real Madrid (E)', away: 'Atlético de Madrid (E)', hs: 1, as: 2, odds: ['6.50', '3.90', '1.45'] },
  { comp: 'eSoccer · FA Cup (2×6 min)', status: 'Ended', live: false, home: 'Chelsea FC (E)', away: 'Manchester City (E)', hs: 1, as: 1, odds: ['—', '—', '—'] },
  { comp: 'eSoccer · Champions League (2×6 min)', status: "61' 2nd half", live: true, home: 'Manchester City (E)', away: 'Bayern (E)', hs: 1, as: 1, odds: ['4.80', '1.55', '3.60'] },
]
export const PREDICTION_CHIPS = ['All', 'Crypto', 'Politics']
export const PREDICTIONS = [
  { q: 'Bitcoin above $120k on 31 Dec?', cat: 'Crypto', yes: 61, vol: '$1.2M' },
  { q: 'ETH flips $5k before March?', cat: 'Crypto', yes: 34, vol: '$640k' },
  { q: 'Next AU federal election called before June?', cat: 'Politics', yes: 22, vol: '$310k' },
  { q: 'Solana top 3 by market cap this year?', cat: 'Crypto', yes: 18, vol: '$220k' },
  { q: 'US rate cut at the next FOMC?', cat: 'Politics', yes: 72, vol: '$2.4M' },
  { q: 'Dogecoin above $1 in 2026?', cat: 'Crypto', yes: 9, vol: '$180k' },
]

/* ------------------------------------------------------------------ packs (their Phygitals) */

export const PACK = {
  name: 'Studio Starter Pack',
  art: asset('studios/key-art-hamster-vegas.jpg'),
  prices: ['$10', '$25', '$50', '$250', '$500', '$1,000', '$2,500', '$5,000'],
  ev: '$9.42',
  payouts: '25881',
  odds: [
    { tier: 'Mythic', range: '$50 – $100', pct: '1%', tone: 'error' },
    { tier: 'Legendary', range: '$20 – $50', pct: '9%', tone: 'warning' },
    { tier: 'Common', range: '$1 – $17', pct: '90%', tone: 'success' },
  ],
  hits: STUDIO_GAMES.slice(0, 6),
}

/* ------------------------------------------------------------------ PVP arena */

export const PVP = {
  title: 'Galaxy Battle',
  pot: '$0.00',
  state: 'Waiting',
  art: asset('studios/studio-hamster.png'),
  like: [...STUDIO_GAMES.slice(7, 13), ...GAMES.slice(0, 1)],
}

/* ------------------------------------------------------------------ promotions */

export const PROMO_HERO = {
  title: 'Friends Play Better Together',
  copy: 'Invite friends and unlock exclusive bonuses',
  cta: 'Invite a Friend',
  art: asset('studios/studio-hamster.png'),
}
export const PROMO_ICONS = ['Daily Perks', 'Extra Rewards', 'Live Specials', 'Play · Win', 'Refer and Earn', 'Sports Boosts', "What's New"]
export const CASINO_PROMOS = [
  { title: 'Extra Perks for Every Player!', copy: 'Win Free Spins, Free bets or Cash', art: asset('studios/royal-flush.png') },
  { title: 'Tournaments with a Twist!', copy: 'Climb the leaderboard and claim your share of cash, free spins and NFTs!', art: asset('studios/token-tower.png') },
  { title: 'Take Off with Welcome Bonus', copy: 'Up to 1000 USD to kickstart your play', art: asset('WTF Games/WTF_original_launchx.png') },
]
export const SPORT_PROMOS = [
  { title: 'Bet Smarter on Live Sports', copy: 'Real-time odds, fast bets, and full control during the game', art: asset('studios/split-the-g.png') },
  { title: '€5 000 000 awaits!', copy: 'Master live betting and stay in control', art: asset('studios/lost-my-marbles.png') },
  { title: 'Invite Friends & Earn More', copy: "Get up to 100% of your friends' reload bonuses", art: asset('studios/what-the-cluck.png') },
]

/* ------------------------------------------------------------------ tournaments / contests / lotteries */

export interface PromoCard {
  title: string
  copy: string
  prize: string
  prizeLabel?: string
  meta: [string, string][]
  art: string
  players?: number
}
const arts = [asset('studios/token-tower.png'), asset('studios/numbface.png'), asset('studios/bubble-wrap.png'), asset('WTF Games/WTF_original_wheel.png')]
export const TOURNAMENTS: PromoCard[] = Array.from({ length: 12 }, (_, i) => ({
  title: ['Private Club Tournament', 'Hamster Tournament: Feast of the Jungle!', 'Swords and Arrows Tournament!'][i % 3],
  copy: ['Points for higher win streak, Points…', 'Points for higher win streak, Points…', 'Points for higher win multiplier, Po…'][i % 3],
  prize: ['$16,503.89', '$1,100.24', '$1,122.32'][i % 3],
  meta: i < 6 ? [['Ends in', `${(i * 7) % 23}d`], ['', `${(i * 5) % 19}h ${(i * 11) % 60}m`]] : i < 9 ? [['Starts in', `${(i * 3) % 11}d`], ['', `${(i * 7) % 12}h`]] : [['Finished', `2026-11-${10 + (i % 9)}`]],
  art: arts[i % 4],
  players: i < 6 ? 0 : undefined,
}))
export const CONTESTS: PromoCard[] = [
  { title: 'Fortune Hunters', copy: '', prize: 'iPad Pro 11', prizeLabel: 'Prize fund:', meta: [['Ends in', '12d 12h 51m']], art: asset('studios/lost-my-marbles.png'), players: 1 },
  { title: 'Awesome Sport Contest', copy: '', prize: '$10,000.00', prizeLabel: 'Prize fund:', meta: [['Finished', '2026-11-07']], art: asset('studios/split-the-g.png') },
  { title: "Loyal to Play'n Go", copy: '', prize: '$10,000.00', prizeLabel: 'Prize fund:', meta: [['Finished', '2026-09-05']], art: asset('studios/numbface.png') },
]
export const LOTTERIES: PromoCard[] = Array.from({ length: 6 }, (_, i) => ({
  title: '$50,000 Hamster June Prize Lottery',
  copy: 'Daily Max Tickets: 15',
  prize: '$7,500',
  meta: i === 0 ? [['Starts in', '20d 04h 01m']] : [['Finished', `2026-11-${18 - i * 2}`]],
  art: arts[(i + 1) % 4],
}))

/* ------------------------------------------------------------------ sign-up bonuses */

export const SIGNUP_BONUSES = [
  { title: 'Welcome Aboard', line: 'Bonus: 25 Free Spins in Plinko' },
  { title: 'Double Your First', line: 'Bonus: 100%' },
  { title: 'High Roller Boost', line: 'Bonus: 300%' },
]

/* ------------------------------------------------------------------ casino hub — lower modules */

export const LOOTBOXES = [
  { title: 'Free Loot Box', price: 'Login to spin', art: asset('studios/bubble-wrap.png'), free: true },
  { title: 'Whale Swag', price: '15.00', art: asset('studios/token-tower.png') },
  { title: 'Free Spins', price: '50.00', art: asset('WTF Games/WTF_original_wheel.png') },
  { title: 'Super Lootbox', price: '75.00', art: asset('studios/lost-my-marbles.png') },
  { title: 'Bonus Buy Exclusive', price: '100.00', art: asset('studios/numbface.png') },
  { title: 'Mega Bonus Buy', price: '250.00', art: asset('studios/royal-flush.png') },
]

export const TRENDING: Game[] = [...GAMES.slice(0, 6), ...STUDIO_GAMES.slice(0, 6)]
export const JUST_ADDED: Game[] = [...STUDIO_GAMES.slice(1, 7)]
export const CRASH: Game[] = [...STUDIO_GAMES.slice(7, 14), ...STUDIO_GAMES.slice(0, 5)]
export const INOUT: Game[] = [...STUDIO_GAMES.slice(0, 6)]

export const PROMO_BANNER = {
  kicker: 'Premium casino',
  title: 'Big wins every day',
  cta: 'Play now',
  art: asset('WTF Games/WTF_original_wheel.png'),
}

export const LIVE_RAIL = [
  { name: 'Salon Privé Blackjack', hot: true, src: asset('WTF Games/Dice City_Product logo_800x800_female dealer_EN.png') },
  { name: 'Mega Roulette', hot: false, src: asset('WTF Games/PowerUP Roulette_Product logo_800x800_female dealer.png') },
  { name: 'Mega Wheel', hot: false, src: asset('WTF Games/Mega Wheel_Animated_No_Logo_800x800_67.png') },
  { name: 'Sweet Bonanza Candyland', hot: false, src: asset('WTF Games/Sweet Bonanza Candyland_800x800_Product logo_Female Dealer.png') },
]

export const DISCOVER: PromoCard[] = [
  { title: 'Hamster Tournament: Feast of the Jungle!', copy: 'Points for higher win streak,…', prize: '$1,099.21', meta: [['Ends in:', '14h 35m']], art: asset('studios/what-the-cluck.png'), players: 0 },
  { title: 'Game of the Month', copy: 'Plinko — double points all November', prize: '2× points', meta: [['Ends in:', '12d']], art: asset('WTF Games/WTF_original_plinko.png') },
  { title: 'Claim €160 000!', copy: 'The Wilde Legends Network promotion is in full swing!', prize: '€160,000', meta: [], art: asset('studios/split-the-g.png') },
]

export const PAYMENTS = ['Wallet', 'AdvCash', 'AstroPay', 'BBVA Bancomer', 'Banorte', 'Bitcoin', 'American Express', 'Mastercard', 'BBVA', 'Banco Azteca', 'Banorte', 'Boleto', 'Visa', 'USDT']
export const TICKER = [
  ['TON/USDT', '$1.6009'],
  ['BTC/USDT', '$64,782.72'],
  ['ETH/USDT', '$1,825.67'],
  ['XRP/USDT', '$0.962000'],
  ['LTC/USDT', '$91.40'],
  ['SOL/USDT', '$142.11'],
]

/* ------------------------------------------------------------------ sport — upcoming + footer */

export const UPCOMING: Match[] = [
  { comp: 'Soccer · Premier League', status: 'Today 19:30', live: false, home: 'Everton', away: 'Brentford', hs: 0, as: 0, odds: ['2.30', '3.30', '3.10'] },
  { comp: 'Basketball · NBA', status: 'Today 23:00', live: false, home: 'Minnesota', away: 'Portland', hs: 0, as: 0, odds: ['1.52', '—', '2.55'] },
  { comp: 'Ice Hockey · NHL', status: 'Tomorrow 11:00', live: false, home: 'Los Angeles', away: 'Colorado', hs: 0, as: 0, odds: ['2.45', '3.90', '2.10'] },
  { comp: 'Tennis · ATP Paris', status: 'Tomorrow 14:00', live: false, home: 'T. Fritz', away: 'C. Alcaraz', hs: 0, as: 0, odds: ['3.40', '—', '1.32'] },
  { comp: 'Counter-Strike · BLAST Premier', status: 'Sat 18:00', live: false, home: 'Vitality', away: 'NAVI', hs: 0, as: 0, odds: ['1.70', '—', '2.10'] },
  { comp: 'MMA · UFC Fight Night', status: 'Sun 09:00', live: false, home: 'A. Volkanovski', away: 'I. Topuria', hs: 0, as: 0, odds: ['2.05', '—', '1.78'] },
]
export const SPORT_DISCLAIMER =
  'Although every effort is made to ensure data displayed on our site is accurate, this data is for information purposes and should be used as a guide only. In the event of any discrepancy, the odds and markets confirmed in your bet slip apply.'

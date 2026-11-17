/**
 * Mock content for the Vegangster-shaped canvas. The module list and the shape
 * of each module follow demo.vegangster.com (Nov 2026): hero carousel, jackpot
 * tiers, Top grid, Our Streamers, Providers, Top events, bets feed, SEO footer.
 * Nicknames are made up. Covers are our own from /uploads.
 */
import { asset, cover } from '../lib/assets'

export interface Game {
  name: string
  provider: string
  src: string
}

export const GAMES: Game[] = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', src: cover('Gates of Olympus_600x600.png') },
  { name: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', src: cover('Sweet Bonanza 1000_800x800_EN.png') },
  { name: 'Plinko', provider: 'WTF Originals', src: cover('WTF_original_plinko.png') },
  { name: 'Big Bass Splash', provider: 'Pragmatic Play', src: cover('BigBassSplash.png') },
  { name: 'Mines', provider: 'WTF Originals', src: cover('WTF_original_mines.png') },
  { name: 'Transformers', provider: 'Partner studio', src: cover('WG_Transformers_Thumbnail_1200x1200px_en.jpg') },
  { name: 'Mega Wheel', provider: 'Pragmatic Play Live', src: cover('Mega Wheel_Animated_No_Logo_800x800_67.png') },
  { name: 'Overdose', provider: 'Partner studio', src: cover('WG_Overdose_Thumbnails_600x600px_en -2-.png') },
  { name: 'Dice City', provider: 'Pragmatic Play Live', src: cover('Dice City_Product logo_800x800_female dealer_EN.png') },
  { name: 'Towers', provider: 'WTF Originals', src: cover('WTF_original_towers.png') },
  { name: 'Ivy', provider: 'Partner studio', src: cover('WG_Ivy_Thumbnails_1200x1200px_en.jpg') },
  { name: 'Sweet Bonanza Candyland', provider: 'Pragmatic Play Live', src: cover('Sweet Bonanza Candyland_800x800_Product logo_Female Dealer.png') },
]

/** The "Top" grid: WTF Studios only — character titles first, then the Originals. */
const studio = (name: string, file: string): Game => ({ name, provider: 'WTF Studios', src: asset(`studios/${file}`) })
const original = (name: string, file: string): Game => ({ name, provider: 'WTF Studios', src: cover(file) })
export const STUDIO_GAMES: Game[] = [
  studio('Royal Flush', 'royal-flush.png'),
  studio('What The Cluck?', 'what-the-cluck.png'),
  studio('Lost My Marbles', 'lost-my-marbles.png'),
  studio('Split The G', 'split-the-g.png'),
  studio('Numbface', 'numbface.png'),
  studio('Token Tower', 'token-tower.png'),
  studio('Bubble Wrap', 'bubble-wrap.png'),
  original('Plinko', 'WTF_original_plinko.png'),
  original('Mines', 'WTF_original_mines.png'),
  original('Towers', 'WTF_original_towers.png'),
  original('Dice', 'WTF_original_dice.png'),
  original('Wheel', 'WTF_original_wheel.png'),
  original('Keno', 'WTF_original_keno.png'),
  original('LaunchX', 'WTF_original_launchx.png'),
]

/** "What are you playing today?" — five picks, the middle one highlighted. */
export const HERO_PICKS: Game[] = [GAMES[3], GAMES[0], GAMES[2], GAMES[1], GAMES[6]]

export const JACKPOT = {
  title: 'WTF Mega Jackpot',
  tiers: [
    { tier: 'Mini', amount: '$20.54', note: 'Won 21 days ago' },
    { tier: 'Minor', amount: '$1,204.10', note: 'Won 3 days ago' },
    { tier: 'Major', amount: '$13,570.78', note: 'Not won yet' },
    { tier: 'Mega', amount: '$5,500,707.80', note: 'Not won yet' },
  ],
  optIn: "Don't miss out! Join the Jackpot! Opt-in, just €0.10 per round.",
}

export const STREAMERS = [
  { nick: 'nightowl_tv', src: asset('studios/studio-hamster.png') },
  { nick: 'TeamSlapdash', src: asset('studios/numbface.png') },
  { nick: 'guac_and_roll', src: asset('studios/what-the-cluck.png') },
]

export const PROVIDERS = [
  'Pragmatic Play',
  'Nolimit City',
  'Belatra',
  'Caleta',
  '1x2 Gaming',
  'FC',
  'Galaxsys',
  'Yggdrasil',
  'Amatic',
  'Relax Gaming',
  'Aviatrix',
  'Booming Games',
  'ThePlayer',
  'BGaming',
  'Wazdan',
  'Moon',
  'Tom Horn',
  'Amusnet',
]

export const EVENTS = [
  { league: 'USA · NHL', live: true, clock: "2nd · 14'", home: 'Los Angeles', away: 'Colorado', score: '1 : 2', odds: ['2.45', '3.90', '2.10'] },
  { league: 'USA · NBA', live: false, clock: 'Today 19:30', home: 'Minnesota', away: 'Portland', score: '', odds: ['1.52', '—', '2.55'] },
  { league: 'ENG · Premier League', live: false, clock: 'Sat 15:00', home: 'Everton', away: 'Brentford', score: '', odds: ['2.30', '3.30', '3.10'] },
]

export const BETS = [
  { game: 'Whale Swag', nick: 'voyagerxxx', amount: '9.08', mult: 'x0.67' },
  { game: 'Whale Swag', nick: 'voyagerxxx', amount: '2.27', mult: 'x0.17' },
  { game: 'Joker Reelz', nick: 'advocatee', amount: '0.000000', mult: 'x0' },
  { game: 'Phygitals Riftbound', nick: 'dimdom', amount: '6.81', mult: 'x0.76' },
  { game: 'Phygitals Baseball', nick: 'dimdom', amount: '10.60', mult: 'x0.48' },
  { game: 'Phygitals Pokemon', nick: 'dimdom', amount: '6.52', mult: 'x0.73' },
  { game: 'Phygitals Football', nick: 'dimdom', amount: '79.45', mult: 'x3.57' },
  { game: 'Gates of Olympus', nick: 'degen_dave', amount: '1,840.00', mult: 'x153' },
]

export const FOOTER = {
  title: 'WTF Games: Your Ultimate Online Casino Experience',
  copy:
    'Welcome to WTF Games, where we redefine what an online casino should be. Our platform offers an exhilarating blend of top-notch casino games, rewarding promotions, and first-rate customer service. Join us today for an unparalleled gambling experience.',
  links: ['Responsible Gaming', 'Terms and Conditions', 'Privacy Policy', 'Contact Us'],
  rights: "All rights reserved. Games may not be available in all jurisdictions. It is the player's responsibility to check local regulations before playing.",
}

// Lobby content data. In production these lists would come from the catalog /
// CMS / show feed; here they mirror the design handoff exactly.
import { asset, cover } from '../lib/assets'
import { coverGradient } from '../lib/color'

export interface GameCover {
  title: string
  src: string
}

export interface Clip {
  src: string
  handle: string
  cap: string
  views: string
}

export interface Episode {
  ep: string
  date: string
  title: string
  winner: string
  dur: string
  color: string
  bg: string
}

export interface Banner {
  src: string
  alt: string
}

const game = (title: string, f: string): GameCover => ({ title, src: cover(f) })

export const slots: GameCover[] = [
  game('Sweet Bonanza', 'Sweet Bonanza 1000_800x800_EN.png'),
  game('Gates of Olympus', 'Gates of Olympus_600x600.png'),
  game('Big Bass Splash', 'BigBassSplash.png'),
  game('Overdose', 'WG_Overdose_Thumbnails_600x600px_en -2-.png'),
  game('Last Call', 'WG_LAST CALL_Thumbnails_600x600px_en.png'),
  game('Transformers', 'WG_Transformers_Thumbnail_1200x1200px_en.jpg'),
  game('Big Black Cock', 'WG_BBC_Thumbnails_1200x1200px_en -1-.png'),
  game('Ivy', 'WG_Ivy_Thumbnails_1200x1200px_en.jpg'),
  game('Blazin Quinn', 'WG_Blazin-Quinn_Thumbnails_1200x1200px_en.png'),
]

export const originals: GameCover[] = [
  game('Royal Flush', 'Royal flush_cover-1.png'),
  game('Plinko', 'WTF_original_plinko.png'),
  game('Mines', 'WTF_original_mines.png'),
  game('Towers', 'WTF_original_towers.png'),
  game('Dice', 'WTF_original_dice.png'),
  game('Keno', 'WTF_original_keno.png'),
  game('Wheel', 'WTF_original_wheel.png'),
  game('LaunchX', 'WTF_original_launchx.png'),
  game('Lost My Marbles', 'Tease_Lost_my_marbles_cover.png'),
]

export const tables: GameCover[] = [
  game('Dice City', 'Dice City_Product logo_800x800_female dealer_EN.png'),
  game('Money Time', 'Money Time_Product logo_800x800_mixed dealer_EN.png'),
  game('PowerUP Roulette', 'PowerUP Roulette_Product logo_800x800_female dealer.png'),
  game('Mega Wheel', 'Mega Wheel_Animated_No_Logo_800x800_67.png'),
  game('The Bingo Spot', 'The Bingo Spot_Product logo_800x800_female dealer_EN.png'),
  game('Sweet Bonanza Candyland', 'Sweet Bonanza Candyland_800x800_Product logo_Female Dealer.png'),
]

export const episodes: Episode[] = [
  { ep: 'EP 14', date: 'Mar 12', title: 'Hamster Grand Prix', winner: 'Sir Nibbles', dur: '48:12', color: '#00AA22' },
  { ep: 'EP 13', date: 'Mar 5', title: 'Marble Mayhem', winner: 'Blue Streak', dur: '51:40', color: '#05C5FF' },
  { ep: 'EP 12', date: 'Feb 26', title: 'Treadmill Throwdown', winner: 'Chonk', dur: '45:03', color: '#CF640D' },
  { ep: 'EP 11', date: 'Feb 19', title: 'Bonkers Basketball', winner: 'Team Splash', dur: '52:20', color: '#E128FF' },
].map((e) => ({ ...e, bg: coverGradient(e.color) }))

export const clips: Clip[] = [
  { src: asset('hrl_2.jpg'), handle: '@wtfleagues', cap: 'Most unexpected hamster race', views: '212K' },
  { src: asset('hrl_3.jpg'), handle: '@wtfleagues', cap: 'Hamilton takes the lead', views: '173K' },
  { src: asset('mrl_1.jpg'), handle: '@wtfleagues', cap: 'Choose your marble', views: '98K' },
  { src: asset('trl_1.jpg'), handle: '@wtfleagues', cap: 'Coca-Cola vs Fanta', views: '141K' },
  { src: asset('mystery_1.jpg'), handle: '@wtf.studios', cap: 'Bog Beyblade battles', views: '88K' },
  { src: asset('mrl_2.jpg'), handle: '@wtfleagues', cap: 'Pick your marble', views: '64K' },
  { src: asset('trl_3.jpg'), handle: '@wtfleagues', cap: 'Fanta vs Ball vs Buzzball', views: '120K' },
  { src: asset('mystery_2.jpg'), handle: '@wtfleagues', cap: 'Weirdest thing I have seen today', views: '54K' },
  { src: asset('mrl_3.jpg'), handle: '@wtfleagues', cap: 'Marble madness', views: '71K' },
  { src: asset('trl_2.jpg'), handle: '@wtfleagues', cap: 'Oranges vs Apples', views: '109K' },
  { src: asset('mystery_3.jpg'), handle: '@wtfleagues', cap: 'Rent on the yellow ice cube', views: '46K' },
]

/** Promo banner artwork is 1104 × 674. */
export const BANNER_RATIO = '1104 / 674'
export const banners: Banner[] = [
  { src: asset('banner_bigbass.png'), alt: 'Big Bass — 25 free spins' },
  { src: asset('banner_draw.png'), alt: 'Free to play $1000 weekly draw' },
  { src: asset('banner_vip.png'), alt: 'WTF VIP — earn while you play' },
]

/** Hero video, also used as the stand-in clip video in the modal. */
export const HERO_VIDEO = asset('bg_hero.mp4')

/** Desktop sidebar nav. SVG path data carried straight from the handoff. */
export interface NavItem {
  label: string
  d: string
  active?: boolean
}
export const navItems: NavItem[] = [
  { label: 'Originals', d: 'M12 3l2.9 6 6.6 1-4.8 4.6 1.2 6.7L12 18l-5.9 3.3L7.3 14.6 2.5 10l6.6-1z', active: true },
  { label: 'Slots', d: 'M12 2l9 10-9 10L3 12z' },
  { label: 'Table Games', d: 'M3 6h18v12H3zM3 11h18' },
  { label: 'Blackjack', d: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' },
  { label: 'Roulette', d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3v18' },
  { label: 'Game Shows', d: 'M7 4h10v4a5 5 0 0 1-10 0zM9 20h6M12 13v7' },
  { label: 'Sports | Coming Soon', d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3.5 3 16.5 0 20' },
  { label: 'Promotions', d: 'M20 8H4v4h16zM4 12v8h16v-8M12 8v12' },
]

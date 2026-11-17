// Mock account data for the profile-page concepts. Mirrors what production
// shows today (Overview · Bonuses · History) and adds the new module data:
// P&L by period, rewards given back, money in / out, favourite games, VIP map.
import { cover } from '../lib/assets'

export type Period = '24H' | '7D' | '30D' | 'All'
export const PERIODS: Period[] = ['24H', '7D', '30D', 'All']

/* ── identity (as production) ─────────────────────────────────────────── */
export const profile = {
  username: 'ashnewman',
  givenName: 'Ash Newman',
  email: 'a@wtfleagues.com',
  memberSince: 'Feb 2026',
  dob: '1982-02-13',
  mobile: 'N/A',
  nationality: 'MT',
  gender: 'N/A',
  address: { line: 'Afrim', city: 'AL', region: 'MT', postcode: '10000', country: 'AL' },
  initials: 'AN',
  vip: { tier: 'Bronze', level: 7, progress: 0.62, next: 'Silver', xp: '6,200', xpNext: '10,000', toNext: '$1,250' },
  balance: { crypto: '427.60800000', symbol: 'USDT', fiat: '$427.61' },
}

export const kyc: { label: string; status: 'verified' | 'requested' | 'pending' }[] = [
  { label: 'Email address', status: 'verified' },
  { label: 'AML check', status: 'requested' },
  { label: 'ID document', status: 'pending' },
]

/* ── the new module: P&L · rewards · money flow, per period, up and down ── */
export interface PnlStats {
  net: number
  pct: string
  wagered: string
  bets: number
  winRate: string
  biggestWin: string
  data: number[]
  rewards: { rakeback: number; lossback: number; levelUp: number }
  deposits: number
  withdrawals: number
}

const up: Record<Period, PnlStats> = {
  '24H': { net: 184, pct: '+18.4%', wagered: '$1,000', bets: 62, winRate: '48%', biggestWin: '$96', data: [10, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19, 21], rewards: { rakeback: 6.4, lossback: 0, levelUp: 0 }, deposits: 200, withdrawals: 0 },
  '7D': { net: 642, pct: '+22.1%', wagered: '$2,900', bets: 311, winRate: '46%', biggestWin: '$250', data: [10, 12, 11, 15, 14, 18, 22, 20, 26, 30, 28, 34], rewards: { rakeback: 18.6, lossback: 0, levelUp: 40 }, deposits: 500, withdrawals: 300 },
  '30D': { net: 1240, pct: '+25.7%', wagered: '$4,820', bets: 477, winRate: '47%', biggestWin: '$250', data: [8, 10, 9, 14, 13, 20, 18, 27, 24, 35, 40, 38, 48, 55], rewards: { rakeback: 30.9, lossback: 0, levelUp: 80 }, deposits: 1200, withdrawals: 1900 },
  All: { net: 2110, pct: '+31.0%', wagered: '$6,800', bets: 702, winRate: '47%', biggestWin: '$250', data: [5, 8, 6, 12, 18, 15, 26, 34, 30, 48, 44, 62, 70, 66, 84, 96], rewards: { rakeback: 43.5, lossback: 0, levelUp: 120 }, deposits: 2400, withdrawals: 3800 },
}
const down: Record<Period, PnlStats> = {
  '24H': { net: -700, pct: '-41.2%', wagered: '$1,700', bets: 88, winRate: '39%', biggestWin: '$45', data: [21, 20, 22, 19, 17, 18, 15, 14, 12, 13, 10, 8], rewards: { rakeback: 10.9, lossback: 70, levelUp: 0 }, deposits: 700, withdrawals: 0 },
  '7D': { net: -1180, pct: '-28.4%', wagered: '$4,150', bets: 402, winRate: '42%', biggestWin: '$120', data: [34, 30, 31, 27, 28, 24, 20, 22, 18, 15, 16, 12], rewards: { rakeback: 26.6, lossback: 118, levelUp: 40 }, deposits: 1500, withdrawals: 200 },
  '30D': { net: -2360, pct: '-24.6%', wagered: '$9,600', bets: 1104, winRate: '43%', biggestWin: '$340', data: [55, 50, 52, 44, 46, 38, 40, 33, 30, 26, 28, 20, 18, 14], rewards: { rakeback: 61.4, lossback: 236, levelUp: 80 }, deposits: 3200, withdrawals: 600 },
  All: { net: -3920, pct: '-21.9%', wagered: '$17,900', bets: 2017, winRate: '44%', biggestWin: '$340', data: [96, 90, 92, 80, 84, 70, 72, 60, 62, 50, 46, 40, 36, 30, 22, 16], rewards: { rakeback: 114.6, lossback: 392, levelUp: 120 }, deposits: 7400, withdrawals: 3100 },
}
export const pnl = (period: Period, isUp: boolean): PnlStats => (isUp ? up : down)[period]
export const rewardsTotal = (s: PnlStats) => s.rewards.rakeback + s.rewards.lossback + s.rewards.levelUp
export const money = (n: number, sign = false) => `${sign ? (n < 0 ? '−' : '+') : n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`

/* ── favourite games (covers from the lobby) ─────────────────────────── */
export const favGames = [
  { title: 'Big Bass Splash', src: cover('BigBassSplash.png'), wagered: '$2,140', bets: 212 },
  { title: 'Sweet Bonanza', src: cover('Sweet Bonanza 1000_800x800_EN.png'), wagered: '$1,380', bets: 146 },
  { title: 'Plinko', src: cover('WTF_original_plinko.png'), wagered: '$860', bets: 119 },
]

/* ── VIP map: what each level paid, what's next ──────────────────────── */
export const vipLedger = [
  { level: 'Bronze 6', date: '02 Oct', paid: 40, done: true },
  { level: 'Bronze 7', date: '15 Oct', paid: 40, done: true },
  { level: 'Bronze 8', date: `${profile.vip.toNext} to go`, paid: 45, done: false },
  { level: 'Silver 1', date: '$3,800 to go', paid: 60, done: false },
]

/* ── bonuses, as production: active · available · inactive & consumed ── */
export interface Bonus {
  title: string
  desc: string
  tag: string
  amount?: string
  progress?: number
  expires?: string
  game?: string
}
export const activeBonuses: Bonus[] = []
export const availableBonuses: Bonus[] = []
export const consumedBonuses: Bonus[] = [
  { title: 'Rakeback', desc: 'Converted to real money', tag: 'Converted', amount: '$1.49', expires: '01/10/2026 01:28' },
  { title: 'Rakeback', desc: 'Converted to real money', tag: 'Converted', amount: '$6.50' },
  { title: 'Rakeback', desc: 'Converted to real money', tag: 'Converted', amount: '$6.50' },
  { title: 'Level-up reward', desc: 'Converted to real money', tag: 'Converted', amount: '$22.59', expires: '18/09/2026 05:19' },
  { title: '25 Free Spins', desc: 'Sweet Bonanza · Pragmatic Play', tag: 'Free spins', progress: 1, expires: '01/10/2026 01:27', game: cover('Sweet Bonanza 1000_800x800_EN.png') },
  { title: '25 Free Spins', desc: 'Sweet Bonanza · Pragmatic Play', tag: 'Free spins', progress: 1, expires: '18/09/2026 05:12', game: cover('Sweet Bonanza 1000_800x800_EN.png') },
]

/* ── history: casino and payments, as production columns ────────────── */
export interface Tx {
  kind: 'casino' | 'payment' | 'bonus'
  status: 'Completed' | 'Pending' | 'Failed'
  id: string
  date: string
  time: string
  info: string
  amount: number
}
export const transactions: Tx[] = [
  { kind: 'casino', status: 'Completed', id: 'ddb037e4-9051-5777-b7ed-6bfd71034ff3', date: '16/05/2026', time: '06:40', info: 'Win on Big Bass Bonanza', amount: 12.5 },
  { kind: 'payment', status: 'Completed', id: '0x9f3a…c21e', date: '16/05/2026', time: '06:31', info: 'Deposit · USDT (TRC20)', amount: 200 },
  { kind: 'casino', status: 'Completed', id: 'f6364732-e29e-5bf2-8d03-0a2646ac8df1', date: '16/05/2026', time: '06:40', info: 'Bet on Big Bass Bonanza', amount: -5 },
  { kind: 'bonus', status: 'Completed', id: 'rb-20260516', date: '16/05/2026', time: '06:00', info: 'Rakeback converted', amount: 6.5 },
  { kind: 'casino', status: 'Completed', id: '76c74cbf-a804-52ce-a0e4-82c82bc7a37e', date: '15/05/2026', time: '22:12', info: 'Win on Sweet Bonanza', amount: 5 },
  { kind: 'casino', status: 'Completed', id: '53208ad1-5104-5acb-88c8-7331ad3c1b64', date: '15/05/2026', time: '22:11', info: 'Bet on Sweet Bonanza', amount: -5 },
  { kind: 'payment', status: 'Pending', id: '0x41be…77d0', date: '15/05/2026', time: '20:02', info: 'Withdrawal · USDT (TRC20)', amount: -300 },
  { kind: 'casino', status: 'Completed', id: 'c62705d8-a04b-597c-8c6f-62858254aceb', date: '15/05/2026', time: '19:48', info: 'Win on Plinko', amount: 2.5 },
  { kind: 'casino', status: 'Completed', id: '5b34092c-d424-5490-8332-cba4d44046d5', date: '15/05/2026', time: '19:47', info: 'Bet on Plinko', amount: -5 },
]

/* ── used only by the earlier concepts (05–07) ───────────────────────── */
export const legacyStats = { wagered: '$4,820', wins: '$2,310', bets: 477, biggest: '$250' }
export const legacyBonuses: Bonus[] = [
  { title: 'Cash Back Welcome Offer', desc: 'Get cash back on losses in your first week of play.', tag: 'Welcome', amount: 'Up to $500' },
  { title: 'WTF Live Free Entry', desc: 'Play along with the live show for a shot at the weekly draw.', tag: 'Free to enter', amount: '$1,000 weekly' },
]

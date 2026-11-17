import type { CSSProperties, ReactNode } from 'react'
import { WALLET } from '../../config'
import type { Tokens } from '../../data/skins'
import { Icon, Svg } from '../casino/parts'

/**
 * A Vegangster-shaped casino frontend built ONLY on Vegangster token names.
 * Nothing in here hard-codes a colour, radius or font: swap the token set and
 * the whole surface restyles. Artwork is placeholder gradients — no game art.
 */

const K_FOR: Record<number, number> = { 1440: 1, 2560: 1.5, 3440: 1.65 }
const t = (name: string) => `var(--token-${name})`

const GAMES = [
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', g: 1 },
  { name: 'Sweet Bonanza', provider: 'Pragmatic Play', g: 2 },
  { name: 'Book of Dead', provider: "Play'n GO", g: 3 },
  { name: 'Wanted Dead or a Wild', provider: 'Hacksaw', g: 1 },
  { name: 'Plinko', provider: 'WTF Originals', g: 2 },
  { name: 'Mines', provider: 'WTF Originals', g: 3 },
  { name: 'Crazy Time', provider: 'Evolution', g: 1 },
  { name: 'Big Bass Splash', provider: 'Pragmatic Play', g: 2 },
]
const CATS = ['Lobby', 'Originals', 'Slots', 'Live casino', 'Game shows', 'Crash', 'New']
const LEADERS = [
  { nick: 'degen_dave', game: 'Gates of Olympus', bet: '$12.00', win: '$1,840.00', x: '153×' },
  { nick: 'mrs_whale', game: 'Sweet Bonanza', bet: '$40.00', win: '$960.00', x: '24×' },
  { nick: 'plinko_pete', game: 'Plinko', bet: '$5.00', win: '$410.50', x: '82×' },
  { nick: 'softhands', game: 'Crazy Time', bet: '$20.00', win: '$300.00', x: '15×' },
]

/* ------------------------------------------------------------------ bits */

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="vh"
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: t('brand-brand-color-1-500'),
        color: t('brand-button-deposit-text'),
        display: 'grid',
        placeItems: 'center',
        fontSize: size * 0.42,
        letterSpacing: '-0.04em',
        flex: '0 0 auto',
      }}
    >
      W
    </div>
  )
}

function SectionHead({ title, icon, action = 'See all' }: { title: string; icon?: ReactNode; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <div className="vh" style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: t('typography-size-xl') }}>
        {icon && <span style={{ color: t('brand-brand-color-1-500'), display: 'flex' }}>{icon}</span>}
        {title}
      </div>
      <button className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>
        {action} ›
      </button>
    </div>
  )
}

function Banner({ compact }: { compact?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        minHeight: compact ? 190 : 260,
        background: t('brand-constructor-bento-gradient-1'),
        border: `1px solid ${t('brand-secondary-6')}`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: compact ? 18 : 32,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: t('brand-gradient-8') }} />
      <div
        style={{
          position: 'absolute',
          right: compact ? -40 : 40,
          top: compact ? -30 : -10,
          width: compact ? 200 : 300,
          height: compact ? 200 : 300,
          borderRadius: '50%',
          background: t('brand-constructor-bento-gradient-2'),
          opacity: 0.38,
          filter: 'blur(6px)',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 520 }}>
        <span className="vlabel" style={{ background: t('brand-secondary-14'), color: t('brand-primary-1-600'), marginBottom: 10 }}>
          Welcome offer
        </span>
        <div className="vh" style={{ fontSize: compact ? t('typography-size-3xl') : t('typography-size-5xl'), marginBottom: 8 }}>
          200% up to $2,000
          <br />+ 200 free spins
        </div>
        <div style={{ fontSize: compact ? t('typography-size-md') : t('typography-size-lg'), color: t('brand-primary-1-500'), marginBottom: 16 }}>
          Across your first three deposits. Crypto or card, instant.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="vbtn" style={{ background: t('brand-button-banner-normal'), color: t('brand-button-banner-text') }}>
            Claim bonus
          </button>
          {!compact && (
            <button className="vbtn" style={{ background: t('brand-secondary-14'), color: t('brand-primary-1-600') }}>
              Terms
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CategoryTabs() {
  const icons: ReactNode[] = [Icon.home, Icon.slots, Icon.slots, Icon.live, Icon.shows, Icon.discover, Icon.promos]
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
      {CATS.map((c, i) => (
        <button key={c} className={`vtab${i === 0 ? ' vtab-on' : ''}`}>
          <Svg d={icons[i]} size={15} stroke={2} />
          {c}
        </button>
      ))}
    </div>
  )
}

function GameCard({ game, h }: { game: (typeof GAMES)[number]; h: number }) {
  return (
    <button
      style={{
        position: 'relative',
        height: h,
        borderRadius: 14,
        overflow: 'hidden',
        background: t(`brand-constructor-bento-gradient-${game.g}`),
        border: `1px solid ${t('brand-secondary-6')}`,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: t('brand-gradient-11') }} />
      <div className="vh" style={{ position: 'absolute', top: 10, left: 12, fontSize: 44, opacity: 0.18, letterSpacing: '-0.05em' }}>
        {game.name.slice(0, 1)}
      </div>
      <div style={{ position: 'relative' }}>
        <div className="vc" style={{ fontSize: t('typography-size-lg'), lineHeight: 1.15 }}>{game.name}</div>
        <div className="vfaint" style={{ fontSize: t('typography-size-sm'), marginTop: 3 }}>{game.provider}</div>
      </div>
      <span
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: t('brand-secondary-24'),
          color: t('brand-primary-1-400'),
          display: 'grid',
          placeItems: 'center',
          fontSize: 11,
          fontWeight: 700,
          fontStyle: 'italic',
        }}
      >
        i
      </span>
    </button>
  )
}

function GameGrid({ cols, h }: { cols: number; h: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 12 }}>
      {GAMES.slice(0, cols === 2 ? 6 : 8).map((g) => (
        <GameCard key={g.name} game={g} h={h} />
      ))}
    </div>
  )
}

function Jackpot() {
  return (
    <div className="vcard" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="vlabel" style={{ background: t('brand-glass-effect-brand'), color: t('brand-brand-color-1-300') }}>
          Mega jackpot
        </span>
        <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>Not won yet</span>
      </div>
      <div className="vh vsuccess" style={{ fontSize: t('typography-size-4xl'), fontVariantNumeric: 'tabular-nums' }}>
        $5,500,707.80
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 12, borderTop: `1px solid ${t('brand-secondary-6')}` }}>
        <span className="vmuted" style={{ fontSize: t('typography-size-md') }}>Opt in · $0.10 per round</span>
        <Toggle on />
      </div>
    </div>
  )
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        background: on ? t('brand-brand-color-1-500') : t('brand-secondary-2'),
        position: 'relative',
        flex: '0 0 auto',
        display: 'inline-block',
      }}
    >
      <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: on ? t('brand-button-deposit-text') : t('brand-primary-1-300') }} />
    </span>
  )
}

function BonusCard() {
  return (
    <div className="vcard" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'space-between', background: t('brand-constructor-bonus-gradient-2') }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="vlabel" style={{ background: t('brand-secondary-14'), color: t('brand-primary-1-600') }}>Active bonus</span>
        <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>2d 14h left</span>
      </div>
      <div>
        <div className="vh" style={{ fontSize: t('typography-size-2xl') }}>Reload 50% · $250</div>
        <div className="vmuted" style={{ fontSize: t('typography-size-md'), marginTop: 4 }}>Wagered $1,440 of $2,000</div>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: t('brand-secondary-14'), overflow: 'hidden' }}>
        <div style={{ width: '72%', height: '100%', borderRadius: 999, background: t('brand-brand-color-1-500') }} />
      </div>
      <button className="vbtn vbtn-primary" style={{ alignSelf: 'flex-start' }}>
        Continue playing
      </button>
    </div>
  )
}

function Leaderboard({ rows = 4 }: { rows?: number }) {
  return (
    <div className="vcard" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 4, padding: 8, borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
        {['All bets', 'High rollers', 'Lucky bets'].map((l, i) => (
          <button key={l} className={`vtab${i === 0 ? ' vtab-on' : ''}`} style={{ height: 30, fontSize: t('typography-size-sm') }}>
            {l}
          </button>
        ))}
      </div>
      {LEADERS.slice(0, rows).map((r, i) => (
        <div key={r.nick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderTop: i ? `1px solid ${t('brand-secondary-6')}` : 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: t(`brand-constructor-bento-gradient-${(i % 3) + 1}`), flex: '0 0 auto' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: t('typography-size-md'), fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>@{r.nick}</div>
            <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{r.game} · {r.bet}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="vsuccess" style={{ fontSize: t('typography-size-md'), fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.win}</div>
            <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{r.x}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Elements() {
  const status: [string, string][] = [
    ['Success', 'brand-success-500'],
    ['Warning', 'brand-warning-500'],
    ['Error', 'brand-error-500'],
    ['Info', 'brand-info-500'],
  ]
  return (
    <div className="vcard" style={{ padding: 18, display: 'grid', gap: 16 }}>
      <div className="vfaint" style={{ fontSize: t('typography-size-sm'), letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700 }}>
        Elements
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="vbtn vbtn-primary">Deposit</button>
        <button className="vbtn vbtn-ghost">Log in</button>
        <button className="vbtn vbtn-soft">Cash out</button>
        <button className="vbtn vbtn-primary vbtn-sm">Small</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        <div className="vinput">
          <Svg d={Icon.search} size={16} stroke={2} />
          Search games, providers…
        </div>
        <div className="vinput vinput-focus">0.0025 BTC</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {status.map(([l, c]) => (
          <span key={l} className="vlabel" style={{ background: `color-mix(in srgb, ${t(c)} 18%, transparent)`, color: t(c) }}>
            {l}
          </span>
        ))}
        <span style={{ flex: 1 }} />
        <Toggle on />
        <Toggle />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ chrome */

function AuthButtons() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button className="vbtn vbtn-ghost vbtn-sm">Log in</button>
      <button className="vbtn vbtn-primary vbtn-sm">Sign up</button>
    </div>
  )
}

function WalletChip() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 40, padding: '0 4px 0 14px', borderRadius: t('border-radius-button'), background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}` }}>
      <span className="vh" style={{ fontSize: t('typography-size-lg-plus'), fontVariantNumeric: 'tabular-nums' }}>
        ${WALLET.balance} <span className="vfaint" style={{ fontSize: t('typography-size-sm'), fontWeight: 700 }}>{WALLET.currency}</span>
      </span>
      <button className="vbtn vbtn-primary vbtn-sm" style={{ height: 32 }}>
        Deposit
      </button>
    </div>
  )
}

function MobileHeader() {
  return (
    <div style={{ flex: '0 0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: t('brand-secondary-1'), borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
      <LogoMark size={30} />
      <AuthButtons />
    </div>
  )
}

function TabBar() {
  const tabs: [string, ReactNode][] = [
    ['Lobby', Icon.home],
    ['Search', Icon.search],
    ['Wallet', Icon.wallet],
    ['Promos', Icon.promos],
    ['Account', Icon.account],
  ]
  return (
    <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, zIndex: 5 }}>
      <div className="vglass" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 62, borderRadius: 999, padding: '0 6px', boxShadow: t('brand-shadow-1') }}>
        {tabs.map(([l, d], i) => (
          <button key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: i === 0 ? t('brand-brand-color-1-500') : t('brand-primary-1-300'), fontSize: 9.5, fontWeight: 700, width: 54 }}>
            <Svg d={d} size={21} stroke={i === 0 ? 2.2 : 1.8} />
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

const NAV: [string, ReactNode][] = [
  ['Lobby', Icon.home],
  ['Originals', Icon.slots],
  ['Slots', Icon.slots],
  ['Live casino', Icon.live],
  ['Game shows', Icon.shows],
  ['Table games', Icon.tables],
  ['Promotions', Icon.promos],
  ['VIP club', Icon.studios],
]

function SideNav() {
  return (
    <nav style={{ flex: '0 0 232px', background: t('brand-secondary-1'), borderRight: `1px solid ${t('brand-secondary-6')}`, display: 'flex', flexDirection: 'column', padding: '20px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 22px' }}>
        <LogoMark size={34} />
        <span className="vh" style={{ fontSize: t('typography-size-xl'), letterSpacing: '-0.02em' }}>WTF Games</span>
      </div>
      <div style={{ display: 'grid', gap: 2 }}>
        {NAV.map(([l, d], i) => {
          const on = i === 0
          return (
            <button key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 42, padding: '0 12px', borderRadius: t('border-radius-input'), background: on ? t('brand-glass-effect-brand') : 'transparent', color: on ? t('brand-brand-color-1-500') : t('brand-primary-1-400'), fontSize: t('typography-size-lg'), fontWeight: 600, textAlign: 'left' }}>
              <Svg d={d} size={19} stroke={on ? 2.1 : 1.8} />
              {l}
            </button>
          )
        })}
      </div>
      <div style={{ flex: 1 }} />
      <div className="vcard" style={{ padding: 14, background: t('brand-constructor-bento-gradient-3') }}>
        <div className="vc" style={{ fontSize: t('typography-size-md') }}>Refer a friend</div>
        <div className="vmuted" style={{ fontSize: t('typography-size-sm'), margin: '4px 0 10px' }}>Earn $50 per deposit</div>
        <button className="vbtn vbtn-primary vbtn-sm">Get link</button>
      </div>
    </nav>
  )
}

function TopBar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header style={{ flex: '0 0 68px', height: 68, display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', background: t('brand-secondary-1'), borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
      <div className="vinput" style={{ width: 380, height: 40 }}>
        <Svg d={Icon.search} size={16} stroke={2} />
        Search games, providers…
      </div>
      <div style={{ flex: 1 }} />
      {loggedIn ? <WalletChip /> : <AuthButtons />}
    </header>
  )
}

function WindowChrome() {
  const dot = (c: string): CSSProperties => ({ width: 11, height: 11, borderRadius: '50%', background: c })
  return (
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#0c0c10', borderBottom: '1px solid #1a1a20' }}>
      <span style={dot('#FF5F57')} />
      <span style={dot('#FEBC2E')} />
      <span style={dot('#28C840')} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', border: '1px solid #23232a', borderRadius: 7, padding: '4px 16px', fontSize: 11, color: '#787878', fontFamily: 'var(--f-body)' }}>wtfgames.com</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ screen */

interface Props {
  tokens: Tokens
  isDesktop: boolean
  /** 390 (mobile) · 1440 · 2560 · 3440 */
  width: number
  bodyHeight: number
  loggedIn?: boolean
}

export function TokensScreen({ tokens, isDesktop, width, bodyHeight, loggedIn = false }: Props) {
  const vars = tokens as unknown as CSSProperties

  if (!isDesktop) {
    return (
      <div className="veg" style={{ ...vars, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <MobileHeader />
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 100px', display: 'grid', gap: 22 }}>
          <Banner compact />
          <CategoryTabs />
          <section>
            <SectionHead title="Top games" icon={<Svg d={Icon.slots} size={16} stroke={2.2} />} />
            <GameGrid cols={2} h={150} />
          </section>
          <Jackpot />
          <BonusCard />
          <section>
            <SectionHead title="Live wins" icon={<Svg d={Icon.live} size={16} stroke={2.2} />} />
            <Leaderboard rows={3} />
          </section>
          <Elements />
        </div>
        <TabBar />
      </div>
    )
  }

  const kk = K_FOR[width] ?? 1
  return (
    <div className="veg" style={{ ...vars, width, borderRadius: 14, overflow: 'hidden', border: '1px solid #1c1c22', boxShadow: 'var(--shadow-deep)', flex: '0 0 auto' }}>
      <WindowChrome />
      {/* zoom scales type, CTAs and spacing together at the big breakpoints */}
      <div style={{ display: 'flex', height: bodyHeight / kk, width: width / kk, zoom: kk } as CSSProperties}>
        <SideNav />
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar loggedIn={loggedIn} />
          <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 28px 48px', display: 'grid', gap: 28 }}>
              <Banner />
              <CategoryTabs />
              <section>
                <SectionHead title="Top games" icon={<Svg d={Icon.slots} size={18} stroke={2.2} />} />
                <GameGrid cols={4} h={200} />
              </section>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 16, alignItems: 'stretch' }}>
                <Jackpot />
                <BonusCard />
                <Leaderboard />
              </div>
              <Elements />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

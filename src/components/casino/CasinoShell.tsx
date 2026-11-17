import type { CSSProperties, ReactNode } from 'react'
import { WALLET } from '../../config'
import { CATEGORIES, WTF_MARK } from '../../data/casino'
import { Btn, Icon, PillLogo, SearchBar, SearchIcon, Svg, k } from './parts'

export type Concept = 1 | 2 | 3
/** Type/size multiplier per desktop preview width (type scales, not just reflows). */
export const K_FOR: Record<number, number> = { 1440: 1, 2560: 1.5, 3440: 1.65 }

/* ------------------------------------------------------------------ bits */

function WalletChip({ compact, deposit }: { compact?: boolean; deposit?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: k(8),
        background: 'var(--cs-surface)',
        border: '1px solid var(--cs-line-2)',
        borderRadius: k(10),
        padding: `${k(4)} ${k(4)} ${k(4)} ${k(compact ? 9 : 12)}`,
        height: k(compact ? 34 : 40),
      }}
    >
      <span className="cd" style={{ fontSize: k(compact ? 14 : 16), lineHeight: 1, letterSpacing: '.02em' }}>
        ${WALLET.balance}
        <span style={{ fontSize: k(9.5), color: 'var(--cs-muted)', marginLeft: 4, fontFamily: 'var(--cf-body)', fontStretch: '100%', fontWeight: 600 }}>{WALLET.currency}</span>
      </span>
      {deposit ? (
        <span className="cd" style={{ background: 'var(--cs-green)', color: '#000', borderRadius: k(7), padding: `0 ${k(11)}`, height: k(30), display: 'inline-flex', alignItems: 'center', fontSize: k(12), letterSpacing: '.04em' }}>
          Deposit
        </span>
      ) : (
        <span style={{ display: 'grid', placeItems: 'center', width: k(compact ? 24 : 30), height: k(compact ? 24 : 30), borderRadius: k(7), background: 'var(--cs-green)', color: '#000', fontSize: k(18), fontWeight: 800, lineHeight: 1 }}>
          +
        </span>
      )}
    </div>
  )
}

function AuthButtons({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <div style={{ display: 'flex', gap: k(8) }}>
      <Btn kind="ghost" size={size}>
        Log in
      </Btn>
      <Btn kind="primary" size={size}>
        Sign up
      </Btn>
    </div>
  )
}

function Avatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="cd"
      style={{
        width: k(size),
        height: k(size),
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(120% 120% at 30% 20%, #1d4a1d 0%, #0e0e12 70%)',
        border: '1px solid var(--cs-line-2)',
        fontSize: k(size * 0.36),
      }}
    >
      AN
    </div>
  )
}

interface Tab {
  label: string
  icon: ReactNode
  active?: boolean
  tone?: 'green' | 'lilac'
}

const MOBILE_TABS: Record<Concept, Tab[]> = {
  1: [
    { label: 'Home', icon: Icon.home, active: true },
    { label: 'Search', icon: Icon.search },
    { label: 'Studios', icon: Icon.studios, tone: 'lilac' },
    { label: 'Promos', icon: Icon.promos },
    { label: 'Account', icon: Icon.account },
  ],
  2: [
    { label: 'Lobby', icon: Icon.home, active: true },
    { label: 'Search', icon: Icon.search },
    { label: 'Wallet', icon: Icon.wallet },
    { label: 'Account', icon: Icon.account },
  ],
  3: [
    { label: 'Home', icon: Icon.home, active: true },
    { label: 'Discover', icon: Icon.discover },
    { label: 'Studios', icon: Icon.studios, tone: 'lilac' },
    { label: 'Wallet', icon: Icon.wallet },
    { label: 'Account', icon: Icon.account },
  ],
}

/* ------------------------------------------------------------------ mobile */

function MobileHeader({ concept, loggedIn, onSearch }: { concept: Concept; loggedIn: boolean; onSearch?: () => void }) {
  const compact = concept === 3
  return (
    <div
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        height: compact ? 52 : 58,
        padding: '0 16px',
        background: concept === 2 ? 'linear-gradient(180deg, #120a2a 0%, #0a0810 100%)' : '#000',
        borderBottom: concept === 2 ? '1px solid rgba(164,139,255,.18)' : '1px solid var(--cs-line)',
      }}
    >
      <PillLogo h={compact ? 22 : 26} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {compact && (
          <button
            onClick={onSearch}
            aria-label="Search"
            style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--cs-line-2)', background: 'var(--cs-surface)', display: 'grid', placeItems: 'center', color: '#fff', cursor: 'pointer' }}
          >
            <SearchIcon size={16} />
          </button>
        )}
        {loggedIn ? <WalletChip compact /> : <AuthButtons />}
      </div>
    </div>
  )
}

/** Concept 2: the category "mode strip" is the primary navigation — sticky under the header. */
export function ModeStrip({ active = 'all', onChange, pad }: { active?: string; onChange?: (id: string) => void; pad: number }) {
  const icons: Record<string, ReactNode> = { all: Icon.home, studios: Icon.studios, originals: Icon.slots, slots: Icon.slots, live: Icon.live, shows: Icon.shows, new: Icon.discover }
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: k(8), overflowX: 'auto', padding: `${k(10)} ${pad}px`, background: 'rgba(8,8,10,.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderBottom: '1px solid var(--cs-line)' }}>
      {CATEGORIES.map((c) => {
        const on = c.id === active
        const studio = c.id === 'studios'
        return (
          <button
            key={c.id}
            onClick={() => onChange?.(c.id)}
            className="press"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: k(7),
              height: k(36),
              padding: `0 ${k(13)}`,
              borderRadius: k(10),
              border: `1px solid ${on ? 'transparent' : studio ? 'rgba(164,139,255,.45)' : 'var(--cs-line-2)'}`,
              background: on ? (studio ? 'var(--cs-lilac)' : '#fff') : 'var(--cs-surface)',
              color: on ? '#000' : studio ? 'var(--cs-lilac)' : '#fff',
              fontSize: k(12.5),
              fontWeight: 700,
              whiteSpace: 'nowrap',
              flex: '0 0 auto',
            }}
          >
            <Svg d={icons[c.id] ?? Icon.slots} size={15} stroke={2} />
            {c.id === 'all' ? 'For you' : c.label}
          </button>
        )
      })}
    </div>
  )
}

function BottomBar({ concept }: { concept: Concept }) {
  return (
    <div
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        padding: '8px 4px 12px',
        background: '#050507',
        borderTop: '1px solid var(--cs-line)',
      }}
    >
      {MOBILE_TABS[concept].map((t) => {
        const color = t.active ? 'var(--cs-green)' : t.tone === 'lilac' ? 'var(--cs-lilac)' : 'var(--cs-faint)'
        return (
          <button
            key={t.label}
            style={{ flex: 1, background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color, fontSize: 10, fontWeight: 700, cursor: 'pointer', padding: 0 }}
          >
            <Svg d={t.icon} size={22} stroke={t.active ? 2.1 : 1.8} />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

export function CasinoMobileShell({ concept, loggedIn, children, overlay, strip }: { concept: Concept; loggedIn: boolean; children: ReactNode; overlay?: ReactNode; strip?: ReactNode }) {
  return (
    <div className="casino" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <MobileHeader concept={concept} loggedIn={loggedIn} />
      {strip}
      <div data-scroller className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {children}
      </div>
      <BottomBar concept={concept} />
      {overlay}
    </div>
  )
}

/* ------------------------------------------------------------------ desktop */

const dot = (c: string): CSSProperties => ({ width: 11, height: 11, borderRadius: '50%', background: c })

function WindowChrome() {
  return (
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#0c0c10', borderBottom: '1px solid #1a1a20' }}>
      <span style={dot('#FF5F57')} />
      <span style={dot('#FEBC2E')} />
      <span style={dot('#28C840')} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', border: '1px solid var(--c-border)', borderRadius: 7, padding: '4px 16px', fontSize: 11, color: 'var(--c-text-faint)', fontFamily: 'var(--f-body)' }}>wtfgames.com/casino</div>
      </div>
    </div>
  )
}

const SIDE_NAV: { label: string; icon: ReactNode; active?: boolean; lilac?: boolean }[] = [
  { label: 'Lobby', icon: Icon.home, active: true },
  { label: 'WTF Studios', icon: Icon.studios, lilac: true },
  { label: 'Originals', icon: Icon.slots },
  { label: 'Slots', icon: Icon.slots },
  { label: 'Live casino', icon: Icon.live },
  { label: 'Game shows', icon: Icon.shows },
  { label: 'Table games', icon: Icon.tables },
  { label: 'Promotions', icon: Icon.promos },
]

function SideNav({ slim }: { slim?: boolean }) {
  const w = slim ? 92 : 240
  const row = (n: { label: string; icon: ReactNode; active?: boolean; lilac?: boolean }, muted?: boolean) => {
    const color = n.active ? 'var(--cs-green)' : n.lilac ? 'var(--cs-lilac)' : muted ? 'var(--cs-muted)' : '#fff'
    return (
      <button
        key={n.label}
        style={{
          display: 'flex',
          flexDirection: slim ? 'column' : 'row',
          alignItems: 'center',
          gap: slim ? k(5) : k(12),
          padding: slim ? `${k(10)} 4px` : `${k(10)} ${k(14)}`,
          margin: slim ? `0 ${k(10)}` : `0 ${k(12)}`,
          borderRadius: k(10),
          background: n.active ? 'rgba(0,255,0,.08)' : 'transparent',
          border: 'none',
          color,
          fontSize: k(slim ? 9.5 : 13.5),
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: slim ? 'center' : 'left',
          lineHeight: 1.1,
        }}
      >
        <Svg d={n.icon} size={slim ? 22 : 19} stroke={n.active ? 2.1 : 1.8} />
        {n.label}
      </button>
    )
  }
  return (
    <nav className="no-scrollbar" style={{ flex: `0 0 ${k(w)}`, width: k(w), background: '#0b0b0e', borderRight: '1px solid var(--cs-line)', display: 'flex', flexDirection: 'column', paddingBottom: k(14), overflowY: 'auto' }}>
      <div style={{ padding: slim ? `${k(18)} 0 ${k(14)}` : `${k(20)} ${k(24)} ${k(16)}`, display: 'flex', justifyContent: slim ? 'center' : 'flex-start' }}>
        {slim ? <img src={WTF_MARK} alt="WTF" style={{ height: k(20) }} /> : <PillLogo h={30} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{SIDE_NAV.map((n) => row(n))}</div>
      <div style={{ flex: 1 }} />
      <div style={{ height: 1, background: 'var(--cs-line)', margin: `${k(8)} ${k(12)}` }} />
      {row({ label: slim ? 'Safer play' : 'Responsible play', icon: Icon.shield }, true)}
      {row({ label: 'Help', icon: Icon.help }, true)}
    </nav>
  )
}

function TopBar({ layout, loggedIn, search, center }: { layout: 'sidebar' | 'topnav' | 'threecol'; loggedIn: boolean; search?: boolean; center?: ReactNode }) {
  return (
    <header style={{ height: k(64), flex: `0 0 ${k(64)}`, background: layout === 'topnav' ? 'linear-gradient(180deg,#120a2a,#0a0810)' : '#000', borderBottom: `1px solid ${layout === 'topnav' ? 'rgba(164,139,255,.18)' : 'var(--cs-line)'}` }}>
      <div style={{ height: '100%', maxWidth: 1920, margin: '0 auto', display: 'flex', alignItems: 'center', gap: k(18), padding: '0 40px' }}>
        {layout === 'topnav' && <PillLogo h={30} />}
        {center}
        {search && <div style={{ width: k(layout === 'topnav' ? 300 : 440) }}><SearchBar compact dark={layout !== 'sidebar'} /></div>}
        <div style={{ flex: 1 }} />
        {loggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: k(12) }}>
            <WalletChip deposit />
            <Avatar />
          </div>
        ) : (
          <AuthButtons size="md" />
        )}
      </div>
    </header>
  )
}

/** Concept 2 desktop: categories live in the top bar as tabs — no sidebar. */
function TopTabs() {
  return (
    <div style={{ display: 'flex', gap: k(4), marginLeft: k(10) }}>
      {CATEGORIES.map((c) => {
        const on = c.id === 'all'
        const studio = c.id === 'studios'
        return (
          <button
            key={c.id}
            style={{
              height: k(38),
              padding: `0 ${k(14)}`,
              borderRadius: k(10),
              border: 'none',
              background: on ? '#fff' : 'transparent',
              color: on ? '#000' : studio ? 'var(--cs-lilac)' : 'var(--cs-dim)',
              fontSize: k(13.5),
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {c.id === 'all' ? 'For you' : c.label}
          </button>
        )
      })}
    </div>
  )
}

export function CasinoDesktopShell({
  layout,
  loggedIn,
  width,
  bodyHeight,
  children,
  aside,
  overlay,
}: {
  layout: 'sidebar' | 'topnav' | 'threecol'
  loggedIn: boolean
  width: number
  bodyHeight: number
  children: ReactNode
  aside?: ReactNode
  overlay?: ReactNode
}) {
  const kk = K_FOR[width] ?? 1
  return (
    <div className="casino" style={{ width, background: '#050507', border: '1px solid #1c1c22', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-deep)', flex: '0 0 auto', ['--k' as string]: kk }}>
      <WindowChrome />
      <div style={{ display: 'flex', height: bodyHeight, position: 'relative' }}>
        {layout !== 'topnav' && <SideNav slim={layout === 'threecol'} />}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar layout={layout} loggedIn={loggedIn} search center={layout === 'topnav' ? <TopTabs /> : undefined} />
          <div data-scroller className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {layout === 'threecol' ? (
              <div style={{ display: 'flex', gap: k(32), maxWidth: 1920, margin: '0 auto', padding: '0 40px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0, maxWidth: k(820), margin: '0 auto' }}>{children}</div>
                <div style={{ flex: `0 0 ${k(340)}`, width: k(340), position: 'sticky', top: 0, paddingTop: k(24) }}>{aside}</div>
              </div>
            ) : (
              <div style={{ maxWidth: 1920, margin: '0 auto', padding: '0 40px' }}>{children}</div>
            )}
          </div>
        </main>
        {overlay}
      </div>
    </div>
  )
}

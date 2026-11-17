import { useRef, type CSSProperties, type ReactNode } from 'react'
import type { HeroConcept } from '../../config'
import { WALLET } from '../../config'
import type { Countdown } from '../../hooks/useShowClock'
import { navItems } from '../../data/lobby'
import { asset } from '../../lib/assets'
import { Lobby } from '../Lobby'

/**
 * Max width of the main content column (right of the fixed sidebar); wider
 * screens letterbox. Matches the live site's `max-w-screen-5xl` (1920px).
 */
const MAIN_MAX = 1920

export interface ShellContentProps {
  concept: HeroConcept
  live: boolean
  countdown: Countdown
  prize: string
}

function Sidebar({ onPreviousEpisodes, activeNav }: { onPreviousEpisodes: () => void; activeNav?: string }) {
  return (
    <nav
      className="no-scrollbar"
      style={{
        flex: '0 0 230px',
        background: 'var(--c-sidenav)',
        borderRight: '1px solid var(--c-border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 0 18px',
        overflowY: 'auto',
      }}
    >
      <img src={asset('sidenav.png')} alt="WTF Games" style={{ width: '100%' }} />
      <div style={{ height: 1, background: 'var(--c-border)', margin: '0 0 14px' }} />
      <div
        style={{
          margin: '0 16px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          background: 'var(--c-panel-alt)',
          border: '1px solid var(--c-border)',
          borderRadius: 10,
          padding: '10px 12px',
          color: 'var(--c-text-muted)',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#787878" strokeWidth={1.8}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span style={{ fontSize: 13 }}>Search…</span>
      </div>
      <div style={{ height: 1, background: 'var(--c-border)', margin: '0 0 6px' }} />
      {navItems.map((n) => {
        const active = activeNav ? n.label === activeNav : !!n.active
        const rowStyle: CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          padding: '11px 18px',
          background: active ? 'rgba(0,255,0,.08)' : 'transparent',
          border: 'none',
          borderLeft: `2px solid ${active ? 'var(--c-green)' : 'transparent'}`,
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
        }
        return (
          <button key={n.label} style={rowStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00FF00' : '#fff'} strokeWidth={1.8}>
              <path d={n.d} />
            </svg>
            {n.label}
          </button>
        )
      })}
      <button onClick={onPreviousEpisodes} style={navRow}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9.5v5l4-2.5z" />
        </svg>
        Previous Episodes
      </button>
      <div style={{ flex: 1 }} />
      <div style={{ height: 1, background: 'var(--c-border)', margin: '6px 16px' }} />
      <button style={pinnedBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#787878" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7M12 17v.01" />
        </svg>
        Help
      </button>
      <button style={pinnedBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#787878" strokeWidth={1.8}>
          <path d="M4 5h16v11H7l-3 3z" />
          <circle cx="9.5" cy="10.5" r="1" />
          <circle cx="14.5" cy="10.5" r="1" />
        </svg>
        Discord Support
      </button>
    </nav>
  )
}

const pinnedBtn: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 13,
  padding: '10px 20px',
  background: 'none',
  border: 'none',
  color: 'var(--c-text-muted)',
  fontSize: 14,
  cursor: 'pointer',
  textAlign: 'left',
}

// Inactive nav-row style (used by the Previous Episodes entry).
const navRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 13,
  padding: '11px 18px',
  background: 'transparent',
  border: 'none',
  borderLeft: '2px solid transparent',
  color: '#fff',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
}

function TopBar({ loggedIn = false, walletOpen = false }: { loggedIn?: boolean; walletOpen?: boolean }) {
  // Balance + Deposit chip. When logged in this is the right-most nav item and
  // the wallet dropdown drops from it (highlighted while open).
  const walletChip = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        background: 'var(--c-panel)',
        border: `1px solid ${walletOpen ? 'var(--c-green)' : 'var(--c-border-alt2)'}`,
        borderRadius: 10,
        padding: '6px 8px 6px 12px',
        boxShadow: walletOpen ? '0 0 0 3px rgba(0,255,0,.16)' : 'none',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M16 14h2" />
      </svg>
      <span style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 16, lineHeight: 1 }}>
        ${WALLET.balance}
        <span style={{ fontSize: 10, color: 'var(--c-text-muted)', marginLeft: 4 }}>{WALLET.currency}</span>
      </span>
      {loggedIn && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth={2} style={{ transform: walletOpen ? 'rotate(180deg)' : 'none', transition: 'transform .12s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
      <button
        className="brighten"
        style={{ background: 'var(--c-green)', color: '#000', border: 'none', borderRadius: 7, padding: '5px 12px', fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}
      >
        Deposit
      </button>
    </div>
  )
  return (
    <header style={{ height: 60, flex: '0 0 60px', background: '#000', borderBottom: '1px solid var(--c-border)' }}>
      <div style={{ height: '100%', maxWidth: MAIN_MAX, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px' }}>
        <div style={{ flex: 1 }} />
        {loggedIn ? (
          <>
            <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'radial-gradient(120% 120% at 30% 20%, #1d4a1d 0%, #0e0e12 70%)', border: '1px solid var(--c-border-alt)', fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13 }}>AN</div>
            {walletChip}
          </>
        ) : (
          <>
            {walletChip}
            <button className="brighten" style={authBtn(false)}>Log in</button>
            <button className="brighten" style={authBtn(true)}>Sign up</button>
          </>
        )}
      </div>
    </header>
  )
}

function authBtn(primary: boolean): CSSProperties {
  return {
    height: 40,
    padding: '0 16px',
    background: primary ? 'var(--c-green)' : 'transparent',
    border: primary ? 'none' : '1px solid #fff',
    color: primary ? '#000' : '#fff',
    borderRadius: 8,
    fontFamily: 'var(--f-display)',
    fontWeight: 900,
    fontSize: 14,
    textTransform: 'uppercase',
    cursor: 'pointer',
  }
}

const dot = (c: string): CSSProperties => ({ width: 11, height: 11, borderRadius: '50%', background: c })

/** macOS-style browser window chrome for the review presentation. */
function WindowChrome() {
  return (
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#0c0c10', borderBottom: '1px solid #1a1a20' }}>
      <span style={dot('#FF5F57')} />
      <span style={dot('#FEBC2E')} />
      <span style={dot('#28C840')} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', border: '1px solid var(--c-border)', borderRadius: 7, padding: '4px 16px', fontSize: 11, color: 'var(--c-text-faint)' }}>
          wtfgames.com/casino
        </div>
      </div>
    </div>
  )
}

export function DesktopShell({
  concept,
  live,
  countdown,
  prize,
  framed,
  width,
  bodyHeight,
  page,
  loggedIn,
  walletOpen,
  activeNav,
}: ShellContentProps & { framed?: boolean; width?: number; bodyHeight?: number; page?: ReactNode; loggedIn?: boolean; walletOpen?: boolean; activeNav?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToPrev = () => {
    const container = scrollRef.current
    const target = container?.querySelector<HTMLElement>('#wtf-previous')
    if (!container || !target) return
    const top = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12
    container.scrollTo({ top, behavior: 'smooth' })
  }
  const body = (
    <>
      {/* Sidebar pinned left. The top nav bar + its divider span the full main-area
          width; only the scrolling page content is capped at MAIN_MAX and centred. */}
      <Sidebar onPreviousEpisodes={scrollToPrev} activeNav={activeNav} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar loggedIn={loggedIn} walletOpen={walletOpen} />
        <div ref={scrollRef} className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <div style={{ maxWidth: MAIN_MAX, margin: '0 auto', containerType: 'inline-size' }}>
            {page ?? (
              <Lobby
                isDesktop
                concept={concept}
                live={live}
                countdown={countdown}
                prize={prize}
                scrollContainerRef={scrollRef}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )

  if (framed) {
    // `width` simulates a specific screen size (breakpoint preview). The sidebar
    // hugs the left edge; the content column caps at MAIN_MAX so big screens letterbox.
    return (
      <div
        style={{
          width: width ? width : 'min(1180px, 96vw)',
          background: '#050507',
          border: '1px solid #1c1c22',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-deep)',
          flex: '0 0 auto',
        }}
      >
        <WindowChrome />
        <div style={{ display: 'flex', height: bodyHeight ?? 720 }}>{body}</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--c-black)' }}>
      <WindowChrome />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>{body}</div>
    </div>
  )
}

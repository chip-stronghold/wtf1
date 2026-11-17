import { useRef, type CSSProperties, type ReactNode } from 'react'
import { WALLET } from '../../config'
import { asset } from '../../lib/assets'
import { Lobby } from '../Lobby'
import type { ShellContentProps } from './DesktopShell'

function MobileHeader() {
  return (
    <div
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        padding: '12px 16px',
        background: 'linear-gradient(180deg,#000 64%,rgba(0,0,0,0))',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      <img src={asset('WTF_games.png')} alt="WTF Games" style={{ height: 30, width: 'auto' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--c-panel)',
          border: '1px solid var(--c-border)',
          borderRadius: 10,
          padding: '5px 6px 5px 10px',
        }}
      >
        <span style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13, lineHeight: 1 }}>
          ${WALLET.balance}
          <span style={{ fontSize: 9, color: 'var(--c-text-muted)', marginLeft: 3 }}>{WALLET.currency}</span>
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 7,
            background: 'var(--c-green)',
            color: '#000',
            fontSize: 16,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>
    </div>
  )
}

const tab = (active = false): CSSProperties => ({
  flex: 1,
  background: 'none',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  color: active ? 'var(--c-green)' : 'var(--c-text-faint)',
  fontSize: 9,
  fontWeight: 600,
  cursor: 'pointer',
})

function BottomTabBar({ onHome }: { onHome: () => void }) {
  const stroke = '#787878'
  return (
    <div
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        padding: '8px 6px 14px',
        background: 'linear-gradient(180deg,rgba(8,8,10,0),#08080a 38%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderTop: '1px solid #1a1a20',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
      }}
    >
      <button onClick={onHome} style={tab(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth={1.8}>
          <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
        </svg>
        Home
      </button>
      <button style={tab()}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8}>
          <path d="M12 3l2.9 6 6.6 1-4.8 4.6 1.2 6.7L12 18l-5.9 3.3L7.3 14.6 2.5 10l6.6-1z" />
        </svg>
        Slots
      </button>
      <button style={tab()}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8}>
          <path d="M12 3c1 5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 0 2 1 3 2 3 0-3-1-5 1-8z" />
        </svg>
        Leagues
      </button>
      <button style={tab()}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M16 14h2" />
        </svg>
        Wallet
      </button>
    </div>
  )
}

export function MobileShell({ concept, live, countdown, prize, page }: ShellContentProps & { page?: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const onHome = () => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--c-black)' }}>
      <MobileHeader />
      <div ref={scrollRef} className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {page ?? (
          <Lobby
            isDesktop={false}
            concept={concept}
            live={live}
            countdown={countdown}
            prize={prize}
            scrollContainerRef={scrollRef}
          />
        )}
      </div>
      <BottomTabBar onHome={onHome} />
    </div>
  )
}

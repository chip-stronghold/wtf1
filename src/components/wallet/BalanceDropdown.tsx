import { useState, type CSSProperties } from 'react'
import type { WalletVersion } from '../../config'
import { balanceBuckets, coins } from '../../data/wallet'
import { CoinIcon, DISPLAY, GreenBtn, SearchField, Switch, ToggleRow } from './walletParts'

const panel = (isDesktop: boolean): CSSProperties => ({
  width: isDesktop ? 300 : '100%',
  maxHeight: isDesktop ? 540 : '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#0e0e12',
  border: '1px solid var(--c-border)',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 24px 60px rgba(0,0,0,.6)',
  fontFamily: 'var(--f-body)',
  color: '#fff',
})

const divider: CSSProperties = { height: 1, background: 'var(--c-border)' }
const primary = coins[4] // USDT

/* ── balance buckets (Real / Bonus / Withdrawable) — three display variants ── */
function Buckets({ fiat, variant }: { fiat: boolean; variant: 'rows' | 'cards' | 'inline' }) {
  const val = (b: (typeof balanceBuckets)[number]) => (fiat ? b.fiat : b.value)

  if (variant === 'inline') {
    return (
      <div style={{ display: 'flex', gap: 7 }}>
        {balanceBuckets.map((b, i) => (
          <div key={b.label} style={{ flex: 1, minWidth: 0, background: i === 0 ? 'rgba(0,255,0,.08)' : 'var(--c-black)', border: `1px solid ${i === 0 ? 'rgba(0,255,0,.3)' : 'var(--c-border)'}`, borderRadius: 10, padding: '9px 10px' }}>
            <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fiat ? b.fiat : parseFloat(b.value).toFixed(2)}</div>
            <div style={{ fontSize: 9.5, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginTop: 2 }}>{b.label.replace(' money', '')}</div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {balanceBuckets.map((b, i) => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: i === 0 ? 'rgba(0,255,0,.07)' : 'var(--c-black)', border: `1px solid ${i === 0 ? 'rgba(0,255,0,.3)' : 'var(--c-border)'}`, borderRadius: 11, padding: '9px 12px' }}>
            <div>
              <div style={{ ...DISPLAY, fontSize: 16, fontWeight: 900 }}>{val(b)}</div>
              <div style={{ fontSize: 10.5, color: 'var(--c-text-muted)' }}>{b.label}</div>
            </div>
            <CoinIcon glyph={primary.glyph} color={primary.color} size={24} />
          </div>
        ))}
      </div>
    )
  }

  // rows
  return (
    <div style={{ background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 11, padding: '2px 12px' }}>
      {balanceBuckets.map((b, i) => (
        <div key={b.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderBottom: i < balanceBuckets.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
          <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>{b.label}</span>
          <span style={{ ...DISPLAY, fontSize: 14, fontWeight: 900, color: i === 0 ? 'var(--c-green)' : '#fff' }}>{val(b)}</span>
        </div>
      ))}
    </div>
  )
}

/* shared scrollable coin list */
function CoinList({ fiat, hideZero }: { fiat: boolean; hideZero: boolean }) {
  const list = hideZero ? coins.filter((c) => parseFloat(c.balance) > 0) : coins
  return (
    <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
      {list.map((c) => {
        const zero = parseFloat(c.balance) === 0
        return (
          <div key={c.sym} className="brighten" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 16px', cursor: 'pointer', opacity: zero ? 0.55 : 1, borderBottom: '1px solid rgba(255,255,255,.04)' }}>
            <CoinIcon glyph={c.glyph} color={c.color} size={24} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.sym}</div>
              <div style={{ fontSize: 10.5, color: 'var(--c-text-faint)' }}>{c.name}</div>
            </div>
            <span style={{ ...DISPLAY, fontSize: 13.5, fontWeight: 900 }}>{fiat ? c.fiat : c.balance}</span>
          </div>
        )
      })}
    </div>
  )
}

export function BalanceDropdown({ version, isDesktop, onTopUp }: { version: WalletVersion; isDesktop: boolean; onTopUp: () => void }) {
  const [fiat, setFiat] = useState(false)
  const [hideZero, setHideZero] = useState(false)

  /* ── V1 · Shuffle-style: buckets as rows, deposit, list, footer toggles ── */
  if (version === 1) {
    return (
      <div style={panel(isDesktop)}>
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Buckets fiat={fiat} variant="rows" />
          <GreenBtn sm onClick={onTopUp}>Deposit</GreenBtn>
        </div>
        <div style={divider} />
        <div style={{ padding: 10 }}><SearchField /></div>
        <CoinList fiat={fiat} hideZero={hideZero} />
        <div style={divider} />
        <ToggleRow label="Display in USD" on={fiat} onToggle={() => setFiat((v) => !v)} />
        <ToggleRow label="Hide zero balances" on={hideZero} onToggle={() => setHideZero((v) => !v)} />
      </div>
    )
  }

  /* ── V2 · Balance buckets as cards ── */
  if (version === 2) {
    return (
      <div style={panel(isDesktop)}>
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Buckets fiat={fiat} variant="cards" />
          <GreenBtn sm onClick={onTopUp}>Top up</GreenBtn>
        </div>
        <div style={divider} />
        <div style={{ padding: 10 }}><SearchField /></div>
        <CoinList fiat={fiat} hideZero={hideZero} />
        <div style={divider} />
        <ToggleRow label="Display in USD" on={fiat} onToggle={() => setFiat((v) => !v)} />
        <ToggleRow label="Hide zero balances" on={hideZero} onToggle={() => setHideZero((v) => !v)} />
      </div>
    )
  }

  /* ── V3 · Compact: inline buckets + actions + inline toggles ── */
  return (
    <div style={panel(isDesktop)}>
      <div style={{ padding: 14, background: 'linear-gradient(135deg,#0f1a0f,#0e0e12)' }}>
        <Buckets fiat={fiat} variant="inline" />
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <GreenBtn sm onClick={onTopUp}>Deposit</GreenBtn>
          <button className="brighten" style={{ ...DISPLAY, flex: 1, height: 40, background: 'transparent', color: '#fff', border: '1px solid var(--c-border-alt)', borderRadius: 11, fontWeight: 900, fontSize: 13, cursor: 'pointer' }}>Withdraw</button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 14px' }}>
        <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>Assets</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--c-text-muted)', cursor: 'pointer' }}>USD <Switch on={fiat} onToggle={() => setFiat((v) => !v)} /></label>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--c-text-muted)', cursor: 'pointer' }}>Hide 0 <Switch on={hideZero} onToggle={() => setHideZero((v) => !v)} /></label>
        </div>
      </div>
      <div style={divider} />
      <CoinList fiat={fiat} hideZero={hideZero} />
    </div>
  )
}

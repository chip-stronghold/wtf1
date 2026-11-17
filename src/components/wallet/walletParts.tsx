import { useState, type CSSProperties, type ReactNode } from 'react'

export const DISPLAY: CSSProperties = { fontFamily: 'var(--f-display)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.02em' }

/* ── coin icon (colored disc + glyph) ───────────────────────────────────── */
export function CoinIcon({ glyph, color, size = 28 }: { glyph: string; color: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        flex: '0 0 auto',
        borderRadius: '50%',
        background: color,
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: Math.round(size * 0.52),
        lineHeight: 1,
      }}
    >
      {glyph}
    </span>
  )
}

/* ── deterministic QR placeholder (looks like a real QR) ────────────────── */
export function QrCode({ value, size = 196 }: { value: string; size?: number }) {
  const N = 25
  // simple string hash → per-cell fill
  let h = 0
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0
  const cell = (i: number, j: number) => {
    const v = (h ^ (i * 73856093) ^ (j * 19349663)) >>> 0
    return (v % 100) < 48
  }
  const isFinder = (i: number, j: number) => {
    const inBox = (bi: number, bj: number) => i >= bi && i < bi + 7 && j >= bj && j < bj + 7
    return inBox(0, 0) || inBox(0, N - 7) || inBox(N - 7, 0)
  }
  const finderFill = (i: number, j: number) => {
    const local = (bi: number, bj: number) => {
      const x = i - bi, y = j - bj
      const ring = x === 0 || x === 6 || y === 0 || y === 6
      const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
      return ring || core
    }
    if (i < 7 && j < 7) return local(0, 0)
    if (i < 7 && j >= N - 7) return local(0, N - 7)
    if (i >= N - 7 && j < 7) return local(N - 7, 0)
    return false
  }
  const m = size / N
  const rects: ReactNode[] = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const on = isFinder(i, j) ? finderFill(i, j) : cell(i, j)
      if (on) rects.push(<rect key={`${i}-${j}`} x={j * m} y={i * m} width={m} height={m} fill="#000" />)
    }
  }
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 14, width: 'fit-content' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
        {rects}
      </svg>
    </div>
  )
}

/* ── toggle switch + labelled row ───────────────────────────────────────── */
export function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={on}
      style={{ width: 42, height: 24, borderRadius: 9999, border: 'none', cursor: 'pointer', background: on ? 'var(--c-green)' : 'var(--c-border-alt)', position: 'relative', transition: 'background .15s', flex: '0 0 auto' }}
    >
      <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
    </button>
  )
}
export function ToggleRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 14px' }}>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--c-text-dim)' }}>{label}</span>
      <Switch on={on} onToggle={onToggle} />
    </div>
  )
}

/* ── search input ───────────────────────────────────────────────────────── */
export function SearchField({ placeholder = 'Search' }: { placeholder?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '0 12px', height: 42 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-faint)" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        placeholder={placeholder}
        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'var(--f-body)', fontSize: 14 }}
      />
    </div>
  )
}

/* ── label above a field ────────────────────────────────────────────────── */
export function FieldLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--c-text-muted)', marginBottom: 8 }}>{children}</div>
}

/* ── select-style field (coin / network picker, visual only) ─────────────── */
export function SelectField({ left, value, sub }: { left?: ReactNode; value: ReactNode; sub?: ReactNode }) {
  return (
    <button
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--c-black)',
        border: '1px solid var(--c-border-alt)',
        borderRadius: 12,
        padding: '0 14px',
        height: 56,
        cursor: 'pointer',
        color: '#fff',
        fontFamily: 'var(--f-body)',
      }}
    >
      {left}
      <span style={{ flex: 1, textAlign: 'left', fontSize: 15, fontWeight: 600 }}>{value}</span>
      {sub && <span style={{ fontSize: 14, color: 'var(--c-text-dim)' }}>{sub}</span>}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
    </button>
  )
}

/* ── address field with copy ────────────────────────────────────────────── */
export function AddressField({ address }: { address: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-black)', border: '1px solid var(--c-border-alt)', borderRadius: 12, padding: '0 8px 0 14px', height: 56 }}>
      <span style={{ flex: 1, minWidth: 0, fontFamily: 'monospace', fontSize: 14, color: 'var(--c-text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{address}</span>
      <button
        onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400) }}
        className="brighten"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 12px', background: copied ? 'var(--c-green)' : 'var(--c-panel-alt)', color: copied ? '#000' : '#fff', border: '1px solid var(--c-border-alt)', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--f-body)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

/* ── network warning callout ────────────────────────────────────────────── */
export function NetworkWarning({ network }: { network: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, background: 'rgba(207,100,13,.12)', border: '1px solid rgba(207,100,13,.4)', borderRadius: 11, padding: '11px 13px' }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--c-orange)" strokeWidth={2} style={{ flex: '0 0 auto', marginTop: 1 }}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.5" /></svg>
      <span style={{ fontSize: 12.5, color: 'var(--c-orange)', lineHeight: 1.45 }}>
        Only send <b>{network}</b> network deposits to this address. Other networks will be lost.
      </span>
    </div>
  )
}

/* ── deposit / withdraw segmented tabs ──────────────────────────────────── */
export type TopUpTab = 'deposit' | 'withdraw'
export function DepositWithdrawTabs({ tab, onTab, underline }: { tab: TopUpTab; onTab: (t: TopUpTab) => void; underline?: boolean }) {
  const items: [TopUpTab, string][] = [['deposit', 'Deposit'], ['withdraw', 'Withdraw']]
  if (underline) {
    return (
      <div style={{ display: 'flex' }}>
        {items.map(([k, l]) => {
          const active = tab === k
          return (
            <button key={k} onClick={() => onTab(k)} style={{ ...DISPLAY, flex: 1, background: 'none', border: 'none', borderBottom: `2px solid ${active ? 'var(--c-green)' : 'var(--c-border)'}`, padding: '0 0 12px', fontSize: 16, fontWeight: 900, cursor: 'pointer', color: active ? '#fff' : 'var(--c-text-faint)' }}>{l}</button>
          )
        })}
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', gap: 4, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 4 }}>
      {items.map(([k, l]) => {
        const active = tab === k
        return (
          <button key={k} onClick={() => onTab(k)} style={{ ...DISPLAY, flex: 1, border: 'none', borderRadius: 9, padding: '10px 0', fontSize: 14, fontWeight: 900, cursor: 'pointer', background: active ? 'var(--c-green)' : 'transparent', color: active ? '#000' : 'var(--c-text-muted)' }}>{l}</button>
        )
      })}
    </div>
  )
}

/* ── green / ghost buttons ──────────────────────────────────────────────── */
export function GreenBtn({ children, full = true, sm, onClick }: { children: ReactNode; full?: boolean; sm?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="brighten" style={{ ...DISPLAY, width: full ? '100%' : undefined, height: sm ? 40 : 50, padding: '0 18px', background: 'var(--c-green)', color: '#000', border: 'none', borderRadius: 11, fontWeight: 900, fontSize: sm ? 13 : 15, cursor: 'pointer', boxShadow: 'var(--glow-green)' }}>{children}</button>
  )
}

import { useState, type CSSProperties } from 'react'
import { asset } from '../../lib/assets'
import { profile } from '../../data/profile'
import { DiscordIcon, XIcon } from '../auth/brandIcons'

/* upward-trending series per period (mock) */
const SERIES: Record<string, { pct: string; profit: string; data: number[] }> = {
  '24H': { pct: '+18.4%', profit: '+$420.00', data: [10, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19, 21] },
  '7D': { pct: '+62.1%', profit: '+$1,480.00', data: [10, 12, 11, 15, 14, 18, 22, 20, 26, 30, 28, 34] },
  '30D': { pct: '+142.5%', profit: '+$3,240.00', data: [8, 10, 9, 14, 13, 20, 18, 27, 24, 35, 40, 38, 48, 55] },
  All: { pct: '+318.0%', profit: '+$7,110.00', data: [5, 8, 6, 12, 18, 15, 26, 34, 30, 48, 44, 62, 70, 66, 84, 96] },
}
const PERIODS = ['24H', '7D', '30D', 'All']

function AreaChart({ data }: { data: number[] }) {
  const w = 640, h = 200
  const min = Math.min(...data), max = Math.max(...data)
  const nx = (i: number) => (i / (data.length - 1)) * w
  const ny = (v: number) => h - ((v - min) / (max - min || 1)) * (h * 0.84) - h * 0.08
  const pts = data.map((v, i) => [nx(i), ny(v)] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`
  const [ex, ey] = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 116, display: 'block' }}>
      <defs>
        <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,255,0,.4)" />
          <stop offset="100%" stopColor="rgba(0,255,0,0)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#pnlFill)" />
      <path d={line} fill="none" stroke="var(--c-green)" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={ex} cy={ey} r={4} fill="#000" stroke="var(--c-green)" strokeWidth={3} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function ShareBtn({ children, onClick, brand }: { children: React.ReactNode; onClick?: () => void; brand?: string }) {
  return (
    <button
      onClick={onClick}
      className="brighten"
      style={{
        flex: 1,
        minWidth: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 42,
        padding: '0 14px',
        borderRadius: 10,
        cursor: 'pointer',
        fontFamily: 'var(--f-body)',
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: 'nowrap',
        background: brand ?? 'var(--c-panel-alt)',
        color: brand ? '#fff' : '#fff',
        border: brand ? 'none' : '1px solid var(--c-border-alt)',
      }}
    >
      {children}
    </button>
  )
}

/** Shareable P&L card — the screenshot-ready artifact plus share CTAs. */
export function PnlCard({ isDesktop }: { isDesktop: boolean }) {
  const [period, setPeriod] = useState('30D')
  const [copied, setCopied] = useState(false)
  const s = SERIES[period]

  const periodPill = (p: string): CSSProperties => ({
    border: 'none',
    borderRadius: 8,
    padding: '5px 11px',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--f-body)',
    background: period === p ? 'var(--c-green)' : 'rgba(255,255,255,.06)',
    color: period === p ? '#000' : 'var(--c-text-muted)',
  })

  return (
    <section style={{ background: 'var(--c-panel)', border: '1px solid var(--c-border)', borderRadius: 16, padding: isDesktop ? 20 : 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--f-display)', textTransform: 'uppercase', letterSpacing: '.02em', fontWeight: 900, fontSize: 15 }}>Share your P&amp;L</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map((p) => <button key={p} onClick={() => setPeriod(p)} style={periodPill(p)}>{p}</button>)}
        </div>
      </div>

      {/* ── the shareable artifact ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 16,
          padding: isDesktop ? '22px 24px' : '18px 18px',
          background: 'radial-gradient(120% 140% at 85% -10%, rgba(0,255,0,.28), transparent 55%), linear-gradient(160deg,#0c1a0c 0%,#0a0a0d 60%)',
          border: '1px solid rgba(0,255,0,.25)',
          boxShadow: 'inset 0 0 60px rgba(0,255,0,.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <img src={asset('WTF_games.png')} alt="WTF Games" style={{ height: 32, width: 'auto' }} />
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 900, color: 'var(--c-green)', border: '1px solid rgba(0,255,0,.4)', background: 'rgba(0,255,0,.12)', borderRadius: 9999, padding: '4px 11px', textTransform: 'uppercase', letterSpacing: '.08em' }}>
            {period} P&amp;L
          </span>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Profit / Loss</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 40, lineHeight: 1, color: 'var(--c-green)', textShadow: '0 0 26px rgba(0,255,0,.45)' }}>{s.pct}</span>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 17, color: '#fff' }}>{s.profit}</span>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <AreaChart data={s.data} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>@{profile.username}</span>
          <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>wtfgames.com</span>
        </div>
      </div>

      {/* ── share CTAs ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
        <ShareBtn brand="#000">
          <XIcon size={16} /> Share on X
        </ShareBtn>
        <ShareBtn brand="#5865F2">
          <DiscordIcon size={18} /> Discord
        </ShareBtn>
        <ShareBtn onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400) }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          {copied ? 'Copied!' : 'Copy image'}
        </ShareBtn>
        <ShareBtn>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
          Download
        </ShareBtn>
      </div>
    </section>
  )
}

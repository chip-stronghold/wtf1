import type { CSSProperties, ReactNode } from 'react'
import { profile } from '../../data/profile'

/* ── shared tokens ──────────────────────────────────────────────────────── */
export const DISPLAY: CSSProperties = { fontFamily: 'var(--f-display)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.02em' }
export const cardBase: CSSProperties = {
  background: 'var(--c-panel)',
  border: '1px solid var(--c-border)',
  borderRadius: 16,
}

/* ── avatar (initials, neon ring) ───────────────────────────────────────── */
export function Avatar({ size = 76, ring = true }: { size?: number; ring?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: '0 0 auto',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(120% 120% at 30% 20%, #1d4a1d 0%, #0e0e12 70%)',
        border: ring ? '2px solid var(--c-green)' : '1px solid var(--c-border-alt)',
        boxShadow: ring ? '0 0 18px rgba(0,255,0,.35)' : 'none',
        ...DISPLAY,
        fontWeight: 900,
        fontSize: Math.round(size * 0.38),
        color: '#fff',
      }}
    >
      {profile.initials}
    </div>
  )
}

/* ── card shell ─────────────────────────────────────────────────────────── */
export function Card({ title, action, children, pad = 20, style }: { title?: ReactNode; action?: ReactNode; children: ReactNode; pad?: number; style?: CSSProperties }) {
  return (
    <section style={{ ...cardBase, padding: pad, ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16 }}>
          <h3 style={{ margin: 0, ...DISPLAY, fontWeight: 900, fontSize: 15 }}>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

/* ── small buttons ──────────────────────────────────────────────────────── */
export function GreenButton({ children, full, sm }: { children: ReactNode; full?: boolean; sm?: boolean }) {
  return (
    <button
      className="brighten"
      style={{
        ...DISPLAY,
        width: full ? '100%' : undefined,
        height: sm ? 36 : 44,
        padding: '0 18px',
        background: 'var(--c-green)',
        color: '#000',
        border: 'none',
        borderRadius: 10,
        fontWeight: 900,
        fontSize: sm ? 12.5 : 14,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
export function GhostButton({ children, sm }: { children: ReactNode; sm?: boolean }) {
  return (
    <button
      className="brighten"
      style={{
        fontFamily: 'var(--f-body)',
        height: sm ? 32 : 38,
        padding: '0 14px',
        background: 'transparent',
        color: 'var(--c-text-dim)',
        border: '1px solid var(--c-border-alt)',
        borderRadius: 9,
        fontWeight: 600,
        fontSize: sm ? 12 : 13,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

/* ── detail row (label / value) ─────────────────────────────────────────── */
export function Row({ label, value, last }: { label: string; value: ReactNode; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '11px 0', borderBottom: last ? 'none' : '1px solid var(--c-border)' }}>
      <span style={{ color: 'var(--c-text-muted)', fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

/* ── status chip ────────────────────────────────────────────────────────── */
type Status = 'verified' | 'requested' | 'pending'
const STATUS: Record<Status, { label: string; c: string; bg: string }> = {
  verified: { label: 'Verified', c: '#00ff00', bg: 'rgba(0,255,0,.13)' },
  requested: { label: 'Action needed', c: '#ffb020', bg: 'rgba(255,176,32,.14)' },
  pending: { label: 'Not started', c: '#9a9aa3', bg: 'rgba(255,255,255,.06)' },
}
export function Chip({ status }: { status: Status }) {
  const s = STATUS[status]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: s.bg, color: s.c, borderRadius: 9999, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.c }} />
      {s.label}
    </span>
  )
}




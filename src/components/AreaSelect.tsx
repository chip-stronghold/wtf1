import { useState, type CSSProperties } from 'react'
import { REVIEW_AREAS, type ReviewScreen } from '../config'

const trigger: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 9,
  height: 36,
  padding: '0 12px',
  background: '#000',
  border: '1px solid var(--c-border)',
  borderRadius: 9999,
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const menu: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  zIndex: 100000,
  minWidth: 232,
  background: '#0e0e12',
  border: '1px solid var(--c-border)',
  borderRadius: 12,
  padding: 6,
  boxShadow: '0 16px 40px rgba(0,0,0,.5)',
}

function item(active: boolean): CSSProperties {
  return {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: active ? 'rgba(0,255,0,.09)' : 'transparent',
    border: 'none',
    borderRadius: 8,
    padding: '9px 10px',
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'inherit',
  }
}

/**
 * Area switcher for the review harness control bars. Swaps between the parts of
 * the site we're iterating on (lobby, auth, …) — driven by REVIEW_AREAS so new
 * areas show up here automatically.
 */
export function AreaSelect({ screen, onScreen }: { screen: ReviewScreen; onScreen: (s: ReviewScreen) => void }) {
  const [open, setOpen] = useState(false)
  const current = REVIEW_AREAS.find((a) => a.id === screen) ?? REVIEW_AREAS[0]

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen((o) => !o)} style={trigger} aria-haspopup="listbox" aria-expanded={open}>
        <span style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--c-text-faint)' }}>Area</span>
        <span style={{ fontSize: 12.5, fontWeight: 700 }}>{current.label}</span>
        <span style={{ fontSize: 9, color: 'var(--c-text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .12s' }}>▼</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99999 }} />
          <div style={menu} role="listbox">
            {REVIEW_AREAS.map((a) => {
              const active = a.id === screen
              return (
                <button
                  key={a.id}
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onScreen(a.id)
                    setOpen(false)
                  }}
                  style={item(active)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: active ? 'var(--c-green)' : 'var(--c-border-alt)' }} />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{a.label}</span>
                  </span>
                  <span style={{ display: 'block', fontSize: 10.5, color: 'var(--c-text-faint)', marginTop: 3, marginLeft: 15 }}>{a.desc}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

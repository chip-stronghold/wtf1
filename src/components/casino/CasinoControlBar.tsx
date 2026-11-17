import { useState, type CSSProperties } from 'react'
import type { ReviewScreen } from '../../config'
import { AreaSelect } from '../AreaSelect'
import type { CasinoState } from './CasinoPage'
import type { Concept } from './CasinoShell'

export const CASINO_CONCEPTS: { n: Concept; label: string; desc: string }[] = [
  { n: 1, label: '01 · The Shelf', desc: 'Clean casino rails · Studios band · sidebar / tab bar' },
  { n: 2, label: '02 · The Arcade', desc: 'Studios key-art marquee · bento tiles · mode strip nav' },
  { n: 3, label: '03 · The Feed', desc: 'Channels + vertical feed · poster cards · swipe trainer' },
]

/** The concept AJ picks for dev (PICK badge). null until chosen. */
export const CASINO_PICK: Concept | null = null

const pillRow: CSSProperties = { display: 'flex', gap: 4, alignItems: 'center', background: '#000', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 4 }
const groupLabel: CSSProperties = { fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--c-text-faint)', padding: '0 4px 0 8px' }

function pill(active: boolean, activeBg: string, activeColor: string): CSSProperties {
  return {
    border: 'none',
    borderRadius: 9999,
    padding: '6px 12px',
    fontSize: 11.5,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all .12s',
    background: active ? activeBg : 'transparent',
    color: active ? activeColor : 'var(--c-text-faint)',
    whiteSpace: 'nowrap',
  }
}

interface Props {
  screen: ReviewScreen
  onScreen: (s: ReviewScreen) => void
  state: CasinoState
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  desktopWidth: 1440 | 2560 | 3440
  onDesktopWidth: (w: 1440 | 2560 | 3440) => void
}

/** Review controller for the casino lobby concepts — mirrors the other control bars. */
export function CasinoControlBar({ screen, onScreen, state, isDesktop, onView, desktopWidth, onDesktopWidth }: Props) {
  const [open, setOpen] = useState(true)
  const [statesOpen, setStatesOpen] = useState(false)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...pill(true, 'var(--c-panel-alt)', '#fff'), border: '1px solid var(--c-border)' }}>
        ⚙ Review controls
      </button>
    )
  }

  const toggles: { label: string; on: boolean; set: (b: boolean) => void; hint: string }[] = [
    { label: 'Preview shelf (optional)', on: state.preview, set: state.setPreview, hint: 'WTF Studios clip shelf — posters only, no footage yet' },
    { label: 'Loading', on: state.loading, set: state.setLoading, hint: 'Skeletons while the catalogue loads' },
    { label: 'Live tables unavailable', on: state.unavailable, set: state.setUnavailable, hint: 'Empty / unavailable content state' },
    { label: 'Tomorrow (daily refresh)', on: state.day === 1, set: (b) => state.setDay(b ? 1 : 0), hint: "Shows the next day's six — no countdown" },
  ]

  return (
    <div style={{ width: '100%', maxWidth: 1180, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1 }}>Casino lobby — brief</div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>3 directions · mobile-first · no hero video</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <AreaSelect screen={screen} onScreen={onScreen} />
          <div style={pillRow}>
            <button onClick={() => onView('mobile')} style={pill(!isDesktop, 'var(--c-green)', '#000')}>Mobile</button>
            <button onClick={() => onView('desktop')} style={pill(isDesktop, 'var(--c-green)', '#000')}>Desktop</button>
          </div>
          {isDesktop && (
            <div style={pillRow} title="Preview desktop at this screen width">
              {([1440, 2560, 3440] as const).map((w) => (
                <button key={w} onClick={() => onDesktopWidth(w)} style={pill(desktopWidth === w, 'var(--c-green)', '#000')}>{w}</button>
              ))}
            </div>
          )}
          <div style={pillRow} title="First visit = logged out, no history. Returning = logged in with recently played.">
            <span style={groupLabel}>Visit</span>
            <button onClick={() => state.setVisit('first')} style={pill(state.visit === 'first', '#fff', '#000')}>First</button>
            <button onClick={() => state.setVisit('returning')} style={pill(state.visit === 'returning', '#fff', '#000')}>Returning</button>
          </div>
          <div style={pillRow} title="Interest pills selected or not">
            <span style={groupLabel}>Interests</span>
            <button onClick={() => state.setInterests([])} style={pill(state.interests.length === 0, 'var(--c-text-muted)', '#000')}>None</button>
            <button onClick={() => state.setInterests(['shows', 'quick'])} style={pill(state.interests.length > 0, 'var(--c-magenta)', '#000')}>Picked</button>
          </div>
          <div style={pillRow} title="Overlays">
            <span style={groupLabel}>Open</span>
            <button onClick={() => state.setOverlay(state.overlay === 'prefs' ? 'none' : 'prefs')} style={pill(state.overlay === 'prefs', 'var(--c-cyan)', '#000')}>Prefs</button>
            <button onClick={() => state.setOverlay(state.overlay === 'swipe' ? 'none' : 'swipe')} style={pill(state.overlay === 'swipe', 'var(--c-cyan)', '#000')}>Swipe</button>
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setStatesOpen((o) => !o)} style={{ ...pill(true, '#000', '#fff'), border: '1px solid var(--c-border)', padding: '8px 12px' }}>
              States {toggles.some((t) => t.on) ? `· ${toggles.filter((t) => t.on).length}` : ''} ▾
            </button>
            {statesOpen && (
              <>
                <div onClick={() => setStatesOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99999 }} />
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100000, minWidth: 260, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 12, padding: 6, boxShadow: '0 16px 40px rgba(0,0,0,.5)' }}>
                  {toggles.map((t) => (
                    <button key={t.label} onClick={() => t.set(!t.on)} style={{ display: 'block', width: '100%', textAlign: 'left', background: t.on ? 'rgba(0,255,0,.09)' : 'transparent', border: 'none', borderRadius: 8, padding: '9px 10px', cursor: 'pointer', color: '#fff', fontFamily: 'inherit' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.on ? 'var(--c-green)' : 'var(--c-border-alt)' }} />
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</span>
                      </span>
                      <span style={{ display: 'block', fontSize: 10.5, color: 'var(--c-text-faint)', marginTop: 3, marginLeft: 15 }}>{t.hint}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button onClick={() => setOpen(false)} title="Hide controls" style={{ background: 'transparent', border: '1px solid var(--c-border)', borderRadius: 9999, width: 28, height: 28, color: 'var(--c-text-muted)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>×</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        {CASINO_CONCEPTS.map((c) => {
          const active = state.concept === c.n
          const isFinal = c.n === CASINO_PICK
          return (
            <button
              key={c.n}
              onClick={() => state.setConcept(c.n)}
              style={{ position: 'relative', flex: 1, minWidth: 160, background: isFinal ? 'rgba(0,255,0,.06)' : '#000', border: `1px solid ${isFinal ? 'rgba(0,255,0,.5)' : 'var(--c-border)'}`, borderRadius: 10, padding: '11px 12px 13px', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.03em', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span>{c.label}</span>
                {isFinal && <span style={{ flex: '0 0 auto', font: '700 8.5px/1 var(--f-body)', letterSpacing: '.08em', color: '#000', background: 'var(--c-green)', borderRadius: 9999, padding: '3px 7px' }}>PICK</span>}
              </div>
              <div style={{ font: '400 10px/1.2 var(--f-body)', textTransform: 'none', letterSpacing: 0, color: 'var(--c-text-faint)', marginTop: 3 }}>{c.desc}</div>
              {active && <div style={{ position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, background: 'var(--c-green)', borderRadius: 2 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useState, type CSSProperties } from 'react'
import { SHIPPED_HERO, type HeroConcept, type ReviewScreen } from '../config'
import { AreaSelect } from './AreaSelect'

const CONCEPTS: { n: HeroConcept; label: string; desc: string }[] = [
  { n: 1, label: '01 · D Tile', desc: 'Video is a tile in the banner rail' },
  { n: 2, label: '02 · D Swipe', desc: 'Video behind · banners swipe over · copy fades' },
]

const pillRow: CSSProperties = {
  display: 'flex',
  gap: 6,
  background: '#000',
  border: '1px solid var(--c-border)',
  borderRadius: 9999,
  padding: 4,
}

function pill(active: boolean, activeBg: string, activeColor: string): CSSProperties {
  return {
    border: 'none',
    borderRadius: 9999,
    padding: '6px 13px',
    fontSize: 11.5,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all .12s',
    background: active ? activeBg : 'transparent',
    color: active ? activeColor : 'var(--c-text-faint)',
  }
}

interface ControlBarProps {
  hero: HeroConcept
  onHero: (h: HeroConcept) => void
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  live: boolean
  onLive: (b: boolean) => void
  screen: ReviewScreen
  onScreen: (s: ReviewScreen) => void
  desktopWidth: 1440 | 2560 | 3440
  onDesktopWidth: (w: 1440 | 2560 | 3440) => void
}

/**
 * Design-review controller (ported from the handoff harness): swap hero concept,
 * device layout, and live/offline state. Gated behind SHOW_CONTROLS / ?controls=
 * so it can be turned off for the clean production build.
 */
export function ControlBar({ hero, onHero, isDesktop, onView, live, onLive, screen, onScreen, desktopWidth, onDesktopWidth }: ControlBarProps) {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...pill(true, 'var(--c-panel-alt)', '#fff'), border: '1px solid var(--c-border)' }}>
        ⚙ Review controls
      </button>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 820,
        background: '#0e0e12',
        border: '1px solid var(--c-border)',
        borderRadius: 16,
        padding: '14px 16px',
        boxShadow: '0 10px 30px rgba(0,0,0,.4)',
      }}
    >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1 }}>
              WTF Live — Lobby Concepts
            </div>
            <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>
              Desktop = Cinematic D · mobile treatments of video + banners · toggle device &amp; show state
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <AreaSelect screen={screen} onScreen={onScreen} />
            <div style={pillRow}>
              <button onClick={() => onView('mobile')} style={pill(!isDesktop, 'var(--c-green)', '#000')}>
                Mobile
              </button>
              <button onClick={() => onView('desktop')} style={pill(isDesktop, 'var(--c-green)', '#000')}>
                Desktop
              </button>
            </div>
            {isDesktop && (
              <div style={pillRow} title="Preview desktop at this screen width">
                {([1440, 2560, 3440] as const).map((w) => (
                  <button key={w} onClick={() => onDesktopWidth(w)} style={pill(desktopWidth === w, 'var(--c-green)', '#000')}>
                    {w}
                  </button>
                ))}
              </div>
            )}
            <div style={pillRow}>
              <button onClick={() => onLive(false)} style={pill(!live, 'var(--c-text-muted)', '#000')}>
                ● Offline
              </button>
              <button onClick={() => onLive(true)} style={pill(live, 'var(--c-red)', '#fff')}>
                ● Live now
              </button>
            </div>
            <button
              onClick={() => setOpen(false)}
              title="Hide controls"
              style={{
                background: 'transparent',
                border: '1px solid var(--c-border)',
                borderRadius: 9999,
                width: 28,
                height: 28,
                color: 'var(--c-text-muted)',
                cursor: 'pointer',
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {CONCEPTS.map((c) => {
            const active = hero === c.n
            const isFinal = c.n === SHIPPED_HERO
            return (
              <button
                key={c.n}
                onClick={() => onHero(c.n)}
                style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: 120,
                  background: isFinal ? 'rgba(0,255,0,.06)' : '#000',
                  border: `1px solid ${isFinal ? 'rgba(0,255,0,.5)' : 'var(--c-border)'}`,
                  borderRadius: 10,
                  padding: '11px 12px 13px',
                  color: '#fff',
                  fontFamily: 'var(--f-display)',
                  fontWeight: 900,
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '.03em',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span>{c.label}</span>
                  {isFinal && (
                    <span
                      style={{
                        flex: '0 0 auto',
                        font: '700 8.5px/1 var(--f-body)',
                        letterSpacing: '.08em',
                        color: '#000',
                        background: 'var(--c-green)',
                        borderRadius: 9999,
                        padding: '3px 7px',
                      }}
                    >
                      PICK
                    </span>
                  )}
                </div>
                <div style={{ font: "400 10px/1.2 var(--f-body)", textTransform: 'none', letterSpacing: 0, color: 'var(--c-text-faint)', marginTop: 3 }}>
                  {c.desc}
                </div>
                {active && (
                  <div style={{ position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, background: 'var(--c-green)', borderRadius: 2 }} />
                )}
              </button>
            )
          })}
        </div>
    </div>
  )
}

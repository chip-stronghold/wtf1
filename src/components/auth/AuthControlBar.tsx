import { useState, type CSSProperties } from 'react'
import type { AuthVersion, ReviewScreen } from '../../config'
import { AreaSelect } from '../AreaSelect'
import type { AuthTab } from './AuthModal'

const VERSIONS: { n: AuthVersion; label: string; desc: string }[] = [
  { n: 1, label: '01 · Stacked', desc: 'Segmented tabs · solid brand buttons' },
  { n: 2, label: '02 · Split', desc: 'Underline tabs · Google + tinted row' },
  { n: 3, label: '03 · One-tap', desc: 'Pill tabs · 3 icon buttons in a row' },
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

interface AuthControlBarProps {
  screen: ReviewScreen
  onScreen: (s: ReviewScreen) => void
  version: AuthVersion
  onVersion: (v: AuthVersion) => void
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  tab: AuthTab
  onTab: (t: AuthTab) => void
}

/** Review controller for the login/sign-up modal — mirrors the lobby ControlBar. */
export function AuthControlBar({ screen, onScreen, version, onVersion, isDesktop, onView, tab, onTab }: AuthControlBarProps) {
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
            Login / Sign-up — Modal Concepts
          </div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>
            Social-first redesign over the Cinematic&nbsp;D lobby · toggle device &amp; tab
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
          <div style={pillRow}>
            <button onClick={() => onTab('signup')} style={pill(tab === 'signup', '#fff', '#000')}>
              Sign Up
            </button>
            <button onClick={() => onTab('login')} style={pill(tab === 'login', '#fff', '#000')}>
              Login
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
        {VERSIONS.map((v) => {
          const active = version === v.n
          return (
            <button
              key={v.n}
              onClick={() => onVersion(v.n)}
              style={{
                position: 'relative',
                flex: 1,
                minWidth: 150,
                background: '#000',
                border: '1px solid var(--c-border)',
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
              {v.label}
              <div style={{ font: '400 10px/1.2 var(--f-body)', textTransform: 'none', letterSpacing: 0, color: 'var(--c-text-faint)', marginTop: 3 }}>
                {v.desc}
              </div>
              {active && <div style={{ position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, background: 'var(--c-green)', borderRadius: 2 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

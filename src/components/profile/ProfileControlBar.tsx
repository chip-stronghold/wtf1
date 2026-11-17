import { useState, type CSSProperties } from 'react'
import type { ProfileVersion, ReviewScreen } from '../../config'
import { AreaSelect } from '../AreaSelect'

const VERSIONS: { n: ProfileVersion; label: string; desc: string }[] = [
  { n: 1, label: '01 · MVP strip', desc: 'Keep 3 tabs · add "Your numbers" card' },
  { n: 2, label: '02 · Stats hub', desc: 'Stats-first · 4-tab sub-nav' },
  { n: 3, label: '03 · Ledger', desc: 'Money in / out · one activity feed' },
  { n: 4, label: '04 · Share-first', desc: 'Poster carousel is the hero' },
  { n: 5, label: '05 · Dashboard', desc: 'Earlier · stat tiles + card grid' },
  { n: 6, label: '06 · Account nav', desc: 'Earlier · Shuffle-style sub-nav' },
  { n: 7, label: '07 · Cover', desc: 'Earlier · Kick-style banner' },
]

const pillRow: CSSProperties = { display: 'flex', gap: 6, background: '#000', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 4 }

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

interface Props {
  screen: ReviewScreen
  onScreen: (s: ReviewScreen) => void
  version: ProfileVersion
  onVersion: (v: ProfileVersion) => void
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  pnlUp: boolean
  onPnlUp: (b: boolean) => void
}

/** Review controller for the profile / account page — mirrors the other control bars. */
export function ProfileControlBar({ screen, onScreen, version, onVersion, isDesktop, onView, pnlUp, onPnlUp }: Props) {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...pill(true, 'var(--c-panel-alt)', '#fff'), border: '1px solid var(--c-border)' }}>
        ⚙ Review controls
      </button>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 1040, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1 }}>
            Account — P&amp;L, rewards &amp; VIP
          </div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>
            Production data points + the new stats module · mobile first
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <AreaSelect screen={screen} onScreen={onScreen} />
          <div style={pillRow}>
            <button onClick={() => onView('mobile')} style={pill(!isDesktop, 'var(--c-green)', '#000')}>Mobile</button>
            <button onClick={() => onView('desktop')} style={pill(isDesktop, 'var(--c-green)', '#000')}>Desktop</button>
          </div>
          <div style={pillRow} title="Show the P&L module in profit or loss">
            <button onClick={() => onPnlUp(true)} style={pill(pnlUp, 'var(--c-green)', '#000')}>▲ Up</button>
            <button onClick={() => onPnlUp(false)} style={pill(!pnlUp, '#ff4d4d', '#fff')}>▼ Down</button>
          </div>
          <button
            onClick={() => setOpen(false)}
            title="Hide controls"
            style={{ background: 'transparent', border: '1px solid var(--c-border)', borderRadius: 9999, width: 28, height: 28, color: 'var(--c-text-muted)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
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
              style={{ position: 'relative', flex: 1, minWidth: 92, background: '#000', border: '1px solid var(--c-border)', borderRadius: 10, padding: '11px 12px 13px', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.03em', cursor: 'pointer', textAlign: 'left' }}
            >
              {v.label}
              <div style={{ font: '400 10px/1.2 var(--f-body)', textTransform: 'none', letterSpacing: 0, color: 'var(--c-text-faint)', marginTop: 3 }}>{v.desc}</div>
              {active && <div style={{ position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, background: 'var(--c-green)', borderRadius: 2 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

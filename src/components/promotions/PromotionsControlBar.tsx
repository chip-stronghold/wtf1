import { useState, type CSSProperties } from 'react'
import type { PromotionsVersion, ReviewScreen } from '../../config'
import { AreaSelect } from '../AreaSelect'

const VERSIONS: { n: PromotionsVersion; label: string; desc: string }[] = [
  { n: 1, label: '01 · Banner stack', desc: 'Hero + image banners only · zero extra CMS' },
  { n: 2, label: '02 · Today rails', desc: 'Image rails · today / this week / always on' },
  { n: 3, label: '03 · Bento', desc: 'Size = hierarchy · big featured + square tiles' },
  { n: 4, label: '04 · Landing hybrid', desc: 'Offers + USP · vs-casinos & how-to-earn' },
  { n: 5, label: '05 · Figma board', desc: 'Fixed-height cards + USP advert slots + raffle countdown' },
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
  version: PromotionsVersion
  onVersion: (v: PromotionsVersion) => void
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  live: boolean
  onLive: (l: boolean | null) => void
}

/** Review controller for the promotions page — mirrors the other control bars. */
export function PromotionsControlBar({ screen, onScreen, version, onVersion, isDesktop, onView, live, onLive }: Props) {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...pill(true, 'var(--c-panel-alt)', '#fff'), border: '1px solid var(--c-border)' }}>
        ⚙ Review controls
      </button>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 820, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1 }}>
            Promotions — Page Concepts
          </div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>
            Offers hub for the sidebar's Promotions tab · toggle device / show state
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <AreaSelect screen={screen} onScreen={onScreen} />
          <div style={pillRow}>
            <button onClick={() => onView('mobile')} style={pill(!isDesktop, 'var(--c-green)', '#000')}>Mobile</button>
            <button onClick={() => onView('desktop')} style={pill(isDesktop, 'var(--c-green)', '#000')}>Desktop</button>
          </div>
          <div style={pillRow}>
            <button onClick={() => onLive(null)} style={pill(!live, 'var(--c-panel-alt)', '#fff')}>Offline</button>
            <button onClick={() => onLive(true)} style={pill(live, 'var(--c-red)', '#fff')}>Live</button>
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
              style={{ position: 'relative', flex: 1, minWidth: 150, background: '#000', border: '1px solid var(--c-border)', borderRadius: 10, padding: '11px 12px 13px', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.03em', cursor: 'pointer', textAlign: 'left' }}
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

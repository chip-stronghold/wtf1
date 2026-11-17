import { useState, type CSSProperties } from 'react'
import { PALETTES, SKIN_PICK, skinToCss, type SkinId } from '../../data/skins'
import { PAGES, type ModalId, type PageId } from '../../data/pages'

const pillRow: CSSProperties = { display: 'flex', gap: 4, alignItems: 'center', background: '#000', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 4 }

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
  skin: SkinId
  onSkin: (s: SkinId) => void
  page: PageId
  onPage: (p: PageId) => void
  modal: ModalId
  onModal: (m: ModalId) => void
  sheet: boolean
  onSheet: (b: boolean) => void
  isDesktop: boolean
  onView: (v: 'mobile' | 'desktop') => void
  desktopWidth: 1440 | 2560 | 3440
  onDesktopWidth: (w: 1440 | 2560 | 3440) => void
}

/** Review controller for the skin-token directions. */
export function TokensControlBar({ skin, onSkin, page, onPage, modal, onModal, sheet, onSheet, isDesktop, onView, desktopWidth, onDesktopWidth }: Props) {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const current = PAGES.find((p) => p.id === page)!

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...pill(true, 'var(--c-panel-alt)', '#fff'), border: '1px solid var(--c-border)' }}>
        ⚙ Review controls
      </button>
    )
  }

  const copyCss = () => {
    navigator.clipboard?.writeText(skinToCss(skin)).catch(() => undefined)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ width: '100%', maxWidth: 1180, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', lineHeight: 1 }}>Vegangster skin — WTF Games</div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>Their demo, page for page · Oswald · every token in their own names</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setPagesOpen((o) => !o)} style={{ ...pill(true, '#000', '#fff'), border: '1px solid var(--c-border)', padding: '8px 12px', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--c-text-faint)' }}>Page</span>
              {current.label} ▾
            </button>
            {pagesOpen && (
              <>
                <div onClick={() => setPagesOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99999 }} />
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 100000, minWidth: 300, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 12, padding: 6, boxShadow: '0 16px 40px rgba(0,0,0,.5)' }}>
                  {PAGES.map((p) => (
                    <button key={p.id} onClick={() => { onPage(p.id); setPagesOpen(false) }} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, width: '100%', textAlign: 'left', background: p.id === page ? 'rgba(0,255,0,.09)' : 'transparent', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: '#fff', fontFamily: 'inherit' }}>
                      <span style={{ fontWeight: 700, fontSize: 12.5 }}>{p.label}</span>
                      <span style={{ fontSize: 10.5, color: 'var(--c-text-faint)', fontFamily: 'ui-monospace, Menlo, monospace' }}>{p.theirs}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div style={pillRow} title="Open a dialog over the page">
            <button onClick={() => onModal(modal === 'login' ? null : 'login')} style={pill(modal === 'login', '#fff', '#000')}>Login</button>
            <button onClick={() => onModal(modal === 'signup' ? null : 'signup')} style={pill(modal === 'signup', '#fff', '#000')}>Sign up</button>
          </div>
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
          <div style={pillRow} title="Show every token of the active skin beside the device">
            <button onClick={() => onSheet(!sheet)} style={pill(sheet, 'var(--c-cyan)', '#000')}>Token sheet</button>
          </div>
          <button onClick={copyCss} title="Copy this skin as Vegangster's :root token block" style={{ ...pill(true, copied ? 'var(--c-green)' : '#000', copied ? '#000' : '#fff'), border: '1px solid var(--c-border)', padding: '8px 12px' }}>
            {copied ? 'Copied ✓' : 'Copy CSS'}
          </button>
          <a href={`https://demo.vegangster.com${current.theirs.replace('/…', '')}`} target="_blank" rel="noreferrer" style={{ ...pill(true, '#000', 'var(--c-text-muted)'), border: '1px solid var(--c-border)', padding: '8px 12px', textDecoration: 'none' }}>
            Their demo ↗
          </a>
          <button onClick={() => setOpen(false)} title="Hide controls" style={{ background: 'transparent', border: '1px solid var(--c-border)', borderRadius: 9999, width: 28, height: 28, color: 'var(--c-text-muted)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>×</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        {PALETTES.map((p) => {
          const active = skin === p.id
          const isFinal = p.id === SKIN_PICK
          return (
            <button
              key={p.id}
              onClick={() => onSkin(p.id)}
              style={{ position: 'relative', flex: 1, minWidth: 180, background: isFinal ? 'rgba(0,255,0,.06)' : '#000', border: `1px solid ${isFinal ? 'rgba(0,255,0,.5)' : 'var(--c-border)'}`, borderRadius: 10, padding: '11px 12px 13px', color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.03em', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-flex', gap: 3 }}>
                    {[p.bg, p.surface2, p.a1[500], p.a2[500], p.a3[500]].map((c, i) => (
                      <span key={i} style={{ width: 10, height: 10, borderRadius: 3, background: c, border: '1px solid rgba(255,255,255,.12)' }} />
                    ))}
                  </span>
                  {p.label}
                </span>
                {isFinal && <span style={{ flex: '0 0 auto', font: '700 8.5px/1 var(--f-body)', letterSpacing: '.08em', color: '#000', background: 'var(--c-green)', borderRadius: 9999, padding: '3px 7px' }}>PICK</span>}
              </div>
              <div style={{ font: '400 10px/1.2 var(--f-body)', textTransform: 'none', letterSpacing: 0, color: 'var(--c-text-faint)', marginTop: 3 }}>{p.desc}</div>
              {active && <div style={{ position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, background: 'var(--c-green)', borderRadius: 2 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

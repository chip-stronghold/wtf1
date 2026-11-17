import { useState } from 'react'
import { SKINS, TOKEN_GROUPS, type SkinId } from '../../data/skins'

const isColour = (v: string) => /^(#|rgb|linear-gradient)/.test(v)

/** Every token in the active skin, grouped, with a swatch. Click a row to copy its value. */
export function TokenSheet({ skin }: { skin: SkinId }) {
  const { palette, tokens } = SKINS[skin]
  const [copied, setCopied] = useState<string | null>(null)
  const entries = Object.entries(tokens)

  const copy = (k: string, v: string) => {
    navigator.clipboard?.writeText(`${k}: ${v};`).catch(() => undefined)
    setCopied(k)
    window.setTimeout(() => setCopied((c) => (c === k ? null : c)), 1200)
  }

  return (
    <aside style={{ width: 340, maxWidth: '100%', flex: '0 0 auto', background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: 16, padding: 14, maxHeight: 820, overflowY: 'auto', fontFamily: 'var(--f-body)' }}>
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 16, textTransform: 'uppercase' }}>{palette.label}</div>
      <div style={{ fontSize: 11.5, color: 'var(--c-text-muted)', margin: '3px 0 12px' }}>
        {entries.length} tokens in Vegangster's names · click a row to copy
      </div>
      {TOKEN_GROUPS.map((g) => {
        const rows = entries.filter(([k]) => g.match(k))
        if (!rows.length) return null
        return (
          <div key={g.title} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c-text-faint)', fontWeight: 700, padding: '0 2px 6px' }}>{g.title}</div>
            <div style={{ display: 'grid', gap: 2 }}>
              {rows.map(([k, v]) => {
                const short = k.replace('--token-', '').replace('brand-', '')
                return (
                  <button
                    key={k}
                    onClick={() => copy(k, v)}
                    title={`${k}: ${v}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left', background: copied === k ? 'rgba(0,255,0,.1)' : 'transparent', border: 'none', borderRadius: 7, padding: '4px 6px', cursor: 'pointer', color: '#fff', fontFamily: 'inherit' }}
                  >
                    <span style={{ width: 22, height: 22, borderRadius: 6, flex: '0 0 auto', background: isColour(v) ? v : '#1b1b20', border: '1px solid rgba(255,255,255,.1)', display: 'grid', placeItems: 'center', fontSize: 9, color: 'var(--c-text-faint)' }}>
                      {isColour(v) ? '' : 'Aa'}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 10.5, fontFamily: 'ui-monospace, Menlo, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--c-text-dim)' }}>{short}</span>
                    <span style={{ flex: '0 0 auto', maxWidth: 110, fontSize: 10, fontFamily: 'ui-monospace, Menlo, monospace', color: copied === k ? 'var(--c-green)' : 'var(--c-text-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {copied === k ? 'copied' : v}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </aside>
  )
}

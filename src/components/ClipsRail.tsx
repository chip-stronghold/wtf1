import type { Clip } from '../data/lobby'
import { sectionTitle } from './GameRail'
import { EyeIcon, PlayTriangle } from './icons'

/** WTF Clips — horizontal rail of 9:16 vertical social thumbnails. Tap → modal. */
export function ClipsRail({ clips, onOpen }: { clips: Clip[]; onOpen: (c: Clip) => void }) {
  return (
    <div style={{ padding: '20px 0 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 11,
          padding: '0 14px',
        }}
      >
        <div style={sectionTitle}>WTF Clips</div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--c-text-muted)',
            fontSize: 11.5,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Watch all ›
        </button>
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 9, overflowX: 'auto', padding: '0 14px 4px' }}>
        {clips.map((c) => (
          <div
            key={c.cap}
            className="lift"
            onClick={() => onOpen(c)}
            style={{
              flex: '0 0 112px',
              position: 'relative',
              aspectRatio: '9 / 16',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--c-border)',
              background: 'var(--c-card)',
              cursor: 'pointer',
            }}
          >
            <img
              src={c.src}
              alt={c.cap}
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,rgba(0,0,0,.12) 0%,transparent 36%,rgba(0,0,0,.78) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'rgba(0,0,0,.4)',
                border: '1px solid rgba(255,255,255,.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlayTriangle size={10} marginLeft={3} />
            </div>
            <div style={{ position: 'absolute', left: 8, right: 8, bottom: 8 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, lineHeight: 1.1 }}>{c.cap}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 5,
                  fontSize: 8.5,
                  color: 'var(--c-text-dim)',
                }}
              >
                <span style={{ opacity: 0.85 }}>{c.handle}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  <EyeIcon size={9} />
                  {c.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

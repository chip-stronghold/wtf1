import { forwardRef } from 'react'
import { episodes } from '../data/lobby'
import { sectionTitle } from './GameRail'
import { PlayTriangle } from './icons'

/** WTF Live · Past Episodes rail. Forwarded ref targets the scroll-to anchor. */
export const PastEpisodes = forwardRef<HTMLDivElement>(function PastEpisodes(_props, ref) {
  return (
    <div ref={ref} id="wtf-previous" style={{ padding: '22px 14px 0', scrollMarginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
        <div style={sectionTitle}>WTF Live · Past Episodes</div>
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 11, overflowX: 'auto', paddingBottom: 4 }}>
        {episodes.map((e) => (
          <div key={e.ep} style={{ flex: '0 0 198px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', height: 112, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--c-border)' }}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: e.bg }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: '-25%',
                    background: 'radial-gradient(circle at 35% 35%,rgba(255,255,255,.22),transparent 45%)',
                    filter: 'blur(5px)',
                    animation: 'wtfPan 17s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,.1) 1px,transparent 1.4px)',
                    backgroundSize: '3px 3px',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,.65) 100%)' }} />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,.45)',
                  border: '1px solid rgba(255,255,255,.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlayTriangle size={11} marginLeft={3} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 7,
                  right: 8,
                  background: 'rgba(0,0,0,.6)',
                  borderRadius: 5,
                  padding: '2px 6px',
                  fontSize: 9,
                  fontFamily: 'var(--f-display)',
                  fontWeight: 900,
                }}
              >
                {e.dur}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontFamily: 'var(--f-display)',
                  fontWeight: 900,
                  fontSize: 11,
                  letterSpacing: '.05em',
                  color: 'var(--c-green)',
                }}
              >
                {e.ep}
              </div>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 7, lineHeight: 1.1 }}>{e.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 10, color: 'var(--c-text-faint)' }}>
              <span>{e.date}</span>
              <span>·</span>
              <span style={{ color: 'var(--c-green)' }}>Winner: {e.winner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

import type { CSSProperties, ReactNode } from 'react'
import type { GameCover } from '../data/lobby'

export const sectionTitle: CSSProperties = {
  fontFamily: 'var(--f-display)',
  fontWeight: 900,
  fontSize: 23,
  textTransform: 'uppercase',
  lineHeight: 1,
}

const seeAll: CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--c-text-muted)',
  fontSize: 11.5,
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

export function SectionHeader({ title, link, pill }: { title: ReactNode; link?: string; pill?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={sectionTitle}>{title}</div>
        {pill}
      </div>
      {link && <button style={seeAll}>{link}</button>}
    </div>
  )
}

export function StudiosPill() {
  return (
    <span
      style={{
        background: 'var(--c-green)',
        color: '#000',
        borderRadius: 9999,
        padding: '2px 8px',
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.05em',
      }}
    >
      Studios
    </span>
  )
}

/** Horizontal rail of square (1:1) game covers — no text overlaid. */
export function GameRail({
  title,
  games,
  isDesktop,
  link,
  pill,
  paddingTop = 18,
}: {
  title: ReactNode
  games: GameCover[]
  isDesktop: boolean
  link?: string
  pill?: ReactNode
  paddingTop?: number
}) {
  const cardW = isDesktop ? 152 : 120
  const card: CSSProperties = {
    flex: `0 0 ${cardW}px`,
    width: cardW,
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid var(--c-border)',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    background: 'var(--c-card)',
  }
  // On desktop the content column (capped at 1920 on 2560/3440) can be much wider
  // than the covers, leaving a gap at the end of the rail. Repeat the covers
  // cyclically so every rail fills the full width; the rail still scrolls.
  const MIN_DESKTOP_TILES = 14
  const tiles =
    isDesktop && games.length > 0 && games.length < MIN_DESKTOP_TILES
      ? Array.from({ length: MIN_DESKTOP_TILES }, (_, i) => games[i % games.length])
      : games
  return (
    <div style={{ padding: `${paddingTop}px 14px 0` }}>
      <SectionHeader title={title} link={link} pill={pill} />
      <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {tiles.map((g, i) => (
          <div key={`${g.title}-${i}`} className="lift" style={card}>
            <img
              src={g.src}
              alt={g.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

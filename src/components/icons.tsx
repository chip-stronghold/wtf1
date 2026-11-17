/** Outline eye icon used by clip view counts. */
export function EyeIcon({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/** Notification bell, inheriting the current text colour. */
export function BellIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

/** Small triangular "play" glyph drawn with CSS borders. */
export function PlayTriangle({ size = 10, color = '#fff', marginLeft = 3 }: { size?: number; color?: string; marginLeft?: number }) {
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size}px solid ${color}`,
        borderTop: `${Math.round(size * 0.6)}px solid transparent`,
        borderBottom: `${Math.round(size * 0.6)}px solid transparent`,
        marginLeft,
      }}
    />
  )
}

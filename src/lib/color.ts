// Color helpers ported from the handoff's renderVals().

/** Multiply a #rrggbb hex toward black by amount `a` (0..1). */
export function darken(hex: string, a: number): string {
  const n = hex.replace('#', '')
  const r = Math.round(parseInt(n.slice(0, 2), 16) * (1 - a))
  const g = Math.round(parseInt(n.slice(2, 4), 16) * (1 - a))
  const b = Math.round(parseInt(n.slice(4, 6), 16) * (1 - a))
  return `rgb(${r},${g},${b})`
}

/** Animated-placeholder cover gradient for past-episode thumbs. */
export function coverGradient(c: string): string {
  return `linear-gradient(160deg, ${c} 0%, ${darken(c, 0.5)} 58%, ${darken(c, 0.78)} 100%)`
}

/** Radial avatar fill used by the "Starring" hero. */
export function avatarFill(c: string): string {
  return `radial-gradient(circle at 35% 28%, ${c}, ${darken(c, 0.6)})`
}

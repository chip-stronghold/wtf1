import type { ReactNode } from 'react'
import { useViewportWidth } from '../hooks/useViewportWidth'

/**
 * Renders children at their natural pixel size, then scales the whole thing down
 * to fit the available width (never scales up). Used to preview the desktop lobby
 * at large breakpoints (1440 / 2560 / 3440) inside the review canvas.
 */
export function ScaledFrame({
  naturalWidth,
  naturalHeight,
  children,
}: {
  naturalWidth: number
  naturalHeight: number
  children: ReactNode
}) {
  const vw = useViewportWidth()
  const available = Math.max(320, vw - 32) // canvas horizontal padding
  const scale = Math.min(1, available / naturalWidth)
  return (
    <div style={{ width: naturalWidth * scale, height: naturalHeight * scale, flex: '0 0 auto' }}>
      <div style={{ width: naturalWidth, height: naturalHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'

/** 24-unit outline icon paths used by the Vegangster-shaped canvas. */
export const Icon = {
  gift: (
    <>
      <path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14" />
      <path d="M12 7c-1.5-3-6-3-6-1s4 1 6 1zm0 0c1.5-3 6-3 6-1s-4 1-6 1z" />
    </>
  ),
  star: <path d="M12 3l2.9 6 6.6 1-4.8 4.6 1.2 6.7L12 18l-5.9 3.3L7.3 14.6 2.5 10l6.6-1z" />,
  slots: <path d="M12 2l9 10-9 10L3 12z" />,
  ball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18M3 12h18" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  ),
  streamer: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M10 10l4 2-4 2z" />
    </>
  ),
  providers: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zM6 6H4a3 3 0 0 0 3 3M18 6h2a3 3 0 0 1-3 3M12 13v4M9 20h6" />,
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h.01M15 9h.01M12 12h.01M9 15h.01M15 15h.01" />
    </>
  ),
  chevron: <path d="M9 6l6 6-6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  tag: <path d="M20 12l-8 8-9-9V4h7zM7.5 7.5h.01" />,
  flag: <path d="M5 21V4h11l-1.5 4L16 12H5" />,
  ticket: <path d="M3 9a2 2 0 0 0 2-2V5h14v2a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4v2H5v-2a2 2 0 0 0-2-2zM13 5v14" />,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  cards: (
    <>
      <rect x="3" y="6" width="11" height="14" rx="2" />
      <path d="M8 4h11a2 2 0 0 1 2 2v12" />
    </>
  ),
  share: <path d="M15 4h5v5M20 4l-9 9M19 14v5H5V5h5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  telegram: <path d="M21 4L3 11l6 2 2 6 3-4 5 4z" />,
}

export function Svg({ d, size = 22, color = 'currentColor', stroke = 1.8 }: { d: ReactNode; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', display: 'block' }}>
      {d}
    </svg>
  )
}

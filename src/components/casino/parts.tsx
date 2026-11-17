import type { CSSProperties, ReactNode } from 'react'
import { INTERESTS, PILL_LOGO_GREEN, STUDIOS_LOGO, type Game, type Interest, type Promo } from '../../data/casino'

/** Scale helper — sizes multiply by --k on the big desktop breakpoints. */
export const k = (n: number) => `calc(${n}px * var(--k))`

/* ------------------------------------------------------------------ brand */

export function PillLogo({ h = 26 }: { h?: number }) {
  return <img src={PILL_LOGO_GREEN} alt="WTF Games" style={{ height: k(h), width: 'auto', display: 'block' }} />
}

export function StudiosLogo({ h = 20 }: { h?: number }) {
  return <img src={STUDIOS_LOGO} alt="WTF Studios" style={{ height: k(h), width: 'auto', display: 'block' }} />
}

/* ------------------------------------------------------------------ text */

export function Kicker({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'green' | 'lilac' }) {
  const color = tone === 'green' ? 'var(--cs-green)' : tone === 'lilac' ? 'var(--cs-lilac)' : 'var(--cs-faint)'
  return (
    <div style={{ fontSize: k(10.5), fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color, lineHeight: 1 }}>{children}</div>
  )
}

/**
 * Section header. `explain` is the plain-language reason a row exists
 * ("Because you picked …") — the brief's transparency rule — and `action` is
 * the always-visible control to change it.
 */
export function Head({
  title,
  kicker,
  kickerTone,
  explain,
  action,
  onAction,
  size = 22,
  studio,
}: {
  title: ReactNode
  kicker?: ReactNode
  kickerTone?: 'muted' | 'green' | 'lilac'
  explain?: ReactNode
  action?: string
  onAction?: () => void
  size?: number
  studio?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: k(12) }}>
      <div style={{ minWidth: 0 }}>
        {kicker && <div style={{ marginBottom: k(6) }}><Kicker tone={kickerTone}>{kicker}</Kicker></div>}
        <div className={studio ? 'cst' : 'cd'} style={{ fontSize: k(size), lineHeight: studio ? 1.05 : 0.9, color: 'var(--cs-text)' }}>
          {title}
        </div>
        {explain && (
          <div style={{ fontSize: k(12), color: 'var(--cs-muted)', marginTop: k(6), lineHeight: 1.4 }}>
            {explain}
            {action && onAction && (
              <>
                {' '}
                <button onClick={onAction} style={{ ...linkBtn, fontSize: k(12) }}>
                  {action}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {action && !explain && (
        <button onClick={onAction} style={{ ...seeAll, fontSize: k(12) }}>
          {action}
        </button>
      )}
    </div>
  )
}

const seeAll: CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--cs-muted)',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  padding: 0,
  flex: '0 0 auto',
}
export const linkBtn: CSSProperties = {
  background: 'transparent',
  border: 'none',
  padding: 0,
  color: 'var(--cs-green)',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: 3,
}

/* ------------------------------------------------------------------ layout */

export function Section({ children, pad, gap = 0, style }: { children: ReactNode; pad: number; gap?: number; style?: CSSProperties }) {
  return <div style={{ padding: `0 ${pad}px`, display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>
}

/** Horizontal scroller that bleeds to the frame edge (pad = gutter). */
export function Rail({ children, pad, gap = 10, snap }: { children: ReactNode; pad: number; gap?: number; snap?: boolean }) {
  return (
    <div
      className={`no-scrollbar${snap ? ' snap' : ''}`}
      style={{ display: 'flex', gap: k(gap), overflowX: 'auto', margin: `0 -${pad}px`, padding: `2px ${pad}px 6px`, scrollPaddingLeft: pad }}
    >
      {children}
    </div>
  )
}

export function Grid({ children, cols, gap = 10 }: { children: ReactNode; cols: number; gap?: number }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: k(gap) }}>{children}</div>
}

/* ------------------------------------------------------------------ cards */

export function Tag({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'green' | 'lilac' | 'red' | 'violet' }) {
  const t: Record<string, CSSProperties> = {
    dark: { background: 'rgba(0,0,0,.72)', color: '#fff', border: '1px solid rgba(255,255,255,.14)' },
    green: { background: 'var(--cs-green)', color: '#000' },
    lilac: { background: 'var(--cs-lilac)', color: '#0f0f14' },
    violet: { background: 'var(--cs-violet)', color: '#fff' },
    red: { background: 'var(--cs-red)', color: '#fff' },
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        borderRadius: 9999,
        padding: `${k(3)} ${k(7)}`,
        fontSize: k(9.5),
        fontWeight: 800,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...t[tone],
      }}
    >
      {children}
    </span>
  )
}

/**
 * Square game cover. Titles live BELOW the art (readable on mobile, never
 * overlapping the artwork). `w` is a px width for rails; omit for grid cells.
 */
export function Cover({
  game,
  w,
  radius = 12,
  showTitle = true,
  showProvider = true,
  unavailable,
  ring,
  badge,
}: {
  game: Game
  w?: number
  radius?: number
  showTitle?: boolean
  showProvider?: boolean
  unavailable?: boolean
  ring?: 'green' | 'lilac'
  badge?: ReactNode
}) {
  const border = ring === 'green' ? 'var(--cs-green)' : ring === 'lilac' ? 'rgba(164,139,255,.55)' : 'var(--cs-line)'
  return (
    <div className="press" style={{ flex: w ? `0 0 ${k(w)}` : undefined, width: w ? k(w) : undefined, minWidth: 0 }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          borderRadius: k(radius),
          overflow: 'hidden',
          border: `1px solid ${border}`,
          background: 'var(--cs-surface)',
        }}
      >
        <img src={game.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: unavailable ? 'grayscale(1) brightness(.45)' : undefined }} />
        {badge && <div style={{ position: 'absolute', top: k(8), left: k(8), display: 'flex', gap: 4 }}>{badge}</div>}
        {unavailable && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: k(10.5), fontWeight: 700, color: '#fff', lineHeight: 1.3, background: 'rgba(0,0,0,.6)', borderRadius: 8, padding: '6px 8px' }}>
              Not available in your region
            </div>
          </div>
        )}
      </div>
      {showTitle && (
        <div style={{ paddingTop: k(7), minWidth: 0 }}>
          <div style={{ fontSize: k(12.5), fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: unavailable ? 'var(--cs-faint)' : 'var(--cs-text)' }}>
            {game.title}
          </div>
          {showProvider && (
            <div style={{ fontSize: k(10.5), color: game.studio ? 'var(--cs-lilac)' : 'var(--cs-faint)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {game.provider}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** Wide card (poster) — title sits on a bottom scrim, art is cropped. */
export function WideCard({
  game,
  ratio = '16 / 10',
  w,
  h,
  titleSize = 16,
  tags,
  studio,
  onClick,
}: {
  game: Game
  ratio?: string
  w?: number
  h?: number
  titleSize?: number
  tags?: ReactNode
  studio?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className="press"
      onClick={onClick}
      style={{
        position: 'relative',
        flex: w ? `0 0 ${k(w)}` : undefined,
        width: w ? k(w) : undefined,
        height: h ? k(h) : undefined,
        aspectRatio: h ? undefined : ratio,
        borderRadius: k(14),
        overflow: 'hidden',
        border: `1px solid ${studio ? 'rgba(164,139,255,.5)' : 'var(--cs-line)'}`,
        background: 'var(--cs-surface)',
      }}
    >
      <img src={game.src} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.82) 100%)' }} />
      {tags && <div style={{ position: 'absolute', top: k(10), left: k(10), display: 'flex', gap: 5 }}>{tags}</div>}
      <div style={{ position: 'absolute', left: k(12), right: k(12), bottom: k(11) }}>
        <div className={studio ? 'cst' : 'cd'} style={{ fontSize: k(titleSize), lineHeight: 1, textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>
          {game.title}
        </div>
        <div style={{ fontSize: k(10.5), color: studio ? 'var(--cs-lilac)' : 'var(--cs-dim)', marginTop: k(4) }}>{game.provider}</div>
      </div>
    </div>
  )
}

/** Promo artwork tile (existing 1104 × 674 banners). */
export function PromoTile({ promo, w, flex }: { promo: Promo; w?: number; flex?: boolean }) {
  return (
    <div
      className="press"
      style={{
        flex: w ? `0 0 ${k(w)}` : flex ? 1 : undefined,
        width: w ? k(w) : undefined,
        aspectRatio: '1104 / 674',
        borderRadius: k(14),
        overflow: 'hidden',
        border: '1px solid var(--cs-line)',
        background: 'var(--cs-surface)',
        minWidth: 0,
      }}
    >
      <img src={promo.src} alt={promo.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

/* ------------------------------------------------------------------ controls */

export function Btn({
  children,
  kind = 'primary',
  size = 'md',
  onClick,
  full,
  style,
}: {
  children: ReactNode
  kind?: 'primary' | 'ghost' | 'lilac' | 'subtle' | 'white'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  full?: boolean
  style?: CSSProperties
}) {
  const kinds: Record<string, CSSProperties> = {
    primary: { background: 'var(--cs-green)', color: '#000', border: '1px solid transparent' },
    lilac: { background: 'var(--cs-lilac)', color: '#0f0f14', border: '1px solid transparent' },
    white: { background: '#fff', color: '#000', border: '1px solid transparent' },
    ghost: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.35)' },
    subtle: { background: 'var(--cs-surface-2)', color: '#fff', border: '1px solid var(--cs-line-2)' },
  }
  const h = size === 'sm' ? 32 : size === 'lg' ? 48 : 40
  const fs = size === 'sm' ? 12 : size === 'lg' ? 15 : 13
  return (
    <button
      onClick={onClick}
      className="press cd"
      style={{
        height: k(h),
        padding: `0 ${k(size === 'sm' ? 12 : 18)}`,
        borderRadius: k(10),
        fontSize: k(fs),
        letterSpacing: '.04em',
        width: full ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        whiteSpace: 'nowrap',
        ...kinds[kind],
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export function Pill({ children, active, onClick, tone = 'green', size = 'md', icon }: { children: ReactNode; active?: boolean; onClick?: () => void; tone?: 'green' | 'lilac' | 'white'; size?: 'sm' | 'md' | 'lg'; icon?: ReactNode }) {
  const activeBg = tone === 'green' ? 'var(--cs-green)' : tone === 'lilac' ? 'var(--cs-lilac)' : '#fff'
  const h = size === 'sm' ? 30 : size === 'lg' ? 42 : 36
  return (
    <button
      onClick={onClick}
      className="press"
      style={{
        height: k(h),
        padding: `0 ${k(size === 'lg' ? 16 : 13)}`,
        borderRadius: 9999,
        border: `1px solid ${active ? 'transparent' : 'var(--cs-line-2)'}`,
        background: active ? activeBg : 'var(--cs-surface)',
        color: active ? '#000' : '#fff',
        fontSize: k(size === 'lg' ? 14 : 12.5),
        fontWeight: 700,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        flex: '0 0 auto',
      }}
    >
      {icon}
      {children}
    </button>
  )
}

export function SearchBar({ placeholder = 'Search games, providers…', compact, dark }: { placeholder?: string; compact?: boolean; dark?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: k(compact ? 38 : 44),
        padding: `0 ${k(14)}`,
        borderRadius: k(12),
        background: dark ? '#000' : 'var(--cs-surface)',
        border: '1px solid var(--cs-line-2)',
        color: 'var(--cs-faint)',
        fontSize: k(13.5),
        flex: 1,
        minWidth: 0,
      }}
    >
      <SearchIcon />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{placeholder}</span>
    </div>
  )
}

export function SearchIcon({ size = 17, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" style={{ flex: '0 0 auto' }}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

/** Interest pills — the explicit, editable signal behind "Picked for you". */
export function InterestPills({ selected, onToggle, size = 'md', tone = 'green', wrap }: { selected: Interest[]; onToggle: (i: Interest) => void; size?: 'sm' | 'md' | 'lg'; tone?: 'green' | 'lilac' | 'white'; wrap?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: k(8), flexWrap: wrap ? 'wrap' : 'nowrap' }}>
      {INTERESTS.map((i) => {
        const on = selected.includes(i.id)
        return (
          <Pill key={i.id} active={on} onClick={() => onToggle(i.id)} size={size} tone={tone} icon={<span style={{ fontSize: k(13), lineHeight: 1 }}>{on ? '✓' : '+'}</span>}>
            {i.label}
          </Pill>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ states */

export function SkeletonRail({ n, w, pad, title = true }: { n: number; w: number; pad: number; title?: boolean }) {
  return (
    <div>
      {title && <div className="skel" style={{ width: k(160), height: k(20), marginBottom: k(14) }} />}
      <Rail pad={pad}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{ flex: `0 0 ${k(w)}`, width: k(w) }}>
            <div className="skel" style={{ aspectRatio: '1 / 1' }} />
            <div className="skel" style={{ width: '70%', height: k(11), marginTop: k(9), borderRadius: 4 }} />
          </div>
        ))}
      </Rail>
    </div>
  )
}

/** Empty / unavailable content slot (e.g. live tables are down). */
export function Unavailable({ title, line, action, onAction }: { title: string; line: string; action?: string; onAction?: () => void }) {
  return (
    <div
      style={{
        border: '1px dashed var(--cs-line-2)',
        borderRadius: k(14),
        padding: `${k(18)} ${k(16)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        background: 'var(--cs-surface)',
      }}
    >
      <div>
        <div style={{ fontSize: k(13.5), fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: k(12), color: 'var(--cs-muted)', marginTop: 4, lineHeight: 1.4 }}>{line}</div>
      </div>
      {action && (
        <Btn kind="subtle" size="sm" onClick={onAction}>
          {action}
        </Btn>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ footer */

export function CasinoFooter({ pad, isDesktop }: { pad: number; isDesktop: boolean }) {
  const link: CSSProperties = { color: 'var(--cs-dim)', fontSize: k(12), fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }
  return (
    <div style={{ padding: `${k(28)} ${pad}px ${k(40)}`, borderTop: '1px solid var(--cs-line)', marginTop: k(28) }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: isDesktop ? k(26) : k(16), alignItems: 'center', justifyContent: isDesktop ? 'space-between' : 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: k(12) }}>
          <span
            style={{
              width: k(30),
              height: k(30),
              borderRadius: '50%',
              border: '1.5px solid var(--cs-dim)',
              display: 'grid',
              placeItems: 'center',
              fontSize: k(11),
              fontWeight: 800,
            }}
          >
            18+
          </span>
          <div style={{ fontSize: k(12), color: 'var(--cs-muted)', lineHeight: 1.4, maxWidth: 420 }}>
            Play for fun, not to fix things. Set a budget, take breaks, and use the tools if it stops being fun.
          </div>
        </div>
        <div style={{ display: 'flex', gap: k(18), flexWrap: 'wrap' }}>
          <button style={link}>Set limits</button>
          <button style={link}>Take a break</button>
          <button style={link}>Self-exclude</button>
          <button style={link}>Get help</button>
        </div>
      </div>
      <div style={{ fontSize: k(10.5), color: 'var(--cs-faint)', marginTop: k(18), lineHeight: 1.6 }}>
        © 2026 WTF Games · Provably fair · Terms · Privacy · Games and offers shown are illustrative for design review. No real-money play.
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ icons */

export const Icon = {
  home: <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  studios: <path d="M12 3l2.9 6 6.6 1-4.8 4.6 1.2 6.7L12 18l-5.9 3.3L7.3 14.6 2.5 10l6.6-1z" />,
  slots: <path d="M12 2l9 10-9 10L3 12z" />,
  live: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  shows: <path d="M7 4h10v4a5 5 0 0 1-10 0zM9 20h6M12 13v7" />,
  tables: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 11h18" />
    </>
  ),
  promos: <path d="M20 8H4v4h16zM4 12v8h16v-8M12 8v12" />,
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14h2" />
    </>
  ),
  account: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  discover: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-4 2 2-6z" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7M12 17v.01" />
    </>
  ),
  sliders: <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0M14 4v4M6 10v4M16 16v4" />,
  reset: <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  undo: <path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />,
  play: <path d="M8 5v14l11-7z" />,
  chevron: <path d="M9 6l6 6-6 6" />,
}

export function Svg({ d, size = 22, color = 'currentColor', stroke = 1.8, fill = 'none' }: { d: ReactNode; size?: number; color?: string; stroke?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', display: 'block' }}>
      {d}
    </svg>
  )
}

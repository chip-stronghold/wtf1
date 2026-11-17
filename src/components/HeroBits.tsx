import { useEffect, useRef, type CSSProperties } from 'react'
import { HERO_VIDEO } from '../data/lobby'
import { BellIcon } from './icons'
import { useMediaQuery } from '../hooks/useMediaQuery'

/** Full-bleed looping muted hero video (paused for reduced-motion users).
 * The side-edge feather is applied via the `.hero-video` class only when the
 * content container is near its cap (big screens with side margins) — see
 * index.css. At ≤1440 / on mobile the video is full-width, so no side fade. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  useEffect(() => {
    const v = ref.current
    if (!v || reduceMotion) return
    v.muted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [reduceMotion])
  return (
    <video
      ref={ref}
      className="hero-video"
      autoPlay={!reduceMotion}
      loop={!reduceMotion}
      muted
      playsInline
      preload="auto"
      src={HERO_VIDEO}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  )
}

const blinkDot = (size: number, bg: string, glow?: string): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  background: bg,
  boxShadow: glow,
})

/** Red LIVE pill with a blinking white dot. Also reused (label="WTF Clips") in the modal. */
export function LivePill({
  label = 'LIVE',
  style,
  display = true,
}: {
  label?: string
  style?: CSSProperties
  display?: boolean
}) {
  if (!display) return null
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--c-red)',
        borderRadius: 9999,
        padding: '4px 10px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '.06em',
        ...style,
      }}
    >
      <span style={{ ...blinkDot(6, '#fff'), animation: 'wtfBlink 1s steps(1) infinite' }} />
      {label}
    </div>
  )
}

/** Offline corner timer: "NEXT SHOW 1d 06:22:14". */
export function NextShowPill({ compact, style }: { compact: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(0,0,0,.5)',
        border: '1px solid var(--c-border-alt)',
        borderRadius: 9999,
        padding: '4px 9px',
        fontSize: 9,
        color: 'var(--c-text-muted)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        ...style,
      }}
    >
      <span style={blinkDot(5, 'var(--c-green)', '0 0 7px var(--c-green)')} />
      NEXT SHOW{' '}
      <b style={{ color: '#fff', fontFamily: 'var(--f-display)', fontWeight: 900, letterSpacing: '.02em' }}>{compact}</b>
    </div>
  )
}

/** Floating neon-green play affordance (pulsing). `size` accepts a number or a
 *  CSS length (e.g. a clamp) so it can scale fluidly; the triangle is em-based. */
export function FloatingPlay({
  size = 58,
  style,
  onClick,
}: {
  size?: number | string
  style?: CSSProperties
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        fontSize: size, // 1em = size, so the triangle scales with the button
        borderRadius: '50%',
        background: 'linear-gradient(180deg, #009B00 0%, #00FF00 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        animation: 'wtfPulse 1.5s ease-in-out infinite',
        boxShadow: 'var(--glow-green-strong)',
        ...style,
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '0.31em solid #000',
          borderTop: '0.192em solid transparent',
          borderBottom: '0.192em solid transparent',
          marginLeft: '0.086em',
        }}
      />
    </div>
  )
}

function ctaWidth(isDesktop: boolean): CSSProperties {
  return isDesktop ? { flex: '0 0 auto', padding: '0 30px', minWidth: 170 } : { flex: 1, padding: '0 18px' }
}

const ctaBase: CSSProperties = {
  height: 46,
  borderRadius: 10,
  fontFamily: 'var(--f-display)',
  textTransform: 'uppercase',
  letterSpacing: '.02em',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 7,
}

/** Offline → Set reminder + Previous episodes. Live → Play and Watch Free Now. */
export function HeroCTAs({
  isDesktop,
  live,
  onPreviousEpisodes,
  marginTop = 14,
  emphasizePlay = false,
  compact = false,
}: {
  isDesktop: boolean
  live: boolean
  onPreviousEpisodes: () => void
  marginTop?: number
  /** Cinematic D desktop: bigger, pulsing/glowing "Play and Watch Free Now". */
  emphasizePlay?: boolean
  /** Shorter button for the mobile live tile (D Tile). */
  compact?: boolean
}) {
  const w = ctaWidth(isDesktop)
  const emphasize = emphasizePlay && live
  // Cinematic D's live CTA is the hero's primary action. Mobile keeps a flat 18px;
  // on desktop it scales with the hero via container-query units so it stays
  // proportionate at 2560/3440 instead of looking small. Other concepts: 14/12.
  const ctaFont = isDesktop ? 14 : 12
  const emphasizeBig = emphasize && isDesktop
  const primaryFont = emphasizeBig ? 'clamp(18px, 1.5cqw, 26px)' : compact ? 13 : emphasize ? 18 : ctaFont
  const primary: CSSProperties = {
    ...ctaBase,
    ...w,
    ...(compact ? { height: 34, borderRadius: 8 } : {}),
    background: 'var(--c-green)',
    color: '#000',
    border: 'none',
    fontWeight: 900,
    fontSize: primaryFont,
    // Cinematic D live: larger text + pulse + glow.
    ...(emphasize ? { boxShadow: '0 0 22px rgba(0,255,0,.5)', animation: 'wtfPulse 1.6s ease-in-out infinite' } : {}),
    // D desktop: scale the button box (height/padding/radius/gap) with the hero
    // too, so the whole CTA grows — not just the label.
    ...(emphasizeBig
      ? {
          height: 'clamp(46px, 3.6cqw, 64px)',
          padding: '0 clamp(30px, 2.6cqw, 46px)',
          minWidth: 'clamp(170px, 14cqw, 240px)',
          borderRadius: 'clamp(10px, 0.8cqw, 14px)',
          gap: 'clamp(7px, 0.6cqw, 11px)',
        }
      : {}),
  }
  // Tertiary: no outline, no fill — just the label.
  const ghost: CSSProperties = {
    ...ctaBase,
    ...w,
    background: 'transparent',
    border: 'none',
    color: 'var(--c-text-dim)',
    fontWeight: 900,
    fontSize: ctaFont,
  }
  return (
    <div style={{ display: 'flex', gap: 9, marginTop, flexWrap: 'wrap' }}>
      {live ? (
        <button className="brighten" style={primary}>
          ▶ Play &amp; Watch Free Now
        </button>
      ) : (
        <>
          <button className="brighten" style={primary}>
            <BellIcon />
            Set reminder
          </button>
          <button className="brighten" style={ghost} onClick={onPreviousEpisodes}>
            Previous episodes
          </button>
        </>
      )}
    </div>
  )
}

/** The two Netflix-style protection gradients, as absolutely-positioned layers. */
export function HeroGradients({ wash, fade }: { wash: string; fade: string }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: wash }} />
      <div style={{ position: 'absolute', inset: 0, background: fade }} />
    </>
  )
}

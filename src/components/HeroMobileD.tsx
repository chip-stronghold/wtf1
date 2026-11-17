import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Countdown } from '../hooks/useShowClock'
import { banners, BANNER_RATIO } from '../data/lobby'
import { HeroCTAs, HeroGradients, HeroVideo, LivePill } from './HeroBits'
import { UnitBoxBar } from './Countdown'

/**
 * Mobile-only variants of Cinematic D (concepts 01–02). Desktop for all three
 * renders Cinematic D unchanged — these explore how the live-show video and the
 * promo banners share the top of the mobile lobby:
 *
 *   01 · D Tile        the video is the first tile in the banner rail
 *   02 · D Swipe       video behind; slide 0 is the D copy, swiping brings the
 *                      banners over the video and the copy fades away
 */

const WASH = 'linear-gradient(100deg,rgba(8,8,12,.96) 0%,rgba(8,8,12,.8) 26%,rgba(8,8,12,.4) 50%,rgba(8,8,12,.05) 72%,transparent 90%)'
const FADE = 'linear-gradient(0deg,#08080c 0%,rgba(8,8,12,.9) 24%,rgba(8,8,12,.55) 48%,transparent 68%)'

const headline: CSSProperties = {
  fontFamily: 'var(--f-display)',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '-.01em',
  lineHeight: 0.86,
}
const green = (text: string) => <span style={{ color: 'var(--c-green)' }}>{text}</span>

// Two lines at 390 wide — the desktop copy runs to three here and crowds the 236px module.
const D_COPY = 'Place your picks for free on our WTF Live shows — Hamsters, Marbles, Treadmill Racing and chaos.'

interface Props {
  live: boolean
  countdown: Countdown
  prize: string
  onPreviousEpisodes: () => void
}

/* ── shared bits ─────────────────────────────────────────────────────── */

/** Tracks a horizontal snap scroller: progress in slides (0 = first slide). */
function useSwipe() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    setProgress(el.scrollLeft / Math.max(1, el.clientWidth))
  }, [])
  const goTo = useCallback((i: number, slideWidth?: number) => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ left: i * (slideWidth ?? el.clientWidth), behavior: 'smooth' })
  }, [])
  return { ref, progress, onScroll, goTo }
}

/** Pagination dots. Active = green elongated pill. */
function Dots({ count, active, onPick, style }: { count: number; active: number; onPick?: (i: number) => void; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, ...style }}>
      {Array.from({ length: count }).map((_, i) => {
        const on = i === active
        return (
          <button
            key={i}
            onClick={() => onPick?.(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: on ? 18 : 6,
              height: 6,
              borderRadius: 9999,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: on ? 'var(--c-green)' : 'rgba(255,255,255,.28)',
              transition: 'width .2s, background .2s',
            }}
          />
        )
      })}
    </div>
  )
}

/** "Free to enter" eyebrow pill (with the LIVE pill inline when on air) — as Cinematic D. */
function Eyebrow({ live }: { live: boolean }) {
  const pillType: CSSProperties = { padding: '5px 13px', fontSize: 11, letterSpacing: '.12em', fontWeight: 700, textTransform: 'uppercase' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      {live && <LivePill style={{ ...pillType, gap: 8, border: '1px solid var(--c-red)' }} />}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(0,255,0,.16)',
          border: '1px solid rgba(0,255,0,.45)',
          borderRadius: 9999,
          color: 'var(--c-green)',
          ...pillType,
        }}
      >
        Free to enter
      </div>
    </div>
  )
}

/* ── 07 · D TILE — the live show is a tile in the banner rail ─────────── */

// Full-width tiles (14px gutter each side), one per page — no peek of the next one.
const tile: CSSProperties = { flex: '0 0 100%', aspectRatio: BANNER_RATIO, borderRadius: 14, scrollSnapAlign: 'start' }

function LiveTile({ live, countdown, prize, onPreviousEpisodes }: Props) {
  const pillType: CSSProperties = { padding: '4px 11px', fontSize: 10, letterSpacing: '.12em', fontWeight: 700, textTransform: 'uppercase' }
  return (
    <div
      style={{
        ...tile,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--c-border)',
        background: 'var(--c-hero-base)',
      }}
    >
      <HeroVideo />
      <HeroGradients wash={WASH} fade="linear-gradient(0deg,#08080c 0%,rgba(8,8,12,.92) 34%,rgba(8,8,12,.55) 58%,transparent 80%)" />
      {/* Same content as D, scaled to the tile: eyebrow · headline · copy · timer / CTA. */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 12px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          {live && <LivePill style={{ ...pillType, gap: 5, border: '1px solid var(--c-red)' }} />}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(0,255,0,.16)',
              border: '1px solid rgba(0,255,0,.45)',
              borderRadius: 9999,
              color: 'var(--c-green)',
              ...pillType,
            }}
          >
            Free to enter
          </div>
        </div>
        <div style={{ ...headline, fontSize: 30 }}>
          Win {green(prize)} this week
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--c-text-dim)', marginTop: 6, lineHeight: 1.4 }}>
          Place your picks for free on our WTF Live shows — Hamsters, Marbles, Treadmill Racing and chaos.
        </div>
        {live ? (
          <HeroCTAs isDesktop={false} live onPreviousEpisodes={onPreviousEpisodes} emphasizePlay marginTop={10} />
        ) : (
          <div style={{ marginTop: 10 }}>
            <UnitBoxBar countdown={countdown} label="Next live show" setReminder />
          </div>
        )}
      </div>
    </div>
  )
}

/** Replaces both the hero and the banner rail on mobile: live tile first, then the 3 banners, dots under. */
export function HeroTileRail(props: Props) {
  const { ref, progress, onScroll, goTo } = useSwipe()
  const slideW = () => {
    const el = ref.current
    if (!el) return 0
    const first = el.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 28 : el.clientWidth
  }
  // progress is in container widths; convert to tile index using the tile pitch.
  const el = ref.current
  const pitch = el ? slideW() : 1
  const idx = el ? Math.round((progress * el.clientWidth) / Math.max(1, pitch)) : 0
  return (
    // The hero slot already carries a 14px gutter; pull out of it so the rail's own 14px is the true gutter.
    <div style={{ padding: '10px 0 0', margin: '0 -14px' }}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{ display: 'flex', gap: 28, overflowX: 'auto', padding: '0 14px', scrollSnapType: 'x mandatory', scrollPaddingLeft: 14 }}
      >
        <LiveTile {...props} />
        {banners.map((b) => (
          <img
            key={b.alt}
            className="promo-banner brighten"
            src={b.src}
            alt={b.alt}
            style={{ ...tile, minWidth: 0, objectFit: 'cover', border: '1px solid var(--c-border)', cursor: 'pointer' }}
          />
        ))}
      </div>
      <Dots count={banners.length + 1} active={idx} onPick={(i) => goTo(i, slideW())} style={{ marginTop: 10 }} />
    </div>
  )
}

/* ── 02 · D SWIPE — video behind, banners swipe over it ──────────── */

// Video module height = banner card (368 − 28 gutter = 340 wide at 1104×674 → 208 tall)
// + 14px above and below, so the card sits with the same padding on all four sides.
const SWIPE_H = 236

/** Full-bleed video frame with a snap scroller over it: slide 0 is see-through
 *  (the D copy sits beneath it), slides 1–3 are the banners. The copy fades and
 *  drifts left as you swipe; the video dims so the banner reads as a card. */
function SwipeFrame({
  height,
  progress,
  scrollRef,
  onScroll,
  copy,
}: {
  height: number
  progress: number
  scrollRef: React.RefObject<HTMLDivElement>
  onScroll: () => void
  copy: ReactNode
}) {
  const copyOpacity = Math.max(0, 1 - progress * 1.6)
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden', margin: '0 -14px', background: 'var(--c-hero-base)' }}>
      <HeroVideo />
      <HeroGradients wash={WASH} fade={FADE} />
      {/* Dim the video as banners come in so they sit forward as cards. */}
      <div style={{ position: 'absolute', inset: 0, background: '#08080c', opacity: Math.min(0.55, progress * 0.7), pointerEvents: 'none' }} />
      {/* Slides. Slide 0 is empty so the copy underneath shows through. */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{ position: 'absolute', inset: 0, display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        <div style={{ flex: '0 0 100%', scrollSnapAlign: 'start' }} />
        {banners.map((b) => (
          <div key={b.alt} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: BANNER_RATIO,
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid var(--c-border-alt)',
                boxShadow: '0 14px 34px rgba(0,0,0,.6)',
                cursor: 'pointer',
              }}
            >
              <img className="promo-banner brighten" src={b.src} alt={b.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>
      {/* D copy — above the scroller but click-through, so a swipe anywhere on the video progresses to the banners. */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '16px 16px 14px',
          opacity: copyOpacity,
          transform: `translateX(${-progress * 60}px)`,
        }}
        // Click-through (see .d-copy in index.css) so a swipe that starts on the
        // copy still lands on the scroller; only the buttons stay tappable.
        className="d-copy"
      >
        {copy}
      </div>
    </div>
  )
}

/** 02 · headline, copy and timer all live in the fading slide-0 layer. */
export function HeroSwipe({ live, countdown, prize, onPreviousEpisodes }: Props) {
  const { ref, progress, onScroll, goTo } = useSwipe()
  const copy = (
    <>
      <Eyebrow live={live} />
      <div style={{ ...headline, fontSize: 'clamp(30px,7.5vw,40px)', maxWidth: 460 }}>
        Win {green(prize)} this week
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--c-text-dim)', marginTop: 8, lineHeight: 1.45, maxWidth: 420 }}>{D_COPY}</div>
      {live ? (
        <HeroCTAs isDesktop={false} live onPreviousEpisodes={onPreviousEpisodes} emphasizePlay />
      ) : (
        <div style={{ marginTop: 14 }}>
          <UnitBoxBar countdown={countdown} label="Next live show" setReminder />
        </div>
      )}
    </>
  )
  return (
    <div>
      <SwipeFrame height={SWIPE_H} progress={progress} scrollRef={ref} onScroll={onScroll} copy={copy} />
      <Dots count={banners.length + 1} active={Math.round(progress)} onPick={goTo} style={{ marginTop: 5 }} />
    </div>
  )
}


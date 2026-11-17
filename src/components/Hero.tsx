import type { CSSProperties } from 'react'
import type { HeroConcept } from '../config'
import type { Countdown } from '../hooks/useShowClock'
import { FloatingPlay, HeroCTAs, HeroGradients, HeroVideo, LivePill } from './HeroBits'
import { UnitBoxBar } from './Countdown'
import { HeroSwipe, HeroTileRail } from './HeroMobileD'

const WASH = 'linear-gradient(100deg,rgba(8,8,12,.96) 0%,rgba(8,8,12,.8) 26%,rgba(8,8,12,.4) 50%,rgba(8,8,12,.05) 72%,transparent 90%)'
const FADE = 'linear-gradient(0deg,#08080c 0%,rgba(8,8,12,.55) 16%,transparent 46%)'

const green = (text: string) => <span style={{ color: 'var(--c-green)' }}>{text}</span>

export interface HeroProps {
  concept: HeroConcept
  isDesktop: boolean
  live: boolean
  countdown: Countdown
  prize: string
  onPreviousEpisodes: () => void
}

/**
 * Top-of-lobby hero. Desktop is always Cinematic D (the signed-off pick). The
 * concepts only differ on mobile, where the live-show video and the promo
 * banners share one module (see HeroMobileD):
 *   1 D Tile · 2 D Swipe
 */
export function Hero(props: HeroProps) {
  if (props.isDesktop) return <HeroCinematicD {...props} />
  switch (props.concept) {
    case 1:
      return <HeroTileRail {...props} />
    case 2:
      return <HeroSwipe {...props} />
    default:
      return null
  }
}

/* ── CINEMATIC D (desktop) — timer in the CTA slot, no buttons ─────────── */
// Module height scales with the (capped) content width via container-query
// units, so the hero grows taller on 2560/3440 instead of letterboxing. Same
// height live and offline.
function HeroCinematicD({ live, countdown, prize, onPreviousEpisodes }: HeroProps) {
  const pillType: CSSProperties = { padding: '6px 15px', fontSize: 'clamp(11px, 0.72cqw, 14px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em' }
  return (
    <div style={{ position: 'relative', height: 'clamp(280px, 24cqw, 470px)', overflow: 'hidden', margin: '0 -14px', background: 'var(--c-hero-base)' }}>
      <HeroVideo />
      <HeroGradients wash={WASH} fade={FADE} />
      {live && (
        // Big Play button, centred on the right — scales with the content width.
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 'clamp(60px, 4cqw, 96px)', display: 'flex', alignItems: 'center' }}>
          <FloatingPlay size="clamp(78px, 6.5cqw, 132px)" />
        </div>
      )}
      {/* 40px content gutter (matches the slots/adverts margin). */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '16px 40px 58px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
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
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-.01em',
            fontSize: 'clamp(40px, 4cqw, 78px)',
            lineHeight: 0.86,
            maxWidth: 900,
          }}
        >
          Win {green(prize)} this week
        </div>
        <div style={{ fontSize: 'clamp(13px, 1cqw, 17px)', color: 'var(--c-text-dim)', marginTop: 8, lineHeight: 1.45, maxWidth: 600 }}>
          Place your picks for free to win on our WTF Live shows — 100% live Hamsters, Marbles, Treadmill Racing, WTF Derby and
          uncontrolled chaos. Winner drawn live this Friday 11:00pm UTC.
        </div>
        {live ? (
          <HeroCTAs isDesktop live onPreviousEpisodes={onPreviousEpisodes} emphasizePlay />
        ) : (
          <div style={{ marginTop: 14 }}>
            <UnitBoxBar countdown={countdown} label="Next live show" setReminder fitContent big />
          </div>
        )}
      </div>
    </div>
  )
}

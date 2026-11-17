import { useCallback, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import type { HeroConcept } from '../config'
import type { Countdown } from '../hooks/useShowClock'
import { clips, originals, slots, tables, type Clip } from '../data/lobby'
import { Hero } from './Hero'
import { PromoBanners } from './PromoBanners'
import { GameRail, StudiosPill } from './GameRail'
import { ClipsRail } from './ClipsRail'
import { ClipModal } from './ClipModal'
import { PastEpisodes } from './PastEpisodes'
import { Footer } from './Footer'

export interface LobbyProps {
  isDesktop: boolean
  concept: HeroConcept
  live: boolean
  countdown: Countdown
  prize: string
  /** The scroll container these contents live in — used to scroll to Past Episodes. */
  scrollContainerRef: RefObject<HTMLElement>
}

/** Shared lobby content (top → bottom). Identical across mobile & desktop shells. */
export function Lobby({ isDesktop, concept, live, countdown, prize, scrollContainerRef }: LobbyProps) {
  const prevRef = useRef<HTMLDivElement>(null)
  const [activeClip, setActiveClip] = useState<Clip | null>(null)

  const scrollToPrev = useCallback(() => {
    const container = scrollContainerRef.current
    const target = prevRef.current
    if (!container || !target) return
    const top =
      target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12
    container.scrollTo({ top, behavior: 'smooth' })
  }, [scrollContainerRef])

  const heroProps = { concept, isDesktop, live, countdown, prize, onPreviousEpisodes: scrollToPrev }

  return (
    <div style={{ fontFamily: 'var(--f-body)', color: '#fff' }}>
      <div style={{ padding: '0 14px' }}>
        <Hero {...heroProps} />
      </div>

      {/* Desktop: 40px side margins on the main content (slots/adverts/rails).
          The sections already carry a 14px gutter, so +26px = 40px. The hero
          above stays full-bleed. */}
      <div style={{ padding: isDesktop ? '0 26px' : undefined }}>
        {/* Mobile folds the banners into the hero module. */}
        {isDesktop && <PromoBanners pullUp />}

        <GameRail title="Trending Slots" games={slots} isDesktop={isDesktop} link="See all ›" paddingTop={18} />
        <GameRail
          title="WTF Originals"
          games={originals}
          isDesktop={isDesktop}
          link="See all ›"
          pill={<StudiosPill />}
          paddingTop={20}
        />
        <GameRail title="Table Games" games={tables} isDesktop={isDesktop} link="All tables ›" paddingTop={20} />
        <PastEpisodes ref={prevRef} />
        <ClipsRail clips={clips} onOpen={setActiveClip} />
        <Footer />
      </div>

      {activeClip && createPortal(<ClipModal clip={activeClip} onClose={() => setActiveClip(null)} />, document.body)}
    </div>
  )
}

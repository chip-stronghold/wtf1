import { useState, type CSSProperties, type ReactNode } from 'react'
import type { PromotionsVersion } from '../../config'
import type { Countdown } from '../../hooks/useShowClock'
import { tiles, type PromoTile } from '../../data/promotions'
import {
  ArchivedGrid,
  ComparisonPanel,
  HowItWorksRow,
  ImageTile,
  LiveTonightStrip,
  PromoHeader,
  PromoHeroBlock,
  SectionLabel,
  TermsNote,
  ValuePropsRow,
  type PromoTab,
} from './promoParts'
import { PromosV5 } from './FigmaBoard'

interface ConceptProps {
  isDesktop: boolean
  countdown: Countdown
  live: boolean
}

const pageWrap = (isDesktop: boolean): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: isDesktop ? 18 : 14,
  padding: isDesktop ? '24px 28px 48px' : '16px 14px 40px',
  color: '#fff',
  fontFamily: 'var(--f-body)',
})

const featured = tiles.find((t) => t.feature) ?? tiles[0]
const rest = tiles.filter((t) => t !== featured)

/** Shared page scaffold: header + tabs + hero, then the concept's tile layout. */
function Scaffold({ isDesktop, children }: { isDesktop: boolean; children: (tab: PromoTab) => ReactNode }) {
  const [tab, setTab] = useState<PromoTab>('latest')
  return (
    <div style={pageWrap(isDesktop)}>
      <PromoHeader isDesktop={isDesktop} tab={tab} onTab={setTab} />
      <PromoHeroBlock isDesktop={isDesktop} />
      {tab === 'latest' ? children(tab) : <ArchivedGrid isDesktop={isDesktop} />}
      <TermsNote />
    </div>
  )
}

/* ════════════════ V1 · Banner stack — the zero-effort CMS pipeline ═══════ */
/* Same pipeline as the lobby banners: upload a 1106×580 image, done.
   Mobile: full-width stack in priority order. Desktop: 3-up grid.        */
function PromosV1({ isDesktop }: ConceptProps) {
  return (
    <Scaffold isDesktop={isDesktop}>
      {() => (
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : '1fr', gap: isDesktop ? 12 : 10 }}>
          {[featured, ...rest].map((t) => (
            <ImageTile key={t.id} tile={t} />
          ))}
        </div>
      )}
    </Scaffold>
  )
}

/* ════════════════ V2 · Today rails — "what's on now / next / always" ═════ */
/* Answers the scanner's question in one swipe per group. Mobile: snap
   rails. Desktop: one row-grid per group. Real show countdown up top.    */
function Rail({ group, isDesktop }: { group: PromoTile['group']; isDesktop: boolean }) {
  const items = tiles.filter((t) => t.group === group)
  if (isDesktop) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(items.length, 2)},1fr)`, gap: 12 }}>
        {items.map((t) => (
          <ImageTile key={t.id} tile={t} />
        ))}
      </div>
    )
  }
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollSnapType: 'x mandatory', margin: '0 -14px', padding: '0 14px' }}>
      {items.map((t) => (
        <div key={t.id} style={{ flex: '0 0 82%', maxWidth: 340, scrollSnapAlign: 'start' }}>
          <ImageTile tile={t} />
        </div>
      ))}
    </div>
  )
}

function PromosV2({ isDesktop, countdown, live }: ConceptProps) {
  return (
    <Scaffold isDesktop={isDesktop}>
      {() => (
        <>
          <LiveTonightStrip countdown={countdown} live={live} isDesktop={isDesktop} />
          <SectionLabel hint="Claim before midnight">On today</SectionLabel>
          <Rail group="today" isDesktop={isDesktop} />
          <SectionLabel hint="Leagues & races this week">This week</SectionLabel>
          <Rail group="week" isDesktop={isDesktop} />
          <SectionLabel hint="Always running">Always on</SectionLabel>
          <Rail group="always" isDesktop={isDesktop} />
        </>
      )}
    </Scaffold>
  )
}

/* ════════════════ V3 · Bento — hierarchy through size, images only ═══════ */
/* One oversized featured slot, square supporting slots. Art needs a safe
   centre-crop; slots are fixed so the CMS just fills image sizes.        */
function PromosV3({ isDesktop }: ConceptProps) {
  if (isDesktop) {
    return (
      <Scaffold isDesktop>
        {() => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: 148, gap: 12 }}>
            <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
              <ImageTile tile={featured} fill />
            </div>
            {rest.map((t) => (
              <ImageTile key={t.id} tile={t} fill />
            ))}
          </div>
        )}
      </Scaffold>
    )
  }
  const [big, ...smalls] = [featured, ...rest]
  return (
    <Scaffold isDesktop={false}>
      {() => (
        <>
          <ImageTile tile={big} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {smalls.map((t) => (
              <ImageTile key={t.id} tile={t} ratio="1 / 1" />
            ))}
          </div>
        </>
      )}
    </Scaffold>
  )
}

/* ════════════════ V4 · Landing hybrid — offers + USP explainer ═══════════ */
/* For the discovery traffic: value props, tonight's show, the featured
   offers, the "vs other casinos" seed, how to earn, then the image wall. */
function PromosV4({ isDesktop, countdown, live }: ConceptProps) {
  const [second, ...others] = rest
  return (
    <Scaffold isDesktop={isDesktop}>
      {() => (
        <>
          <ValuePropsRow isDesktop={isDesktop} />
          <LiveTonightStrip countdown={countdown} live={live} isDesktop={isDesktop} />
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2,1fr)' : '1fr', gap: isDesktop ? 12 : 10 }}>
            <ImageTile tile={featured} />
            <ImageTile tile={second} />
          </div>
          <ComparisonPanel isDesktop={isDesktop} />
          <SectionLabel hint="Four steps, no catch">How to earn more</SectionLabel>
          <HowItWorksRow isDesktop={isDesktop} />
          <SectionLabel>More going on</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : '1fr', gap: isDesktop ? 12 : 10 }}>
            {others.map((t) => (
              <ImageTile key={t.id} tile={t} />
            ))}
          </div>
        </>
      )}
    </Scaffold>
  )
}

/* ── dispatcher ─────────────────────────────────────────────────────────── */
export function PromotionsPage({
  version,
  isDesktop,
  countdown,
  live,
}: ConceptProps & { version: PromotionsVersion }): ReactNode {
  if (version === 2) return <PromosV2 isDesktop={isDesktop} countdown={countdown} live={live} />
  if (version === 3) return <PromosV3 isDesktop={isDesktop} countdown={countdown} live={live} />
  if (version === 4) return <PromosV4 isDesktop={isDesktop} countdown={countdown} live={live} />
  if (version === 5) return <PromosV5 isDesktop={isDesktop} countdown={countdown} live={live} />
  return <PromosV1 isDesktop={isDesktop} countdown={countdown} live={live} />
}

// Concept 05 — implementation of the Figma "promotions board" design
// (WTF-Games file, nodes 33370:30838 desktop / 33370:31253 mobile).
// Rev 3: PROMOTIONS header on top, Overline kicker, tonight's-raffle strip
// with a real countdown, one row of fixed-height offer cards, a separate row
// of "WTF USP" advert slots (dot carousel on mobile). Ticker + value props
// removed per the updated design. Colours/sizes from the Figma dev output.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Countdown } from '../../hooks/useShowClock'
import { adverts, figmaHero, tiles, type Advert, type PromoTile } from '../../data/promotions'
import { HERO_VIDEO } from '../../data/lobby'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { DISPLAY } from '../profile/profileParts'
import { ArchivedGrid, TermsNote, type PromoTab } from './promoParts'

interface ConceptProps {
  isDesktop: boolean
  countdown: Countdown
  live: boolean
}

const PANEL = '#0e0e10' // WTFG Dark Grey from the Figma styles
const HERO_BG = '#0d0d0f'
const OUTLINE = '#292929'

const pageWrap = (isDesktop: boolean): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: isDesktop ? '24px 28px 48px' : '16px 14px 40px',
  color: '#fff',
  fontFamily: 'var(--f-body)',
})

/* ── PROMOTIONS heading + Latest/Archived tabs, one row on top ──────────── */
function FigmaTabs({ tab, onTab }: { tab: PromoTab; onTab: (t: PromoTab) => void }) {
  const t = (active: boolean): CSSProperties => ({
    fontFamily: 'var(--f-body)',
    width: 86,
    padding: '8px 10px',
    border: 'none',
    borderRadius: 3,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1.2,
    cursor: 'pointer',
    background: active ? 'var(--c-green)' : 'transparent',
    color: active ? '#000' : '#787878',
    transition: 'all .12s',
  })
  return (
    <div style={{ display: 'flex', gap: 8, background: '#141414', borderRadius: 3, padding: 6 }}>
      <button onClick={() => onTab('latest')} style={t(tab === 'latest')}>Latest</button>
      <button onClick={() => onTab('archived')} style={t(tab === 'archived')}>Archived</button>
    </div>
  )
}

function BoardHeader({ isDesktop, tab, onTab }: { isDesktop: boolean; tab: PromoTab; onTab: (t: PromoTab) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
      <h1 style={{ ...DISPLAY, margin: 0, fontWeight: 900, fontSize: isDesktop ? 88 : 32, lineHeight: 0.8 }}>Promotions</h1>
      <FigmaTabs tab={tab} onTab={onTab} />
    </div>
  )
}

/* ── hero: Overline kicker + 2 actions, image slot right on desktop ─────── */
function FigmaButton({ children, primary, full }: { children: ReactNode; primary?: boolean; full?: boolean }) {
  return (
    <button
      className="brighten"
      style={{
        fontFamily: 'var(--f-body)',
        textTransform: 'uppercase',
        height: 43,
        flex: full ? 1 : undefined,
        padding: '0 24px',
        background: primary ? 'var(--c-green)' : 'transparent',
        color: primary ? '#000' : '#fff',
        border: primary ? 'none' : '1px solid #fff',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

/** Overline style from the Figma file: Korolev Medium 14, 16% tracking. */
const OVERLINE: CSSProperties = {
  fontFamily: 'var(--f-body)',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.2,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'var(--c-green)',
}

/** Muted autoplay video for the hero slots; the studio photo is the poster /
 *  reduced-motion fallback. Mirrors the lobby HeroVideo conventions. */
function HeroSlotVideo({ style }: { style: CSSProperties }) {
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
      autoPlay={!reduceMotion}
      loop={!reduceMotion}
      muted
      playsInline
      preload="auto"
      src={HERO_VIDEO}
      poster={figmaHero.img}
      style={{ objectFit: 'cover', ...style }}
    />
  )
}

function FigmaHero({ isDesktop }: { isDesktop: boolean }) {
  const copy = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center', minWidth: 0 }}>
      <span style={OVERLINE}>{figmaHero.kicker}</span>
      {/* Desktop honours the authored break (wrap after "2"); mobile wraps naturally. */}
      <div style={{ ...DISPLAY, fontWeight: 900, fontSize: isDesktop ? 48 : 40, lineHeight: 0.9, whiteSpace: isDesktop ? 'pre-line' : 'normal' }}>
        {isDesktop ? figmaHero.title : figmaHero.titleMobile}
      </div>
      <p style={{ margin: 0, fontSize: isDesktop ? 16 : 14, fontWeight: 500, color: 'var(--c-text-muted)', lineHeight: 1.2 }}>
        {figmaHero.sub}
      </p>
      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <FigmaButton primary full={!isDesktop}>{figmaHero.ctaPrimary}</FigmaButton>
        <FigmaButton full={!isDesktop}>{figmaHero.ctaSecondary}</FigmaButton>
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 11, fontWeight: 500, color: 'var(--c-text-muted)' }}>
        {['Crypto only', 'Fast & secure', 'No KYC for small limits'].map((s) => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 7" />
            </svg>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
  // Mobile: the studio photo fills the whole panel behind a dark wash.
  if (!isDesktop) {
    return (
      <section style={{ position: 'relative', border: `1px solid ${OUTLINE}`, borderRadius: 12, padding: 24, overflow: 'hidden' }}>
        <HeroSlotVideo style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.62)' }} />
        <div style={{ position: 'relative' }}>{copy}</div>
      </section>
    )
  }
  // Desktop: copy left, studio photo in the image slot.
  return (
    <section
      style={{
        background: HERO_BG,
        border: `1px solid ${OUTLINE}`,
        borderRadius: 12,
        padding: 24,
        display: 'grid',
        gridTemplateColumns: '1fr 1.04fr',
        gap: 24,
        alignItems: 'center',
      }}
    >
      {copy}
      <HeroSlotVideo style={{ alignSelf: 'stretch', minHeight: 240, width: '100%', height: '100%', borderRadius: 12 }} />
    </section>
  )
}

/* ── value props: emoji + title + sub cards (4-up / 2×2) ────────────────── */
// Copy verbatim from the Figma design.
const FIGMA_VPS = [
  { emoji: '🎁', title: 'Daily bonuses', sub: 'Free rewards every day.' },
  { emoji: '🎟️', title: 'Raffle tickets', sub: 'Play & earn free entries.' },
  { emoji: '▶️', title: 'Live shows', sub: 'Win huge prizes on air.' },
  { emoji: '💸', title: 'Cashback', sub: 'Up to $500 back on losses.' },
]
function FigmaValueProps({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4,1fr)' : 'repeat(2,1fr)', gap: 12 }}>
      {FIGMA_VPS.map((v) => (
        <div
          key={v.title}
          style={{ background: HERO_BG, border: `1px solid ${OUTLINE}`, borderRadius: 12, padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <span style={{ fontSize: 24, lineHeight: 1.2 }}>{v.emoji}</span>
          <div style={{ fontFamily: 'var(--f-body)', fontWeight: 700, fontSize: 18, lineHeight: 1, textTransform: 'uppercase' }}>{v.title}</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#9999a6', lineHeight: 1.2 }}>{v.sub}</div>
        </div>
      ))}
    </div>
  )
}

/* ── tonight's raffle strip: real show countdown + CTA ──────────────────── */
function LivePill() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--c-red)', borderRadius: 9999, padding: '4px 12px', ...DISPLAY, fontWeight: 900, fontSize: 12, color: '#fff' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', animation: 'wtfBlink 1.1s infinite' }} />
      LIVE
    </span>
  )
}

function CountBlock({ countdown }: { countdown: Countdown }) {
  const seg = (v: string, k: string) => (
    <span key={k} style={{ ...DISPLAY, fontWeight: 900, fontSize: 24, lineHeight: 1, width: 24, textAlign: 'center' }}>{v}</span>
  )
  const colon = (k: string) => (
    <span key={k} style={{ ...DISPLAY, fontWeight: 900, fontSize: 16, lineHeight: 1, color: 'var(--c-green)' }}>:</span>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: '0 0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[seg(countdown.h, 'h'), colon(':1'), seg(countdown.m, 'm'), colon(':2'), seg(countdown.s, 's')]}
      </div>
      <div style={{ display: 'flex', gap: 9, fontSize: 8, fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>
        <span>hrs</span><span>mins</span><span>secs</span>
      </div>
    </div>
  )
}

function CtaButton({ w }: { w?: number }) {
  return (
    <button
      className="brighten"
      style={{ fontFamily: 'var(--f-body)', textTransform: 'uppercase', height: 34, width: w, padding: w ? 0 : '0 24px', background: 'var(--c-green)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
    >
      CTA
    </button>
  )
}

function RaffleStrip({ isDesktop, countdown, live }: ConceptProps) {
  const stripBase: CSSProperties = {
    border: `1px solid ${OUTLINE}`,
    borderRadius: 12,
    background: 'linear-gradient(90deg, rgba(0,255,0,.09) 0%, rgba(0,255,0,0) 55%) #101014',
  }
  const dot = live ? (
    <LivePill />
  ) : (
    <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--c-green)', boxShadow: 'var(--glow-green)', flex: '0 0 auto', marginTop: isDesktop ? 0 : 4 }} />
  )
  const blurb = (
    <span style={{ fontSize: isDesktop ? 16 : 14, fontWeight: 700, lineHeight: 1.2, minWidth: 0 }}>
      Tonight&apos;s live show · $1,000 weekly raffle{' '}
      <span style={{ color: 'var(--c-text-muted)', fontWeight: 500 }}>— earn free entries for picking winners in hamsters &amp; more</span>
    </span>
  )
  if (isDesktop) {
    return (
      <section style={{ ...stripBase, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
        {dot}
        {blurb}
        <div style={{ flex: 1 }} />
        {!live && <CountBlock countdown={countdown} />}
        <CtaButton />
      </section>
    )
  }
  return (
    <section style={{ ...stripBase, display: 'flex', gap: 12, padding: 16, alignItems: 'flex-start' }}>
      {dot}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, flex: 1 }}>
        {blurb}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          {!live && <CountBlock countdown={countdown} />}
          <CtaButton w={156} />
        </div>
      </div>
    </section>
  )
}

/* ── offer card: image + capped title + 2-line body + arrow ─────────────── */
// Placeholder copy verbatim from the Figma design; the title itself is the cap.
const TITLE_MAX = 44
const PLACEHOLDER_TITLE = 'Title here which has a max characters set'
const PLACEHOLDER_TITLE_FIXED = 'All the offer boxes here have a fixed height'
const PLACEHOLDER_TITLE_2 = 'Title here which has a max of two lines'
const PLACEHOLDER_BODY = 'Play along with our WTF Live show for free and receive entries for our weekly..'
// Card copy is Korolev Bold/Medium in the design — the body face, NOT Compressed.
const CARD_TITLE: CSSProperties = { fontFamily: 'var(--f-body)', fontWeight: 700, textTransform: 'uppercase' }

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function OfferCard({ tile, isDesktop, mockTitle = PLACEHOLDER_TITLE }: { tile: PromoTile; isDesktop: boolean; mockTitle?: string }) {
  const title = mockTitle.length > TITLE_MAX ? `${mockTitle.slice(0, TITLE_MAX - 1).trimEnd()}…` : mockTitle
  // Desktop cards are fixed-height so copy clamps at 2 lines; mobile lets the
  // full placeholder wrap, exactly like the Figma mobile node.
  const clamp2: CSSProperties = isDesktop
    ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
    : {}
  return (
    <div
      className="lift"
      style={{
        background: PANEL,
        border: `1px solid ${OUTLINE}`,
        borderRadius: 12,
        padding: isDesktop ? '16px 16px 24px' : 12,
        display: 'flex',
        flexDirection: 'column',
        gap: isDesktop ? 20 : 24,
        cursor: 'pointer',
      }}
    >
      <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 20px 20px -7px rgba(0,0,0,.4)' }}>
        {tile.art ? (
          <img src={tile.art} alt="" style={{ width: '100%', aspectRatio: isDesktop ? '1106 / 580' : '147 / 85', objectFit: 'cover', objectPosition: tile.pos ?? 'center', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', aspectRatio: isDesktop ? '1106 / 580' : '147 / 85', background: `linear-gradient(160deg, ${tile.color}, #08080a 90%)` }} />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {/* fixed-height title/body slots so every card lines up regardless of copy */}
        <div style={{ ...CARD_TITLE, fontSize: isDesktop ? 22 : 18, lineHeight: isDesktop ? 1.2 : 1, minHeight: isDesktop ? 53 : undefined, ...clamp2 }}>{title}</div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--c-text-muted)', lineHeight: 1.2, minHeight: isDesktop ? 34 : undefined, flex: 1, ...clamp2 }}>{PLACEHOLDER_BODY}</p>
        <div style={{ alignSelf: 'flex-end' }}>
          <ArrowIcon />
        </div>
      </div>
    </div>
  )
}

/** Empty-cell filler from the mobile design (caption only, no image box). */
function FillerCell() {
  return (
    <div style={{ background: PANEL, borderRadius: 12, padding: 12, display: 'grid', placeItems: 'center', minHeight: 240 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 500, color: 'var(--c-text-muted)', textAlign: 'center', lineHeight: 1.3 }}>
        placeholder image only for mobile to fill empty cell if odd number (space filler).
      </p>
    </div>
  )
}

/* ── advert slot: gradient image cell with the WTF USP watermark ────────── */
function AdvertTile({ ad, isDesktop, fill }: { ad: Advert; isDesktop: boolean; fill?: boolean }) {
  return (
    <div
      className="promo-banner"
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: isDesktop ? '16px 16px 24px' : '14px 14px 21px',
        ...(fill ? { height: 334 } : { aspectRatio: '322 / 298' }),
        background: ad.gradient ?? PANEL,
      }}
    >
      {ad.art && <img src={ad.art} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      {!ad.art && (
        <span
          style={{
            fontFamily: 'var(--f-body)',
            fontWeight: 500,
            fontSize: isDesktop ? 12 : 10.7,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            textAlign: 'right',
            color: '#141414',
            lineHeight: 1.2,
          }}
        >
          WTF USP imargery
        </span>
      )}
    </div>
  )
}

/* ── mobile advert carousel with dots ───────────────────────────────────── */
function AdvertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const slide = el.firstElementChild as HTMLElement | null
    if (!slide) return
    setActive(Math.round(el.scrollLeft / (slide.offsetWidth + 12)))
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 6 }}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollSnapType: 'x mandatory', margin: '0 -14px', padding: '0 14px' }}
      >
        {adverts.map((ad) => (
          <div key={ad.id} style={{ flex: '0 0 90%', maxWidth: 324, scrollSnapAlign: 'center' }}>
            <AdvertTile ad={ad} isDesktop={false} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {adverts.map((ad, i) => (
          <span
            key={ad.id}
            style={{ width: i === active ? 17 : 8, height: 8, borderRadius: 9999, background: i === active ? '#fff' : 'var(--c-border-alt)', transition: 'all .2s' }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── the concept ────────────────────────────────────────────────────────── */
export function PromosV5({ isDesktop, countdown, live }: ConceptProps) {
  const [tab, setTab] = useState<PromoTab>('latest')
  // The three offer banners (welcome / loyalty / space) are the text cards —
  // 3 keeps mobile's filler cell (odd count) and the desktop 3-up row.
  const CARD_IDS = ['welcome', 'loyalty', 'space']
  const cards = CARD_IDS.flatMap((id) => tiles.find((t) => t.id === id) ?? [])
  // Desktop title variants straight from the design's three cards.
  const DESKTOP_TITLES = [PLACEHOLDER_TITLE, PLACEHOLDER_TITLE_FIXED, PLACEHOLDER_TITLE_2]
  const board = isDesktop ? (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'stretch' }}>
        {cards.map((t, i) => (
          <OfferCard key={t.id} tile={t} isDesktop mockTitle={DESKTOP_TITLES[i]} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'stretch' }}>
        {adverts.map((ad) => (
          <AdvertTile key={ad.id} ad={ad} isDesktop fill />
        ))}
      </div>
    </>
  ) : (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, alignItems: 'stretch' }}>
        {cards.map((t) => (
          <OfferCard key={t.id} tile={t} isDesktop={false} />
        ))}
        {cards.length % 2 === 1 && <FillerCell />}
      </div>
      <AdvertCarousel />
    </>
  )
  return (
    <div style={pageWrap(isDesktop)}>
      <BoardHeader isDesktop={isDesktop} tab={tab} onTab={setTab} />
      <FigmaHero isDesktop={isDesktop} />
      <FigmaValueProps isDesktop={isDesktop} />
      <RaffleStrip isDesktop={isDesktop} countdown={countdown} live={live} />
      {tab === 'latest' ? board : <ArchivedGrid isDesktop={isDesktop} />}
      <TermsNote />
    </div>
  )
}

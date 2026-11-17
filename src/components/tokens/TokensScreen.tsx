import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import type { Tokens } from '../../data/skins'
import { BETS, EVENTS, FOOTER, HERO_PICKS, JACKPOT, PROVIDERS, STREAMERS, STUDIO_GAMES, type Game } from '../../data/demo'
import { asset } from '../../lib/assets'
import { Icon, Svg } from './icons'

/**
 * demo.vegangster.com, module for module, restyled ONLY through Vegangster's
 * token names. Same page on desktop and mobile (their layout is a single
 * centred column with a floating glass header and bottom nav on both).
 */

const K_FOR: Record<number, number> = { 1440: 1, 2560: 1.5, 3440: 1.65 }
const t = (name: string) => `var(--token-${name})`
/** The WTF GAMES pill logo (brand green). */
const LOGO = asset('brand/wtf-watermark-green.svg')

/* ------------------------------------------------------------------ shared */

function SectionHead({ title, icon, right }: { title: string; icon: ReactNode; right?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
      <div className="vh" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: t('typography-size-xl') }}>
        <span style={{ color: t('brand-primary-1-600'), display: 'flex' }}>{icon}</span>
        {title}
      </div>
      {right}
    </div>
  )
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span style={{ width: 44, height: 24, borderRadius: 999, background: on ? t('brand-brand-color-1-500') : t('brand-secondary-2'), position: 'relative', flex: '0 0 auto', display: 'inline-block' }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: on ? t('brand-button-deposit-text') : t('brand-primary-1-300') }} />
    </span>
  )
}

/* ------------------------------------------------------------------ header + nav */

function Header({ mobile }: { mobile: boolean }) {
  return (
    <div className="vglass" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 6, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: mobile ? '0 12px' : '0 24px', borderWidth: '0 0 1px' }}>
      <img src={LOGO} alt="WTF Games" style={{ height: mobile ? 26 : 30, display: 'block' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button aria-label="Settings" style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t('brand-secondary-24'), color: t('brand-primary-1-600') }}>
          <Svg d={Icon.gear} size={17} stroke={2} />
        </button>
        <button className="vbtn vbtn-ghost vbtn-sm" style={{ height: 36 }}>
          Login
        </button>
        <button className="vbtn vbtn-primary vbtn-sm" style={{ height: 36 }}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

/** Floating bottom nav pill — their tab bar, shown on desktop too. */
function NavPill() {
  const items: [string, ReactNode][] = [
    ['Promos', Icon.gift],
    ['Favourites', Icon.star],
    ['Casino', Icon.slots],
    ['Sports', Icon.ball],
    ['Live', Icon.live],
    ['Menu', Icon.menu],
  ]
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, zIndex: 6, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div className="vglass" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 4, height: 56, padding: '0 10px', borderRadius: 999, boxShadow: t('brand-shadow-1') }}>
        {items.map(([l, d], i) => {
          const on = i === 2
          return (
            <button key={l} aria-label={l} title={l} style={{ width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center', background: on ? t('brand-brand-color-1-500') : 'transparent', color: on ? t('brand-button-deposit-text') : t('brand-primary-1-600') }}>
              <Svg d={d} size={21} stroke={on ? 2.2 : 1.8} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ modules */

/** "What are you playing today?" — their mascot carousel, with our covers standing in for the mascots. */
function Hero({ mobile }: { mobile: boolean }) {
  const size = mobile ? 132 : 164
  const rail = useRef<HTMLDivElement>(null)
  // Start with the highlighted (middle) pick centred, as their carousel does.
  useEffect(() => {
    const el = rail.current
    const centre = el?.children[2] as HTMLElement | undefined
    if (el && centre) el.scrollLeft = centre.offsetLeft - (el.clientWidth - centre.clientWidth) / 2
  }, [mobile])
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: mobile ? 18 : 28, justifyItems: 'center', paddingTop: mobile ? 72 : 96, minWidth: 0 }}>
      <div className="vh" style={{ fontSize: mobile ? t('typography-size-2xl') : t('typography-size-3xl'), textAlign: 'center' }}>
        What are you playing today?
      </div>
      <div ref={rail} className="no-scrollbar" style={{ display: 'flex', gap: mobile ? 12 : 20, alignItems: 'flex-end', overflowX: 'auto', width: '100%', justifyContent: mobile ? 'flex-start' : 'center', padding: '4px 4px 0', scrollSnapType: 'x mandatory' }}>
        {HERO_PICKS.map((g, i) => {
          const centre = i === 2
          const s = centre ? size * 1.18 : size
          return (
            <button key={g.name} style={{ display: 'grid', gap: 10, justifyItems: 'center', flex: '0 0 auto', scrollSnapAlign: 'center', width: s }}>
              <div style={{ width: s, height: s, borderRadius: 18, overflow: 'hidden', border: `2px solid ${centre ? t('brand-brand-color-1-500') : t('brand-secondary-6')}`, boxShadow: centre ? `0 0 0 4px ${t('brand-glass-effect-brand')}` : 'none', background: t('brand-secondary-5') }}>
                <img src={g.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ textAlign: 'center', minWidth: 0 }}>
                <div className="vc" style={{ fontSize: t('typography-size-md') }}>{g.name}</div>
                <div className="vfaint" style={{ fontSize: t('typography-size-sm'), marginTop: 2 }}>{g.provider}</div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Jackpot({ mobile }: { mobile: boolean }) {
  return (
    <section className="vcard" style={{ padding: mobile ? 12 : 16, display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 4px 4px' }}>
        <Svg d={Icon.trophy} size={18} stroke={2} />
        <span className="vh" style={{ fontSize: t('typography-size-lg-plus') }}>{JACKPOT.title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
        {JACKPOT.tiers.map((j, i) => (
          <div key={j.tier} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 12, background: t('brand-secondary-2') }}>
            <span className="vc" style={{ width: 54, height: 54, borderRadius: 12, display: 'grid', placeItems: 'center', background: i === 3 ? t('brand-brand-color-1-500') : t('brand-secondary-5'), color: i === 3 ? t('brand-button-deposit-text') : t('brand-brand-color-1-400'), fontSize: t('typography-size-sm'), letterSpacing: '.08em', textTransform: 'uppercase', flex: '0 0 auto' }}>
              {j.tier}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="vh" style={{ fontSize: i >= 2 ? t('typography-size-2xl') : t('typography-size-xl'), fontVariantNumeric: 'tabular-nums' }}>{j.amount}</div>
              <div className="vmuted" style={{ fontSize: t('typography-size-md'), marginTop: 2 }}>{j.note}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 12, background: t('brand-secondary-2') }}>
        <div style={{ flex: 1, fontSize: t('typography-size-md'), color: t('brand-primary-1-500') }}>
          {JACKPOT.optIn} <u>T&C</u>
        </div>
        <div style={{ width: 1, alignSelf: 'stretch', background: t('brand-secondary-6') }} />
        <div style={{ display: 'grid', gap: 4, justifyItems: 'center' }}>
          <Toggle on />
          <span className="vmuted" style={{ fontSize: t('typography-size-sm') }}>Opted In</span>
        </div>
      </div>
    </section>
  )
}

function GameTile({ game }: { game: Game }) {
  return (
    <button style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}` }}>
      <img src={game.src} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <span style={{ position: 'absolute', left: 8, bottom: 8, height: 22, padding: '0 8px', borderRadius: 7, background: t('brand-secondary-24'), color: t('brand-primary-1-600'), fontSize: t('typography-size-xs'), fontWeight: 700, display: 'inline-flex', alignItems: 'center', letterSpacing: '.02em', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {game.provider}
      </span>
      <span style={{ position: 'absolute', right: 8, bottom: 8, width: 22, height: 22, borderRadius: '50%', background: t('brand-secondary-24'), color: t('brand-primary-1-600'), display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, fontStyle: 'italic' }}>
        i
      </span>
    </button>
  )
}

function TopGames({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead title="Top" icon={<Svg d={Icon.dice} size={18} stroke={2} />} />
      {mobile ? (
        <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(2, auto)', gridAutoColumns: 'calc((100% - 12px) / 2.25)', gap: 12, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
          {STUDIO_GAMES.map((g) => (
            <GameTile key={g.name} game={g} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 14 }}>
          {STUDIO_GAMES.slice(0, 12).map((g) => (
            <GameTile key={g.name} game={g} />
          ))}
        </div>
      )}
    </section>
  )
}

function Streamers({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead title="Our Streamers" icon={<Svg d={Icon.streamer} size={18} stroke={2} />} />
      <div className="no-scrollbar" style={{ display: mobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, overflowX: 'auto', margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
        {STREAMERS.map((s) => (
          <button key={s.nick} className="vcard" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, textAlign: 'left', flex: mobile ? '0 0 72%' : undefined }}>
            <img src={s.src} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flex: '0 0 auto', background: t('brand-secondary-2') }} />
            <span className="vc" style={{ fontSize: t('typography-size-lg') }}>{s.nick}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Providers({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead title="Providers" icon={<Svg d={Icon.providers} size={18} stroke={2} />} />
      <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: mobile ? 'column' : 'row', gridTemplateColumns: mobile ? undefined : 'repeat(9, minmax(0, 1fr))', gridTemplateRows: mobile ? 'repeat(2, auto)' : undefined, gridAutoColumns: mobile ? 120 : undefined, gap: 10, overflowX: mobile ? 'auto' : undefined, margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
        {PROVIDERS.map((p) => (
          <button key={p} className="vcard" style={{ height: 48, display: 'grid', placeItems: 'center', padding: '0 10px', fontSize: t('typography-size-sm'), fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: t('brand-primary-1-500'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {p}
          </button>
        ))}
      </div>
    </section>
  )
}

function TopEvents({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead
        title="Top events"
        icon={<Svg d={Icon.ball} size={18} stroke={2} />}
        right={
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['Live', 'Sports', 'Esports'].map((l, i) => (
              <button key={l} className={`vtab${i === 0 ? ' vtab-on' : ''}`} style={{ height: 30, fontSize: t('typography-size-sm') }}>
                {i === 0 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
                {l}
              </button>
            ))}
            {!mobile && (
              <button className="vtab" style={{ height: 30, fontSize: t('typography-size-sm'), marginLeft: 6 }}>
                All events
              </button>
            )}
          </div>
        }
      />
      <div className="no-scrollbar" style={{ display: mobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, overflowX: 'auto', margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
        {EVENTS.map((e) => (
          <div key={e.league + e.home} className="vcard" style={{ padding: 14, display: 'grid', gap: 12, flex: mobile ? '0 0 82%' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span className="vfaint" style={{ fontSize: t('typography-size-sm'), fontWeight: 700 }}>{e.league}</span>
              {e.live ? (
                <span className="vlabel" style={{ background: t('brand-success-500'), color: '#000' }}>Live {e.clock}</span>
              ) : (
                <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{e.clock}</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <span className="vc" style={{ fontSize: t('typography-size-lg') }}>{e.home}</span>
                <span className="vc" style={{ fontSize: t('typography-size-lg') }}>{e.away}</span>
              </div>
              {e.score && <span className="vh vsuccess" style={{ fontSize: t('typography-size-xl'), fontVariantNumeric: 'tabular-nums' }}>{e.score}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {['1', 'X', '2'].map((k, i) => (
                <button key={k} style={{ height: 38, borderRadius: t('border-radius-input'), background: t('brand-secondary-2'), display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: t('typography-size-md') }}>
                  <span className="vfaint">{k}</span>
                  <span style={{ fontWeight: 700 }}>{e.odds[i]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BetsFeed({ mobile }: { mobile: boolean }) {
  const tabs = ['All bets', 'High Rollers', 'Lucky Bets', 'Best Results']
  return (
    <section className="vcard" style={{ overflow: 'hidden' }}>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 6, padding: 10, overflowX: 'auto', borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
        {tabs.map((l, i) => (
          <button key={l} className={`vtab${i === 0 ? ' vtab-on' : ''}`} style={{ flex: mobile ? '0 0 auto' : 1, justifyContent: 'center' }}>
            {l}
          </button>
        ))}
      </div>
      {BETS.slice(0, mobile ? 6 : 8).map((b, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: i % 2 ? 'transparent' : t('brand-secondary-2') }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), color: t('brand-brand-color-1-400'), flex: '0 0 auto' }}>
            <Svg d={Icon.gift} size={14} stroke={2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: t('typography-size-md'), fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.game}</div>
            <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>@{b.nick}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="vsuccess" style={{ fontSize: t('typography-size-md'), fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {b.amount} <span style={{ color: t('brand-info-500') }}>€</span>
            </div>
            <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{b.mult}</div>
          </div>
        </div>
      ))}
    </section>
  )
}

function SeoFooter({ mobile }: { mobile: boolean }) {
  return (
    <footer style={{ display: 'grid', gap: 18, paddingBottom: 90 }}>
      <div className="vcard" style={{ padding: mobile ? 16 : 20, display: 'grid', gap: 8 }}>
        <div className="vc" style={{ fontSize: t('typography-size-lg-plus') }}>{FOOTER.title}</div>
        <p className="vmuted" style={{ margin: 0, fontSize: t('typography-size-md'), lineHeight: 1.45 }}>{FOOTER.copy}</p>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: t('typography-size-md'), fontWeight: 700, color: t('brand-primary-1-600'), justifySelf: 'start' }}>
          Show More <Svg d={Icon.arrow} size={14} stroke={2.2} />
        </button>
      </div>
      <div style={{ display: 'flex', gap: mobile ? 14 : 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        {FOOTER.links.map((l) => (
          <button key={l} style={{ fontSize: t('typography-size-md'), fontWeight: 600, color: t('brand-primary-1-500') }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {[Icon.instagram, Icon.telegram].map((d, i) => (
          <span key={i} style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: t('brand-brand-color-1-500'), color: t('brand-button-deposit-text') }}>
            <Svg d={d} size={18} stroke={2} />
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center' }}>
        <span className="vfaint" style={{ width: 34, height: 34, borderRadius: '50%', border: `2px solid ${t('brand-primary-1-200')}`, display: 'grid', placeItems: 'center', fontSize: t('typography-size-sm'), fontWeight: 800 }}>18+</span>
        <span className="vfaint" style={{ fontSize: t('typography-size-sm'), fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>Licence badge</span>
        <span className="vfaint" style={{ fontSize: t('typography-size-sm'), fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>★ Trustpilot</span>
      </div>
      <p className="vfaint" style={{ margin: 0, textAlign: 'center', fontSize: t('typography-size-sm') }}>{FOOTER.rights}</p>
    </footer>
  )
}

/* ------------------------------------------------------------------ screen */

function Page({ mobile }: { mobile: boolean }) {
  return (
    // minmax(0, 1fr) keeps the horizontal rails from widening the column past the viewport.
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: mobile ? '0 16px' : '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: mobile ? 26 : 34 }}>
      <Hero mobile={mobile} />
      <Jackpot mobile={mobile} />
      <TopGames mobile={mobile} />
      <Streamers mobile={mobile} />
      <Providers mobile={mobile} />
      <TopEvents mobile={mobile} />
      <BetsFeed mobile={mobile} />
      <SeoFooter mobile={mobile} />
    </div>
  )
}

interface Props {
  tokens: Tokens
  isDesktop: boolean
  /** 390 (mobile) · 1440 · 2560 · 3440 */
  width: number
  bodyHeight: number
}

export function TokensScreen({ tokens, isDesktop, width, bodyHeight }: Props) {
  const vars = tokens as unknown as CSSProperties

  if (!isDesktop) {
    return (
      <div className="veg" style={{ ...vars, position: 'relative', height: '100%', overflow: 'hidden' }}>
        <Header mobile />
        <div className="no-scrollbar" style={{ height: '100%', overflowY: 'auto' }}>
          <Page mobile />
        </div>
        <NavPill />
      </div>
    )
  }

  const kk = K_FOR[width] ?? 1
  return (
    <div className="veg" style={{ ...vars, width, borderRadius: 14, overflow: 'hidden', border: '1px solid #1c1c22', boxShadow: 'var(--shadow-deep)', flex: '0 0 auto' }}>
      <WindowChrome />
      {/* zoom scales type, CTAs and spacing together at the big breakpoints */}
      <div style={{ position: 'relative', height: bodyHeight / kk, width: width / kk, zoom: kk } as CSSProperties}>
        <Header mobile={false} />
        <div className="no-scrollbar" style={{ height: '100%', overflowY: 'auto' }}>
          <Page mobile={false} />
        </div>
        <NavPill />
      </div>
    </div>
  )
}

function WindowChrome() {
  const dot = (c: string): CSSProperties => ({ width: 11, height: 11, borderRadius: '50%', background: c })
  return (
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#0c0c10', borderBottom: '1px solid #1a1a20' }}>
      <span style={dot('#FF5F57')} />
      <span style={dot('#FEBC2E')} />
      <span style={dot('#28C840')} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', border: '1px solid #23232a', borderRadius: 7, padding: '4px 16px', fontSize: 11, color: '#787878', fontFamily: 'var(--f-body)' }}>wtfgames.com</div>
      </div>
    </div>
  )
}

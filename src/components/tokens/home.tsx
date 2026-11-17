import { useEffect, useRef, useState } from 'react'
import { BETS, EVENTS, FOOTER, HERO_PICKS, JACKPOT, PROVIDERS, STREAMERS, STUDIO_GAMES } from '../../data/demo'
import { Icon, Svg } from './icons'
import { Arrows, GameTile, SectionHead, Toggle, t, type Nav } from './chrome'

/** Their home page ("/"), module for module. */

/** "What are you playing today?" — their mascot carousel, with our covers standing in for the mascots. */
function Hero({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  const size = mobile ? 132 : 164
  const rail = useRef<HTMLDivElement>(null)
  const [centreIdx, setCentreIdx] = useState(2)
  // Tapping a pick makes it the highlighted centre one (their carousel); a second tap opens it.
  useEffect(() => {
    const el = rail.current
    const centre = el?.children[centreIdx] as HTMLElement | undefined
    if (el && centre) el.scrollTo({ left: centre.offsetLeft - (el.clientWidth - centre.clientWidth) / 2, behavior: 'smooth' })
  }, [mobile, centreIdx])
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: mobile ? 18 : 28, justifyItems: 'center', minWidth: 0 }}>
      <div className="vh" style={{ fontSize: mobile ? t('typography-size-2xl') : t('typography-size-3xl'), textAlign: 'center' }}>
        What are you playing today?
      </div>
      <div ref={rail} className="no-scrollbar" style={{ display: 'flex', gap: mobile ? 12 : 20, alignItems: 'flex-end', overflowX: 'auto', width: '100%', justifyContent: mobile ? 'flex-start' : 'center', padding: '4px 4px 0', scrollSnapType: 'x mandatory' }}>
        {HERO_PICKS.map((g, i) => {
          const centre = i === centreIdx
          const s = centre ? size * 1.18 : size
          return (
            <button key={g.name} onClick={() => (centre ? nav.openGame(g) : setCentreIdx(i))} style={{ display: 'grid', gap: 10, justifyItems: 'center', flex: '0 0 auto', scrollSnapAlign: 'center', width: s, transition: 'width .2s' }}>
              <div style={{ width: s, height: s, borderRadius: 18, overflow: 'hidden', border: `2px solid ${centre ? t('brand-brand-color-1-500') : t('brand-secondary-6')}`, boxShadow: centre ? `0 0 0 4px ${t('brand-glass-effect-brand')}` : 'none', background: t('brand-secondary-5'), transition: 'width .2s, height .2s' }}>
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

export function JackpotBlock({ mobile }: { mobile: boolean }) {
  return (
    <section className="vcard" style={{ padding: mobile ? 12 : 16, display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 4px 4px' }}>
        <Svg d={Icon.trophy} size={18} stroke={2} />
        <span className="vh" style={{ fontSize: t('typography-size-lg-plus') }}>{JACKPOT.title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
        {JACKPOT.tiers.map((j, i) => (
          <JackpotTier key={j.tier} tier={j.tier} amount={j.amount} note={j.note} hot={i === 3} big={i >= 2} />
        ))}
      </div>
      <OptIn />
    </section>
  )
}

export function JackpotTier({ tier, amount, note, hot, big, compact }: { tier: string; amount: string; note: string; hot?: boolean; big?: boolean; compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 10 : 14, padding: compact ? '8px 10px' : '12px 14px', borderRadius: 12, background: t('brand-secondary-2'), minWidth: 0 }}>
      <span className="vc" style={{ width: compact ? 40 : 54, height: compact ? 40 : 54, borderRadius: 12, display: 'grid', placeItems: 'center', background: hot ? t('brand-brand-color-1-500') : t('brand-secondary-5'), color: hot ? t('brand-button-deposit-text') : t('brand-brand-color-1-400'), fontSize: compact ? t('typography-size-xs') : t('typography-size-sm'), letterSpacing: '.08em', textTransform: 'uppercase', flex: '0 0 auto' }}>
        {tier}
      </span>
      <div style={{ minWidth: 0 }}>
        <div className="vh" style={{ fontSize: compact ? t('typography-size-lg-plus') : big ? t('typography-size-2xl') : t('typography-size-xl'), fontVariantNumeric: 'tabular-nums' }}>{amount}</div>
        <div className="vmuted" style={{ fontSize: compact ? t('typography-size-sm') : t('typography-size-md'), marginTop: 2 }}>{note}</div>
      </div>
    </div>
  )
}

export function OptIn({ compact }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: compact ? '8px 12px' : '12px 14px', borderRadius: 12, background: t('brand-secondary-2') }}>
      {!compact && (
        <>
          <div style={{ flex: 1, fontSize: t('typography-size-md'), color: t('brand-primary-1-500') }}>
            {JACKPOT.optIn} <u>T&C</u>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: t('brand-secondary-6') }} />
        </>
      )}
      <div style={{ display: 'grid', gap: 4, justifyItems: 'center' }}>
        <Toggle on />
        <span className="vmuted" style={{ fontSize: t('typography-size-sm') }}>Opted In</span>
      </div>
    </div>
  )
}

function TopGames({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <section>
      <SectionHead title="Top" icon={<Svg d={Icon.dice} size={18} stroke={2} />} right={!mobile && <Arrows />} />
      {mobile ? (
        <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(2, auto)', gridAutoColumns: 'calc((100% - 12px) / 2.25)', gap: 12, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
          {STUDIO_GAMES.map((g) => (
            <GameTile key={g.name} game={g} onOpen={nav.openGame} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 14 }}>
          {STUDIO_GAMES.slice(0, 12).map((g) => (
            <GameTile key={g.name} game={g} onOpen={nav.openGame} />
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

export function Providers({ mobile }: { mobile: boolean }) {
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
            <OddsRow odds={e.odds} />
          </div>
        ))}
      </div>
    </section>
  )
}

/** Odds buttons — tapping one adds it to the slip (selected state), tapping again removes it. */
export function OddsRow({ odds, labels = ['1', 'X', '2'] }: { odds: string[]; labels?: string[] }) {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${odds.length}, 1fr)`, gap: 6 }}>
      {odds.map((o, i) => {
        const on = sel === i
        return (
          <button key={i} onClick={() => setSel(on ? null : i)} disabled={o === '—'} style={{ height: 38, borderRadius: t('border-radius-input'), background: on ? t('brand-brand-color-1-500') : t('brand-secondary-2'), color: on ? t('brand-button-deposit-text') : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: t('typography-size-md'), opacity: o === '—' ? 0.5 : 1, transition: 'background .12s' }}>
            <span style={{ opacity: on ? 0.75 : 1 }} className={on ? undefined : 'vfaint'}>{labels[i]}</span>
            <span style={{ fontWeight: 700 }}>{o}</span>
          </button>
        )
      })}
    </div>
  )
}

export function BetsFeed({ mobile, compact, table }: { mobile: boolean; compact?: boolean; table?: boolean }) {
  const tabs = ['All bets', 'High Rollers', 'Lucky Bets', 'Best Results']
  const [tab, setTab] = useState(0)
  const rows = BETS.slice(0, compact ? 4 : mobile ? 6 : table ? 10 : 8)
  const cell = (w: string) => ({ flex: `0 0 ${w}`, fontSize: t('typography-size-md') } as const)
  return (
    <section className="vcard" style={{ overflow: 'hidden' }}>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 6, padding: 10, overflowX: 'auto', borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
        {tabs.map((l, i) => (
          <button key={l} onClick={() => setTab(i)} className={`vtab${i === tab ? ' vtab-on' : ''}`} style={{ flex: mobile ? '0 0 auto' : 1, justifyContent: 'center' }}>
            {l}
          </button>
        ))}
      </div>
      {table && (
        <div className="vfaint" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', fontSize: t('typography-size-sm'), fontWeight: 700 }}>
          <span style={{ flex: 1 }}>Game</span>
          <span style={cell('26%')}>Player</span>
          <span style={{ ...cell('14%'), textAlign: 'right' }}>Bet</span>
          <span style={{ ...cell('14%'), textAlign: 'right' }}>Multiplier</span>
          <span style={{ ...cell('14%'), textAlign: 'right' }}>Win</span>
        </div>
      )}
      {table
        ? rows.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', background: i % 2 ? 'transparent' : t('brand-secondary-2') }}>
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, fontSize: t('typography-size-md'), fontWeight: 700 }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), color: t('brand-brand-color-1-400') }}>
                  <Svg d={Icon.gift} size={13} stroke={2} />
                </span>
                {b.game}
              </span>
              <span className="vmuted" style={cell('26%')}>@{b.nick}</span>
              <span style={{ ...cell('14%'), textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{(Number(b.amount.replace(/,/g, '')) / Math.max(parseFloat(b.mult.slice(1)) || 1, 0.1)).toFixed(2)} <span style={{ color: t('brand-info-500') }}>€</span></span>
              <span className="vmuted" style={{ ...cell('14%'), textAlign: 'right' }}>{b.mult}</span>
              <span className="vsuccess" style={{ ...cell('14%'), textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{b.amount} <span style={{ color: t('brand-info-500') }}>€</span></span>
            </div>
          ))
        : rows.map((b, i) => (
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

export function SeoFooter({ mobile }: { mobile: boolean }) {
  return (
    <footer style={{ display: 'grid', gap: 18, paddingBottom: mobile ? 90 : 40 }}>
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

export function HomePage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <>
      <Hero mobile={mobile} nav={nav} />
      <JackpotBlock mobile={mobile} />
      <TopGames mobile={mobile} nav={nav} />
      <Streamers mobile={mobile} />
      <Providers mobile={mobile} />
      <TopEvents mobile={mobile} />
      <BetsFeed mobile={mobile} />
      <SeoFooter mobile={mobile} />
    </>
  )
}

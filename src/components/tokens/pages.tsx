import { useState, type CSSProperties, type ReactNode } from 'react'
import { BETS, JACKPOT, type Game } from '../../data/demo'
import { BENTO, CASINO_CHIPS, CASINO_PROMOS, CATALOGUE, CONTESTS, CRASH, DISCOVER, HUB_BANNERS, INOUT, JUST_ADDED, LIVE_CATALOGUE, LIVE_CHIPS, LIVE_RAIL, LOOTBOXES, LOTTERIES, MATCHES, PACK, PAYMENTS, PREDICTIONS, PREDICTION_CHIPS, PROMO_BANNER, PROMO_HERO, PROMO_ICONS, PVP, QUICK_LINKS, SPORTS, SPORT_PROMOS, SPORT_TABS, TICKER, TOURNAMENTS, TRENDING, type PageId, type PromoCard } from '../../data/pages'
import { asset } from '../../lib/assets'
import { Icon, Svg } from './icons'
import { Arrows, Chips, GameGrid, GameTile, PageTitleBar, SectionHead, Toggle, t, type Nav } from './chrome'
import { BetsFeed, JackpotBlock, JackpotTier, OddsRow, OptIn, Providers, SeoFooter } from './home'

/** Every page of their demo other than home, each shaped like theirs. */

/** Edge-to-edge horizontal scroller on mobile; callers set their own display (grid or flex). */
const rail = (mobile: boolean): CSSProperties => (mobile ? { overflowX: 'auto', margin: '0 -16px', padding: '0 16px' } : {})

/* ------------------------------------------------------------------ /casino (hub) */

function HubBanners({ mobile }: { mobile: boolean }) {
  const [idx, setIdx] = useState(0)
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div onScroll={(e) => { const el = e.currentTarget; setIdx(Math.round(el.scrollLeft / (el.clientWidth * 0.98))) }} className="no-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollSnapType: 'x mandatory', margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
        {HUB_BANNERS.map((b) => (
          <button key={b.file} style={{ flex: mobile ? '0 0 calc(100% - 32px)' : '0 0 100%', scrollSnapAlign: 'start', aspectRatio: mobile ? '1104 / 674' : '1104 / 360', borderRadius: 18, overflow: 'hidden', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}` }}>
            <img src={b.src} alt={b.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {HUB_BANNERS.map((b, i) => (
          <span key={b.file} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 999, background: i === idx ? t('brand-brand-color-1-500') : t('brand-secondary-2'), transition: 'width .15s' }} />
        ))}
      </div>
    </div>
  )
}

/** Their illustrated quick-link discs — studio art inside a ringed circle. */
function QuickLinks({ nav, mobile }: { nav: Nav; mobile: boolean }) {
  const art = [asset('studios/studio-hamster.png'), asset('WTF Games/WTF_original_launchx.png'), asset('studios/royal-flush.png'), asset('studios/what-the-cluck.png'), asset('studios/key-art-hamster-vegas.jpg')]
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: mobile ? 28 : 30, overflowX: 'auto', padding: '4px 2px', margin: mobile ? '0 -16px' : 0, paddingLeft: mobile ? 16 : 2, paddingRight: mobile ? 16 : 2 }}>
      {QUICK_LINKS.map((q, i) => (
        <button key={q.label} onClick={() => nav.go(q.page)} style={{ display: 'grid', gap: 10, justifyItems: 'center', flex: '0 0 auto', width: mobile ? 96 : 92 }}>
          <span style={{ width: mobile ? 74 : 68, height: mobile ? 74 : 68, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${t('brand-brand-color-1-500')}`, boxShadow: `0 0 0 4px ${t('brand-glass-effect-brand')}`, background: t('brand-secondary-2') }}>
            <img src={art[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </span>
          <span style={{ fontSize: t('typography-size-md'), fontWeight: 600, textAlign: 'center', whiteSpace: 'nowrap' }}>{q.label}</span>
        </button>
      ))}
    </div>
  )
}

function TopWinners({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead title="Top Winners" icon={<Svg d={Icon.trophy} size={18} stroke={2} />} right={!mobile && <Arrows />} />
      <div className="no-scrollbar" style={{ display: mobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, overflowX: 'auto', margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
        {BETS.slice(0, 4).map((b, i) => (
          <div key={i} className="vcard" style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px 8px 8px', minWidth: mobile ? 200 : 0 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: t('brand-secondary-2'), color: t('brand-brand-color-1-400') }}>
              <Svg d={Icon.gift} size={15} stroke={2} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>{b.game}</div>
              <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>@{b.nick}</div>
            </div>
            <div className="vsuccess" style={{ marginLeft: 'auto', fontSize: t('typography-size-md'), fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {b.amount} <span style={{ color: t('brand-info-500') }}>€</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Bento({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  // Desktop: Tournaments wide over Live + Sports; Casino, Providers, Promotions tall on the right.
  const areas = mobile ? `"tour tour" "live sport" "casino prov" "casino promo"` : `"tour tour casino prov promo" "live sport casino prov promo"`
  const area: Record<string, string> = { Tournaments: 'tour', Live: 'live', Sports: 'sport', Casino: 'casino', Providers: 'prov', Promotions: 'promo' }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(5, minmax(0, 1fr))', gridTemplateAreas: areas, gridAutoRows: mobile ? 150 : 170, gap: 12 }}>
      {BENTO.map((b) => {
        const tall = b.label === 'Casino' || b.label === 'Providers' || b.label === 'Promotions'
        return (
          <button key={b.label} onClick={() => nav.go(b.page)} className="vcard" style={{ gridArea: area[b.label], position: 'relative', overflow: 'hidden', textAlign: 'left', padding: 16, display: 'flex', alignItems: tall ? 'flex-end' : 'flex-start', background: t('brand-secondary-5') }}>
            {/* art: wide tile → right-centred · tall tile → big and centred above the label · small tile → tucked bottom-right */}
            <img
              src={b.art}
              alt=""
              style={
                b.wide
                  ? { position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', width: '36%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 16 }
                  : tall && !mobile
                    ? { position: 'absolute', left: '50%', top: 22, transform: 'translateX(-50%)', width: '72%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 18 }
                    : { position: 'absolute', right: -8, bottom: -10, width: '62%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 16 }
              }
            />
            <span style={{ position: 'absolute', inset: 0, background: t('brand-gradient-11'), opacity: tall ? 0.7 : 0.5 }} />
            <span className="vh" style={{ position: 'relative', zIndex: 1, fontSize: t('typography-size-xl'), display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {b.wide && <Svg d={Icon.star} size={16} stroke={2.2} />}
              {b.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Lootboxes({ mobile }: { mobile: boolean }) {
  return (
    <section>
      <SectionHead title="Lootboxes" icon={<Svg d={Icon.gift} size={18} stroke={2} />} right={!mobile && <Arrows />} />
      <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: mobile ? 'calc((100% - 24px) / 2.3)' : 'calc((100% - 60px) / 6)', gap: 12, overflowX: 'auto', ...rail(mobile) }}>
        {LOOTBOXES.map((l) => (
          <button key={l.title} className="vcard" style={{ padding: '12px 10px 10px', display: 'grid', gap: 10, justifyItems: 'center', textAlign: 'center' }}>
            <img src={l.art} alt="" style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover' }} />
            <span className="vc" style={{ fontSize: t('typography-size-md'), lineHeight: 1.2, minHeight: 30 }}>{l.title}</span>
            <span className={l.free ? 'vtab' : 'vtab vtab-on'} style={{ height: 30, width: '100%', justifyContent: 'center', fontSize: t('typography-size-sm') }}>
              {!l.free && <Svg d={Icon.ball} size={13} stroke={2.2} />}
              {l.price}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function GameSection({ title, icon, games, mobile, rows = 2, nav }: { title: string; icon: ReactNode; games: Game[]; mobile: boolean; rows?: number; nav: Nav }) {
  const right = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={() => nav.go('slots')} className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>
        See All {mobile && '›'}
      </button>
      {!mobile && <Arrows />}
    </div>
  )
  return (
    <section>
      <SectionHead title={title} icon={icon} right={right} />
      {mobile ? (
        <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: `repeat(${rows}, auto)`, gridAutoColumns: 'calc((100% - 12px) / 2.25)', gap: 12, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
          {games.map((g, i) => (
            <GameTile key={g.name + i} game={g} onOpen={nav.openGame} />
          ))}
        </div>
      ) : (
        <GameGrid games={games.slice(0, rows * 6)} cols={6} onOpen={nav.openGame} />
      )}
    </section>
  )
}

/** Their centred main banner (ui-main-banner): art left, kicker + headline + CTA. */
function PromoBanner({ mobile }: { mobile: boolean }) {
  return (
    <div className="vcard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: mobile ? 16 : 40, padding: mobile ? '18px 16px' : '26px 32px', background: t('brand-secondary-1') }}>
      <img src={PROMO_BANNER.art} alt="" style={{ width: mobile ? 84 : 132, height: mobile ? 84 : 132, borderRadius: '50%', objectFit: 'cover', flex: '0 0 auto', boxShadow: `0 0 0 6px ${t('brand-glass-effect-brand')}` }} />
      <div style={{ display: 'grid', gap: 8, justifyItems: mobile ? 'start' : 'center', textAlign: mobile ? 'left' : 'center' }}>
        <span className="vfaint" style={{ fontSize: t('typography-size-sm'), letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700 }}>{PROMO_BANNER.kicker}</span>
        <span className="vh" style={{ fontSize: mobile ? t('typography-size-2xl') : t('typography-size-4xl'), lineHeight: 1 }}>{PROMO_BANNER.title}</span>
        <button className="vbtn vbtn-primary" style={{ height: 40, padding: '0 28px', marginTop: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {PROMO_BANNER.cta}
        </button>
      </div>
    </div>
  )
}

function LiveRail({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <section>
      <SectionHead title="Live Casino" icon={<Svg d={Icon.live} size={18} stroke={2} />} right={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><button onClick={() => nav.go('live')} className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>See All {mobile && '›'}</button>{!mobile && <Arrows />}</div>} />
      <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: mobile ? 'calc((100% - 12px) / 2.15)' : 'calc((100% - 36px) / 4)', gap: 12, overflowX: 'auto', ...rail(mobile) }}>
        {LIVE_RAIL.map((l) => (
          <button key={l.name} onClick={() => nav.go('live')} style={{ position: 'relative', aspectRatio: mobile ? '1 / 1' : '16 / 10', borderRadius: 14, overflow: 'hidden', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}` }}>
            <img src={l.src} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            {l.hot && (
              <span className="vlabel" style={{ position: 'absolute', top: 8, left: 8, background: t('brand-secondary-14'), color: t('brand-primary-1-600') }}>
                Hot 🔥
              </span>
            )}
            <span style={{ position: 'absolute', right: 8, bottom: 8, width: 22, height: 22, borderRadius: '50%', background: t('brand-secondary-24'), color: t('brand-primary-1-600'), display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, fontStyle: 'italic' }}>i</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Discover({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <section>
      <SectionHead title="Discover" icon={<Svg d={Icon.star} size={18} stroke={2} />} right={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><button onClick={() => nav.go('tournaments')} className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>See All {mobile && '›'}</button>{!mobile && <Arrows />}</div>} />
      <div className="no-scrollbar" style={{ display: mobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, overflowX: 'auto', ...rail(mobile) }}>
        {DISCOVER.map((c) => (
          <div key={c.title} style={{ flex: mobile ? '0 0 88%' : undefined }}>
            <PromoCardView c={c} />
          </div>
        ))}
      </div>
    </section>
  )
}

function Payments({ mobile }: { mobile: boolean }) {
  return (
    <section style={{ display: 'grid', gap: 14 }}>
      <SectionHead title="Available Payments" icon={<Svg d={Icon.cards} size={18} stroke={2} />} right={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><button className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>See All {mobile && '›'}</button>{!mobile && <Arrows />}</div>} />
      <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: mobile ? 'column' : 'row', gridTemplateColumns: mobile ? undefined : 'repeat(7, minmax(0, 1fr))', gridTemplateRows: mobile ? 'repeat(2, auto)' : undefined, gridAutoColumns: mobile ? 120 : undefined, gap: 10, overflowX: mobile ? 'auto' : undefined, ...rail(mobile) }}>
        {PAYMENTS.map((p, i) => (
          <span key={p + i} className="vcard" style={{ height: 46, display: 'grid', placeItems: 'center', padding: '0 10px', fontSize: t('typography-size-sm'), fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: t('brand-primary-1-500'), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {p}
          </span>
        ))}
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 28, overflowX: 'auto', padding: '10px 14px', borderRadius: 12, background: t('brand-secondary-1'), border: `1px solid ${t('brand-secondary-6')}`, ...rail(mobile) }}>
        {TICKER.map(([pair, px]) => (
          <span key={pair} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: t('typography-size-sm'), whiteSpace: 'nowrap' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: t('brand-brand-color-1-500') }} />
            <b>{pair}</b>
            <span className="vmuted">{px}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

export function CasinoHubPage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <>
      <HubBanners mobile={mobile} />
      <QuickLinks nav={nav} mobile={mobile} />
      <TopWinners mobile={mobile} />
      <Bento mobile={mobile} nav={nav} />
      <Chips items={CASINO_CHIPS} search mobile={mobile} />
      <Lootboxes mobile={mobile} />
      <GameSection title="Trending Now" icon={<Svg d={Icon.live} size={18} stroke={2} />} games={TRENDING} mobile={mobile} nav={nav} />
      <Providers mobile={mobile} />
      <GameSection title="Just Added" icon={<Svg d={Icon.slots} size={18} stroke={2} />} games={JUST_ADDED} mobile={mobile} rows={1} nav={nav} />
      <PromoBanner mobile={mobile} />
      <LiveRail mobile={mobile} nav={nav} />
      <Discover mobile={mobile} nav={nav} />
      <JackpotBlock mobile={mobile} />
      <GameSection title="Popular Crash" icon={<Svg d={Icon.arrow} size={18} stroke={2} />} games={CRASH} mobile={mobile} nav={nav} />
      <GameSection title="InOut" icon={<Svg d={Icon.chevronDown} size={18} stroke={2} />} games={INOUT} mobile={mobile} rows={1} nav={nav} />
      <BetsFeed mobile={mobile} table={!mobile} />
      <Payments mobile={mobile} />
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ /casino/slots · /live-casino/all */

export function CategoryPage({ mobile, nav, live }: { mobile: boolean; nav: Nav; live?: boolean }) {
  const games = live ? LIVE_CATALOGUE : CATALOGUE
  return (
    <>
      {mobile && <PageTitleBar title={live ? 'Live Casino' : 'Slots'} onBack={() => nav.go('home')} />}
      <Chips items={live ? LIVE_CHIPS : CASINO_CHIPS} search={!mobile} active={live ? 0 : 0} mobile={mobile} />
      <GameGrid games={games.slice(0, mobile ? 12 : 24)} cols={mobile ? 2 : 6} onOpen={nav.openGame} />
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ /sports · /sports/predictions */

function SportShell({ mobile, tab, children, nav }: { mobile: boolean; tab: number; children: ReactNode; nav: Nav }) {
  const strip: ReactNode[] = [Icon.gift, Icon.star, Icon.streamer, Icon.ball, Icon.trophy, Icon.flag, Icon.dice, Icon.cards, Icon.ticket, Icon.providers, Icon.chat, Icon.menu]
  return (
    <>
      <div className="vcard" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 6, overflowX: 'auto' }}>
        {strip.slice(0, mobile ? 5 : 12).map((d, i) => (
          <button key={i} style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', color: i === 0 ? t('brand-brand-color-1-500') : t('brand-primary-1-400') }}>
            <Svg d={d} size={19} stroke={1.9} />
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <button style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', color: t('brand-primary-1-600') }}>
          <Svg d={Icon.search} size={19} stroke={2} />
        </button>
      </div>
      <Chips items={SPORT_TABS} active={tab} mobile={mobile} onChange={(i) => nav.go(i === 2 ? 'predictions' : i === 3 ? 'lotteries' : 'sport')} />
      {children}
      <div style={{ position: 'sticky', bottom: mobile ? 84 : 16, display: 'flex', justifyContent: mobile ? 'center' : 'flex-end', pointerEvents: 'none' }}>
        <div role="button" className="vbtn vbtn-primary" style={{ pointerEvents: 'auto', height: 48, borderRadius: 999, padding: '0 10px 0 16px', gap: 12, boxShadow: t('brand-shadow-1'), cursor: 'pointer' }}>
          <Svg d={Icon.cards} size={18} stroke={2} />
          Betslip
          {!mobile && <span style={{ fontSize: t('typography-size-xs'), opacity: 0.7, letterSpacing: '.08em' }}>QUICK BET</span>}
          <Toggle />
        </div>
      </div>
    </>
  )
}

export function SportPage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  const [sport, setSport] = useState(0)
  return (
    <SportShell mobile={mobile} tab={0} nav={nav}>
      {mobile ? (
        <div className="no-scrollbar" style={{ display: 'flex', gap: 14, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
          {SPORTS.slice(0, 8).map((s, i) => (
            <button key={s} onClick={() => setSport(i)} style={{ display: 'grid', gap: 6, justifyItems: 'center', flex: '0 0 64px' }}>
              <span style={{ width: 54, height: 54, borderRadius: 14, display: 'grid', placeItems: 'center', background: i === sport ? t('brand-brand-color-1-500') : t('brand-secondary-5'), color: i === sport ? t('brand-button-deposit-text') : t('brand-primary-1-500') }}>
                <Svg d={Icon.ball} size={22} stroke={2} />
              </span>
              <span style={{ fontSize: t('typography-size-sm'), fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 64 }}>{s}</span>
            </button>
          ))}
        </div>
      ) : (
        <Chips items={SPORTS} active={sport} mobile={false} onChange={setSport} />
      )}
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {MATCHES.map((m) => (
          <div key={m.comp + m.home} className="vcard" style={{ padding: 14, display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span className="vfaint" style={{ fontSize: t('typography-size-sm'), fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.comp}</span>
              {m.live && <Svg d={Icon.live} size={14} stroke={2} color={t('brand-error-500')} />}
            </div>
            <div style={{ fontSize: t('typography-size-md'), fontWeight: 700, color: m.live ? t('brand-info-500') : t('brand-primary-1-300') }}>{m.status}</div>
            {[
              [m.home, m.hs],
              [m.away, m.as],
            ].map(([n, s]) => (
              <div key={String(n)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <span className="vc" style={{ fontSize: t('typography-size-lg'), display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: t('brand-secondary-2'), display: 'inline-block' }} />
                  {n}
                </span>
                <span className="vc" style={{ minWidth: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', background: t('brand-secondary-2'), fontSize: t('typography-size-md') }}>{s}</span>
              </div>
            ))}
            {m.live ? (
              <>
                <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>1x2</span>
                <OddsRow odds={m.odds} labels={['1', 'draw', '2']} />
              </>
            ) : (
              <button className="vbtn vbtn-soft" style={{ width: '100%' }}>
                Go to All Markets
              </button>
            )}
          </div>
        ))}
      </div>
    </SportShell>
  )
}

export function PredictionsPage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  const [cat, setCat] = useState(0)
  const [fmt, setFmt] = useState<'Probability' | 'Odds'>('Probability')
  const show = PREDICTIONS.filter((p) => cat === 0 || p.cat === PREDICTION_CHIPS[cat])
  const fmtVal = (pct: number) => (fmt === 'Probability' ? `${pct}%` : (100 / Math.max(pct, 1)).toFixed(2))
  return (
    <SportShell mobile={mobile} tab={2} nav={nav}>
      <Chips items={PREDICTION_CHIPS} active={0} mobile={mobile} onChange={setCat} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 600 }}>Odds Format:</span>
        {(['Probability', 'Odds'] as const).map((f) => (
          <button key={f} onClick={() => setFmt(f)} className={`vtab${fmt === f ? ' vtab-on' : ''}`} style={{ height: 28, fontSize: t('typography-size-sm') }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {show.map((p) => (
          <div key={p.q} className="vcard" style={{ padding: 14, display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="vlabel" style={{ background: t('brand-glass-effect-brand'), color: t('brand-brand-color-1-300') }}>{p.cat}</span>
              <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>Vol {p.vol}</span>
            </div>
            <div className="vc" style={{ fontSize: t('typography-size-lg'), lineHeight: 1.25 }}>{p.q}</div>
            <div style={{ height: 6, borderRadius: 999, background: t('brand-secondary-2'), overflow: 'hidden' }}>
              <div style={{ width: `${p.yes}%`, height: '100%', background: t('brand-brand-color-1-500') }} />
            </div>
            <OddsRow odds={[fmtVal(p.yes), fmtVal(100 - p.yes)]} labels={['Yes', 'No']} />
          </div>
        ))}
      </div>
    </SportShell>
  )
}

/* ------------------------------------------------------------------ /pokemon → Studio Packs */

export function PacksPage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  const tone = (k: string) => t(`brand-${k}-500`)
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(1)
  const total = `$${(Number(PACK.prices[price].replace(/[$,]/g, '')) * qty).toLocaleString()}`
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span className="vlabel" style={{ background: t('brand-brand-color-1-500'), color: t('brand-button-deposit-text') }}>Demo</span>
        <button className="vtab vtab-on" style={{ height: 30 }}>Starter</button>
        <span style={{ flex: 1 }} />
        <button className="vtab" style={{ height: 30 }}>
          <Svg d={Icon.cards} size={14} stroke={2} /> Inventory
        </button>
        <span className="vtab" style={{ height: 30 }}>
          Demo credits <b style={{ marginLeft: 6 }}>$1,000.00</b>
        </span>
      </div>
      <p className="vfaint" style={{ margin: 0, textAlign: 'center', fontSize: t('typography-size-sm') }}>Free play with simulated credits — pulls are illustrative and nothing is bought, sold, or shipped.</p>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)', gap: 20, alignItems: 'start' }}>
        <div className="vcard" style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: t('brand-secondary-2') }}>
          <img src={PACK.art} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="vh" style={{ fontSize: t('typography-size-3xl') }}>{PACK.name}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PACK.prices.map((p, i) => (
              <button key={p} onClick={() => setPrice(i)} className={`vtab${i === price ? ' vtab-on' : ''}`} style={{ height: 32 }}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {[
              ['Price', PACK.prices[price]],
              ['Est. value', PACK.ev],
              ['Payouts', PACK.payouts],
            ].map(([l, v]) => (
              <div key={l} className="vcard" style={{ padding: 12 }}>
                <div className="vfaint" style={{ fontSize: t('typography-size-xs'), letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>{l}</div>
                <div className="vh" style={{ fontSize: t('typography-size-xl'), marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="vcard" style={{ padding: 12, display: 'grid', gap: 8 }}>
            <div className="vfaint" style={{ fontSize: t('typography-size-xs'), letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700 }}>Odds</div>
            {PACK.odds.map((o) => (
              <div key={o.tier} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 10, alignItems: 'center', fontSize: t('typography-size-md') }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tone(o.tone) }} />
                <span style={{ fontWeight: 700 }}>{o.tier}</span>
                <span className="vfaint">{o.range}</span>
                <span style={{ fontWeight: 700, minWidth: 36, textAlign: 'right' }}>{o.pct}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="vmuted" style={{ fontSize: t('typography-size-md'), flex: 1 }}>Quantity</span>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="vbtn vbtn-soft vbtn-sm" style={{ width: 36, padding: 0 }}>−</button>
            <span className="vc" style={{ minWidth: 24, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="vbtn vbtn-soft vbtn-sm" style={{ width: 36, padding: 0 }}>+</button>
          </div>
          <button className="vbtn vbtn-primary" style={{ height: 48, fontSize: t('typography-size-lg-plus') }}>
            Open pack · {total}
          </button>
        </div>
      </div>
      <section>
        <SectionHead title="Top hits" icon={<Svg d={Icon.star} size={18} stroke={2} />} right={<span className="vlabel" style={{ background: t('brand-glass-effect-brand'), color: t('brand-brand-color-1-300') }}>Up to $200</span>} />
        <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: mobile ? 'calc((100% - 12px) / 2.25)' : 'calc((100% - 70px) / 6)', gap: mobile ? 12 : 14, overflowX: 'auto', ...rail(mobile) }}>
          {PACK.hits.map((g) => (
            <GameTile key={g.name} game={g} onOpen={nav.openGame} />
          ))}
        </div>
      </section>
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ /pvp */

export function PvpPage({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  return (
    <>
      <section>
        <SectionHead title={PVP.title} right={<button className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 700 }}>See All ›</button>} />
        <div className="vcard" style={{ position: 'relative', overflow: 'hidden', minHeight: mobile ? 300 : 360, padding: mobile ? 16 : 28, display: 'grid', placeItems: 'center', background: t('brand-secondary-1') }}>
          <img src={PVP.art} alt="" style={{ position: 'absolute', right: mobile ? -30 : 40, bottom: -20, width: mobile ? 180 : 260, opacity: 0.9 }} />
          <div style={{ position: 'relative', display: 'grid', placeItems: 'center', gap: 0 }}>
            <span className="vlabel" style={{ background: t('brand-secondary-5'), color: t('brand-primary-1-600'), marginBottom: 14 }}>{PVP.pot}</span>
            {[260, 190, 120].map((d, i) => (
              <span key={d} style={{ position: 'absolute', top: 24, width: d, height: d, borderRadius: '50%', border: `1px dashed ${t('brand-secondary-6')}`, transform: `translateY(-${d / 2}px) translateY(${(260 - d) / 2 + 20}px)`, opacity: 1 - i * 0.2 }} />
            ))}
            <span className="vh" style={{ position: 'relative', fontSize: t('typography-size-lg'), color: t('brand-primary-1-400'), marginTop: 110 }}>{PVP.state}</span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ position: 'absolute', top: 24 + [20, 60, 110, 150][i], left: [-40, 120, -110, 80][i] + 130, width: 10, height: 10, borderRadius: '50%', background: [t('brand-brand-color-1-500'), t('brand-brand-color-2-400'), t('brand-brand-color-3-400'), t('brand-primary-1-600')][i] }} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <SectionHead title="Games you may like" />
        <div className="no-scrollbar" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: mobile ? 'calc((100% - 12px) / 2.25)' : 'calc((100% - 84px) / 7)', gap: mobile ? 12 : 14, overflowX: 'auto', ...rail(mobile) }}>
          {PVP.like.map((g) => (
            <GameTile key={g.name} game={g} onOpen={nav.openGame} />
          ))}
        </div>
      </section>
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ /casino-promo/all-promo */

function PromoRail({ title, items, mobile }: { title: string; items: { title: string; copy: string; art: string }[]; mobile: boolean }) {
  return (
    <section>
      <SectionHead title={title} icon={<Svg d={Icon.star} size={18} stroke={2} />} right={!mobile && <Arrows />} />
      <div style={{ display: mobile ? 'grid' : 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {(mobile ? items.slice(0, 1) : items).map((p) => (
          <button key={p.title} className="vcard" style={{ display: 'flex', gap: 14, padding: 12, textAlign: 'left', alignItems: 'center' }}>
            <img src={p.art} alt="" style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover', flex: '0 0 auto', background: t('brand-secondary-2') }} />
            <div style={{ minWidth: 0 }}>
              <div className="vc" style={{ fontSize: t('typography-size-lg-plus'), lineHeight: 1.2 }}>{p.title}</div>
              <div className="vmuted" style={{ fontSize: t('typography-size-md'), marginTop: 6, lineHeight: 1.35 }}>{p.copy}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export function PromotionsPage({ mobile }: { mobile: boolean }) {
  const icons: ReactNode[] = [Icon.gift, Icon.star, Icon.live, Icon.trophy, Icon.share, Icon.ball, Icon.tag]
  return (
    <>
      <div className="vcard" style={{ position: 'relative', overflow: 'hidden', padding: mobile ? 18 : 32, minHeight: mobile ? 200 : 220, display: 'flex', alignItems: 'center', background: t('brand-glass-effect-brand') }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: mobile ? '62%' : 520, display: 'grid', gap: 10 }}>
          <div className="vh" style={{ fontSize: mobile ? t('typography-size-2xl') : t('typography-size-4xl') }}>{PROMO_HERO.title}</div>
          <div style={{ fontSize: t('typography-size-md'), color: t('brand-primary-1-500') }}>{PROMO_HERO.copy}</div>
          <button className="vbtn vbtn-primary" style={{ justifySelf: 'start', marginTop: 6 }}>
            {PROMO_HERO.cta}
          </button>
        </div>
        <img src={PROMO_HERO.art} alt="" style={{ position: 'absolute', right: mobile ? -20 : 40, bottom: -10, height: mobile ? '110%' : '120%', objectFit: 'contain' }} />
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', gap: mobile ? 24 : 36, overflowX: 'auto', justifyContent: mobile ? 'flex-start' : 'center', padding: '4px 2px' }}>
        {PROMO_ICONS.map((l, i) => (
          <button key={l} style={{ display: 'grid', gap: 8, justifyItems: 'center', flex: '0 0 auto', width: 96 }}>
            <span style={{ width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}`, color: t('brand-brand-color-1-500') }}>
              <Svg d={icons[i]} size={24} stroke={2} />
            </span>
            <span style={{ fontSize: t('typography-size-md'), fontWeight: 600, textAlign: 'center' }}>{l}</span>
          </button>
        ))}
      </div>
      <PromoRail title="Casino Promotions" items={CASINO_PROMOS} mobile={mobile} />
      <PromoRail title="Sports Promotions" items={SPORT_PROMOS} mobile={mobile} />
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ tournaments / contests / lotteries */

function PromoTabs({ page, nav }: { page: PageId; nav: Nav }) {
  const tabs: [string, PageId][] = [
    ['Tournaments', 'tournaments'],
    ['Contests', 'contests'],
    ['Lotteries', 'lotteries'],
  ]
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {tabs.map(([l, p]) => (
        <button key={l} onClick={() => nav.go(p)} className={`vtab${p === page ? ' vtab-on' : ''}`}>
          {l}
        </button>
      ))}
    </div>
  )
}

function PromoCardView({ c }: { c: PromoCard }) {
  return (
    <button className="vcard" style={{ display: 'flex', gap: 12, padding: 10, textAlign: 'left', alignItems: 'stretch' }}>
      <img src={c.art} alt="" style={{ width: 84, borderRadius: 10, objectFit: 'cover', flex: '0 0 auto', background: t('brand-secondary-2'), aspectRatio: '1 / 1.1' }} />
      <div style={{ minWidth: 0, display: 'grid', alignContent: 'start', gap: 4, flex: 1 }}>
        <div className="vc" style={{ fontSize: t('typography-size-md'), lineHeight: 1.2 }}>{c.title}</div>
        {c.prizeLabel && <div className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{c.prizeLabel}</div>}
        {c.copy && <div className="vfaint" style={{ fontSize: t('typography-size-sm'), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.copy}</div>}
        <div className="vh vsuccess" style={{ fontSize: t('typography-size-lg-plus'), fontVariantNumeric: 'tabular-nums' }}>{c.prize}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {c.meta.map(([k, v], i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: t('typography-size-sm') }}>
              {k && <span className="vfaint">{k}</span>}
              <span className="vlabel" style={{ background: t('brand-secondary-2'), color: t('brand-primary-1-600'), height: 20, textTransform: 'none', letterSpacing: 0 }}>{v}</span>
            </span>
          ))}
        </div>
        {c.players !== undefined && (
          <div className="vfaint" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: t('typography-size-sm') }}>
            <Svg d={Icon.star} size={12} stroke={2} /> {c.players}
          </div>
        )}
      </div>
    </button>
  )
}

export function PromoListPage({ mobile, nav, page }: { mobile: boolean; nav: Nav; page: 'tournaments' | 'contests' | 'lotteries' }) {
  const items = page === 'tournaments' ? TOURNAMENTS : page === 'contests' ? CONTESTS : LOTTERIES
  return (
    <>
      {mobile && <PageTitleBar title={page[0].toUpperCase() + page.slice(1)} onBack={() => nav.go('home')} />}
      <PromoTabs page={page} nav={nav} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {items.map((c, i) => (
          <PromoCardView key={c.title + i} c={c} />
        ))}
      </div>
      <SeoFooter mobile={mobile} />
    </>
  )
}

/* ------------------------------------------------------------------ /game/… */

export function GamePage({ mobile, nav, game }: { mobile: boolean; nav: Nav; game: Game }) {
  return (
    <>
      {!mobile && (
        <div className="vcard" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) auto', gap: 8, padding: 8, alignItems: 'center' }}>
          {JACKPOT.tiers.map((j, i) => (
            <JackpotTier key={j.tier} tier={j.tier} amount={j.amount} note={j.note} hot={i === 3} compact />
          ))}
          <OptIn compact />
        </div>
      )}
      <div className="vcard" style={{ overflow: 'hidden', background: t('brand-secondary-1') }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 48, padding: '0 12px', borderBottom: `1px solid ${t('brand-secondary-6')}` }}>
          <Toggle />
          <span className="vmuted" style={{ fontSize: t('typography-size-md'), fontWeight: 600 }}>Real Money</span>
          <span className="vc" style={{ flex: 1, textAlign: 'center', fontSize: t('typography-size-md'), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.name}</span>
          {[Icon.share, Icon.arrow].map((d, i) => (
            <button key={i} style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', color: t('brand-primary-1-400') }}>
              <Svg d={d} size={16} stroke={2} />
            </button>
          ))}
          <button onClick={() => nav.go('home')} aria-label="Close" style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', color: t('brand-primary-1-600') }}>
            ✕
          </button>
        </div>
        <div style={{ position: 'relative', aspectRatio: mobile ? '3 / 4' : '16 / 9', background: '#000', display: 'grid', placeItems: 'center' }}>
          <img src={game.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'blur(14px)' }} />
          <div style={{ position: 'relative', display: 'grid', justifyItems: 'center', gap: 16 }}>
            <img src={game.src} alt={game.name} style={{ width: mobile ? 160 : 220, borderRadius: 18, boxShadow: t('brand-shadow-1') }} />
            <button className="vbtn vbtn-primary" style={{ height: 48, padding: '0 28px', fontSize: t('typography-size-lg-plus') }}>
              Play {game.name}
            </button>
            <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>{game.provider} · game loads in this frame</span>
          </div>
        </div>
        <div style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px', borderTop: `1px solid ${t('brand-secondary-6')}` }}>
          <span className="vfaint" style={{ fontSize: t('typography-size-sm') }}>Provably fair · RTP 96.5%</span>
        </div>
      </div>
      {mobile && <JackpotTier tier="Mega" amount={JACKPOT.tiers[3].amount} note={JACKPOT.tiers[3].note} hot compact />}
      <SeoFooter mobile={mobile} />
    </>
  )
}

// Direction 1 — "The Shelf". The familiar casino lobby done properly: search
// and categories first, rails of square covers with titles, a WTF Studios band
// as the house shelf, and suggestion rows that say why they exist.
import { CATEGORIES, HAMSTER, LIVE, PROMOS, SHOWS, SLOTS, START_HERE, STUDIO_TITLES, game, moreLike, pickedFor } from '../../data/casino'
import { Btn, CasinoFooter, Grid, Head, InterestPills, Kicker, Pill, PromoTile, Rail, SearchBar, Section, SkeletonRail, StudiosLogo, Tag, Unavailable, k } from './parts'
import { CoverRow, DailySix, PreviewShelf, ids } from './modules'
import type { Ctx } from './types'

function SearchRow({ pad }: { pad: number }) {
  return (
    <>
      {/* Negative margin cancels the section gap so search and chips read as one block. */}
      <div style={{ padding: `10px ${pad}px 0`, marginBottom: -18 }}>
        <SearchBar />
      </div>
      {/* Only the category chips stay pinned — keeps the sticky strip short on a phone. */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(8,8,10,.94)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: `8px ${pad}px`, borderBottom: '1px solid var(--cs-line)' }}>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: `0 -${pad}px`, padding: `0 ${pad}px` }}>
          {CATEGORIES.map((c) => (
            <Pill key={c.id} size="sm" active={c.id === 'all'} tone={c.id === 'studios' ? 'lilac' : 'white'}>
              {c.label}
            </Pill>
          ))}
        </div>
      </div>
    </>
  )
}

/** Opening section: no video. One fixed-height row — the live show, then promos. */
function Opening({ ctx }: { ctx: Ctx }) {
  const live = game('wtf-live')
  const liveCard = (
    <div className="press" style={{ position: 'relative', flex: 1, minWidth: 0, aspectRatio: '1104 / 674', borderRadius: k(14), overflow: 'hidden', border: '1px solid var(--cs-line-2)', background: '#0a0a0c' }}>
      <img src={live.src} alt="" style={{ position: 'absolute', right: '-6%', top: 0, height: '100%', width: '52%', objectFit: 'cover', objectPosition: '60% 50%', WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 55%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, padding: `${k(12)} ${k(14)}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <Tag tone="red">Live · Fri 8pm</Tag>
        </div>
        <div style={{ maxWidth: '62%' }}>
          <div className="cd" style={{ fontSize: k(ctx.isDesktop ? 30 : 22) }}>WTF Live</div>
          <div style={{ fontSize: k(ctx.isDesktop ? 13 : 11), color: 'var(--cs-dim)', marginTop: 3, lineHeight: 1.3 }}>
            Free to play · <b style={{ color: 'var(--cs-green)' }}>$1,000</b> weekly
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Section pad={ctx.pad}>
      <div style={{ display: 'flex', gap: k(10) }}>
        {liveCard}
        <PromoTile promo={PROMOS[0]} flex />
        {ctx.isDesktop && <PromoTile promo={PROMOS[1]} flex />}
      </div>
    </Section>
  )
}

/** The house shelf: a violet band so WTF Studios reads as the defining section, not another provider. */
function StudiosShelf({ ctx }: { ctx: Ctx }) {
  const w = ctx.isDesktop ? 196 : 138
  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(72,0,255,.22) 0%, rgba(72,0,255,.04) 70%, transparent 100%)', borderTop: '1px solid rgba(164,139,255,.28)', padding: `${k(18)} 0 ${k(6)}` }}>
      <Section pad={ctx.pad}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: k(12) }}>
          <div>
            <StudiosLogo h={ctx.isDesktop ? 22 : 18} />
            <div className="cst" style={{ fontSize: k(ctx.isDesktop ? 28 : 22), marginTop: k(8), lineHeight: 1.05 }}>Only on WTF Games</div>
            <div style={{ fontSize: k(12), color: 'var(--cs-muted)', marginTop: k(5) }}>Made in-house by WTF Studios. Not on any other casino.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: k(10), flex: '0 0 auto' }}>
            <img src={HAMSTER} alt="" style={{ width: k(44), height: k(44), objectFit: 'contain' }} />
            {ctx.isDesktop && <Btn kind="lilac" size="sm">All Studios games</Btn>}
          </div>
        </div>
        <Rail pad={ctx.pad} gap={10}>
          {STUDIO_TITLES.map((g) => (
            <div key={g.id} style={{ flex: `0 0 ${k(w)}`, width: k(w) }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: k(14), overflow: 'hidden', border: '1px solid rgba(164,139,255,.5)', boxShadow: '0 10px 28px rgba(72,0,255,.22)' }} className="press">
                <img src={g.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {g.isNew && <div style={{ position: 'absolute', top: 8, left: 8 }}><Tag tone="lilac">New</Tag></div>}
              </div>
              <div className="cst" style={{ fontSize: k(13.5), marginTop: k(8), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
              <div style={{ fontSize: k(10.5), color: 'var(--cs-lilac)', marginTop: 2 }}>WTF Studios</div>
            </div>
          ))}
        </Rail>
      </Section>
    </div>
  )
}

/** First visit, no interests: the pills, plus a plain "house picks" default row. */
function Tune({ ctx }: { ctx: Ctx }) {
  return (
    <Section pad={ctx.pad}>
      <div style={{ background: 'var(--cs-surface)', border: '1px solid var(--cs-line)', borderRadius: k(16), padding: `${k(16)} ${k(16)} ${k(14)}` }}>
        <Kicker tone="green">Tune your lobby</Kicker>
        <div className="cd" style={{ fontSize: k(ctx.isDesktop ? 26 : 22), marginTop: k(8) }}>What are you into?</div>
        <div style={{ fontSize: k(12.5), color: 'var(--cs-muted)', marginTop: k(6), lineHeight: 1.45 }}>Pick a few and we build a row from them. Nothing else is used, and you can change it anytime.</div>
        <div style={{ marginTop: k(12) }}>
          <InterestPills selected={ctx.interests} onToggle={ctx.toggleInterest} size={ctx.isDesktop ? 'md' : 'sm'} wrap />
        </div>
      </div>
    </Section>
  )
}

export function ConceptShelf({ ctx }: { ctx: Ctx }) {
  const { isDesktop, pad, loggedIn, history, useHistory, interests, loading, unavailable } = ctx
  const gap = isDesktop ? 40 : 28
  const hist = loggedIn && useHistory ? history : []
  const picked = interests.length ? pickedFor(interests, ids(hist)) : null
  const more = hist.length ? moreLike(hist) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: k(gap), paddingTop: isDesktop ? k(26) : 0 }}>
      {!isDesktop && <SearchRow pad={pad} />}
      <Opening ctx={ctx} />
      <StudiosShelf ctx={ctx} />
      {ctx.preview && <PreviewShelf ctx={ctx} />}

      {loading ? (
        <>
          <Section pad={pad}><SkeletonRail n={6} w={isDesktop ? 164 : 118} pad={pad} /></Section>
          <Section pad={pad}><SkeletonRail n={6} w={isDesktop ? 164 : 118} pad={pad} /></Section>
        </>
      ) : (
        <>
          {picked ? (
            <CoverRow ctx={ctx} kicker="Suggested" kickerTone="green" title="Picked for you" explain={picked.because} action="Edit" onAction={ctx.openPrefs} games={picked.games} badges />
          ) : (
            <>
              <Tune ctx={ctx} />
              <CoverRow ctx={ctx} kicker="No history needed" title="House picks" explain="A mix for first-timers — Studios games, a couple of big slots, one live table. Not based on anything about you." games={START_HERE} badges />
            </>
          )}

          {hist.length > 0 && (
            <>
              <CoverRow ctx={ctx} kicker="Your history" title="Recently played" explain="Just what you played, most recent first. Nothing added." action="Clear" onAction={ctx.openPrefs} games={hist} small />
              {more && <CoverRow ctx={ctx} kicker="Suggested" kickerTone="green" title="More like what you played" explain={more.because} action="Change" onAction={ctx.openPrefs} games={more.games} />}
            </>
          )}

          <DailySix ctx={ctx} />
          <CoverRow ctx={ctx} title="Trending slots" action="See all" games={SLOTS} />
          {unavailable ? (
            <Section pad={pad}>
              <Head title="Live tables" size={isDesktop ? 24 : 22} />
              <Unavailable title="Live tables are taking a break" line="The live studio is offline right now. Everything else is open — we'll put the tables back the moment they're up." action="Notify me" />
            </Section>
          ) : (
            <CoverRow ctx={ctx} title="Live tables" action="See all" games={LIVE} />
          )}
          <CoverRow ctx={ctx} title="Game shows" action="See all" games={SHOWS} />

          <Section pad={pad}>
            <Head title="Promotions" action="See all" size={isDesktop ? 24 : 22} />
            {isDesktop ? (
              <Grid cols={3} gap={14}>{PROMOS.map((p) => <PromoTile key={p.title} promo={p} />)}</Grid>
            ) : (
              <Rail pad={pad} gap={10}>{PROMOS.map((p) => <PromoTile key={p.title} promo={p} w={290} />)}</Rail>
            )}
          </Section>
        </>
      )}
      <CasinoFooter pad={pad} isDesktop={isDesktop} />
    </div>
  )
}

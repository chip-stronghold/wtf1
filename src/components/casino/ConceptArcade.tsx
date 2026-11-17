// Direction 2 — "The Arcade". WTF Studios leads: a static key-art marquee with
// the chrome pill logo, cartridge-style Studios cards, and a bento grid where
// tile size = hierarchy. Navigation is a category mode strip (no sidebar).
import { ALL_STUDIO, KEY_ART, LIVE, PROMOS, SHOWS, SLOTS, START_HERE, STUDIOS_LOGO, STUDIO_TITLES, game, moreLike, pickedFor, type Game } from '../../data/casino'
import { Btn, CasinoFooter, Cover, Grid, Head, InterestPills, Kicker, PromoTile, Rail, Section, SkeletonRail, Tag, Unavailable, k } from './parts'
import { CoverRow, DailySix, PreviewShelf, ids } from './modules'
import type { Ctx } from './types'

/** Studios "cartridge": cover + a plate with the title in the studio face. */
function Cartridge({ g, w }: { g: Game; w: number }) {
  return (
    <div className="press" style={{ flex: `0 0 ${k(w)}`, width: k(w), borderRadius: k(14), overflow: 'hidden', border: '1px solid rgba(164,139,255,.5)', background: '#17122c', boxShadow: '0 14px 34px rgba(72,0,255,.28)' }}>
      <div style={{ position: 'relative', aspectRatio: '1 / 1' }}>
        <img src={g.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {g.isNew && <div style={{ position: 'absolute', top: 8, left: 8 }}><Tag tone="lilac">New</Tag></div>}
      </div>
      <div style={{ padding: `${k(8)} ${k(10)} ${k(9)}` }}>
        <div className="cst" style={{ fontSize: k(13), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
        <div style={{ fontSize: k(10), color: 'var(--cs-lilac)', marginTop: 2, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700 }}>WTF Studios</div>
      </div>
    </div>
  )
}

/** Opening: static key art, one headline, one action. The cards overlap its foot. */
function Marquee({ ctx }: { ctx: Ctx }) {
  const h = ctx.isDesktop ? 380 : 236
  const cw = ctx.isDesktop ? 168 : 128
  return (
    <div style={{ padding: `0 ${ctx.pad}px` }}>
      <div style={{ position: 'relative', height: k(h), borderRadius: k(18), overflow: 'hidden', border: '1px solid rgba(164,139,255,.35)', background: '#0f0a24' }}>
        {/* height > 100% crops the artefact strip baked into the foot of the key art */}
        <img src={KEY_ART} alt="" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '112%', objectFit: 'cover', objectPosition: ctx.isDesktop ? '50% 20%' : '14% 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: ctx.isDesktop ? 'linear-gradient(90deg, rgba(15,10,36,.96) 0%, rgba(15,10,36,.75) 34%, rgba(15,10,36,.1) 62%, rgba(15,10,36,0) 100%)' : 'linear-gradient(180deg, rgba(15,10,36,.15) 0%, rgba(15,10,36,.55) 45%, rgba(15,10,36,.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: ctx.isDesktop ? `${k(36)} ${k(40)}` : `${k(16)} ${k(16)} ${k(44)}`, display: 'flex', flexDirection: 'column', justifyContent: ctx.isDesktop ? 'center' : 'flex-end', maxWidth: ctx.isDesktop ? k(640) : undefined }}>
          <img src={STUDIOS_LOGO} alt="WTF Studios" style={{ height: k(ctx.isDesktop ? 30 : 22), width: 'auto', alignSelf: 'flex-start' }} />
          <div className="cst" style={{ fontSize: k(ctx.isDesktop ? 46 : 27), lineHeight: 1, marginTop: k(ctx.isDesktop ? 18 : 12), color: 'var(--cs-frost)', maxWidth: ctx.isDesktop ? undefined : '82%' }}>
            Games you won't find anywhere else
          </div>
          <div style={{ fontSize: k(ctx.isDesktop ? 15 : 12.5), color: 'var(--cs-dim)', marginTop: k(8), lineHeight: 1.45 }}>Built by WTF Studios. Only on WTF Games. Made to be shared.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: k(ctx.isDesktop ? 20 : 12) }}>
            <Btn kind="lilac" size={ctx.isDesktop ? 'lg' : 'md'}>Play Studios games</Btn>
            <Btn kind="ghost" size={ctx.isDesktop ? 'lg' : 'md'}>How they work</Btn>
          </div>
        </div>
      </div>
      <div className="no-scrollbar snap" style={{ display: 'flex', gap: k(10), overflowX: 'auto', margin: `-${k(30)} -${ctx.pad}px 0`, padding: `0 ${ctx.pad + 12}px 10px` }}>
        {STUDIO_TITLES.map((g) => (
          <Cartridge key={g.id} g={g} w={cw} />
        ))}
      </div>
    </div>
  )
}

/** Bento: one big contextual tile (last played, or the lead Studios title) + small tiles. */
function Bento({ ctx, hist }: { ctx: Ctx; hist: Game[] }) {
  const big = hist[0] ?? game('what-the-cluck')
  const rest = (hist.length ? [...hist.slice(1), ...START_HERE] : START_HERE).filter((g) => g.id !== big.id)
  const smalls = Array.from(new Map(rest.map((g) => [g.id, g])).values()).slice(0, ctx.isDesktop ? 8 : 5)
  const cols = ctx.isDesktop ? 6 : 3
  return (
    <Section pad={ctx.pad}>
      <Head
        kicker={hist.length ? 'Jump back in' : 'Start here'}
        kickerTone="green"
        title={hist.length ? 'Your lobby' : 'Where to start'}
        explain={hist.length ? 'Your last game, biggest. Then your recent ones, then house picks.' : 'A hand-picked mix. Tap interests below and this becomes yours.'}
        size={ctx.isDesktop ? 26 : 24}
      />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: k(10) }}>
        <div className="press" style={{ gridColumn: 'span 2', gridRow: 'span 2', position: 'relative', borderRadius: k(16), overflow: 'hidden', border: `1px solid ${big.studio ? 'rgba(164,139,255,.5)' : 'var(--cs-line-2)'}`, background: 'var(--cs-surface)' }}>
          <img src={big.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.85))' }} />
          <div style={{ position: 'absolute', top: k(10), left: k(10) }}>
            <Tag tone={hist.length ? 'green' : 'lilac'}>{hist.length ? 'Last played' : 'New'}</Tag>
          </div>
          <div style={{ position: 'absolute', left: k(14), right: k(14), bottom: k(12) }}>
            <div className={big.studio ? 'cst' : 'cd'} style={{ fontSize: k(ctx.isDesktop ? 30 : 22), lineHeight: 1 }}>{big.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: k(6) }}>
              <span style={{ fontSize: k(11), color: big.studio ? 'var(--cs-lilac)' : 'var(--cs-dim)' }}>{big.provider}</span>
              <Btn kind="white" size="sm">Play</Btn>
            </div>
          </div>
        </div>
        {smalls.map((g) => (
          <Cover key={g.id} game={g} showProvider={false} />
        ))}
      </div>
    </Section>
  )
}

function Poison({ ctx }: { ctx: Ctx }) {
  return (
    <Section pad={ctx.pad}>
      <Kicker tone="lilac">Pick your poison</Kicker>
      <div className="cd" style={{ fontSize: k(ctx.isDesktop ? 26 : 24), marginTop: k(8) }}>What's your thing?</div>
      <div style={{ fontSize: k(12.5), color: 'var(--cs-muted)', marginTop: k(6), lineHeight: 1.45, marginBottom: k(12) }}>Tap a few. We deal a row from them. Untap to drop it — that's the whole algorithm.</div>
      {ctx.isDesktop ? (
        <InterestPills selected={ctx.interests} onToggle={ctx.toggleInterest} size="lg" tone="lilac" wrap />
      ) : (
        <div className="no-scrollbar" style={{ overflowX: 'auto', margin: `0 -${ctx.pad}px`, padding: `0 ${ctx.pad}px` }}>
          <InterestPills selected={ctx.interests} onToggle={ctx.toggleInterest} size="lg" tone="lilac" />
        </div>
      )}
    </Section>
  )
}

export function ConceptArcade({ ctx }: { ctx: Ctx }) {
  const { isDesktop, pad, loggedIn, history, useHistory, interests, loading, unavailable } = ctx
  const gap = isDesktop ? 40 : 30
  const hist = loggedIn && useHistory ? history : []
  const picked = interests.length ? pickedFor(interests, ids(hist), isDesktop ? 12 : 6) : null
  const more = hist.length ? moreLike(hist) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: k(gap), paddingTop: k(isDesktop ? 26 : 14) }}>
      <Marquee ctx={ctx} />
      {ctx.preview && <PreviewShelf ctx={ctx} />}
      {loading ? (
        <Section pad={pad}><SkeletonRail n={6} w={isDesktop ? 164 : 118} pad={pad} /></Section>
      ) : (
        <>
          <Bento ctx={ctx} hist={hist} />
          <Poison ctx={ctx} />
          {picked && (
            <Section pad={pad}>
              <Head kicker="From your picks" kickerTone="green" title="Dealt for you" explain={picked.because} action="Edit" onAction={ctx.openPrefs} size={isDesktop ? 26 : 24} />
              <Grid cols={isDesktop ? 6 : 3}>{picked.games.map((g) => <Cover key={g.id} game={g} badge={g.isNew ? <Tag tone="lilac">New</Tag> : undefined} />)}</Grid>
            </Section>
          )}
          {more && <CoverRow ctx={ctx} kicker="Suggested" kickerTone="green" title="More like what you played" explain={more.because} action="Change" onAction={ctx.openPrefs} games={more.games} />}
          <DailySix ctx={ctx} sticker />
          <CoverRow ctx={ctx} kicker="The full catalogue" kickerTone="lilac" title="Every WTF Studios game" studio explain="Character games and the Originals — all made in-house." action="See all" games={ALL_STUDIO} ring="lilac" badges />
          <CoverRow ctx={ctx} title="Slots" action="See all" games={SLOTS} />
          {unavailable ? (
            <Section pad={pad}>
              <Head title="Live" size={isDesktop ? 26 : 24} />
              <Unavailable title="Live is offline for a bit" line="The dealer studio is down. Everything else is open." action="Notify me" />
            </Section>
          ) : (
            <CoverRow ctx={ctx} title="Live" action="See all" games={LIVE} />
          )}
          <CoverRow ctx={ctx} title="Game shows" action="See all" games={SHOWS} />
          <Section pad={pad}>
            <Head title="Promos" action="See all" size={isDesktop ? 26 : 24} />
            {isDesktop ? <Grid cols={3} gap={14}>{PROMOS.map((p) => <PromoTile key={p.title} promo={p} />)}</Grid> : <Rail pad={pad}>{PROMOS.map((p) => <PromoTile key={p.title} promo={p} w={290} />)}</Rail>}
          </Section>
        </>
      )}
      <CasinoFooter pad={pad} isDesktop={isDesktop} />
    </div>
  )
}

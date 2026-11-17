// Direction 3 — "The Feed". Mobile-native: a channels row up top, then a
// vertical feed of modules, each a card that says who it's from and why it's
// there. Wide poster cards, 2-up grids, and the swipe trainer as a first-class
// entry point. Desktop = feed column + a "Your picks" rail.
import type { ReactNode } from 'react'
import { HAMSTER, LIVE, PROMOS, SHOWS, SLOTS, START_HERE, STUDIO_TITLES, moreLike, pickedFor, type Game } from '../../data/casino'
import { Btn, CasinoFooter, Cover, Grid, Icon, InterestPills, Kicker, PromoTile, Rail, Svg, Tag, Unavailable, WideCard, k, linkBtn } from './parts'
import { DailySix, PreviewShelf, ids } from './modules'
import type { Ctx } from './types'

const CHANNELS: { id: string; label: string; icon?: ReactNode; img?: string; active?: boolean; lilac?: boolean }[] = [
  { id: 'all', label: 'For you', icon: Icon.home, active: true },
  { id: 'studios', label: 'Studios', img: HAMSTER, lilac: true },
  { id: 'live', label: 'Live', icon: Icon.live },
  { id: 'slots', label: 'Slots', icon: Icon.slots },
  { id: 'shows', label: 'Shows', icon: Icon.shows },
  { id: 'promos', label: 'Promos', icon: Icon.promos },
]

function Channels({ ctx }: { ctx: Ctx }) {
  const s = ctx.isDesktop ? 64 : 58
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: k(14), overflowX: 'auto', padding: `${k(14)} ${ctx.pad}px ${k(4)}` }}>
      {CHANNELS.map((c) => (
        <button key={c.id} className="press" style={{ background: 'none', border: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: k(6), flex: '0 0 auto', width: k(s + 8) }}>
          <span
            style={{
              width: k(s),
              height: k(s),
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: c.lilac ? 'radial-gradient(100% 100% at 50% 0%, #6a3bff, #2a0f7a)' : 'var(--cs-surface-2)',
              border: `2px solid ${c.active ? 'var(--cs-green)' : c.lilac ? 'var(--cs-lilac)' : 'var(--cs-line-2)'}`,
              color: c.active ? 'var(--cs-green)' : '#fff',
              overflow: 'hidden',
            }}
          >
            {c.img ? <img src={c.img} alt="" style={{ width: '78%', height: '78%', objectFit: 'contain', marginTop: '10%' }} /> : <Svg d={c.icon} size={24} stroke={c.active ? 2.1 : 1.8} />}
          </span>
          <span style={{ fontSize: k(10.5), fontWeight: 700, color: c.active ? '#fff' : c.lilac ? 'var(--cs-lilac)' : 'var(--cs-muted)' }}>{c.label}</span>
        </button>
      ))}
    </div>
  )
}

/** One feed module: who it's from, why it's here, then the content. */
function Post({
  ctx,
  name,
  line,
  avatar,
  kicker,
  action,
  onAction,
  children,
  studio,
}: {
  ctx: Ctx
  name: string
  line?: ReactNode
  avatar?: ReactNode
  kicker?: string
  action?: string
  onAction?: () => void
  children: ReactNode
  studio?: boolean
}) {
  return (
    <div style={{ margin: `0 ${ctx.pad}px`, background: 'var(--cs-surface)', border: `1px solid ${studio ? 'rgba(164,139,255,.4)' : 'var(--cs-line)'}`, borderRadius: k(18), overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: k(10), padding: `${k(12)} ${k(14)} ${k(10)}` }}>
        <span style={{ width: k(34), height: k(34), borderRadius: '50%', background: studio ? 'radial-gradient(100% 100% at 50% 0%, #6a3bff, #2a0f7a)' : 'var(--cs-surface-3)', display: 'grid', placeItems: 'center', overflow: 'hidden', flex: '0 0 auto', color: '#fff' }}>
          {avatar}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className={studio ? 'cst' : undefined} style={{ fontSize: k(14), fontWeight: 700, whiteSpace: 'nowrap' }}>{name}</span>
            {kicker && <Tag tone={kicker === 'Suggested' ? 'green' : 'dark'}>{kicker}</Tag>}
          </div>
          {line && <div style={{ fontSize: k(11.5), color: 'var(--cs-muted)', marginTop: 2, lineHeight: 1.35 }}>{line}</div>}
        </div>
        {action && (
          <button onClick={onAction} style={{ ...linkBtn, fontSize: k(12), textDecoration: 'none', color: studio ? 'var(--cs-lilac)' : 'var(--cs-green)', flex: '0 0 auto' }}>
            {action}
          </button>
        )}
      </div>
      <div style={{ padding: `0 ${k(14)} ${k(14)}` }}>{children}</div>
    </div>
  )
}

const avatarIcon = (d: ReactNode) => <Svg d={d} size={17} stroke={2} />

/** The optional trainer as a feed entry point, not a hidden setting. */
function Trainer({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ margin: `0 ${ctx.pad}px`, borderRadius: k(18), padding: `${k(16)} ${k(16)}`, background: 'radial-gradient(120% 120% at 100% 0%, #2a0f7a 0%, #120a2a 60%)', border: '1px solid rgba(164,139,255,.4)', display: 'flex', alignItems: 'center', gap: k(14) }}>
      <div style={{ flex: 1 }}>
        <Kicker tone="lilac">Optional · 30 seconds</Kicker>
        <div className="cd" style={{ fontSize: k(22), marginTop: k(6) }}>Train your feed</div>
        <div style={{ fontSize: k(12), color: 'var(--cs-dim)', marginTop: k(5), lineHeight: 1.45 }}>Like or skip eight games. Likes add their tags to your interests; skips change nothing. Undo anytime.</div>
        <div style={{ marginTop: k(12), display: 'flex', gap: 8, alignItems: 'center' }}>
          <Btn kind="lilac" size="sm" onClick={ctx.openSwipe}>Start</Btn>
          <button onClick={ctx.openPrefs} style={{ ...linkBtn, color: 'var(--cs-dim)', fontSize: k(12) }}>Or edit interests</button>
        </div>
      </div>
      <img src={HAMSTER} alt="" style={{ width: k(72), height: k(72), objectFit: 'contain', flex: '0 0 auto' }} />
    </div>
  )
}

function TwoUp({ games, ctx }: { games: Game[]; ctx: Ctx }) {
  return (
    <Grid cols={ctx.isDesktop ? 4 : 2} gap={10}>
      {games.map((g) => (
        <WideCard key={g.id} game={g} ratio="16 / 11" titleSize={ctx.isDesktop ? 18 : 15} studio={g.studio} tags={g.isNew ? <Tag tone="lilac">New</Tag> : undefined} />
      ))}
    </Grid>
  )
}

/** Desktop right rail: the same controls, always visible. */
export function FeedAside({ ctx }: { ctx: Ctx }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: k(16) }}>
      <div style={{ background: 'var(--cs-surface)', border: '1px solid var(--cs-line)', borderRadius: k(18), padding: k(16) }}>
        <Kicker tone="green">Your picks</Kicker>
        <div className="cd" style={{ fontSize: k(24), marginTop: k(6) }}>What you're into</div>
        <div style={{ fontSize: k(12), color: 'var(--cs-muted)', marginTop: k(6), lineHeight: 1.45 }}>These, and only these, drive the "Picked for you" post.</div>
        <div style={{ marginTop: k(12) }}>
          <InterestPills selected={ctx.interests} onToggle={ctx.toggleInterest} size="sm" wrap />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: k(14), alignItems: 'center' }}>
          <Btn kind="lilac" size="sm" onClick={ctx.openSwipe}>Train your feed</Btn>
          <button onClick={ctx.openPrefs} style={{ ...linkBtn, color: 'var(--cs-muted)', fontSize: k(12) }}>All preferences</button>
        </div>
      </div>
      {PROMOS.slice(0, 2).map((p) => (
        <PromoTile key={p.title} promo={p} />
      ))}
    </div>
  )
}

export function ConceptFeed({ ctx }: { ctx: Ctx }) {
  const { isDesktop, pad, loggedIn, history, useHistory, interests, loading, unavailable } = ctx
  const hist = loggedIn && useHistory ? history : []
  const picked = interests.length ? pickedFor(interests, ids(hist), isDesktop ? 8 : 4) : null
  const more = hist.length ? moreLike(hist, isDesktop ? 8 : 4) : null
  const studioLead = STUDIO_TITLES[1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: k(12), paddingTop: isDesktop ? k(12) : 0 }}>
      <Channels ctx={ctx} />

      <Post ctx={ctx} studio name="WTF Studios" line="Games made in-house. New drops land here first." avatar={<img src={HAMSTER} alt="" style={{ width: '80%', marginTop: '12%' }} />} action="See all" >
        <WideCard game={studioLead} ratio={isDesktop ? '21 / 9' : '16 / 9'} titleSize={isDesktop ? 30 : 22} studio tags={<Tag tone="lilac">New</Tag>} />
        <div style={{ marginTop: k(10) }}>
          <Rail pad={14} gap={8}>
            {STUDIO_TITLES.filter((g) => g.id !== studioLead.id).map((g) => (
              <Cover key={g.id} game={g} w={isDesktop ? 120 : 84} showProvider={false} ring="lilac" />
            ))}
          </Rail>
        </div>
      </Post>

      {ctx.preview && <PreviewShelf ctx={ctx} />}

      {loading ? (
        <div style={{ margin: `0 ${pad}px`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="skel" style={{ height: k(220), borderRadius: k(18) }} />
          <div className="skel" style={{ height: k(180), borderRadius: k(18) }} />
        </div>
      ) : (
        <>
          {picked ? (
            <Post ctx={ctx} name="Picked for you" kicker="Suggested" line={picked.because} avatar={avatarIcon(Icon.sliders)} action="Edit" onAction={ctx.openPrefs}>
              <TwoUp games={picked.games} ctx={ctx} />
            </Post>
          ) : (
            <Post ctx={ctx} name="Your picks" line="Tell us what you're into and this post fills up. Nothing else is used." avatar={avatarIcon(Icon.sliders)}>
              <InterestPills selected={interests} onToggle={ctx.toggleInterest} size="sm" wrap />
              <div style={{ marginTop: k(12) }}>
                <Kicker>Meanwhile · house picks</Kicker>
              </div>
              <div style={{ marginTop: k(8) }}>
                <TwoUp games={START_HERE.slice(0, isDesktop ? 4 : 2)} ctx={ctx} />
              </div>
            </Post>
          )}

          {!isDesktop && <Trainer ctx={ctx} />}

          {hist.length > 0 && (
            <Post ctx={ctx} name="Recently played" line="Your history, nothing added." avatar={avatarIcon(Icon.reset)} action="Clear" onAction={ctx.openPrefs}>
              <Rail pad={14} gap={8}>
                {hist.map((g) => (
                  <Cover key={g.id} game={g} w={isDesktop ? 120 : 84} showProvider={false} />
                ))}
              </Rail>
            </Post>
          )}
          {more && (
            <Post ctx={ctx} name="More like these" kicker="Suggested" line={more.because} avatar={avatarIcon(Icon.discover)} action="Change" onAction={ctx.openPrefs}>
              <TwoUp games={more.games} ctx={ctx} />
            </Post>
          )}

          <div style={{ background: 'var(--cs-surface)', border: '1px solid var(--cs-line)', borderRadius: k(18), margin: `0 ${pad}px`, padding: `${k(14)} 0 ${k(4)}` }}>
            <DailySix ctx={ctx} cols={isDesktop ? 6 : 3} />
          </div>

          <Post ctx={ctx} name="Trending slots" line="Most played this week, across everyone." avatar={avatarIcon(Icon.slots)} action="More">
            <TwoUp games={SLOTS.slice(0, isDesktop ? 8 : 4)} ctx={ctx} />
          </Post>

          <Post ctx={ctx} name="Live now" line={unavailable ? undefined : 'Real dealers, open tables.'} avatar={avatarIcon(Icon.live)} action={unavailable ? undefined : 'All tables'}>
            {unavailable ? (
              <Unavailable title="Live tables are offline" line="The dealer studio is down for now. Everything else is open." action="Notify me" />
            ) : (
              <Rail pad={14} gap={8}>
                {LIVE.map((g) => (
                  <Cover key={g.id} game={g} w={isDesktop ? 140 : 104} showProvider={false} />
                ))}
              </Rail>
            )}
          </Post>

          <Post ctx={ctx} name="Game shows" avatar={avatarIcon(Icon.shows)} action="All shows">
            <TwoUp games={SHOWS.slice(0, isDesktop ? 4 : 2)} ctx={ctx} />
          </Post>

          {!isDesktop && (
            <Post ctx={ctx} name="Promotions" line="Current offers. Terms on each." avatar={avatarIcon(Icon.promos)} action="See all">
              <PromoTile promo={PROMOS[1]} />
            </Post>
          )}
        </>
      )}
      <CasinoFooter pad={pad} isDesktop={isDesktop} />
    </div>
  )
}

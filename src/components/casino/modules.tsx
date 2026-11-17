// Content modules shared by the three directions: rows, daily set, previews.
import { useState, type ReactNode } from 'react'
import { STUDIO_TITLES, dailyPicks, type Game } from '../../data/casino'
import { Btn, Cover, Grid, Head, Icon, Rail, Section, Svg, Tag, k } from './parts'
import { dayFor, type Ctx } from './types'

export const ids = (gs: Game[]) => gs.map((g) => g.id)

/** A standard labelled row of square covers. */
export function CoverRow({
  ctx,
  title,
  kicker,
  kickerTone,
  explain,
  action,
  onAction,
  games,
  w,
  small,
  ring,
  studio,
  badges,
  unavailable,
}: {
  ctx: Ctx
  title: ReactNode
  kicker?: ReactNode
  kickerTone?: 'muted' | 'green' | 'lilac'
  explain?: ReactNode
  action?: string
  onAction?: () => void
  games: Game[]
  w?: number
  small?: boolean
  ring?: 'green' | 'lilac'
  studio?: boolean
  badges?: boolean
  unavailable?: boolean
}) {
  const width = w ?? (ctx.isDesktop ? 164 : 118)
  // Wide desktop rows: repeat covers so the rail fills the width (still scrolls).
  const tiles = ctx.isDesktop && games.length < 12 ? Array.from({ length: 12 }, (_, i) => games[i % games.length]) : games
  return (
    <Section pad={ctx.pad}>
      <Head title={title} kicker={kicker} kickerTone={kickerTone} explain={explain} action={action} onAction={onAction} studio={studio} size={ctx.isDesktop ? 24 : 22} />
      <Rail pad={ctx.pad} gap={small ? 8 : 10}>
        {tiles.map((g, i) => (
          <Cover
            key={`${g.id}-${i}`}
            game={g}
            w={small ? (ctx.isDesktop ? 120 : 92) : width}
            showProvider={!small}
            ring={ring}
            unavailable={unavailable && i === 1}
            badge={badges && g.isNew ? <Tag tone="lilac">New</Tag> : undefined}
          />
        ))}
      </Rail>
    </Section>
  )
}

/** Today's six — the daily set, same for everyone, no countdown. */
export function DailySix({ ctx, sticker, cols }: { ctx: Ctx; sticker?: boolean; cols?: number }) {
  const { games, label } = dailyPicks(dayFor(ctx.dayOffset))
  const n = cols ?? (ctx.isDesktop ? 6 : 3)
  return (
    <Section pad={ctx.pad}>
      <Head
        kicker={
          sticker ? (
            <span style={{ display: 'inline-block', transform: 'rotate(-3deg)' }}>
              <Tag tone="green">{label}</Tag>
            </span>
          ) : (
            `Fresh today · ${label}`
          )
        }
        title="Today's six"
        explain="Six games picked fresh each day. The same six for everyone, and no timer — tomorrow's set just turns up."
        size={ctx.isDesktop ? 24 : 22}
      />
      <Grid cols={n}>
        {games.slice(0, n === 3 ? 6 : n).map((g) => (
          <Cover key={g.id} game={g} />
        ))}
      </Grid>
    </Section>
  )
}

/**
 * Optional: WTF Studios preview shelf. Posters only — no gameplay footage exists
 * yet, so a "playing" state shows a labelled clip placeholder, never a fake clip.
 * Deliberate playback (tap), muted, reduced-motion safe, poster fallback.
 */
export function PreviewShelf({ ctx }: { ctx: Ctx }) {
  const [playing, setPlaying] = useState<string | null>(null)
  const w = ctx.isDesktop ? 300 : 232
  return (
    <Section pad={ctx.pad}>
      <Head
        kicker="Optional module · needs clips"
        kickerTone="lilac"
        title="See them move"
        studio
        explain="Short muted previews of WTF Studios games. Nothing autoplays — tap one to watch, tap again to stop."
        size={ctx.isDesktop ? 26 : 22}
      />
      <Rail pad={ctx.pad} gap={12} snap>
        {STUDIO_TITLES.map((g) => {
          const on = playing === g.id
          return (
            <div key={g.id} style={{ flex: `0 0 ${k(w)}`, width: k(w) }}>
              <div
                onClick={() => setPlaying(on ? null : g.id)}
                className="press"
                style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: k(14), overflow: 'hidden', border: `1px solid ${on ? 'var(--cs-lilac)' : 'rgba(164,139,255,.4)'}`, background: '#0f0f14' }}
              >
                {on ? (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'repeating-linear-gradient(135deg,#15112a 0 14px,#120e24 14px 28px)' }}>
                    <Tag tone="lilac">Clip placeholder</Tag>
                    <div style={{ fontSize: k(11), color: 'var(--cs-dim)', textAlign: 'center', padding: '0 20px', lineHeight: 1.4 }}>Preview footage to be produced · ~8 s · muted loop</div>
                    <div style={{ position: 'absolute', left: 12, right: 12, bottom: 10, height: 3, borderRadius: 2, background: 'rgba(255,255,255,.15)' }}>
                      <div style={{ width: '38%', height: '100%', borderRadius: 2, background: 'var(--cs-lilac)' }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={g.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.7))' }} />
                    <div style={{ position: 'absolute', left: 10, bottom: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,.7)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 999, padding: '5px 10px 5px 7px', fontSize: k(11), fontWeight: 700 }}>
                      <Svg d={Icon.play} size={12} fill="#fff" stroke={0} /> Preview
                    </div>
                    <div style={{ position: 'absolute', right: 10, bottom: 12, fontSize: k(10), color: 'var(--cs-dim)' }}>muted</div>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: k(8) }}>
                <div style={{ minWidth: 0 }}>
                  <div className="cst" style={{ fontSize: k(14), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
                  <div style={{ fontSize: k(10.5), color: 'var(--cs-lilac)', marginTop: 1 }}>WTF Studios</div>
                </div>
                <Btn kind="lilac" size="sm">
                  Play
                </Btn>
              </div>
            </div>
          )
        })}
      </Rail>
    </Section>
  )
}

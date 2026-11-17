import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { GAMES, INTEREST_LABEL, INTERESTS, type Game, type Interest } from '../../data/casino'
import { Btn, Icon, InterestPills, Kicker, Svg, Tag, k, linkBtn } from './parts'
import type { Ctx } from './types'

/* ------------------------------------------------------------------ frame */

function Backdrop({ onClose, children, sheet }: { onClose: () => void; children: ReactNode; sheet: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: sheet ? 'flex-end' : 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.62)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
      <div
        className="pop"
        style={{
          position: 'relative',
          width: sheet ? '100%' : k(560),
          maxHeight: sheet ? '90%' : '88%',
          background: '#0e0e12',
          border: '1px solid var(--cs-line-2)',
          borderRadius: sheet ? '22px 22px 0 0' : k(20),
          boxShadow: '0 30px 80px rgba(0,0,0,.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {sheet && <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--cs-line-2)', margin: '10px auto 0' }} />}
        {children}
      </div>
    </div>
  )
}

function Row({ title, line, children }: { title: string; line: string; children?: ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--cs-line)', padding: `${k(16)} 0` }}>
      <div style={{ fontSize: k(14), fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: k(12), color: 'var(--cs-muted)', marginTop: 3, lineHeight: 1.45 }}>{line}</div>
      {children && <div style={{ marginTop: k(12) }}>{children}</div>}
    </div>
  )
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (b: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!on)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: k(13), fontWeight: 600 }}>
      <span style={{ width: k(42), height: k(24), borderRadius: 999, background: on ? 'var(--cs-green)' : 'var(--cs-line-2)', position: 'relative', transition: 'background .15s', flex: '0 0 auto' }}>
        <span style={{ position: 'absolute', top: 2, left: on ? 'calc(100% - 22px)' : 2, width: k(20), height: k(20), borderRadius: '50%', background: on ? '#000' : '#fff', transition: 'left .15s' }} />
      </span>
      {label}
    </button>
  )
}

/* ------------------------------------------------------------------ prefs */

/**
 * "Your lobby" — every signal behind the suggestions, in one place, editable
 * and resettable. Reachable from each suggested row's "Edit"/"Change" link and
 * from Account. Preferences are device-local until the provider confirms
 * account-level storage.
 */
export function PrefsSheet({
  ctx,
  onClose,
  useHistory,
  onUseHistory,
  onClearHistory,
  onReset,
}: {
  ctx: Ctx
  onClose: () => void
  useHistory: boolean
  onUseHistory: (b: boolean) => void
  onClearHistory: () => void
  onReset: () => void
}) {
  const sheet = !ctx.isDesktop
  return (
    <Backdrop onClose={onClose} sheet={sheet}>
      <div style={{ padding: `${k(18)} ${k(20)} 0`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <Kicker tone="green">Preferences</Kicker>
          <div className="cd" style={{ fontSize: k(28), marginTop: k(6) }}>Your lobby</div>
          <div style={{ fontSize: k(12.5), color: 'var(--cs-muted)', marginTop: k(6), lineHeight: 1.45 }}>Everything that shapes what we suggest. Change or wipe it any time.</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--cs-line-2)', background: 'var(--cs-surface)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', flex: '0 0 auto' }}>
          <Svg d={Icon.x} size={16} stroke={2} />
        </button>
      </div>
      <div className="no-scrollbar" style={{ overflowY: 'auto', padding: `${k(14)} ${k(20)} 0` }}>
        <Row title="Interests" line={ctx.interests.length ? `Your "Picked for you" row is built from these — nothing else.` : 'Pick a few and you get a row built from them. Pick none and you get the house picks.'}>
          <InterestPills selected={ctx.interests} onToggle={ctx.toggleInterest} size="sm" wrap />
        </Row>
        <Row title="Recently played" line={ctx.history.length ? 'Your history is shown as-is. Suggestions based on it are labelled "Suggested" so they never get mixed up.' : "Nothing here yet. Play something and it'll show up — only if you're logged in."}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: k(12) }}>
            <Switch on={useHistory} onChange={onUseHistory} label="Use what I play to suggest more" />
            {ctx.history.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: k(8) }}>
                {ctx.history.map((g) => (
                  <img key={g.id} src={g.src} alt={g.title} title={g.title} style={{ width: k(40), height: k(40), borderRadius: 8, objectFit: 'cover', border: '1px solid var(--cs-line)' }} />
                ))}
                <button onClick={onClearHistory} style={{ ...linkBtn, marginLeft: 6, fontSize: k(12) }}>
                  Clear history
                </button>
              </div>
            )}
          </div>
        </Row>
        <Row title="Today's six" line="Six games change each day for everyone. Not based on you, so there's nothing to reset." />
        <Row title="Start again" line="Wipes your interests and history on this device. The lobby goes back to the first-visit layout.">
          <Btn kind="subtle" size="sm" onClick={onReset}>
            <Svg d={Icon.reset} size={14} stroke={2} /> Reset all suggestions
          </Btn>
        </Row>
        <div style={{ fontSize: k(11), color: 'var(--cs-faint)', lineHeight: 1.5, padding: `${k(4)} 0 ${k(14)}` }}>
          Saved on this device for now. Syncing preferences to your account depends on the platform provider — to be confirmed.
        </div>
      </div>
      <div style={{ padding: `${k(12)} ${k(20)} ${k(20)}`, borderTop: '1px solid var(--cs-line)' }}>
        <Btn kind="primary" full onClick={onClose}>
          Done
        </Btn>
      </div>
    </Backdrop>
  )
}

/* ------------------------------------------------------------------ swipe */

interface Decision {
  game: Game
  like: boolean
  /** Tags this like added that weren't already interests (so Undo can remove them). */
  added: Interest[]
}

/**
 * Optional "like / skip" discovery mode. Buttons are first-class (swipe is a
 * bonus), Undo is always there, and the rule is written on screen: a like adds
 * that game's tags to your interests; a skip changes nothing.
 */
export function SwipeMode({ ctx, onClose }: { ctx: Ctx; onClose: () => void }) {
  const deck = useMemo(() => {
    const hist = new Set(ctx.history.map((g) => g.id))
    const pool = GAMES.filter((g) => !hist.has(g.id))
    // Alternate Studios and partner titles so the deck feels mixed.
    const a = pool.filter((g) => g.studio)
    const b = pool.filter((g) => !g.studio)
    const out: Game[] = []
    for (let i = 0; out.length < 8 && (a[i] || b[i]); i++) {
      if (a[i]) out.push(a[i])
      if (b[i] && out.length < 8) out.push(b[i])
    }
    return out
  }, [ctx.history])
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [dx, setDx] = useState(0)
  const dragStart = useRef<number | null>(null)
  const idx = decisions.length
  const current = deck[idx]
  const done = !current

  const decide = (like: boolean) => {
    if (!current) return
    const added = like ? current.tags.filter((t) => !ctx.interests.includes(t)) : []
    if (added.length) ctx.setInterests([...ctx.interests, ...added])
    setDecisions((d) => [...d, { game: current, like, added }])
    setDx(0)
  }
  const undo = () => {
    const last = decisions[decisions.length - 1]
    if (!last) return
    if (last.added.length) ctx.setInterests(ctx.interests.filter((t) => !last.added.includes(t)))
    setDecisions((d) => d.slice(0, -1))
  }
  const restart = () => {
    const added = decisions.flatMap((d) => d.added)
    if (added.length) ctx.setInterests(ctx.interests.filter((t) => !added.includes(t)))
    setDecisions([])
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') decide(false)
      if (e.key === 'ArrowRight') decide(true)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const likes = decisions.filter((d) => d.like)
  const addedTags = Array.from(new Set(decisions.flatMap((d) => d.added)))
  const cardW = ctx.isDesktop ? 300 : 250

  const round = (bg: string, color: string, border?: string): CSSProperties => ({
    width: k(64),
    height: k(64),
    borderRadius: '50%',
    background: bg,
    color,
    border: border ?? '1px solid transparent',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
  })

  return (
    <div className="casino pop" style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'radial-gradient(120% 70% at 50% 0%, #1a0f3a 0%, #08080a 60%)', display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${k(14)} ${k(16)}` }}>
        <button onClick={onClose} aria-label="Exit" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.06)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Svg d={Icon.x} size={16} stroke={2} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <Kicker tone="lilac">Optional · Discovery</Kicker>
          <div className="cd" style={{ fontSize: k(18), marginTop: 4 }}>Train your picks</div>
        </div>
        <div style={{ width: 36, fontSize: k(12), fontWeight: 700, color: 'var(--cs-muted)', textAlign: 'right' }}>
          {Math.min(idx + 1, deck.length)}/{deck.length}
        </div>
      </div>

      <div style={{ fontSize: k(12), color: 'var(--cs-dim)', textAlign: 'center', padding: `0 ${k(28)}`, lineHeight: 1.45 }}>
        <b style={{ color: 'var(--cs-green)' }}>Like</b> adds that game's tags to your interests. <b>Skip</b> changes nothing. Undo any time.
      </div>

      {/* card */}
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: k(16), minHeight: 0 }}>
        {done ? (
          <div style={{ textAlign: 'center', maxWidth: 360 }}>
            <div className="cd" style={{ fontSize: k(34) }}>That's the lot.</div>
            <div style={{ fontSize: k(13.5), color: 'var(--cs-dim)', marginTop: k(10), lineHeight: 1.5 }}>
              {likes.length === 0
                ? 'No likes, so nothing changed. Your lobby is exactly as it was.'
                : addedTags.length === 0
                  ? `You liked ${likes.length} — all already covered by your interests, so nothing changed.`
                  : `You liked ${likes.length}, which added these to your interests:`}
            </div>
            {addedTags.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: k(12) }}>
                {addedTags.map((t) => (
                  <Tag key={t} tone="green">
                    {INTEREST_LABEL(t)}
                  </Tag>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: k(22), flexWrap: 'wrap' }}>
              <Btn kind="primary" onClick={onClose}>
                See my picks
              </Btn>
              <Btn kind="ghost" onClick={restart}>
                Start over
              </Btn>
            </div>
            <div style={{ marginTop: k(16) }}>
              <button onClick={() => { ctx.setInterests([]); onClose() }} style={{ ...linkBtn, color: 'var(--cs-muted)', fontSize: k(12) }}>
                Reset all my interests instead
              </button>
            </div>
          </div>
        ) : (
          <div
            onPointerDown={(e) => { dragStart.current = e.clientX; (e.target as HTMLElement).setPointerCapture?.(e.pointerId) }}
            onPointerMove={(e) => { if (dragStart.current !== null) setDx(e.clientX - dragStart.current) }}
            onPointerUp={() => {
              const d = dx
              dragStart.current = null
              if (Math.abs(d) > 80) decide(d > 0)
              else setDx(0)
            }}
            style={{
              width: k(cardW),
              borderRadius: k(22),
              background: 'var(--cs-surface)',
              border: `1px solid ${current.studio ? 'rgba(164,139,255,.5)' : 'var(--cs-line-2)'}`,
              boxShadow: '0 30px 60px rgba(0,0,0,.5)',
              transform: `translateX(${dx}px) rotate(${dx / 18}deg)`,
              transition: dragStart.current === null ? 'transform .18s ease' : 'none',
              touchAction: 'pan-y',
              userSelect: 'none',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img src={current.src} alt="" draggable={false} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }} />
            {dx > 30 && <div style={{ position: 'absolute', top: 16, left: 16, transform: 'rotate(-10deg)' }}><Tag tone="green">Like</Tag></div>}
            {dx < -30 && <div style={{ position: 'absolute', top: 16, right: 16, transform: 'rotate(10deg)' }}><Tag tone="dark">Skip</Tag></div>}
            <div style={{ padding: `${k(12)} ${k(14)} ${k(14)}` }}>
              <div className={current.studio ? 'cst' : 'cd'} style={{ fontSize: k(current.studio ? 20 : 24), lineHeight: 1 }}>{current.title}</div>
              <div style={{ fontSize: k(11.5), color: current.studio ? 'var(--cs-lilac)' : 'var(--cs-muted)', marginTop: 4 }}>{current.provider}</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: k(10) }}>
                {current.tags.map((t) => (
                  <Tag key={t} tone={ctx.interests.includes(t) ? 'green' : 'dark'}>
                    {INTERESTS.find((i) => i.id === t)?.label}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* controls */}
      {!done && (
        <div style={{ padding: `0 ${k(16)} ${k(22)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: k(12) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: k(26) }}>
            <button onClick={() => decide(false)} aria-label="Skip" className="press" style={round('rgba(255,255,255,.06)', '#fff', '1px solid rgba(255,255,255,.25)')}>
              <Svg d={Icon.x} size={26} stroke={2.2} />
            </button>
            <button onClick={undo} disabled={!decisions.length} aria-label="Undo" className="press" style={{ ...round('transparent', decisions.length ? '#fff' : 'var(--cs-faint)', '1px solid rgba(255,255,255,.15)'), width: k(48), height: k(48), opacity: decisions.length ? 1 : 0.5 }}>
              <Svg d={Icon.undo} size={20} stroke={2} />
            </button>
            <button onClick={() => decide(true)} aria-label="Like" className="press" style={round('var(--cs-green)', '#000')}>
              <Svg d={Icon.heart} size={26} stroke={2.2} fill="#000" />
            </button>
          </div>
          <div style={{ display: 'flex', gap: k(26), fontSize: k(10.5), fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--cs-faint)' }}>
            <span>Skip</span>
            <span>Undo</span>
            <span style={{ color: 'var(--cs-green)' }}>Like</span>
          </div>
          <div style={{ fontSize: k(11), color: 'var(--cs-faint)' }}>Swipe works too. Esc or ✕ to leave — nothing is lost.</div>
        </div>
      )}
    </div>
  )
}

import { useState, type CSSProperties, type ReactNode } from 'react'
import { asset } from '../../lib/assets'
import { DiscordIcon, XIcon } from '../auth/brandIcons'
import {
  PERIODS,
  consumedBonuses,
  favGames,
  kyc,
  money,
  pnl,
  profile,
  rewardsTotal,
  transactions,
  vipLedger,
  type Period,
  type PnlStats,
  type Tx,
} from '../../data/profile'
import { Card, Chip, DISPLAY, GhostButton, GreenButton, Row, cardBase } from './profileParts'

/* ═══════════════════════════════════════════════════════════════════════
   Shared modules for the account concepts. Everything here is mobile-first
   and takes `isDesktop` only where the layout genuinely changes.
   ═══════════════════════════════════════════════════════════════════════ */

export const RED = '#ff4d4d'
export const upColor = (isUp: boolean) => (isUp ? 'var(--c-green)' : RED)
const label: CSSProperties = { fontSize: 10.5, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }

/* ── period chips ───────────────────────────────────────────────────── */
export function PeriodChips({ period, onPeriod, size = 'md' }: { period: Period; onPeriod: (p: Period) => void; size?: 'sm' | 'md' }) {
  return (
    <div style={{ display: 'inline-flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 3 }}>
      {PERIODS.map((p) => {
        const on = p === period
        return (
          <button
            key={p}
            onClick={() => onPeriod(p)}
            style={{
              border: 'none',
              borderRadius: 9999,
              padding: size === 'sm' ? '4px 9px' : '6px 12px',
              fontSize: size === 'sm' ? 11 : 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--f-body)',
              background: on ? 'var(--c-green)' : 'transparent',
              color: on ? '#000' : 'var(--c-text-muted)',
              transition: 'all .12s',
            }}
          >
            {p}
          </button>
        )
      })}
    </div>
  )
}

/* ── sparkline / area chart ─────────────────────────────────────────── */
export function Spark({ data, isUp, height = 96, fill = true, id = 'spark' }: { data: number[]; isUp: boolean; height?: number; fill?: boolean; id?: string }) {
  const w = 640, h = 200
  const min = Math.min(...data), max = Math.max(...data)
  const nx = (i: number) => (i / (data.length - 1)) * w
  const ny = (v: number) => h - ((v - min) / (max - min || 1)) * (h * 0.84) - h * 0.08
  const pts = data.map((v, i) => [nx(i), ny(v)] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`
  const [ex, ey] = pts[pts.length - 1]
  const c = isUp ? '0,255,0' : '255,77,77'
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`rgba(${c},.38)`} />
          <stop offset="100%" stopColor={`rgba(${c},0)`} />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={`rgb(${c})`} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={ex} cy={ey} r={4} fill="#000" stroke={`rgb(${c})`} strokeWidth={3} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/* ── P&L hero: the number everyone asked for ────────────────────────── */
export function PnlHero({ stats, isUp, period, big = false, chart = true }: { stats: PnlStats; isUp: boolean; period: Period; big?: boolean; chart?: boolean }) {
  const c = upColor(isUp)
  return (
    <div>
      <div style={label}>{period === 'All' ? 'All-time' : period} profit / loss</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
        <span style={{ ...DISPLAY, fontSize: big ? 46 : 36, lineHeight: 1, color: c, textShadow: `0 0 26px ${isUp ? 'rgba(0,255,0,.4)' : 'rgba(255,77,77,.35)'}` }}>{money(stats.net, true)}</span>
        <span style={{ ...DISPLAY, fontSize: big ? 18 : 15, color: 'var(--c-text-dim)' }}>{stats.pct}</span>
      </div>
      {chart && <div style={{ marginTop: 10 }}><Spark data={stats.data} isUp={isUp} id={`spark-${period}-${isUp}`} /></div>}
    </div>
  )
}

/* ── small stat tiles in a row ──────────────────────────────────────── */
export function StatRow({ items, cols }: { items: { k: string; v: string; c?: string }[]; cols?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols ?? items.length},1fr)`, gap: 8 }}>
      {items.map((it) => (
        <div key={it.k} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--c-border)', borderRadius: 12, padding: '10px 12px', minWidth: 0 }}>
          <div style={{ ...label, fontSize: 9.5 }}>{it.k}</div>
          <div style={{ ...DISPLAY, fontSize: 18, marginTop: 4, color: it.c ?? '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.v}</div>
        </div>
      ))}
    </div>
  )
}

/* ── rewards given back (rakeback · lossback · level-ups) ───────────── */
export function RewardsBreakdown({ stats, isUp, compact = false }: { stats: PnlStats; isUp: boolean; compact?: boolean }) {
  const total = rewardsTotal(stats)
  const rows = [
    ['Rakeback', stats.rewards.rakeback, 'On every bet, win or lose'],
    ['Lossback', stats.rewards.lossback, isUp ? 'Only paid on net losses' : '10% of your net loss'],
    ['Level-up rewards', stats.rewards.levelUp, 'Cash on each VIP level'],
  ] as const
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={label}>Given back to you</div>
          <div style={{ ...DISPLAY, fontSize: compact ? 26 : 30, color: 'var(--c-green)', marginTop: 4, lineHeight: 1 }}>{money(total, true)}</div>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--c-text-muted)', textAlign: 'right', maxWidth: 160, lineHeight: 1.35 }}>
          on {stats.wagered} wagered{!isUp && <> · <span style={{ color: '#fff' }}>{Math.round((total / Math.abs(stats.net)) * 100)}% of your loss</span></>}
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
        {rows.map(([k, v, d], i) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: compact ? '8px 0' : '10px 0', borderTop: i ? '1px solid var(--c-border)' : 'none' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{k}</div>
              {!compact && <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 1 }}>{d}</div>}
            </div>
            <div style={{ ...DISPLAY, fontSize: 16, color: v ? '#fff' : 'var(--c-text-fainter)' }}>{v ? money(v, true) : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── money in / money out ───────────────────────────────────────────── */
export function MoneyFlow({ stats }: { stats: PnlStats }) {
  const max = Math.max(stats.deposits, stats.withdrawals, 1)
  const bar = (v: number, c: string) => (
    <div style={{ height: 6, borderRadius: 9999, background: 'rgba(255,255,255,.07)', overflow: 'hidden', marginTop: 6 }}>
      <div style={{ width: `${(v / max) * 100}%`, height: '100%', background: c, borderRadius: 9999 }} />
    </div>
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div>
        <div style={label}>Deposited</div>
        <div style={{ ...DISPLAY, fontSize: 20, marginTop: 3 }}>{money(stats.deposits)}</div>
        {bar(stats.deposits, 'var(--c-text-dim)')}
      </div>
      <div>
        <div style={label}>Withdrawn</div>
        <div style={{ ...DISPLAY, fontSize: 20, marginTop: 3, color: 'var(--c-green)' }}>{money(stats.withdrawals)}</div>
        {bar(stats.withdrawals, 'var(--c-green)')}
      </div>
    </div>
  )
}

/* ── favourite games ────────────────────────────────────────────────── */
export function FavGames({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
      {favGames.map((g, i) => (
        <div key={g.title} style={{ minWidth: 0 }}>
          <div style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--c-border)' }}>
            <img src={g.src} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: 6, left: 6, ...DISPLAY, fontSize: 10, background: i === 0 ? 'var(--c-green)' : 'rgba(0,0,0,.7)', color: i === 0 ? '#000' : '#fff', borderRadius: 6, padding: '2px 6px' }}>#{i + 1}</span>
          </div>
          {!compact && (
            <>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
              <div style={{ fontSize: 11, color: 'var(--c-text-muted)' }}>{g.wagered} · {g.bets} bets</div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── VIP map: tier, bar, what each level paid, what's next ──────────── */
export function TierBadge({ small = false }: { small?: boolean }) {
  return (
    <span style={{ ...DISPLAY, fontSize: small ? 10 : 11.5, color: '#000', background: 'linear-gradient(90deg,#cd7f32,#e6a86b)', borderRadius: 6, padding: small ? '2px 7px' : '3px 9px' }}>
      {profile.vip.tier} {profile.vip.level}
    </span>
  )
}
export function VipBar() {
  const v = profile.vip
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 7 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><TierBadge /><span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>{v.xp} / {v.xpNext} XP</span></span>
        <span style={{ fontSize: 12, color: 'var(--c-text-dim)' }}>{v.toNext} to Lvl {v.level + 1}</span>
      </div>
      <div style={{ height: 7, borderRadius: 9999, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <div style={{ width: `${v.progress * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--c-green),#7CFC00)', boxShadow: '0 0 12px rgba(0,255,0,.5)' }} />
      </div>
    </div>
  )
}
export function VipMap() {
  return (
    <div>
      <VipBar />
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
        {vipLedger.map((l, i) => (
          <div key={l.level} style={{ display: 'grid', gridTemplateColumns: '18px 1fr auto', gap: 12, alignItems: 'center', padding: '9px 0', borderTop: i ? '1px solid var(--c-border)' : 'none', opacity: l.done ? 1 : 0.75 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.done ? 'var(--c-green)' : 'transparent', border: `2px solid ${l.done ? 'var(--c-green)' : 'var(--c-border-alt)'}`, boxShadow: l.done ? '0 0 8px rgba(0,255,0,.5)' : 'none', justifySelf: 'center' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{l.level}</div>
              <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>{l.done ? `Reached ${l.date}` : l.date}</div>
            </div>
            <div style={{ ...DISPLAY, fontSize: 15, color: l.done ? 'var(--c-green)' : 'var(--c-text-dim)' }}>{l.done ? '+' : ''}{money(l.paid)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── share poster (portrait, the screenshot-ready artifact) ─────────── */
export type PosterKind = 'pnl' | 'rewards' | 'vip' | 'win'
export const POSTERS: { kind: PosterKind; label: string }[] = [
  { kind: 'pnl', label: 'P&L' },
  { kind: 'rewards', label: 'Rewards' },
  { kind: 'win', label: 'Best win' },
  { kind: 'vip', label: 'VIP' },
]

export function Poster({ kind, period, isUp, width = 240, anon = false }: { kind: PosterKind; period: Period; isUp: boolean; width?: number; anon?: boolean }) {
  const s = pnl(period, isUp)
  const c = upColor(isUp)
  const scale = width / 240
  const glow = kind === 'pnl' && !isUp ? 'rgba(255,77,77,.3)' : 'rgba(0,255,0,.32)'
  const handle = anon ? 'Hidden player' : `@${profile.username}`
  const body: Record<PosterKind, ReactNode> = {
    pnl: (
      <>
        <div style={label}>{period === 'All' ? 'All-time' : period} P&amp;L</div>
        <div style={{ ...DISPLAY, fontSize: 44, lineHeight: 1, color: c, marginTop: 6 }}>{s.pct}</div>
        <div style={{ ...DISPLAY, fontSize: 18, color: '#fff', marginTop: 4 }}>{money(s.net, true)}</div>
        <div style={{ marginTop: 12 }}><Spark data={s.data} isUp={isUp} height={70} id={`poster-${period}-${isUp}`} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10, fontSize: 11 }}>
          <div><div style={label}>Wagered</div><div style={{ ...DISPLAY, fontSize: 15 }}>{s.wagered}</div></div>
          <div><div style={label}>Bets</div><div style={{ ...DISPLAY, fontSize: 15 }}>{s.bets}</div></div>
        </div>
      </>
    ),
    rewards: (
      <>
        <div style={label}>Given back · {period}</div>
        <div style={{ ...DISPLAY, fontSize: 44, lineHeight: 1, color: 'var(--c-green)', marginTop: 6 }}>{money(rewardsTotal(s), true)}</div>
        <div style={{ fontSize: 12, color: 'var(--c-text-dim)', marginTop: 6 }}>Rakeback, lossback and level-ups on {s.wagered} wagered</div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Rakeback', s.rewards.rakeback], ['Lossback', s.rewards.lossback], ['Level-ups', s.rewards.levelUp]].map(([k, v]) => (
            <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}><span style={{ color: 'var(--c-text-muted)' }}>{k}</span><span style={{ ...DISPLAY, fontSize: 14 }}>{v ? money(v as number, true) : '—'}</span></div>
          ))}
        </div>
      </>
    ),
    win: (
      <>
        <div style={label}>Biggest win · {period}</div>
        <div style={{ ...DISPLAY, fontSize: 44, lineHeight: 1, color: 'var(--c-green)', marginTop: 6 }}>{s.biggestWin}</div>
        <div style={{ ...DISPLAY, fontSize: 15, color: '#fff', marginTop: 4 }}>50× · Big Bass Splash</div>
        <div style={{ marginTop: 12, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', aspectRatio: '16/9' }}>
          <img src={favGames[0].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </>
    ),
    vip: (
      <>
        <div style={label}>WTF VIP</div>
        <div style={{ ...DISPLAY, fontSize: 40, lineHeight: 1, marginTop: 6 }}>{profile.vip.tier} <span style={{ color: 'var(--c-green)' }}>{profile.vip.level}</span></div>
        <div style={{ fontSize: 12, color: 'var(--c-text-dim)', marginTop: 6 }}>{profile.vip.toNext} to level {profile.vip.level + 1} · {money(vipLedger[2].paid)} cash reward</div>
        <div style={{ marginTop: 14 }}><VipBar /></div>
      </>
    ),
  }
  return (
    <div
      style={{
        width,
        aspectRatio: '9 / 16',
        flex: '0 0 auto',
        borderRadius: 18 * scale,
        overflow: 'hidden',
        position: 'relative',
        background: `radial-gradient(120% 90% at 85% -5%, ${glow}, transparent 55%), radial-gradient(90% 60% at 0% 100%, rgba(0,255,0,.12), transparent 60%), linear-gradient(170deg,#0d140d 0%,#09090c 55%, #050507 100%)`,
        border: '1px solid rgba(255,255,255,.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,.6)',
        color: '#fff',
        fontFamily: 'var(--f-body)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, padding: 18, transform: `scale(${scale})`, transformOrigin: 'top left', width: 240, height: 240 * 16 / 9, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={asset('WTF_games.png')} alt="WTF Games" style={{ height: 26, width: 'auto' }} />
          <span style={{ fontSize: 10, color: 'var(--c-text-muted)' }}>{handle}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{body[kind]}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div>
            <div style={{ ...label, fontSize: 9 }}>Play with my code</div>
            <div style={{ ...DISPLAY, fontSize: 15, color: 'var(--c-green)', marginTop: 2 }}>{anon ? 'WTF' : 'ASHWTF'}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 6, background: 'repeating-conic-gradient(#fff 0 25%, #000 0 50%) 0 0 / 8px 8px', border: '3px solid #fff', opacity: 0.9 }} />
        </div>
      </div>
    </div>
  )
}

/* ── share sheet (bottom sheet on mobile, centred modal on desktop) ─── */
export function ShareSheet({ open, onClose, period, isUp, isDesktop, initial = 'pnl' }: { open: boolean; onClose: () => void; period: Period; isUp: boolean; isDesktop: boolean; initial?: PosterKind }) {
  const [kind, setKind] = useState<PosterKind>(initial)
  const [anon, setAnon] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!open) return null
  const btn = (bg: string, children: ReactNode, onClick?: () => void): ReactNode => (
    <button onClick={onClick} className="brighten" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 42, borderRadius: 10, border: bg === 'ghost' ? '1px solid var(--c-border-alt)' : 'none', background: bg === 'ghost' ? 'transparent' : bg, color: '#fff', fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 13, cursor: 'pointer', flex: 1, minWidth: 0 }}>{children}</button>
  )
  // Rendered inline (not portalled): the phone bezel / browser frame carry a
  // transform, so position:fixed is contained inside the device in review mode.
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: isDesktop ? 'center' : 'flex-end', justifyContent: 'center' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: isDesktop ? 460 : '100%', maxWidth: 520, background: '#0e0e12', border: '1px solid var(--c-border)', borderRadius: isDesktop ? 20 : '20px 20px 0 0', padding: isDesktop ? 22 : '14px 16px calc(18px + env(safe-area-inset-bottom))', color: '#fff', fontFamily: 'var(--f-body)' }}>
        {!isDesktop && <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--c-border-alt)', margin: '0 auto 12px' }} />}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: 0, ...DISPLAY, fontSize: 16 }}>Share</h3>
          <div style={{ display: 'inline-flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 3 }}>
            {POSTERS.map((p) => (
              <button key={p.kind} onClick={() => setKind(p.kind)} style={{ border: 'none', borderRadius: 9999, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--f-body)', background: kind === p.kind ? '#fff' : 'transparent', color: kind === p.kind ? '#000' : 'var(--c-text-muted)' }}>{p.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
          <Poster kind={kind} period={period} isUp={isUp} width={isDesktop ? 220 : 190} anon={anon} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, fontSize: 12.5, color: 'var(--c-text-dim)', padding: '8px 0 12px' }}>
          Hide my username
          <button onClick={() => setAnon((a) => !a)} aria-pressed={anon} style={{ width: 40, height: 22, borderRadius: 9999, border: 'none', cursor: 'pointer', background: anon ? 'var(--c-green)' : 'var(--c-border-alt)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 3, left: anon ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
          </button>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {btn('#000', <><XIcon size={15} /> Post on X</>)}
          {btn('#5865F2', <><DiscordIcon size={17} /> Discord</>)}
          {btn('ghost', copied ? 'Copied!' : 'Copy image', () => { setCopied(true); setTimeout(() => setCopied(false), 1400) })}
          {btn('ghost', 'Save image')}
        </div>
      </div>
    </div>
  )
}

export function ShareButton({ onClick, full = false, sm = false }: { onClick: () => void; full?: boolean; sm?: boolean }) {
  return (
    <button onClick={onClick} className="brighten" style={{ ...DISPLAY, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: full ? '100%' : undefined, height: sm ? 36 : 44, padding: sm ? '0 14px' : '0 20px', background: 'var(--c-green)', color: '#000', border: 'none', borderRadius: 10, fontSize: sm ? 12.5 : 14, cursor: 'pointer' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3m0 0L8 7m4-4l4 4" /></svg>
      Share card
    </button>
  )
}

/* ── bonuses, as production (three states) ─────────────────────────── */
function Empty({ children, cta }: { children: ReactNode; cta?: string }) {
  return (
    <div style={{ ...cardBase, padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, color: 'var(--c-text-muted)', fontSize: 13 }}>
      <span>{children}</span>
      {cta && <GhostButton sm>{cta}</GhostButton>}
    </div>
  )
}
export function BonusesReal({ isDesktop }: { isDesktop: boolean }) {
  const [filter, setFilter] = useState<'all' | 'active' | 'available' | 'consumed'>('all')
  const seg = (k: typeof filter, l: string, n?: number) => (
    <button key={k} onClick={() => setFilter(k)} style={{ border: 'none', borderRadius: 9999, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--f-body)', background: filter === k ? '#fff' : 'transparent', color: filter === k ? '#000' : 'var(--c-text-muted)', whiteSpace: 'nowrap' }}>{l}{n !== undefined && <span style={{ opacity: .6, marginLeft: 5 }}>{n}</span>}</button>
  )
  const show = (k: 'active' | 'available' | 'consumed') => filter === 'all' || filter === k
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="no-scrollbar" style={{ display: 'inline-flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 3, alignSelf: 'flex-start', maxWidth: '100%', overflowX: 'auto' }}>
        {seg('all', 'All')}{seg('active', 'Active', 0)}{seg('available', 'Available', 0)}{seg('consumed', 'Used', consumedBonuses.length)}
      </div>
      {show('active') && (
        <section>
          <h3 style={{ ...DISPLAY, fontSize: 14, margin: '0 0 10px' }}>Active</h3>
          <Empty cta="Promotions">No active bonuses. Claim one from Promotions.</Empty>
        </section>
      )}
      {show('available') && (
        <section>
          <h3 style={{ ...DISPLAY, fontSize: 14, margin: '0 0 10px' }}>Available</h3>
          <Empty cta="Promo codes">Nothing waiting. Got a code?</Empty>
        </section>
      )}
      {show('consumed') && (
        <section>
          <h3 style={{ ...DISPLAY, fontSize: 14, margin: '0 0 10px' }}>Used &amp; expired</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : '1fr', gap: 10 }}>
            {consumedBonuses.map((b, i) => (
              <div key={i} style={{ ...cardBase, padding: 14, display: 'flex', gap: 12, alignItems: 'center', opacity: .85 }}>
                {b.game ? (
                  <img src={b.game} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flex: '0 0 auto' }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(0,255,0,.1)', display: 'grid', placeItems: 'center', color: 'var(--c-green)', ...DISPLAY, fontSize: 16, flex: '0 0 auto' }}>$</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</span>
                    {b.amount && <span style={{ ...DISPLAY, fontSize: 15, color: 'var(--c-green)' }}>{b.amount}</span>}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--c-text-muted)', marginTop: 2 }}>{b.desc}</div>
                  {b.progress !== undefined && (
                    <div style={{ height: 4, borderRadius: 9999, background: 'rgba(255,255,255,.08)', marginTop: 8, overflow: 'hidden' }}><div style={{ width: `${b.progress * 100}%`, height: '100%', background: 'var(--c-green)' }} /></div>
                  )}
                  <div style={{ fontSize: 10.5, color: 'var(--c-text-faint)', marginTop: 6 }}>{b.tag}{b.expires ? ` · Expired ${b.expires}` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* ── history, as production (Casino / Payments, Today / 7d / Month, date range) ── */
const amtColor = (n: number) => (n > 0 ? 'var(--c-green)' : n < 0 ? 'var(--c-text-dim)' : 'var(--c-text-muted)')
const dot = (s: Tx['status']) => (s === 'Completed' ? 'var(--c-green)' : s === 'Pending' ? '#ffb020' : RED)

export function HistoryReal({ isDesktop, merged = false }: { isDesktop: boolean; merged?: boolean }) {
  const [kind, setKind] = useState<'all' | 'casino' | 'payment' | 'bonus'>(merged ? 'all' : 'casino')
  const [range, setRange] = useState('7d')
  const rows = transactions.filter((t) => kind === 'all' || t.kind === kind)
  const pill = (on: boolean): CSSProperties => ({ border: 'none', borderRadius: 9999, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--f-body)', background: on ? '#fff' : 'transparent', color: on ? '#000' : 'var(--c-text-muted)', whiteSpace: 'nowrap' })
  const group: CSSProperties = { display: 'inline-flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 3 }
  const kinds: [typeof kind, string][] = merged ? [['all', 'All'], ['casino', 'Bets'], ['payment', 'Payments'], ['bonus', 'Bonuses']] : [['casino', 'Casino'], ['payment', 'Payments']]
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: 10, justifyContent: 'space-between', alignItems: isDesktop ? 'center' : 'stretch', marginBottom: 14 }}>
        <div className="no-scrollbar" style={{ ...group, alignSelf: 'flex-start', maxWidth: '100%', overflowX: 'auto' }}>{kinds.map(([k, l]) => <button key={k} onClick={() => setKind(k)} style={pill(kind === k)}>{l}</button>)}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={group}>{[['today', 'Today'], ['7d', '7 days'], ['month', 'Month']].map(([k, l]) => <button key={k} onClick={() => setRange(k)} style={pill(range === k)}>{l}</button>)}</div>
          <button style={{ ...pill(false), border: '1px solid var(--c-border)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            Dates
          </button>
        </div>
      </div>
      {isDesktop ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1.4fr) minmax(0,1fr) 84px 50px 84px', gap: 12, padding: '0 4px 10px', ...label, borderBottom: '1px solid var(--c-border)' }}>
            <span>Status</span><span>Info</span><span>Transaction no.</span><span>Date</span><span>Time</span><span style={{ textAlign: 'right' }}>Amount</span>
          </div>
          {rows.map((t) => (
            <div key={t.id + t.time} style={{ display: 'grid', gridTemplateColumns: '100px minmax(0,1.4fr) minmax(0,1fr) 84px 50px 84px', gap: 12, alignItems: 'center', padding: '12px 4px', borderBottom: '1px solid var(--c-border)', fontSize: 13 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, color: 'var(--c-text-dim)' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: dot(t.status) }} />{t.status}</span>
              <span style={{ fontWeight: 600 }}>{t.info}</span>
              <span style={{ fontSize: 11, color: 'var(--c-text-fainter)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.id}</span>
              <span style={{ color: 'var(--c-text-muted)' }}>{t.date}</span>
              <span style={{ color: 'var(--c-text-muted)' }}>{t.time}</span>
              <span style={{ textAlign: 'right', ...DISPLAY, fontSize: 15, color: amtColor(t.amount) }}>{money(t.amount, true)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map((t, i) => (
            <div key={t.id + t.time} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderTop: i ? '1px solid var(--c-border)' : 'none' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot(t.status), flex: '0 0 auto' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.info}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 2 }}>{t.date} · {t.time}{t.status !== 'Completed' ? ` · ${t.status}` : ''}</div>
              </div>
              <span style={{ ...DISPLAY, fontSize: 16, color: amtColor(t.amount) }}>{money(t.amount, true)}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 12, color: 'var(--c-text-muted)' }}>
        <span>Showing {rows.length} of 477</span>
        <GhostButton sm>Load more</GhostButton>
      </div>
    </div>
  )
}

/* ── account: the production Overview, cleaned up ──────────────────── */
export function ProfileInfoCard() {
  const a = profile.address
  return (
    <Card title="Profile info" action={<GhostButton sm>Edit</GhostButton>}>
      <Row label="Email" value={profile.email} />
      <Row label="Given name" value={profile.givenName} />
      <Row label="Nationality" value={profile.nationality} />
      <Row label="DOB" value={profile.dob} />
      <Row label="Mobile number" value={profile.mobile} />
      <Row label="Street address" value={`${a.line}, ${a.city} ${a.region}, ${a.postcode}, ${a.country}`} />
      <Row label="Gender" value={profile.gender} last />
    </Card>
  )
}
export function PasswordCard() {
  return (
    <Card title="Password">
      <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--c-text-muted)', lineHeight: 1.5 }}>We'll email you a secure link to set a new password.</p>
      <GreenButton sm full>Change password</GreenButton>
    </Card>
  )
}
export function DocumentsCard() {
  return (
    <Card title="Documents">
      <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--c-text-muted)', lineHeight: 1.5 }}>Verify your account to unlock withdrawals and higher limits.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {kyc.map((k) => (
          <div key={k.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 11, padding: '10px 12px' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{k.label}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Chip status={k.status} />
              {k.status === 'requested' && <GhostButton sm>Upload</GhostButton>}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
export function AccountCards({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1.3fr 1fr' : '1fr', gap: 14 }}>
      <ProfileInfoCard />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <DocumentsCard />
        <PasswordCard />
      </div>
    </div>
  )
}

/* ── sub-nav (segmented on mobile, sticky inside the scroller) ──────── */
export function SubNav<T extends string>({ items, value, onChange, sticky = true, style }: { items: [T, string][]; value: T; onChange: (t: T) => void; sticky?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ position: sticky ? 'sticky' : undefined, top: 0, zIndex: 5, padding: sticky ? '8px 0' : 0, background: sticky ? 'var(--c-black)' : undefined, boxShadow: sticky ? '0 8px 12px -6px rgba(0,0,0,.6)' : undefined, ...style }}>
      <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 3 }}>
        {items.map(([k, l]) => {
          const on = value === k
          return (
            <button key={k} onClick={() => onChange(k)} style={{ ...DISPLAY, flex: 1, border: 'none', borderRadius: 9, padding: '9px 0', fontSize: 12.5, cursor: 'pointer', background: on ? 'var(--c-green)' : 'transparent', color: on ? '#000' : 'var(--c-text-muted)', transition: 'all .12s', whiteSpace: 'nowrap' }}>{l}</button>
          )
        })}
      </div>
    </div>
  )
}

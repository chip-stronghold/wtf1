import { useState, type CSSProperties, type ReactNode } from 'react'
import type { ProfileVersion } from '../../config'
import { ProfilePageLegacy } from './ProfilePageLegacy'
import { pnl, profile, rewardsTotal, money, type Period } from '../../data/profile'
import { Avatar, Card, DISPLAY, GhostButton, GreenButton, cardBase } from './profileParts'
import {
  AccountCards,
  BonusesReal,
  FavGames,
  HistoryReal,
  MoneyFlow,
  POSTERS,
  PeriodChips,
  PnlHero,
  Poster,
  RewardsBreakdown,
  ShareButton,
  ShareSheet,
  StatRow,
  SubNav,
  TierBadge,
  VipBar,
  VipMap,
  upColor,
  type PosterKind,
} from './profileModules'

/* ═══════════════════════════════════════════════════════════════════════
   Account page concepts. All four carry the production data (profile info,
   password, documents, bonuses in three states, casino + payments history)
   and add the new module: P&L by period, rewards given back, VIP map,
   favourite games, share card.

     01 · MVP strip     keep the three tabs, add one "Your numbers" card up top
     02 · Stats hub     stats-first account with a 4-tab sub-nav
     03 · Ledger        money in / money out, one merged activity feed
     04 · Share-first   portrait poster carousel is the hero
   ═══════════════════════════════════════════════════════════════════════ */

interface Props {
  version: ProfileVersion
  isDesktop: boolean
  /** Review state: show the module in profit (true) or loss (false). */
  pnlUp: boolean
}

const wrap = (isDesktop: boolean): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: isDesktop ? 18 : 14,
  padding: isDesktop ? '24px 28px 48px' : '12px 14px 40px',
  color: '#fff',
  fontFamily: 'var(--f-body)',
})

/* header: avatar · handle · tier · balance (shared by 01–03) */
function Header({ isDesktop, compact = false, children }: { isDesktop: boolean; compact?: boolean; children?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 12 : 14 }}>
      <Avatar size={isDesktop ? 72 : compact ? 46 : 56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ ...DISPLAY, fontSize: isDesktop ? 26 : compact ? 18 : 22, lineHeight: 1 }}>{profile.username}</span>
          <TierBadge small={!isDesktop} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 4 }}>Member since {profile.memberSince}</div>
      </div>
      {children}
    </div>
  )
}

function BalancePill({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 10, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Balance</div>
        <div style={{ ...DISPLAY, fontSize: isDesktop ? 18 : 16, lineHeight: 1.1 }}>{profile.balance.fiat}</div>
      </div>
      <GreenButton sm>{isDesktop ? 'Deposit' : '+'}</GreenButton>
    </div>
  )
}

/* ════════════════ 01 · MVP STRIP ════════════════ */
type Tab3 = 'overview' | 'bonuses' | 'history'
function ProfileV1({ isDesktop, pnlUp }: Props) {
  const [tab, setTab] = useState<Tab3>('overview')
  const [period, setPeriod] = useState<Period>('30D')
  const [share, setShare] = useState(false)
  const s = pnl(period, pnlUp)
  const numbers = (
    <Card pad={isDesktop ? 20 : 16} style={{ background: 'linear-gradient(160deg,#0f160f 0%,var(--c-panel) 60%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
        <h3 style={{ margin: 0, ...DISPLAY, fontSize: 15 }}>Your numbers</h3>
        <PeriodChips period={period} onPeriod={setPeriod} size="sm" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1.2fr 1fr' : '1fr', gap: isDesktop ? 24 : 14, alignItems: 'start' }}>
        <PnlHero stats={s} isUp={pnlUp} period={period} big={isDesktop} chart={isDesktop} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StatRow items={[{ k: 'Wagered', v: s.wagered }, { k: 'Given back', v: money(rewardsTotal(s), true), c: 'var(--c-green)' }, { k: 'Bets', v: String(s.bets) }]} />
          <VipBar />
          <ShareButton onClick={() => setShare(true)} full sm={!isDesktop} />
        </div>
      </div>
    </Card>
  )
  return (
    <div style={wrap(isDesktop)}>
      <Header isDesktop={isDesktop}>{isDesktop && <BalancePill isDesktop />}</Header>
      <SubNav<Tab3> items={[['overview', 'Overview'], ['bonuses', 'Bonuses'], ['history', 'History']]} value={tab} onChange={setTab} sticky={!isDesktop} />
      {tab === 'overview' && (
        <>
          {numbers}
          <AccountCards isDesktop={isDesktop} />
        </>
      )}
      {tab === 'bonuses' && <Card pad={isDesktop ? 22 : 16}><BonusesReal isDesktop={isDesktop} /></Card>}
      {tab === 'history' && <Card title="History" pad={isDesktop ? 22 : 16}><HistoryReal isDesktop={isDesktop} /></Card>}
      <ShareSheet open={share} onClose={() => setShare(false)} period={period} isUp={pnlUp} isDesktop={isDesktop} />
    </div>
  )
}

/* ════════════════ 02 · STATS HUB ════════════════ */
type Tab4 = 'stats' | 'bonuses' | 'history' | 'account'
function ProfileV2({ isDesktop, pnlUp }: Props) {
  const [tab, setTab] = useState<Tab4>('stats')
  const [period, setPeriod] = useState<Period>('30D')
  const [share, setShare] = useState(false)
  const s = pnl(period, pnlUp)
  const items: [Tab4, string][] = [['stats', 'Stats'], ['bonuses', 'Bonuses'], ['history', 'History'], ['account', 'Account']]

  const stats = (
    <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1.4fr 1fr' : '1fr', gap: 14 }}>
      <Card pad={isDesktop ? 22 : 16} style={{ gridColumn: isDesktop ? '1 / -1' : undefined, background: `radial-gradient(90% 80% at 100% 0%, ${pnlUp ? 'rgba(0,255,0,.14)' : 'rgba(255,77,77,.12)'}, transparent 55%), var(--c-panel)` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
          <PeriodChips period={period} onPeriod={setPeriod} />
          {isDesktop && <ShareButton onClick={() => setShare(true)} sm />}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: isDesktop ? 28 : 14, alignItems: 'end' }}>
          <PnlHero stats={s} isUp={pnlUp} period={period} big={isDesktop} />
          <StatRow cols={isDesktop ? 2 : 4} items={[{ k: 'Wagered', v: s.wagered }, { k: 'Bets', v: String(s.bets) }, { k: 'Win rate', v: s.winRate }, { k: 'Best win', v: s.biggestWin }]} />
        </div>
        {!isDesktop && <div style={{ marginTop: 14 }}><ShareButton onClick={() => setShare(true)} full sm /></div>}
      </Card>
      <Card title="Rewards" pad={isDesktop ? 22 : 16} action={<GhostButton sm>Rakeback info</GhostButton>}>
        <RewardsBreakdown stats={s} isUp={pnlUp} />
      </Card>
      <Card title="WTF VIP" pad={isDesktop ? 22 : 16} action={<GhostButton sm>All tiers</GhostButton>}>
        <VipMap />
      </Card>
      <Card title="Most played" pad={isDesktop ? 22 : 16} style={{ gridColumn: isDesktop ? '1 / -1' : undefined }}>
        <div style={{ maxWidth: isDesktop ? 520 : undefined }}><FavGames /></div>
      </Card>
    </div>
  )

  const body = (
    <>
      {tab === 'stats' && stats}
      {tab === 'bonuses' && <Card pad={isDesktop ? 22 : 16}><BonusesReal isDesktop={isDesktop} /></Card>}
      {tab === 'history' && <Card title="History" pad={isDesktop ? 22 : 16}><HistoryReal isDesktop={isDesktop} /></Card>}
      {tab === 'account' && <AccountCards isDesktop={isDesktop} />}
    </>
  )

  if (isDesktop) {
    // Desktop: left account nav (Shuffle-style), header + content right.
    return (
      <div style={{ ...wrap(true), flexDirection: 'row', alignItems: 'flex-start', gap: 22 }}>
        <nav style={{ ...cardBase, width: 220, flex: '0 0 auto', padding: 10, position: 'sticky', top: 24 }}>
          <div style={{ padding: '12px 12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--c-border)', marginBottom: 8 }}>
            <Avatar size={44} />
            <div style={{ minWidth: 0 }}>
              <div style={{ ...DISPLAY, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.username}</div>
              <div style={{ marginTop: 4 }}><TierBadge small /></div>
            </div>
          </div>
          {items.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', borderRadius: 9, padding: '10px 12px', fontFamily: 'var(--f-body)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: tab === k ? 'rgba(0,255,0,.12)' : 'transparent', color: tab === k ? 'var(--c-green)' : 'var(--c-text-dim)' }}>{l}</button>
          ))}
          <div style={{ borderTop: '1px solid var(--c-border)', marginTop: 8, paddingTop: 10 }}>
            <GreenButton sm full>Deposit</GreenButton>
          </div>
        </nav>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>{body}</div>
        <ShareSheet open={share} onClose={() => setShare(false)} period={period} isUp={pnlUp} isDesktop />
      </div>
    )
  }
  return (
    <div style={wrap(false)}>
      <Header isDesktop={false}><BalancePill isDesktop={false} /></Header>
      <SubNav<Tab4> items={items} value={tab} onChange={setTab} />
      {body}
      <ShareSheet open={share} onClose={() => setShare(false)} period={period} isUp={pnlUp} isDesktop={false} />
    </div>
  )
}

/* ════════════════ 03 · LEDGER ════════════════ */
type Tab3b = 'activity' | 'bonuses' | 'account'
function ProfileV3({ isDesktop, pnlUp }: Props) {
  const [tab, setTab] = useState<Tab3b>('activity')
  const [period, setPeriod] = useState<Period>('30D')
  const [share, setShare] = useState(false)
  const s = pnl(period, pnlUp)
  const c = upColor(pnlUp)
  const position = (
    <Card pad={isDesktop ? 22 : 16} style={{ background: 'linear-gradient(160deg,#0f160f 0%,var(--c-panel) 55%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Balance</div>
          <div style={{ ...DISPLAY, fontSize: isDesktop ? 36 : 30, lineHeight: 1, marginTop: 4 }}>{profile.balance.crypto.replace(/0+$/, '')} <span style={{ fontSize: 13, color: 'var(--c-green)' }}>{profile.balance.symbol}</span></div>
          <div style={{ fontSize: 12, color: 'var(--c-text-muted)', marginTop: 3 }}>≈ {profile.balance.fiat}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <GreenButton sm>Deposit</GreenButton>
          <GhostButton sm>Withdraw</GhostButton>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '18px 0 12px' }}>
        <span style={{ ...DISPLAY, fontSize: 13, color: 'var(--c-text-dim)' }}>Your position</span>
        <PeriodChips period={period} onPeriod={setPeriod} size="sm" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr 1fr' : '1fr 1fr', gap: 10 }}>
        <div style={{ gridColumn: isDesktop ? undefined : '1 / -1', ...cardBase, background: 'rgba(0,0,0,.35)', padding: '12px 14px' }}>
          <MoneyFlow stats={s} />
        </div>
        <div style={{ ...cardBase, background: 'rgba(0,0,0,.35)', padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Net P&amp;L</div>
          <div style={{ ...DISPLAY, fontSize: 22, color: c, marginTop: 4 }}>{money(s.net, true)}</div>
          <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 2 }}>{s.pct} on {s.wagered}</div>
        </div>
        <div style={{ ...cardBase, background: 'rgba(0,0,0,.35)', padding: '12px 14px' }}>
          <div style={{ fontSize: 10.5, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Given back</div>
          <div style={{ ...DISPLAY, fontSize: 22, color: 'var(--c-green)', marginTop: 4 }}>{money(rewardsTotal(s), true)}</div>
          <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginTop: 2 }}>rakeback · lossback · levels</div>
        </div>
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ flex: 1 }}><VipBar /></div>
        <ShareButton onClick={() => setShare(true)} sm />
      </div>
    </Card>
  )
  const feed = <Card title="Activity" pad={isDesktop ? 22 : 16}><HistoryReal isDesktop={isDesktop} merged /></Card>
  return (
    <div style={wrap(isDesktop)}>
      <Header isDesktop={isDesktop} compact={!isDesktop} />
      {isDesktop ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{position}{feed}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Rewards" pad={22}><RewardsBreakdown stats={s} isUp={pnlUp} compact /></Card>
            <Card pad={22}><BonusesReal isDesktop={false} /></Card>
            <AccountCards isDesktop={false} />
          </div>
        </div>
      ) : (
        <>
          {position}
          <SubNav<Tab3b> items={[['activity', 'Activity'], ['bonuses', 'Bonuses'], ['account', 'Account']]} value={tab} onChange={setTab} />
          {tab === 'activity' && (
            <>
              <Card title="Rewards" pad={16}><RewardsBreakdown stats={s} isUp={pnlUp} compact /></Card>
              {feed}
            </>
          )}
          {tab === 'bonuses' && <Card pad={16}><BonusesReal isDesktop={false} /></Card>}
          {tab === 'account' && <AccountCards isDesktop={false} />}
        </>
      )}
      <ShareSheet open={share} onClose={() => setShare(false)} period={period} isUp={pnlUp} isDesktop={isDesktop} initial="rewards" />
    </div>
  )
}

/* ════════════════ 04 · SHARE-FIRST ════════════════ */
function Accordion({ title, children, open: init = false, meta }: { title: string; children: ReactNode; open?: boolean; meta?: string }) {
  const [open, setOpen] = useState(init)
  return (
    <section style={{ ...cardBase, overflow: 'hidden' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '14px 16px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--f-body)' }}>
        <span style={{ ...DISPLAY, fontSize: 15 }}>{title}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--c-text-muted)' }}>
          {meta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      {open && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
    </section>
  )
}
function ProfileV4({ isDesktop, pnlUp }: Props) {
  const [period, setPeriod] = useState<Period>('30D')
  const [active, setActive] = useState<PosterKind>('pnl')
  const [share, setShare] = useState(false)
  const s = pnl(period, pnlUp)
  const posterW = isDesktop ? 200 : 210
  const carousel = (
    <div>
      <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
        <div style={{ display: 'inline-flex', gap: 3, background: 'rgba(255,255,255,.05)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 3 }}>
          {POSTERS.map((p) => (
            <button key={p.kind} onClick={() => setActive(p.kind)} style={{ border: 'none', borderRadius: 9999, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--f-body)', background: active === p.kind ? '#fff' : 'transparent', color: active === p.kind ? '#000' : 'var(--c-text-muted)' }}>{p.label}</button>
          ))}
        </div>
        <PeriodChips period={period} onPeriod={setPeriod} size="sm" />
      </div>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '4px 0 10px', margin: isDesktop ? 0 : '0 -14px', paddingLeft: isDesktop ? 0 : 14, paddingRight: isDesktop ? 0 : 14 }}>
        {POSTERS.map((p) => (
          <div key={p.kind} onClick={() => setActive(p.kind)} style={{ scrollSnapAlign: 'center', opacity: active === p.kind ? 1 : 0.55, transform: active === p.kind ? 'scale(1)' : 'scale(.96)', transition: 'all .2s', cursor: 'pointer' }}>
            <Poster kind={p.kind} period={period} isUp={pnlUp} width={posterW} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
        <ShareButton onClick={() => setShare(true)} full={!isDesktop} />
        {isDesktop && <GhostButton>Hide my stats</GhostButton>}
      </div>
    </div>
  )
  const sections = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Accordion title="Stats" open meta={`${period} · ${money(s.net, true)}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <StatRow cols={2} items={[{ k: 'Wagered', v: s.wagered }, { k: 'Given back', v: money(rewardsTotal(s), true), c: 'var(--c-green)' }, { k: 'Bets', v: String(s.bets) }, { k: 'Best win', v: s.biggestWin }]} />
          <VipBar />
          <FavGames compact />
        </div>
      </Accordion>
      <Accordion title="Rewards" meta={money(rewardsTotal(s), true)}><RewardsBreakdown stats={s} isUp={pnlUp} compact /></Accordion>
      <Accordion title="Bonuses" meta="0 active"><BonusesReal isDesktop={false} /></Accordion>
      <Accordion title="History"><HistoryReal isDesktop={false} /></Accordion>
      <Accordion title="Account" meta="AML needed"><AccountCards isDesktop={false} /></Accordion>
    </div>
  )
  return (
    <div style={wrap(isDesktop)}>
      <Header isDesktop={isDesktop} compact={!isDesktop}>{!isDesktop && <GhostButton sm>Hide stats</GhostButton>}</Header>
      {isDesktop ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 22, alignItems: 'start' }}>
          <Card pad={22} style={{ minWidth: 0 }}>{carousel}</Card>
          {sections}
        </div>
      ) : (
        <>
          {carousel}
          {sections}
        </>
      )}
      <ShareSheet open={share} onClose={() => setShare(false)} period={period} isUp={pnlUp} isDesktop={isDesktop} initial={active} />
    </div>
  )
}

export function ProfilePage(props: Props) {
  switch (props.version) {
    case 1: return <ProfileV1 {...props} />
    case 2: return <ProfileV2 {...props} />
    case 3: return <ProfileV3 {...props} />
    case 4: return <ProfileV4 {...props} />
    default: return <ProfilePageLegacy version={props.version} isDesktop={props.isDesktop} />
  }
}

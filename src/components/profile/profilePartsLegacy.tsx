import { useState, type CSSProperties, type ReactNode } from 'react'
import { kyc, legacyBonuses as availableBonuses, profile, transactions } from '../../data/profile'
import { Card, Chip, DISPLAY, GhostButton, GreenButton, Row, cardBase } from './profileParts'

/* Parts used only by the earlier account concepts (05–07). Kept verbatim. */
/* ── stat tile ──────────────────────────────────────────────────────────── */
export function StatTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ ...cardBase, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
      <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 24, marginTop: 6, color: accent ? 'var(--c-green)' : '#fff' }}>{value}</div>
    </div>
  )
}

/* ── VIP progress ───────────────────────────────────────────────────────── */
export function VipProgress({ compact }: { compact?: boolean }) {
  const v = profile.vip
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
          <span style={{ ...DISPLAY, fontSize: 12, color: '#000', background: 'linear-gradient(90deg,#cd7f32,#e6a86b)', borderRadius: 6, padding: '2px 8px', fontWeight: 900 }}>
            {v.tier} · Lvl {v.level}
          </span>
          {!compact && <span style={{ color: 'var(--c-text-muted)' }}>{v.xp} / {v.xpNext} XP</span>}
        </span>
        <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>Next: {v.next}</span>
      </div>
      <div style={{ height: 8, borderRadius: 9999, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <div style={{ width: `${v.progress * 100}%`, height: '100%', borderRadius: 9999, background: 'linear-gradient(90deg,var(--c-green),#7CFC00)', boxShadow: '0 0 12px rgba(0,255,0,.5)' }} />
      </div>
    </div>
  )
}

/* ── toggle switch ──────────────────────────────────────────────────────── */
function Toggle({ on: initial }: { on?: boolean }) {
  const [on, setOn] = useState(!!initial)
  return (
    <button
      onClick={() => setOn((o) => !o)}
      aria-pressed={on}
      style={{ width: 42, height: 24, borderRadius: 9999, border: 'none', cursor: 'pointer', background: on ? 'var(--c-green)' : 'var(--c-border-alt)', position: 'relative', transition: 'background .15s', flex: '0 0 auto' }}
    >
      <span style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
    </button>
  )
}

/* ════════════ shared content cards ════════════ */
export function ProfileDetailsCard() {
  const a = profile.address
  return (
    <Card title="Profile details" action={<GhostButton sm>Edit</GhostButton>}>
      <Row label="Username" value={profile.username} />
      <Row label="Email" value={profile.email} />
      <Row label="Date of birth" value={profile.dob} />
      <Row label="Nationality" value={profile.nationality} />
      <Row label="Mobile" value={profile.mobile} />
      <Row label="Address" value={`${a.line}, ${a.city}, ${a.postcode}, ${a.country}`} last />
    </Card>
  )
}

export function VerificationCard() {
  return (
    <Card title="Verification">
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
        Verify your account to unlock withdrawals and higher limits.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {kyc.map((k) => (
          <div key={k.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 11, padding: '11px 14px' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{k.label}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Chip status={k.status} />
              {k.status !== 'verified' && <GhostButton sm>{k.status === 'requested' ? 'Upload' : 'Verify'}</GhostButton>}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function SecurityCard() {
  return (
    <Card title="Security">
      <Row label="Password" value={<GhostButton sm>Change</GhostButton>} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--c-border)' }}>
        <span style={{ fontSize: 13, color: 'var(--c-text-muted)' }}>Two-factor authentication</span>
        <Toggle />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0' }}>
        <span style={{ fontSize: 13, color: 'var(--c-text-muted)' }}>Login alerts</span>
        <Toggle on />
      </div>
    </Card>
  )
}

export function PreferencesCard() {
  const items = [
    ['Email notifications', true],
    ['SMS notifications', false],
    ['Marketing & promos', true],
    ['Show me as online', false],
  ] as const
  return (
    <Card title="Preferences">
      {items.map(([label, on], i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: i < items.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
          <span style={{ fontSize: 13, color: 'var(--c-text-muted)' }}>{label}</span>
          <Toggle on={on} />
        </div>
      ))}
    </Card>
  )
}

export function BalanceCard({ big }: { big?: boolean }) {
  const b = profile.balance
  return (
    <Card style={{ background: 'linear-gradient(135deg,#0f1a0f,#0e0e12)' }}>
      <div style={{ fontSize: 11, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Total balance</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
        <span style={{ ...DISPLAY, fontWeight: 900, fontSize: big ? 38 : 30 }}>{b.crypto}</span>
        <span style={{ fontSize: 13, color: 'var(--c-green)', fontWeight: 700 }}>{b.symbol}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--c-text-muted)', marginTop: 2 }}>≈ {b.fiat}</div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <GreenButton sm>Deposit</GreenButton>
        <GhostButton sm>Withdraw</GhostButton>
      </div>
    </Card>
  )
}

/* ════════════ Bonuses panel (shared) ════════════ */
function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div style={{ ...cardBase, padding: '26px 20px', textAlign: 'center', color: 'var(--c-text-muted)', fontSize: 13 }}>{children}</div>
  )
}
export function BonusesPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h3 style={{ ...DISPLAY, fontWeight: 900, fontSize: 15, margin: '0 0 12px' }}>Active bonuses</h3>
        <EmptyState>No active bonuses yet — claim one below to get started.</EmptyState>
      </div>
      <div>
        <h3 style={{ ...DISPLAY, fontWeight: 900, fontSize: 15, margin: '0 0 12px' }}>Available bonuses</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
          {availableBonuses.map((b) => (
            <div key={b.title} style={{ ...cardBase, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--c-green)', background: 'rgba(0,255,0,.14)', border: '1px solid rgba(0,255,0,.4)', borderRadius: 9999, padding: '3px 10px' }}>{b.tag}</span>
              <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 17, lineHeight: 1 }}>{b.title}</div>
              {b.amount && <div style={{ fontSize: 13, color: 'var(--c-green)', fontWeight: 700 }}>{b.amount}</div>}
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--c-text-muted)', lineHeight: 1.5, flex: 1 }}>{b.desc}</p>
              <GreenButton sm full>Claim</GreenButton>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ ...DISPLAY, fontWeight: 900, fontSize: 15, margin: '0 0 12px' }}>Inactive &amp; consumed</h3>
        <EmptyState>Nothing here yet.</EmptyState>
      </div>
    </div>
  )
}

/* ════════════ History panel (shared, responsive) ════════════ */
const fmt = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}US$${Math.abs(n).toFixed(2)}`
const amtColor = (n: number) => (n > 0 ? 'var(--c-green)' : n < 0 ? '#ff6b6b' : 'var(--c-text-muted)')

function HistoryFilters() {
  const [range, setRange] = useState('today')
  const [kind, setKind] = useState('casino')
  const pill = (active: boolean): CSSProperties => ({
    border: '1px solid var(--c-border-alt)',
    background: active ? 'var(--c-green)' : 'transparent',
    color: active ? '#000' : 'var(--c-text-dim)',
    borderRadius: 9,
    padding: '8px 14px',
    fontSize: 12.5,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--f-body)',
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[['today', 'Today'], ['7d', 'Past 7 days'], ['month', 'This month']].map(([k, l]) => (
          <button key={k} onClick={() => setRange(k)} style={pill(range === k)}>{l}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 9999, padding: 4 }}>
        {[['casino', 'Casino'], ['payments', 'Payments']].map(([k, l]) => (
          <button key={k} onClick={() => setKind(k)} style={{ ...pill(kind === k), border: 'none', borderRadius: 9999, padding: '6px 14px' }}>{l}</button>
        ))}
      </div>
    </div>
  )
}

function Pagination() {
  const [page, setPage] = useState(1)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--c-border-alt)', cursor: 'pointer', fontFamily: 'var(--f-body)', fontWeight: 700, fontSize: 13, background: page === n ? 'var(--c-green)' : 'transparent', color: page === n ? '#000' : 'var(--c-text-dim)' }}
          >
            {n}
          </button>
        ))}
      </div>
      <span style={{ fontSize: 12.5, color: 'var(--c-text-muted)' }}>Showing 1–9 of 477</span>
    </div>
  )
}

export function HistoryPanel({ isDesktop }: { isDesktop: boolean }) {
  return (
    <Card title="History" pad={isDesktop ? 22 : 16}>
      <HistoryFilters />
      {isDesktop ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 70px 90px', gap: 12, padding: '0 4px 10px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--c-text-muted)', borderBottom: '1px solid var(--c-border)' }}>
            <span>Status</span><span>Info</span><span>Date</span><span>Time</span><span style={{ textAlign: 'right' }}>Amount</span>
          </div>
          {transactions.map((t) => (
            <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px 70px 90px', gap: 12, alignItems: 'center', padding: '12px 4px', borderBottom: '1px solid var(--c-border)', fontSize: 13 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--c-green)', fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c-green)' }} />{t.status}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 600 }}>{t.info}</span>
                <span style={{ display: 'block', fontSize: 11, color: 'var(--c-text-fainter)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.id}</span>
              </span>
              <span style={{ color: 'var(--c-text-muted)' }}>{t.date}</span>
              <span style={{ color: 'var(--c-text-muted)' }}>{t.time}</span>
              <span style={{ textAlign: 'right', fontWeight: 700, color: amtColor(t.amount) }}>{fmt(t.amount)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {transactions.map((t) => (
            <div key={t.id} style={{ background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t.info}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: amtColor(t.amount) }}>{fmt(t.amount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 6, fontSize: 11.5, color: 'var(--c-text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-green)' }} />{t.status}</span>
                <span>{t.date} · {t.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination />
    </Card>
  )
}

/* ── tabs (segmented) ───────────────────────────────────────────────────── */
export type ProfileTab = 'overview' | 'bonuses' | 'history'
export function ProfileTabs({ tab, onTab, pill }: { tab: ProfileTab; onTab: (t: ProfileTab) => void; pill?: boolean }) {
  const items: [ProfileTab, string][] = [['overview', 'Overview'], ['bonuses', 'Bonuses'], ['history', 'History']]
  return (
    <div style={{ display: 'flex', gap: pill ? 8 : 4, background: pill ? 'transparent' : 'var(--c-black)', border: pill ? 'none' : '1px solid var(--c-border)', borderRadius: 12, padding: pill ? 0 : 4 }}>
      {items.map(([k, l]) => {
        const active = tab === k
        return (
          <button
            key={k}
            onClick={() => onTab(k)}
            style={{
              ...DISPLAY,
              flex: pill ? '0 0 auto' : 1,
              border: pill ? '1px solid var(--c-border-alt)' : 'none',
              borderRadius: pill ? 9999 : 9,
              padding: pill ? '9px 20px' : '10px 0',
              fontWeight: 900,
              fontSize: 13.5,
              cursor: 'pointer',
              background: active ? 'var(--c-green)' : 'transparent',
              color: active ? '#000' : 'var(--c-text-muted)',
              transition: 'all .12s',
            }}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}

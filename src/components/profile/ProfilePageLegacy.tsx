import { useState, type CSSProperties } from 'react'
import type { ProfileVersion } from '../../config'
import { legacyStats, profile } from '../../data/profile'
import { PnlCard } from './PnlCard'
import {
  Avatar,
  Card,
  DISPLAY,
  GhostButton,
  GreenButton,
  cardBase,
} from './profileParts'
import {
  BalanceCard,
  BonusesPanel,
  HistoryPanel,
  PreferencesCard,
  ProfileDetailsCard,
  ProfileTabs,
  SecurityCard,
  StatTile,
  VerificationCard,
  VipProgress,
  type ProfileTab,
} from './profilePartsLegacy'

const pageWrap = (isDesktop: boolean): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap: isDesktop ? 18 : 14,
  padding: isDesktop ? '24px 28px 48px' : '16px 14px 40px',
  color: '#fff',
  fontFamily: 'var(--f-body)',
})

const grid = (min: number): CSSProperties => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 14 })

/* handle / username block reused across versions */
function NameBlock({ big }: { big?: boolean }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ ...DISPLAY, fontWeight: 900, fontSize: big ? 28 : 22, lineHeight: 1 }}>{profile.username}</span>
        <span style={{ ...DISPLAY, fontSize: 11, color: '#000', background: 'linear-gradient(90deg,#cd7f32,#e6a86b)', borderRadius: 6, padding: '3px 8px', fontWeight: 900 }}>
          {profile.vip.tier}
        </span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--c-text-muted)', marginTop: 5 }}>
        Member since {profile.memberSince}
      </div>
    </div>
  )
}

/* ════════════════════ V1 · Dashboard ════════════════════ */
function ProfileV1({ isDesktop }: { isDesktop: boolean }) {
  const [tab, setTab] = useState<ProfileTab>('overview')
  return (
    <div style={pageWrap(isDesktop)}>
      <Card pad={isDesktop ? 22 : 18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Avatar size={isDesktop ? 84 : 62} />
          <NameBlock big={isDesktop} />
          <div style={{ flex: 1 }} />
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ ...cardBase, padding: '8px 14px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 10, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Balance</span>
                <span style={{ ...DISPLAY, fontWeight: 900, fontSize: 16 }}>{profile.balance.crypto} <span style={{ color: 'var(--c-green)', fontSize: 11 }}>{profile.balance.symbol}</span></span>
              </div>
              <GreenButton sm>Deposit</GreenButton>
              <GhostButton sm>Edit profile</GhostButton>
            </div>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <VipProgress />
        </div>
      </Card>

      <div style={grid(isDesktop ? 200 : 150)}>
        <StatTile label="Balance" value={`${profile.balance.fiat}`} accent />
        <StatTile label="Total wagered" value={legacyStats.wagered} />
        <StatTile label="Total wins" value={legacyStats.wins} />
        <StatTile label="Bets placed" value={String(legacyStats.bets)} />
      </div>

      <ProfileTabs tab={tab} onTab={setTab} />

      {tab === 'overview' && (
        <div style={grid(isDesktop ? 320 : 260)}>
          <PnlCard isDesktop={isDesktop} />
          <ProfileDetailsCard />
          <VerificationCard />
          <SecurityCard />
          <PreferencesCard />
        </div>
      )}
      {tab === 'bonuses' && <BonusesPanel />}
      {tab === 'history' && <HistoryPanel isDesktop={isDesktop} />}
    </div>
  )
}

/* ════════════════════ V2 · Account sidebar (Shuffle-style) ════════════════════ */
const NAV_ICON: Record<string, string> = {
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0',
  security: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z',
  verification: 'M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z',
  bonuses: 'M20 12v9H4v-9M2 7h20v5H2zM12 7V4M12 22V7M12 4a3 3 0 1 0-3 3M12 4a3 3 0 1 1 3 3',
  history: 'M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  preferences: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13l1.6 1-2 3.5-1.9-.5a7 7 0 0 1-1.4.8l-.3 2h-4l-.3-2a7 7 0 0 1-1.4-.8l-1.9.5-2-3.5 1.6-1a7 7 0 0 1 0-2l-1.6-1 2-3.5 1.9.5a7 7 0 0 1 1.4-.8l.3-2h4l.3 2a7 7 0 0 1 1.4.8l1.9-.5 2 3.5-1.6 1a7 7 0 0 1 0 2z',
}
type V2Section = 'profile' | 'security' | 'verification' | 'bonuses' | 'history' | 'preferences'
const V2_NAV: [V2Section, string][] = [
  ['profile', 'Profile'],
  ['verification', 'Verification'],
  ['security', 'Security'],
  ['preferences', 'Preferences'],
  ['bonuses', 'Bonuses'],
  ['history', 'History'],
]

function ProfileV2({ isDesktop }: { isDesktop: boolean }) {
  const [sec, setSec] = useState<V2Section>('profile')
  const navBtn = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 11,
    width: isDesktop ? '100%' : 'auto',
    flex: isDesktop ? undefined : '0 0 auto',
    padding: isDesktop ? '11px 13px' : '9px 14px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--f-body)',
    fontSize: 13.5,
    fontWeight: 600,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    background: active ? 'rgba(0,255,0,.1)' : 'transparent',
    color: active ? 'var(--c-green)' : 'var(--c-text-dim)',
    borderLeft: isDesktop ? `2px solid ${active ? 'var(--c-green)' : 'transparent'}` : 'none',
  })
  const nav = (
    <nav
      className="no-scrollbar"
      style={
        isDesktop
          ? { ...cardBase, padding: 10, flex: '0 0 220px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 3 }
          : { display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }
      }
    >
      {V2_NAV.map(([k, l]) => (
        <button key={k} onClick={() => setSec(k)} style={navBtn(sec === k)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d={NAV_ICON[k]} />
          </svg>
          {l}
        </button>
      ))}
    </nav>
  )
  const content =
    sec === 'profile' ? (
      <div style={grid(isDesktop ? 320 : 260)}>
        <ProfileDetailsCard />
        <BalanceCard />
      </div>
    ) : sec === 'verification' ? (
      <VerificationCard />
    ) : sec === 'security' ? (
      <SecurityCard />
    ) : sec === 'preferences' ? (
      <PreferencesCard />
    ) : sec === 'bonuses' ? (
      <BonusesPanel />
    ) : (
      <HistoryPanel isDesktop={isDesktop} />
    )
  return (
    <div style={pageWrap(isDesktop)}>
      <Card pad={isDesktop ? 20 : 16}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Avatar size={isDesktop ? 64 : 54} />
          <NameBlock />
          <div style={{ flex: 1 }} />
          <GhostButton sm>Edit profile</GhostButton>
        </div>
      </Card>
      <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? 18 : 12, alignItems: 'stretch' }}>
        {nav}
        <div style={{ flex: 1, minWidth: 0 }}>{content}</div>
      </div>
    </div>
  )
}

/* ════════════════════ V3 · Cover banner (Kick-style) ════════════════════ */
function CoverStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 18 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</div>
    </div>
  )
}

function ProfileV3({ isDesktop }: { isDesktop: boolean }) {
  const [tab, setTab] = useState<ProfileTab>('overview')
  return (
    <div style={{ ...pageWrap(isDesktop), padding: isDesktop ? '24px 28px 48px' : '16px 14px 40px', gap: isDesktop ? 18 : 14 }}>
      {/* cover */}
      <div style={{ position: 'relative', ...cardBase, overflow: 'hidden', padding: 0 }}>
        <div
          style={{
            height: isDesktop ? 150 : 104,
            background: 'radial-gradient(120% 180% at 80% -20%, rgba(0,255,0,.45), transparent 55%), linear-gradient(120deg,#10301a 0%,#0c1410 45%,#0e0e12 100%)',
            borderBottom: '1px solid var(--c-border)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'flex-end' : 'flex-start', gap: isDesktop ? 16 : 12, padding: isDesktop ? '0 24px 18px' : '0 16px 14px', marginTop: isDesktop ? -42 : -34 }}>
          <div style={{ borderRadius: '50%', border: '4px solid var(--c-panel)' }}>
            <Avatar size={isDesktop ? 92 : 70} />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
            <NameBlock big={isDesktop} />
          </div>
          <div style={{ display: 'flex', gap: 10, paddingBottom: 4, width: isDesktop ? 'auto' : '100%' }}>
            <GreenButton sm>Deposit</GreenButton>
            <GhostButton sm>Edit profile</GhostButton>
          </div>
        </div>
        {/* inline stats strip */}
        <div style={{ display: 'flex', gap: isDesktop ? 36 : 22, padding: isDesktop ? '0 26px 20px' : '0 16px 16px', flexWrap: 'wrap' }}>
          <CoverStat label="Balance" value={profile.balance.fiat} />
          <CoverStat label="Wagered" value={legacyStats.wagered} />
          <CoverStat label="Wins" value={legacyStats.wins} />
          <CoverStat label="VIP level" value={`${profile.vip.level}`} />
        </div>
      </div>

      <div>
        <ProfileTabs tab={tab} onTab={setTab} pill />
      </div>

      <div>
        {tab === 'overview' && (
          <Bento isDesktop={isDesktop} />
        )}
        {tab === 'bonuses' && <BonusesPanel />}
        {tab === 'history' && <HistoryPanel isDesktop={isDesktop} />}
      </div>
    </div>
  )
}

/* V3 overview bento: balance + VIP feature row, then modular cards */
function Bento({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1.4fr' : '1fr', gap: 14 }}>
        <BalanceCard big />
        <Card title="VIP progress">
          <div style={{ marginBottom: 16 }}>
            <VipProgress />
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
            Keep playing to climb to {profile.vip.next} and unlock bigger rewards, faster withdrawals and exclusive drops.
          </p>
        </Card>
      </div>
      <div style={grid(isDesktop ? 320 : 260)}>
        <ProfileDetailsCard />
        <VerificationCard />
        <SecurityCard />
        <PreferencesCard />
      </div>
    </div>
  )
}

/* ── dispatcher ─────────────────────────────────────────────────────────── */
/** Earlier account concepts, kept for comparison: 5 Dashboard · 6 Account nav · 7 Cover. */
export function ProfilePageLegacy({ version, isDesktop }: { version: ProfileVersion; isDesktop: boolean }) {
  switch (version) {
    case 5: return <ProfileV1 isDesktop={isDesktop} />
    case 6: return <ProfileV2 isDesktop={isDesktop} />
    case 7: return <ProfileV3 isDesktop={isDesktop} />
    default: return null
  }
}

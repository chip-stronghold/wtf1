import { useState, type CSSProperties } from 'react'
import type { WalletVersion } from '../../config'
import { activeCoin, depositAddress } from '../../data/wallet'
import {
  AddressField,
  CoinIcon,
  DISPLAY,
  DepositWithdrawTabs,
  FieldLabel,
  GreenBtn,
  NetworkWarning,
  QrCode,
  SelectField,
  type TopUpTab,
} from './walletParts'

const coin = activeCoin
const network = coin.networks[0]

function CloseBtn({ onClose }: { onClose?: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      style={{ position: 'absolute', top: 14, right: 14, zIndex: 5, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.16)', color: '#fff', fontSize: 20, lineHeight: 1, cursor: 'pointer', display: 'grid', placeItems: 'center' }}
    >
      ×
    </button>
  )
}

function WalletField() {
  return (
    <div>
      <FieldLabel>Select wallet</FieldLabel>
      <SelectField left={<CoinIcon glyph={coin.glyph} color={coin.color} />} value={`${coin.sym}`} sub={coin.balance} />
    </div>
  )
}
function NetworkField() {
  return (
    <div>
      <FieldLabel>Network</FieldLabel>
      <SelectField value={network} />
    </div>
  )
}

function AmountField() {
  return (
    <div>
      <FieldLabel>Amount</FieldLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--c-black)', border: '1px solid var(--c-border-alt)', borderRadius: 12, padding: '0 12px 0 14px', height: 56 }}>
        <input placeholder="0.00" style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'var(--f-body)', fontSize: 15 }} />
        <span style={{ fontSize: 13, color: 'var(--c-text-muted)', fontWeight: 600 }}>{coin.sym}</span>
        <button className="brighten" style={{ ...DISPLAY, height: 30, padding: '0 12px', background: 'var(--c-panel-alt)', color: 'var(--c-green)', border: '1px solid var(--c-border-alt)', borderRadius: 8, fontSize: 11.5, fontWeight: 900, cursor: 'pointer' }}>Max</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 12, color: 'var(--c-text-muted)' }}>
        <span>Available: {coin.balance} {coin.sym}</span>
        <span>Network fee: 1.00 {coin.sym}</span>
      </div>
    </div>
  )
}

function WithdrawAddressField() {
  return (
    <div>
      <FieldLabel>Withdrawal address</FieldLabel>
      <input placeholder={`Paste your ${coin.sym} address`} style={{ width: '100%', height: 56, background: 'var(--c-black)', border: '1px solid var(--c-border-alt)', borderRadius: 12, padding: '0 14px', color: '#fff', fontFamily: 'monospace', fontSize: 14, outline: 'none' }} />
    </div>
  )
}

function WithdrawSummary() {
  const rows: [string, string][] = [
    ['Amount', '—'],
    ['Network fee', `1.00 ${coin.sym}`],
    ["You'll receive", '—'],
    ['Arrives in', '~5 min'],
  ]
  return (
    <>
      <span style={{ fontSize: 12, color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Summary</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, width: '100%' }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, fontSize: 13 }}>
            <span style={{ color: 'var(--c-text-muted)' }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', fontSize: 11.5, color: 'var(--c-text-faint)', lineHeight: 1.45 }}>
        Withdrawals are processed after a quick security review.
      </div>
    </>
  )
}

function HistoryLink({ tab }: { tab: TopUpTab }) {
  return (
    <button style={{ ...DISPLAY, display: 'block', margin: '4px auto 0', background: 'none', border: 'none', color: '#fff', fontWeight: 900, fontSize: 14, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
      {tab === 'deposit' ? 'Deposit' : 'Withdrawal'} history
    </button>
  )
}

/* deposit / withdraw field stacks (shared) */
function DepositStack({ qr = true }: { qr?: boolean }) {
  return (
    <>
      <WalletField />
      <NetworkField />
      <div>
        <FieldLabel>{network} address</FieldLabel>
        <AddressField address={depositAddress} />
      </div>
      <NetworkWarning network={network} />
      {qr && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
          <QrCode value={depositAddress} />
        </div>
      )}
    </>
  )
}
function WithdrawStack() {
  return (
    <>
      <WalletField />
      <NetworkField />
      <WithdrawAddressField />
      <AmountField />
      <GreenBtn>Withdraw</GreenBtn>
    </>
  )
}

const stackCol: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 }

/* ════════════════════════════════════════════════════════════════════════ */
export function TopUpModal({ version, isDesktop, onClose }: { version: WalletVersion; isDesktop: boolean; onClose?: () => void }) {
  const [tab, setTab] = useState<TopUpTab>('deposit')

  // ── card width per version ──
  const width = version === 2 ? 'min(700px,100%)' : 'min(460px,100%)'

  const inner = (
    <>
      {/* V2: two-column on desktop (form left, QR / withdrawal summary right) */}
      {version === 2 && isDesktop ? (
        <>
          <DepositWithdrawTabs tab={tab} onTab={setTab} underline />
          <div style={{ display: 'flex', gap: 22, marginTop: 22, alignItems: 'flex-start' }}>
            {/* minWidth:0 lets the address field truncate instead of pushing the QR off */}
            <div style={{ flex: 1, minWidth: 0, ...stackCol }}>
              {tab === 'deposit' ? (
                <>
                  <WalletField />
                  <NetworkField />
                  <div>
                    <FieldLabel>{network} address</FieldLabel>
                    <AddressField address={depositAddress} />
                  </div>
                  <NetworkWarning network={network} />
                </>
              ) : (
                <WithdrawStack />
              )}
            </div>
            <div style={{ flex: '0 0 230px', display: 'flex', flexDirection: 'column', alignItems: tab === 'deposit' ? 'center' : 'stretch', gap: 14, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 14, padding: 18 }}>
              {tab === 'deposit' ? (
                <>
                  <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>Scan to deposit</span>
                  <QrCode value={depositAddress} size={160} />
                  <HistoryLink tab={tab} />
                </>
              ) : (
                <WithdrawSummary />
              )}
            </div>
          </div>
        </>
      ) : (
        /* V1 + V3 single column */
        <>
          {version === 3 ? (
            <DepositWithdrawTabs tab={tab} onTab={setTab} underline />
          ) : (
            <DepositWithdrawTabs tab={tab} onTab={setTab} />
          )}
          <div style={{ ...stackCol, marginTop: 20 }}>
            {tab === 'deposit' ? <DepositStack /> : <WithdrawStack />}
            {tab === 'deposit' && <HistoryLink tab={tab} />}
          </div>
        </>
      )}
    </>
  )

  if (!isDesktop) {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'var(--c-black)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', padding: '20px 16px 8px' }}>
          <CloseBtn onClose={onClose} />
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 18, marginBottom: 14 }}>Wallet</div>
          <DepositWithdrawTabs tab={tab} onTab={setTab} />
        </div>
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px', ...stackCol }}>
          {tab === 'deposit' ? <DepositStack /> : <WithdrawStack />}
          {tab === 'deposit' && <HistoryLink tab={tab} />}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.62)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="no-scrollbar" style={{ position: 'relative', width, maxHeight: '100%', overflowY: 'auto', background: 'var(--c-panel)', border: '1px solid var(--c-border-alt)', borderRadius: 18, padding: '56px 26px 26px', boxShadow: 'var(--shadow-deep)' }}>
        <CloseBtn onClose={onClose} />
        {inner}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { SIGNUP_BONUSES, type ModalId } from '../../data/pages'
import { asset } from '../../lib/assets'
import { Icon, Svg } from './icons'
import { t } from './chrome'

/** Their /login and /registration (bonus step) dialogs: art on the left, form on the right. */

const ART = asset('studios/studio-hamster.png')

function Dialog({ mobile, onClose, children }: { mobile: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 20, background: t('brand-secondary-14'), backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'grid', placeItems: mobile ? 'end stretch' : 'center', padding: mobile ? 0 : 24 }}>
      <div onClick={(e) => e.stopPropagation()} className="vcard" style={{ position: 'relative', width: mobile ? '100%' : 760, maxWidth: '100%', maxHeight: '100%', overflow: 'auto', borderRadius: mobile ? '20px 20px 0 0' : 20, background: t('brand-secondary-1'), display: 'grid', gridTemplateColumns: mobile ? '1fr' : '300px 1fr' }}>
        {!mobile && (
          <div style={{ background: t('brand-secondary-2'), display: 'grid', placeItems: 'center', padding: 24 }}>
            <img src={ART} alt="" style={{ width: '100%', maxWidth: 240 }} />
          </div>
        )}
        <div style={{ padding: mobile ? '20px 16px 28px' : 28, display: 'grid', gap: 14, alignContent: 'start' }}>{children}</div>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), color: t('brand-primary-1-600') }}>
          ✕
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span className="vmuted" style={{ fontSize: t('typography-size-sm'), fontWeight: 700 }}>{label}</span>
      <div className="vinput" style={{ justifyContent: 'space-between' }}>
        <span>{value}</span>
        {type === 'password' && <Svg d={Icon.star} size={14} stroke={2} />}
      </div>
    </label>
  )
}

export function LoginModal({ mobile, onClose, onSwitch }: { mobile: boolean; onClose: () => void; onSwitch: () => void }) {
  return (
    <Dialog mobile={mobile} onClose={onClose}>
      <div className="vh" style={{ fontSize: t('typography-size-2xl') }}>Login</div>
      <Field label="E-Mail" value="jane@example.com" />
      <Field label="Password" value="••••••••" type="password" />
      <button className="vmuted" style={{ justifySelf: 'end', fontSize: t('typography-size-sm'), textDecoration: 'underline' }}>Forgot your password?</button>
      <p className="vfaint" style={{ margin: 0, fontSize: t('typography-size-xs'), lineHeight: 1.4 }}>
        This site is protected by reCAPTCHA and the Google <u>Privacy Policy</u> and <u>Terms of Service</u> apply.
      </p>
      <button className="vbtn vbtn-primary" style={{ height: 44 }}>
        Login
      </button>
      <div style={{ textAlign: 'center', fontSize: t('typography-size-sm') }} className="vmuted">
        Don't have an account?{' '}
        <button onClick={onSwitch} style={{ color: t('brand-primary-1-600'), textDecoration: 'underline', fontWeight: 700 }}>
          Create account
        </button>
      </div>
    </Dialog>
  )
}

export function SignupModal({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  return (
    <Dialog mobile={mobile} onClose={onClose}>
      <div className="vh" style={{ fontSize: t('typography-size-2xl') }}>Choose Your Bonus</div>
      {SIGNUP_BONUSES.map((b, i) => (
        <button key={b.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 14, textAlign: 'left', background: i === 0 ? t('brand-glass-effect-brand') : t('brand-secondary-2'), border: `1px solid ${i === 0 ? t('brand-brand-color-1-500') : t('brand-secondary-6')}` }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), color: t('brand-brand-color-1-500'), flex: '0 0 auto' }}>
            <Svg d={Icon.gift} size={22} stroke={2} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span className="vc" style={{ display: 'block', fontSize: t('typography-size-lg') }}>{b.title}</span>
            <span className="vmuted" style={{ display: 'block', fontSize: t('typography-size-sm'), marginTop: 2 }}>{b.line}</span>
          </span>
          <span style={{ width: 18, height: 18, borderRadius: '50%', border: `1px solid ${t('brand-primary-1-300')}`, display: 'grid', placeItems: 'center', fontSize: 10, fontStyle: 'italic', color: t('brand-primary-1-300') }}>i</span>
        </button>
      ))}
      <button className="vbtn vbtn-ghost" style={{ height: 40, justifyContent: 'flex-start', fontWeight: 600, boxShadow: `inset 0 0 0 1px ${t('brand-secondary-6')}`, color: t('brand-primary-1-600') }}>
        I don't want a bonus now
      </button>
      <button className="vbtn vbtn-primary" style={{ height: 44 }}>
        Continue
      </button>
    </Dialog>
  )
}

export function Modals({ modal, mobile, set }: { modal: ModalId; mobile: boolean; set: (m: ModalId) => void }) {
  if (modal === 'login') return <LoginModal mobile={mobile} onClose={() => set(null)} onSwitch={() => set('signup')} />
  if (modal === 'signup') return <SignupModal mobile={mobile} onClose={() => set(null)} />
  return null
}

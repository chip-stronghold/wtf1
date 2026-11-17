import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { AuthVersion } from '../../config'
import { HERO_VIDEO } from '../../data/lobby'
import { asset } from '../../lib/assets'
import { AppleIcon, DiscordIcon, GoogleIcon, XIcon } from './brandIcons'

export type AuthTab = 'signup' | 'login'

/* ────────────────────────────────────────────────────────────────────────
   Brand registry for the social buttons. Each provider carries its official
   colour so the buttons read instantly. `rgb` powers the tinted/outline modes.
   ──────────────────────────────────────────────────────────────────────── */
type ProviderKey = 'google' | 'discord' | 'x' | 'apple'
interface Brand {
  label: string
  bg: string
  text: string
  rgb: string
  border: string
  Icon: (p: { size?: number; color?: string }) => ReactNode
  iconColor?: string
}
const BRAND: Record<ProviderKey, Brand> = {
  google: { label: 'Google', bg: '#ffffff', text: '#1f1f1f', rgb: '66,133,244', border: '#dadce0', Icon: GoogleIcon },
  discord: { label: 'Discord', bg: '#5865F2', text: '#ffffff', rgb: '88,101,242', border: '#5865F2', Icon: DiscordIcon },
  x: { label: 'X', bg: '#000000', text: '#ffffff', rgb: '210,210,210', border: '#3a3a40', Icon: XIcon },
  apple: { label: 'Apple', bg: '#000000', text: '#ffffff', rgb: '210,210,210', border: '#3a3a40', Icon: AppleIcon },
}

const FONT_LABEL: CSSProperties = { fontFamily: 'var(--f-body)' }

/* ── Social button ─────────────────────────────────────────────────────── */
type SocialMode = 'solid' | 'tint'
function SocialButton({
  k,
  label,
  mode = 'solid',
  height = 52,
  iconSize = 22,
  column = false,
}: {
  k: ProviderKey
  label: string
  mode?: SocialMode
  height?: number
  iconSize?: number
  column?: boolean
}) {
  const b = BRAND[k]
  const solid = mode === 'solid'
  const style: CSSProperties = {
    ...FONT_LABEL,
    width: '100%',
    height: column ? undefined : height,
    minHeight: column ? height : undefined,
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: column ? 7 : 11,
    padding: column ? '12px 8px' : '0 18px',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: column ? 13 : 15,
    fontWeight: 600,
    letterSpacing: '.01em',
    transition: 'filter .12s, transform .12s',
    background: solid ? b.bg : `rgba(${b.rgb},.14)`,
    color: solid ? b.text : '#fff',
    border: solid ? `1px solid ${b.border}` : `1.5px solid rgba(${b.rgb},.55)`,
  }
  const iconColor = k === 'discord' ? (solid ? '#fff' : '#fff') : k === 'google' ? undefined : solid ? b.text : '#fff'
  return (
    <button className="brighten" style={style}>
      <b.Icon size={iconSize} color={iconColor} />
      <span>{label}</span>
    </button>
  )
}

/* ── Email / password field ────────────────────────────────────────────── */
function Field({
  label,
  type = 'text',
  placeholder,
  floating = false,
  reveal,
}: {
  label: string
  type?: string
  placeholder?: string
  floating?: boolean
  reveal?: boolean
}) {
  const [show, setShow] = useState(false)
  const inputType = reveal ? (show ? 'text' : 'password') : type
  const input: CSSProperties = {
    ...FONT_LABEL,
    width: '100%',
    height: 52,
    background: 'var(--c-panel)',
    border: '1px solid var(--c-border-alt)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 15,
    paddingTop: floating ? 18 : 0,
    paddingBottom: floating ? 6 : 0,
    paddingLeft: 16,
    paddingRight: reveal ? 48 : 16,
    outline: 'none',
  }
  return (
    <label style={{ display: 'block', position: 'relative' }}>
      {floating ? (
        <span
          style={{
            ...FONT_LABEL,
            position: 'absolute',
            left: 16,
            top: 8,
            fontSize: 10.5,
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            color: 'var(--c-text-faint)',
            pointerEvents: 'none',
          }}
        >
          {label}
        </span>
      ) : (
        <span
          style={{
            ...FONT_LABEL,
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--c-text-muted)',
            marginBottom: 7,
          }}
        >
          {label}
        </span>
      )}
      <input type={inputType} placeholder={floating ? '' : placeholder} style={input} />
      {reveal && (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          style={{
            position: 'absolute',
            right: 8,
            bottom: 0,
            height: 52,
            width: 40,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--c-text-faint)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
            {!show && <path d="M3 3l18 18" />}
          </svg>
        </button>
      )}
    </label>
  )
}

/* ── "or continue with email" divider ──────────────────────────────────── */
function Divider({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--c-border-alt)' }} />
      <span style={{ ...FONT_LABEL, fontSize: 11.5, color: 'var(--c-text-faint)', fontWeight: 500, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--c-border-alt)' }} />
    </div>
  )
}

/* ── Primary (green) submit ────────────────────────────────────────────── */
function PrimaryCTA({ children }: { children: ReactNode }) {
  return (
    <button
      className="brighten"
      style={{
        width: '100%',
        height: 54,
        background: 'var(--c-green)',
        color: '#000',
        border: 'none',
        borderRadius: 12,
        fontFamily: 'var(--f-display)',
        fontWeight: 900,
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: '.02em',
        cursor: 'pointer',
        boxShadow: 'var(--glow-green)',
      }}
    >
      {children}
    </button>
  )
}

/* ── Tab switch (Sign Up / Login) — style differs per version ──────────── */
function Tabs({ tab, onTab, variant }: { tab: AuthTab; onTab: (t: AuthTab) => void; variant: 'segmented' | 'underline' | 'pill' }) {
  const items: { k: AuthTab; label: string }[] = [
    { k: 'signup', label: 'Sign Up' },
    { k: 'login', label: 'Login' },
  ]
  if (variant === 'underline') {
    return (
      <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid var(--c-border-alt)' }}>
        {items.map((it) => {
          const active = tab === it.k
          return (
            <button
              key={it.k}
              onClick={() => onTab(it.k)}
              style={{
                ...FONT_LABEL,
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                padding: '0 0 12px',
                marginBottom: -1,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                color: active ? '#fff' : 'var(--c-text-faint)',
                borderBottom: `2px solid ${active ? 'var(--c-green)' : 'transparent'}`,
              }}
            >
              {it.label}
            </button>
          )
        })}
      </div>
    )
  }
  // segmented + pill share a track; pill is fully rounded, segmented is squarer
  const radius = variant === 'pill' ? 9999 : 10
  return (
    <div style={{ display: 'flex', gap: 4, background: '#000', border: '1px solid var(--c-border)', borderRadius: radius, padding: 4 }}>
      {items.map((it) => {
        const active = tab === it.k
        return (
          <button
            key={it.k}
            onClick={() => onTab(it.k)}
            style={{
              ...FONT_LABEL,
              flex: 1,
              border: 'none',
              borderRadius: radius - 4,
              padding: '10px 0',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              background: active ? 'var(--c-green)' : 'transparent',
              color: active ? '#000' : 'var(--c-text-muted)',
              transition: 'all .12s',
            }}
          >
            {it.label}
          </button>
        )
      })}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
   The three form treatments. All are social-first with branded buttons; they
   differ in tab style, social layout, and input treatment.
   ──────────────────────────────────────────────────────────────────────── */
function AuthForm({ version, tab, onTab }: { version: AuthVersion; tab: AuthTab; onTab: (t: AuthTab) => void }) {
  const isSignup = tab === 'signup'
  const heading = isSignup ? 'Create your account' : 'Welcome back'
  const sub = isSignup ? 'Join the chaos — free to play, win weekly.' : 'Log in to keep picking winners.'
  const cta = isSignup ? 'Create account' : 'Sign in'
  const verb = isSignup ? 'Sign up' : 'Continue'

  const Head = (
    <div>
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: 26, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-.01em' }}>
        {heading}
      </div>
      <div style={{ ...FONT_LABEL, fontSize: 13, color: 'var(--c-text-muted)', marginTop: 7 }}>{sub}</div>
    </div>
  )

  const EmailBlock = (floating: boolean) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Field label="Email" type="email" placeholder="you@email.com" floating={floating} />
      <Field label="Password" reveal placeholder="••••••••" floating={floating} />
    </div>
  )

  const Footer = (
    <div style={{ ...FONT_LABEL, textAlign: 'center', fontSize: 12.5, color: 'var(--c-text-muted)' }}>
      {!isSignup && (
        <button style={{ ...FONT_LABEL, background: 'none', border: 'none', color: 'var(--c-text-dim)', fontSize: 13, cursor: 'pointer', marginBottom: 12 }}>
          Forgot password?
        </button>
      )}
      <div>
        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
        <button
          onClick={() => onTab(isSignup ? 'login' : 'signup')}
          style={{ ...FONT_LABEL, background: 'none', border: 'none', color: 'var(--c-green)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
        >
          {isSignup ? 'Log in' : 'Sign up'}
        </button>
      </div>
    </div>
  )

  /* ── Version 1: segmented tabs · full-width stacked solid brand buttons ── */
  if (version === 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tabs tab={tab} onTab={onTab} variant="segmented" />
        {Head}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SocialButton k="google" label={`${verb} with Google`} />
          <SocialButton k="discord" label={`${verb} with Discord`} />
          <SocialButton k="x" label={`${verb} with X`} />
          <SocialButton k="apple" label={`${verb} with Apple`} />
        </div>
        <Divider>or with email</Divider>
        {EmailBlock(false)}
        <PrimaryCTA>{cta}</PrimaryCTA>
        {Footer}
      </div>
    )
  }

  /* ── Version 2: underline tabs · Google full-width + Discord/X tinted row ── */
  if (version === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tabs tab={tab} onTab={onTab} variant="underline" />
        {Head}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SocialButton k="google" label={`${verb} with Google`} height={54} />
          <div style={{ display: 'flex', gap: 10 }}>
            <SocialButton k="discord" label="Discord" mode="tint" height={54} />
            <SocialButton k="x" label="X" mode="tint" height={54} />
          </div>
        </div>
        <Divider>or continue with email</Divider>
        {EmailBlock(true)}
        <PrimaryCTA>{cta}</PrimaryCTA>
        {Footer}
      </div>
    )
  }

  /* ── Version 3: pill tabs · three equal stacked-icon brand buttons in a row ── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Tabs tab={tab} onTab={onTab} variant="pill" />
      {Head}
      <div>
        <div style={{ ...FONT_LABEL, fontSize: 12, fontWeight: 600, color: 'var(--c-text-muted)', marginBottom: 10 }}>
          {isSignup ? 'Sign up in one tap' : 'Continue with'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <SocialButton k="google" label="Google" column height={78} iconSize={26} />
          <SocialButton k="discord" label="Discord" column height={78} iconSize={26} />
          <SocialButton k="x" label="X" column height={78} iconSize={22} />
        </div>
      </div>
      <Divider>or with email</Divider>
      {EmailBlock(false)}
      <PrimaryCTA>{cta}</PrimaryCTA>
      {Footer}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────
   Offer panel — the looping hero video with the WTF Games logo + cashback
   headline on top. Reused as the desktop left column and the mobile top banner.
   ──────────────────────────────────────────────────────────────────────── */
/** Offers shown over the video. Version 3 rotates through them with pagination. */
interface Offer {
  badge: string
  line1: string
  line2: string
  body: string
}
const OFFERS: Offer[] = [
  {
    badge: 'Welcome offer',
    line1: 'Cash Back',
    line2: 'Welcome Offer',
    body: 'Sign up and get cash back on your first week of picks. Watch WTF Live, bet on the chaos, win weekly.',
  },
  {
    badge: 'Free to enter',
    line1: 'Free To Enter',
    line2: '$1,000 Weekly',
    body: 'Just play along with the WTF Live show and pick your winners to go in the draw to win.',
  },
]

function OfferVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [])
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      src={HERO_VIDEO}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

function OfferPanel({ mobile = false, paginated = false }: { mobile?: boolean; paginated?: boolean }) {
  const [idx, setIdx] = useState(0)
  // Auto-rotate through the offers when paginated (version 3).
  useEffect(() => {
    if (!paginated) return
    const id = setInterval(() => setIdx((i) => (i + 1) % OFFERS.length), 5000)
    return () => clearInterval(id)
  }, [paginated])
  const offer = paginated ? OFFERS[idx] : OFFERS[0]

  const wash = (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: mobile
          ? 'linear-gradient(180deg,rgba(8,8,12,.35) 0%,rgba(8,8,12,.2) 40%,rgba(8,8,12,.92) 100%)'
          : 'linear-gradient(180deg,rgba(8,8,12,.5) 0%,rgba(8,8,12,.25) 38%,rgba(8,8,12,.9) 100%)',
      }}
    />
  )

  const badge = (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'rgba(0,255,0,.16)',
        border: '1px solid rgba(0,255,0,.45)',
        borderRadius: 9999,
        padding: '4px 11px',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.12em',
        color: 'var(--c-green)',
        whiteSpace: 'nowrap',
      }}
    >
      {offer.badge}
    </div>
  )

  const dots = paginated ? (
    <div style={{ display: 'flex', gap: 6 }}>
      {OFFERS.map((_, i) => (
        <button
          key={i}
          onClick={() => setIdx(i)}
          aria-label={`Show offer ${i + 1}`}
          style={{
            width: i === idx ? 20 : 7,
            height: 7,
            padding: 0,
            border: 'none',
            borderRadius: 9999,
            cursor: 'pointer',
            background: i === idx ? 'var(--c-green)' : 'rgba(255,255,255,.45)',
            transition: 'all .2s',
          }}
        />
      ))}
    </div>
  ) : null

  // ── Mobile compact (v3): WTF logo left, offer title right, reduced height. ──
  if (mobile && paginated) {
    return (
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: 'var(--c-hero-base)' }}>
        <OfferVideo />
        {wash}
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '12px 16px 12px 18px' }}>
          <img src={asset('WTF_games.png')} alt="WTF Games" style={{ height: 40, width: 'auto', flex: '0 0 auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', minWidth: 0, paddingRight: 42 }}>
            {badge}
            <div
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-.01em',
                lineHeight: 0.86,
                fontSize: 'clamp(19px,5.6vw,26px)',
                marginTop: 5,
              }}
            >
              {offer.line1}
              <br />
              <span style={{ color: 'var(--c-green)' }}>{offer.line2}</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 18, bottom: 9 }}>{dots}</div>
      </div>
    )
  }

  // ── Default: stacked (desktop left column · mobile centred banner). ──
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: 'var(--c-hero-base)' }}>
      <OfferVideo />
      {wash}
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: mobile ? 'center' : 'flex-start',
          justifyContent: mobile ? 'center' : 'flex-end',
          textAlign: mobile ? 'center' : 'left',
          padding: mobile ? '18px 20px' : '34px 32px',
          gap: mobile ? 8 : 0,
        }}
      >
        <img
          src={asset('WTF_games.png')}
          alt="WTF Games"
          style={{ height: mobile ? 34 : 96, width: 'auto', marginBottom: mobile ? 0 : 'auto' }}
        />
        <div style={{ alignSelf: mobile ? 'center' : 'flex-start', marginBottom: mobile ? 0 : 12 }}>{badge}</div>
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-.01em',
            lineHeight: 0.84,
            fontSize: mobile ? 'clamp(30px,9vw,40px)' : paginated ? 'clamp(40px,4vw,58px)' : 'clamp(34px,3.4vw,52px)',
          }}
        >
          {offer.line1}
          <br />
          <span style={{ color: 'var(--c-green)' }}>{offer.line2}</span>
        </div>
        {!mobile && (
          <div style={{ ...FONT_LABEL, fontSize: 13, color: 'var(--c-text-dim)', marginTop: 12, maxWidth: 320, lineHeight: 1.45 }}>
            {offer.body}
          </div>
        )}
        {!mobile && paginated && <div style={{ marginTop: 18 }}>{dots}</div>}
      </div>
    </div>
  )
}

/* ── Close button ──────────────────────────────────────────────────────── */
function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      style={{
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 5,
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'rgba(0,0,0,.4)',
        border: '1px solid rgba(255,255,255,.22)',
        color: '#fff',
        fontSize: 22,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      ×
    </button>
  )
}

/* ────────────────────────────────────────────────────────────────────────
   AuthModal — positioned absolutely over its container (the framed device).
   Desktop: centred left/right card (video left, form right).
   Mobile:  fullscreen with a video banner up top and the form below.
   ──────────────────────────────────────────────────────────────────────── */
export function AuthModal({
  version,
  isDesktop,
  tab,
  onTab,
  onClose,
}: {
  version: AuthVersion
  isDesktop: boolean
  tab: AuthTab
  onTab: (t: AuthTab) => void
  onClose?: () => void
}) {
  if (isDesktop) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: 'rgba(0,0,0,.62)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: 'min(880px,100%)',
            height: 'min(580px,100%)',
            background: 'var(--c-panel)',
            border: '1px solid var(--c-border-alt)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-deep)',
          }}
        >
          <div style={{ flex: '0 0 42%' }}>
            <OfferPanel paginated={version === 3} />
          </div>
          <div
            className="no-scrollbar"
            style={{ flex: 1, overflowY: 'auto', padding: '60px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'safe center' }}
          >
            <AuthForm version={version} tab={tab} onTab={onTab} />
          </div>
          <CloseButton onClose={onClose} />
        </div>
      </div>
    )
  }

  // Mobile — fullscreen sheet.
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', background: 'var(--c-black)' }}>
      <div style={{ position: 'relative', flex: version === 3 ? '0 0 118px' : '0 0 172px' }}>
        <OfferPanel mobile paginated={version === 3} />
        <CloseButton onClose={onClose} />
      </div>
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '22px 18px 32px' }}>
        <AuthForm version={version} tab={tab} onTab={onTab} />
      </div>
    </div>
  )
}

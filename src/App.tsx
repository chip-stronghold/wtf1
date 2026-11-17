import { useMemo, useState, type ReactNode } from 'react'
import { AUTH_BACKDROP_HERO, DESKTOP_BREAKPOINT, WEEKLY_PRIZE, type AuthVersion, type HeroConcept, type ProfileVersion, type PromotionsVersion, type ReviewScreen, type WalletVersion } from './config'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useShowClock } from './hooks/useShowClock'
import { getReviewOverrides } from './hooks/useReviewOverrides'
import { DesktopShell } from './components/shell/DesktopShell'
import { MobileShell } from './components/shell/MobileShell'
import { ControlBar } from './components/ControlBar'
import { AuthControlBar } from './components/auth/AuthControlBar'
import { AuthModal, type AuthTab } from './components/auth/AuthModal'
import { ProfileControlBar } from './components/profile/ProfileControlBar'
import { ProfilePage } from './components/profile/ProfilePage'
import { WalletControlBar, type WalletView } from './components/wallet/WalletControlBar'
import { PromotionsControlBar } from './components/promotions/PromotionsControlBar'
import { PromotionsPage } from './components/promotions/PromotionsPage'
import { BalanceDropdown } from './components/wallet/BalanceDropdown'
import { TopUpModal } from './components/wallet/TopUpModal'
import { ScaledFrame } from './components/ScaledFrame'
import { CasinoControlBar } from './components/casino/CasinoControlBar'
import { CasinoScreen, useCasinoState } from './components/casino/CasinoPage'
import { TokensControlBar } from './components/tokens/TokensControlBar'
import { TokensScreen } from './components/tokens/TokensScreen'
import { TokenSheet } from './components/tokens/TokenSheet'
import { SKINS, type SkinId } from './data/skins'

/** Desktop breakpoint preview widths (review only) and their window body heights. */
export type DesktopWidth = 1440 | 2560 | 3440
const BODY_H: Record<DesktopWidth, number> = { 1440: 900, 2560: 1200, 3440: 1200 }

/** Phone bezel for the mobile review presentation. */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 390,
        maxWidth: '100%',
        height: 760,
        background: '#050507',
        border: '1px solid #1c1c22',
        borderRadius: 46,
        padding: 10,
        boxShadow: 'var(--shadow-deep)',
        flex: '0 0 auto',
      }}
    >
      {/* translateZ makes the bezel the containing block for position:fixed (share sheets etc.) */}
      <div style={{ height: '100%', borderRadius: 38, overflow: 'hidden', background: '#000', transform: 'translateZ(0)' }}>{children}</div>
    </div>
  )
}

export default function App() {
  const overrides = useMemo(getReviewOverrides, [])
  const matchesDesktop = useMediaQuery(`(min-width:${DESKTOP_BREAKPOINT}px)`)
  const clock = useShowClock()

  // Manual overrides from the review control bar. When unset, the app falls back
  // to the real responsive breakpoint (view) and the schedule-derived live state.
  const [hero, setHero] = useState<HeroConcept>(overrides.hero)
  const [viewOverride, setViewOverride] = useState<'mobile' | 'desktop' | null>(overrides.forceView)
  const [liveOverride, setLiveOverride] = useState<boolean | null>(overrides.forceLive ? true : null)

  // Auth-modal review state.
  const [screen, setScreen] = useState<ReviewScreen>(overrides.area)
  const [authVersion, setAuthVersion] = useState<AuthVersion>(1)
  const [authTab, setAuthTab] = useState<AuthTab>('signup')
  const [profileVersion, setProfileVersion] = useState<ProfileVersion>(overrides.profile)
  const [pnlUp, setPnlUp] = useState(overrides.pnlUp)
  const [walletVersion, setWalletVersion] = useState<WalletVersion>(1)
  const [walletView, setWalletView] = useState<WalletView>('balance')
  const [promotionsVersion, setPromotionsVersion] = useState<PromotionsVersion>(1)

  // Desktop breakpoint preview width (review only).
  const [desktopWidth, setDesktopWidth] = useState<DesktopWidth>(1440)
  const casino = useCasinoState(overrides.casino)
  const [skin, setSkin] = useState<SkinId>(overrides.skin)
  const [sheet, setSheet] = useState(overrides.sheet)
  const [tokensLoggedIn, setTokensLoggedIn] = useState(overrides.loggedIn)

  const isDesktop = viewOverride ? viewOverride === 'desktop' : matchesDesktop
  const live = liveOverride !== null ? liveOverride : clock.live
  const content = { concept: hero, live, countdown: clock.countdown, prize: WEEKLY_PRIZE }

  // Review mode: the handoff's centered canvas — control bar above a framed device
  // (browser window for desktop, phone bezel for mobile). Disable via SHOW_CONTROLS.
  if (overrides.controls) {
    // Skin-token directions for the Vegangster frontend — a token-only component kit.
    if (screen === 'tokens') {
      const tokens = SKINS[skin].tokens
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <TokensControlBar screen={screen} onScreen={setScreen} skin={skin} onSkin={setSkin} sheet={sheet} onSheet={setSheet} loggedIn={tokensLoggedIn} onLoggedIn={setTokensLoggedIn} isDesktop={isDesktop} onView={setViewOverride} desktopWidth={desktopWidth} onDesktopWidth={setDesktopWidth} />
          <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
            {isDesktop ? (
              <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
                <TokensScreen tokens={tokens} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} loggedIn={tokensLoggedIn} />
              </ScaledFrame>
            ) : (
              <PhoneFrame>
                <TokensScreen tokens={tokens} isDesktop={false} width={390} bodyHeight={740} />
              </PhoneFrame>
            )}
            {sheet && <TokenSheet skin={skin} />}
          </div>
        </div>
      )
    }

    // Casino lobby concepts from the brief — their own shells (no hero video).
    if (screen === 'casino') {
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <CasinoControlBar screen={screen} onScreen={setScreen} state={casino} isDesktop={isDesktop} onView={setViewOverride} desktopWidth={desktopWidth} onDesktopWidth={setDesktopWidth} />
          {isDesktop ? (
            <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
              <CasinoScreen state={casino} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} />
            </ScaledFrame>
          ) : (
            <PhoneFrame>
              <CasinoScreen state={casino} isDesktop={false} width={390} bodyHeight={740} />
            </PhoneFrame>
          )}
        </div>
      )
    }

    // The auth screen renders the login/sign-up modal over the Cinematic D lobby.
    if (screen === 'auth') {
      const backdrop = { ...content, concept: AUTH_BACKDROP_HERO }
      const modal = (
        <AuthModal
          version={authVersion}
          isDesktop={isDesktop}
          tab={authTab}
          onTab={setAuthTab}
          onClose={() => setScreen('lobby')}
        />
      )
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <AuthControlBar
            screen={screen}
            onScreen={setScreen}
            version={authVersion}
            onVersion={setAuthVersion}
            isDesktop={isDesktop}
            onView={setViewOverride}
            tab={authTab}
            onTab={setAuthTab}
          />
          {isDesktop ? (
            <div style={{ position: 'relative', flex: '0 0 auto' }}>
              <DesktopShell framed {...backdrop} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden' }}>{modal}</div>
            </div>
          ) : (
            <PhoneFrame>
              <div style={{ position: 'relative', height: '100%' }}>
                <MobileShell {...backdrop} />
                {modal}
              </div>
            </PhoneFrame>
          )}
        </div>
      )
    }

    // The wallet screen overlays the balance dropdown or top-up modal on the lobby.
    if (screen === 'wallet') {
      const backdrop = { ...content, concept: AUTH_BACKDROP_HERO }
      // Align the dropdown's right edge with the nav wallet chip: chip sits at the
      // content's right padding (22), and content is capped at MAIN_MAX (1920) + centred.
      const navInset = Math.max(0, (desktopWidth - 230 - 1920) / 2) + 22
      const overlay = (anchorDesktop: boolean) =>
        walletView === 'topup' ? (
          <TopUpModal version={walletVersion} isDesktop={anchorDesktop} onClose={() => setWalletView('balance')} />
        ) : anchorDesktop ? (
          <div style={{ position: 'absolute', top: 106, right: navInset, zIndex: 55 }}>
            <BalanceDropdown version={walletVersion} isDesktop onTopUp={() => setWalletView('topup')} />
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 58, left: 10, right: 10, maxHeight: 'calc(100% - 68px)', zIndex: 55, display: 'flex' }}>
            <BalanceDropdown version={walletVersion} isDesktop={false} onTopUp={() => setWalletView('topup')} />
          </div>
        )
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <WalletControlBar
            screen={screen}
            onScreen={setScreen}
            version={walletVersion}
            onVersion={setWalletVersion}
            isDesktop={isDesktop}
            onView={setViewOverride}
            walletView={walletView}
            onWalletView={setWalletView}
          />
          {isDesktop ? (
            <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <DesktopShell framed width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} loggedIn walletOpen={walletView === 'balance'} {...backdrop} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden' }}>{overlay(true)}</div>
              </div>
            </ScaledFrame>
          ) : (
            <PhoneFrame>
              <div style={{ position: 'relative', height: '100%' }}>
                <MobileShell {...backdrop} />
                {overlay(false)}
              </div>
            </PhoneFrame>
          )}
        </div>
      )
    }

    // The promotions screen renders the offers hub inside the real shell.
    if (screen === 'promotions') {
      const promoPage = (desktop: boolean) => (
        <PromotionsPage version={promotionsVersion} isDesktop={desktop} countdown={clock.countdown} live={live} />
      )
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <PromotionsControlBar
            screen={screen}
            onScreen={setScreen}
            version={promotionsVersion}
            onVersion={setPromotionsVersion}
            isDesktop={isDesktop}
            onView={setViewOverride}
            live={live}
            onLive={setLiveOverride}
          />
          {isDesktop ? (
            <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
              <DesktopShell framed width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} activeNav="Promotions" {...content} page={promoPage(true)} />
            </ScaledFrame>
          ) : (
            <PhoneFrame>
              <MobileShell {...content} page={promoPage(false)} />
            </PhoneFrame>
          )}
        </div>
      )
    }

    // The profile screen renders the account page inside the real shell.
    if (screen === 'profile') {
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
          <ProfileControlBar
            screen={screen}
            onScreen={setScreen}
            version={profileVersion}
            onVersion={setProfileVersion}
            isDesktop={isDesktop}
            onView={setViewOverride}
            pnlUp={pnlUp}
            onPnlUp={setPnlUp}
          />
          {isDesktop ? (
            <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
              <DesktopShell framed width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} {...content} page={<ProfilePage version={profileVersion} isDesktop pnlUp={pnlUp} />} />
            </ScaledFrame>
          ) : (
            <PhoneFrame>
              <MobileShell {...content} page={<ProfilePage version={profileVersion} isDesktop={false} pnlUp={pnlUp} />} />
            </PhoneFrame>
          )}
        </div>
      )
    }

    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '28px 16px 64px',
          gap: 22,
        }}
      >
        <ControlBar
          hero={hero}
          onHero={setHero}
          isDesktop={isDesktop}
          onView={setViewOverride}
          live={live}
          onLive={setLiveOverride}
          screen={screen}
          onScreen={setScreen}
          desktopWidth={desktopWidth}
          onDesktopWidth={setDesktopWidth}
        />
        {isDesktop ? (
          <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
            <DesktopShell framed width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} {...content} />
          </ScaledFrame>
        ) : (
          <PhoneFrame>
            <MobileShell {...content} />
          </PhoneFrame>
        )}
      </div>
    )
  }

  // Production: clean full-bleed responsive app.
  if (screen === 'tokens') {
    const tokens = SKINS[skin].tokens
    return (
      <div style={{ height: '100dvh', background: 'var(--c-black)', display: 'flex', justifyContent: 'center' }}>
        {isDesktop ? (
          <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
            <TokensScreen tokens={tokens} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} loggedIn={tokensLoggedIn} />
          </ScaledFrame>
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <TokensScreen tokens={tokens} isDesktop={false} width={390} bodyHeight={740} />
          </div>
        )}
      </div>
    )
  }
  if (screen === 'casino') {
    return (
      <div style={{ height: '100dvh', background: 'var(--c-black)', display: 'flex', justifyContent: 'center' }}>
        {isDesktop ? (
          <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
            <CasinoScreen state={casino} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} />
          </ScaledFrame>
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <CasinoScreen state={casino} isDesktop={false} width={390} bodyHeight={740} />
          </div>
        )}
      </div>
    )
  }
  const Shell = isDesktop ? DesktopShell : MobileShell
  return (
    <div style={{ height: '100dvh', background: 'var(--c-black)' }}>
      <Shell {...content} />
    </div>
  )
}

import { useMemo, useState, type ReactNode } from 'react'
import { DESKTOP_BREAKPOINT } from './config'
import { useMediaQuery } from './hooks/useMediaQuery'
import { getReviewOverrides } from './hooks/useReviewOverrides'
import { ScaledFrame } from './components/ScaledFrame'
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
    <div style={{ width: 390, maxWidth: '100%', height: 760, background: '#050507', border: '1px solid #1c1c22', borderRadius: 46, padding: 10, boxShadow: 'var(--shadow-deep)', flex: '0 0 auto' }}>
      <div style={{ height: '100%', borderRadius: 38, overflow: 'hidden', background: '#000', transform: 'translateZ(0)' }}>{children}</div>
    </div>
  )
}

export default function App() {
  const overrides = useMemo(getReviewOverrides, [])
  const matchesDesktop = useMediaQuery(`(min-width:${DESKTOP_BREAKPOINT}px)`)
  const [viewOverride, setViewOverride] = useState<'mobile' | 'desktop' | null>(overrides.forceView)
  const [desktopWidth, setDesktopWidth] = useState<DesktopWidth>(1440)
  const [skin, setSkin] = useState<SkinId>(overrides.skin)
  const [sheet, setSheet] = useState(overrides.sheet)

  const isDesktop = viewOverride ? viewOverride === 'desktop' : matchesDesktop
  const tokens = SKINS[skin].tokens

  const screen = isDesktop ? (
    <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
      <TokensScreen tokens={tokens} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} />
    </ScaledFrame>
  ) : (
    <PhoneFrame>
      <TokensScreen tokens={tokens} isDesktop={false} width={390} bodyHeight={740} />
    </PhoneFrame>
  )

  // Review mode: control bar above a framed device, token sheet beside it.
  if (overrides.controls) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 64px', gap: 22 }}>
        <TokensControlBar skin={skin} onSkin={setSkin} sheet={sheet} onSheet={setSheet} isDesktop={isDesktop} onView={setViewOverride} desktopWidth={desktopWidth} onDesktopWidth={setDesktopWidth} />
        <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
          {screen}
          {sheet && <TokenSheet skin={skin} />}
        </div>
      </div>
    )
  }

  // Clean presentation: the skinned frontend on its own.
  if (isDesktop) {
    return (
      <div style={{ height: '100dvh', background: 'var(--c-black)', display: 'flex', justifyContent: 'center' }}>
        <ScaledFrame naturalWidth={desktopWidth} naturalHeight={40 + BODY_H[desktopWidth]}>
          <TokensScreen tokens={tokens} isDesktop width={desktopWidth} bodyHeight={BODY_H[desktopWidth]} />
        </ScaledFrame>
      </div>
    )
  }
  return (
    <div style={{ height: '100dvh', background: 'var(--c-black)' }}>
      <TokensScreen tokens={tokens} isDesktop={false} width={390} bodyHeight={740} />
    </div>
  )
}

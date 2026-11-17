import { useCallback, useMemo, useState } from 'react'
import { HISTORY, PRESET_INTERESTS, type Interest } from '../../data/casino'
import { CasinoDesktopShell, CasinoMobileShell, ModeStrip, type Concept } from './CasinoShell'
import { ConceptShelf } from './ConceptShelf'
import { ConceptArcade } from './ConceptArcade'
import { ConceptFeed, FeedAside } from './ConceptFeed'
import { PrefsSheet, SwipeMode } from './overlays'
import type { Ctx } from './types'

export type Overlay = 'none' | 'prefs' | 'swipe'

export interface CasinoInit {
  concept: Concept
  visit: 'first' | 'returning'
  interests: boolean
  overlay: Overlay
  preview: boolean
  loading: boolean
  unavailable: boolean
  day: number
}

/** Review + (mock) user state for the casino area, shared by the control bar and the screen. */
export function useCasinoState(init: CasinoInit) {
  const [concept, setConcept] = useState<Concept>(init.concept)
  const [visit, setVisit] = useState(init.visit)
  const [interests, setInterests] = useState<Interest[]>(init.interests ? PRESET_INTERESTS : [])
  const [overlay, setOverlay] = useState<Overlay>(init.overlay)
  const [preview, setPreview] = useState(init.preview)
  const [loading, setLoading] = useState(init.loading)
  const [unavailable, setUnavailable] = useState(init.unavailable)
  const [day, setDay] = useState(init.day)
  const [useHistory, setUseHistory] = useState(true)
  const [historyCleared, setHistoryCleared] = useState(false)

  const toggleInterest = useCallback((i: Interest) => setInterests((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i])), [])
  const reset = useCallback(() => {
    setInterests([])
    setHistoryCleared(true)
    setUseHistory(true)
  }, [])
  const setVisitAndHistory = useCallback((v: 'first' | 'returning') => {
    setVisit(v)
    setHistoryCleared(false)
  }, [])

  return {
    concept, setConcept,
    visit, setVisit: setVisitAndHistory,
    interests, setInterests, toggleInterest,
    overlay, setOverlay,
    preview, setPreview,
    loading, setLoading,
    unavailable, setUnavailable,
    day, setDay,
    useHistory, setUseHistory,
    historyCleared, setHistoryCleared,
    reset,
  }
}
export type CasinoState = ReturnType<typeof useCasinoState>

export function CasinoScreen({ state, isDesktop, width, bodyHeight }: { state: CasinoState; isDesktop: boolean; width: number; bodyHeight: number }) {
  const loggedIn = state.visit === 'returning'
  const ctx: Ctx = useMemo(
    () => ({
      concept: state.concept,
      isDesktop,
      width,
      pad: isDesktop ? 0 : state.concept === 3 ? 12 : 16,
      loggedIn,
      history: loggedIn && !state.historyCleared ? HISTORY : [],
      useHistory: state.useHistory,
      interests: state.interests,
      toggleInterest: state.toggleInterest,
      setInterests: state.setInterests,
      openPrefs: () => state.setOverlay('prefs'),
      openSwipe: () => state.setOverlay('swipe'),
      loading: state.loading,
      unavailable: state.unavailable,
      preview: state.preview,
      dayOffset: state.day,
    }),
    [state, isDesktop, width, loggedIn],
  )

  const body = state.concept === 1 ? <ConceptShelf ctx={ctx} /> : state.concept === 2 ? <ConceptArcade ctx={ctx} /> : <ConceptFeed ctx={ctx} />
  const close = () => state.setOverlay('none')
  const overlay =
    state.overlay === 'prefs' ? (
      <PrefsSheet ctx={ctx} onClose={close} useHistory={state.useHistory} onUseHistory={state.setUseHistory} onClearHistory={() => state.setHistoryCleared(true)} onReset={() => { state.reset(); close() }} />
    ) : state.overlay === 'swipe' ? (
      <SwipeMode ctx={ctx} onClose={close} />
    ) : null

  if (isDesktop) {
    const layout = state.concept === 1 ? 'sidebar' : state.concept === 2 ? 'topnav' : 'threecol'
    return (
      <CasinoDesktopShell layout={layout} loggedIn={loggedIn} width={width} bodyHeight={bodyHeight} overlay={overlay} aside={state.concept === 3 ? <FeedAside ctx={ctx} /> : undefined}>
        {body}
      </CasinoDesktopShell>
    )
  }
  return (
    <CasinoMobileShell concept={state.concept} loggedIn={loggedIn} overlay={overlay} strip={state.concept === 2 ? <ModeStrip pad={16} /> : undefined}>
      {body}
    </CasinoMobileShell>
  )
}

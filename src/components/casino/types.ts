import type { Game, Interest } from '../../data/casino'
import type { Concept } from './CasinoShell'

/** Everything a concept body needs: review state + the user's (mock) signals. */
export interface Ctx {
  concept: Concept
  isDesktop: boolean
  /** Preview width: 390 (mobile) · 1440 · 2560 · 3440 */
  width: number
  /** Horizontal gutter for sections (mobile 16; desktop 0 — the shell already pads 40). */
  pad: number
  loggedIn: boolean
  /** Real play history (empty on a first visit or after "Clear history"). */
  history: Game[]
  /** "Use what I play to suggest games" switch. */
  useHistory: boolean
  interests: Interest[]
  toggleInterest: (i: Interest) => void
  setInterests: (i: Interest[]) => void
  openPrefs: () => void
  openSwipe: () => void
  loading: boolean
  unavailable: boolean
  /** Optional WTF Studios preview shelf (posters only — no footage exists yet). */
  preview: boolean
  /** 0 = today, 1 = tomorrow — demonstrates the daily refresh without a countdown. */
  dayOffset: number
}

export const dayFor = (offset: number) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d
}

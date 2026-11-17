import { REVIEW_AREAS, SHIPPED_HERO, SHOW_CONTROLS, type HeroConcept, type ProfileVersion, type ReviewScreen } from '../config'
import { SKIN_PICK, type SkinId } from '../data/skins'

/**
 * Review-only overrides read once from the URL query string. Lets a reviewer
 * preview any hero concept / force the live state / force a layout without
 * shipping the design-handoff switcher in the UI.
 *
 *   ?hero=1..2   preview a specific hero concept
 *   ?area=tokens|lobby|auth|profile|wallet|promotions   which review area to open (default tokens)
 *   ?skin=1..3   skin-token direction · ?sheet=1 show the token sheet · ?logged=1 logged-in header
 *   ?profile=1..7   account page concept (5–7 are the earlier set)
 *   ?pnl=up|down    show the account P&L module in profit or loss
 *   ?live=1      force the LIVE show state
 *   ?view=mobile|desktop   force a layout (otherwise responsive)
 *   ?controls=0|1   hide / show the design-review control bar
 */
export interface ReviewOverrides {
  hero: HeroConcept
  forceLive: boolean
  forceView: 'mobile' | 'desktop' | null
  controls: boolean
  area: ReviewScreen
  profile: ProfileVersion
  pnlUp: boolean
  skin: SkinId
  sheet: boolean
  loggedIn: boolean
  casino: {
    concept: 1 | 2 | 3
    visit: 'first' | 'returning'
    interests: boolean
    overlay: 'none' | 'prefs' | 'swipe'
    preview: boolean
    loading: boolean
    unavailable: boolean
    day: number
  }
}

export function getReviewOverrides(): ReviewOverrides {
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  )

  const heroParam = Number(params.get('hero'))
  const hero: HeroConcept = heroParam >= 1 && heroParam <= 2 ? (heroParam as HeroConcept) : (SHIPPED_HERO ?? 1)

  const forceLive = params.get('live') === '1' || params.get('live') === 'true'

  const view = params.get('view')
  const forceView = view === 'mobile' || view === 'desktop' ? view : null

  const controlsParam = params.get('controls')
  const controls =
    controlsParam === '0' || controlsParam === 'false'
      ? false
      : controlsParam === '1' || controlsParam === 'true'
        ? true
        : SHOW_CONTROLS

  const areaParam = params.get('area')
  const area: ReviewScreen = REVIEW_AREAS.some((a) => a.id === areaParam) ? (areaParam as ReviewScreen) : 'tokens'

  const profileParam = Number(params.get('profile'))
  const profile: ProfileVersion = profileParam >= 1 && profileParam <= 7 ? (profileParam as ProfileVersion) : 1
  const pnlUp = params.get('pnl') !== 'down'

  const on = (key: string) => params.get(key) === '1' || params.get(key) === 'true'
  const casinoParam = Number(params.get('casino'))
  const overlayParam = params.get('overlay')
  const casino = {
    concept: (casinoParam >= 1 && casinoParam <= 3 ? casinoParam : 1) as 1 | 2 | 3,
    visit: (params.get('visit') === 'returning' ? 'returning' : 'first') as 'first' | 'returning',
    interests: on('interests'),
    overlay: (overlayParam === 'prefs' || overlayParam === 'swipe' ? overlayParam : 'none') as 'none' | 'prefs' | 'swipe',
    preview: on('preview'),
    loading: on('loading'),
    unavailable: on('unavailable'),
    day: params.get('day') === '1' ? 1 : 0,
  }

  const skinParam = Number(params.get('skin'))
  const skin: SkinId = skinParam >= 1 && skinParam <= 3 ? (skinParam as SkinId) : (SKIN_PICK ?? 1)
  const sheet = on('sheet')
  const loggedIn = on('logged')

  return { hero, forceLive, forceView, controls, area, profile, pnlUp, skin, sheet, loggedIn, casino }
}

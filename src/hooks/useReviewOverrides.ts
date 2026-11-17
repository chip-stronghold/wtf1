import { SHOW_CONTROLS } from '../config'
import { SKIN_PICK, type SkinId } from '../data/skins'

/**
 * Review-only overrides read once from the URL query string, so any exact
 * state can be shared as a link.
 *
 *   ?skin=1..3            skin direction (defaults to the PICK)
 *   ?view=mobile|desktop  force a device (otherwise responsive)
 *   ?sheet=1              show the token sheet beside the device
 *   ?controls=0|1         hide / show the review control bar
 */
export interface ReviewOverrides {
  skin: SkinId
  forceView: 'mobile' | 'desktop' | null
  sheet: boolean
  controls: boolean
}

export function getReviewOverrides(): ReviewOverrides {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const on = (key: string) => params.get(key) === '1' || params.get(key) === 'true'

  const skinParam = Number(params.get('skin'))
  const skin: SkinId = skinParam >= 1 && skinParam <= 3 ? (skinParam as SkinId) : (SKIN_PICK ?? 1)

  const view = params.get('view')
  const forceView = view === 'mobile' || view === 'desktop' ? view : null

  const controlsParam = params.get('controls')
  const controls = controlsParam === '0' || controlsParam === 'false' ? false : controlsParam === '1' || controlsParam === 'true' ? true : SHOW_CONTROLS

  return { skin, forceView, sheet: on('sheet'), controls }
}

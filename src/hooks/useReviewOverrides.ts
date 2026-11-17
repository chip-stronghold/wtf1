import { SHOW_CONTROLS } from '../config'
import { isPageId, type ModalId, type PageId } from '../data/pages'
import { SKIN_PICK, type SkinId } from '../data/skins'

/**
 * Review-only overrides read once from the URL query string, so any exact
 * state can be shared as a link.
 *
 *   ?skin=1..3            skin direction (defaults to the PICK)
 *   ?page=home|casino|slots|live|sport|predictions|packs|pvp|promotions|tournaments|contests|lotteries|game
 *   ?modal=login|signup   open a dialog over the page
 *   ?view=mobile|desktop  force a device (otherwise responsive)
 *   ?sheet=1              show the token sheet beside the device
 *   ?controls=0|1         hide / show the review control bar
 */
export interface ReviewOverrides {
  skin: SkinId
  page: PageId
  modal: ModalId
  forceView: 'mobile' | 'desktop' | null
  sheet: boolean
  controls: boolean
}

export function getReviewOverrides(): ReviewOverrides {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const on = (key: string) => params.get(key) === '1' || params.get(key) === 'true'

  const skinParam = Number(params.get('skin'))
  const skin: SkinId = skinParam >= 1 && skinParam <= 3 ? (skinParam as SkinId) : (SKIN_PICK ?? 1)

  const pageParam = params.get('page')
  const page: PageId = isPageId(pageParam) ? pageParam : 'home'
  const modalParam = params.get('modal')
  const modal: ModalId = modalParam === 'login' || modalParam === 'signup' ? modalParam : null

  const view = params.get('view')
  const forceView = view === 'mobile' || view === 'desktop' ? view : null

  const controlsParam = params.get('controls')
  const controls = controlsParam === '0' || controlsParam === 'false' ? false : controlsParam === '1' || controlsParam === 'true' ? true : SHOW_CONTROLS

  return { skin, page, modal, forceView, sheet: on('sheet'), controls }
}

/** Keep the address bar in sync so the current view can be copied as a link. */
export function writeOverrides(next: { skin: SkinId; page: PageId; modal: ModalId; view: 'mobile' | 'desktop' | null; sheet: boolean }) {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set('skin', String(next.skin))
  params.set('page', next.page)
  if (next.modal) params.set('modal', next.modal)
  else params.delete('modal')
  if (next.view) params.set('view', next.view)
  if (next.sheet) params.set('sheet', '1')
  else params.delete('sheet')
  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
}

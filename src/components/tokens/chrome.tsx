import { useState, type CSSProperties, type ReactNode } from 'react'
import type { Game } from '../../data/demo'
import type { ModalId, PageId } from '../../data/pages'
import { asset } from '../../lib/assets'
import { Icon, Svg } from './icons'

/** Shared chrome for every page: token helper, header, side menu, nav pill, tiles. */

export const t = (name: string) => `var(--token-${name})`
/** The WTF GAMES pill logo (brand green). */
export const LOGO = asset('brand/wtf-watermark-green.svg')
export const SIDE_W = 340

export interface Nav {
  page: PageId
  go: (p: PageId) => void
  openModal: (m: ModalId) => void
  openGame: (g: Game) => void
}

/* ------------------------------------------------------------------ bits */

export function SectionHead({ title, icon, right }: { title: string; icon?: ReactNode; right?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
      <div className="vh" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: t('typography-size-xl') }}>
        {icon && <span style={{ color: t('brand-primary-1-600'), display: 'flex' }}>{icon}</span>}
        {title}
      </div>
      {right}
    </div>
  )
}

export function Arrows() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[Icon.chevronLeft, Icon.chevron].map((d, i) => (
        <button key={i} style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}`, color: t('brand-primary-1-500') }}>
          <Svg d={d} size={15} stroke={2.2} />
        </button>
      ))}
    </div>
  )
}

/** Their switch — flips on click. `on` is the initial state. */
export function Toggle({ on: initial }: { on?: boolean }) {
  const [on, setOn] = useState(!!initial)
  return (
    <button role="switch" aria-checked={on} onClick={(e) => { e.stopPropagation(); setOn((v) => !v) }} style={{ width: 44, height: 24, borderRadius: 999, background: on ? t('brand-brand-color-1-500') : t('brand-secondary-2'), position: 'relative', flex: '0 0 auto', display: 'inline-block', transition: 'background .15s' }}>
      <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: on ? t('brand-button-deposit-text') : t('brand-primary-1-300'), transition: 'left .15s' }} />
    </button>
  )
}

/** Their filter chip row (search bubble + pills), scrolls on mobile. */
export function Chips({ items, active: initial = 0, search, mobile, onChange }: { items: string[]; active?: number; search?: boolean; mobile: boolean; onChange?: (i: number) => void }) {
  const [active, setActive] = useState(initial)
  return (
    <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: mobile ? '0 -16px' : 0, padding: mobile ? '0 16px' : 0 }}>
      {search && (
        <button className="vtab" style={{ width: 36, padding: 0, justifyContent: 'center' }}>
          <Svg d={Icon.search} size={15} stroke={2} />
        </button>
      )}
      {items.map((c, i) => (
        <button key={c} onClick={() => { setActive(i); onChange?.(i) }} className={`vtab${i === active ? ' vtab-on' : ''}`}>
          {c}
        </button>
      ))}
    </div>
  )
}

export function GameTile({ game, onOpen }: { game: Game; onOpen?: (g: Game) => void }) {
  return (
    <button onClick={() => onOpen?.(game)} style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden', background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}`, minWidth: 0 }}>
      <img src={game.src} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <span style={{ position: 'absolute', left: 8, bottom: 8, height: 22, padding: '0 8px', borderRadius: 7, background: t('brand-secondary-24'), color: t('brand-primary-1-600'), fontSize: t('typography-size-xs'), fontWeight: 700, display: 'inline-flex', alignItems: 'center', letterSpacing: '.02em', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {game.provider}
      </span>
      <span style={{ position: 'absolute', right: 8, bottom: 8, width: 22, height: 22, borderRadius: '50%', background: t('brand-secondary-24'), color: t('brand-primary-1-600'), display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, fontStyle: 'italic' }}>
        i
      </span>
    </button>
  )
}

export function GameGrid({ games, cols, onOpen }: { games: Game[]; cols: number; onOpen?: (g: Game) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: cols > 3 ? 14 : 12 }}>
      {games.map((g, i) => (
        <GameTile key={g.name + i} game={g} onOpen={onOpen} />
      ))}
    </div>
  )
}

/** Mobile sub-header on inner pages: back arrow · title · search. */
export function PageTitleBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
      <button onClick={onBack} aria-label="Back" style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: t('brand-primary-1-600') }}>
        <Svg d={Icon.chevronLeft} size={20} stroke={2.2} />
      </button>
      <span className="vh" style={{ fontSize: t('typography-size-xl') }}>{title}</span>
      <button aria-label="Search" style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: t('brand-primary-1-600') }}>
        <Svg d={Icon.search} size={20} stroke={2.2} />
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ header */

const PRODUCT_TABS: [string, ReactNode, PageId][] = [
  ['Casino', Icon.dice, 'casino'],
  ['Live Casino', Icon.live, 'live'],
  ['Sport', Icon.ball, 'sport'],
  ['Predictions', Icon.flag, 'predictions'],
  ['Studio Packs', Icon.cards, 'packs'],
  ['PVP Arena', Icon.trophy, 'pvp'],
]
const productFor = (p: PageId): PageId => (p === 'home' || p === 'slots' || p === 'game' ? 'casino' : ['promotions', 'tournaments', 'contests', 'lotteries'].includes(p) ? 'casino' : p)

const LANGS = ['English', 'Español', '日本語', 'Русский', 'Türkçe', 'Deutsch']

function Popover({ open, children, align = 'right' }: { open: boolean; children: ReactNode; align?: 'left' | 'right' }) {
  if (!open) return null
  return (
    <div className="vglass" style={{ position: 'absolute', top: 'calc(100% + 8px)', [align]: 0, zIndex: 30, minWidth: 220, borderRadius: 14, padding: 6, boxShadow: t('brand-shadow-1'), background: t('brand-secondary-24') }}>
      {children}
    </div>
  )
}

const popRow: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, height: 38, padding: '0 10px', borderRadius: 9, width: '100%', textAlign: 'left', fontSize: t('typography-size-md'), fontWeight: 600, color: t('brand-primary-1-600') }

function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const [odds, setOdds] = useState<'Decimal' | 'Fractional'>('Decimal')
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen((o) => !o)} aria-label="Settings" style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: open ? t('brand-brand-color-1-500') : t('brand-secondary-24'), color: open ? t('brand-button-deposit-text') : t('brand-primary-1-600') }}>
        <Svg d={Icon.gear} size={17} stroke={2} />
      </button>
      <Popover open={open}>
        <div style={popRow}>
          <span>Odds format</span>
          <span style={{ display: 'inline-flex', gap: 4 }}>
            {(['Decimal', 'Fractional'] as const).map((o) => (
              <button key={o} onClick={() => setOdds(o)} className={`vtab${odds === o ? ' vtab-on' : ''}`} style={{ height: 26, fontSize: t('typography-size-xs'), padding: '0 9px' }}>
                {o}
              </button>
            ))}
          </span>
        </div>
        <div style={popRow}>
          <span>Sound</span>
          <Toggle on />
        </div>
        <div style={popRow}>
          <span>Hide zero balances</span>
          <Toggle />
        </div>
        <div style={popRow}>
          <span>Display in USD</span>
          <Toggle on />
        </div>
      </Popover>
    </div>
  )
}

export function Header({ mobile, nav }: { mobile: boolean; nav: Nav }) {
  const active = productFor(nav.page)
  return (
    <div className="vglass" style={{ position: 'absolute', top: 0, left: mobile ? 0 : SIDE_W, right: 0, zIndex: 6, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: mobile ? '0 12px' : '0 24px 0 0', borderWidth: '0 0 1px' }}>
      {mobile ? (
        <button onClick={() => nav.go('home')} style={{ display: 'flex' }}>
          <img src={LOGO} alt="WTF Games" style={{ height: 26, display: 'block' }} />
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 40, padding: '0 6px', borderRadius: 999, background: t('brand-secondary-24'), border: `1px solid ${t('brand-secondary-6')}` }}>
          {PRODUCT_TABS.map(([l, d, p]) => {
            const on = p === active
            return (
              <button key={l} onClick={() => nav.go(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 30, padding: '0 12px', borderRadius: 999, background: on ? t('brand-brand-color-1-500') : 'transparent', color: on ? t('brand-button-deposit-text') : t('brand-primary-1-500'), fontSize: t('typography-size-md'), fontWeight: 600, whiteSpace: 'nowrap' }}>
                <Svg d={d} size={14} stroke={2} />
                {l}
              </button>
            )
          })}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <SettingsMenu />
        <button onClick={() => nav.openModal('login')} className="vbtn vbtn-ghost vbtn-sm" style={{ height: 36 }}>
          Login
        </button>
        <button onClick={() => nav.openModal('signup')} className="vbtn vbtn-primary vbtn-sm" style={{ height: 36 }}>
          Sign Up
        </button>
        {!mobile && (
          <button aria-label="Share" style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t('brand-secondary-24'), color: t('brand-primary-1-600') }}>
            <Svg d={Icon.share} size={16} stroke={2} />
          </button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ side menu (desktop) */

export function SideMenu({ nav }: { nav: Nav }) {
  const groups: [string, ReactNode, PageId, string[]][] = [
    ['Casino', Icon.dice, 'casino', ['Top', 'Slots', 'New', 'Megaways', 'Bonus-buy', 'Hold and win', 'Jackpots', 'Tables', 'Other']],
    ['Live Casino', Icon.live, 'live', ['All', 'Roulette', 'Blackjack', 'Baccarat', 'Game Show', 'Other']],
    ['Sport', Icon.ball, 'sport', []],
    ['Studio Packs', Icon.cards, 'packs', ['Royal Flush', 'What The Cluck?', 'Lost My Marbles', 'Split The G']],
    ['PVP Arena', Icon.trophy, 'pvp', []],
  ]
  const promos: [string, ReactNode, PageId | 'signup'][] = [
    ['Bonuses', Icon.gift, 'signup'],
    ['Promotions', Icon.tag, 'promotions'],
    ['Tournaments', Icon.trophy, 'tournaments'],
    ['Contests', Icon.flag, 'contests'],
    ['Lotteries', Icon.ticket, 'lotteries'],
  ]
  const card: CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, height: 46, padding: '0 14px', borderRadius: 12, background: t('brand-secondary-5'), border: `1px solid ${t('brand-secondary-6')}`, color: t('brand-primary-1-600'), fontSize: t('typography-size-lg'), fontWeight: 600, textAlign: 'left', width: '100%' }
  const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, height: 40, padding: '0 14px', color: t('brand-primary-1-500'), fontSize: t('typography-size-lg'), fontWeight: 600, textAlign: 'left', width: '100%', borderRadius: 10 }
  const active = productFor(nav.page)
  // The group for the current product starts expanded (as theirs does); chevrons toggle any group.
  const auto: PageId | null = nav.page === 'slots' || nav.page === 'casino' ? 'casino' : nav.page === 'live' ? 'live' : nav.page === 'packs' ? 'packs' : null
  const [toggled, setToggled] = useState<Partial<Record<PageId, boolean>>>({})
  const isOpen = (p: PageId) => toggled[p] ?? p === auto
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('English')
  return (
    <aside className="no-scrollbar" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: SIDE_W, zIndex: 7, padding: '12px 20px 24px 24px', overflowY: 'auto', display: 'grid', alignContent: 'start', gap: 10 }}>
      <button onClick={() => nav.go('home')} style={{ ...card, height: 50, justifyContent: 'flex-start', gap: 16, marginBottom: 6 }}>
        <Svg d={Icon.menu} size={20} stroke={2} />
        <img src={LOGO} alt="WTF Games" style={{ height: 28, display: 'block' }} />
      </button>
      {groups.map(([l, d, p, subs]) => {
        const on = p === active
        const open = isOpen(p) && subs.length > 0
        return (
          <div key={l} style={{ display: 'grid', gap: 2 }}>
            <button onClick={() => (subs.length ? setToggled((m) => ({ ...m, [p]: !isOpen(p) })) : nav.go(p))} onDoubleClick={() => nav.go(p)} style={{ ...card, color: on ? t('brand-brand-color-1-500') : t('brand-primary-1-600'), borderColor: on ? t('brand-glass-effect-stroke') : t('brand-secondary-6') }}>
              <Svg d={d} size={18} stroke={2} />
              <span style={{ flex: 1 }}>{l}</span>
              {subs.length > 0 && <Svg d={open ? Icon.chevronUp : Icon.chevronDown} size={16} stroke={2} color={t('brand-primary-1-300')} />}
            </button>
            {open && (
              <div style={{ display: 'grid', padding: '4px 0 6px 10px' }}>
                {subs.map((s, i) => (
                  <button key={s} onClick={() => nav.go(p === 'casino' ? 'slots' : p)} style={{ ...row, height: 34, fontSize: t('typography-size-md'), color: i === 1 && p === 'casino' && nav.page === 'slots' ? t('brand-brand-color-1-500') : t('brand-primary-1-400') }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
      <div className="vglass" style={{ borderRadius: 14, padding: 6, marginTop: 6 }}>
        {promos.map(([l, d, p]) => {
          const on = p === nav.page
          return (
            <button key={l} onClick={() => (p === 'signup' ? nav.openModal('signup') : nav.go(p))} style={{ ...row, background: on ? t('brand-glass-effect-brand') : 'transparent', color: on ? t('brand-brand-color-1-500') : t('brand-primary-1-500') }}>
              <Svg d={d} size={17} stroke={2} />
              {l}
            </button>
          )
        })}
      </div>
      <div className="vglass" style={{ borderRadius: 14, padding: 6 }}>
        <button style={row}>
          <Svg d={Icon.chat} size={17} stroke={2} />
          Social Chat
        </button>
        <button onClick={() => setLangOpen((o) => !o)} style={row}>
          <Svg d={Icon.ball} size={17} stroke={2} />
          <span style={{ flex: 1 }}>Language</span>
          <span className="vfaint" style={{ fontSize: t('typography-size-md'), display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {lang} <Svg d={langOpen ? Icon.chevronUp : Icon.chevronDown} size={14} stroke={2} />
          </span>
        </button>
        {langOpen && (
          <div style={{ display: 'grid', padding: '2px 0 4px 10px' }}>
            {LANGS.map((l) => (
              <button key={l} onClick={() => { setLang(l); setLangOpen(false) }} style={{ ...row, height: 32, fontSize: t('typography-size-md'), color: l === lang ? t('brand-brand-color-1-500') : t('brand-primary-1-400') }}>
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------------ mobile nav pill */

export function NavPill({ nav }: { nav: Nav }) {
  const items: [string, ReactNode, PageId][] = [
    ['Promo', Icon.gift, 'promotions'],
    ['Favourites', Icon.star, 'slots'],
    ['Casino', Icon.slots, 'casino'],
    ['Sports', Icon.ball, 'sport'],
    ['Live', Icon.live, 'live'],
    ['Menu', Icon.menu, 'home'],
  ]
  const active = nav.page === 'home' || nav.page === 'game' ? 'casino' : ['tournaments', 'contests', 'lotteries'].includes(nav.page) ? 'promotions' : nav.page === 'predictions' ? 'sport' : nav.page
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, zIndex: 6, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div className="vglass" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 2, height: 56, padding: '0 8px', borderRadius: 999, boxShadow: t('brand-shadow-1') }}>
        {items.map(([l, d, p]) => {
          const on = p === active && l !== 'Menu'
          return (
            <button key={l} onClick={() => nav.go(p)} aria-label={l} title={l} style={{ height: 44, padding: on ? '0 14px' : '0 11px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 7, background: on ? t('brand-brand-color-1-500') : 'transparent', color: on ? t('brand-button-deposit-text') : t('brand-primary-1-600'), fontSize: t('typography-size-md'), fontWeight: 700 }}>
              <Svg d={d} size={21} stroke={on ? 2.2 : 1.8} />
              {on && l}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function WindowChrome({ path }: { path: string }) {
  const dot = (c: string): CSSProperties => ({ width: 11, height: 11, borderRadius: '50%', background: c })
  return (
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#0c0c10', borderBottom: '1px solid #1a1a20' }}>
      <span style={dot('#FF5F57')} />
      <span style={dot('#FEBC2E')} />
      <span style={dot('#28C840')} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', border: '1px solid #23232a', borderRadius: 7, padding: '4px 16px', fontSize: 11, color: '#787878', fontFamily: 'var(--f-body)' }}>wtfgames.com{path === '/' ? '' : path}</div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Tokens } from '../../data/skins'
import { STUDIO_GAMES, type Game } from '../../data/demo'
import { PAGES, type ModalId, type PageId } from '../../data/pages'
import { Header, NavPill, SIDE_W, SideMenu, WindowChrome, type Nav } from './chrome'
import { HomePage } from './home'
import { CasinoHubPage, CategoryPage, GamePage, PacksPage, PredictionsPage, PromoListPage, PromotionsPage, PvpPage, SportPage } from './pages'
import { Modals } from './modals'

/**
 * demo.vegangster.com, page for page, restyled ONLY through Vegangster's token
 * names. Desktop = their 340px side menu + product-tab header; mobile = their
 * floating bottom nav. All in-canvas navigation works and is reflected in the URL.
 */

const K_FOR: Record<number, number> = { 1440: 1, 2560: 1.5, 3440: 1.65 }

interface Props {
  tokens: Tokens
  isDesktop: boolean
  /** 390 (mobile) · 1440 · 2560 · 3440 */
  width: number
  bodyHeight: number
  page: PageId
  onPage: (p: PageId) => void
  modal: ModalId
  onModal: (m: ModalId) => void
}

function PageBody({ page, mobile, nav, game }: { page: PageId; mobile: boolean; nav: Nav; game: Game }) {
  switch (page) {
    case 'home':
      return <HomePage mobile={mobile} nav={nav} />
    case 'casino':
      return <CasinoHubPage mobile={mobile} nav={nav} />
    case 'slots':
      return <CategoryPage mobile={mobile} nav={nav} />
    case 'live':
      return <CategoryPage mobile={mobile} nav={nav} live />
    case 'sport':
      return <SportPage mobile={mobile} nav={nav} />
    case 'predictions':
      return <PredictionsPage mobile={mobile} nav={nav} />
    case 'packs':
      return <PacksPage mobile={mobile} nav={nav} />
    case 'pvp':
      return <PvpPage mobile={mobile} nav={nav} />
    case 'promotions':
      return <PromotionsPage mobile={mobile} />
    case 'tournaments':
    case 'contests':
    case 'lotteries':
      return <PromoListPage mobile={mobile} nav={nav} page={page} />
    case 'game':
      return <GamePage mobile={mobile} nav={nav} game={game} />
  }
}


export function TokensScreen({ tokens, isDesktop, width, bodyHeight, page, onPage, modal, onModal }: Props) {
  const vars = tokens as unknown as CSSProperties
  const [game, setGame] = useState<Game>(STUDIO_GAMES[7])
  const scroller = useRef<HTMLDivElement>(null)
  const nav: Nav = {
    page,
    go: onPage,
    openModal: onModal,
    openGame: (g) => {
      setGame(g)
      onPage('game')
    },
  }
  // Each page starts at the top, as a real navigation would.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [page])

  const mobile = !isDesktop
  const theirs = PAGES.find((p) => p.id === page)?.theirs ?? '/'
  const body = (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: mobile ? '72px 16px 0' : '80px 24px 0 4px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: mobile ? 22 : 30 }}>
      <PageBody page={page} mobile={mobile} nav={nav} game={game} />
    </div>
  )

  if (mobile) {
    return (
      <div className="veg" style={{ ...vars, position: 'relative', height: '100%', overflow: 'hidden' }}>
        <Header mobile nav={nav} />
        <div ref={scroller} className="no-scrollbar" style={{ height: '100%', overflowY: 'auto' }}>
          {body}
        </div>
        <NavPill nav={nav} />
        <Modals modal={modal} mobile set={onModal} />
      </div>
    )
  }

  const kk = K_FOR[width] ?? 1
  return (
    <div className="veg" style={{ ...vars, width, borderRadius: 14, overflow: 'hidden', border: '1px solid #1c1c22', boxShadow: 'var(--shadow-deep)', flex: '0 0 auto' }}>
      <WindowChrome path={theirs} />
      {/* zoom scales type, CTAs and spacing together at the big breakpoints */}
      <div style={{ position: 'relative', height: bodyHeight / kk, width: width / kk, zoom: kk, overflow: 'hidden' } as CSSProperties}>
        <SideMenu nav={nav} />
        <Header mobile={false} nav={nav} />
        <div ref={scroller} className="no-scrollbar" style={{ height: '100%', overflowY: 'auto', paddingLeft: SIDE_W }}>
          {body}
        </div>
        <Modals modal={modal} mobile={false} set={onModal} />
      </div>
    </div>
  )
}

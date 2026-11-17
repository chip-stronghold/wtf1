import type { CSSProperties } from 'react'
import { archivedTiles, comparison, howItWorks, promoHero, valueProps, type PromoTile, type ValueProp } from '../../data/promotions'
import type { Countdown } from '../../hooks/useShowClock'
import { coverGradient } from '../../lib/color'
import { DISPLAY, cardBase, GhostButton, GreenButton } from '../profile/profileParts'

/** rgba() from a #rrggbb accent. */
export const tint = (hex: string, a: number): string => {
  const n = hex.replace('#', '')
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${a})`
}

/* ── page top: title + Latest/Archived (kept from the current site) ─────── */
export type PromoTab = 'latest' | 'archived'
export function PromoHeader({ isDesktop, tab, onTab }: { isDesktop: boolean; tab: PromoTab; onTab: (t: PromoTab) => void }) {
  const pill = (active: boolean): CSSProperties => ({
    ...DISPLAY,
    border: 'none',
    borderRadius: 8,
    padding: '8px 18px',
    fontWeight: 900,
    fontSize: 12.5,
    cursor: 'pointer',
    background: active ? 'var(--c-green)' : 'transparent',
    color: active ? '#000' : 'var(--c-text-muted)',
    transition: 'all .12s',
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h1 style={{ ...DISPLAY, margin: 0, fontWeight: 900, fontSize: isDesktop ? 34 : 26, lineHeight: 1 }}>Promotions</h1>
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', gap: 4, background: 'var(--c-black)', border: '1px solid var(--c-border)', borderRadius: 10, padding: 4 }}>
        <button onClick={() => onTab('latest')} style={pill(tab === 'latest')}>Latest</button>
        <button onClick={() => onTab('archived')} style={pill(tab === 'archived')}>Archived</button>
      </div>
    </div>
  )
}

/* ── hero: CMS text left / image right, stacked-but-compact on mobile ───── */
export function PromoHeroBlock({ isDesktop }: { isDesktop: boolean }) {
  const copy = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 11, justifyContent: 'center', padding: isDesktop ? '30px 32px' : '18px 16px', minWidth: 0 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--c-green)' }}>{promoHero.kicker}</div>
      <div style={{ ...DISPLAY, fontWeight: 900, fontSize: isDesktop ? 40 : 28, lineHeight: 0.98 }}>{promoHero.title}</div>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--c-text-dim)', lineHeight: 1.5, maxWidth: 470 }}>{promoHero.sub}</p>
      <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
        <GreenButton sm={!isDesktop}>{promoHero.ctaPrimary}</GreenButton>
        <GhostButton sm={!isDesktop}>{promoHero.ctaSecondary}</GhostButton>
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 11.5, color: 'var(--c-text-muted)' }}>
        {promoHero.trust.map((t) => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 7" />
            </svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
  const img = (
    <div style={{ position: 'relative', minHeight: isDesktop ? 280 : 150 }}>
      <img
        src={promoHero.img}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 58%',
          WebkitMaskImage: isDesktop ? 'linear-gradient(to right, transparent 0, #000 24%)' : 'linear-gradient(to bottom, transparent 0, #000 30%)',
          maskImage: isDesktop ? 'linear-gradient(to right, transparent 0, #000 24%)' : 'linear-gradient(to bottom, transparent 0, #000 30%)',
        }}
      />
    </div>
  )
  return (
    <section
      style={{
        ...cardBase,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1.05fr 0.95fr' : '1fr',
        background: 'radial-gradient(120% 180% at 85% -30%, rgba(0,255,0,.22), transparent 55%), var(--c-panel)',
      }}
    >
      {copy}
      {img}
    </section>
  )
}

/* ── image tile: the whole promo IS the image (CMS swaps the file) ──────── */
export function ImageTile({ tile, ratio = '1106 / 580', fill }: { tile: PromoTile; ratio?: string; fill?: boolean }) {
  const frame: CSSProperties = {
    position: 'relative',
    borderRadius: 14,
    border: '1px solid var(--c-border)',
    overflow: 'hidden',
    cursor: 'pointer',
    width: '100%',
    ...(fill ? { height: '100%' } : { aspectRatio: ratio }),
    filter: tile.archived ? 'grayscale(1) brightness(.62)' : 'none',
  }
  return (
    <div className="promo-banner lift" style={frame}>
      {tile.art ? (
        <img src={tile.art} alt={tile.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: tile.pos ?? 'center' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: coverGradient(tile.color), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 16px', textAlign: 'center' }}>
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 'clamp(17px, 6.5cqw, 26px)', color: '#fff', lineHeight: 1.02, textShadow: '0 2px 16px rgba(0,0,0,.5)' }}>{tile.label}</div>
          {tile.sub && <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,.82)' }}>{tile.sub}</div>}
          <div style={{ position: 'absolute', right: 8, bottom: 6, fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>placeholder art</div>
        </div>
      )}
      {tile.archived && (
        <span style={{ position: 'absolute', top: 10, left: 10, ...DISPLAY, fontSize: 10, fontWeight: 900, background: 'rgba(0,0,0,.75)', border: '1px solid var(--c-border-alt)', color: 'var(--c-text-dim)', borderRadius: 6, padding: '3px 8px' }}>
          Ended
        </span>
      )}
    </div>
  )
}

/* ── section label between tile groups (one CMS string per group, max) ──── */
export function SectionLabel({ children, hint }: { children: string; hint?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
      <h3 style={{ ...DISPLAY, fontWeight: 900, fontSize: 15, margin: 0 }}>{children}</h3>
      {hint && <span style={{ fontSize: 11.5, color: 'var(--c-text-muted)' }}>{hint}</span>}
    </div>
  )
}

/* ── "what's in it for you" strip ───────────────────────────────────────── */
const VP_ICON: Record<ValueProp['icon'], string> = {
  gift: 'M20 12v9H4v-9M2 7h20v5H2zM12 7v14M12 7a3 3 0 1 0-3-3c0 2 3 3 3 3zM12 7a3 3 0 1 1 3-3c0 2-3 3-3 3z',
  ticket: 'M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3zM13 6v2M13 11v2M13 16v2',
  tv: 'M3 7h18v12H3zM8 3l4 4 4-4M10 11l5 2.5-5 2.5z',
  cash: 'M3 15V9a9 3.4 0 0 1 18 0v6M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17 20l3-3-3-3M20 17h-8',
}
export function ValuePropsRow({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4,1fr)' : 'repeat(2,1fr)', gap: 10 }}>
      {valueProps.map((v) => (
        <div key={v.title} style={{ ...cardBase, padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d={VP_ICON[v.icon]} />
          </svg>
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 13.5, lineHeight: 1 }}>{v.title}</div>
          <div style={{ fontSize: 11.5, color: 'var(--c-text-muted)', lineHeight: 1.35 }}>{v.sub}</div>
        </div>
      ))}
    </div>
  )
}

/* ── tonight strip: real show countdown (schedule-derived, not CMS) ─────── */
export function LiveTonightStrip({ countdown, live, isDesktop }: { countdown: Countdown; live: boolean; isDesktop: boolean }) {
  return (
    <div
      style={{
        ...cardBase,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'linear-gradient(90deg, rgba(0,255,0,.09), var(--c-panel) 55%)',
        flexWrap: 'wrap',
      }}
    >
      {live ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--c-red)', borderRadius: 9999, padding: '4px 12px', ...DISPLAY, fontWeight: 900, fontSize: 12, color: '#fff' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', animation: 'wtfBlink 1.1s infinite' }} />
          LIVE
        </span>
      ) : (
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--c-green)', boxShadow: 'var(--glow-green)', flex: '0 0 auto' }} />
      )}
      <span style={{ fontSize: 13.5, fontWeight: 700, minWidth: 0 }}>
        Tonight&apos;s live show · $1,000 draw
        {!live && isDesktop && <span style={{ color: 'var(--c-text-muted)', fontWeight: 600 }}> — free entries for playing along</span>}
      </span>
      <div style={{ flex: 1 }} />
      {!live && (
        <span style={{ ...DISPLAY, fontWeight: 900, fontSize: 15, color: '#fff', whiteSpace: 'nowrap' }}>
          {countdown.compact}
          <span style={{ fontSize: 10, color: 'var(--c-text-muted)', marginLeft: 6 }}>to showtime</span>
        </span>
      )}
      <GreenButton sm>{live ? 'Watch now' : 'Get free entry'}</GreenButton>
    </div>
  )
}

/* ── "other casinos vs WTF" seed-planting panel ─────────────────────────── */
export function ComparisonPanel({ isDesktop }: { isDesktop: boolean }) {
  const list = (items: string[], good: boolean) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {items.map((t) => (
        <span key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: good ? 'var(--c-text-dim)' : 'var(--c-text-muted)', lineHeight: 1.4 }}>
          {good ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', marginTop: 2 }}>
              <path d="M4 12l5 5L20 7" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-faint)" strokeWidth={2.2} strokeLinecap="round" style={{ flex: '0 0 auto', marginTop: 2 }}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          )}
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <section style={{ ...cardBase, padding: isDesktop ? '22px 26px' : 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr auto 1fr' : '1fr', gap: isDesktop ? 26 : 16, alignItems: 'start' }}>
        <div>
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 14, color: 'var(--c-text-faint)', marginBottom: 12 }}>Other casinos</div>
          {list(comparison.others, false)}
        </div>
        <div style={{ ...DISPLAY, fontWeight: 900, fontSize: isDesktop ? 22 : 16, color: 'var(--c-green)', alignSelf: 'center', textAlign: 'center' }}>VS</div>
        <div>
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 14, color: 'var(--c-green)', marginBottom: 12 }}>WTF Games</div>
          {list(comparison.wtf, true)}
        </div>
      </div>
      <p style={{ margin: '16px 0 0', fontSize: 12, color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
        Nobody else runs a live game show you can enter for free. That&apos;s the whole point.
      </p>
    </section>
  )
}

/* ── how to earn more: 4 steps ──────────────────────────────────────────── */
export function HowItWorksRow({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(4,1fr)' : 'repeat(2,1fr)', gap: 10 }}>
      {howItWorks.map((s, i) => (
        <div key={s.step} style={{ ...cardBase, padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...DISPLAY, width: 22, height: 22, borderRadius: '50%', background: 'var(--c-green)', color: '#000', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 12 }}>
            {i + 1}
          </span>
          <div style={{ ...DISPLAY, fontWeight: 900, fontSize: 13.5, lineHeight: 1 }}>{s.step}</div>
          <div style={{ fontSize: 11.5, color: 'var(--c-text-muted)', lineHeight: 1.35 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Archived tab: same everywhere — dimmed image grid ──────────────────── */
export function ArchivedGrid({ isDesktop }: { isDesktop: boolean }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : '1fr', gap: 12 }}>
        {archivedTiles.map((t) => (
          <ImageTile key={t.id} tile={t} />
        ))}
      </div>
      <div style={{ ...cardBase, padding: '18px 20px', textAlign: 'center', color: 'var(--c-text-muted)', fontSize: 12.5 }}>
        Past promotions stay browsable — proof the calendar never sleeps.
      </div>
    </>
  )
}

/* ── legal footnote ─────────────────────────────────────────────────────── */
export function TermsNote() {
  return (
    <p style={{ margin: 0, fontSize: 11.5, color: 'var(--c-text-fainter)', lineHeight: 1.6 }}>
      18+. Play responsibly. All offers are subject to full promotional terms — wagering requirements, game weighting and
      regional eligibility apply.{' '}
      <span style={{ color: 'var(--c-text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>Read the promo terms</span>
    </p>
  )
}

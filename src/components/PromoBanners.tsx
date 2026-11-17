import { banners, BANNER_RATIO } from '../data/lobby'

/**
 * Desktop promo banners: 3-up grid under the hero. On mobile the banners live
 * inside the hero module itself (see HeroMobileD), so this only renders on desktop.
 * `pullUp` lifts the grid under the cinematic hero so the video fades behind it.
 */
export function PromoBanners({ pullUp }: { pullUp: boolean }) {
  return (
    <div
      style={{
        marginTop: pullUp ? -58 : 0,
        position: 'relative',
        zIndex: 1,
        padding: '18px 14px 2px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 12,
      }}
    >
      {banners.map((b) => (
        <img
          key={b.alt}
          className="promo-banner brighten"
          src={b.src}
          alt={b.alt}
          style={{ width: '100%', aspectRatio: BANNER_RATIO, objectFit: 'cover', borderRadius: 14, border: '1px solid var(--c-border)', cursor: 'pointer' }}
        />
      ))}
    </div>
  )
}

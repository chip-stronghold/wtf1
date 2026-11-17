import type { Countdown } from '../hooks/useShowClock'
import { BellIcon } from './icons'

const boxFill = 'linear-gradient(180deg,#1a1a22,#0c0c12)'

/* ── 'unit-in-box': number + unit stacked inside one compact box ── */
interface ComboZ {
  w: number | string
  vf: number | string
  uf: number | string
  radius: number | string
  pad: string
}
function ComboBlock({ value, unit, z }: { value: string; unit: string; z?: ComboZ }) {
  const w = z?.w ?? 42
  const vf = z?.vf ?? 19
  const uf = z?.uf ?? 7
  const radius = z?.radius ?? 8
  const pad = z?.pad ?? '4px 0 5px'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: boxFill,
        border: '1px solid var(--c-border-alt)',
        borderRadius: radius,
        padding: pad,
        width: w,
      }}
    >
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 900, fontSize: vf, lineHeight: 1, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: uf, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-text-dim)', marginTop: 2 }}>{unit}</div>
    </div>
  )
}


/**
 * Full-width unit-in-box timer for mobile: label on the left, squares on the right.
 * `setReminder` adds a green "Set reminder" text CTA under the label.
 */
export function UnitBoxBar({
  countdown,
  label = 'Next live show starts in',
  setReminder = false,
  fitContent = false,
  big = false,
  mini = false,
}: {
  countdown: Countdown
  label?: string
  setReminder?: boolean
  /** Shrink to content (modest gap) instead of stretching full-width with space-between. */
  fitContent?: boolean
  /** Scale the module up with the (capped) content width — Cinematic D desktop. */
  big?: boolean
  /** Compact version for the mobile live tile (D Tile). */
  mini?: boolean
}) {
  // When `big`, every dimension scales with the content width via container-query
  // units so the timer keeps pace with the hero on 2560 / 3440.
  const z: ComboZ | undefined = big
    ? { w: 'clamp(42px, 3.4cqw, 64px)', vf: 'clamp(19px, 1.5cqw, 30px)', uf: 'clamp(7px, 0.5cqw, 9.5px)', radius: 'clamp(8px, 0.7cqw, 11px)', pad: 'clamp(4px, 0.45cqw, 8px) 0' }
    : mini
      ? { w: 30, vf: 13, uf: 5.5, radius: 6, pad: '3px 0 3px' }
      : undefined
  const labelFs = big ? 'clamp(10px, 0.72cqw, 14px)' : mini ? 8.5 : 10
  const boxesGap = big ? 'clamp(5px, 0.5cqw, 9px)' : mini ? 3 : 5
  const colGap = fitContent ? (big ? 'clamp(18px, 1.6cqw, 30px)' : 18) : 10
  return (
    <div
      style={{
        display: fitContent ? 'inline-flex' : 'flex',
        alignItems: 'center',
        justifyContent: fitContent ? 'flex-start' : 'space-between',
        gap: colGap,
        width: fitContent ? 'auto' : '100%',
        background: 'rgba(4,4,7,.6)',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: big ? 'clamp(12px, 1cqw, 16px)' : mini ? 9 : 12,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: big ? 'clamp(8px, 0.8cqw, 13px) clamp(12px, 1.1cqw, 18px)' : mini ? '5px 8px' : '7px 12px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: mini ? 2 : 4, maxWidth: big ? 220 : 130 }}>
        <div style={{ fontSize: labelFs, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-text)', lineHeight: 1.2 }}>
          {label}
        </div>
        {setReminder && (
          <button
            className="brighten"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: big ? 6 : 4,
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--c-green)',
              // Match the "Next live show" label size on desktop and mobile.
              fontSize: labelFs,
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              cursor: 'pointer',
            }}
          >
            <BellIcon size={big ? 13 : mini ? 9 : 11} />
            Set reminder
          </button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: boxesGap }}>
        <ComboBlock value={countdown.d} unit="Days" z={z} />
        <ComboBlock value={countdown.h} unit="Hrs" z={z} />
        <ComboBlock value={countdown.m} unit="Min" z={z} />
        <ComboBlock value={countdown.s} unit="Sec" z={z} />
      </div>
    </div>
  )
}


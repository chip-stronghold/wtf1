import { useEffect, useState } from 'react'
import { SHOW_SCHEDULE } from '../config'

export interface Countdown {
  d: string
  h: string
  m: string
  s: string
  /** Compact form e.g. "1d 06:22:14" for the corner timer pills. */
  compact: string
}

export interface ShowClock {
  live: boolean
  countdown: Countdown
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Next occurrence of the weekly show slot at/after `from`. */
function nextShowStart(from: Date): Date {
  const { showDay, showHour, showMinute } = SHOW_SCHEDULE
  const d = new Date(from)
  d.setHours(showHour, showMinute, 0, 0)
  let delta = (showDay - d.getDay() + 7) % 7
  if (delta === 0 && d.getTime() <= from.getTime()) delta = 7
  d.setDate(d.getDate() + delta)
  return d
}

function compute(now: number): ShowClock {
  const nowDate = new Date(now)
  const next = nextShowStart(nowDate)
  // A show that started up to `durationMs` ago is still on air.
  const prevStart = new Date(next)
  prevStart.setDate(prevStart.getDate() - 7)
  const live = now >= prevStart.getTime() && now < prevStart.getTime() + SHOW_SCHEDULE.durationMs

  let t = Math.max(0, next.getTime() - now)
  const d = Math.floor(t / 86400000)
  const h = Math.floor((t % 86400000) / 3600000)
  const m = Math.floor((t % 3600000) / 60000)
  const s = Math.floor((t % 60000) / 1000)

  return {
    live,
    countdown: {
      d: pad(d),
      h: pad(h),
      m: pad(m),
      s: pad(s),
      compact: `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`,
    },
  }
}

/**
 * Live ticking show clock. Derives LIVE/OFFLINE from the weekly schedule and a
 * 1s countdown. `forceLive` (review override) pins the LIVE state on.
 */
export function useShowClock(forceLive?: boolean): ShowClock {
  const [clock, setClock] = useState<ShowClock>(() => compute(Date.now()))

  useEffect(() => {
    const tick = () => setClock(compute(Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (forceLive) return { ...clock, live: true }
  return clock
}

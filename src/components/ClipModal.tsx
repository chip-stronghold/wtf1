import { useEffect, useRef } from 'react'
import type { Clip } from '../data/lobby'
import { HERO_VIDEO } from '../data/lobby'
import { EyeIcon } from './icons'
import { LivePill } from './HeroBits'

/** Fullscreen clip player. Blurred backdrop (lobby shows through). Click backdrop / ✕ / Esc to close. */
export function ClipModal({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      const p = v.play()
      if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}) })
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,.5)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          height: 'min(88vh,760px)',
          aspectRatio: '9 / 16',
          maxWidth: '94vw',
          borderRadius: 20,
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 30px 90px rgba(0,0,0,.7)',
        }}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          autoPlay
          muted
          poster={clip.src}
          src={HERO_VIDEO}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(0,0,0,.35) 0%,transparent 22%,transparent 60%,rgba(0,0,0,.85) 100%)',
            pointerEvents: 'none',
          }}
        />
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'rgba(0,0,0,.5)',
            border: '1px solid rgba(255,255,255,.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <LivePill
          label="WTF Clips"
          style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--f-display)', fontWeight: 900, textTransform: 'uppercase' }}
        />
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18, pointerEvents: 'none' }}>
          <div
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 900,
              fontSize: 18,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            {clip.cap}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 7, fontSize: 11, color: 'var(--c-text-dim)' }}>
            <span style={{ fontWeight: 600 }}>{clip.handle}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <EyeIcon size={11} />
              {clip.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

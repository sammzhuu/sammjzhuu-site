"use client"

import { useEffect, useRef, useState } from "react"
import { Box } from "lucide-react"

interface ModelViewerProps {
  src?: string
  poster?: string
  alt: string
}

export function ModelViewer({ src, poster, alt }: ModelViewerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Lazy mount via IntersectionObserver
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Dynamically register @google/model-viewer custom element
  useEffect(() => {
    if (!inView || !src) return
    import('@google/model-viewer').then(() => setLoaded(true)).catch(() => {})
  }, [inView, src])

  return (
    <div
      ref={ref}
      className="mt-2 rounded-lg overflow-hidden max-w-lg"
      style={{ background: 'var(--dc-bg-secondary)', aspectRatio: '16/9', minHeight: '200px' }}
    >
      {!src ? (
        /* Placeholder — shown until .glb asset is uploaded */
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4"
          style={{ color: 'var(--dc-text-muted)' }}>
          <Box size={40} strokeWidth={1} />
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--dc-header-secondary)' }}>3D Model</p>
            <p className="text-xs mt-1">{alt}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--dc-interactive-muted)' }}>.glb coming soon</p>
          </div>
        </div>
      ) : !loaded ? (
        /* Loading state */
        <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--dc-text-muted)' }}>
          <div className="text-sm">Loading 3D model…</div>
        </div>
      ) : (
        /* @ts-expect-error — model-viewer is a web component, no TS types needed */
        <model-viewer
          src={src}
          poster={poster}
          alt={alt}
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}

"use client"

interface VideoEmbedProps {
  src: string
  poster?: string
  title?: string
}

export function VideoEmbed({ src, poster, title }: VideoEmbedProps) {
  return (
    <div
      className="mt-2 rounded-lg overflow-hidden max-w-lg"
      style={{ background: 'var(--dc-bg-secondary)' }}
    >
      {title && (
        <div className="px-3 pt-2 pb-1">
          <p className="text-xs font-semibold" style={{ color: 'var(--dc-text-muted)' }}>{title}</p>
        </div>
      )}
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        <video
          src={src}
          poster={poster}
          controls
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
          aria-label={title ?? 'Project video'}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

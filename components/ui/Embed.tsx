import type { ReactNode } from "react"

interface EmbedProps {
  title?: string
  description?: string
  color?: string
  children?: ReactNode
  footer?: string
}

export function Embed({ title, description, color = 'var(--dc-blurple)', children, footer }: EmbedProps) {
  return (
    <div className="mt-2 rounded flex overflow-hidden max-w-lg" style={{ background: 'var(--dc-bg-secondary)' }}>
      <div className="w-1 shrink-0 rounded-l" style={{ background: color }} />
      <div className="px-3 py-3 flex flex-col gap-2 flex-1 min-w-0">
        {title && <p className="font-semibold text-sm" style={{ color: 'var(--dc-header-primary)' }}>{title}</p>}
        {description && <p className="text-sm" style={{ color: 'var(--dc-text-normal)', lineHeight: 1.4 }}>{description}</p>}
        {children}
        {footer && <p className="text-xs mt-1" style={{ color: 'var(--dc-text-muted)' }}>{footer}</p>}
      </div>
    </div>
  )
}

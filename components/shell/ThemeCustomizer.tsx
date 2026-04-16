"use client"

import { X } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

interface ThemeCustomizerProps {
  onClose: () => void
}

export function ThemeCustomizer({ onClose }: ThemeCustomizerProps) {
  const { theme, setTheme, resetTheme } = useTheme()

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="relative w-80 rounded-lg p-6 flex flex-col gap-5"
        style={{ background: 'var(--dc-bg-floating)' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Theme customizer"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold" style={{ color: 'var(--dc-header-primary)' }}>Theme</h2>
          <button onClick={onClose} className="p-1 rounded" aria-label="Close" style={{ color: 'var(--dc-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <p className="text-sm" style={{ color: 'var(--dc-text-muted)' }}>
          Customise the gradient accent applied throughout the UI.
        </p>

        <div className="flex flex-col gap-4">
          <ColorRow
            label="Gradient start"
            value={theme.gradientStart === 'transparent' ? '#5865f2' : theme.gradientStart}
            onChange={v => setTheme({ ...theme, gradientStart: v })}
          />
          <ColorRow
            label="Gradient stop"
            value={theme.gradientStop === 'transparent' ? '#eb459e' : theme.gradientStop}
            onChange={v => setTheme({ ...theme, gradientStop: v })}
          />
        </div>

        <div
          className="h-8 rounded"
          style={{
            background: `linear-gradient(90deg, ${theme.gradientStart === 'transparent' ? '#5865f2' : theme.gradientStart}, ${theme.gradientStop === 'transparent' ? '#eb459e' : theme.gradientStop})`,
          }}
          aria-hidden="true"
        />

        <button onClick={resetTheme} className="text-sm py-1 rounded" style={{ color: 'var(--dc-text-muted)' }}>
          Reset to default
        </button>
      </div>
    </div>
  )
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm" style={{ color: 'var(--dc-text-normal)' }}>{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0.5" style={{ background: 'var(--dc-bg-secondary)' }} aria-label={label} />
        <span className="text-xs font-mono" style={{ color: 'var(--dc-text-muted)' }}>{value}</span>
      </div>
    </div>
  )
}

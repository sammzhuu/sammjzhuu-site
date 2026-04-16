"use client"

import { FormEvent, useRef, KeyboardEvent } from "react"
import { SendHorizonal } from "lucide-react"

interface ComposerProps {
  input: string
  isLoading: boolean
  onChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function Composer({ input, isLoading, onChange, onSubmit }: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="px-4 pb-4">
      <div
        className="flex items-end gap-2 rounded-lg px-3 py-2"
        style={{ background: "#383a40" }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask SamBot anything about Samuel…"
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-[var(--dc-text-muted)] text-[var(--dc-text-normal)] max-h-32 overflow-auto"
          style={{ lineHeight: "1.5" }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-1 rounded transition-opacity disabled:opacity-30"
          style={{ color: "var(--dc-blurple)" }}
          aria-label="Send message"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
      <p className="text-[11px] mt-1 text-center" style={{ color: "var(--dc-text-muted)" }}>
        SamBot can make mistakes. Press Enter to send, Shift+Enter for new line.
      </p>
    </form>
  )
}

"use client"

interface MessageBubbleProps {
  role: string
  content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div className="flex items-start gap-3 px-4 py-1 hover:bg-white/[0.03] group">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
        style={{
          background: isUser ? "#5865f2" : "var(--dc-blurple)",
          opacity: isUser ? 0.85 : 1,
        }}
      >
        {isUser ? "You" : "SB"}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--dc-header-primary)" }}>
            {isUser ? "You" : "SamBot"}
          </span>
          {!isUser && (
            <span
              className="text-[10px] font-medium px-1 py-0.5 rounded uppercase tracking-wide"
              style={{ background: "var(--dc-blurple)", color: "#fff" }}
            >
              BOT
            </span>
          )}
          <span className="text-xs" style={{ color: "var(--dc-text-muted)" }}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap break-words"
          style={{ color: "var(--dc-text-normal)" }}
        >
          {content}
        </p>
      </div>
    </div>
  )
}

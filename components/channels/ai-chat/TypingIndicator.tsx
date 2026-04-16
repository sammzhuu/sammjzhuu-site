"use client"

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4 py-1">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
        style={{ background: "var(--dc-blurple)" }}
      >
        SB
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--dc-header-primary)" }}>
            SamBot
          </span>
          <span
            className="text-[10px] font-medium px-1 py-0.5 rounded uppercase tracking-wide"
            style={{ background: "var(--dc-blurple)", color: "#fff" }}
          >
            BOT
          </span>
        </div>
        <div className="flex gap-1 items-center h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                background: "var(--dc-text-muted)",
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

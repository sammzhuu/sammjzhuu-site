"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { runCommand } from "@/lib/terminal/commands"
import type { TerminalEntry, TerminalMode } from "@/lib/terminal/types"

const transport = new DefaultChatTransport({ api: "/api/chat" })

const WELCOME = `samuel@portfolio:~$ — terminal v1.0
Type 'help' to see available commands. Type 'chat' to talk to SamBot.`

let entryCounter = 0
function makeId() {
  return `e-${++entryCounter}`
}

export function Terminal() {
  const [mode, setMode] = useState<TerminalMode>("command")
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { id: makeId(), type: "system", content: WELCOME },
  ])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: [],
  })
  const isChatLoading = status === "streaming" || status === "submitted"

  // Scroll only within the terminal output container — not the whole page
  function scrollToBottom() {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  const addEntry = useCallback((entry: Omit<TerminalEntry, "id">) => {
    setEntries((prev) => [...prev, { ...entry, id: makeId() }])
  }, [])

  const prevStatus = useRef<string>("ready")
  useEffect(() => {
    if (prevStatus.current === "streaming" && status === "ready") {
      const lastMsg = messages[messages.length - 1]
      if (lastMsg?.role === "assistant") {
        const textPart = lastMsg.parts?.find(
          (p): p is { type: "text"; text: string } => p.type === "text"
        )
        addEntry({
          type: "output",
          content: `SamBot: ${textPart?.text ?? ""}`,
        })
      }
    }
    prevStatus.current = status
  }, [status, messages, addEntry])

  useEffect(() => {
    scrollToBottom()
  }, [entries, isChatLoading])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    setInput("")

    if (mode === "chat") {
      if (text.toLowerCase() === "exit") {
        setMode("command")
        addEntry({ type: "system", content: "Returned to command mode." })
        return
      }
      if (!text) return
      addEntry({ type: "input", content: `you> ${text}` })
      sendMessage({ text })
      return
    }

    addEntry({ type: "input", content: `$ ${text}` })
    const result = runCommand(text)

    if (result.clear) {
      setEntries([{ id: makeId(), type: "system", content: WELCOME }])
      return
    }

    if (result.output) {
      addEntry({ type: "output", content: result.output })
    }

    if (result.switchToChat) {
      setMode("chat")
    }
  }

  const prompt = mode === "chat" ? "you>" : "$"
  const modeLabel =
    mode === "chat" ? " [chatbot — type 'exit' to quit]" : ""

  return (
    <div
      style={{
        background: "var(--t-surface)",
        border: "1px solid var(--t-border-2)",
        borderRadius: "4px",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "13px",
        overflow: "hidden",
        cursor: "text",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        style={{
          background: "var(--t-surface-2)",
          borderBottom: "1px solid var(--t-border)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "var(--t-text-muted)", fontSize: "12px" }}>
          samuel@portfolio:~{modeLabel}
        </span>
        {mode === "chat" && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: "11px",
              color: "var(--t-accent-2)",
              background: "rgba(129,140,248,0.1)",
              padding: "1px 6px",
              borderRadius: "2px",
            }}
          >
            chatbot
          </span>
        )}
      </div>

      {/* Output area — scrolls internally, never touches page scroll */}
      <div
        ref={outputRef}
        style={{
          height: "320px",
          overflowY: "auto",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {entries.map((entry) => (
          <pre
            key={entry.id}
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color:
                entry.type === "system"
                  ? "var(--t-text-muted)"
                  : entry.type === "input"
                  ? "var(--t-white)"
                  : entry.type === "error"
                  ? "var(--t-red)"
                  : "var(--t-text)",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "1.55",
            }}
          >
            {entry.content}
          </pre>
        ))}
        {isChatLoading && (
          <pre
            style={{
              margin: 0,
              color: "var(--t-text-muted)",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          >
            {"SamBot: "}
            <span className="cursor-blink" />
          </pre>
        )}
      </div>

      {/* Input row */}
      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: "1px solid var(--t-border)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "var(--t-accent)", userSelect: "none" }}>
          {prompt}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isChatLoading}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--t-white)",
            fontFamily: "inherit",
            fontSize: "inherit",
            caretColor: "var(--t-accent)",
          }}
        />
      </form>
    </div>
  )
}

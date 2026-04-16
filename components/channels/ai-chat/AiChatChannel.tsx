"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef, useState } from "react"
import { MessageBubble } from "./MessageBubble"
import { TypingIndicator } from "./TypingIndicator"
import { Composer } from "./Composer"

const transport = new DefaultChatTransport({ api: "/api/chat" })

export function AiChatChannel() {
  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: "initial",
        role: "assistant",
        parts: [{ type: "text", text: "Hey! I'm SamBot — ask me anything about Samuel: his projects, experience, tech stack, or anything else on your mind." }],
        metadata: {},
      },
    ],
  })
  const [input, setInput] = useState("")
  const isLoading = status === "streaming" || status === "submitted"

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    setInput("")
    sendMessage({ text })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-0.5">
        {messages.map((msg) => {
          const textPart = msg.parts?.find((p): p is { type: "text"; text: string } => p.type === "text")
          const content = textPart?.text ?? ""
          return <MessageBubble key={msg.id} role={msg.role} content={content} />
        })}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="px-4">
            <p className="text-sm" style={{ color: "#f23f43" }}>
              Something went wrong. Try again in a moment.
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <Composer
        input={input}
        isLoading={isLoading}
        onChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

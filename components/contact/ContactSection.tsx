"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"

type FormState = "idle" | "sending" | "success" | "error"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formState === "sending") return

    setFormState("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          (data as { error?: string }).error ?? "Request failed"
        )
      }

      setFormState("success")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      setFormState("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--t-surface-2)",
    border: "1px solid var(--t-border-2)",
    borderRadius: "3px",
    padding: "10px 12px",
    color: "var(--t-white)",
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "13px",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  }

  return (
    <SectionWrapper id="contact" altBg>
      <Panel section="contact" subsection="message" meta="→ discord">
      <div style={{ padding: "1.25rem" }}>
      {formState === "success" ? (
        <div
          style={{
            border: "1px solid rgba(96,165,250,0.2)",
            borderRadius: "4px",
            padding: "1.5rem",
            background: "rgba(96,165,250,0.06)",
            color: "var(--t-accent)",
            fontSize: "14px",
          }}
        >
          <span style={{ marginRight: "8px" }}>✓</span>
          Message sent — I&apos;ll get back to you soon.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "560px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--t-text-muted)",
                  marginBottom: "6px",
                }}
              >
                name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name"
                style={inputStyle}
                onFocus={(e) => {
                  ;(e.target as HTMLInputElement).style.borderColor =
                    "var(--t-accent)"
                }}
                onBlur={(e) => {
                  ;(e.target as HTMLInputElement).style.borderColor =
                    "var(--t-border-2)"
                }}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--t-text-muted)",
                  marginBottom: "6px",
                }}
              >
                email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={(e) => {
                  ;(e.target as HTMLInputElement).style.borderColor =
                    "var(--t-accent)"
                }}
                onBlur={(e) => {
                  ;(e.target as HTMLInputElement).style.borderColor =
                    "var(--t-border-2)"
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              style={{
                display: "block",
                fontSize: "12px",
                color: "var(--t-text-muted)",
                marginBottom: "6px",
              }}
            >
              message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="what's on your mind?"
              style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
              onFocus={(e) => {
                ;(e.target as HTMLTextAreaElement).style.borderColor =
                  "var(--t-accent)"
              }}
              onBlur={(e) => {
                ;(e.target as HTMLTextAreaElement).style.borderColor =
                  "var(--t-border-2)"
              }}
            />
          </div>

          {formState === "error" && (
            <p
              style={{ fontSize: "13px", color: "var(--t-red)", margin: 0 }}
            >
              ✗ {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={formState === "sending"}
            style={{
              alignSelf: "flex-start",
              background:
                formState === "sending"
                  ? "var(--t-surface-2)"
                  : "var(--t-accent)",
              color:
                formState === "sending" ? "var(--t-text-muted)" : "#000",
              border: "none",
              borderRadius: "3px",
              padding: "10px 20px",
              fontSize: "13px",
              fontFamily: "var(--font-mono, monospace)",
              fontWeight: 600,
              cursor: formState === "sending" ? "not-allowed" : "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {formState === "sending" ? "sending..." : "send message →"}
          </button>
        </form>
      )}
      </div>
      </Panel>
    </SectionWrapper>
  )
}

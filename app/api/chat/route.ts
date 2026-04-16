import { streamText } from "ai"
import { z } from "zod"
import { getAnthropicClient, CHAT_MODEL, MAX_TOKENS } from "@/lib/ai/anthropic"
import { buildSystemPrompt } from "@/lib/ai/systemPrompt"
import { NextRequest } from "next/server"

export const runtime = "edge"

const messagePartSchema = z.union([
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.string() }).passthrough(),
])

const uiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(messagePartSchema).optional(),
  content: z.string().optional(),
  metadata: z.unknown().optional(),
})

const requestSchema = z.object({
  messages: z.array(uiMessageSchema).min(1).max(40),
})

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60_000

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (record.count >= RATE_LIMIT) return false
  record.count++
  return true
}

function extractText(msg: z.infer<typeof uiMessageSchema>): string {
  if (msg.parts) {
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("\n")
  }
  return msg.content ?? ""
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const coreMessages = parsed.data.messages.map((m) => ({
    role: m.role,
    content: extractText(m),
  }))

  try {
    const client = getAnthropicClient()
    const result = streamText({
      model: client(CHAT_MODEL),
      system: buildSystemPrompt(),
      messages: coreMessages,
      maxOutputTokens: MAX_TOKENS,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

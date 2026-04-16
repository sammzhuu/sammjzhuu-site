import { createAnthropic } from "@ai-sdk/anthropic"

let _client: ReturnType<typeof createAnthropic> | null = null

export function getAnthropicClient() {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured")
    }
    _client = createAnthropic({ apiKey })
  }
  return _client
}

export const CHAT_MODEL = "claude-haiku-4-5-20251001"
export const MAX_TOKENS = 500

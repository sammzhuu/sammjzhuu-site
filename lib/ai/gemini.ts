import { createGoogleGenerativeAI } from "@ai-sdk/google"

let _client: ReturnType<typeof createGoogleGenerativeAI> | null = null

export function getGeminiClient() {
  if (!_client) {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not configured")
    }
    _client = createGoogleGenerativeAI({ apiKey })
  }
  return _client
}

// gemini-2.5-flash — free tier on Google AI Studio
export const CHAT_MODEL = "gemini-2.5-flash"
export const MAX_TOKENS = 400

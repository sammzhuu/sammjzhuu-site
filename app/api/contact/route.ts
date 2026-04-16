import { z } from "zod"
import { NextRequest } from "next/server"

const bodySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(1).max(2000),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    return Response.json({ error: "Contact not configured" }, { status: 503 })
  }

  const { name, email, message } = parsed.data

  const discordPayload = {
    embeds: [
      {
        title: `New message from ${name}`,
        description: message,
        color: 0x00ff41,
        fields: [{ name: "Email", value: email, inline: true }],
        footer: { text: "samuel@portfolio contact form" },
      },
    ],
  }

  const discordRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discordPayload),
  })

  if (!discordRes.ok) {
    return Response.json({ error: "Failed to send message" }, { status: 502 })
  }

  return Response.json({ ok: true })
}

"use client"

import { ExternalLink, Mail, MessageSquare } from "lucide-react"
import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"
import { socialLinks } from "@/lib/data"

export function ContactChannel() {
  return (
    <div className="py-4 flex flex-col gap-1">
      <Message authorName="Samuel Zhu" authorInitials="SZ" timestamp="Today">
        <p className="text-sm leading-relaxed" style={{ color: "var(--dc-text-normal)" }}>
          Hey! The best ways to reach me are below. I'm always open to interesting conversations — whether it's about a role, a project, or anything in the intersection of robotics, AI, and music.
        </p>

        <div className="mt-3">
          <Embed color="#5865f2" title="Contact & Links">
            <div className="flex flex-col gap-2 mt-1">
              {socialLinks.map((link) => {
                const Icon = link.icon === "email" ? Mail : ExternalLink
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== "email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--dc-text-link)" }}
                  >
                    <Icon size={14} />
                    <span className="font-medium">{link.label}</span>
                    <span className="text-xs" style={{ color: "var(--dc-text-muted)" }}>
                      {link.icon === "github" && "github.com/sammjzhuu"}
                      {link.icon === "linkedin" && "linkedin.com/in/sammjzhuu"}
                      {link.icon === "email" && "zjiale1118@gmail.com"}
                    </span>
                  </a>
                )
              })}
            </div>
          </Embed>
        </div>

        <div className="mt-3">
          <Embed color="#949ba4" title="Discord Bot — Coming Soon" description="A contact form powered by a Discord webhook is on the roadmap. For now, reach out directly via the links above.">
            <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: "var(--dc-text-muted)" }}>
              <MessageSquare size={13} />
              <span>Direct message via Discord bot — in progress</span>
            </div>
          </Embed>
        </div>
      </Message>
    </div>
  )
}

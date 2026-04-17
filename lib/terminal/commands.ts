import { about, projects, techStack, socialLinks, experience, education } from "@/lib/data"

export interface CommandResult {
  output: string
  switchToChat?: boolean
  clear?: boolean
}

function pad(s: string, w: number): string {
  return s.padEnd(w, " ")
}

const HELP_TEXT = `Available commands:

  about        Who is Samuel
  skills       Tech stack overview
  projects     Things Samuel has built
  experience   Work history
  contact      Ways to get in touch
  clear        Clear the terminal
  chat         Switch to AI chat mode (ask anything)`

export function runCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase()

  switch (cmd) {
    case "help":
      return { output: HELP_TEXT }

    case "about":
      return { output: about.body }

    case "skills": {
      const lines = techStack.map(
        (g) => `  ${pad(g.group + ":", 28)} ${g.items.join(", ")}`
      )
      return { output: ["Tech stack:", ...lines].join("\n") }
    }

    case "projects": {
      const lines = projects.map((p) => {
        const status = p.status === "complete" ? "[done]" : "[wip] "
        const tags = p.tags.slice(0, 3).join(", ")
        return `  ${status} ${pad(p.title, 22)} ${p.context}\n         ${p.description}\n         Tags: ${tags}`
      })
      return { output: ["Projects:", ...lines].join("\n\n") }
    }

    case "experience": {
      const expLines = experience.map(
        (e) =>
          `  ${pad(e.period, 22)} ${e.role} @ ${e.company}\n  ${" ".repeat(22)} ${e.tags.slice(0, 4).join(", ")}`
      )
      const eduLines = education.map(
        (e) => `  ${pad(e.period, 22)} ${e.degree}\n  ${" ".repeat(22)} ${e.school}`
      )
      return {
        output: [
          "Work Experience:",
          ...expLines,
          "",
          "Education:",
          ...eduLines,
        ].join("\n"),
      }
    }

    case "contact": {
      const links = socialLinks.map((s) => `  ${pad(s.label + ":", 12)} ${s.href}`)
      return {
        output: [
          "Get in touch:",
          ...links,
          "",
          "Or use the contact form below — it goes straight to my Discord.",
        ].join("\n"),
      }
    }

    case "clear":
      return { output: "", clear: true }

    case "chat":
      return {
        output: "Switching to chat mode. Type 'exit' to return to commands.",
        switchToChat: true,
      }

    case "exit":
      return { output: "Already in command mode. Type 'help' for commands." }

    case "":
      return { output: "" }

    default:
      return {
        output: `command not found: ${input}\nType 'help' to see available commands.`,
      }
  }
}

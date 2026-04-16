export type TerminalMode = "command" | "chat"

export interface TerminalEntry {
  id: string
  type: "input" | "output" | "error" | "system"
  content: string
}

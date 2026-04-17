"use client"

import { SectionWrapper } from "@/components/ui/SectionWrapper"
import { Panel } from "@/components/ui/Panel"
import { Terminal } from "./Terminal"

export function TerminalSection() {
  return (
    <SectionWrapper id="terminal">
      <Panel section="terminal" subsection="cli" meta="type 'help'">
        <Terminal />
      </Panel>
    </SectionWrapper>
  )
}

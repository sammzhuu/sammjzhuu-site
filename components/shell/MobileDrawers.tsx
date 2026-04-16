"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ChannelSidebar } from "@/components/shell/ChannelSidebar"
import { MembersPanel } from "@/components/shell/MembersPanel"

interface MobileDrawersProps {
  channelsOpen: boolean
  membersOpen: boolean
  onClose: () => void
}

export function MobileDrawers({ channelsOpen, membersOpen, onClose }: MobileDrawersProps) {
  return (
    <>
      <Drawer open={channelsOpen} side="left" onClose={onClose} label="Channels"><ChannelSidebar /></Drawer>
      <Drawer open={membersOpen} side="right" onClose={onClose} label="Members"><MembersPanel /></Drawer>
    </>
  )
}

function Drawer({ open, side, onClose, label, children }: {
  open: boolean; side: 'left' | 'right'; onClose: () => void; label: string; children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-30" style={{ background: 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <motion.div className="fixed top-0 bottom-0 z-40" style={{ [side]: 0 }}
            initial={{ x: side === 'left' ? '-100%' : '100%' }} animate={{ x: 0 }}
            exit={{ x: side === 'left' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog" aria-modal="true" aria-label={label}>
            <div className="relative h-full">
              <button onClick={onClose} className="absolute top-3 z-10 p-1 rounded"
                style={{ [side === 'left' ? 'right' : 'left']: '-2rem', background: 'var(--dc-bg-floating)', color: 'var(--dc-text-muted)' }}
                aria-label="Close"><X size={16} /></button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

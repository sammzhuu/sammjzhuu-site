"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LOADING_TIPS, SERVER_META } from "@/lib/constants"

const MIN_DISPLAY_MS = 800
const AUTO_HIDE_MS = 1800

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const seen = sessionStorage.getItem('dc-loaded')
    if (seen) { setVisible(false); return }

    const tipInterval = setInterval(() => {
      setTipIndex(i => (i + 1) % LOADING_TIPS.length)
    }, 600)

    const minTimer = setTimeout(() => {
      clearInterval(tipInterval)
      setVisible(false)
      sessionStorage.setItem('dc-loaded', '1')
    }, Math.max(MIN_DISPLAY_MS, AUTO_HIDE_MS))

    return () => { clearInterval(tipInterval); clearTimeout(minTimer) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
          style={{ background: 'var(--dc-bg-floating)' }}
          aria-label="Loading"
          role="status"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white select-none"
            style={{ background: 'var(--dc-blurple)' }}
            aria-hidden="true"
          >
            {SERVER_META.iconInitials}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm max-w-xs text-center px-4"
              style={{ color: 'var(--dc-text-muted)' }}
            >
              {LOADING_TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

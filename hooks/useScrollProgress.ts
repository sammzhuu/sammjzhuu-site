"use client"

import { useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

export function useScrolledPast(threshold: number): boolean {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    setPast(y > threshold)
  })

  return past
}

"use client"

import { useState, useEffect, useCallback } from "react"

export interface ThemeConfig {
  gradientStart: string
  gradientStop: string
}

const DEFAULT_THEME: ThemeConfig = {
  gradientStart: "transparent",
  gradientStop: "transparent",
}

const STORAGE_KEY = "dc-theme"

function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement
  root.style.setProperty("--theme-gradient-start", theme.gradientStart)
  root.style.setProperty("--theme-gradient-stop", theme.gradientStop)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeConfig>(DEFAULT_THEME)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as ThemeConfig
        setThemeState(parsed)
        applyTheme(parsed)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  const setTheme = useCallback((next: ThemeConfig) => {
    setThemeState(next)
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore storage errors
    }
  }, [])

  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME)
    localStorage.removeItem(STORAGE_KEY)
  }, [setTheme])

  return { theme, setTheme, resetTheme }
}

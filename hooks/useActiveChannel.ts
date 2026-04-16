"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { DEFAULT_CHANNEL, type ChannelId } from "@/lib/constants"

export function useActiveChannel(): [ChannelId, (id: ChannelId) => void] {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const active = (searchParams.get("c") as ChannelId) ?? DEFAULT_CHANNEL

  const setChannel = useCallback(
    (id: ChannelId) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("c", id)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return [active, setChannel]
}

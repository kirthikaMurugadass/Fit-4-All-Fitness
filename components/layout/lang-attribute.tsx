"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocaleFromPath } from "@/lib/i18n"

export function LangAttribute() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)

  useEffect(() => {
    // Set the lang attribute on the root html element
    document.documentElement.lang = locale
  }, [locale])

  return null
}

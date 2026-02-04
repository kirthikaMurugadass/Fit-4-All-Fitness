"use client"

import { usePathname } from "next/navigation"
import { getLocaleFromPath, getTranslations, type Locale } from "./index"

export function useTranslations() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = getTranslations(locale)

  return { t, locale }
}

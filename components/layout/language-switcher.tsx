"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getLocaleFromPath, addLocaleToPath, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English (EN)" },
  { code: "de", label: "Deutsch (DE)" },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPath(pathname)
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false)
      return
    }

    // Get current path without locale
    let pathWithoutLocale = pathname
    if (pathname.startsWith("/de/")) {
      pathWithoutLocale = pathname.replace("/de/", "/")
    } else if (pathname === "/de") {
      pathWithoutLocale = "/"
    }

    // Add new locale to path
    const newPath = addLocaleToPath(pathWithoutLocale, locale)
    
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-[44px] min-w-[44px] p-2"
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "cursor-pointer",
              currentLocale === lang.code && "bg-primary/10 text-primary font-medium"
            )}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

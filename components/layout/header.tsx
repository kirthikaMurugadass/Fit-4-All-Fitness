"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "./language-switcher"
import { getLocaleFromPath, getTranslations, addLocaleToPath } from "@/lib/i18n"

// Header Component - Documentation Section 3.2
// Logo + nav + CTA button, responsive with mobile menu
// Now includes logo image, active navigation state, and language switcher

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const t = getTranslations(locale)

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.programs, href: "/programs" },
    { label: t.nav.trainers, href: "/trainers" },
    { label: t.nav.membership, href: "/membership" },
  ]

  // Helper to get locale-aware href
  const getHref = (href: string) => {
    return addLocaleToPath(href, locale)
  }

  // Check if pathname matches (accounting for locale)
  const isActive = (href: string) => {
    const localeHref = getHref(href)
    return pathname === localeHref || (href === "/" && (pathname === "/" || pathname === "/de"))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          {/* Logo + Text */}
          <Link href={getHref("/")} className="flex items-center space-x-3" aria-label="Fit 4All Fitness Home">
            {/* <Image
              src="/images/logo.png"
              alt="Fit 4All Fitness Logo"
              width={340}
              height={340}
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              priority
            /> */}
            <span className="text-xl font-bold">Fit 4All Fitness</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href={getHref("/contact")}>
              <Button size="sm" variant={isActive("/contact") ? "default" : "outline"}>
                {t.nav.contact}
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button + Language Switcher - Documentation Section 7.4: Minimum 44x44px touch target */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu - Documentation: Full-screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <Container className="pt-20">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item, index) => {
                  const active = isActive(item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={getHref(item.href)}
                        className={cn(
                          "text-2xl font-semibold transition-colors block",
                          active
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Link href={getHref("/contact")} onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      size="lg" 
                      className="w-full"
                      variant={isActive("/contact") ? "default" : "outline"}
                    >
                      {t.nav.contact}
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
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
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Close menu on link click
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Lock body scroll when menu is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileMenuOpen])

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

      {/* Mobile Menu - Full-screen overlay with backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel - Slide in from top */}
            <motion.div
              ref={menuRef}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.4
              }}
              className="fixed inset-x-0 top-0 z-50 bg-background md:hidden shadow-2xl"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <span className="text-xl font-bold">Fit 4All Fitness</span>
                <button
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
                <nav className="flex flex-col px-6 py-8 space-y-1">
                  {navItems.map((item, index) => {
                    const active = isActive(item.href)
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.08,
                          type: "spring",
                          damping: 20
                        }}
                      >
                        <Link
                          href={getHref(item.href)}
                          className={cn(
                            "block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200",
                            active
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-foreground hover:bg-muted hover:text-primary"
                          )}
                          onClick={handleLinkClick}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                  
                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: navItems.length * 0.08,
                      type: "spring",
                      damping: 20
                    }}
                    className="pt-6"
                  >
                    <Link 
                      href={getHref("/contact")} 
                      onClick={handleLinkClick}
                      className="block"
                    >
                      <Button 
                        size="lg" 
                        className="w-full text-base font-semibold h-12"
                        variant={isActive("/contact") ? "default" : "default"}
                      >
                        {t.nav.contact}
                      </Button>
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

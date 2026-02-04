"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import { SplitText } from "@/components/animations/split-text"
import { ShinyText } from "@/components/animations/shiny-text"
import { client } from "@/sanity/lib/client"
import { heroQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

// Hero Section - 3 premium images side-by-side with centered overlay content

type LocalizedText = {
  en?: string
  de?: string
  [key: string]: string | undefined
}

type HeroCta = {
  text?: LocalizedText
  link?: string
}

type HeroDoc = {
  _id: string
  title?: LocalizedText
  subtitle?: LocalizedText
  backgroundImages?: any[]
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
}

export function HeroSection() {
  const { t, locale } = useTranslations()
  const [hero, setHero] = useState<HeroDoc | null>(null)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await client.fetch<HeroDoc | null>(heroQuery)
        setHero(data)
      } catch (error) {
        console.error("Error fetching hero data from Sanity:", error)
        setHero(null)
      }
    }

    fetchHero()
  }, [])

  const currentLocale = locale === "de" ? "de" : "en"

  const headlineText =
    hero?.title?.[currentLocale] || hero?.title?.en || t.hero.headline
  const subheadlineText =
    hero?.subtitle?.[currentLocale] || hero?.subtitle?.en || t.hero.subheadline

  const primaryCtaText =
    hero?.primaryCta?.text?.[currentLocale] ||
    hero?.primaryCta?.text?.en ||
    t.hero.ctaPrimary
  const secondaryCtaText =
    hero?.secondaryCta?.text?.[currentLocale] ||
    hero?.secondaryCta?.text?.en ||
    t.hero.ctaSecondary

  const primaryCtaHref = addLocaleToPath(hero?.primaryCta?.link || "/contact", locale)
  const secondaryCtaHref = addLocaleToPath(hero?.secondaryCta?.link || "/programs", locale)

  const bgImages = hero?.backgroundImages || []
  const bg1Src =
    bgImages[0] ? urlFor(bgImages[0]).width(1600).height(2000).url() : "/images/hero-1.jpeg"
  const bg2Src =
    bgImages[1] ? urlFor(bgImages[1]).width(1600).height(2000).url() : "/images/hero-4.jpeg"
  const bg3Src =
    bgImages[2] ? urlFor(bgImages[2]).width(1600).height(2000).url() : "/images/hero-3.jpeg"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3 Premium Images Side-by-Side - Responsive grid layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Image 1 - Visible on all screens, hidden on mobile (center image priority) */}
        <div className="relative hidden md:block h-screen">
          <Image
            src={bg1Src}
            alt="Premium gym strength training area"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Image 2 - Center image, always visible (priority on mobile) */}
        <div className="relative h-screen">
          <Image
            src={bg2Src}
            alt="Premium gym facility with elite equipment"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Image 3 - Visible on desktop only */}
        <div className="relative hidden lg:block h-screen">
          <Image
            src={bg3Src}
            alt="Premium gym cardio and functional training space"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="33vw"
          />
        </div>

        {/* Dark overlay for text readability - covers all images */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
        {/* Subtle accent gradient overlay using theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      </motion.div>

      {/* Centered Content Overlay */}
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          {/* Headline */}
          <h1 className="display-heading text-foreground drop-shadow-lg">
            
            <ShinyText
              text={headlineText}
              speed={3}
              color="rgba(255, 255, 255, 0.8)"
              shineColor="#ffffff"
              spread={120}
              className="block"
            />
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-lg md:text-xl text-foreground/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            {subheadlineText}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href={primaryCtaHref}>
              <Button size="lg" variant="default">
                {primaryCtaText}
              </Button>
            </Link>
            <Link href={secondaryCtaHref}>
              <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm border-foreground/20">
                {secondaryCtaText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-foreground/80 drop-shadow-lg"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

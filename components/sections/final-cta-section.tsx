"use client"

import { Container, Section } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import Link from "next/link"

// Final CTA Section - Documentation Section 4.1.7
// Full-width section with dramatic background, centered text, prominent CTAs
// Now includes strong background image with dark overlay

export function FinalCTASection() {
  const { t, locale } = useTranslations()
  return (
    <Section spacing="lg" className="relative overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Strong Background Image - Cinematic, high-impact */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-background.jpg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability - maintains luxury dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/80" />
        {/* Subtle accent gradient overlay using theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground drop-shadow-lg">
            {t.cta.title}
          </h2>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-foreground/95 max-w-2xl mx-auto drop-shadow-md">
            {t.cta.subtitle}
          </p>

          {/* CTAs - Documentation: Primary + Secondary, stacked mobile, horizontal desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={addLocaleToPath("/contact", locale)}>
              <Button size="lg" variant="default" className="text-lg px-8">
                {t.cta.primary}
              </Button>
            </Link>
            <Link href={addLocaleToPath("/contact", locale)}>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-background/80 backdrop-blur-sm border-foreground/20 text-foreground hover:bg-background/90">
                {t.cta.secondary}
              </Button>
            </Link>
          </div>

          {/* Optional: Urgency element */}
          <p className="text-sm text-foreground/80 pt-4 drop-shadow-sm">
            {t.cta.urgency}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

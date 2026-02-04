"use client"

import { Container } from "@/components/layout/container"
import { motion } from "framer-motion"
import Image from "next/image"

// Page Hero Component - Documentation Section 4.2.1, 4.3.1, etc.
// Standard page hero for About, Programs, Trainers, Contact pages
// 40-50vh height, centered text
// Now includes premium background image support

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              quality={85}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
            {/* Subtle accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        )}
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <h1 className="mb-4 drop-shadow-lg">{title}</h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground/95 max-w-2xl mx-auto drop-shadow-md">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}

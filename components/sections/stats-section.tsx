"use client"

import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { NumberCounter } from "@/components/animations/number-counter"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"

type Stat = {
  _id: string
  label: {
    en?: string
    de?: string
  }
  value: number
  decimals?: number
  suffix?: string
}

type StatsSectionProps = {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  const { t, locale } = useTranslations()

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <Section spacing="lg" className="relative overflow-hidden bg-background">
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/membership-bg.jpg"
          alt=""
          fill
          quality={40}
          className="object-cover opacity-[0.04]"
          sizes="100vw"
        />
      </div>

      <Container className="relative z-10">
        <div className="space-y-12">
          {/* ---------- HEADER ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 suppressHydrationWarning>{t.homeStats.title}</h2>
            <p suppressHydrationWarning className="text-muted-foreground text-lg">
              {t.homeStats.subtitle}
            </p>
          </motion.div>

          {/* ---------- STATS ---------- */}
          <Grid cols={{ mobile: 2, tablet: 3, desktop: 4 }} gap="lg">
            {stats.map((stat) => (
              <NumberCounter
                key={stat._id}
                value={stat.value}
                label={stat.label?.[locale] || stat.label?.en || ""}
                duration={2000}
                decimals={stat.decimals || 0}
                suffix={stat.suffix || ""}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  )
}

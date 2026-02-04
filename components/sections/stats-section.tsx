"use client"

import { useEffect, useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { NumberCounter } from "@/components/animations/number-counter"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"
import { testimonialStatsQuery } from "@/sanity/lib/queries"
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

export function StatsSection() {
  const { locale } = useTranslations()
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch stats from Sanity
    client
      .fetch<Stat[]>(testimonialStatsQuery)
      .then((data) => {
        console.log("Stats fetched:", data)
        setStats(data || [])
      })
      .catch((error) => {
        console.error("Error fetching stats:", error)
        setStats([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Don't render if no stats and not loading (to avoid empty section)
  if (!loading && stats.length === 0) {
    return null
  }

  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <div className="space-y-12">
          {/* ---------- HEADER ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2>Our Impact</h2>
            <p className="text-muted-foreground text-lg">
              Numbers that reflect our commitment to your fitness journey.
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

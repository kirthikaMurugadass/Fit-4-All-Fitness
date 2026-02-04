"use client"

import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"
import { urlFor } from "@/sanity/lib/image"

type Facility = {
  _id: string
  title: {
    en?: string
    de?: string
  }
  description: {
    en?: string
    de?: string
  }
  image: any
}

type FacilitiesSectionProps = {
  facilities: Facility[]
}

export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  const { t, locale } = useTranslations()
  const currentLocale = locale === "de" ? "de" : "en"

  // Only render facilities that have content for the active locale
  const localizedFacilities = facilities.filter(
    (facility) =>
      facility.title?.[currentLocale] && facility.description?.[currentLocale]
  )

  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="mb-4">{t.about.facilities.title}</h2>
            <p className="text-muted-foreground text-lg">{t.about.facilities.subtitle}</p>
          </motion.div>

          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {localizedFacilities.map((facility, index) => {
              const title = facility.title?.[currentLocale] || ""
              const description = facility.description?.[currentLocale] || ""

              return (
                <motion.div
                  key={facility._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {facility.image && (
                        <Image
                          src={urlFor(facility.image).width(800).height(600).url()}
                          alt={title}
                          fill
                          quality={85}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </Grid>
        </div>
      </Container>
    </Section>
  )
}

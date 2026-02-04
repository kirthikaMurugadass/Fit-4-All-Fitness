"use client"

import { useEffect, useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/layout/page-hero"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type LocalizedText = {
  en?: string
  de?: string
  [key: string]: string | undefined
}

type Trainer = {
  _id: string
  name: LocalizedText | string
  role: LocalizedText | string
  bio: LocalizedText | string
  image: any
}

const getLocalizedText = (value: LocalizedText | string | undefined, locale: string): string => {
  if (!value) return ""
  if (typeof value === "string") return value
  return value[locale] || value.en || value.de || ""
}

export function TrainersPageContent() {
  const { t, locale } = useTranslations()
  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    const fetchTrainers = async () => {
      const query = `
        *[_type == "trainer"] | order(_createdAt desc) {
          _id,
          name,
          role,
          bio,
          image
        }
      `
      const data = await client.fetch(query)
      setTrainers(data)
    }

    fetchTrainers()
  }, [])

  return (
    <main className="min-h-screen">
      <PageHero
        title={t.trainersPage.title}
        subtitle={t.trainersPage.subtitle}
        backgroundImage="/images/trainer-bg.jpg"
      />

      <Section spacing="lg">
        <Container>
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {trainer.image && (
                      <>
                        <Image
                          src={urlFor(trainer.image).width(600).height(600).url()}
                          alt={getLocalizedText(trainer.name, locale) || "Trainer"}
                          fill
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Button variant="ghost" size="sm" className="text-white">
                        {t.trainers.viewProfile}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  <CardHeader className="flex-grow">
                    <CardTitle className="text-xl">
                      {getLocalizedText(trainer.name, locale)}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-primary mt-1">
                      {getLocalizedText(trainer.role, locale)}
                    </CardDescription>
                    <CardDescription className="text-sm mt-4">
                      {getLocalizedText(trainer.bio, locale)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Link href={addLocaleToPath("/contact", locale)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {t.trainers.bookSession}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  )
}

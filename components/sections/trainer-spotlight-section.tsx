"use client"

import { useEffect, useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

type TrainerSpotlightSectionProps = {
  limit?: number
}

type LocalizedText = {
  en?: string
  de?: string
  [key: string]: string | undefined
}

type Trainer = {
  _id: string
  name: LocalizedText | string
  role: LocalizedText | string
  credentials?: LocalizedText | string
  bio: LocalizedText | string
  image: any
}

const getLocalizedText = (value: LocalizedText | string | undefined, locale: string): string => {
  if (!value) return ""
  if (typeof value === "string") return value
  return value[locale] || value.en || value.de || ""
}

export function TrainerSpotlightSection({ limit = 4 }: TrainerSpotlightSectionProps) {
  const { t, locale } = useTranslations()
  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    const fetchTrainers = async () => {
      const query = `
        *[_type == "trainer" && showOnHome == true] | order(order asc, _createdAt asc)[0...$limit] {
          _id,
          name,
          role,
          credentials,
          bio,
          image
        }
      `

      const data = await client.fetch(query, { limit })
      setTrainers(data)
    }

    fetchTrainers()
  }, [limit])

  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="mb-4">{t.trainers.title}</h2>
            <p className="text-muted-foreground text-lg">
              {t.trainers.subtitle}
            </p>
          </motion.div>

          {/* Trainers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {trainer.image && (
                      <Image
                        src={urlFor(trainer.image).width(500).height(500).url()}
                        alt={`${getLocalizedText(trainer.name, locale)} - ${getLocalizedText(trainer.role, locale)}`}
                        fill
                        className="object-cover object-top"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <motion.div
                      className="absolute inset-0 bg-black/70 flex items-center justify-center"
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

                  {/* Content */}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl">
                        {getLocalizedText(trainer.name, locale)}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-primary mt-1">
                        {getLocalizedText(trainer.role, locale)}
                      </CardDescription>

                      {trainer.credentials && (
                        <CardDescription className="text-xs text-muted-foreground mt-2">
                          {getLocalizedText(trainer.credentials, locale)}
                        </CardDescription>
                      )}

                      <CardDescription className="text-sm mt-4">
                        {getLocalizedText(trainer.bio, locale)}
                      </CardDescription>
                    </CardHeader>

                  <CardContent>
                    <Link href={addLocaleToPath("/trainers", locale)}>
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
          </div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link href={addLocaleToPath("/trainers", locale)}>
              <Button variant="outline" size="lg">
                {t.trainers.viewAll}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

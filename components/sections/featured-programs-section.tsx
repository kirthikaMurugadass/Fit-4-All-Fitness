"use client"

import { useEffect, useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
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

type Program = {
  _id: string
  slug: string
  name: Record<string, string>
  description: Record<string, string>
  difficulty?: Record<string, string>
  image: any
}

export function FeaturedProgramsSection() {
  const { t, locale } = useTranslations()
  const [programs, setPrograms] = useState<Program[]>([])

  // -------- FETCH FROM SANITY --------
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // First try to get featured programs
        let data = await client.fetch(`
          *[_type == "program" && active == true && featured == true]
          | order(order asc)[0...3] {
            _id,
            "slug": slug.current,
            name,
            description,
            difficulty,
            image
          }
        `)

        // If no featured programs, fallback to any active programs
        if (!data || data.length === 0) {
          data = await client.fetch(`
            *[_type == "program" && active == true]
            | order(order asc)[0...3] {
              _id,
              "slug": slug.current,
              name,
              description,
              difficulty,
              image
            }
          `)
        }

        setPrograms(data || [])
      } catch (error) {
        console.error("Error fetching programs:", error)
        setPrograms([])
      }
    }

    fetchPrograms()
  }, [])

  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* suppressHydrationWarning avoids transient SSR/CSR locale mismatches */}
            <h2 suppressHydrationWarning className="mb-4">
              {t.programs.title}
            </h2>
            <p suppressHydrationWarning className="text-muted-foreground text-lg">
              {t.programs.subtitle}
            </p>
          </motion.div>

          {/* Programs Grid – ONLY 3 CARDS */}
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {programs.map((program, index) => {
              const name = program.name?.[locale] || program.name?.en
              const description =
                program.description?.[locale] || program.description?.en
              const difficulty =
                program.difficulty?.[locale] || program.difficulty?.en

              return (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {program.image && (
                        <Image
                          src={urlFor(program.image).width(800).height(600).url()}
                          alt={name || "Program"}
                          fill
                          quality={85}
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Button asChild variant="ghost" size="sm" className="text-white">
                          <Link href={addLocaleToPath(`/programs/${program.slug}`, locale)}>
                            {t.programs.learnMore}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{name}</CardTitle>
                        {difficulty && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {difficulty}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base mt-2">
                        {description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <Link href={addLocaleToPath("/programs", locale)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full group-hover:text-primary"
                        >
                          {t.programs.learnMore}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </Grid>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link href={addLocaleToPath("/programs", locale)}>
              <Button variant="outline" size="lg">
                {t.programs.viewAll}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

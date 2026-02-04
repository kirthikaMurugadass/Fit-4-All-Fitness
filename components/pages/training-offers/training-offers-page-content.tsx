"use client"

import { useMemo, useState } from "react"
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
import { urlFor } from "@/sanity/lib/image"

type Localized = {
  en?: string
  de?: string
  [key: string]: string | undefined
}

export type TrainingProgram = {
  _id: string
  slug: { current: string }
  name: Localized
  description?: Localized
  difficulty?: Localized
  image?: any
}

type TrainingOffersPageContentProps = {
  programs: TrainingProgram[]
}

export function TrainingOffersPageContent({ programs }: TrainingOffersPageContentProps) {
  const { t, locale } = useTranslations()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const currentLocale = locale === "de" ? "de" : "en"

  const difficulties = useMemo(() => {
    const set = new Set<string>()
    programs.forEach((p) => {
      const diff = p.difficulty?.[currentLocale] || p.difficulty?.en
      if (diff) set.add(diff)
    })
    return Array.from(set)
  }, [programs, currentLocale])

  const filteredPrograms = useMemo(() => {
    if (selectedDifficulty === "all") return programs
    return programs.filter((p) => {
      const diff = p.difficulty?.[currentLocale] || p.difficulty?.en
      return diff === selectedDifficulty
    })
  }, [programs, selectedDifficulty, currentLocale])

  return (
    <main className="min-h-screen">
      <PageHero
        title={t.programsPage.title}
        subtitle={t.programsPage.subtitle}
        backgroundImage="/images/program-1.jpg"
      />

      {/* -------- FILTER BY DIFFICULTY (optional) -------- */}
      <Section spacing="md" className="bg-background border-b border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              variant={selectedDifficulty === "all" ? "default" : "outline"}
              onClick={() => setSelectedDifficulty("all")}
            >
              {t.programsPage.filterAll}
            </Button>
            {difficulties.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </Button>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* -------- PROGRAM GRID -------- */}
      <Section spacing="lg">
        <Container>
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {filteredPrograms.map((program, index) => {
              const name = program.name?.[currentLocale] || program.name?.en || ""
              const description =
                program.description?.[currentLocale] || program.description?.en || ""
              const difficulty =
                program.difficulty?.[currentLocale] || program.difficulty?.en || ""

              return (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {program.image && (
                        <Image
                          src={urlFor(program.image).width(600).height(400).url()}
                          alt={name || "Program"}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <motion.div
                        className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Button asChild variant="ghost" size="sm" className="text-white">
                          <Link href={addLocaleToPath(`/training-offers/${program.slug.current}`, locale)}>
                            {t.programsPage.viewDetails}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    <CardHeader className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl">{name}</CardTitle>
                        {difficulty && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {difficulty}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={addLocaleToPath(`/training-offers/${program.slug.current}`, locale)}>
                          {t.programsPage.viewDetails}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </Grid>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t.programsPage.noProgramsFound || "No programs found."}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}


"use client"

import { useEffect, useState, useMemo } from "react"
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
import { programs as allPrograms } from "@/app/programs/programs-data"

type Program = {
  _id: string
  slug: string
  category: string
  name: Record<string, string>
  description: Record<string, string>
  difficulty?: Record<string, string>
  duration?: string
  frequency?: string
  image: any
}

export function ProgramsPageContent() {
  const { t, locale } = useTranslations()
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  // ---------------- FETCH FROM SANITY ----------------
  useEffect(() => {
    const fetchPrograms = async () => {
      const data = await client.fetch(`
        *[_type == "program" && active == true] | order(order asc) {
          _id,
          "slug": slug.current,
          category,
          name,
          description,
          difficulty,
          duration,
          frequency,
          image
        }
      `)
      setPrograms(data)
    }

    fetchPrograms()
  }, [])

  // ---------------- CATEGORIES ----------------
  const availableCategories = useMemo(() => {
    const set = new Set(programs.map(p => p.category).filter(Boolean))
    return Array.from(set)
  }, [programs])

  const categories = useMemo(() => {
    return [
      { id: "all", label: t.programsPage.filterAll },
      ...availableCategories.map(cat => ({
        id: cat,
        label: (t.programsPage as any).categories?.[cat] || cat,
      })),
    ]
  }, [availableCategories, t.programsPage])

  // ---------------- FILTER ----------------
  const filteredPrograms = useMemo(() => {
    if (selectedCategory === "all") return programs
    return programs.filter(p => p.category === selectedCategory)
  }, [programs, selectedCategory])

  return (
    <main className="min-h-screen">
      <PageHero
        title={t.programsPage.title}
        subtitle={t.programsPage.subtitle}
        backgroundImage="/images/program-1.jpg"
      />

      {/* -------- CATEGORY FILTER -------- */}
      <Section spacing="md" className="bg-background border-b border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
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
              const name = program.name?.[locale] || program.name?.en
              const description =
                program.description?.[locale] || program.description?.en
              const difficulty =
                program.difficulty?.[locale] || program.difficulty?.en

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
                          src={urlFor(program.image).width(800).height(600).url()}
                          alt={name || "Program"}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <motion.div
                        className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <Button asChild variant="ghost" size="sm" className="text-white">
                          <Link href={addLocaleToPath(`/training-offers/${program.slug}`, locale)}>
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {program.duration && <span>{program.duration}</span>}
                        {program.frequency && (
                          <>
                            <span>•</span>
                            <span>{program.frequency}</span>
                          </>
                        )}
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={addLocaleToPath(`/training-offers/${program.slug}`, locale)}>
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

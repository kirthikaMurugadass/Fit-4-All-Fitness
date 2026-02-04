"use client"

import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Dumbbell, Activity, Clock, Flame, Target, Users, ArrowRight } from "lucide-react"
import type { Program } from "@/app/programs/programs-data"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"

function getLevelBadgeColor(level: Program["difficulty"]) {
  switch (level) {
    case "Beginner":
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
    case "Advanced":
      return "bg-destructive/10 text-destructive border border-destructive/40"
    case "Intermediate":
      return "bg-primary/10 text-primary border border-primary/40"
    case "All Levels":
    default:
      return "bg-muted text-muted-foreground border border-border/60"
  }
}

interface ProgramDetailProps {
  program: Program
}

export function ProgramDetail({ program }: ProgramDetailProps) {
  const { t, locale } = useTranslations()
  const slug = program.slug

  const listProgram =
    (t.programsPage as any).programs?.[slug] || null
  const displayName = listProgram?.name || program.name
  const summary =
    listProgram?.description || program.summary || program.description
  const difficultyLabel = listProgram?.difficulty || program.difficulty

  const detailsT = t.programsDetails

  const levelBadgeClasses = getLevelBadgeColor(program.difficulty)

  type Benefit = {
    icon: any
    title: string
    description: string
  }

  const benefits = (detailsT as any).benefits?.map((b: any, index: number) => ({
    icon: [Dumbbell, Target, Activity, Users][index] || Dumbbell,
    title: b.title,
    description: b.description,
  })) || [
    {
      icon: Dumbbell,
      title: "Targeted Training",
      description: program.focus,
    },
    {
      icon: Target,
      title: "Clear Objectives",
      description: program.philosophy,
    },
    {
      icon: Activity,
      title: "Smart Conditioning",
      description: "Programming that balances intensity, volume, and recovery for sustainable progress.",
    },
    {
      icon: Users,
      title: "Coached Experience",
      description: "Guided by expert coaches who keep sessions safe, effective, and engaging.",
    },
  ]

  const details = [
    { label: detailsT.labels.durationPerSession, value: program.durationPerSession ?? program.duration, icon: Clock },
    { label: detailsT.labels.weeklyFrequency, value: program.weeklyFrequency ?? program.frequency, icon: Activity },
    { label: detailsT.labels.trainingStyle, value: program.trainingStyle, icon: Dumbbell },
    {
      label: detailsT.labels.equipmentUsed,
      value: program.equipment.join(", "),
      icon: Target,
    },
    ...(program.caloriesBurnEstimate
      ? [{ label: detailsT.labels.caloriesPerSession, value: program.caloriesBurnEstimate, icon: Flame }]
      : []),
  ]

  const sampleSchedule =
    (detailsT as any).sampleSchedule ||
    [
      {
        day: "Day 1",
        title: "Strength Foundation",
        focus: "Primary lifts and key accessory work.",
      },
      {
        day: "Day 2",
        title: "Conditioning / Performance",
        focus: "Heart rate-driven conditioning and athletic movement.",
      },
      {
        day: "Day 3",
        title: "Recovery / Mobility",
        focus: "Mobility flows, tissue work, and nervous system reset.",
      },
    ]

  const trainer = (detailsT as any).trainer || {
    name: "Marcus Chen",
    role: "Head Strength & Performance Coach",
    bio: "With over 10 years of coaching experience and a background in collegiate athletics, Marcus specializes in building strong, resilient athletes and professionals.",
    image: "/images/trainer-marcus.jpg",
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={`${program.name} hero image`}
            fill
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/30" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-background/20 backdrop-blur px-4 py-2 border border-border/60">
              <span
                className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${levelBadgeClasses}`}
              >
                {difficultyLabel}
              </span>
              <span className="text-xs text-muted-foreground">
                {program.duration} • {program.frequency}
              </span>
            </div>

            <h1 className="display-heading text-foreground drop-shadow-xl">
              {displayName}
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl leading-relaxed">
              {summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="sm:w-auto w-full">
                {detailsT.finalCtaPrimary}
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto w-full" asChild>
                <Link href={addLocaleToPath("/contact", locale)}>
                  {t.contact.form?.subjects?.training || "Talk to a Coach"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Program Overview */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t.programsDetails.overviewTitle}
              </h2>
              <p className="text-lg text-foreground/90 leading-relaxed">
                {summary}
              </p>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    {t.programsDetails.focusLabel}&nbsp;
                  </span>
                  {program.focus}
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    {t.programsDetails.audienceLabel}&nbsp;
                  </span>
                  {program.audience}
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    {t.programsDetails.philosophyLabel}&nbsp;
                  </span>
                  {program.philosophy}
                </p>
              </div>
            </motion.div>

            {/* Program Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card/80 backdrop-blur border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t.programsDetails.detailsCardTitle}
                  </CardTitle>
                  <CardDescription>
                    {t.programsDetails.detailsCardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details.map((detail) => {
                    const Icon = detail.icon
                    return (
                      <div
                        key={detail.label}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {detail.label}
                          </div>
                          <div className="text-muted-foreground">{detail.value}</div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Key Benefits */}
      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t.programsDetails.benefitsTitle}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.programsDetails.benefitsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {benefits.map((benefit: Benefit, index: number) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full group bg-card border-border rounded-xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Sample Weekly Schedule */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t.programsDetails.scheduleTitle}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t.programsDetails.scheduleSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {sampleSchedule.map(
                (
                  block: { day: string; title: string; focus: string },
                  index: number
                ) => (
                  <motion.div
                    key={block.day}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card border-border rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="text-sm text-primary font-semibold mb-1">
                          {block.day}
                        </div>
                        <CardTitle className="text-lg">{block.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {block.focus}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Trainer / Coaching Section */}
      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] gap-10 lg:gap-16 items-center"
          >
            {/* Trainer Image */}
            <div className="relative h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-muted">
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                quality={85}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Trainer Content */}
            <Card className="bg-card border-border rounded-2xl shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {t.programsDetails.trainerSectionTitle}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {t.programsDetails.trainerSectionDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {trainer.name}
                  </div>
                  <div className="text-sm text-primary font-medium">
                    {trainer.role}
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {trainer.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg" className="relative overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto text-center space-y-6 py-10 px-6 rounded-2xl bg-primary/10 border border-primary/40 shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {detailsT.finalCtaTitleTemplate.replace("{programName}", displayName)}
            </h2>
            <p className="text-muted-foreground text-lg">
              {detailsT.finalCtaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                {detailsT.finalCtaPrimary}
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href={addLocaleToPath("/membership", locale)}>
                  {detailsT.finalCtaSecondary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  )
}


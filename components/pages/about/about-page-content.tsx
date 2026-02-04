"use client"

import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/layout/page-hero"
import { motion } from "framer-motion"
import { Award, Target, Users, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import { FacilitiesSection } from "@/components/sections/facilities-section"

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

type AboutPageContentProps = {
  facilities?: Facility[]
}

export function AboutPageContent({ facilities = [] }: AboutPageContentProps) {
  const { t, locale } = useTranslations()

  return (
    <main className="min-h-screen">
      {/* Section 1: Page Hero with Premium Image */}
      <PageHero
        title={t.about.hero.title}
        subtitle={t.about.hero.subtitle}
        backgroundImage="/images/about-gym-2.jpg"
      />

      {/* Section 2: Brand Story */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Split Layout: Image + Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Premium Gym Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden order-2 lg:order-1">
                <Image
                  src="/images/about-gym-3.jpg"
                  alt="Premium gym facility with state-of-the-art equipment"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Text Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="mb-4">{t.about.brandStory.title}</h2>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                  <p>{t.about.brandStory.description1}</p>
                  <p>{t.about.brandStory.description2}</p>
                  <p>{t.about.brandStory.description3}</p>
                </div>
              </div>
            </motion.div>

            {/* Mission Statement - Premium Centered Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
                    {t.about.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg md:text-xl text-center text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                    {t.about.mission.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* New Image + CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-16 mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
                {/* Left: Large Premium Gym Image with Accent Frame */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative order-2 lg:order-1"
                >
                  <div className="relative bg-primary/20 rounded-2xl p-4 lg:p-6 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-2xl" />
                    <div className="relative h-[400px] md:h-[500px] lg:h-[550px] rounded-xl overflow-hidden z-10">
                      <Image
                        src="/images/about-5.jpg"
                        alt="Elite athlete training at Fit 4All Fitness"
                        fill
                        quality={90}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>

                {/* Right: Floating Dark Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative order-1 lg:order-2 lg:-ml-12 z-20"
                >
                  <Card className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-2xl">
                    <CardHeader className="space-y-4 pb-6">
                      <CardTitle className="text-2xl md:text-3xl font-bold">
                        <span className="text-primary">{t.about.cta.highlight}</span>{" "}
                        {t.about.cta.titleRest}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        {t.about.cta.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={addLocaleToPath("/programs", locale)}>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                          {t.about.cta.button}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t.about.coreValues.title}</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {t.about.coreValues.subtitle}
                </p>
              </div>
              <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
                {[
                  {
                    icon: Award,
                    title: t.about.coreValues.excellence.title,
                    description: t.about.coreValues.excellence.description,
                  },
                  {
                    icon: Target,
                    title: t.about.coreValues.integrity.title,
                    description: t.about.coreValues.integrity.description,
                  },
                  {
                    icon: Users,
                    title: t.about.coreValues.community.title,
                    description: t.about.coreValues.community.description,
                  },
                  {
                    icon: Sparkles,
                    title: t.about.coreValues.innovation.title,
                    description: t.about.coreValues.innovation.description,
                  },
                ].map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 rounded-xl border border-border bg-card">
                        <CardHeader className="pb-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-7 h-7 text-primary" strokeWidth={2} />
                          </div>
                          <CardTitle className="text-xl md:text-2xl font-bold">{value.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {value.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </Grid>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Section 3: Facilities Showcase (Sanity-driven only) */}
      <FacilitiesSection facilities={facilities} />

    </main>
  )
}


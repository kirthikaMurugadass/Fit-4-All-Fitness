"use client"

import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award, Dumbbell, Heart, Target } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"

// Value Propositions Section - Documentation Section 4.1.2
// 3-4 key differentiators with icons, titles, descriptions
// Now includes premium image in split layout

export function ValuePropositionsSection() {
  const { t } = useTranslations()

  const valueProps = [
    {
      icon: Award,
      title: t.valueProps.eliteCoaching.title,
      description: t.valueProps.eliteCoaching.description,
    },
    {
      icon: Dumbbell,
      title: t.valueProps.precisionEquipment.title,
      description: t.valueProps.precisionEquipment.description,
    },
    {
      icon: Heart,
      title: t.valueProps.recoveryScience.title,
      description: t.valueProps.recoveryScience.description,
    },
    {
      icon: Target,
      title: t.valueProps.resultsGuarantee.title,
      description: t.valueProps.resultsGuarantee.description,
    },
  ]
  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="space-y-16">
          {/* Split Layout: Large Image + Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Premium Gym Image - Cinematic, clean aesthetic */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/about-gym-interior.jpg"
                alt="Premium gym facility with state-of-the-art equipment and modern design"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle dark overlay to blend with theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Text Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <h2 className="mb-4">{t.valueProps.title}</h2>
                <p className="text-muted-foreground text-lg">
                  {t.valueProps.subtitle}
                </p>
              </div>
              <div className="space-y-4 text-foreground/80">
                <p>{t.valueProps.description1}</p>
                <p>{t.valueProps.description2}</p>
              </div>
            </div>
          </motion.div>

          {/* Section Header for Value Props Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{t.valueProps.sectionTitle}</h3>
            <p className="text-muted-foreground">
              {t.valueProps.sectionSubtitle}
            </p>
          </motion.div>

          {/* Value Props Grid - Documentation: 4 cols desktop, 2 tablet, 1 mobile */}
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
            {valueProps.map((prop, index) => {
              const Icon = prop.icon
              return (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{prop.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {prop.description}
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

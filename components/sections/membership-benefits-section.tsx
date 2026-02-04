"use client"

import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Dumbbell,
  Users,
  Smartphone,
  Calendar,
  UserCheck,
} from "lucide-react"
import { useTranslations } from "@/lib/i18n/use-translations"

type Benefit = {
  icon: React.ComponentType<{ className?: string }>
  key:
    | "fullAccess"
    | "groupClasses"
    | "lockerRooms"
    | "mobileApp"
    | "flexibleSchedules"
    | "professionalTrainers"
}

export function MembershipBenefitsSection() {
  const { t } = useTranslations()

  const benefits: Benefit[] = [
    {
      icon: CheckCircle,
      key: "fullAccess",
    },
    {
      icon: Users,
      key: "groupClasses",
    },
    {
      icon: Dumbbell,
      key: "lockerRooms",
    },
    {
      icon: Smartphone,
      key: "mobileApp",
    },
    {
      icon: Calendar,
      key: "flexibleSchedules",
    },
    {
      icon: UserCheck,
      key: "professionalTrainers",
    },
  ]

  return (
    <Section spacing="lg" className="bg-background">
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
            <h2 className="mb-4">{t.membershipPage.benefitsTitle}</h2>
            <p className="text-muted-foreground text-lg">
              {t.membershipPage.benefitsSubtitle}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              const title = t.membership.benefits?.[benefit.key]?.title || ""
              const description = t.membership.benefits?.[benefit.key]?.description || ""
              return (
                <motion.div
                  key={benefit.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {description}
                      </p>
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

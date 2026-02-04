"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { membershipPreviewQuery } from "@/sanity/lib/queries"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"

type SanityMembershipPlanRaw = {
  _id: string
  duration: "monthly" | "quarterly" | "yearly"
  price: number
  currency: string
  isPopular: boolean
  title: {
    en: string
    de: string
  }
  features: {
    text: {
      en: string
      de: string
    }
  }[]
}

type SanityMembershipPlan = {
  _id: string
  durationInMonths: number
  price: number
  currency: string
  isPopular: boolean
  title: {
    en: string
    de: string
  }
  features: {
    text: {
      en: string
      de: string
    }
  }[]
}

export function MembershipPreviewSection() {
  const { t, locale } = useTranslations()
  const [plans, setPlans] = useState<SanityMembershipPlan[]>([])

  // 🔹 Fetch plans from Sanity - show first 2 plans (typically 3 and 6 month plans)
  useEffect(() => {
    client.fetch<SanityMembershipPlanRaw[]>(membershipPreviewQuery).then((rawPlans) => {
      const transformedPlans: SanityMembershipPlan[] = rawPlans
        .map((plan) => {
          // Calculate durationInMonths from duration
          let durationInMonths = 1
          if (plan.duration === "monthly") {
            durationInMonths = 1
          } else if (plan.duration === "quarterly") {
            durationInMonths = 3
          } else if (plan.duration === "yearly") {
            durationInMonths = 12
          }

          return {
            ...plan,
            durationInMonths,
          }
        })
        .slice(0, 2) // Show first 2 plans

      setPlans(transformedPlans)
    }).catch((error) => {
      console.error("Error fetching membership plans:", error)
      setPlans([])
    })
  }, [])

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/membership-bg.jpg"
          alt=""
          fill
          quality={50}
          className="object-cover opacity-[0.02]"
          sizes="100vw"
        />
      </div>

      <Container className="relative z-10">
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="mb-4">{t.membership.title}</h2>
            <p className="text-muted-foreground text-lg">
              {t.membership.subtitle}
            </p>
          </motion.div>

          {/* Membership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {plans.slice(0, 2).map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={plan.isPopular ? "md:-mt-4 md:mb-4" : ""}
              >
                <Card
                  className={`h-full flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
                    plan.isPopular
                      ? "border-2 border-primary shadow-lg md:scale-105"
                      : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      {t.membership.mostPopular}
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">
                      {plan.title[locale]}
                    </CardTitle>
                    <span className="text-4xl font-bold">
                      {plan.currency} {plan.price}
                    </span>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm">
                            {feature.text[locale]}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.isPopular ? "default" : "outline"}
                      size="lg"
                      className="w-full"
                    >
                      {t.membershipPage.cta.startTrial}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

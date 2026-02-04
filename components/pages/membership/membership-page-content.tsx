"use client"

import { useState, useMemo, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { membershipPlansQuery, faqsQuery } from "@/sanity/lib/queries"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/layout/page-hero"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"
import { MembershipBenefitsSection } from "@/components/sections/membership-benefits-section"
import { MembershipFAQSection } from "@/components/sections/membership-faq-section"

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
  billingDuration: "monthly" | "annual"
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

type FAQItem = {
  _id: string
  question: {
    en: string
    de: string
  }
  answer: {
    en: string
    de: string
  }
}

export function MembershipPageContent() {
  const { locale, t } = useTranslations()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [plans, setPlans] = useState<SanityMembershipPlan[]>([])
  const [faqs, setFaqs] = useState<FAQItem[]>([])

  // 🔹 Fetch from Sanity and transform data
  useEffect(() => {
    // Fetch membership plans
    client.fetch<SanityMembershipPlanRaw[]>(membershipPlansQuery).then((rawPlans) => {
      const transformedPlans: SanityMembershipPlan[] = rawPlans.map((plan) => {
        // Map duration to billingDuration and calculate durationInMonths
        let billingDuration: "monthly" | "annual" = "monthly"
        let durationInMonths = 1

        if (plan.duration === "monthly") {
          billingDuration = "monthly"
          durationInMonths = 1
        } else if (plan.duration === "quarterly") {
          billingDuration = "monthly" // Treat quarterly as monthly for now
          durationInMonths = 3
        } else if (plan.duration === "yearly") {
          billingDuration = "annual"
          durationInMonths = 12
        }

        return {
          ...plan,
          billingDuration,
          durationInMonths,
        }
      })
      setPlans(transformedPlans)
    })

    // Fetch FAQs
    client.fetch<FAQItem[]>(faqsQuery).then(setFaqs).catch((error) => {
      console.error("Error fetching FAQs:", error)
      setFaqs([])
    })
  }, [])

  // 🔹 Filter by billing cycle
  const displayedPlans = useMemo(() => {
    return plans.filter((plan) => plan.billingDuration === billingCycle)
  }, [plans, billingCycle])

  return (
    <main className="min-h-screen">
      <PageHero
        title={t.membershipPage.title}
        subtitle={t.membershipPage.subtitle}
        backgroundImage="/images/membership-bg-1.jpg"
      />

      {/* Billing Toggle */}
      <Section spacing="sm">
        <Container>
          <div className="flex justify-center items-center gap-4">
            <span className={billingCycle === "monthly" ? "font-semibold" : "text-muted-foreground"}>
              {t.membershipPage.billing.monthly}
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")
              }
              className="w-14 h-7 bg-muted rounded-full relative"
            >
              <div
                className={`w-5 h-5 bg-primary rounded-full absolute top-1 transition-transform ${
                  billingCycle === "annual" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={billingCycle === "annual" ? "font-semibold" : "text-muted-foreground"}>
              {t.membershipPage.billing.annual}
            </span>
          </div>
        </Container>
      </Section>

      {/* Membership Plans */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {displayedPlans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col ${
                    plan.isPopular ? "border-2 border-primary shadow-lg scale-105" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      {t.membership.mostPopular}
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                      {plan.title[locale]}
                    </CardTitle>
                    <div className="text-4xl font-bold mt-2">
                      {plan.currency} {plan.price}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2">
                          <Check className="text-primary w-5 h-5 mt-0.5" />
                          <span>{feature.text[locale]}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      variant={plan.isPopular ? "default" : "outline"}
                      className="mt-auto"
                    >
                      {t.membershipPage.cta.startTrial}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Membership Benefits */}
      <MembershipBenefitsSection />

      {/* FAQ Section */}
      <MembershipFAQSection />
    </main>
  )
}

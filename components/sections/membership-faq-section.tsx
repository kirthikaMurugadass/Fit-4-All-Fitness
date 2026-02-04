"use client"

import { useState, useEffect } from "react"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { useTranslations } from "@/lib/i18n/use-translations"

// ✅ FAQ Type
type FAQItem = {
  _id: string
  question: {
    en?: string
    de?: string
  }
  answer: {
    en?: string
    de?: string
  }
}

// ✅ Sanity Query (INLINE = safer)
const FAQS_QUERY = `
  *[_type == "faq" && defined(question.en)] | order(_createdAt asc) {
    _id,
    question,
    answer
  }
`

export function MembershipFAQSection() {
  const { t, locale } = useTranslations()
  const currentLocale = locale === "de" ? "de" : "en"

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Fetch from Sanity
  useEffect(() => {
    client
      .fetch<FAQItem[]>(FAQS_QUERY)
      .then((data) => {
        setFaqs(data || [])
      })
      .catch((err) => {
        console.error("Sanity FAQ fetch error:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
          <h2 className="mb-4">{t.membershipPage.faqTitle}</h2>
            <p className="text-muted-foreground text-lg">
            {t.membershipPage.faqSubtitle}
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Loading FAQs...
                </CardContent>
              </Card>
            ) : faqs.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No FAQs available.
                </CardContent>
              </Card>
            ) : (
              faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <motion.div
                    key={faq._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between p-6">
                          <h3 className="text-lg font-semibold pr-8">
                            {faq.question?.[currentLocale] ??
                              faq.question?.en ??
                              ""}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                          >
                            <CardContent className="pt-0 pb-6 px-6">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer?.[currentLocale] ??
                                  faq.answer?.en ??
                                  ""}
                              </p>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

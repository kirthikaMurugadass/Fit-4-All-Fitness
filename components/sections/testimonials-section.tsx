"use client"

import { useEffect, useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { Grid } from "@/components/layout/grid"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { useTranslations } from "@/lib/i18n/use-translations"

type Testimonial = {
  _id: string
  name: string
  role: { en?: string; de?: string }
  quote: { en?: string; de?: string }
  rating: number
  image?: any
  gymImage?: any
}

export function TestimonialsSection() {
  const { locale } = useTranslations()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Fetch testimonials
    client
      .fetch(
        `*[_type == "testimonial" && featured == true && active == true]
         | order(order asc) {
          _id,
          name,
          role,
          quote,
          rating,
          image,
          gymImage
        }`
      )
      .then(setTestimonials)
  }, [locale])

  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <div className="space-y-16">
          {/* ---------- HEADER ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2>Member Success Stories</h2>
            <p className="text-muted-foreground text-lg">
              Real results from real members who transformed their lives with us.
            </p>
          </motion.div>

          {/* ---------- TESTIMONIALS ---------- */}
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Gym Image */}
                  <div className="relative h-32 overflow-hidden bg-muted">
                    {testimonial.gymImage && (
                      <Image
                        src={urlFor(testimonial.gymImage).width(600).height(400).url()}
                        alt="Gym environment"
                        fill
                        className="object-cover opacity-40"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                  </div>

                  <CardHeader>
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    <CardDescription className="text-base leading-relaxed">
                      “{testimonial.quote?.[locale] || testimonial.quote?.en}”
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                        {testimonial.image && (
                          <Image
                            src={urlFor(testimonial.image).width(96).height(96).url()}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role?.[locale] || testimonial.role?.en}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  )
}

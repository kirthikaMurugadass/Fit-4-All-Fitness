"use client"

import { Container, Section } from "@/components/layout/container"
import { motion } from "framer-motion"
import Image from "next/image"

// Workout Facility / Training Gallery section for Home page
// Visual-only, sits directly under "Our Programs" on the Home page

export function WorkoutFacilitySection() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-12">
          {/* Section Header - Matches "Our Programs" typography exactly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="mb-4">Workout Facility</h2>
            <p className="text-muted-foreground text-lg">
              Experience our state-of-the-art training facility equipped with premium equipment and designed for peak performance.
            </p>
          </motion.div>

          {/* Image grid */}
          <div className="space-y-6">
            {/* Row 1: Asymmetrical layout - Left smaller, Right larger with background card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6"
            >
              {/* Left image - Smaller (2/5 width) */}
              <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden bg-muted lg:col-span-2">
                <Image
                  src="/images/workout-left-1.jpg"
                  alt="Athlete training with battle ropes in the Fit 4All Fitness facility"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={false}
                />
                {/* Dark overlay to blend with theme */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Right image - Larger (3/5 width) with background card */}
              <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] lg:col-span-3">
                {/* Background card - offset/layered look */}
                <div className="absolute inset-0 bg-card border border-border/50 rounded-2xl shadow-lg -z-10 translate-x-2 translate-y-2" />
                
                {/* Image container */}
                <div className="relative h-full rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src="/images/workout-right-1.jpg"
                    alt="Small group training session with barbells at Fit 4All Fitness"
                    fill
                    quality={90}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Row 2: Two images side-by-side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            >
              {/* Left bottom image */}
              <div className="relative h-[220px] sm:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/images/workout-left-2.jpg"
                  alt="Athlete performing functional training with a medicine ball"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/20" />
              </div>

              {/* Right bottom image */}
              <div className="relative h-[220px] sm:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/images/workout-right-2.jpg"
                  alt="Close-up of premium kettlebells and strength equipment at Fit 4All Fitness"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


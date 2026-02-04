"use client"

import { Container, Section } from "@/components/layout/container"
import { motion } from "framer-motion"
import { WorkoutFacilitiesMasonry } from "@/components/sections/workout-facilities-masonry"

// Workout Facility / Training Gallery section for Home page
// Visual-only, sits directly under "Our Programs" on the Home page

export function WorkoutFacilitySection() {
  return (
    <Section spacing="md" className="pt-10 md:pt-16">
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
              Experience our state-of-the-art training facility equipped with premium equipment
              and designed for peak performance.
            </p>
          </motion.div>

          {/* Masonry image layout */}
          <WorkoutFacilitiesMasonry />
        </div>
      </Container>
    </Section>
  )
}


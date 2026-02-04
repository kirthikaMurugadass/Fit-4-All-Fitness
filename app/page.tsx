import {
  HeroSection,
  ValuePropositionsSection,
  FeaturedProgramsSection,
  WorkoutFacilitySection,
  TrainerSpotlightSection,
  MembershipPreviewSection,
  StatsSection,
  TestimonialsSection,
  FinalCTASection,
} from "@/components/sections"
import type { Metadata } from "next"

// Home Page - Documentation Section 4.1
// All sections implemented in order per documentation

export const metadata: Metadata = {
  title: "Fit 4All Fitness | Premium Gym & Training",
  description: "Where discipline meets design. Premium fitness experience with elite coaching, precision equipment, and transformative results. Start your free trial today.",
  openGraph: {
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Where discipline meets design. Premium fitness experience with elite coaching, precision equipment, and transformative results.",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropositionsSection />
      <FeaturedProgramsSection limit={3} />
      <WorkoutFacilitySection />
      <TrainerSpotlightSection limit={4} />
      <MembershipPreviewSection />
      <StatsSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  )
}

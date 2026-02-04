import {
  HeroSection,
  ValuePropositionsSection,
  FeaturedProgramsSection,
  TrainerSpotlightSection,
  MembershipPreviewSection,
  TestimonialsSection,
  FinalCTASection,
} from "@/components/sections"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fit 4All Fitness | Premium Gym & Training",
  description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen. Starte noch heute deine kostenlose Testversion.",
  openGraph: {
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen.",
    type: "website",
  },
}

export default function GermanHome() {
  return (
    <>
      <HeroSection />
      <ValuePropositionsSection />
      <FeaturedProgramsSection />
      <TrainerSpotlightSection />
      <MembershipPreviewSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  )
}

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
import { client } from "@/sanity/lib/client"
import { testimonialStatsQuery } from "@/sanity/lib/queries"
import type { Metadata } from "next"

type HomeStat = {
  _id: string
  label: {
    en?: string
    de?: string
  }
  value: number
  decimals?: number
  suffix?: string
}

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

export const revalidate = 0

export default async function Home() {
  const stats = await client.fetch<HomeStat[]>(testimonialStatsQuery, {}, { cache: "no-store" })

  return (
    <>
      <HeroSection />
      <ValuePropositionsSection />
      <FeaturedProgramsSection limit={3} />
      <WorkoutFacilitySection />
      <TrainerSpotlightSection limit={4} />
      <MembershipPreviewSection />
      <StatsSection stats={stats} />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  )
}

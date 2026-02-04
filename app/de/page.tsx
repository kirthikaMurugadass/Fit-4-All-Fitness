import {
  HeroSection,
  ValuePropositionsSection,
  FeaturedProgramsSection,
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

export const metadata: Metadata = {
  title: "Fit 4All Fitness | Premium Gym & Training",
  description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen. Starte noch heute deine kostenlose Testversion.",
  openGraph: {
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen.",
    type: "website",
  },
}

export const revalidate = 0

export default async function GermanHome() {
  const stats = await client.fetch<HomeStat[]>(testimonialStatsQuery, {}, { cache: "no-store" })

  return (
    <>
      <HeroSection />
      <ValuePropositionsSection />
      <FeaturedProgramsSection />
      <TrainerSpotlightSection />
      <MembershipPreviewSection />
      <StatsSection stats={stats} />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  )
}

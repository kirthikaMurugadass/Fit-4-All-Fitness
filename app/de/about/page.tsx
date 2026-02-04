import { AboutPageContent } from "@/components/pages/about/about-page-content"
import { client } from "@/sanity/lib/client"
import { facilitiesQuery } from "@/sanity/lib/queries"

type Facility = {
  _id: string
  title: {
    en?: string
    de?: string
  }
  description: {
    en?: string
    de?: string
  }
  image: any
}

export default async function GermanAboutPage() {
  let facilities: Facility[] = []
  try {
    facilities = await client.fetch<Facility[]>(facilitiesQuery)
  } catch (error) {
    console.error("Error fetching facilities from Sanity (DE):", error)
    facilities = []
  }

  return <AboutPageContent facilities={facilities} />
}

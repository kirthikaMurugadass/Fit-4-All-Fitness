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

export default async function AboutPage() {
  // Fetch facilities from Sanity server-side
  let facilities: Facility[] = []
  try {
    facilities = await client.fetch<Facility[]>(facilitiesQuery)
  } catch (error) {
    console.error("Error fetching facilities from Sanity:", error)
    // Fallback to empty array if fetch fails
    facilities = []
  }

  return <AboutPageContent facilities={facilities} />
}

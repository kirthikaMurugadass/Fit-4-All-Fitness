import { client } from "@/sanity/lib/client"
import { socialLinksQuery } from "@/sanity/lib/queries"

export type SocialLink = {
  _id: string
  platform: string
  url: string
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const data = await client.fetch<SocialLink[]>(socialLinksQuery)
    return data || []
  } catch (error) {
    console.error("Error fetching social links:", error)
    return []
  }
}

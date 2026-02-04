import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client } from "./client"

// Global Sanity image URL builder used across the app
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) {
    return builder.image("")
  }
  return builder.image(source)
}

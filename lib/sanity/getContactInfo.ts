import { client } from "@/sanity/lib/client"
import { contactInfoQuery } from "@/sanity/lib/queries"
import type { Locale } from "@/lib/i18n"

type ContactInfoRaw = {
  _id: string
  address: {
    en?: string
    de?: string
  }
  phone: string
  mobile: string
  email: string
}

type ContactInfo = {
  _id: string
  address: string
  phone: string
  mobile: string
  email: string
}

export async function getContactInfo(locale: Locale): Promise<ContactInfo | null> {
  try {
    const data = await client.fetch<ContactInfoRaw | null>(contactInfoQuery)
    
    if (!data) {
      return null
    }
    
    // Transform address to use locale-specific value
    const address = data.address?.[locale] || data.address?.en || ""
    
    return {
      _id: data._id,
      address,
      phone: data.phone || "",
      mobile: data.mobile || "",
      email: data.email || "",
    }
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

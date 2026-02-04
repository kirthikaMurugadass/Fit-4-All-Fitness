import { createClient } from "next-sanity"

export const writeClient = createClient({
  projectId: "qjda8zjr",
  dataset: "production",
  apiVersion: "process.env.NEXT_PUBLIC_SANITY_API_VERSION",
  useCdn: false, // IMPORTANT
  token: process.env.SANITY_WRITE_TOKEN, // 🔐
})

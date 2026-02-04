import { createClient } from "next-sanity"

export const writeClient = createClient({
  projectId: "qjda8zjr",
  dataset: "production",
  apiVersion: "2026-02-02",
  useCdn: false, // IMPORTANT
  token: process.env.SANITY_WRITE_TOKEN, // 🔐
})

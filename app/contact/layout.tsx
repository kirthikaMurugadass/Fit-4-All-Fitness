import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Fit 4All Fitness",
  description: "Get in touch with Fit 4All Fitness. Have questions? We're here to help. Reach out and let's start your transformation journey.",
  openGraph: {
    title: "Contact Us | Fit 4All Fitness",
    description: "Get in touch with Fit 4All Fitness. Have questions? We're here to help.",
    type: "website",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

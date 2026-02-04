import type { Metadata } from "next"
import { LangAttribute } from "@/components/layout/lang-attribute"

export const metadata: Metadata = {
  title: {
    default: "Fit 4All Fitness | Premium Gym & Training",
    template: "%s | Fit 4All Fitness",
  },
  description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen.",
  keywords: ["Premium-Fitnessstudio", "Fitnesstraining", "Personaltraining", "Luxus-Fitnessstudio", "Elite-Fitness"],
  authors: [{ name: "Fit 4All Fitness" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen.",
    type: "website",
    locale: "de_DE",
    siteName: "Fit 4All Fitness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Wo Disziplin auf Design trifft. Premium-Fitness-Erlebnis mit Elite-Coaching, Präzisionsausrüstung und transformativen Ergebnissen.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://forgefitness.com"),
}

export default function GermanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <LangAttribute />
      {children}
    </>
  )
}

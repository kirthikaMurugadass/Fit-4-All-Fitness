import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { programBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Localized = {
  en?: string | any[]
  de?: string | any[]
  [key: string]: string | any[] | undefined
}

// Helper to safely extract text from PortableText blocks or plain string
function extractText(content: string | any[] | undefined): string {
  if (!content) return ""
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    // PortableText blocks - extract text from children
    return content
      .map((block: any) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .join("\n")
  }
  return ""
}

type ProgramDetail = {
  _id: string
  name: Localized
  description?: Localized
  longDescription?: Localized
  difficulty?: Localized
  image?: any
}

interface TrainingOfferDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function TrainingOfferDetailPage({ params }: TrainingOfferDetailPageProps) {
  const { slug } = await params

  const program = await client.fetch<ProgramDetail | null>(programBySlugQuery, {
    slug,
  })

  if (!program) {
    notFound()
  }

  // TEMP debug
  console.log("Program detail:", program)

  // Get locale from URL or default to English
  // For now, default to English content as per requirement
  const locale = "en" // Can be extended to read from URL/context
  const name = typeof program.name?.[locale] === "string" 
    ? program.name[locale] 
    : typeof program.name?.en === "string" 
    ? program.name.en 
    : "Program"
  const shortDescription = typeof program.description?.[locale] === "string"
    ? program.description[locale]
    : typeof program.description?.en === "string"
    ? program.description.en
    : ""
  
  // Handle longDescription - can be string (text) or array (PortableText blocks)
  const longDescriptionRaw = program.longDescription?.[locale] || program.longDescription?.en
  const longDescription = extractText(longDescriptionRaw)
  const longDescriptionBlocks = Array.isArray(longDescriptionRaw) ? longDescriptionRaw : null
  
  const difficulty = typeof program.difficulty?.[locale] === "string"
    ? program.difficulty[locale]
    : typeof program.difficulty?.en === "string"
    ? program.difficulty.en
    : ""

  const imageUrl = program.image
    ? urlFor(program.image).width(1200).url()
    : undefined

  return (
    <main className="min-h-screen">
      {/* Hero / Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={1200}
            height={700}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />

        <Container className="relative z-10 py-16">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground drop-shadow-xl">
              {name}
            </h1>
            {shortDescription && (
              <p className="text-lg text-foreground/90 max-w-2xl leading-relaxed">
                {shortDescription}
              </p>
            )}
            {difficulty && (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/40 px-4 py-1 text-sm text-primary-foreground">
                <span className="font-semibold text-primary">Level:</span>
                <span className="text-foreground">{difficulty}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Body */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16 items-start">
            <Card className="bg-card border-border rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Program Overview
                </CardTitle>
                {shortDescription && (
                  <CardDescription className="text-base md:text-lg text-muted-foreground">
                    {shortDescription}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {longDescriptionBlocks ? (
                  <div className="text-base md:text-lg text-foreground/90 leading-relaxed prose prose-invert max-w-none">
                    <PortableText value={longDescriptionBlocks} />
                  </div>
                ) : longDescription ? (
                  <div className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                    {longDescription}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Program details will be available soon.
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card border-border rounded-2xl shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Ready to get started?</CardTitle>
                  <CardDescription>
                    Book a session or explore more programs tailored to your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/contact">Talk to a Coach</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/programs">Back to Training Offers</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}


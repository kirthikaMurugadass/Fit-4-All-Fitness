import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Program } from "../programs-data"
import { getProgramBySlug, programs } from "../programs-data"
import { ProgramDetail } from "@/components/programs/program-detail"

interface ProgramPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params
  const program = getProgramBySlug(slug)

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Program not found</h1>
          <p className="text-muted-foreground">
            The program you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link href="/programs">Back to Programs</Link>
          </Button>
        </div>
      </main>
    )
  }

  return <ProgramDetail program={program as Program} />
}


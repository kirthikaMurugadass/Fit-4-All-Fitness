import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Program } from "../../../programs/programs-data"
import { getProgramBySlug, programs } from "../../../programs/programs-data"
import { ProgramDetail } from "@/components/programs/program-detail"

interface ProgramPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }))
}

export default async function GermanProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params
  const program = getProgramBySlug(slug)

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Programm nicht gefunden</h1>
          <p className="text-muted-foreground">
            Das Programm, nach dem du suchst, existiert nicht oder wurde verschoben.
          </p>
          <Button asChild size="sm" variant="outline">
            <Link href="/de/programs">Zurück zu Programmen</Link>
          </Button>
        </div>
      </main>
    )
  }

  return <ProgramDetail program={program as Program} />
}

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { RESUME_DATA } from '@/data/resume-data'

type EducationData = (typeof RESUME_DATA)['education'][number]

interface EducationItemProps {
  education: EducationData
}

function EducationItem({ education }: EducationItemProps) {
  const { school, degree } = education

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`education-${school.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {school}
          </h3>
        </div>
      </CardHeader>
      <CardContent
        className="mt-2 text-foreground/80 print:text-[12px]"
        aria-labelledby={`education-${school
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
      >
        {degree}
      </CardContent>
    </Card>
  )
}

interface EducationListProps {
  education: readonly EducationData[]
}

export function Education({ education }: EducationListProps) {
  return (
    <Section>
      <h2 className="text-xl font-bold">Educação</h2>
      <div className="space-y-4" role="feed" aria-labelledby="seção educação">
        {education.map((item) => (
          <article key={item.school} role="article">
            <EducationItem education={item} />
          </article>
        ))}
      </div>
    </Section>
  )
}

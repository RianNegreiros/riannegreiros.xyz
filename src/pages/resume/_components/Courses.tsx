import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { RESUME_DATA } from '@/data/resume-data'

interface CourseLinkProps {
  title: string
  link: { href: string; label: string }
}

function CourseLink({ title, link }: CourseLinkProps) {
  return (
    <>
      <a
        href={link.href ? link.href : link.label}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        aria-label={`${title} course (opens in new tab)`}
      >
        {title}
        {link.href && (
          <span
            className="size-1 rounded-full bg-blue-500"
            aria-label="Active course indicator"
          />
        )}
      </a>
      <div
        className="hidden font-mono text-xs underline print:visible"
        aria-hidden="true"
      >
        {link.href.replace('https://', '').replace('www.', '').replace('/', '')}
      </div>
    </>
  )
}

interface CoursePlatformProps {
  platform: string
}

function CoursePlatform({ platform }: CoursePlatformProps) {
  return (
    <Badge
      className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
      variant="outline"
    >
      {platform}
    </Badge>
  )
}

interface CourseCardProps {
  title: string
  description: string
  platform: string
  link: { href: string; label: string }
}

function CourseCard({ title, description, platform, link }: CourseCardProps) {
  return (
    <Card
      className="flex h-full flex-col overflow-hidden border p-3"
      role="article"
    >
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <CourseLink title={title} link={link} />
          </CardTitle>
          <CardDescription
            className="text-pretty font-mono text-xs print:text-[10px]"
            aria-label="Course description"
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <CoursePlatform platform={platform} />
      </CardContent>
    </Card>
  )
}

interface CoursesProps {
  courses: (typeof RESUME_DATA)['courses']
}

export function Courses({ courses }: CoursesProps) {
  return (
    <Section className="print-force-new-page scroll-mb-16 print:space-y-4 print:pt-12">
      <h2 className="text-xl font-bold">Cursos</h2>
      <div
        className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3"
        role="feed"
        aria-labelledby="cursos"
      >
        {courses.map((course) => (
          <article key={course.title} className="h-full">
            <CourseCard
              title={course.title}
              description={course.description}
              platform={course.platform}
              link={course.link}
            />
          </article>
        ))}
      </div>
    </Section>
  )
}

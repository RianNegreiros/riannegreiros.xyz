import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CommandMenu } from '@/app/components/CommandMenu'
import { Metadata } from 'next'
import { Section } from '@/components/ui/section'
import { MailIcon, PhoneIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RESUME_DATA } from '@/data/resume-data'
import { ResumeProjectCard } from '../components/ResumeProjectCard'

export const metadata: Metadata = {
  title: `Currículo ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
}

export default function Page() {
  return (
    <main className="container mx-auto p-4 mb-4 md:p-16 bg-white dark:bg-gray-900 rounded-sm print:p-12">
      <section className="max-w-2xl mx-auto space-y-8 print:space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {RESUME_DATA.name}
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300 print:text-[12px]">
              {RESUME_DATA.about}
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              <a
                className="hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
              >
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-2 pt-1 print:hidden">
              {RESUME_DATA.contact.email && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    aria-label="Send email to Rian Negreiros"
                  >
                    <MailIcon className="w-4 h-4" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.tel && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`tel:${RESUME_DATA.contact.tel}`}
                    aria-label="Call Rian Negreiros"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    <span className="sr-only">Phone</span>
                  </a>
                </Button>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a
                    href={social.url}
                    aria-label={`Visit ${social.name} profile`}
                    target="_blank"
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px]">
              {RESUME_DATA.contact.email && (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              )}
              {RESUME_DATA.contact.tel && (
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  <span className="underline">{RESUME_DATA.contact.tel}</span>
                </a>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <a key={social.name} href={social.url} target="_blank">
                  <span className="underline">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <Section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Sobre
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 print:text-[12px]">
            {RESUME_DATA.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Educação
          </h2>
          {RESUME_DATA.education.map((education) => (
            <Card key={education.school}>
              <CardHeader>
                <div className="flex justify-between text-base">
                  <h3 className="font-semibold">{education.school}</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {education.start} - {education.end}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-2 text-sm text-gray-500 dark:text-gray-400 print:text-[12px]">
                {education.degree}
              </CardContent>
            </Card>
          ))}
        </Section>
        <Section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Conhecimentos
          </h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.skills.map((skill) => (
              <Badge
                key={skill}
                className="text-sm bg-primary dark:bg-primary/10 dark:hover:bg-primary dark:text-gray-200 print:text-[10px]"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Section>
        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Projetos
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 print:grid-cols-2 print:gap-2">
            {RESUME_DATA.projects.map((project) => (
              <ResumeProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.techStack}
                link={project.link}
              />
            ))}
          </div>
        </Section>
      </section>
      <CommandMenu
        links={[
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  )
}

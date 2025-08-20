import { CommandMenu } from './_components/CommandMenu'
import { Metadata } from 'next'
import { RESUME_DATA } from '@/data/resume-data'
import { Education } from './_components/Education'
import { Projects } from './_components/Projects'
import { Courses } from './_components/Courses'
import { Skills } from './_components/Skills'
import { Summary } from './_components/Summary'
import { Header } from './_components/Header'

export const metadata: Metadata = {
  title: `Currículo ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
}

export default function Page() {
  return (
    <main className="container relative max-w-4xl mx-auto mt-5 scroll-my-12 overflow-auto p-4 rounded-lg print:p-11 print:my-0 md:p-16 dark:bg-gray-900">
      <div className="sr-only">
        <h1>{RESUME_DATA.name}&apos;s Resume</h1>
      </div>

      <section
        className="mx-auto w-full max-w-4xl space-y-8 print:space-y-4"
        aria-label="Resume Content"
      >
        <Header />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={RESUME_DATA.summary} />

          <Education education={RESUME_DATA.education} />

          <Skills skills={RESUME_DATA.skills} />

          <Projects projects={RESUME_DATA.projects} />

          <Courses courses={RESUME_DATA.courses} />
        </div>
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

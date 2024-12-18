import { CommandMenu } from '@/app/components/CommandMenu'
import { Metadata } from 'next'
import { RESUME_DATA } from '@/data/resume-data'
import { Education } from '../components/Education'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import { Summary } from '../components/Summary'
import { Header } from '../components/Header'

export const metadata: Metadata = {
  title: `Currículo ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
}

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-11 md:p-16 bg-white dark:bg-gray-900">
      <div className="sr-only">
        <h1>{RESUME_DATA.name}&apos;s Resume</h1>
      </div>

      <section
        className="max-w-2xl mx-auto space-y-8 print:space-y-4"
        aria-label="Resume Content"
      >
        <Header />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={RESUME_DATA.summary} />

          <Education education={RESUME_DATA.education} />

          <Skills skills={RESUME_DATA.skills} />

          <Projects projects={RESUME_DATA.projects} />
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

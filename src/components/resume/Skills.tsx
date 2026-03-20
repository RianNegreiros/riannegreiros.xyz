import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'

type SkillsArray = readonly string[]

interface SkillsListProps {
  skills: SkillsArray
  className?: string
}

function SkillsList({ skills, className }: SkillsListProps) {
  return (
    <ul
      className={cn('flex list-none flex-wrap gap-1 p-0', className)}
      aria-label="Lista de habilidades"
    >
      {skills.map((skill) => (
        <li key={skill}>
          <Badge className="print:text-[10px]" aria-label={`Skill: ${skill}`}>
            {skill}
          </Badge>
        </li>
      ))}
    </ul>
  )
}

interface SkillsProps {
  skills: SkillsArray
  className?: string
}

export function Skills({ skills, className }: SkillsProps) {
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="skills-section">
        Habilidades
      </h2>
      <SkillsList skills={skills} aria-labelledby="skills-section" />
    </Section>
  )
}

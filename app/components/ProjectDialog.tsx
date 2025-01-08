import Image from 'next/image'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ProjectsCard } from '@/app/lib/interface'
import { urlFor } from '@/app/lib/sanity'

interface ProjectDialogProps {
  project: ProjectsCard
  isOpen: boolean
  onClose: () => void
}

export function ProjectDialog({
  project,
  isOpen,
  onClose,
}: ProjectDialogProps) {
  if (!project) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2">
          {project.description}
        </DialogDescription>
        <div className="mt-4">
          <Image
            src={urlFor(project.image).url()}
            alt={project.title}
            className="rounded-md object-cover w-full"
            width={560}
            height={315}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <Button asChild className="w-full">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Abrir no GitHub
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

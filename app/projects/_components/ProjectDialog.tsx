import Image from 'next/image'
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
      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2">
          {project.description}
        </DialogDescription>
        <div className="mt-4">
          <Image
            src={project.imageUrl}
            alt={project.title}
            className="rounded-md object-cover w-full"
            priority
            width={800}
            height={400}
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
              <Image
                alt="Github logo"
                className="mr-2 h-4 w-4"
                height="4"
                width="4"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg"
              />
              Abrir no GitHub
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

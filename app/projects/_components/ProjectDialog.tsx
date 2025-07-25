import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { ProjectsCard } from '@/app/lib/types'
import { GitHubIcon } from '@/components/icons'

interface ProjectDialogProps {
  project: ProjectsCard | null
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
      <DialogContent className="max-w-3xl mx-auto p-6 overflow-hidden">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 aspect-video relative rounded-lg overflow-hidden border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={400}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            placeholder="blur"
            blurDataURL={project.blurImage}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Tecnologias</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button asChild className="w-full sm:w-auto" variant="default">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <GitHubIcon className="mr-2 w-4 h-4" />
              Ver código-fonte no Github
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

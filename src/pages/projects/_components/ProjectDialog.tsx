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
import { GitHubIcon } from '@/components/icons'
import { MotionDiv } from '@/components/MotionComponents'
import type { ProjectsCard } from '@/lib/types'

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
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}>
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 aspect-video relative rounded-lg overflow-hidden border">
            <img
              loading="lazy"
              src={project.imageUrl}
              alt={project.title}
              width={800}
              height={400}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6">
            <h3 className="text-sm font-medium mb-2">Tecnologias</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <MotionDiv
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.05 }}>
                  <Badge variant="secondary">{tag}</Badge>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}>
            <DialogFooter className="mt-6">
              <Button asChild className="w-full sm:w-auto" variant="default">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center">
                  <GitHubIcon className="mr-2 w-4 h-4" />
                  Ver código-fonte no Github
                </a>
              </Button>
            </DialogFooter>
          </MotionDiv>
        </MotionDiv>
      </DialogContent>
    </Dialog>
  )
}

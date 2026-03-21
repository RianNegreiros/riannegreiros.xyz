import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { optimizedImageUrl } from '@/lib/services/sanity'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { GitHubIcon } from '@/components/icons'
import type { SanityProject } from '@/lib/types'

interface ProjectDialogProps {
  project: SanityProject | null
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
      <DialogContent className="mx-auto max-w-3xl overflow-hidden p-6">
        <div className="animate-dialog-in">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div
            className="animate-slide-up relative mt-6 aspect-video overflow-hidden rounded-lg border"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <img
              loading="lazy"
              src={optimizedImageUrl(project.image, 800)}
              alt={project.title}
              width={800}
              height={400}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </div>

          <div
            className="animate-slide-up mt-6"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <h3 className="mb-2 text-sm font-medium">Tecnologias</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, index: number) => (
                <span
                  key={tag}
                  className="animate-scale-in"
                  style={{
                    animationDelay: `${0.3 + index * 0.05}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <Badge variant="secondary">{tag}</Badge>
                </span>
              ))}
            </div>
          </div>

          <div
            className="animate-slide-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <DialogFooter className="mt-6">
              <Button asChild className="w-full sm:w-auto" variant="default">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  Ver código-fonte no Github
                </a>
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { motion } from 'framer-motion'
import { ProjectsCard } from '../lib/interface'
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ModalProps {
  selected: ProjectsCard | null
  setSelected: React.Dispatch<React.SetStateAction<ProjectsCard | null>>
}

export default function Modal({ selected, setSelected }: ModalProps) {
  if (!selected) {
    return <></>
  }

  return (
    <Dialog open={!!selected} onOpenChange={() => setSelected(null)} modal>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-10" />
      <DialogContent
        aria-description=""
        aria-describedby="dialog-description"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 max-w-screen-md w-full z-20"
      >
        <VisuallyHidden.Root>
          <DialogDescription>Project Dialog</DialogDescription>
        </VisuallyHidden.Root>
        <motion.div
          layoutId={`card-${selected._id}`}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-screen-2xl"
        >
          <DialogTitle className="sr-only">{selected.title}</DialogTitle>
          <Image
            src={selected.imageUrl}
            alt={`Projeto entitulado ${selected.title} apresentando ${selected.description}`}
            width={800}
            height={400}
            priority
            placeholder="blur"
            blurDataURL={selected.blurImage}
          />
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="p-4 sm:p-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary dark:text-white">
              {selected.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.tags.map((tag) => (
                <span
                  className="inline-flex items-center rounded-md bg-primary/10 dark:bg-primary/20 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/20 dark:ring-primary/30"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="my-4 text-sm sm:text-base text-muted-foreground dark:text-gray-400">
              {selected.description}
            </p>
            <a href={selected.link} target="_blank" rel="noopener noreferrer">
              <button className="w-full py-2 px-4 bg-primary text-white border-2 font-semibold rounded-md transition duration-300 hover:text-primary hover:bg-primary/10 hover:border-primary dark:hover:border-primary">
                Github
              </button>
            </a>
          </motion.div>
        </motion.div>
        <DialogClose className="absolute top-4 right-4 text-white">
          <X
            size={16}
            className="text-primary dark:text-white dark:hover:text-primary hover:text-white transition duration-300"
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

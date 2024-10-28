import { motion } from "framer-motion";
import { ProjectsCard } from "../lib/interface";
import { X } from "lucide-react";

interface ModalProps {
  selected: ProjectsCard | null;
  setSelected: React.Dispatch<React.SetStateAction<ProjectsCard | null>>;
}

export default function Modal({ selected, setSelected }: ModalProps) {
  if (!selected) {
    return <></>;
  }

  return (
    <div
      onClick={() => setSelected(null)}
      className="fixed inset-0 bg-black/50 z-50 cursor-pointer overflow-y-scroll"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[90%] sm:max-w-[700px] mx-auto my-8 px-4 sm:px-8 cursor-default relative"
      >
        <motion.div layoutId={`card-${selected._id}`}>
          <img
            src={selected.imageUrl}
            alt={selected.title}
            className="rounded-t-2xl object-cover w-full"
          />
        </motion.div>
        <button
          onClick={() => setSelected(null)}
          className="absolute top-1 right-5 bg-primary/20 text-white rounded-full p-1 transition duration-300 sm:hidden"
        >
          <X />
        </button>
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
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-b-2xl shadow-lg relative"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary dark:text-white">{selected.title}</h3>
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
          <p className="my-4 text-sm sm:text-base text-muted-foreground dark:text-gray-400">{selected.description}</p>
          <a href={selected.link} target="_blank" rel="noopener noreferrer">
            <button className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition duration-300 dark:bg-primary-dark dark:hover:bg-primary">
              Github
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

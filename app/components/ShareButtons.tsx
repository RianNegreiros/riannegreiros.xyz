"use client"

import { Share2 } from 'lucide-react'
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
  PocketIcon,
  PocketShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import { motion } from 'framer-motion'

type tParams = {
  slug: string
  title: string
  body: string
}

export default function ShareButtons(props: { params: tParams }) {
  return (
    <div data-dial-init className="fixed end-6 bottom-6 group">
      <div className="flex-col items-center group-hover:flex group-hover:visible hidden mb-4 space-y-2">
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-200">
          <LinkedinShareButton url={`https://www.riannegreiros.dev/${props.params.slug}`}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-100">
          <TwitterShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-100">
          <EmailShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            subject={props.params.title}
            body={props.params.body}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-100">
          <WhatsappShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-100">
          <TelegramShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="transition-transform duration-100">
          <PocketShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
          >
            <PocketIcon size={32} round />
          </PocketShareButton>
        </motion.div>
      </div>
      <button type="button" data-dial-toggle="speed-dial-menu-bottom-right" aria-controls="speed-dial-menu-bottom-right" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-500 rounded-full w-10 h-10 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-600">
        <Share2 />
        <span className="sr-only">Open share menu</span>
      </button>
    </div>
  )
}

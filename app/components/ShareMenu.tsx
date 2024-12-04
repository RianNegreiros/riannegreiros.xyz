'use client'

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
import { Button } from '@/components/ui/button'

type tParams = {
  slug: string
  title: string
  body: string
}

export default function ShareMenu(props: { params: tParams }) {
  const buttonDivClass =
    'py-1.5 px-3 text-sm font-medium rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:bg-gray-700'
  const buttonClass = 'transition-transform duration-100 my-2'
  return (
    <div className="fixed end-4 bottom-4 group hidden md:block">
      <div
        className={`hidden flex-col items-center group-hover:flex group-hover:visible mb-4 ${buttonDivClass}`}
      >
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <LinkedinShareButton
            url={`https://www.riannegreiros.dev/${props.params.slug}`}
            aria-label="Share on LinkedIn"
          >
            <LinkedinIcon size={26} round />
          </LinkedinShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <TwitterShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
            aria-label="Share on Twitter"
          >
            <TwitterIcon size={26} round />
          </TwitterShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <EmailShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            subject={props.params.title}
            body={props.params.body}
            aria-label="Share via Email"
          >
            <EmailIcon size={26} round />
          </EmailShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <WhatsappShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
            separator=":: "
            aria-label="Share on WhatsApp"
          >
            <WhatsappIcon size={26} round />
          </WhatsappShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <TelegramShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
            aria-label="Share on Telegram"
          >
            <TelegramIcon size={26} round />
          </TelegramShareButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className={buttonClass}>
          <PocketShareButton
            url={`https://www.riannegreiros.dev/post/${props.params.slug}`}
            title={props.params.title}
            aria-label="Save to Pocket"
          >
            <PocketIcon size={26} round />
          </PocketShareButton>
        </motion.div>
      </div>

      <Button className='flex items-center justify-center' variant="outline">
        <Share2 className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Open share menu</span>
      </Button>
    </div>
  )
}

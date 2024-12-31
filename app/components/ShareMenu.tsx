/* eslint-disable @typescript-eslint/no-explicit-any */
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

type ShareButtonProps = {
  Component: React.ComponentType<any>
  Icon: React.ComponentType<any>
  url: string
  title?: string
  body?: string
  separator?: string
  ariaLabel: string
}

const ShareButton = ({
  Component,
  Icon,
  url,
  title,
  body,
  separator,
  ariaLabel,
}: ShareButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="transition-transform duration-100 my-2"
  >
    <Component
      url={url}
      title={title}
      body={body}
      separator={separator}
      aria-label={ariaLabel}
    >
      <Icon size={26} round />
    </Component>
  </motion.div>
)

export default function ShareMenu(props: { params: tParams }) {
  const buttonDivClass =
    'py-1.5 px-3 text-sm font-medium rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:bg-gray-700'
  const baseUrl = process.env.BASE_URL
  const { slug, title, body } = props.params

  return (
    <div className="fixed end-4 bottom-4 group hidden md:block z-10">
      <div
        className={`hidden flex-col items-center group-hover:flex group-hover:visible mb-4 ${buttonDivClass}`}
      >
        <ShareButton
          Component={LinkedinShareButton}
          Icon={LinkedinIcon}
          url={`${baseUrl}/post/${slug}`}
          ariaLabel="Share on LinkedIn"
        />
        <ShareButton
          Component={TwitterShareButton}
          Icon={TwitterIcon}
          url={`${baseUrl}/post/${slug}`}
          title={title}
          ariaLabel="Share on Twitter"
        />
        <ShareButton
          Component={EmailShareButton}
          Icon={EmailIcon}
          url={`${baseUrl}/post/${slug}`}
          title={title}
          body={body}
          ariaLabel="Share via Email"
        />
        <ShareButton
          Component={WhatsappShareButton}
          Icon={WhatsappIcon}
          url={`${baseUrl}/post/${slug}`}
          title={title}
          separator=":: "
          ariaLabel="Share on WhatsApp"
        />
        <ShareButton
          Component={TelegramShareButton}
          Icon={TelegramIcon}
          url={`${baseUrl}/post/${slug}`}
          title={title}
          ariaLabel="Share on Telegram"
        />
        <ShareButton
          Component={PocketShareButton}
          Icon={PocketIcon}
          url={`${baseUrl}/post/${slug}`}
          title={title}
          ariaLabel="Save to Pocket"
        />
      </div>

      <Button className="flex items-center justify-center" variant="outline">
        <Share2 className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Open share menu</span>
      </Button>
    </div>
  )
}

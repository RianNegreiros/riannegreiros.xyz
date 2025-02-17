'use client'

import { Share2 } from 'lucide-react'
import {
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from 'next-share'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type tParams = {
  slug: string
  title: string
  body: string
}

export default function ShareButton(props: { params: tParams }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const { slug, title, body } = props.params

  const shareOptions = [
    {
      name: 'LinkedIn',
      Component: LinkedinShareButton,
      url: `${baseUrl}/posts/${slug}`,
      ariaLabel: 'Compartilhar no LinkedIn',
    },
    {
      name: 'Twitter',
      Component: TwitterShareButton,
      url: `${baseUrl}/posts/${slug}`,
      title: title,
      ariaLabel: 'Compartilhar no Twitter',
    },
    {
      name: 'Email',
      Component: EmailShareButton,
      url: `${baseUrl}/posts/${slug}`,
      title: title,
      body: body,
      ariaLabel: 'Compartilhar por Email',
    },
    {
      name: 'WhatsApp',
      Component: WhatsappShareButton,
      url: `${baseUrl}/posts/${slug}`,
      title: title,
      separator: ':: ',
      ariaLabel: 'Compartilhar no WhatsApp',
    },
    {
      name: 'Telegram',
      Component: TelegramShareButton,
      url: `${baseUrl}/posts/${slug}`,
      title: title,
      ariaLabel: 'Compartilhar no Telegram',
    },
    {
      name: 'Facebook',
      Component: FacebookShareButton,
      url: `${baseUrl}/posts/${slug}`,
      title: title,
      ariaLabel: 'Compartilhar no Facebook',
    },
  ]

  const isMobile = typeof window !== 'undefined' && window.navigator?.share

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: body,
        url: `${baseUrl}/posts/${slug}`,
      })
    }
  }

  return isMobile ? (
    <Button onClick={handleNativeShare} variant='outline' className="fixed bottom-4 right-4 rounded-full">
      <Share2 className="h-4 w-4" />
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Open share menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {shareOptions.map((option) => (
          <DropdownMenuItem key={option.name}>
            <option.Component
              url={option.url}
              title={option.title}
              body={option.body}
              separator={option.separator}
              aria-label={option.ariaLabel}
            >
              {option.name}
            </option.Component>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
} from 'react-share'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type ShareButtonProps = {
  slug: string
  title: string
  description?: string
}

export default function ShareButton({
  slug,
  title,
  description = '',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin
  const url = `${baseUrl}/blog/${slug}`

  const handleNativeShare = async () => {
    if (!navigator.share) return

    try {
      await navigator.share({
        title,
        text: description,
        url,
      })
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleSocialShare = (
    platform:
      | 'twitter'
      | 'linkedin'
      | 'facebook'
      | 'whatsapp'
      | 'telegram'
      | 'reddit'
      | 'email',
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'article',
        item_id: slug,
      })
    }
  }

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  if (hasNativeShare) {
    return (
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Compartilhar post">
        <Share2 className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Abrir menu de compartilhamento">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink}>
          <div className="flex items-center justify-between w-full">
            <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
            {copied && <Check className="h-4 w-4 text-green-500" />}
          </div>
        </DropdownMenuItem>

        <div className="my-1 border-t border-border" />

        <TwitterShareButton
          url={url}
          title={title}
          onClick={() => handleSocialShare('twitter')}>
          <DropdownMenuItem>Twitter/X</DropdownMenuItem>
        </TwitterShareButton>

        <LinkedinShareButton
          url={url}
          onClick={() => handleSocialShare('linkedin')}>
          <DropdownMenuItem>LinkedIn</DropdownMenuItem>
        </LinkedinShareButton>

        <FacebookShareButton
          url={url}
          onClick={() => handleSocialShare('facebook')}>
          <DropdownMenuItem>Facebook</DropdownMenuItem>
        </FacebookShareButton>

        <WhatsappShareButton
          url={url}
          title={title}
          onClick={() => handleSocialShare('whatsapp')}>
          <DropdownMenuItem>WhatsApp</DropdownMenuItem>
        </WhatsappShareButton>

        <TelegramShareButton
          url={url}
          title={title}
          onClick={() => handleSocialShare('telegram')}>
          <DropdownMenuItem>Telegram</DropdownMenuItem>
        </TelegramShareButton>

        <RedditShareButton
          url={url}
          title={title}
          onClick={() => handleSocialShare('reddit')}>
          <DropdownMenuItem>Reddit</DropdownMenuItem>
        </RedditShareButton>

        <EmailShareButton
          url={url}
          subject={title}
          body={description}
          onClick={() => handleSocialShare('email')}>
          <DropdownMenuItem>E-mail</DropdownMenuItem>
        </EmailShareButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

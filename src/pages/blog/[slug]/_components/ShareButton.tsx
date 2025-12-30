/** eslint-disable @typescript-eslint/no-explicit-any */
import { Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

type ShareButtonProps = {
  slug: string
  title: string
  description?: string
}

const SHARE_PLATFORMS = {
  twitter: (url: string, title: string) =>
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  whatsapp: (url: string, title: string) =>
    `https://wa.me/?text=${title}%20${url}`,
  telegram: (url: string, title: string) =>
    `https://t.me/share/url?url=${url}&text=${title}`,
  reddit: (url: string, title: string) =>
    `https://reddit.com/submit?url=${url}&title=${title}`,
  email: (url: string, title: string) =>
    `mailto:?subject=${title}&body=Confira este artigo: ${url}`,
} as const

type Platform = keyof typeof SHARE_PLATFORMS

const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: 'Twitter/X',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  reddit: 'Reddit',
  email: 'E-mail',
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
    platform: Platform,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault()
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const shareUrl = SHARE_PLATFORMS[platform](encodedUrl, encodedTitle)

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'article',
        item_id: slug,
      })
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600')
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

        {(Object.keys(SHARE_PLATFORMS) as Platform[]).map((platform) => (
          <DropdownMenuItem
            key={platform}
            onClick={(e) => handleSocialShare(platform, e)}>
            {PLATFORM_LABELS[platform]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

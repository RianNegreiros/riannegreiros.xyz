import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

type ShareButtonProps = {
  slug: string
  title: string
  body: string
}

export default function ShareButton({ slug, title, body }: ShareButtonProps) {
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin
  const url = `${baseUrl}/blog/${slug}`

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Mobi|Android|iPhone/i.test(navigator.userAgent))
    }
    checkMobile()
  }, [])

  const handleNativeShare = async () => {
    if ('share' in navigator) {
      try {
        await navigator.share({
          title,
          text: body,
          url,
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  }

  return isMobile && 'share' in navigator ? (
    <Button
      onClick={handleNativeShare}
      variant="outline"
      className="fixed bottom-4 right-4 rounded-full"
    >
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
        <DropdownMenuItem onClick={() => handleSocialShare('twitter')}>
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare('linkedin')}>
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare('facebook')}>
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare('whatsapp')}>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare('telegram')}>
          Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare('email')}>
          Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

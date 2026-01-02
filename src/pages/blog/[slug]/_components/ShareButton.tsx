import { Share2, Link as LinkIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useState, useEffect } from 'react'
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share'
import { MotionDiv } from '@/components/MotionComponents'

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
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin
  const url = `${baseUrl}/blog/${slug}`

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      setIsMobile(mobile && !!navigator.share)
    }
    checkMobile()
  }, [])

  const handleNativeShare = async () => {
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

  const shareMessages = {
    twitter: `Confira este artigo: ${title} - ${url}`,
    linkedin: `Achei este artigo interessante: ${title} - ${url}`,
    whatsapp: `Ei, achei que você poderia gostar deste artigo: ${title} - ${url}`,
    telegram: `Dê uma olhada nisso: ${title} - ${url}`,
    email: `Olá,\n\nAchei que você poderia achar este artigo interessante:\n\nTítulo: ${title}\nDescrição: ${description}\nLink: ${url}\n\nAtenciosamente,`,
  }

  const handleEmailShare = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      `Confira este artigo: ${title}`,
    )}&body=${encodeURIComponent(shareMessages.email)}`

    const emailWindow = window.open(mailtoUrl, '_blank')
    if (!emailWindow) {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 3000)
    }
  }

  if (isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Button
              onClick={handleNativeShare}
              variant="outline"
              size="icon"
              className="shadow-xs"
              aria-label="Compartilhar post">
              <Share2 className="h-4 w-4" />
            </Button>
          </MotionDiv>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Compartilhar
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shadow-xs"
              aria-label="Abrir menu de compartilhamento">
              <Share2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          Compartilhar
        </TooltipContent>
      </Tooltip>

      <PopoverContent className="w-auto p-3" align="end">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="icon"
                  className="shadow-xs h-8 w-8">
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <LinkIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {copied ? 'Link copiado' : 'Copiar link'}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                {copied ? 'Link copiado!' : 'Copiar link'}
              </TooltipContent>
            </Tooltip>
            <span className="text-sm text-muted-foreground">
              {copied ? 'Link copiado!' : 'Copiar link'}
            </span>
          </div>

          <div className="border-t pt-2" />
          <div className="grid grid-cols-4 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <TwitterShareButton
                  url={url}
                  title={shareMessages.twitter}
                  className="hover:opacity-80 transition-opacity">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Twitter/X
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <FacebookShareButton
                  url={url}
                  hashtag="#article"
                  className="hover:opacity-80 transition-opacity">
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Facebook
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <LinkedinShareButton
                  url={url}
                  title={title}
                  summary={shareMessages.linkedin}
                  className="hover:opacity-80 transition-opacity">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                LinkedIn
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <WhatsappShareButton
                  url={url}
                  title={shareMessages.whatsapp}
                  className="hover:opacity-80 transition-opacity">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                WhatsApp
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <TelegramShareButton
                  url={url}
                  title={shareMessages.telegram}
                  className="hover:opacity-80 transition-opacity">
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Telegram
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <RedditShareButton
                  url={url}
                  title={title}
                  className="hover:opacity-80 transition-opacity">
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Reddit
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={handleEmailShare}
                  className="hover:opacity-80 transition-opacity cursor-pointer">
                  <EmailIcon size={32} round />
                </div>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                {emailError ? 'Erro no email' : 'E-mail'}
              </TooltipContent>
            </Tooltip>
          </div>

          {emailError && (
            <div className="text-red-500 text-xs mt-2">
              Falha ao abrir o cliente de email. Tente novamente ou copie o link
              manualmente.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

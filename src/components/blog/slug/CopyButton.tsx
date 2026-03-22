import { useState } from 'react'
import { ClipboardIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 1000)
    })
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={`relative z-10 h-8 w-8 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 ${className}`}
      onClick={handleCopy}
      aria-label={hasCopied ? 'Copied' : 'Copy'}
    >
      <span className="sr-only">{hasCopied ? 'Copied' : 'Copy'}</span>
      {hasCopied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <ClipboardIcon className="h-4 w-4" />
      )}
    </Button>
  )
}

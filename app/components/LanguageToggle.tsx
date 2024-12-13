'use client'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

interface ToggleButtonProps {
  language: string
  onToggle: (language: string) => void
}

export default function LanguageToggle({
  language,
  onToggle,
}: ToggleButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{language === 'en' ? 'Switch to English' : 'Mudar Para Português'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onToggle('pt')}>
          Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggle('en')}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

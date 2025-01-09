'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePortfolioSearch } from '../hooks/usePortfolioSearch'
import { Search, FileText, Briefcase } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SearchInput() {
  const [open, setOpen] = useState(false)
  const { search, setSearch, filteredResults } = usePortfolioSearch()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((open) => !open)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 hidden md:flex"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 hidden xl:mr-2 xl:flex" />
        <span className="inline-flex">Procurar...</span>
        <span className="sr-only">Procurar</span>
        <kbd className="pointer-events-none absolute right-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="flex md:hidden ml-2 items-center justify-center"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4 sm:p-6">
          <DialogDescription className="sr-only">
            Procure por Posts ou Projetos
          </DialogDescription>
          <DialogHeader>
            <DialogTitle>Procure por Posts ou Projetos</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <Input
              type="search"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((item) => (
                  <Link
                    key={item._id}
                    href={
                      item._type === 'post'
                        ? `/posts/${item.slug.current}`
                        : item.link
                    }
                    className="block p-3 hover:bg-accent rounded-lg transition-colors"
                    target={item._type === 'project' ? '_blank' : '_self'}
                    rel={
                      item._type === 'project'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {item._type === 'post' ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Briefcase className="h-4 w-4" />
                        )}
                      </span>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {item._type === 'post'
                            ? item.overview
                            : item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Nenhum resultado encontrado
              </p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

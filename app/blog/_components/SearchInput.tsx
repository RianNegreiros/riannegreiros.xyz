'use client'

import { Input } from '@/components/ui/input'
import { Search, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/app/hooks/useDebounce'

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const updateSearch = async () => {
      setIsSearching(true)
      try {
        await router.push(
          `${pathname}?${createQueryString('search', debouncedSearch)}`,
          { scroll: false }
        )
      } finally {
        setIsSearching(false)
      }
    }
    updateSearch()
  }, [debouncedSearch, createQueryString, pathname, router])

  return (
    <div className="relative mb-8">
      {isSearching ? (
        <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      )}
      <Input
        type="search"
        placeholder="Buscar posts..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar posts"
      />
    </div>
  )
}

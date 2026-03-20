import { Search } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export default function SearchInput() {
  const [search, setSearch] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('search') ?? ''
  })
  const debouncedSearch = useDebounce(search, 300)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const params = new URLSearchParams(window.location.search)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    params.delete('page')
    const queryString = params.toString()
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${queryString ? `?${queryString}` : ''}`,
    )
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [debouncedSearch])

  return (
    <div className="relative mb-8">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
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

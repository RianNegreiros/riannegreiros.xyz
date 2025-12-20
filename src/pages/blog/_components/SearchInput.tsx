import { Search, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    setIsSearching(true)

    const params = new URLSearchParams(location.search)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to page 1 on search

    const queryString = params.toString()
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ''}`, {
      replace: true,
    })

    setIsSearching(false)
  }, [debouncedSearch, location.pathname, navigate])

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

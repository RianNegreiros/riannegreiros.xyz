import { useState, useMemo, useEffect } from 'react'
import { fetchSanityData } from '@/app/lib/services/sanity'
import { queries } from '@/app/lib/services/sanity.queries'
import { PortfolioItem } from '@/app/lib/types/sanity'

async function fetchPortfolioData(
  searchParam: string
): Promise<PortfolioItem[]> {
  const queryResult = queries.portfolio.search(searchParam)
  return await fetchSanityData<PortfolioItem[]>(queryResult)
}

export function usePortfolioSearch() {
  const [search, setSearch] = useState('')
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const fetchResults = async () => {
      if (search) {
        const results = await fetchPortfolioData(search)
        setPortfolioData(results)
      } else {
        setPortfolioData([])
      }
    }
    fetchResults()
  }, [search])

  const filteredResults = useMemo(() => {
    if (!search.trim()) return []
    const searchLower = search.toLowerCase()
    return portfolioData.filter((item) =>
      item.title.toLowerCase().includes(searchLower)
    )
  }, [search, portfolioData])

  return { search, setSearch, filteredResults }
}

import { queries, fetchSanityData } from '../lib/services'
import type { PortfolioItem } from '../lib/types'
import { useState, useMemo, useEffect } from 'react'

async function fetchPortfolioData(
  searchParam: string,
): Promise<PortfolioItem[]> {
  const queryResult = queries.portfolio.search(searchParam)
  return await fetchSanityData<PortfolioItem[]>(queryResult.query)
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
      item.title.toLowerCase().includes(searchLower),
    )
  }, [search, portfolioData])

  return { search, setSearch, filteredResults }
}

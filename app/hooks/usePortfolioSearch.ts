import { useState, useMemo, useEffect } from 'react'
import { client } from '@/app/lib/sanity'
import { PortfolioItem } from '../lib/interface'

async function fetchPortfolioData(
  searchParam: string
): Promise<PortfolioItem[]> {
  const query = `*[_type in ['post', 'project'] && (title match '${searchParam}*')]{
    _id,
    _type,
    title,
    slug,
    overview,
    description,
    link,
    firstPublishedDate,
    "index": order
  }`
  return await client.fetch(query)
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

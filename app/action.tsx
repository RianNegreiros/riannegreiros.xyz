'use server'

import { fetchSanityData } from './lib/services/sanity'
import { queries } from './lib/services' // Use services index instead of direct file import
import type { PortfolioItem } from './lib/types/sanity'
import TimelineItem from './components/TimelineItem'

export async function getTotalPosts() {
  return fetchSanityData<number>(queries.posts.count)
}

export async function getTotal() {
  return fetchSanityData<number>(queries.portfolio.count)
}

export async function getAll(pageNum = 0, itemsPerPage = 10) {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const query = queries.portfolio.timeline(start, end)
  const data = await fetchSanityData<PortfolioItem[]>(query)

  return data.map((item, index) => (
    <TimelineItem key={item.id} {...item} index={index} />
  ))
}

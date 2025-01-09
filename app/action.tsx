'use server'

import TimelineItem from './components/TimelineItem'
import { PortfolioItem } from './lib/interface'
import { client } from './lib/sanity'

export const getTotalPosts = async () => {
  const query = `count(*[_type == 'post'])`
  return client.fetch(query)
}

export const getTotal = async () => {
  const query = `count(*[_type in ['post', 'project']])`
  return client.fetch(query)
}

export const getAll = async (
  pageNum: number = 0,
  itemsPerPage: number = 10
) => {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const query = `*[_type == "post" || _type == "project"] | order(firstPublishedDate desc) [${start}...${end}] {
        title,
        _id,
        _type,
        link,
        slug,
        overview,
        description,
        firstPublishedDate
  }`

  const data = await client.fetch(query)

  return data.map((item: PortfolioItem, index: number) => (
    <TimelineItem key={item._id} {...item} index={index} />
  ))
}

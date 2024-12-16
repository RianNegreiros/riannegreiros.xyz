import { client } from '../lib/sanity'

export const getTotalPosts = async () => {
  const query = `count(*[_type == 'post'])`
  return client.fetch(query)
}

export const getTotal = async () => {
  const query = `count(*[_type != "translation.metadata" && _type != "sanity.imageAsset"])`
  return client.fetch(query)
}

export const getAll = async (pageNum: number = 0, itemsPerPage: number = 10) => {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const query = `*[_type != "translation.metadata" && _type != "sanity.imageAsset"] | order(firstPublishedDate desc) [${start}...${end}] {
        title,
        _id,
        _type,
        link,
        slug,
        overview,
        description,
        firstPublishedDate
  }`

  return client.fetch(query)
}

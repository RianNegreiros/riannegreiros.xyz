import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = createClient({
  apiVersion: '2024-03-13',
  dataset: 'production',
  projectId: '091jywj8',
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function fetchSanityData<T>(query: string, params = {}) {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 3600,
      tags: ['sanity'],
    },
  })
}

export { client }

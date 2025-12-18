import { createClient } from '@sanity/client'
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url'

export const client = createClient({
  apiVersion: '2024-03-13',
  dataset: 'production',
  projectId: '091jywj8',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function fetchSanityData<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  return client.fetch(query, params)
}

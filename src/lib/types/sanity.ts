import type { PortableTextBlock } from '@portabletext/types'

export type SanityHeading = {
  text: string
  level: string
}

export type SanityPost = {
  _id: string
  title: string
  overview: string
  slug: string
  firstPublishedDate: string
  updatedAt?: string
  image?: {
    asset: {
      _id: string
      url: string
      metadata: {
        lqip?: string
        dimensions?: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  content?: PortableTextBlock[]
  headings: SanityHeading[]
}

export type SanityProject = {
  _id: string
  title: string
  link: string
  description: string
  tags: string[]
  image: { asset: { _ref: string } }
  createdAt: string
}

export type SanityPortfolioItem = {
  _id: string
  _type: 'post' | 'project'
  title: string
  slug?: string
  overview?: string
  description?: string
  link?: string
  displayDate: string
  _createdAt: string
}

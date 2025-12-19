/* eslint-disable @typescript-eslint/no-explicit-any */

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
  }
  content?: any[]
  headings: SanityHeading[]
}

export type SanityProject = {
  _id: string
  title: string
  link: string
  description: string
  tags: string[]
  imageUrl: string
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
  firstPublishedDate: string
  _createdAt: string
}

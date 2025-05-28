/* eslint-disable @typescript-eslint/no-explicit-any */

interface Span {
  _type: string
  marks: string[]
  text: string
  _key: string
}

export interface Heading {
  _type: string
  style: string
  _key: string
  markDefs: any[]
  children: Span[]
}

export interface Post {
  title: string
  overview: string
  content: any
  _id: string
  slug: {
    current: string
  }
  _createdAt: string
  firstPublishedDate: string
  updatedAt?: string
  headings: Heading[]
  image: any
  blurImage: string
  tags?: string[]
}

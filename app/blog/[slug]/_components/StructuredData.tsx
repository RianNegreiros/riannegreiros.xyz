import { urlFor } from '@/app/lib/services/sanity'
import { Post } from '@/app/lib/types/sanity'

interface StructuredDataProps {
  post: Post
  baseUrl: string
}

export default function StructuredData({ post, baseUrl }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image ? urlFor(post.image).url() : undefined,
    datePublished: post.firstPublishedDate,
    dateModified: post.updatedAt ?? post.firstPublishedDate,
    author: {
      '@type': 'Person',
      name: 'Rian Negreiros Dos Santos',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rian Negreiros Dos Santos',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/opengraph-image.png`,
      },
    },
    description: post.overview,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

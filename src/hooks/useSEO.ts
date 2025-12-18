import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function useSEO({
  title = 'Rian Negreiros Dos Santos',
  description = 'Software Engineer',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps = {}) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement

      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Basic meta tags
    updateMeta('description', description)
    updateMeta('robots', 'index, follow')

    // Open Graph tags
    updateMeta('og:title', title, true)
    updateMeta('og:description', description, true)
    updateMeta('og:image', new URL(image, window.location.origin).href, true)
    updateMeta('og:url', url, true)
    updateMeta('og:type', type, true)
    updateMeta('og:site_name', 'Rian Negreiros', true)

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', new URL(image, window.location.origin).href)

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMeta('article:published_time', publishedTime, true)
      }
      if (modifiedTime) {
        updateMeta('article:modified_time', modifiedTime, true)
      }
      updateMeta('article:author', 'Rian Negreiros', true)
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, image, url, type, publishedTime, modifiedTime])
}

export const queries = {
  posts: {
    list: (start: number, end: number, searchQuery?: string) => {
      let query = `*[_type == 'post'`
      if (searchQuery) {
        query += ` && (title match $searchQuery || overview match $searchQuery)]`
      } else {
        query += ']'
      }
      query += ` | order(firstPublishedDate desc) [${start}...${end}] {
        "id": _id,
        title,
        overview,
        "slug": slug.current,
        firstPublishedDate
      }`
      return {
        query,
        params: searchQuery ? { searchQuery: `*${searchQuery}*` } : {}
      }
    },
    bySlug: (
      slug: string
    ) => `*[_type == 'post' && slug.current == "${slug}"][0]{
      "id": _id,
      title,
      firstPublishedDate,
      updatedAt,
      image,
      "slug": slug.current,
      overview,
      "blurImage": image.asset->metadata.lqip,
      content[]{
        ...,
        _type == 'image' => {
          ...,
          "blurImage": asset->metadata.lqip,
          "url": asset->url
        }
      },
      "headings": content[]{
        _type == "block" && style match "h*" => {
          "text": pt::text(@),
          "level": style
        }
      }
    }`,
    count: `count(*[_type == 'post'])`,
  },
  projects: {
    list: `*[_type == 'project'] | order(_createdAt desc) {
      "id": _id,
      title,
      link,
      description,
      tags,
      "imageUrl": image.asset->url,
      "blurImage": image.asset->metadata.lqip,
      "createdAt": _createdAt
    }`,
  },
  portfolio: {
    search: (
      searchParam: string
    ) => ({
      query: `*[_type in ['post', 'project'] && (title match $searchQuery || overview match $searchQuery || description match $searchQuery)]{
        "id": _id,
        _type,
        title,
        "slug": slug.current,
        overview,
        description,
        firstPublishedDate
      }`,
      params: { searchQuery: `*${searchParam}*` }
    }),
    count: `count(*[_type in ['post', 'project']])`,
    timeline: (
      start: number,
      end: number
    ) => `*[_type in ["post", "project"]] | order(firstPublishedDate desc, _createdAt desc) [${start}...${end}] {
      "id": _id,
      _type,
      title,
      link,
      "slug": slug.current,
      overview,
      description,
      firstPublishedDate,
      "createdAt": _createdAt
    }`,
  },
}

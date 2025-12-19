export const queries = {
  posts: {
    list: (start: number, end: number, searchQuery?: string) => {
      const baseFilter = `_type == 'post' && defined(firstPublishedDate)`
      let query = `*[${baseFilter}`

      if (searchQuery) {
        query += ` && (title match $searchQuery || overview match $searchQuery)]`
      } else {
        query += ']'
      }

      query += ` | order(firstPublishedDate desc) [${start}...${end}] {
        _id,
        title,
        overview,
        "slug": slug.current,
        firstPublishedDate
      }`

      return {
        query,
        params: searchQuery ? { searchQuery: `*${searchQuery}*` } : {},
      }
    },
    bySlug: `*[_type == 'post' && slug.current == $slug][0]{
      _id,
      title,
      firstPublishedDate,
      updatedAt,
      "slug": slug.current,
      overview,
      image{
        asset->{
          _id,
          url,
          metadata{
            lqip,
            dimensions
          }
        }
      },
      content[]{
        ...,
        _type == 'image' => {
          ...,
          asset->{
            _id,
            url,
            metadata{
              dimensions
            }
          }
        }
      },
      "headings": content[_type == "block" && style match "h*"]{
        "text": pt::text(@),
        "level": style
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
      "createdAt": _createdAt
    }`,
  },
  portfolio: {
    search: (searchParam: string) => ({
      query: `*[_type in ['post', 'project'] && defined(title) && (title match $searchQuery || overview match $searchQuery || description match $searchQuery)]{
        _id,
        _type,
        title,
        "slug": slug.current,
        overview,
        description,
        firstPublishedDate,
        _createdAt
      } | order(coalesce(firstPublishedDate, _createdAt) desc)`,
      params: { searchQuery: `*${searchParam}*` },
    }),
    count: `count(*[_type in ['post', 'project'] && defined(title)])`,
    timeline: (
      start: number,
      end: number,
    ) => `*[_type in ["post", "project"] && defined(title)] | order(coalesce(firstPublishedDate, _createdAt) desc) [${start}...${end}] {
      _id,
      _type,
      title,
      "slug": slug.current,
      overview,
      description,
      link,
      firstPublishedDate,
      _createdAt
    }`,
  },
}

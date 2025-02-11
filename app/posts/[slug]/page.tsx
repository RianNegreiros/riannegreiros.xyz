import PostContent from './_components/PostContent'

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <PostContent params={params} />
}

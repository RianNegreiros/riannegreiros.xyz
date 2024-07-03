import { post } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          _createdAt,
          firstPublishedDate
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: post = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          {new Date(data.firstPublishedDate).toISOString().split("T")[0]}
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
}
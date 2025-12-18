import { createClient } from '@sanity/client';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const mode = process.env.NODE_ENV || "development";
const env = loadEnv(mode, process.cwd(), "");

const client = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: "2024-03-13",
});

const postSlugsQuery = `*[_type == 'post' && defined(slug.current)][].slug.current`;

async function getPostSlugs() {
  return await client.fetch(postSlugsQuery);
}

function getPageLinks() {
  const pagesDir = path.join(__dirname, '../src/pages');
  const pages = fs.readdirSync(pagesDir);

  const excludedPages = ['_', '[', 'rss', 'timeline'];

  return pages
    .filter(page => !excludedPages.some(excluded => page.includes(excluded)))
    .map(page => page.replace('index.tsx', ''))
    .map(page => ({
      url: `/${page}`,
      changefreq: 'monthly',
      priority: 0.7,
    }));
}

async function generateSitemap() {
  const [postSlugs, pageLinks] = await Promise.all([
    getPostSlugs(),
    Promise.resolve(getPageLinks())
  ]);

  const postLinks = postSlugs.map((slug: string) => ({
    url: `/blog/${slug}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    ...pageLinks,
    ...postLinks
  ];

  const stream = new SitemapStream({ hostname: env.VITE_BASE_URL });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data =>
    data.toString(),
  );

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
}

generateSitemap().catch(console.error);

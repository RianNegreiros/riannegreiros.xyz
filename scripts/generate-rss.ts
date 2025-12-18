import { writeFileSync } from 'fs'
import { generateRSSFeed } from '../src/lib/rss'
import { loadEnv } from 'vite'

async function main() {
  try {
    const mode = process.env.NODE_ENV || 'development'
    const env = loadEnv(mode, process.cwd(), '')

    const rss = await generateRSSFeed(env.VITE_BASE_URL)
    writeFileSync('public/rss.xml', rss)
    console.log('RSS feed generated successfully!')
  } catch (error) {
    console.error('Failed to generate RSS feed:', error)
    process.exit(1)
  }
}

main()

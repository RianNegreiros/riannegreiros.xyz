import fs from 'fs'
import path from 'path'
import { loadEnv } from 'vite'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const mode = process.env.NODE_ENV || 'development'
const env = loadEnv(mode, process.cwd(), '')

const baseUrl = env.VITE_BASE_URL

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`

function generateRobots() {
  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsContent)
  console.log('robots.txt generated successfully')
}

generateRobots()

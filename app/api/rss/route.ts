import { NextResponse } from 'next/server'
import { generateRssFeed } from '@/app/lib/rss'

export async function GET() {
  try {
    const rss = await generateRssFeed()
    return new NextResponse(rss, {
      headers: { 'Content-Type': 'application/rss+xml' },
    })
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate RSS feed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

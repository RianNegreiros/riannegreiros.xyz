import { NextResponse } from 'next/server'
import { generateRssFeed } from '@/lib/rss'

export async function GET() {
  try {
    const rss = await generateRssFeed()
    return new NextResponse(rss, {
      headers: { 'Content-Type': 'application/rss+xml' },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate RSS feed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

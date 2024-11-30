import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'
import { Navbar } from './components/Navbar'
import 'highlight.js/styles/github-dark.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.riannegreiros.dev/'),
  title: {
    default: 'Rian Negreiros Dos Santos',
    template: '%s | Rian Negreiros Dos Santos ',
  },
  description: 'Rian Negreiros Dos Santos blog and portfolio',
  authors: [{ name: 'Rian Negreiros Dos Santos' }],
  openGraph: {
    title: 'Rian Negreiros Dos Santos',
    description: 'Rian Negreiros Dos Santos blog and portfolio',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.riannegreiros.dev/',
    siteName: 'riannegreiros.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="max-w-4xl mx-auto px-4">{children}</main>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/Footer'
import { ThemeProvider } from './components/Providers'
import React from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: 'Rian Negreiros Dos Santos',
    template: '%s | Rian Negreiros Dos Santos',
  },
  description:
    'Bem-vindo ao site pessoal de Rian Negreiros dos Santos. Explore meu blog para obter insights e histórias, descubra meus projetos que mostram minhas habilidades e criatividade e veja meu currículo para saber mais sobre minha jornada profissional.',
  keywords: [
    'software engineer',
    'developer',
    'portfolio',
    'blog',
    'Rian Negreiros',
    'web development',
    'backend development',
  ],
  authors: [
    {
      name: 'Rian Negreiros Dos Santos',
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  ],
  creator: 'Rian Negreiros Dos Santos',
  publisher: 'Rian Negreiros Dos Santos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Rian Negreiros Dos Santos',
    description:
      'Bem-vindo ao site pessoal de Rian Negreiros dos Santos. Explore meu blog para obter insights e histórias, descubra meus projetos que mostram minhas habilidades e criatividade e veja meu currículo para saber mais sobre minha jornada profissional.',
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'riannegreiros.xyz',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Rian Negreiros Dos Santos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rian Negreiros Dos Santos',
    description: 'Personal website and portfolio of Rian Negreiros Dos Santos',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="max-w-7xl mx-auto px-4">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

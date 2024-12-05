import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'
import { Navbar } from './components/Navbar'
import 'highlight.js/styles/github-dark.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.riannegreiros.dev/'),
  title: {
    default: 'Rian Negreiros Dos Santos',
    template: '%s | Rian Negreiros Dos Santos ',
  },
  description:
    'Bem-vindo ao site pessoal de Rian Negreiros dos Santos. Explore meu blog para obter insights e histórias, descubra meus projetos que mostram minhas habilidades e criatividade e veja meu currículo para saber mais sobre minha jornada profissional.',
  authors: [{ name: 'Rian Negreiros Dos Santos' }],
  openGraph: {
    title: 'Rian Negreiros Dos Santos',
    description:
      'Bem-vindo ao site pessoal de Rian Negreiros dos Santos. Explore meu blog para obter insights e histórias, descubra meus projetos que mostram minhas habilidades e criatividade e veja meu currículo para saber mais sobre minha jornada profissional.',
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
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="max-w-4xl mx-auto px-4">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

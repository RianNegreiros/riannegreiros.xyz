import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Providers } from './components/Providers'
import { lazy, Suspense } from 'react'
import PageLoading from './components/PageLoading'

const TimelinePage = lazy(() => import('./pages/timeline'))
const Blog = lazy(() => import('./pages/blog'))
const BlogPost = lazy(() => import('./pages/blog/[slug]'))
const Projects = lazy(() => import('./pages/projects'))
const Resume = lazy(() => import('./pages/resume'))
const RssFeedPage = lazy(() => import('./pages/rss'))
const NotFound = lazy(() => import('./components/NotFound'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<TimelinePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/rss" element={<RssFeedPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>
    </Providers>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Blog from './pages/blog'
import Projects from './pages/projects'
import Resume from './pages/resume'
import TimelinePage from './pages/timeline'
import RssFeedPage from './pages/rss'
import NotFound from './components/NotFound'
import { Navbar } from './components/Navbar'
import { Providers } from './components/Providers'
import Footer from './components/Footer'
import BlogPost from './pages/blog/[slug]'

function App() {
  return (
    <Providers>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<TimelinePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/rss" element={<RssFeedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Providers>
  )
}

export default App

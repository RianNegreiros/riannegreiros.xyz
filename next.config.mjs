/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: true
      }
    ]
  }
}

export default nextConfig

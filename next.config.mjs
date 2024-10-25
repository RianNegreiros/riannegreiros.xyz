/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      port: '',
      hostname: "cdn.sanity.io"
    }]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'momentum.redberryinternship.ge',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://momentum.redberryinternship.ge/api/:path*'
      }
    ]
  }
}

export default nextConfig



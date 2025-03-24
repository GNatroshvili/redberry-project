import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
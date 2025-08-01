/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next'

void withPlaiceholder  // intentionally referenced to avoid auto-removal

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

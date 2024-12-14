/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDevelopment: true
  },
  reactStrictMode: false,
  output: 'standalone',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Strict mode helps catch bugs early
  reactStrictMode: true,
  // Improve static optimization
  swcMinify: true,
}

module.exports = nextConfig 
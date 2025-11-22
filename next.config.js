/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No longer need assetPrefix with subdomain approach
  images: {
    domains: ['support.matchmintfootballcards.com', 'help-center-app-three.vercel.app'],
    unoptimized: true,
  },
}

module.exports = nextConfig

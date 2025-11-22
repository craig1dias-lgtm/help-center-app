/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://help-center-app-three.vercel.app' : '',
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === 'production' ? 'https://help-center-app-three.vercel.app' : '',
  },
  images: {
    domains: ['help-center-app-three.vercel.app'],
    unoptimized: true,
  },
}

module.exports = nextConfig

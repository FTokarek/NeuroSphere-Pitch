/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.cosmos.so', 'assets.iceable.com', 'img.freepik.com'],
    unoptimized: true
  }
}

module.exports = nextConfig

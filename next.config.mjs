/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/vivek-portfolio" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/vivek-portfolio/" : "",
}

export default nextConfig

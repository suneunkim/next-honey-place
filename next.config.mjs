/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // 외부 도메인 추가
  },
}

export default nextConfig

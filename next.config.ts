import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    // dynamicIO: true,
  },
}

export default nextConfig

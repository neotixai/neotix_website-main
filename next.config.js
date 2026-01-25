/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  poweredByHeader: false,
  
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Cache plus agressif
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
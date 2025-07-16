/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  
  // Disable source maps in development for faster builds
  productionBrowserSourceMaps: false,
  
  // Optimize webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize for development speed
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
      
      // Reduce bundle size by excluding heavy modules in development
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };
      
      // Optimize chunking
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },

  // Simplified experimental features
  experimental: {
    optimizeCss: false, // Disable for faster dev builds
    turbo: false, // Disable turbo temporarily to fix issues
  },

  // Enable gzip compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60
  },

  // API rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/v1/:path*" // Proxy to Backend
      }
    ];
  },

  // Add headers for better caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

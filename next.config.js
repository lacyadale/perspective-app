/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  async rewrites() {
    return [
      // App-specific routes
      {
        source: '/adhd/:path*',
        destination: '/apps/adhd-tools/:path*',
      },
      {
        source: '/wheelmate/:path*',
        destination: '/apps/wheelmate/:path*',
      },
      {
        source: '/anxiety/:path*',
        destination: '/apps/anxiety-tracker/:path*',
      },
      {
        source: '/burnout/:path*',
        destination: '/apps/burnout-prevention/:path*',
      },
      // Dashboard routes
      {
        source: '/dashboard/:path*',
        destination: '/dashboard/pages/:path*',
      },
      // Keep existing routes working (backwards compatibility)
      {
        source: '/folders/:path*',
        destination: '/pages/folders/:path*',
      },
    ];
  },
  
  async redirects() {
    return [
      // Redirect old paths to new clean URLs
      {
        source: '/folders/adhd',
        destination: '/adhd',
        permanent: false,
      },
      {
        source: '/folders/anxiety',
        destination: '/anxiety',  
        permanent: false,
      },
      {
        source: '/folders/burnout',
        destination: '/burnout',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/product/:path*',
        destination: '/products/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

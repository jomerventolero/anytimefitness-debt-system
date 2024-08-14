// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  middleware: (config) => {
    config.matcher = ['/((?!api|_next/static|_next/image|.*\\.png$).*)'];
    return config;
  },
};

export default nextConfig;
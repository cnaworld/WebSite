/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If using src directory
  // pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'md', 'mdx'],
  // experimental: {
  //   appDir: true, // Already true by default in Next 13.4+
  // },
  images: {
    unoptimized: true // Useful for static exports if issues arise
  }
};
module.exports = nextConfig;

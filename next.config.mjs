/** @type {import('next').NextConfig} */
const isGh = process.env.GITHUB_PAGES === 'true';
const basePath = isGh ? '/smart-iphone' : '';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Garante que o build não falhe por type-check em produção
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

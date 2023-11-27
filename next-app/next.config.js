/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // potentially needed for docker
  output: 'standalone',
};

module.exports = nextConfig;

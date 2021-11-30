// // raw-loader complaing that webpack4 || webpack5 dependency missing
// use webpack5, read .md files with raw-loader
// silence sendgrid csr error arising from fs and path absence
module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

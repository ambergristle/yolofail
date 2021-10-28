// // raw-loader complaing that webpack4 || webpack5 dependency missing
// use webpack5, read .md files with raw-loader
module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

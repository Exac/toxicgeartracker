// babel.config.js, needed for Jest tests using TypeScript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: { esmodules: true },
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};

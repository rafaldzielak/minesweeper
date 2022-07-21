const { mergeConfig } = require("vite");
const { fileURLToPath } = require("url");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, options) {
    // Add your configuration here
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": "../src",
        },
      },
    });
    return config;
  },
};

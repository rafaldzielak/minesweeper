const { loadConfigFromFile } = require("vite");

const { mergeConfig } = require("vite");
const { fileURLToPath } = require("url");
const path = require("path");

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
    const { config: userConfig } = await loadConfigFromFile(path.resolve(__dirname, "../vite.config.ts"));

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
    });
    return config;
  },
};

import type { StorybookConfig } from "@storybook/vue3-vite"
import { mergeConfig } from "vite"
import * as path from "node:path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-bundler.js",
          "/~": path.resolve(__dirname, "../src/"),
        },
      },
      plugins: [
        // vue()
      ],
    })
  },
}
export default config

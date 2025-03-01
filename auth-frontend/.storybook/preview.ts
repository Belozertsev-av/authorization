import { h } from "vue"
import type { Preview } from "@storybook/vue3"
import { setup } from "@storybook/vue3"

import "../src/app/styles/index.scss"
import { Icons } from "../src/shared/assets"

setup((app) => {
  app.component("Icons", Icons)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
}

export const decorators = [
  (story) =>
    h(
      "div",
      {
        style: {
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        },
      },
      [h(story()), h(Icons)],
    ),
]

export default preview

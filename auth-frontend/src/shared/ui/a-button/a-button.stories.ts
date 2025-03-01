// a-button.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3"
import AButton from "./a-button.vue"

const meta: Meta<typeof AButton> = {
  title: "Components/AButton",
  component: AButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "text"],
    },
    spacing: {
      control: "select",
      options: ["min", "inherit"],
    },
    prependIcon: {
      control: "text",
    },
    appendIcon: {
      control: "text",
    },
  },
  args: {
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AButton>

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args }
    },
    template: '<AButton v-bind="args">Button</AButton>',
  }),
}

export const WithIcons: Story = {
  args: {
    prependIcon: "chevron-left",
    appendIcon: "check",
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args }
    },
    template: '<AButton v-bind="args">Button</AButton>',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { AButton },
    setup() {
      return { args }
    },
    template: '<AButton v-bind="args">Button</AButton>',
  }),
}

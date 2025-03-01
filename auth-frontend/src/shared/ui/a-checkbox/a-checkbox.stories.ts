// a-checkbox.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3"
import ACheckbox from "./a-checkbox.vue"

const meta: Meta<typeof ACheckbox> = {
  title: "Components/ACheckbox",
  component: ACheckbox,
  tags: ["autodocs"],
  argTypes: {
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
  },
  args: {
    name: "checkbox",
    label: "Checkbox",
  },
}

export default meta
type Story = StoryObj<typeof ACheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { ACheckbox },
    setup() {
      return { args }
    },
    template: '<ACheckbox v-bind="args" />',
  }),
}

export const LabelLeft: Story = {
  args: {
    labelPosition: "left",
  },
  render: (args) => ({
    components: { ACheckbox },
    setup() {
      return { args }
    },
    template: '<ACheckbox v-bind="args" />',
  }),
}

export const DisabledCheckbox: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { ACheckbox },
    setup() {
      return { args }
    },
    template: '<ACheckbox v-bind="args" />',
  }),
}

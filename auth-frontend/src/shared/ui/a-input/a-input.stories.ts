// a-input.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3"
import AInput from "./a-input.vue"

const meta: Meta<typeof AInput> = {
  title: "Components/AInput",
  component: AInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password"],
    },
  },
  args: {
    type: "text",
    label: "Input Label",
  },
}

export default meta
type Story = StoryObj<typeof AInput>

export const TextInput: Story = {}

export const PasswordInput: Story = {
  args: {
    type: "password",
  },
}

export const WithAutocomplete: Story = {
  args: {
    options: ["Apple", "Banana", "Cherry", "Date"],
  },
  render: (args) => ({
    components: { AInput },
    setup() {
      return { args }
    },
    template: '<AInput v-bind="args" />',
  }),
}

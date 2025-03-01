// a-icon-button.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3"
import AIconButton from "./a-icon-button.vue"

const meta: Meta<typeof AIconButton> = {
  title: "Components/AIconButton",
  component: AIconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "text"],
    },
    icon: {
      control: "text",
    },
  },
  args: {
    icon: "visibility",
  },
}

export default meta
type Story = StoryObj<typeof AIconButton>

export const FilledIcon: Story = {
  args: {
    variant: "filled",
  },
}

export const TextIcon: Story = {
  args: {
    variant: "text",
  },
}

export const DisabledIconButton: Story = {
  args: {
    disabled: true,
  },
}

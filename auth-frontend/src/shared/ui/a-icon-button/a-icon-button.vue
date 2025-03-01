<template>
  <button
    class="button"
    :disabled="disabled"
    :class="`button-${variant} ${disabled ? ' inactive' : ''}`"
  >
    <a-icon
      :size="iconSize"
      :icon="icon"
    />
  </button>
</template>

<script setup lang="ts">
import { IconName, Variant, AIcon } from "/~/shared/ui"

withDefaults(
  defineProps<{
    icon: IconName
    iconSize?: string
    variant?: Variant
    disabled?: boolean
  }>(),
  {
    variant: "filled",
    iconSize: "var(--fs-subtitle-large)",
    disabled: false,
  },
)
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  font-size: var(--fs-subtitle);
  border-radius: var(--b-radius-medium);
  transition: 0.2s;

  &-text:not(.inactive) {
    color: var(--c-font);
    background: none;

    &:hover {
      background-color: var(--c-hover);
    }

    &:active {
      color: var(--c-primary);
      background-color: var(--c-focus);
    }
  }

  &-filled:not(.inactive) {
    color: var(--c-font-on-primary);
    background-color: var(--c-primary);

    &:hover,
    &:active {
      background-color: var(--c-primary-hover);
    }
  }
}
</style>

<template>
  <button
    class="button"
    :disabled="disabled"
    :class="`button-${variant} spacing-${spacing} ${disabled ? ' inactive' : ''}`"
  >
    <span
      v-if="prependIcon"
      class="button__prepend-icon"
    >
      <a-icon
        :size="iconSize"
        :icon="prependIcon"
      />
    </span>
    <slot name="default" />
    <span
      v-if="appendIcon"
      class="button__append-icon"
    >
      <a-icon
        :size="iconSize"
        :icon="appendIcon"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { IconName, Spacing, Variant, AIcon } from "/~/shared/ui"

withDefaults(
  defineProps<{
    appendIcon?: IconName
    prependIcon?: IconName
    variant?: Variant
    iconSize?: string
    disabled?: boolean
    spacing?: Spacing
  }>(),
  {
    variant: "filled",
    iconSize: "var(--fs-subtitle-large)",
    disabled: false,
    spacing: "inherit",
  },
)
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-subtitle);
  border-radius: var(--b-radius-medium);
  transition: 0.2s;

  &__prepend-icon {
    margin-right: 0.5rem;
  }

  &__append-icon {
    margin-left: 0.5rem;
  }

  &-text:not(.inactive) {
    color: var(--c-font);
    background: none;

    &:active,
    &:focus {
      color: var(--c-primary);
      background-color: var(--c-focus);
    }

    &:hover:not(.inactive) {
      background-color: var(--c-hover);
    }
  }

  &-filled:not(.inactive) {
    color: var(--c-font-on-primary);
    background-color: var(--c-primary);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--c-primary-hover);
    }
  }
}

.spacing {
  &-min {
    width: fit-content;
    padding: 1rem;
  }

  &-inherit {
    width: 100%;
    padding: 1rem;
  }
}
</style>

<template>
  <div class="checkbox">
    <input
      :id="name"
      :name="name"
      class="checkbox__body"
      :value="modelValue"
      :checked="modelValue"
      type="checkbox"
      :disabled="disabled"
      @change="$emit('update:modelValue', !$event)"
    />
    <label
      :class="props.labelPosition"
      class="checkbox__label"
      :for="name"
    >
      <span v-if="label">{{ label }}</span>
      <span v-else><slot /></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    modelValue: boolean
    labelPosition?: "left" | "right"
    disabled?: boolean
    label?: string
  }>(),
  {
    labelPosition: "right",
    disabled: false,
  },
)

defineEmits<(event: "update:modelValue", value: boolean) => void>()
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;

  &__label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &::before {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
      content: "";
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
      border: 1px solid var(--c-secondary-outline);
      border-radius: var(--b-radius-small);
      transition: 0.2s;
    }

    &::after {
      position: absolute;
      top: -8px;
      right: auto;
      left: -8px;
      width: 40px;
      height: 40px;
      content: "";
      border-radius: var(--b-radius-medium);
      opacity: 0;
      transition: 0.2s;
    }
  }

  &__body {
    position: fixed;
    z-index: -1;
    opacity: 0;

    &:disabled {
      + .checkbox__label {
        color: var(--c-font-inactive);
        cursor: not-allowed;
        filter: grayscale(1);
      }

      + .checkbox__label::before {
        color: var(--c-font-inactive);
        background-color: var(--c-inactive);
      }
    }

    &:hover:not(:checked, :disabled) {
      + .checkbox__label::after {
        background-color: var(--c-focus);
        opacity: 0.08;
      }
    }

    &:active:not(:checked, :disabled) {
      + .checkbox__label::after {
        background-color: var(--c-primary);
        opacity: 0.12;
      }
    }
    /* stylelint-disable no-descending-specificity */
    &:checked {
      + .checkbox__label::before {
        background: var(--c-primary)
          url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'%3e%3cpath fill='%23fff' d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3e%3c/svg%3e")
          center/1.2rem no-repeat;
        border: none;
      }

      &:hover:not(:disabled) {
        + .checkbox__label::after {
          background-color: var(--c-primary-hover);
          opacity: 0.08;
        }
      }

      &:active:not(:disabled) {
        + .checkbox__label::after {
          background-color: var(--c-primary-hover);
          opacity: 0.12;
        }
      }
    }
    /* stylelint-enable no-descending-specificity */
  }
}

.left {
  flex-direction: row-reverse;

  &::before {
    margin-right: 0;
    margin-left: 0.5rem;
  }

  &::after {
    right: -8px;
    left: auto;
  }
}

.right {
  flex-direction: row;
}
</style>

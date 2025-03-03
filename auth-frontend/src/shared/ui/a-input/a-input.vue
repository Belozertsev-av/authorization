<template>
  <div class="input__wrapper">
    <div class="input__header">
      <div
        v-if="label"
        class="input__label"
      >
        {{ label }}
      </div>
      <div
        v-if="type === 'password'"
        class="input__icon"
      >
        <a-icon
          :icon="isVisible ? 'visibility-off' : 'visibility'"
          @click="isVisible = !isVisible"
        />
      </div>
    </div>
    <div
      ref="inputArea"
      class="input__body"
    >
      <input
        :value="modelValue"
        :type="inputType"
        class="input__input"
        @input="onInputHandler"
        @focusin="isMenuOpened = true"
        @focusout="isMenuOpened = false"
      />
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="options && isMenuOpened"
          class="input__popup custom-scroll"
          tabindex="0"
        >
          <ul class="input__options">
            <li
              v-for="option in filteredOptions"
              :key="option"
              class="input__option ellipsis"
              :title="option"
              @click="selectOption(option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputType, AIcon } from "/~/shared/ui"
import { computed, ref } from "vue"
import { debounce } from "/~/shared/utils"

const props = defineProps<{
  modelValue: string
  type: InputType
  label?: string
  options?: string[]
}>()

const emit = defineEmits<(e: "update:modelValue", modelValue: string) => void>()

const isMenuOpened = ref<boolean>(false)
const modelValue = computed(() => props.modelValue)
const filteredOptions = ref<string[] | undefined>(props.options)
const isVisible = ref<boolean>(false)
const inputArea = ref<HTMLElement | null>(null)

const inputType = computed(() => {
  if (props.type === "text") {
    return props.type
  } else {
    return isVisible.value ? "text" : "password"
  }
})

const selectOption = (option: string) => {
  emit("update:modelValue", option)

  isMenuOpened.value = false
}
const onInputHandler = debounce((event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit("update:modelValue", value)

  if (props.options) {
    if (modelValue.value) {
      filteredOptions.value = props.options.filter((option) => option.startsWith(value))
      isMenuOpened.value = filteredOptions.value.length !== 0
    } else {
      filteredOptions.value = props.options
    }
  }
}, 100)
</script>

<style lang="scss" scoped>
.input {
  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem 0.25rem;
    font-size: var(--fs-body);
    color: var(--c-font-label);
  }

  &__body {
    position: relative;
    width: 100%;
    color: var(--c-font);
    background: var(--c-secondary-background);
    border: 1px solid var(--c-secondary-outline);
    border-radius: var(--b-radius-medium);
    transition: 0.2s;

    &:focus,
    &:focus-within {
      border: 1px solid var(--c-primary-outline);
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-size: var(--fs-body);
    color: var(--c-font);
    background: none;
  }

  &__popup {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 3;
    width: 100%;
    height: 12rem;
    overflow-y: auto;
    color: var(--c-font);
    background-color: var(--c-secondary-background);
    border: 1px solid var(--c-primary-outline);
    border-radius: var(--b-radius-small);
  }

  &__options {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    overflow: hidden;
  }

  &__option {
    position: relative;
    padding: 0.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: var(--c-focus);
      border-radius: var(--b-radius-small);
    }
  }
}

/* Стили для фона автозаполнения */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background-color: transparent !important; /* Прозрачный фон */
  border: 1px solid var(--c-primary-outline);
  border-radius: var(--b-radius-small);
  box-shadow: 0 0 0 1000px var(--c-background) inset !important;
  transition: background-color 5000s ease-in-out 0s; /* Отключаем анимацию заливки */
  -webkit-text-fill-color: var(--c-font);
}
</style>

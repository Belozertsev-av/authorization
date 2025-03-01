<template>
  <svg
    :style="{
      width: size,
      height: size,
      display: inline ? 'inline-block' : 'block',
    }"
    class="icon"
  >
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "AIcon",
  inheritAttrs: true,
}
</script>

<script setup lang="ts">
type IconName = "chevron-left" | "check" | "add" | "visibility" | "visibility-off"

withDefaults(
  defineProps<{
    icon: IconName
    size?: string
    inline?: boolean
  }>(),
  {
    size: "var(--fs-subtitle-large)",
    inline: false,
  },
)
</script>

<style scoped>
.icon {
  line-height: 1;
  fill: currentcolor;
}
</style>

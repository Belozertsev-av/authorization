<template>
  <div class="add-card">
    <div class="add-card__icon">
      <a-icon
        icon="add"
        size="2rem"
      />
    </div>
    <span class="add-card__text">{{ t("addAccount") }}</span>
  </div>
</template>

<script setup lang="ts">
import { AIcon } from "/~/shared/ui"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.add-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  background-color: var(--c-card-background);
  border-radius: var(--b-radius-medium);
  transition: 0.2s;

  &:active {
    transform: scale(0.98);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    color: var(--c-font-label);
    background-color: var(--c-secondary-background);
    border-radius: 50%;
  }

  &__text {
    font-size: var(--fs-body);
    color: var(--c-font-label);
  }
}
</style>

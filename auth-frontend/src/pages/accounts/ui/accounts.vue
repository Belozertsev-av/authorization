<template>
  <div class="accounts">
    <div class="accounts__content">
      <div class="accounts__body">
        <div class="accounts__body-header">
          <div class="accounts__logo">
            <img
              src="/logo_inverse.webp"
              alt="logo"
            />
          </div>
          <div class="accounts__title">{{ t("loginToERP") }}</div>
          <div class="accounts__greetings">{{ t("greetings") }}</div>
        </div>
        <div class="accounts__body-profiles hidden-scroll">
          <add-account-card />
          <profile-card
            v-for="i in 2"
            :key="i"
          />
        </div>
      </div>
    </div>
    <div class="accounts__footer">
      <div class="circle circle-active" />
      <div class="circle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { AddAccountCard } from "/~/features/add-account"
import { ProfileCard } from "/~/features/sign-in-account"

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.accounts {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;

  &__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 725px;
    height: 100%;
    padding: 2rem;
    margin: 1rem 0;
    color: var(--c-font-on-primary);
    background: var(--card-gradient);
    border-radius: var(--b-radius-large);

    &-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      width: 100%;
    }

    &-profiles {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      width: 100%;
      max-width: 480px;
      height: 100%;
      overflow-y: auto;
    }
  }

  &__title {
    margin-bottom: 1rem;
    font-size: var(--fs-title);
    font-weight: bold;
  }

  &__greetings {
    margin-bottom: 2rem;
    font-size: var(--fs-title-large);
    font-weight: bold;
  }

  &__footer {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
}
</style>

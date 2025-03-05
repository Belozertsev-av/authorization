<template>
  <div class="accounts">
    <div class="accounts__header">
      <div class="accounts__logo">
        <img
          src="/logo_inverse.webp"
          alt="logo"
        />
      </div>
      <div class="accounts__title">{{ t("loginToERP") }}</div>
      <div class="accounts__greetings">{{ t("greetings") }}</div>
    </div>
    <div class="accounts__body hidden-scroll">
      <add-account-card @click="emit('addNewUser')" />
      <profile-card
        v-for="user in savedUsersStore.users"
        :key="`${user.tabel}_${user.login}`"
        :user-info="user"
        :card-opened="cardOpenedUser?.login === user.login && cardOpenedUser?.tabel === user.tabel"
        @open-card="cardOpenedUser !== $event ? (cardOpenedUser = $event) : (cardOpenedUser = null)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { ProfileCard } from "/~/features/sign-in-account"
import { AddAccountCard } from "/~/features/add-account"
import { UserInfo, useSavedUsersStore } from "/~/entities/users"
import { ref } from "vue"

const { t } = useI18n()
const savedUsersStore = useSavedUsersStore()
const emit = defineEmits<(e: "addNewUser") => void>()

const cardOpenedUser = ref<UserInfo | null>(null)
</script>

<style lang="scss" scoped>
.accounts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 725px;
  height: 100%;
  padding: 1.5rem;
  color: var(--c-font-on-primary);
  background: var(--card-gradient);
  border-radius: var(--b-radius-large);

  &__header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }

  &__logo {
    img {
      width: 3rem;
      height: 3rem;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
    max-width: 480px;
    height: 100%;
    overflow-y: auto;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: var(--fs-title);
    font-weight: bold;
  }

  &__greetings {
    margin-bottom: 1.5rem;
    font-size: var(--fs-title-large);
    font-weight: bold;
  }
}
</style>

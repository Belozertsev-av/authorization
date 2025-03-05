<template>
  <div class="login">
    <div class="login__header">
      <div class="login__header-left-block">
        <a-button
          v-if="isAddingNewUser && savedUsersStore.hasUserInfos"
          variant="text"
          prepend-icon="chevron-left"
          spacing="min"
          @click="isAddingNewUser = false"
        >
          {{ t("back") }}
        </a-button>
      </div>
      <div class="login__header-right-block">
        <img
          src="/logo.webp"
          alt="logo"
        />
      </div>
    </div>
    <div class="login__body">
      <login-form v-if="isAddingNewUser || !savedUsersStore.hasUserInfos" />
      <accounts
        v-else
        @add-new-user="isAddingNewUser = true"
      />
    </div>
    <div class="login__footer">
      <div
        v-if="savedUsersStore.hasUserInfos"
        class="login__circles"
      >
        <div
          class="login__circle"
          :class="{ 'circle-active': !isAddingNewUser }"
        />
        <div
          class="login__circle"
          :class="{ 'circle-active': isAddingNewUser }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AButton } from "/~/shared/ui"
import { useI18n } from "vue-i18n"
import { LoginForm } from "/~/widgets/login-form"
import { useSavedUsersStore } from "/~/entities/users"
import { ref } from "vue"
import { Accounts } from "/~/widgets/accounts"

const { t } = useI18n()
const savedUsersStore = useSavedUsersStore()

const isAddingNewUser = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 3rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(95% - 3rem);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5%;
  }

  &__circles {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  &__circle {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    background-color: var(--c-inactive);
    border-radius: 50%;
    transition: 0.2s;
  }
}

.circle-active {
  cursor: default;
  background-color: var(--c-primary);
}
</style>

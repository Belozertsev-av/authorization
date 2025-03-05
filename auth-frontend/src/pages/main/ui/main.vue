<template>
  <div class="main">
    <div class="main__text">Hello world!</div>
    <div class="main__login">{{ userStore.user?.login ?? "Unknown" }}</div>
    <div class="main__login">{{ userStore.user?.tabel ?? "Unknown" }}</div>
    <a-button @click="onClickHandler">{{ t("logOut") }}</a-button>
  </div>
</template>

<script setup lang="ts">
import { AButton } from "/~/shared/ui"
import { useI18n } from "vue-i18n"
import { useUserStore } from "/~/entities/users/model/store.ts"
import { useRouter } from "vue-router"
import { RouteName } from "/~/shared/utils"

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const onClickHandler = async () => {
  await userStore.logout()
  await router.push({ name: RouteName.Login })
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 460px;

  &__text {
    font-size: var(--fs-title);
  }
}
</style>

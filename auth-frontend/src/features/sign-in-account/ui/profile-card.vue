<template>
  <div class="profile">
    <div
      class="profile__header"
      @click="onOpenCard"
    >
      <div class="profile__avatar">
        <img
          src="/avatar.webp"
          alt="avatar"
        />
      </div>
      <div class="profile__data">
        <div class="profile__login">{{ userInfo.login }}</div>
        <div class="profile__tabel">{{ userInfo.tabel }}</div>
      </div>
    </div>
    <transition-group name="slide-fade">
      <div
        v-if="cardOpened"
        class="profile__divider"
      />
      <div
        v-if="cardOpened"
        class="profile__body"
      >
        <a-input
          v-model="password"
          type="password"
          :label="t('password')"
        />
        <a-button
          :disabled="!password.trim()"
          @click="login"
        >
          {{ t("logIn") }}
        </a-button>
        <div
          v-if="errorMessage"
          class="warning-card"
        >
          {{ t(errorMessage) }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { AButton, AInput } from "/~/shared/ui"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { getUserInfo, logIn, UserInfo, useUserStore } from "/~/entities/users"
import { RouteName } from "/~/shared/utils"
import { useRouter } from "vue-router"

const props = defineProps<{
  userInfo: UserInfo
  cardOpened: boolean
}>()
const emit = defineEmits<(e: "openCard", user: UserInfo) => void>()
const errorMessage = ref<string>("")

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const password = ref<string>("")

const login = async () => {
  if (!password.value.trim()) {
    return
  }
  try {
    const response = await logIn({
      tabel: props.userInfo.tabel,
      login: props.userInfo.login,
      password: password.value,
    })
    if (response) {
      localStorage.setItem("accessToken", response.accessToken)
      const user = await getUserInfo()
      userStore.setUser(user)

      await router.push({ name: RouteName.Main })
    }
  } catch (error) {
    console.error((error as Error).message)
    errorMessage.value = "errors.wrongPassword"
  }
}

const onOpenCard = () => {
  emit("openCard", props.userInfo)
  password.value = ""
  errorMessage.value = ""
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--c-card-background);
  border-radius: var(--b-radius-medium);
  transition: height 0.2s;

  &__header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    cursor: pointer;
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: flex-start;
  }

  &__avatar {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    margin: 0.75rem auto;
    background-color: var(--c-primary);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__login {
    font-size: var(--fs-body-large);
    color: var(--c-font);
  }

  &__tabel {
    font-size: var(--fs-body-large);
    color: var(--c-font-label);
  }
}
</style>

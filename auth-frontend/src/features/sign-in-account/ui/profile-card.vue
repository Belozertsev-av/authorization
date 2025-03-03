<template>
  <div class="profile">
    <div
      class="profile__header"
      @click="isOpened = !isOpened"
    >
      <div class="profile__avatar">
        <img
          src="/avatar.webp"
          alt="avatar"
        />
      </div>
      <div class="profile__data">
        <div class="profile__login">{{ form.login }}</div>
        <div class="profile__tabel">{{ form.tabel }}</div>
      </div>
    </div>
    <transition-group name="slide-fade">
      <div
        v-if="isOpened"
        class="profile__divider"
      />
      <div
        v-if="isOpened"
        class="profile__body"
      >
        <a-input
          v-model="form.password"
          type="password"
          :label="t('password')"
        />
        <a-button>{{ t("logIn") }}</a-button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { AButton, AInput } from "/~/shared/ui"
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const form = reactive({
  tabel: "06",
  login: "Иванов И.А",
  password: "",
  rememberAccount: false,
})

const isOpened = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: var(--c-card-background);
  border-radius: var(--b-radius-medium);
  transition: height 0.2s;

  &__header {
    display: flex;
    gap: 1rem;
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
    margin: 1rem auto;
    background-color: var(--c-primary);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

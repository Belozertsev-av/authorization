<template>
  <div class="login">
    <div class="login__header">
      <div class="login__header-left-block">
        <a-button
          variant="text"
          prepend-icon="chevron-left"
          spacing="min"
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
      <form class="login__form">
        <div class="login__title">{{ t("loginToERP") }}</div>
        <a-input
          v-model="form.tabel"
          type="text"
          :label="t('tabel')"
        />
        <a-input
          v-model="form.login"
          type="text"
          :label="t('login')"
        />
        <a-input
          v-model="form.password"
          type="password"
          :label="t('password')"
        />
        <a-checkbox
          v-model="form.rememberAccount"
          name="rememberAccount"
        >
          {{ t("rememberAccount") }}
        </a-checkbox>
        <a-button>{{ t("logIn") }}</a-button>
      </form>
    </div>
    <div class="login__footer">
      <div class="login__circle" />
      <div class="login__circle circle-active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AButton, ACheckbox, AInput } from "/~/shared/ui"
import { useI18n } from "vue-i18n"
import { reactive } from "vue"

const { t } = useI18n()

const form = reactive({
  tabel: "",
  login: "",
  password: "",
  rememberAccount: false,
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 460px;
  }

  &__title {
    font-size: var(--fs-title);
  }

  &__footer {
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
  }
}

.circle-active {
  cursor: default;
  background-color: var(--c-primary);
}
</style>

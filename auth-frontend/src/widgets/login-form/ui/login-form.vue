<template>
  <div class="login__form">
    <div class="login__title">{{ t("loginToERP") }}</div>
    <a-input
      v-model="formValues.tabel"
      type="number"
      :label="t('tabel')"
    />
    <a-input
      v-model="formValues.login"
      type="text"
      :label="t('login')"
    />
    <a-input
      v-model="formValues.password"
      type="password"
      :label="t('password')"
    />
    <a-checkbox
      v-model="formValues.rememberAccount"
      name="rememberAccount"
    >
      {{ t("rememberAccount") }}
    </a-checkbox>
    <a-button
      :disabled="!allFieldsEntered"
      @click="submitHandler"
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
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import { AButton, ACheckbox, AInput } from "/~/shared/ui"
import { getUserInfo, IUserForm, logIn, useUserStore, useSavedUsersStore } from "/~/entities/users"
import { useRouter } from "vue-router"
import { RouteName } from "/~/shared/utils"

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const savedUsersStore = useSavedUsersStore()
const errorMessage = ref<string>("")

const formValues = reactive<IUserForm>({
  tabel: 0,
  login: "",
  password: "",
  rememberAccount: true,
})

const allFieldsEntered = computed<boolean>(
  () => formValues.tabel !== 0 && !!formValues.login.trim() && !!formValues.password.trim(),
)

const submitHandler = async () => {
  if (!allFieldsEntered.value) {
    return
  }

  try {
    const response = await logIn({
      tabel: formValues.tabel,
      login: formValues.login,
      password: formValues.password,
    })

    if (response) {
      localStorage.setItem("accessToken", response.accessToken)
      const user = await getUserInfo()
      userStore.setUser(user)

      if (formValues.rememberAccount) {
        savedUsersStore.saveUserInfo({
          tabel: formValues.tabel,
          login: formValues.login,
        })
      }

      await router.push({ name: RouteName.Main })
    }
  } catch (error) {
    console.error((error as Error).message)
    errorMessage.value = "errors.wrongCredentials"
  }
}
</script>

<style lang="scss" scoped>
.login {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 460px;
  }

  &__title {
    padding-bottom: 0.5rem;
    font-size: var(--fs-title);
  }
}
</style>

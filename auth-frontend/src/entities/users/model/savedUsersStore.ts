import { computed, ref } from "vue"
import { UserInfo } from "/~/entities/users"
import { defineStore } from "pinia"

export const useSavedUsersStore = defineStore("SavedUsers", () => {
  const users = ref<UserInfo[]>([])

  const hasUserInfos = computed(() => users.value.length > 0)

  const saveUserInfo = (incomingUserInfo: UserInfo) => {
    if (!users.value.some((it) => it.login === incomingUserInfo.login)) {
      users.value.push(incomingUserInfo)
    }
  }

  const deleteUserInfo = (incomingUserInfo: UserInfo) => {
    const userFoundIndex = users.value.findIndex(
      (it) => it.tabel == incomingUserInfo.tabel && it.login == incomingUserInfo.login,
    )
    if (userFoundIndex) {
      users.value.splice(userFoundIndex, 1)
    }
  }

  return {
    users,
    hasUserInfos,
    saveUserInfo,
    deleteUserInfo,
  }
})

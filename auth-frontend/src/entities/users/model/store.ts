import { ref } from "vue"
import { IUserResponse, logOut } from "/~/entities/users"
import { defineStore } from "pinia"

export const useUserStore = defineStore("User", () => {
  const user = ref<IUserResponse | null>()

  const setUser = (incomingUser: IUserResponse) => (user.value = incomingUser)

  const logout = async () => {
    user.value = null
    await logOut()
    localStorage.removeItem("accessToken")
  }

  return {
    user,
    setUser,
    logout,
  }
})

import axios from "axios"
import { getEnvVar, RouteName } from "/~/shared/utils"
import { router } from "/~/app/providers/router"

export const axiosInstance = axios.create({
  baseURL: getEnvVar("VITE_BASE_API_URL"),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Интерцептор для добавления Bearer токена в заголовки
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Интерцептор для обработки ошибок и обновления токена
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если ошибка 401 и это не запрос на обновление токена
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Запрос на обновление токена
        const response = await axios.post("/auth/refresh", {}, { withCredentials: true })
        const { accessToken } = response.data

        // Сохраняем новый accessToken в localStorage
        localStorage.setItem("accessToken", accessToken)

        // Повторяем оригинальный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Если не удалось обновить токен, перенаправляем на страницу логина
        localStorage.removeItem("accessToken")

        await router.push({ name: RouteName.Login })

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance

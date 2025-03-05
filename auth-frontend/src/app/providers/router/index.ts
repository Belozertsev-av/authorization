import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { RouteName } from "/~/shared/utils"

const Login = () => import("/~/pages/login/ui/login.vue")
const Main = () => import("/~/pages/main/ui/main.vue")

export type RouteInfo = RouteRecordRaw & {
  name?: RouteName
  meta: {
    requiresAuth: boolean
  }
}

export const routes: Array<RouteInfo> = [
  {
    path: "/",
    name: RouteName.Login,
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/main",
    name: RouteName.Main,
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
]

export const history = createWebHistory()
export const router = createRouter({
  history,
  routes,
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken")

  if (to.name == RouteName.Login && accessToken) {
    next("/main")
  } else if (to.meta.requiresAuth && !accessToken) {
    next("/")
  } else {
    next()
  }
})

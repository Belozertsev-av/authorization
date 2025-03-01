import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const Login = () => import("/~/pages/login/ui/login.vue")
const Main = () => import("/~/pages/main/ui/main.vue")

export type RouteName = "login" | "main"

enum Role {
  User = "USER",
  Admin = "ADMIN",
}

export type RouteInfo = RouteRecordRaw & {
  name?: RouteName
  meta: {
    requiresAnyOfRoles: Role[]
  }
}

export const routes: Array<RouteInfo> = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { requiresAnyOfRoles: [] },
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    meta: { requiresAnyOfRoles: [Role.User, Role.Admin] },
  },
]

export const history = createWebHistory()
export const router = createRouter({
  history,
  routes,
})

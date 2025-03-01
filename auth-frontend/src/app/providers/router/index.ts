import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const Login = () => import("/~/pages/login/ui/login.vue")
const Accounts = () => import("/~/pages/accounts/ui/accounts.vue")

export enum RouteName {
  Login = "login",
  Accounts = "accounts",
}

export enum Role {
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
    name: RouteName.Login,
    component: Login,
    meta: { requiresAnyOfRoles: [] },
  },
  {
    path: "/accounts",
    name: RouteName.Accounts,
    component: Accounts,
    meta: { requiresAnyOfRoles: [Role.User, Role.Admin] },
  },
]

export const history = createWebHistory()
export const router = createRouter({
  history,
  routes,
})

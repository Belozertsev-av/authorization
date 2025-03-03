import { createApp } from "vue"
import App from "./app.vue"

import "./styles/index.scss"

import { createPinia } from "pinia"
import { router } from "/~/app/providers/router"
import { i18n } from "/~/shared/lib"

export const app = createApp(App).use(router).use(createPinia()).use(i18n)

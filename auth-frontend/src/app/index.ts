import { createApp } from "vue"
import App from "./app.vue"

import "./styles/index.scss"

import { router } from "/~/app/providers/router"
import { pinia } from "/~/app/providers/pinia"
import { i18n } from "/~/shared/lib"

export const app = createApp(App).use(pinia).use(router).use(i18n)

import { createApp } from "vue"
import App from "./app.vue"

import "./styles/index.scss"

import { createPinia } from "pinia"
import { router } from "/~/app/providers/router"

export const app = createApp(App).use(router).use(createPinia())

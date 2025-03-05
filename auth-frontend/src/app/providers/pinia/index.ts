import { createPinia } from "pinia"
import { piniaPersistPlugin } from "/~/shared/lib"

const pinia = createPinia()

pinia.use(piniaPersistPlugin)

export { pinia }

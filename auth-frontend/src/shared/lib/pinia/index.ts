import { PiniaPluginContext } from "pinia"

export function piniaPersistPlugin(context: PiniaPluginContext) {
  const { store } = context

  const savedState = localStorage.getItem(store.$id)
  if (savedState) {
    store.$patch(JSON.parse(savedState))
  }

  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}

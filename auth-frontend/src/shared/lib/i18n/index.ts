import { createI18n } from "vue-i18n"
import { glossary } from "./glossary.ts"

export enum AppLocales {
  RU = "ru",
  EN = "en",
}

export const i18n = createI18n({
  locale: AppLocales.RU,
  fallbackLocale: AppLocales.EN,
  messages: glossary,
})

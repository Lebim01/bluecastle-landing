// i18n/client.ts
'use client'

import i18next, { i18n as I18nType } from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  es: { translation: { hello: 'Hola mundo' } },
  en: { translation: { hello: 'Hello world' } },
}

let i18nClient: I18nType | null = null
let initialized = false

export function getI18nClient() {
  if (i18nClient) return i18nClient

  i18nClient = i18next.createInstance()
  if (!initialized) {
    i18nClient
      .use(initReactI18next)
      .init({
        resources,
        lng: 'es',            // valor inicial seguro
        fallbackLng: 'es',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      })
    initialized = true
  }
  return i18nClient
}

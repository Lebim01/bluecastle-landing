"use client"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./translations/en.json"
import es from "./translations/es.json"
import pt from "./translations/pt.json"

const resources = {
  en: { ns1: en },
  es: { ns1: es },
  pt: { ns1: pt },
}

// 1) Crea detector y registra un detector de "path"
const lngDetector = new LanguageDetector()

lngDetector.addDetector({
  // DEBE llamarse 'path' para que lo tome detection.order = ["path", ...]
  name: "path",
  lookup: () => {
    if (typeof window !== "undefined") {
      const first = window.location.pathname.split("/")[1] // es | en | pt
      if (["es", "en", "pt"].includes(first)) return first
    }
    return undefined
  },
  cacheUserLanguage: () => { },
})

// 2) Evita múltiples inits en cliente
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(lngDetector)
    .init({
      resources,
      ns: ["ns1"],
      defaultNS: "ns1",

      supportedLngs: ["es", "en", "pt"],
      fallbackLng: "es",

      detection: {
        // el orden ahora sí ejecuta tu detector 'path'
        order: ["path", "localStorage", "navigator", "htmlTag"],
        // si usaras el detector 'path' integrado, puedes configurar:
        // lookupFromPathIndex: 0,
        lookupLocalStorage: "i18nextLng",
        caches: ["localStorage"],
      },

      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })
}

export default i18n

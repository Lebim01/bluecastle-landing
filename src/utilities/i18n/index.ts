"use client"
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import en from "./translations/en.json";
import es from "./translations/es.json";
import pt from "./translations/pt.json"
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    ns1: en,
  },
  es: {
    ns1: es,
  },
  pt: {
    ns1: pt,
  }
};

i18n.use(initReactI18next).init({
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"],
  },
  supportedLngs: ["es", "en", "pt"],
  ns: ["ns1"],
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

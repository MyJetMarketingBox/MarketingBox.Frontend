import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationGr from "./locales/gr/translation.json";
import translationIT from "./locales/it/translation.json";
import translationRS from "./locales/rs/translation.json";
import translationSP from "./locales/sp/translation.json";
import translationENG from "./locales/eng/translation.json";

// the translations
const resources: any = {
  gr: {
    translation: translationGr,
  },
  it: {
    translation: translationIT,
  },
  ru: {
    translation: translationRS,
  },
  sp: {
    translation: translationSP,
  },
  en: {
    translation: translationENG,
  },
};

const language: any = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

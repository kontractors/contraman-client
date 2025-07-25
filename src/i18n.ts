import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./assets/locales/en.json";
import fr from "./assets/locales/fr.json";
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLngs = ['en', 'fr'];
const resources = {
    en: {translation: en},
    fr: {translation: fr}
};

i18n.use(LanguageDetector).use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: 'en',
        debug: true,
        supportedLngs,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
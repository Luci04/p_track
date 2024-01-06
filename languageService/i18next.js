import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import pt from '../locales/pt.json'
import fr from '../locales/fr.json'
import ar from '../locales/ar.json'
import am from '../locales/am.json'

import { retrieveValue } from '../src/Utilities/AsyncStorageFunction';


export const languageResources = {
    en: { translation: en },
    pt: { translation: pt },
    ar: { translation: ar },
    fr: { translation: fr },
    am: { translation: am }
}


i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'en',
        fallbackLng: 'en',
        resources: languageResources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
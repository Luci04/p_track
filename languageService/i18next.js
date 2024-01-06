import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import es from '../locales/es.json';
// import fr from '../locales/fr.json';
// import de from '../locales/de.json';
// import it from '../locales/it.json';
// import ru from '../locales/ru.json';
// import pt from '../locales/pt.json';
// import tr from '../locales/tr.json';
// import zh from '../locales/zh.json';
// import ar from '../locales/ar.json';
// import ja from '../locales/ja.json';
// import ko from '../locales/ko.json';
// import he from '../locales/he.json';
// import hi from '../locales/hi.json';



export const languageResources = {
    en: { translation: en },
    es: { translation: es },
    // fr: { translation: fr },
    // de: { translation: de },
    // it: { translation: it },
    // ru: { translation: ru },
    // pt: { translation: pt },
    // tr: { translation: tr },
    // zh: { translation: zh },
    // ar: { translation: ar },
    // ja: { translation: ja },
    // ko: { translation: ko },
    // he: { translation: he },
    // hi: { translation: hi }
};


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
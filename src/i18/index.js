import { createI18n } from 'vue-i18n';
import { LANGUAGE_DEFAULT } from '@/configs/site';
import twLocale from './resources/zh-TW.json';
import jpLocale from './resources/ja-JP.json';
import Cookies from 'js-cookie';

const messages = {
  'zh-TW': {
    ...twLocale,
  },
  'ja-JP': {
    ...jpLocale,
  },
};

export const getLanguage = () => {
  let language = Cookies.get('language');
  if (!language) {
    language = LANGUAGE_DEFAULT;
    Cookies.set('language', LANGUAGE_DEFAULT);
  }
  return language;
};

export const seti18nLanguage = (language) => {
  i18n.locale = language;
};

const i18n = new createI18n({
  locale: getLanguage(),
  messages,
  fallbackLocale: 'zh-TW',
});

export default i18n;

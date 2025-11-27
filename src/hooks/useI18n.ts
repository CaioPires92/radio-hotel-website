import { useI18nContext } from '@/components/i18n/I18nProvider';
import { locales, languageNames, languageFlags } from '@/lib/i18n';

export const useI18n = () => {
  return useI18nContext();
};

export const useLocales = () => {
  return locales.map(code => ({
    code,
    name: languageNames[code],
    flag: languageFlags[code],
  }));
};

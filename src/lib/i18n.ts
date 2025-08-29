// Internationalization configuration

export const defaultLocale = 'pt-BR';
export const locales = ['pt-BR', 'en-US', 'es-ES'] as const;

export type Locale = typeof locales[number];

// Language names for display
export const languageNames: Record<Locale, string> = {
  'pt-BR': 'Português',
  'en-US': 'English',
  'es-ES': 'Español',
};

// Language flags/icons
export const languageFlags: Record<Locale, string> = {
  'pt-BR': '🇧🇷',
  'en-US': '🇺🇸',
  'es-ES': '🇪🇸',
};

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1] as Locale;
  
  if (locales.includes(potentialLocale)) {
    return potentialLocale;
  }
  
  return defaultLocale;
}

// Remove locale from pathname
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const potentialLocale = segments[1] as Locale;
  
  if (locales.includes(potentialLocale)) {
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
}

// Add locale to pathname
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPathname = removeLocaleFromPathname(pathname);
  
  if (locale === defaultLocale) {
    return cleanPathname || '/';
  }
  
  return `/${locale}${cleanPathname}`;
}

// Get alternate URLs for SEO
export function getAlternateUrls(pathname: string, baseUrl: string): Record<Locale, string> {
  const cleanPathname = removeLocaleFromPathname(pathname);
  
  return locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}${addLocaleToPathname(cleanPathname, locale)}`;
    return acc;
  }, {} as Record<Locale, string>);
}

// Detect user's preferred locale
export function detectUserLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }
  
  // Check localStorage first
  const savedLocale = localStorage.getItem('preferred-locale') as Locale;
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale;
  }
  
  // Check browser language
  const browserLanguage = navigator.language;
  
  // Exact match
  if (locales.includes(browserLanguage as Locale)) {
    return browserLanguage as Locale;
  }
  
  // Partial match (e.g., 'en' matches 'en-US')
  const languageCode = browserLanguage.split('-')[0];
  const matchingLocale = locales.find(locale => locale.startsWith(languageCode));
  
  if (matchingLocale) {
    return matchingLocale;
  }
  
  return defaultLocale;
}

// Save user's locale preference
export function saveLocalePreference(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-locale', locale);
  }
}

// Format currency based on locale
export function formatCurrency(amount: number, locale: Locale): string {
  const currencyMap: Record<Locale, string> = {
    'pt-BR': 'BRL',
    'en-US': 'USD',
    'es-ES': 'EUR',
  };
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyMap[locale],
  }).format(amount);
}

// Format date based on locale
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format phone number based on locale
export function formatPhoneNumber(phone: string, locale: Locale): string {
  // Simple formatting - in a real app, you'd use a proper phone formatting library
  switch (locale) {
    case 'pt-BR':
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    case 'en-US':
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    case 'es-ES':
      return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    default:
      return phone;
  }
}

// Get direction for locale (for RTL languages)
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  // All our supported locales are LTR
  // Add RTL locales here if needed (ar, he, fa, etc.)
  return 'ltr';
}

// Get locale-specific meta tags
export function getLocaleMeta(locale: Locale) {
  return {
    htmlLang: locale,
    ogLocale: locale,
    alternateLocales: locales.filter(l => l !== locale),
  };
}
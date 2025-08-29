'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale, defaultLocale, locales, getLocaleFromUrl, saveLocalePreference, getDictionary } from '@/lib/i18n';

type Dictionary = Record<string, any>;

export function useI18n(initialLocale?: Locale) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return initialLocale || defaultLocale;
    }
    
    // Try to get locale from URL first
    const urlLocale = getLocaleFromUrl();
    if (urlLocale) {
      return urlLocale;
    }
    
    // Then try localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      return savedLocale;
    }
    
    // Finally, try browser language
    const browserLocale = navigator.language;
    const matchedLocale = locales.find(l => 
      browserLocale.startsWith(l.split('-')[0])
    );
    
    return matchedLocale || defaultLocale;
  });
  
  const [dictionary, setDictionary] = useState<Dictionary>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Load dictionary when locale changes
  useEffect(() => {
    let isMounted = true;
    
    const loadDictionary = async () => {
      try {
        setIsLoading(true);
        const dict = await getDictionary(locale);
        
        if (isMounted) {
          setDictionary(dict);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadDictionary();
    
    return () => {
      isMounted = false;
    };
  }, [locale]);
  
  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      saveLocalePreference(newLocale);
      
      // Update URL without page reload
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';
        const newPath = newLocale === defaultLocale 
          ? pathWithoutLocale 
          : `/${newLocale}${pathWithoutLocale}`;
        
        window.history.replaceState({}, '', newPath);
      }
    }
  }, []);
  
  // Translation function with nested key support
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    if (isLoading || !dictionary) {
      return key;
    }
    
    // Support nested keys like 'navigation.home'
    const keys = key.split('.');
    let value: any = dictionary;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }
    
    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  }, [dictionary, isLoading]);
  
  // Format functions that use the current locale
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }, [locale]);
  
  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(date);
  }, [locale]);
  
  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(number);
  }, [locale]);
  
  return {
    locale,
    setLocale,
    t,
    dictionary,
    isLoading,
    formatCurrency,
    formatDate,
    formatNumber,
    // Utility functions
    isRTL: locale === 'ar' || locale === 'he', // Add RTL languages if needed
    locales,
    defaultLocale
  };
}

// Hook for getting available locales with their display names
export function useLocales() {
  return locales.map(locale => ({
    code: locale,
    name: getLocaleName(locale),
    flag: getLocaleFlag(locale)
  }));
}

// Helper functions
function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    'pt-BR': 'Português',
    'en-US': 'English',
    'es-ES': 'Español'
  };
  return names[locale] || locale;
}

function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    'pt-BR': '🇧🇷',
    'en-US': '🇺🇸',
    'es-ES': '🇪🇸'
  };
  return flags[locale] || '🌐';
}
'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import ptBR from '@/dictionaries/pt-BR.json';
import enUS from '@/dictionaries/en-US.json';
import esES from '@/dictionaries/es-ES.json';

const LOCALE_MAP = {
  'pt-BR': ptBR as unknown as Record<string, unknown>,
  'en-US': enUS as unknown as Record<string, unknown>,
  'es-ES': esES as unknown as Record<string, unknown>,
} as const;
import { Locale } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dictionary: Record<string, unknown>;
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  isRTL: boolean;
  locales: Locale[];
  defaultLocale: Locale;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  initialDictionary?: Record<string, unknown>;
}

export function I18nProvider({ children, initialLocale, initialDictionary }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale || 'pt-BR');
  const [isLoading, setIsLoading] = useState(false);
  const [dictionary, setDictionary] = useState<Record<string, unknown>>(
    initialDictionary || LOCALE_MAP[(initialLocale || 'pt-BR') as keyof typeof LOCALE_MAP]
  );

  useEffect(() => {
    setIsLoading(true);
    setDictionary(LOCALE_MAP[(locale as keyof typeof LOCALE_MAP)] || LOCALE_MAP['pt-BR']);
    setIsLoading(false);
  }, [locale]);
  
  // Translation function that uses loaded dictionary
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value: unknown = dictionary;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };
  
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(number);
  };
  
  const i18nValue: I18nContextType = {
    locale,
    setLocale,
    t,
    dictionary,
    isLoading,
    formatCurrency,
    formatDate,
    formatNumber,
    isRTL: false,
    locales: ['pt-BR', 'en-US'] as Locale[],
    defaultLocale: 'pt-BR' as Locale
  };
  
  // Set document language and direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = 'ltr';
    }
  }, [locale]);
  
  return (
    <I18nContext.Provider value={i18nValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
}

// Convenience hook for translation only
export function useTranslation() {
  const { t, isLoading } = useI18nContext();
  return { t, isLoading };
}

// Hook for formatting functions
export function useFormatting() {
  const { formatCurrency, formatDate, formatNumber, locale } = useI18nContext();
  return { formatCurrency, formatDate, formatNumber, locale };
}

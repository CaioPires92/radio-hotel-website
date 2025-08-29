'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { Locale } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dictionary: Record<string, any>;
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
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const i18n = useI18n(initialLocale);
  
  // Set document language and direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = i18n.locale;
      document.documentElement.dir = i18n.isRTL ? 'rtl' : 'ltr';
    }
  }, [i18n.locale, i18n.isRTL]);
  
  return (
    <I18nContext.Provider value={i18n}>
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
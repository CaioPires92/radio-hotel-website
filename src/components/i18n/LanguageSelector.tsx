'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useI18n, useLocales } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'compact' | 'icon-only';
  showFlag?: boolean;
  showText?: boolean;
  isScrolled?: boolean;
}

export function LanguageSelector({ 
  className,
  variant = 'default',
  showFlag = true,
  showText = true,
  isScrolled = false
}: LanguageSelectorProps) {
  const { locale, setLocale, t } = useI18n();
  const locales = useLocales();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLocale = locales.find(l => l.code === locale);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as any);
    setIsOpen(false);
  };
  
  const buttonContent = () => {
    if (variant === 'icon-only') {
      return (
        <>
          <GlobeAltIcon className="h-5 w-5" />
          <span className="sr-only">{t('navigation.language')}</span>
        </>
      );
    }
    
    return (
      <>
        {showFlag && currentLocale && (
          <span className="text-lg" role="img" aria-label={currentLocale.name}>
            {currentLocale.flag}
          </span>
        )}
        {showText && (
          <span className={cn(
            "font-medium",
            variant === 'compact' && "text-sm"
          )}>
            {variant === 'compact' ? locale.split('-')[0].toUpperCase() : currentLocale?.name}
          </span>
        )}
        <ChevronDownIcon 
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </>
    );
  };
  
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none",
          isScrolled 
            ? "border border-navy text-navy hover:bg-navy/10"
            : "text-white hover:bg-gold/10",
          variant === 'compact' && "px-2 py-1 text-sm",
          variant === 'icon-only' && "p-2"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('navigation.language')}
      >
        {buttonContent()}
      </button>
      
      {isOpen && (
        <div className={cn(
          "absolute top-full mt-1 py-1 bg-white dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "rounded-lg shadow-lg z-50 min-w-full",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}>
          {locales.map((localeOption) => (
            <button
              key={localeOption.code}
              onClick={() => handleLocaleChange(localeOption.code)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "transition-colors duration-200",
                "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
                locale === localeOption.code && "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
              )}
              role="option"
              aria-selected={locale === localeOption.code}
            >
              <span className="text-lg" role="img" aria-label={localeOption.name}>
                {localeOption.flag}
              </span>
              <span className="font-medium">
                {localeOption.name}
              </span>
              {locale === localeOption.code && (
                <span className="ml-auto text-primary-600 dark:text-primary-400">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Compact version for mobile/header use
export function CompactLanguageSelector(props: Omit<LanguageSelectorProps, 'variant'>) {
  return <LanguageSelector {...props} variant="compact" />;
}

// Icon-only version for minimal UI
export function IconLanguageSelector(props: Omit<LanguageSelectorProps, 'variant'>) {
  return <LanguageSelector {...props} variant="icon-only" showFlag={false} showText={false} />;
}
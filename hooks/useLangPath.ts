'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import type { Locale } from '@/lib/i18n-config';

export function useLangPath() {
  const { language } = useLanguage();
  const safeLang: Locale = language || 'en';
  
  const langPath = (path: string) => {
    // If path already starts with a language prefix, return as-is
    if (path.startsWith('/en') || path.startsWith('/fr')) {
      return path;
    }
    // Add language prefix
    return `/${safeLang}${path}`;
  };
  
  return { langPath, language: safeLang };
}
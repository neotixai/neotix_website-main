'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export function useLangPath() {
  const { language } = useLanguage();
  const safeLang = language || 'en';

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

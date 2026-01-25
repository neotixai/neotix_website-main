'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { messages, DEFAULT_LANG } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n-config';

export function useT() {
  const { language } = useLanguage();
  const safeLang: Locale = language || DEFAULT_LANG;
  
  // Ensure we always return a valid translation object
  const translations = messages[safeLang] || messages[DEFAULT_LANG];
  
  return { 
    t: translations, 
    language: safeLang 
  };
}
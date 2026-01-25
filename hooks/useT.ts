'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { messages, DEFAULT_LANG } from '@/lib/i18n';

export function useT() {
  const { language } = useLanguage();
  const safeLang = language || DEFAULT_LANG;
  
  // Ensure we always return a valid translation object
  const translations = messages[safeLang] || messages[DEFAULT_LANG];
  
  return { 
    t: translations, 
    language: safeLang 
  };
}
'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { messages, DEFAULT_LANG } from '@/lib/i18n';

export function useT() {
  const { language } = useLanguage();
  const safeLang = language || DEFAULT_LANG;
  return { t: messages[safeLang], language: safeLang };
}

'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { messages } from '@/lib/i18n';

export function useT() {
  const { language } = useLanguage();
  return { t: messages[language] };
}
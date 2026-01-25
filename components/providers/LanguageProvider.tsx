'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n-config';

const LanguageContext = createContext<{
  language: Locale;
}>({
  language: 'en',
});

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Locale;
}) {
  return (
    <LanguageContext.Provider value={{ language: initialLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

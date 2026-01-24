'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Lang = 'en' | 'fr';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const nextLang: Lang = useMemo(
    () => (language === 'en' ? 'fr' : 'en'),
    [language]
  );

  const onToggle = () => {
    setLanguage(nextLang);
  };

  return (
    <button
      onClick={onToggle}
      className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 transition"
      aria-label="Toggle language EN/FR"
      title={language === 'en' ? 'Passer en français' : 'Switch to English'}
    >
      {nextLang.toUpperCase()}
    </button>
  );
}
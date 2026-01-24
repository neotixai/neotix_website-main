'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Lang = 'en' | 'fr';

function setGoogleTranslateLang(lang: Lang) {
  const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
  if (!select) return false;

  if (select.value === lang) return true;
  select.value = lang;
  select.dispatchEvent(new Event('change'));
  return true;
}

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [gtReady, setGtReady] = useState(false);

  // attendre que google injecte le select
  useEffect(() => {
    const t = setInterval(() => {
      const ok = !!document.querySelector('select.goog-te-combo');
      if (ok) {
        setGtReady(true);
        clearInterval(t);
      }
    }, 200);
    return () => clearInterval(t);
  }, []);

  const nextLang: Lang = useMemo(() => (language === 'en' ? 'fr' : 'en'), [language]);

  const onToggle = () => {
    // 1) Navbar + tes labels propres
    setLanguage(nextLang);

    // 2) Page entière via Google Translate
    // (si pas prêt, on change quand même la navbar)
    if (gtReady) setGoogleTranslateLang(nextLang);
  };

  return (
    <button
      onClick={onToggle}
      className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 transition"
      aria-label="Toggle language EN/FR"
      title={language === 'en' ? 'Traduire en français' : 'Switch to English'}
    >
      {language.toUpperCase()}
    </button>
  );
}
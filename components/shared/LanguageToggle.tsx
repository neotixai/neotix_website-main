'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LanguageToggle() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const nextLang = language === 'en' ? 'fr' : 'en';

  // Replace the current language prefix with the new one
  const newPath = pathname.replace(/^\/(en|fr)/, `/${nextLang}`);

  return (
    <Link
      href={newPath}
      className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 transition"
      aria-label="Toggle language EN/FR"
      title={language === 'en' ? 'Passer en français' : 'Switch to English'}
    >
      {nextLang.toUpperCase()}
    </Link>
  );
}

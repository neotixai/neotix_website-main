'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LanguageToggle from '@/components/shared/LanguageToggle';
import { useT } from '@/hooks/useT';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { t } = useT();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/what-we-offer', label: t.nav.offer },
    { href: '/demos', label: t.nav.demos },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const ctaLabel = t.nav.cta;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
  <div className="relative h-20 w-56">
    <Image
      src="/integrations/neotix.svg"
      alt="Neotix AI"
      fill
      priority
      className="object-contain dark:hidden"
    />
    <Image
      src="/integrations/neotix.svg"
      alt="Neotix AI"
      fill
      priority
      className="hidden dark:block object-contain"
    />
  </div>
</Link>


          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-gray-900 dark:hover:text-white ${
                  pathname === link.href ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-4 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-blue-500 hover:opacity-90 transition"
            >
              {ctaLabel}
            </Link>

            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white ${
                  pathname === link.href ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-blue-500 hover:opacity-90 transition"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
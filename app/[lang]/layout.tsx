import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { locales, type Locale } from '@/lib/i18n-config';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    en: 'Neotix AI - Next-Gen AI Solutions',
    fr: 'Neotix AI - Solutions IA nouvelle génération',
  };

  const descriptions = {
    en: 'We build AI assistants, intelligent workflows, and creative AI products that scale your business.',
    fr: 'Nous créons des assistants IA, des workflows intelligents et des produits IA créatifs pour faire grandir votre entreprise.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider initialLang={lang}>
            <Navbar />
            <main className="min-h-screen transition-opacity duration-200">{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeroSection from '@/components/home/HeroSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import ProcessSection from '@/components/home/ProcessSection';
import IntegrationSection from '@/components/home/IntegrationSection';
import ContactSection from '@/components/home/ContactSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neotix AI - Next-Gen AI Solutions for Business Automation',
  description: 'We build AI assistants, intelligent workflows, and creative AI products that scale your business.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      fr: '/fr',
    },
  },
};

export default function RootHomePage() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider initialLang="en">
            <Navbar />
            <main className="min-h-screen">
              <HeroSection />
              <IntegrationSection />
              <SolutionsSection />
              <ProcessSection />
              <ContactSection />
            </main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

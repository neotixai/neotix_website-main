import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neotix AI - Next-Gen AI Solutions',
  description: 'We build AI assistants, intelligent workflows, and creative AI products that scale your business.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
          `}
        </Script>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" style={{ display: 'none' }} />
        
        <Script id="gt-banner-killer" strategy="afterInteractive">
          {`
            (function () {
              const reset = () => {
                // Remove banner if present
                const f1 = document.querySelector('iframe.goog-te-banner-frame');
                if (f1) f1.style.display = 'none';

                // Google sometimes injects a banner div too
                const banners = document.querySelectorAll('.goog-te-banner-frame, .goog-te-banner');
                banners.forEach(b => (b.style.display = 'none'));

                // Hard reset layout shift (Google sets body{top:40px} inline)
                document.documentElement.style.setProperty('top', '0px', 'important');
                document.body.style.setProperty('top', '0px', 'important');
                document.body.style.setProperty('margin-top', '0px', 'important');
                document.body.style.setProperty('position', 'static', 'important');

                // Remove skiptranslate class which can affect layout
                document.documentElement.classList.remove('skiptranslate');
                document.body.classList.remove('skiptranslate');
              };

              // Run often for a bit (Google re-applies after translation)
              reset();
              const interval = setInterval(reset, 50);
              setTimeout(() => clearInterval(interval), 12000);

              // Also after user interactions (translate triggers async changes)
              window.addEventListener('click', () => {
                reset();
                const burst = setInterval(reset, 50);
                setTimeout(() => clearInterval(burst), 2000);
              }, true);

              // Mutation observer as backup
              const obs = new MutationObserver(reset);
              obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
              setTimeout(() => obs.disconnect(), 20000);
            })();
          `}
        </Script>



        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

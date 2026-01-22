import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { siX, siFacebook } from 'simple-icons';

function SocialIcon({ icon, href, label }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group transition-transform duration-200 hover:scale-110"
    >
      <div
        className="w-5 h-5 text-gray-700 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
        dangerouslySetInnerHTML={{
          __html: icon.svg.replace(
            '<svg',
            `<svg fill="currentColor"`
          ),
        }}
      />
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              Neotix AI
            </h3>
            <p className="text-sm text-gray-700 dark:text-white/60">
              Next-Gen AI Solutions for your business automation and growth.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/what-we-offer" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">What We Offer</Link></li>
              <li><Link href="/demos" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">Demos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4">

              {/* X - Simple Icons */}
              <SocialIcon
                icon={siX}
                href="https://twitter.com/neotix-ai"
                label="X"
              />

              {/* LinkedIn - Lucide (ancienne version) */}
              <a
                href="https://www.linkedin.com/company/neotix-ai/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              {/* Facebook - Simple Icons */}
              <SocialIcon
                icon={siFacebook}
                href="https://facebook.com/neotix-ai"
                label="Facebook"
              />

            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 text-center">
          <p className="text-sm text-gray-700 dark:text-white/60">
            &copy; {currentYear} Neotix AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';
import { Twitter, Instagram, Send } from 'lucide-react';

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
              <li>
                <Link href="/" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-assistants" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                  AI Assistants
                </Link>
              </li>
              <li>
                <Link href="/automation" className="text-sm text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Automation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
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

'use client';

import { motion } from 'framer-motion';
import GradientButton from '@/components/shared/GradientButton';
import { useT } from '@/hooks/useT';

import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const { t } = useT();
  const router = useRouter()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full glass-card ring-1 ring-black/15 dark:ring-white/10 text-sm font-medium gradient-text">
              {t.home.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            {t.home.titlePrefix}{' '}
            <span className="gradient-text">{t.home.titleAccent}</span>
          </h1>

          <p className="text-xl text-gray-800 dark:text-white/60 mb-10 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton onClick={() => scrollToSection('contact')}>
              {t.home.primary}
            </GradientButton>

            <GradientButton
              variant="secondary"
              className="ring-1 ring-black/15 dark:ring-white/10"
              onClick={() => router.push('/what-we-offer')}
            >
              {t.home.secondary}
            </GradientButton>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-violet-500 to-blue-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  );
}

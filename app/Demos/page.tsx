'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { PhoneCall, Volume2, CalendarCheck } from 'lucide-react';
import AudioDemoPlayer from '@/components/shared/AudioDemoPlayer';
import { useT } from '@/hooks/useT';

export default function DemosPage() {
  const { t } = useT();

  const audioDemos = [
    { ...t.demosPage.audioDemos[0], src: '/audio/Barbershop.m4a', lang: 'fr' },
    { ...t.demosPage.audioDemos[1], src: '/audio/Restaurant.m4a', lang: 'en' },
    { ...t.demosPage.audioDemos[2], src: '/audio/Dental.m4a', lang: 'en' },
    { ...t.demosPage.audioDemos[3], src: '/audio/Fitness.m4a', lang: 'fr' },
  ];

  const frDemos = audioDemos.filter(d => d.lang === 'fr');
  const enDemos = audioDemos.filter(d => d.lang === 'en');

  const featuresIcons = [PhoneCall, Volume2, CalendarCheck];

  return (
    <>
      {/* HERO */}
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t.demosPage.hero.titlePrefix}</span>{' '}
            {t.demosPage.hero.titleSuffix}
          </h1>

          <p className="text-xl dark:text-white/60 mb-12">
            {t.demosPage.hero.subtitle}
          </p>

          <GradientButton href="/contact" className="w-2/5">
            {t.demosPage.hero.cta}
          </GradientButton>
        </motion.div>
      </Section>

      {/* FEATURES */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.demosPage.features.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.features.titleAccent}
            </span>
          </h2>

          <p className="text-xl dark:text-white/60 max-w-2xl mx-auto">
            {t.demosPage.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.demosPage.features.items.map((feature, index) => {
            const Icon = featuresIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="dark:text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* TRY IT */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
            {t.demosPage.try.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.try.titleAccent}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* FR */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-center">Français</h3>
              <div className="w-full max-w-2xl">
                <AudioDemoPlayer demos={frDemos} />
              </div>
            </div>

            {/* EN */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-center">English</h3>
              <div className="w-full max-w-2xl">
                <AudioDemoPlayer demos={enDemos} />
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t.demosPage.faq.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.faq.titleAccent}
            </span>
          </h2>

          <FAQAccordion
            items={t.demosPage.faq.items.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
          />
        </motion.div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12 ring-1 ring-black/12 dark:ring-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.demosPage.finalCta.title}
          </h2>

          <p className="text-xl dark:text-white/60 mb-8">
            {t.demosPage.finalCta.subtitle}
          </p>

          <GradientButton href="/contact">
            {t.demosPage.finalCta.button}
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import { Target, Users, Zap } from 'lucide-react';
import { useT } from '@/hooks/useT';

const valueIcons = [Target, Users, Zap];

export default function AboutPage() {
  const { t } = useT();

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.aboutPage.hero.titlePrefix}{' '}
            <span className="gradient-text">{t.aboutPage.hero.titleAccent}</span>
          </h1>

          <p className="text-xl text-gray-800 dark:text-white/60 mb-12">
            {t.aboutPage.hero.subtitle}
          </p>
        </motion.div>
      </Section>

      {/* WHO WE ARE + WHY */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {t.aboutPage.who.title}
            </h2>

            <p className="text-gray-800 dark:text-white/60 mb-4">
              {t.aboutPage.who.p1}
            </p>

            <p className="text-gray-800 dark:text-white/60 mb-4">
              {t.aboutPage.who.p2}
            </p>

            <p className="text-gray-800 dark:text-white/60">
              {t.aboutPage.who.p3}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 ring-1 ring-black/12 dark:ring-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {t.aboutPage.why.title}
            </h3>

            <ul className="space-y-4">
              {t.aboutPage.why.items.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mt-2" />
                  <span className="dark:text-white/60">{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.aboutPage.values.titlePrefix}{' '}
            <span className="gradient-text">{t.aboutPage.values.titleAccent}</span>
          </h2>

          <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto">
            {t.aboutPage.values.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.aboutPage.values.items.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-800 dark:text-white/60">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.aboutPage.finalCta.title}
          </h2>

          <p className="text-xl text-gray-800 dark:text-white/60 mb-8">
            {t.aboutPage.finalCta.subtitle}
          </p>

          <GradientButton href="/contact" className="w-1/3">
            {t.aboutPage.finalCta.button}
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}
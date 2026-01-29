'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { Workflow, Mail, Database, MessageSquare, Phone, Calendar } from 'lucide-react';
import { useT } from '@/hooks/useT';

const solutionIcons = [Workflow, Mail, Database, MessageSquare, Phone, Calendar] as const;

export default function AutomationAIPage() {
  const { t } = useT();

  const solutions = t.offerPage.solutions.items.map((item, idx) => ({
    icon: solutionIcons[idx],
    title: item.title,
    description: item.description,
  }));

  const faqs = t.offerPage.faq.items.map((it) => ({
    question: it.q,
    answer: it.a,
  }));

  return (
    <div className="relative overflow-hidden">
      {/* 
        ✨ DÉGRADÉS SERVICES PAGE ✨
        Motif: Vagues fluides - évoque l'automatisation et le flux de travail
      */}
      
      {/* Dégradé Hero - Haut gauche, vague douce */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-18rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-violet-500 to-blue-500 opacity-30 sm:left-[calc(50%-35rem)] sm:w-[73rem]" />
      </div>

      {/* Dégradé Solutions Grid - Droite, vague montante */}
      <div className="absolute inset-x-0 top-[42rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+12rem)] aspect-[1155/678] w-[44rem] translate-x-1/4 rotate-[-42deg] bg-gradient-to-bl from-blue-500 via-indigo-500 to-violet-500 opacity-30 sm:left-[calc(50%+28rem)] sm:w-[80rem]" />
      </div>

      {/* Dégradé Blocks - Gauche, vague descendante */}
      <div className="absolute inset-x-0 top-[108rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-22rem)] aspect-[1155/678] w-[40rem] -translate-x-1/4 rotate-[35deg] bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 opacity-20 sm:left-[calc(50%-42rem)] sm:w-[76rem]" />
      </div>

      {/* Dégradé FAQ - Centre-droite, vague finale */}
      <div className="absolute inset-x-0 bottom-5 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[37rem] translate-x-1/6 rotate-[-28deg] bg-gradient-to-tl from-blue-500 to-violet-500 opacity-25 sm:left-[calc(50%+15rem)] sm:w-[71rem]" />
      </div>

      {/* HERO */}
      <Section className="pt-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t.offerPage.hero.titlePrefix}</span>{' '}
            {t.offerPage.hero.titleSuffix}
          </h1>

          <p className="text-xl dark:text-white/60 mb-12">{t.offerPage.hero.subtitle}</p>

          <GradientButton href="/contact" className="w-full sm:w-2/5">
            {t.offerPage.hero.cta}
          </GradientButton>
        </motion.div>
      </Section>

      {/* SOLUTIONS GRID */}
      <Section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.offerPage.solutions.titlePrefix}{' '}
            <span className="gradient-text">{t.offerPage.solutions.titleAccent}</span>
          </h2>

          <p className="text-xl dark:text-white/60 max-w-2xl mx-auto">
            {t.offerPage.solutions.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-xl p-6 ring-1 ring-black/12 dark:ring-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="dark:text-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AUTOMATION BLOCK */}
      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.offerPage.blocks.leftTitle}</h2>
            <p className="dark:text-white/60 mb-4">{t.offerPage.blocks.leftP1}</p>
            <p className="dark:text-white/60">{t.offerPage.blocks.leftP2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 ring-1 ring-black/12 dark:ring-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">{t.offerPage.blocks.rightTitle}</h3>
            <p className="dark:text-white/60 mb-4">{t.offerPage.blocks.rightP1}</p>
            <p className="dark:text-white/60">{t.offerPage.blocks.rightP2}</p>
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t.offerPage.faq.titlePrefix}{' '}
            <span className="gradient-text">{t.offerPage.faq.titleAccent}</span>
          </h2>

          <FAQAccordion items={faqs} />
        </motion.div>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12 ring-1 ring-black/12 dark:ring-white/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t.offerPage.finalCta.titlePrefix}{' '}
            <span className="gradient-text">{t.offerPage.finalCta.titleAccent}</span>{' '}
            {t.offerPage.finalCta.titleSuffix}
          </h2>

          <p className="text-xl dark:text-white/60 mb-8">{t.offerPage.finalCta.subtitle}</p>

          <div className="flex justify-center">
            <GradientButton href="/contact" className="w-full sm:w-1/2">
              {t.offerPage.finalCta.button}
            </GradientButton>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

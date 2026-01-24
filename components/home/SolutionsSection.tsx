'use client';

import Section from '@/components/shared/Section';
import FeatureCard from '@/components/shared/FeatureCard';
import { Bot, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const solutionIcons = [Bot, Zap, Globe] as const;

export default function SolutionsSection() {
  const { t } = useT();

  const solutions = t.solutions.items.map((it, i) => ({
    icon: solutionIcons[i],
    title: it.title,
    description: it.description,
  }));

  return (
    <Section id="solutions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {t.solutions.titlePrefix}{' '}
          <span className="gradient-text">{t.solutions.titleAccent}</span>
        </h2>
        <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto">
          {t.solutions.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution, index) => (
          <FeatureCard
            key={index}
            icon={solution.icon}
            title={solution.title}
            description={solution.description}
            delay={index * 0.1}
          />
        ))}
      </div>
    </Section>
  );
}

'use client';

import Section from '@/components/shared/Section';
import FeatureCard from '@/components/shared/FeatureCard';
import { Bot, Zap, Palette, Globe, TrendingUp, Plug } from 'lucide-react';
import { motion } from 'framer-motion';

const solutions = [
  {
    icon: Bot,
    title: 'AI Assistants',
    description: 'Custom chat/voice assistants for support, sales, and booking flows'
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Make/N8N workflows, CRM sync, email/SMS, lead routing'
  },
  {
    icon: Globe,
    title: 'Web & App Development',
    description: 'Modern landing pages, dashboards, integrations'
  },
];

export default function SolutionsSection() {
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
          Our <span className="gradient-text">Solutions</span>
        </h2>
        <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto">
          Comprehensive AI-powered services to transform your business operations
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

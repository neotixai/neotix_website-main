'use client';

import Section from '@/components/shared/Section';
import { Search, Wrench, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We analyze your needs and design the perfect AI solution'
  },
  {
    icon: Wrench,
    title: 'Build',
    description: 'Our team develops and integrates your custom AI systems'
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy, optimize, and scale with ongoing support'
  }
];

export default function ProcessSection() {
  return (
    <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Our <span className="gradient-text">Process</span>
        </h2>
        <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto">
          From concept to launch in three streamlined steps
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
              <step.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
            <p className="text-gray-800 dark:text-white/60">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

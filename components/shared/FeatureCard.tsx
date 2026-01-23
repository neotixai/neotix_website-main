'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-800 dark:text-white/60">
        {description}
      </p>
    </motion.div>
  );
}
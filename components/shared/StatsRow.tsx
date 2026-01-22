'use client';

import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl font-bold gradient-text mb-2">
            {stat.value}
          </div>
          <div className="text-gray-700 dark:text-white/60">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

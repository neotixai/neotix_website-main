'use client';

import Section from '@/components/shared/Section';
import { motion } from 'framer-motion';

const logos = [
  'Company A',
  'Company B',
  'Company C',
  'Company D',
  'Company E'
];

export default function TrustSection() {
  return (
    <Section className="bg-gradient-to-b from-violet-500/5 to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-700 dark:text-white/60 mb-8">Trusted by</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-lg p-6 text-center"
            >
              <span className="text-gray-700 dark:text-white/50 font-semibold">{logo}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

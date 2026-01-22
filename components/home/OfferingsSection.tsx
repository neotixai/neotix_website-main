'use client';

import Section from '@/components/shared/Section';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const offerings = [
  {
    title: 'Starter',
    description: 'Launch an AI assistant in days',
    features: [
      'Single AI assistant',
      'Basic integrations',
      'Email support',
      '30-day support'
    ]
  },
  {
    title: 'Scale',
    description: 'Automate operations end-to-end',
    features: [
      'Multiple AI assistants',
      'Advanced workflows',
      'Priority support',
      'Custom integrations'
    ],
    featured: true
  },
  {
    title: 'Enterprise',
    description: 'Custom platform + security + SLA',
    features: [
      'Unlimited AI solutions',
      'Dedicated team',
      '24/7 support',
      'Custom SLA'
    ]
  }
];

export default function OfferingsSection() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Our <span className="gradient-text">Offerings</span>
        </h2>
        <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto mb-4">
          Choose the package that fits your needs
        </p>
        <p className="text-sm text-gray-700 dark:text-white/50">
          Packages are indicative — we tailor scopes to your needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offerings.map((offering, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-card rounded-2xl p-8 ${
              offering.featured ? 'ring-2 ring-violet-500 relative' : ''
            }`}
          >
            {offering.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-xs font-semibold text-white">
                  POPULAR
                </span>
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{offering.title}</h3>
            <p className="text-gray-800 dark:text-white/60 mb-6">{offering.description}</p>

            <ul className="space-y-3">
              {offering.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 dark:text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

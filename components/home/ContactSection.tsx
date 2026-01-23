'use client';

import Section from '@/components/shared/Section';
import ContactForm from '@/components/shared/ContactForm';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <Section id="contact" className="bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Let's Build Something <span className="gradient-text">Smart</span>
          </h2>
          <p className="text-xl text-gray-800 dark:text-white/60">
            Ready to transform your business with AI? Get in touch and let's discuss your project.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
          <ContactForm />
        </div>
      </motion.div>
    </Section>
  );
}

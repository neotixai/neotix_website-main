'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import { Target, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe AI should empower businesses, not complicate them. Our mission is to make advanced AI accessible and practical.'
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Your success is our success. We work closely with you to understand your needs and deliver solutions that exceed expectations.'
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We stay at the cutting edge of AI technology to bring you the most effective and efficient solutions available.'
  }
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="gradient-text">Neotix AI</span>
          </h1>
          <p className="text-xl text-gray-800 dark:text-white/60 mb-12">
            We're a team of AI specialists, developers, and strategists dedicated to transforming businesses through intelligent automation.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Who We Are
            </h2>
            <p className="text-gray-800 dark:text-white/60 mb-4">
              Founded by entrepreneurs who experienced firsthand the challenges of scaling operations, Neotix AI was born from a simple vision: make AI work for everyone.
            </p>
            <p className="text-gray-800 dark:text-white/60 mb-4">
              We help businesses automate their workflows, enhance customer experiences, and unlock new growth opportunities through custom AI solutions.
            </p>
            <p className="text-gray-800 dark:text-white/60">
              From startups to enterprises, we tailor our approach to meet you where you are and take you where you want to go.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mt-2" />
                <span className="text-gray-300">End-to-end support from discovery to deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mt-2" />
                <span className="text-gray-300">Custom solutions tailored to your unique needs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mt-2" />
                <span className="text-gray-300">Transparent pricing and clear timelines</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-xl text-gray-800 dark:text-white/60 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
              <p className="text-gray-800 dark:text-white/60">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-800 dark:text-white/60 mb-8">
            Let's discuss how Neotix AI can help you achieve your goals with intelligent automation.
          </p>
          <GradientButton href="/contact" className="w-1/3">
                      Get in Touch
                    </GradientButton>  
        </motion.div>
      </Section>
    </>
  );
}
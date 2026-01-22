'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { MessageSquare, Phone, Calendar } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Chat Assistants',
    description: 'Deploy intelligent chatbots for customer support, lead qualification, and sales assistance'
  },
  {
    icon: Phone,
    title: 'Voice AI',
    description: 'Build voice-enabled assistants for phone support, appointment scheduling, and more'
  },
  {
    icon: Calendar,
    title: 'Booking Flows',
    description: 'Automate appointment scheduling and calendar management with smart AI agents'
  }
];

const faqs = [
  {
    question: 'How long does it take to deploy an AI assistant?',
    answer: 'Depending on complexity, most AI assistants can be deployed within 2-4 weeks. Simple chatbots can be ready in just a few days.'
  },
  {
    question: 'Can the AI assistant integrate with our existing tools?',
    answer: 'Yes! We integrate with popular platforms like CRM systems, calendars, payment processors, and communication tools like Slack and WhatsApp.'
  },
  {
    question: 'What languages do your AI assistants support?',
    answer: 'Our AI assistants support multiple languages and can be configured to handle conversations in any language your business requires.'
  }
];

export default function AIAssistantsPage() {
  return (
    <>
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">AI Assistants</span> for Every Need
          </h1>
          <p className="text-xl text-white/60 mb-12">
            Custom chat and voice assistants that handle support, sales, and booking flows with human-like intelligence.
          </p>
          <GradientButton href="/contact">
            Build Your Assistant
          </GradientButton>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Comprehensive AI assistant solutions tailored to your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Intelligent Conversations at Scale
            </h2>
            <p className="text-white/60 mb-4">
              Our AI assistants don't just answer questions—they understand context, learn from interactions, and provide personalized experiences that delight your customers.
            </p>
            <p className="text-white/60 mb-4">
              Whether you need 24/7 customer support, automated lead qualification, or seamless booking management, our AI assistants work tirelessly to serve your business.
            </p>
            <p className="text-white/60">
              Fully customizable to match your brand voice and business requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Reduce support costs by up to 70%</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Respond to customers instantly, 24/7</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Scale without adding headcount</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Capture and qualify leads automatically</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <FAQAccordion items={faqs} />
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Your AI Assistant?
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Let's build an intelligent assistant that transforms your customer experience.
          </p>
          <GradientButton href="/contact">
            Get Started Today
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

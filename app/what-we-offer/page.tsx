'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import {
  Workflow,
  Mail,
  Database,
  MessageSquare,
  Phone,
  Calendar
} from 'lucide-react';

const solutions = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Build sophisticated Make/N8N workflows that connect your tools and automate repetitive tasks'
  },
  {
    icon: Mail,
    title: 'Communication Automation',
    description:
      'Automate email sequences, SMS campaigns, and notifications triggered by customer actions'
  },
  {
    icon: Database,
    title: 'Data Integration',
    description:
      'Sync your CRM, databases, and spreadsheets automatically with real-time data flows'
  },
  {
    icon: MessageSquare,
    title: 'Chat Assistants',
    description:
      'Deploy intelligent chatbots for customer support, lead qualification, and sales assistance'
  },
  {
    icon: Phone,
    title: 'Voice AI',
    description:
      'Build voice-enabled assistants for phone support and appointment scheduling'
  },
  {
    icon: Calendar,
    title: 'Booking Automation',
    description:
      'Automate appointment scheduling and calendar management with smart AI agents'
  }
];

const faqs = [
  {
    question: 'What platforms do you integrate with?',
    answer:
      'We integrate with Make, N8N, Google Workspace, Microsoft 365, Salesforce, HubSpot, Slack, Acuity, Cal, CRMs and hundreds more via APIs.'
  },
  {
    question: 'How long does deployment take?',
    answer:
      'Simple automations or chatbots can be deployed in a few days. More complex AI assistants typically take 2–4 weeks.'
  },
  {
    question: 'Is everything secure?',
    answer:
      'Yes. We use encrypted connections, secure authentication, and enterprise-grade best practices to protect your data.'
  },
  {
    question: 'Can this work with our current processes?',
    answer:
      'Absolutely. We analyze your existing workflows and design automation and AI systems that fit seamlessly into your operations.'
  }
];

export default function AutomationAIPage() {
  return (
    <>
      {/* HERO */}
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Automation & AI</span> That Scale Your Business
          </h1>
          <p className="text-xl dark:text-white/60 mb-12">
            Intelligent workflows, AI assistants, and smart automation systems
            that eliminate busywork and elevate your customer experience.
          </p>
        
          <GradientButton
              href="/contact"
              className="w-2/5"
            >
              Transform Your Operations
            </GradientButton>
        </motion.div>
      </Section>

      {/* SOLUTIONS GRID */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl dark:text-white/60 max-w-2xl mx-auto">
            End-to-end automation and AI systems built for modern businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="dark:text-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AUTOMATION BLOCK */}
      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              From Chaos to Clarity
            </h2>
            <p className="dark:text-white/60 mb-4">
              Stop wasting hours on repetitive tasks. We design intelligent
              workflows that trigger automatically based on actions, time,
              or specific business conditions.
            </p>
            <p className="dark:text-white/60">
              Lead routing, invoice generation, CRM sync, notifications —
              everything runs automatically behind the scenes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">AI Assistants That Work 24/7</h3>
            <p className="dark:text-white/60 mb-4">
              Our AI assistants handle customer support, sales conversations,
              and booking flows with human-like intelligence.
            </p>
            <p className="dark:text-white/60">
              Available 24/7, multilingual, and fully integrated with your
              tools — without adding headcount.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FAQ */}
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

      {/* FINAL CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Ready to <span className="gradient-text">scale</span> with Automation & AI?
          </h2>
          <p className="text-xl dark:text-white/60 mb-8">
            Let’s eliminate the busywork and build intelligent systems that grow your business.
          </p>
          <div className="flex justify-center">
            <GradientButton
              href="/contact"
              className="w-1/2"
            >
              Get Started Today
            </GradientButton>
          </div>
        </motion.div>
      </Section>
    </>
  );
}

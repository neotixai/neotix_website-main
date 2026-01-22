'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { Workflow, Mail, Database } from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Build sophisticated Make/Zapier workflows that connect your tools and automate repetitive tasks'
  },
  {
    icon: Mail,
    title: 'Communication Automation',
    description: 'Automate email sequences, SMS campaigns, and notifications triggered by customer actions'
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Sync your CRM, databases, and spreadsheets automatically with real-time data flows'
  }
];

const faqs = [
  {
    question: 'What platforms do you integrate with?',
    answer: 'We work with all major platforms including Make, Zapier, Google Workspace, Microsoft 365, Salesforce, HubSpot, Slack, and hundreds more through APIs.'
  },
  {
    question: 'How secure is automation?',
    answer: 'We follow enterprise-grade security practices, use encrypted connections, and implement proper access controls to keep your data safe.'
  },
  {
    question: 'Can you automate our existing processes?',
    answer: 'Absolutely! We analyze your current workflows and design automation solutions that fit seamlessly into your existing operations.'
  }
];

export default function AutomationPage() {
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
            <span className="gradient-text">Business Automation</span> That Works
          </h1>
          <p className="text-xl text-white/60 mb-12">
            Connect your tools, eliminate manual work, and scale your operations with intelligent workflow automation.
          </p>
          <GradientButton href="/contact">
            Automate Your Business
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
            Automation <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            End-to-end automation services for modern businesses
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
              From Chaos to Clarity
            </h2>
            <p className="text-white/60 mb-4">
              Stop losing hours to manual data entry, repetitive emails, and disconnected tools. Our automation solutions bring order to your operations.
            </p>
            <p className="text-white/60 mb-4">
              We design workflows that trigger automatically based on customer actions, scheduled times, or specific conditions—ensuring nothing falls through the cracks.
            </p>
            <p className="text-white/60">
              Whether it's lead routing, invoice generation, or complex multi-step processes, we make it happen automatically.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">What You Get</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Save 10-20 hours per week per employee</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Eliminate human error in data handling</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Instant notifications and alerts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                <span className="text-white/80">Real-time data sync across all tools</span>
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
            Common <span className="gradient-text">Questions</span>
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
            Ready to Automate Your Operations?
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Let's eliminate the busywork and focus on what matters: growing your business.
          </p>
          <GradientButton href="/contact">
            Start Automating
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

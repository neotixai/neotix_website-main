'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { Workflow, Mail, Database } from 'lucide-react';
import AudioDemoPlayer from '@/components/shared/AudioDemoPlayer';

const audioDemos = [
  {
    title: 'AI restaurant Agent',
    description: 'Inbound call handling and qualification',
    src: '/audio/demo-sales-call.mp3'
  },
  {
    title: 'AI dental Agent',
    description: 'Automated patient follow-up summary',
    src: '/audio/demo-medical-call.mp3'
  },
  {
    title: 'AI barbershop Agent',
    description: 'Issue resolution and escalation',
    src: '/audio/demo-support-call.mp3'
  }
];

const features = [
  {
    icon: Workflow,
    title: 'Never Miss a Call',
    description: "Your AI receptionist answers 100% of incoming calls, 24/7, even outside business hours. Don't forget, 1 missed call <=> 1 less customer"
  },
  {
    icon: Mail,
    title: 'Human-Like Voice',
    description: 'Natural, expressive voice that sounds like a real receptionist, not a robot'
  },
  {
    icon: Database,
    title: 'Appointment Booking & Lead Capture',
    description: 'Books, cancel, reschedule appointments, captures leads, and syncs everything to your tools automatically'
  }
];

const faqs = [
  {
    question: 'What platforms do you integrate with?',
    answer: 'We integrate with all major platforms and custom systems. Our solutions are designed to adapt to your existing tools, processes, and infrastructure'
  },
  {
    question: 'Can the AI receptionist handle multiple calls at the same time?',
    answer: 'Yes. The AI receptionist can handle multiple calls simultaneously with no wait time, ensuring every caller is answered instantly, even during peak hours'
  },
  {
    question: 'Can the AI receptionist speak multiple languages?',
    answer: "Yes. The AI receptionist can speak multiple languages and automatically adapt to your customer's preferred language."
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
          <p className="text-xl dark:text-white/60 mb-12">
            Connect your tools, optimize manual work, and scale your operations with intelligent workflow automation.
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
          <p className="text-xl dark:text-white/60 max-w-2xl mx-auto">
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
              <p className="dark:text-white/60">{feature.description}</p>
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
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Try it <span className="gradient-text">Yourself</span>
          </h2>
          <p className="text-xl dark:text-white/60 text-center mb-12">
            Listen to real AI voice agents in action.
          </p>

          <AudioDemoPlayer demos={audioDemos} />
        </motion.div>
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
          <p className="text-xl dark:text-white/60 mb-8">
            Let’s optimize your business, whatever your industry, and free up time for what really matters.
          </p>
          <GradientButton href="/contact">
            Start Automating
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

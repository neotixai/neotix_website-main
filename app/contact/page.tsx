'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import ContactForm from '@/components/shared/ContactForm';
import GradientButton from '@/components/shared/GradientButton';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function ContactPage() {
  const handleRequestCall = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      const messageField = document.getElementById('message') as HTMLTextAreaElement;
      if (messageField) {
        messageField.value = 'I would like to request a call to discuss my project.';
      }
    }
  };

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
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl dark:text-white/60 mb-12">
            Ready to transform your business with AI? Let's discuss your project and explore how we can help.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <a href="mailto:contact@neotix.ai" className="dark:text-white/60 hover:text-violet-400 transition-colors">
              contact@neotix.ai
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <a href="tel:+1 (514)-834-2926" className="dark:text-white/60 hover:text-violet-400 transition-colors">
              +1 (514)-834-2926
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="dark:text-white/60">
              Montreal, QC
            </p>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Book a Call</h2>
              <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Schedule a Consultation</h3>
                  </div>
                  <p className="dark:text-white/60 mb-6">
                    Prefer to talk directly? Choose one of the options below to schedule a call with our team.
                  </p>
                </div>

                <div className="space-y-4">
                  <GradientButton onClick={handleRequestCall} className="w-full">
                    Request a Call
                  </GradientButton>
                  <a
                    href="mailto:contact@neotix.ai?subject=Call%20Request"
                    className="block w-full"
                  >
                    <GradientButton variant="secondary" className="w-full">
                      Email to Schedule
                    </GradientButton>
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                  <span className="dark:text-white/80">Response within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                  <span className="dark:text-white/80">Free consultation call</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                  <span className="dark:text-white/80">Custom solution proposal</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                  <span className="dark:text-white/80">No obligation quote</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}

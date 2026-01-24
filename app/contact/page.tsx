'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import ContactForm from '@/components/shared/ContactForm';
import GradientButton from '@/components/shared/GradientButton';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useT } from '@/hooks/useT';

export default function ContactPage() {
  const { t } = useT();

  const handleRequestCall = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      const messageField = document.getElementById('message') as HTMLTextAreaElement | null;
      if (messageField) {
        messageField.value = t.contactPage.prefillMessage;
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
            {t.contactPage.hero.titlePrefix}{' '}
            <span className="gradient-text">{t.contactPage.hero.titleAccent}</span>
          </h1>

          <p className="text-xl dark:text-white/60 mb-12">
            {t.contactPage.hero.subtitle}
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* EMAIL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.contactPage.cards.emailTitle}</h3>
            <a
              href="mailto:contact@neotix-ai.com"
              className="dark:text-white/60 hover:text-violet-400 transition-colors"
            >
              contact@neotix.ai
            </a>
          </motion.div>

          {/* PHONE */}
          {/*
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
            <h3 className="text-lg font-semibold mb-2">
              {t.contactPage.cards.phoneTitle}
            </h3>
            <a
              href="tel:+15148342926"
              className="dark:text-white/60 hover:text-violet-400 transition-colors"
            >
              +1 (514)-834-2926
            </a>
          </motion.div>
          */}


          {/* LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
          >
            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.contactPage.cards.locationTitle}</h3>
            <p className="dark:text-white/60">{t.contactPage.cards.locationValue}</p>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">{t.contactPage.form.title}</h2>
            <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
              <ContactForm />
            </div>
          </motion.div>

          {/* BOOK A CALL + EXPECT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.contactPage.call.title}</h2>

              <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="mb-1 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{t.contactPage.call.cardTitle}</h3>
                  </div>

                  <p className="dark:text-white/60 mb-6">{t.contactPage.call.subtitle}</p>
                </div>

                <div className="space-y-4">
                  <GradientButton onClick={handleRequestCall} className="w-full">
                    {t.contactPage.call.requestBtn}
                  </GradientButton>

                  <a
                    href={`mailto:contact@neotix.ai?subject=${encodeURIComponent(
                      t.contactPage.call.emailSubject
                    )}`}
                    className="block w-full"
                  >
                    <GradientButton variant="secondary" className="w-full">
                      {t.contactPage.call.emailBtn}
                    </GradientButton>
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4">{t.contactPage.expect.title}</h3>

              <ul className="space-y-3">
                {t.contactPage.expect.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 mt-2" />
                    <span className="dark:text-white/80">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}

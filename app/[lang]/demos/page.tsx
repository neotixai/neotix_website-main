'use client';

import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import { PhoneCall, Volume2, CalendarCheck } from 'lucide-react';
import InteractiveDemoSection from '@/components/shared/InteractiveDemoSection';
import { useT } from '@/hooks/useT';
import { useMemo } from 'react';

export default function DemosPage() {
  const { t } = useT();

  const currentTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const audioDemos = [
    {
      ...t.demosPage.audioDemos[0],
      src: '/audio/barbershop.mp3',
      industry: 'Customer inquiries about the business',
      messages: [
        { id: 1, text: "Bonjour ! Je voudrais prendre rendez-vous pour une coupe.", sender: 'user' as const, time: currentTime, timestamp: 0 },
        { id: 2, text: "Bonjour ! Avec plaisir. Préférez-vous un créneau en semaine ou le weekend ?", sender: 'agent' as const, time: currentTime, timestamp: 3 },
        { id: 3, text: "Plutôt samedi prochain si possible.", sender: 'user' as const, time: currentTime, timestamp: 8 },
        { id: 4, text: "Parfait ! J'ai une disponibilité samedi à 10h ou 14h. Quelle heure vous convient ?", sender: 'agent' as const, time: currentTime, timestamp: 12 },
        { id: 5, text: "10h c'est parfait !", sender: 'user' as const, time: currentTime, timestamp: 18 },
        { id: 6, text: "Excellent ! Votre rendez-vous est confirmé pour samedi à 10h. À bientôt !", sender: 'agent' as const, time: currentTime, timestamp: 22 },
      ],
      clientInfo: [
        { label: 'Nom', value: 'Marc Dubois', timestamp: 5, icon: 'user' as const },
        { label: 'Téléphone', value: '+33 6 12 34 56 78', timestamp: 7, icon: 'phone' as const },
        { label: 'Email', value: 'marc.dubois@email.fr', timestamp: 10, icon: 'mail' as const },
        { label: 'Service', value: 'Coupe homme', timestamp: 14, icon: 'calendar' as const },
        { label: 'Date', value: 'Samedi 10h00', timestamp: 19, icon: 'calendar' as const },
      ],
      aiFunctions: [
        { label: 'Identification du client', timestamp: 6 },
        { label: 'Vérification des disponibilités', timestamp: 13 },
        { label: 'Création du rendez-vous', timestamp: 20 },
        { label: 'Envoi de confirmation par SMS', timestamp: 24 },
      ]
    },
    {
      ...t.demosPage.audioDemos[1],
      src: '/audio/restaurant.mp3',
      industry: 'Inbound call handling and qualification',
      messages: [
        { id: 1, text: "Hi, I'd like to make a reservation for tonight.", sender: 'user' as const, time: currentTime, timestamp: 0 },
        { id: 2, text: "Good evening! I'd be happy to help. How many people will be dining?", sender: 'agent' as const, time: currentTime, timestamp: 4 },
        { id: 3, text: "4 people, around 8 PM if possible.", sender: 'user' as const, time: currentTime, timestamp: 9 },
        { id: 4, text: "Let me check our availability... Yes, we have a table for 4 at 8 PM. May I have your name?", sender: 'agent' as const, time: currentTime, timestamp: 13 },
        { id: 5, text: "John Smith", sender: 'user' as const, time: currentTime, timestamp: 20 },
        { id: 6, text: "Perfect! Your table for 4 is reserved for tonight at 8 PM under John Smith. See you soon!", sender: 'agent' as const, time: currentTime, timestamp: 23 },
      ],
      clientInfo: [
        { label: 'Name', value: 'John Smith', timestamp: 6, icon: 'user' as const },
        { label: 'Phone', value: '+1 555-123-4567', timestamp: 8, icon: 'phone' as const },
        { label: 'Party Size', value: '4 people', timestamp: 10, icon: 'user' as const },
        { label: 'Date & Time', value: 'Tonight 8:00 PM', timestamp: 15, icon: 'calendar' as const },
        { label: 'Table', value: 'Table 12 (Window)', timestamp: 21, icon: 'location' as const },
      ],
      aiFunctions: [
        { label: 'Customer identification', timestamp: 7 },
        { label: 'Check table availability', timestamp: 14 },
        { label: 'Reserve table #12', timestamp: 22 },
        { label: 'Send confirmation email', timestamp: 25 },
      ]
    },
    {
      ...t.demosPage.audioDemos[2],
      src: '/audio/dental.mp3',
      industry: 'Automated patient booking appointment',
      messages: [
        { id: 1, text: "Hello, I need to schedule a dental cleaning.", sender: 'user' as const, time: currentTime, timestamp: 0 },
        { id: 2, text: "Hello! I'd be happy to help you schedule that. Do you have a preferred day?", sender: 'agent' as const, time: currentTime, timestamp: 3 },
        { id: 3, text: "Next Tuesday afternoon would be great.", sender: 'user' as const, time: currentTime, timestamp: 8 },
        { id: 4, text: "Perfect! We have availability at 2 PM and 4 PM. Which time works better for you?", sender: 'agent' as const, time: currentTime, timestamp: 12 },
        { id: 5, text: "2 PM would be perfect.", sender: 'user' as const, time: currentTime, timestamp: 17 },
        { id: 6, text: "Great! You're all set for next Tuesday at 2 PM. We'll send you a reminder!", sender: 'agent' as const, time: currentTime, timestamp: 20 },
      ],
      clientInfo: [
        { label: 'Name', value: 'Sarah Johnson', timestamp: 5, icon: 'user' as const },
        { label: 'Phone', value: '+1 555-987-6543', timestamp: 7, icon: 'phone' as const },
        { label: 'Email', value: 'sarah.j@email.com', timestamp: 9, icon: 'mail' as const },
        { label: 'Service', value: 'Dental Cleaning', timestamp: 13, icon: 'calendar' as const },
        { label: 'Appointment', value: 'Tuesday 2:00 PM', timestamp: 18, icon: 'calendar' as const },
      ],
      aiFunctions: [
        { label: 'Patient record lookup', timestamp: 6 },
        { label: 'Check dentist availability', timestamp: 13 },
        { label: 'Book appointment slot', timestamp: 19 },
        { label: 'Schedule SMS reminder', timestamp: 22 },
      ]
    },
    {
      ...t.demosPage.audioDemos[3],
      src: '/audio/fitness.mp3',
      industry: 'Answering customer questions about the business',
      messages: [
        { id: 1, text: "Bonjour, Je m'appelle Eric de Power Club, comment puis je vous aider ?", sender: 'agent' as const, time: currentTime, timestamp: 1 },
        { id: 2, text: "Bonjour ! Je voudrais savoir c'est qui les coachs qui sont dans votre club ?", sender: 'user' as const, time: currentTime, timestamp: 3.5 },
        { id: 3, text: "Nous avons 4 coachs certifiés dans notre club : Jason, Myke, Ryan et Chris. Chacun d'eux est spécialisé dans différentes approches d'entraînement et adapte les sécances au objectifs et à la condition physique de chaque client.", sender: 'agent' as const, time: currentTime, timestamp: 8 },
        { id: 4, text: "Et c'est quoi les activités proposées ?", sender: 'user' as const, time: currentTime, timestamp: 19.5 },
        { id: 5, text: "Nous offrons plusieurs services pour vous aider à atteindre vos objectifs de remise en forme. Nous avons des séances d'entraînement personnels, de l'entraînement de musculation, du coaching en perte de poids, de l'entraînement HIIT (High Intensity Interval Training) ainsi qu'une séance de mobilité et de récuperation.", sender: 'agent' as const, time: currentTime, timestamp: 23 },
        { id: 6, text: " Parfait, merci !", sender: 'user' as const, time: currentTime, timestamp: 38.7 },
      ],
      clientInfo: [
      ],
      aiFunctions: [
        { label: 'Informations concernant les coachs du club.', timestamp: 7 },
        { label: 'Informations concernant les activités proposées.', timestamp: 22 }
      ]
    },
  ];

  const featuresIcons = [PhoneCall, Volume2, CalendarCheck];
  
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
            <span className="gradient-text">{t.demosPage.hero.titlePrefix}</span>{' '}
            {t.demosPage.hero.titleSuffix}
          </h1>

          <p className="text-xl dark:text-white/60 mb-12">
            {t.demosPage.hero.subtitle}
          </p>

          <GradientButton href="/contact" className="w-full sm:w-2/5">
            {t.demosPage.hero.cta}
          </GradientButton>
        </motion.div>
      </Section>

      {/* FEATURES */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.demosPage.features.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.features.titleAccent}
            </span>
          </h2>

          <p className="text-xl dark:text-white/60 max-w-2xl mx-auto">
            {t.demosPage.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.demosPage.features.items.map((feature, index) => {
            const Icon = featuresIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-card rounded-2xl p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="dark:text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* INTERACTIVE DEMOS */}
      <Section className="bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {t.demosPage.try.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.try.titleAccent}
            </span>
          </h2>

          <InteractiveDemoSection demos={audioDemos} />
        </motion.div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12 ring-1 ring-black/12 dark:ring-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.demosPage.finalCta.title}
          </h2>

          <p className="text-xl dark:text-white/60 mb-8">
            {t.demosPage.finalCta.subtitle}
          </p>

          <GradientButton href="/contact">
            {t.demosPage.finalCta.button}
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

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
      // ✅ FIXED: Use title property directly instead of spreading
      title: t.demosPage.audioDemos[0].title,
      src: '/audio/barbershop.mp3',
      // ✅ FIXED: Use proper translation key instead of string literal
      industry: t.demosPage.ui.industries.customerInquiries,
      messages: [
        { id: 1, text: "Bonjour!", sender: 'agent' as const, time: currentTime, timestamp: 0.5 },
        { id: 2, text: "Mon nom est Caroline du salon Lemon Lime.", sender: 'agent' as const, time: currentTime, timestamp: 1.5 },
        { id: 3, text: "Comment puis-je vous aider ?", sender: 'agent' as const, time: currentTime, timestamp: 3.8 },
        { id: 4, text: "Bonjour, je voulais savoir si vous ouvrez les samedi matin s'il vous plait ?", sender: 'user' as const, time: currentTime, timestamp: 6 },
        { id: 5, text: "Oui le salon est ouvert le samedi de 9h à 17h.", sender: 'agent' as const, time: currentTime, timestamp: 10.8 },
        { id: 6, text: "Avez-vous besoin d'autres informations ou souhaitez-vous prendre un rendez-vous ?", sender: 'agent' as const, time: currentTime, timestamp: 14.5 },
        { id: 7, text: "Quel est le prix pour une coupe régulière ?", sender: 'user' as const, time: currentTime, timestamp: 18.3 },
        { id: 8, text: "Le prix pour une coupe régulière est de 38 dollars.", sender: 'agent' as const, time: currentTime, timestamp: 23 },
        { id: 9, text: "Souhaitez-vous prendre rendez-vous pour ce service ?", sender: 'agent' as const, time: currentTime, timestamp: 25.6 },
        { id: 10, text: "Pas pour l'instant, mais où êtes-vous situé exactement ?", sender: 'user' as const, time: currentTime, timestamp: 29.5 },
        { id: 11, text: "Nous sommes situés au : 357 chemin de la Grande Côte.", sender: 'agent' as const, time: currentTime, timestamp: 32.9 },
        { id: 12, text: "À Boisbriand, Québec. ", sender: 'agent' as const, time: currentTime, timestamp: 35.9 },
        { id: 13, text: "Avez-vous besoin d'autres informations ?", sender: 'agent' as const, time: currentTime, timestamp: 37.5 },
        { id: 14, text: "Non merci, ça sera tout.", sender: 'user' as const, time: currentTime, timestamp: 40 },
        { id: 15, text: "D'accord, n'hésitez pas à revenir si vous avez d'autres questions!", sender: 'agent' as const, time: currentTime, timestamp: 41.9 },
      ],
      clientInfo: [
        // ✅ FIXED: Use appropriate icons for each field
        { label: 'Demande', value: 'Horaires samedi', timestamp: 11, icon: 'calendar' as const },
        { label: 'Intérêt', value: 'Coupe régulière', timestamp: 23, icon: 'calendar' as const },
        { label: 'Prix', value: '38 dollars', timestamp: 23, icon: 'calendar' as const },
        { label: 'Adresse du salon', value: '357 chemin de la Grande Côte, Boisbriand, Québec', timestamp: 35, icon: 'location' as const },
        { label: 'Statut', value: 'Informations uniquement', timestamp: 41.8, icon: 'user' as const },
      ],
      aiFunctions: [
        { label: 'Analyse de la demande initiale', timestamp: 9.2 },
        { label: 'Recherche des horaires du samedi', timestamp: 10 },
        { label: 'Consultation de la grille tarifaire', timestamp: 21.5 },
        { label: 'Recherche de l\'adresse complète', timestamp: 32 },
        { label: 'Clôture de la conversation', timestamp: 41.8 },
      ]
    },
    {
      // ✅ FIXED: Consistent structure
      title: t.demosPage.audioDemos[1].title,
      src: '/audio/restaurant.mp3',
      industry: t.demosPage.ui.industries.inboundCalls,
      messages: [
        { id: 1, text: "Hello ! My name is Bella, how can i help you ?", sender: 'agent' as const, time: currentTime, timestamp: 0 },
        { id: 2, text: "Hi, i'd like to order two chicken Tom Yum soups.", sender: 'user' as const, time: currentTime, timestamp: 3.7 },
        { id: 3, text: "Is your order for delivery or take-out ?", sender: 'agent' as const, time: currentTime, timestamp: 7.5 },
        { id: 4, text: "For delivery.", sender: 'user' as const, time: currentTime, timestamp: 10.2 },
        { id: 5, text: "What is your name please ?", sender: 'agent' as const, time: currentTime, timestamp: 12.5 },
        { id: 6, text: "Lyna.", sender: 'user' as const, time: currentTime, timestamp: 14.7 },
        { id: 7, text: "Thank you Lyna. Can i have your phone number ?", sender: 'agent' as const, time: currentTime, timestamp: 16.5 },
        { id: 8, text: "5141249812.", sender: 'user' as const, time: currentTime, timestamp: 23 },
        { id: 9, text: "And what is your email address ?", sender: 'agent' as const, time: currentTime, timestamp: 24.7 },
        { id: 10, text: "It's lyna.98@gmail.com.", sender: 'user' as const, time: currentTime, timestamp: 29.9 },
        { id: 11, text: "Let me confirm", sender: 'agent' as const, time: currentTime, timestamp: 32.9 },
        { id: 12, text: "l y n a . 98 ?", sender: 'agent' as const, time: currentTime, timestamp: 34 },
        { id: 13, text: "Yes.", sender: 'user' as const, time: currentTime, timestamp: 36.3 },
        { id: 14, text: "What is the complete delivery address ?", sender: 'agent' as const, time: currentTime, timestamp: 38.2 },
        { id: 15, text: "42 Bedford Street.", sender: 'user' as const, time: currentTime, timestamp: 41.8 },
        { id: 16, text: "So to recap your delivery order :", sender: 'agent' as const, time: currentTime, timestamp: 45 },
        { id: 17, text: "Two chicken Tom Yum soups, for Lyna.", sender: 'agent' as const, time: currentTime, timestamp: 46.8 },
        { id: 18, text: "5141249812.", sender: 'agent' as const, time: currentTime, timestamp: 50.5 },
        { id: 19, text: "To 42 Bedford Street.", sender: 'agent' as const, time: currentTime, timestamp: 52.4 },
        { id: 20, text: "Should I confirm this order ?", sender: 'agent' as const, time: currentTime, timestamp: 54 },
        { id: 21, text: "Yes.", sender: 'user' as const, time: currentTime, timestamp: 55.9 },
        { id: 22, text: "Thank you Lyna. Your order is being prepared and will be delivered as soon as possible.", sender: 'agent' as const, time: currentTime, timestamp: 58 },
      ],
      clientInfo: [
        // ✅ FIXED: Use proper icon types
        { label: 'Request', value: 'Food order', timestamp: 6.5, icon: 'calendar' as const },
        { label: 'Order details', value: 'Two chicken Tom Yum soups', timestamp: 7, icon: 'calendar' as const },
        { label: 'Order type', value: 'Delivery', timestamp: 11.7, icon: 'calendar' as const },
        { label: 'Name', value: 'Lyna', timestamp: 15.5, icon: 'user' as const },
        { label: 'Phone', value: '5141249812', timestamp: 23.7, icon: 'phone' as const },
        { label: 'Email', value: 'lyna.98@gmail.com', timestamp: 37.5, icon: 'mail' as const },
        { label: 'Address', value: '42 Bedford Street', timestamp: 43.5, icon: 'location' as const },
      ],

      aiFunctions: [
        { label: 'Detect customer intent', timestamp: 1.8 },
        { label: 'Extract order items', timestamp: 6.5 },
        { label: 'Determine order type', timestamp: 8 },
        { label: 'Identify customer', timestamp: 12.5 },
        { label: 'Validate delivery address', timestamp: 38.2 },
        { label: 'Create delivery order', timestamp: 44 },
        { label: 'Send order confirmation', timestamp: 57.5 },
      ]

    },
    {
      title: t.demosPage.audioDemos[2].title,
      src: '/audio/dental.mp3',
      industry: t.demosPage.ui.industries.dentalBooking,
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
      title: t.demosPage.audioDemos[3].title,
      src: '/audio/fitness.mp3',
      industry: t.demosPage.ui.industries.fitnessQuestions,
      messages: [
        { id: 1, text: "Bonjour, Je m'appelle Eric de Power Club, comment puis je vous aider ?", sender: 'agent' as const, time: currentTime, timestamp: 1 },
        { id: 2, text: "Bonjour ! Je voudrais savoir c'est qui les coachs qui sont dans votre club ?", sender: 'user' as const, time: currentTime, timestamp: 3.5 },
        { id: 3, text: "Nous avons 4 coachs certifiés dans notre club : Jason, Myke, Ryan et Chris. Chacun d'eux est spécialisé dans différentes approches d'entraînement et adapte les sécances au objectifs et à la condition physique de chaque client.", sender: 'agent' as const, time: currentTime, timestamp: 8 },
        { id: 4, text: "Et c'est quoi les activités proposées ?", sender: 'user' as const, time: currentTime, timestamp: 19.5 },
        { id: 5, text: "Nous proposons un large éventail d'activités : Musculation et cours collectifs comme yoga, spinning et boot camp.", sender: 'agent' as const, time: currentTime, timestamp: 22 },
        { id: 6, text: " Parfait, merci !", sender: 'user' as const, time: currentTime, timestamp: 38.7 },
      ],
      clientInfo: [
        // Empty as per original
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
          {/* Titre */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {t.demosPage.try.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.try.titleAccent}
            </span>
          </h2>
          
          {/* Badge centré sous le titre */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-semibold text-sm backdrop-blur-sm">
              <Volume2 className="w-4 h-4" />
              {t.demosPage.try.subtitle}
            </div>
          </div>

          {/* ✅ FIXED: Remove the extra t prop */}
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

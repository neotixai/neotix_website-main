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
      title: t.demosPage.audioDemos[0].title,
      src: '/audio/barbershop.mp3',
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
        { id: 8, text: "Five one four one two four nine eight one two.", sender: 'user' as const, time: currentTime, timestamp: 20.5 },
        { id: 9, text: "And what is your email address ?", sender: 'agent' as const, time: currentTime, timestamp: 24.7 },
        { id: 10, text: "It's lyna.98@gmail.com.", sender: 'user' as const, time: currentTime, timestamp: 29.7 },
        { id: 11, text: "Let me confirm", sender: 'agent' as const, time: currentTime, timestamp: 32.9 },
        { id: 12, text: "l y n a . 98 ?", sender: 'agent' as const, time: currentTime, timestamp: 34 },
        { id: 13, text: "Yes.", sender: 'user' as const, time: currentTime, timestamp: 36.3 },
        { id: 14, text: "What is the complete delivery address ?", sender: 'agent' as const, time: currentTime, timestamp: 38.2 },
        { id: 15, text: "42 Bedford Street.", sender: 'user' as const, time: currentTime, timestamp: 41.8 },
        { id: 16, text: "So to recap your delivery order :", sender: 'agent' as const, time: currentTime, timestamp: 45 },
        { id: 17, text: "Two chicken Tom Yum soups, for Lyna.", sender: 'agent' as const, time: currentTime, timestamp: 46.8 },
        { id: 18, text: "Five one four one two four nine eight one two.", sender: 'agent' as const, time: currentTime, timestamp: 49.5 },
        { id: 19, text: "To 42 Bedford Street.", sender: 'agent' as const, time: currentTime, timestamp: 52.4 },
        { id: 20, text: "Should I confirm this order ?", sender: 'agent' as const, time: currentTime, timestamp: 54 },
        { id: 21, text: "Yes.", sender: 'user' as const, time: currentTime, timestamp: 55.9 },
        { id: 22, text: "Thank you Lyna. Your order is being prepared and will be delivered as soon as possible.", sender: 'agent' as const, time: currentTime, timestamp: 58 },
      ],
      clientInfo: [
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
        { id: 1, text: "Hello ! This is Emily from Bright Smiles Dental.", sender: 'agent' as const, time: currentTime, timestamp: 0.3 },
        { id: 2, text: "How can I help you ?", sender: 'agent' as const, time: currentTime, timestamp: 2.5 },
        { id: 3, text: "I would like to book a new appointment.", sender: 'user' as const, time: currentTime, timestamp: 4.5 },
        { id: 4, text: "Thanks for looking to book an appointment.", sender: 'agent' as const, time: currentTime, timestamp: 6.8 },
        { id: 5, text: "Before we proceed, are you a new or existing customer ?", sender: 'agent' as const, time: currentTime, timestamp: 9.1 },
        { id: 6, text: "I'm a new customer.", sender: 'user' as const, time: currentTime, timestamp: 13 },
        { id: 7, text: "Perfect ! Can I get your full name to start with ?", sender: 'agent' as const, time: currentTime, timestamp: 14.65 },
        { id: 8, text: "John Smith.", sender: 'user' as const, time: currentTime, timestamp: 18.2 },
        { id: 9, text: "Great, John!", sender: 'agent' as const, time: currentTime, timestamp: 20 },
        { id: 10, text: "What type of appointment are you looking to book ?", sender: 'agent' as const, time: currentTime, timestamp: 20.8 },
        { id: 11, text: "Is it a cleaning, a checkup, or something else ?", sender: 'agent' as const, time: currentTime, timestamp: 23.3 },
        { id: 12, text: "It's going to be for cleaning.", sender: 'user' as const, time: currentTime, timestamp: 26.8 },
        { id: 13, text: "Got it, a cleaning appointment.", sender: 'agent' as const, time: currentTime, timestamp: 29.2 },
        { id: 14, text: "What day and time would work best for you ?", sender: 'agent' as const, time: currentTime, timestamp: 31 },
        { id: 15, text: "Tomorrow, 2PM.", sender: 'user' as const, time: currentTime, timestamp: 34 },
        { id: 16, text: "Perfect, 2pm on Monday, January 24th is available.", sender: 'agent' as const, time: currentTime, timestamp: 37.3 },
        { id: 17, text: "What's the best email address to send your confirmation to ?", sender: 'agent' as const, time: currentTime, timestamp: 40.1 },
        { id: 18, text: "I don't have an email address.", sender: 'user' as const, time: currentTime, timestamp: 43.3 },
        { id: 19, text: "No worries at all !", sender: 'agent' as const, time: currentTime, timestamp: 46.2 },
        { id: 20, text: "In that case, can I get your phone number to send a confirmation and any important updates?", sender: 'agent' as const, time: currentTime, timestamp: 47.5 },
        { id: 21, text: "Yes.", sender: 'user' as const, time: currentTime, timestamp: 52.4 },
        { id: 22, text: "One two three four five sive seven eight nine.", sender: 'user' as const, time: currentTime, timestamp: 53.2 },
        { id: 23, text: "Just to make sure I got that right.", sender: 'agent' as const, time: currentTime, timestamp: 58 },
        { id: 24, text: "Your number is one two three four five sive seven eight nine.", sender: 'agent' as const, time: currentTime, timestamp: 59.6 },
        { id: 25, text: "Is that correct?", sender: 'agent' as const, time: currentTime, timestamp: 62.8 },
        { id: 26, text: "Perfect.", sender: 'user' as const, time: currentTime, timestamp: 64.4 },
        { id: 27, text: "Excellent !", sender: 'agent' as const, time: currentTime, timestamp: 67.15 },
        { id: 28, text: "You're all set for Monday, January 24th at 2 PM.", sender: 'agent' as const, time: currentTime, timestamp: 67.95 },
        { id: 29, text: "You will receive a confirmation text message shortly with your booking details.", sender: 'agent' as const, time: currentTime, timestamp: 70.65 },
        { id: 30, text: "Is there anything else I can help you with today ?", sender: 'agent' as const, time: currentTime, timestamp: 74.75 },
        { id: 31, text: "No. Perfect. Thank you.", sender: 'user' as const, time: currentTime, timestamp: 77.8 },
        { id: 32, text: "You're very welcome, John !", sender: 'agent' as const, time: currentTime, timestamp: 80 },
        { id: 33, text: "Thanks for choosing Bright Smiles Dental.", sender: 'agent' as const, time: currentTime, timestamp: 81.4 },

      ],
      clientInfo: [
        { label: 'Customer type', value: 'New customer', timestamp: 14.8, icon: 'user' as const },
        { label: 'Name', value: 'John Smith', timestamp: 19, icon: 'user' as const },
        { label: 'Service', value: 'Dental Cleaning', timestamp: 29, icon: 'calendar' as const },
        { label: 'Appointment', value: 'Monday, January 24th at 2 PM', timestamp: 40, icon: 'calendar' as const },
        { label: 'Email', value: 'No email provided', timestamp: 46, icon: 'mail' as const },
        { label: 'Phone', value: '123456789', timestamp: 66, icon: 'phone' as const },
      ],
      aiFunctions: [
        { label: 'Detect customer intent', timestamp: 3.8 },
        { label: 'Identify customer status', timestamp: 12 },
        { label: 'Extract customer name', timestamp: 17.5 },
        { label: 'Determine service type', timestamp: 25 },
        { label: 'Check available time slots', timestamp: 36 },
        { label: 'Validate phone number format', timestamp: 58 },
        { label: 'Book appointment slot', timestamp: 67 },
        { label: 'Schedule SMS confirmation', timestamp: 75 },
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
      clientInfo: [],
      aiFunctions: [
        { label: 'Informations concernant les coachs du club.', timestamp: 7 },
        { label: 'Informations concernant les activités proposées.', timestamp: 22 }
      ]
    },
  ];

  const featuresIcons = [PhoneCall, Volume2, CalendarCheck];
  
  return (
    <div className="relative overflow-hidden">
      {/* 
        ✨ NOUVEAUX DÉGRADÉS D'ARRIÈRE-PLAN ✨
        Multiples blobs de dégradé positionnés stratégiquement sur la page
      */}
      
      {/* Dégradé Hero - En haut */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/5 rotate-[150deg] bg-gradient-to-tr from-violet-500 to-blue-500 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* HERO */}
      <Section className="pt-32 relative">
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
      <Section className="relative">
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
      <Section className="relative bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {t.demosPage.try.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.try.titleAccent}
            </span>
          </h2>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-semibold text-sm backdrop-blur-sm">
              <Volume2 className="w-4 h-4" />
              {t.demosPage.try.subtitle}
            </div>
          </div>

          <InteractiveDemoSection demos={audioDemos} />
        </motion.div>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative">
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
    </div>
  );
}

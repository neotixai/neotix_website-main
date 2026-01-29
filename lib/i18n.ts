import type { Locale } from '@/lib/i18n-config';
export type Lang = keyof typeof messages;
export const DEFAULT_LANG: Locale = 'en';

export const messages = {
  en: {
    nav: {
      home: 'Home',
      offer: 'Services',
      demos: 'Demos',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
      cta: 'Book With Us',
    },

    home: {
      badge: 'Next-Gen AI Solutions',
      titlePrefix: 'Neotix AI — Where Vision Becomes',
      titleAccent: 'Automation',
      subtitle:
        'We build AI assistants, intelligent workflows, and creative AI products that scale your business. From customer support to growth campaigns, we deliver real outcomes.',
      primary: 'Get a Free Consultation',
      secondary: 'Explore Our Services',
    },

    contact: {
      titlePrefix: "Let's Build Something",
      titleAccent: 'Smart',
      subtitle:
        "Ready to transform your business with AI? Get in touch and let's discuss your project.",
    },

    integrations: {
      titlePrefix: 'Integrations that',
      titleAccent: 'power',
      titleSuffix: 'your workflows',
    },

    process: {
      titlePrefix: 'Our',
      titleAccent: 'Process',
      subtitle: 'From concept to launch in three streamlined steps',
      steps: [
        { title: 'Discover', description: 'We analyze your needs and design the perfect AI solution' },
        { title: 'Build', description: 'Our team develops and integrates your custom AI systems' },
        { title: 'Launch', description: 'Deploy, optimize, and scale with ongoing support' },
      ],
    },

    solutions: {
      titlePrefix: 'Our',
      titleAccent: 'Solutions',
      subtitle: 'Comprehensive AI-powered services to transform your business operations',
      items: [
        { title: 'AI Assistants', description: 'Custom chat/voice assistants for support, sales, and booking flows' },
        { title: 'Business Automation', description: 'Make/N8N workflows, CRM sync, email/SMS, lead routing' },
        { title: 'Web & App Development', description: 'Modern landing pages, dashboards, integrations' },
      ],
    },

    footer: {
      tagline: 'Next-Gen AI Solutions for your business automation and growth.',
      quickLinks: 'Quick Links',
      services: 'Services',
      connect: 'Connect',
      links: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        offer: 'Services',
        demos: 'Demos',
      },
      rights: 'All rights reserved.',
    },

    offerPage: {
    hero: {
        titlePrefix: 'Automation & AI',
        titleSuffix: 'That Scale Your Business',
        subtitle:
        'Intelligent workflows, AI assistants, and smart automation systems that eliminate busywork and elevate your customer experience.',
        cta: 'Transform Your Operations',
    },

    solutions: {
        titlePrefix: 'Our',
        titleAccent: 'Solutions',
        subtitle: 'End-to-end automation and AI systems built for modern businesses',
        items: [
        {
            title: 'Workflow Automation',
            description:
            'Build sophisticated Make/N8N workflows that connect your tools and automate repetitive tasks',
        },
        {
            title: 'Communication Automation',
            description:
            'Automate email sequences, SMS campaigns, and notifications triggered by customer actions',
        },
        {
            title: 'Data Integration',
            description:
            'Sync your CRM, databases, and spreadsheets automatically with real-time data flows',
        },
        {
            title: 'Chat Assistants',
            description:
            'Deploy intelligent chatbots for customer support, lead qualification, and sales assistance',
        },
        {
            title: 'Voice AI',
            description: 'Build voice-enabled assistants for phone support and appointment scheduling',
        },
        {
            title: 'Booking Automation',
            description:
            'Automate appointment scheduling and calendar management with smart AI agents',
        },
        ],
    },

    blocks: {
        leftTitle: 'From Chaos to Clarity',
        leftP1:
        'Stop wasting hours on repetitive tasks. We design intelligent workflows that trigger automatically based on actions, time, or specific business conditions.',
        leftP2:
        'Lead routing, invoice generation, CRM sync, notifications — everything runs automatically behind the scenes.',

        rightTitle: 'AI Assistants That Work 24/7',
        rightP1:
        'Our AI assistants handle customer support, sales conversations, and booking flows with human-like intelligence.',
        rightP2:
        'Available 24/7, multilingual, and fully integrated with your tools — without adding headcount.',
    },

    faq: {
        titlePrefix: 'Frequently Asked',
        titleAccent: 'Questions',
        items: [
        {
            q: 'What platforms do you integrate with?',
            a: 'We integrate with Make, N8N, Google Workspace, Microsoft 365, Salesforce, HubSpot, Slack, Acuity, Cal, CRMs and hundreds more via APIs.',
        },
        {
            q: 'How long does deployment take?',
            a: 'Simple automations or chatbots can be deployed in a few days. More complex AI assistants typically take 2–4 weeks.',
        },
        {
            q: 'Is everything secure?',
            a: 'Yes. We use encrypted connections, secure authentication, and enterprise-grade best practices to protect your data.',
        },
        {
            q: 'Can this work with our current processes?',
            a: 'Absolutely. We analyze your existing workflows and design automation and AI systems that fit seamlessly into your operations.',
        },
        ],
    },

    finalCta: {
        titlePrefix: 'Ready to',
        titleAccent: 'scale',
        titleSuffix: 'with Automation & AI?',
        subtitle: "Let’s eliminate the busywork and build intelligent systems that grow your business.",
        button: 'Get Started Today',
    },
    },

    demosPage: {
  hero: {
    titlePrefix: 'Business Automation',
    titleSuffix: 'That Works',
    subtitle:
      'Connect your tools, optimize manual work, and scale your operations with intelligent workflow automation.',
    cta: 'Automate Your Business',
  },
  
  ui: {
    selectDemo: 'Select a Demo',
    readyToStart: 'Ready to Start',

    answeringQuestions: 'Answering customer questions about the business',

    clientInformation: 'Client Information',
    waitingClientData: 'Waiting for client data...',

    aiActions: 'AI Actions',
    noActions: 'No actions executed yet...',

    industries: {
      customerInquiries: 'Customer inquiries',
      inboundCalls: 'Phone order management',
      dentalBooking: 'Automated patient booking appointment',
      fitnessQuestions: 'Client support',
    },
  },

  features: {
    titlePrefix: 'Automation',
    titleAccent: 'Solutions',
    subtitle: 'End-to-end automation services for modern businesses',
    items: [
      {
        title: 'Never Miss a Call',
        description:
          "Your AI receptionist answers 100% of incoming calls, 24/7, even outside business hours. Don't forget, 1 missed call is 1 less customer",
      },
      {
        title: 'Human-Like Voice',
        description: 'Natural, expressive voice that sounds like a real receptionist',
      },
      {
        title: 'Appointment Booking & Lead Capture',
        description:
          'Books, cancels, reschedules appointments, captures leads, and syncs everything to your tools automatically',
      },
    ],
  },

  try: {
    titlePrefix: 'Try it',
    titleAccent: 'Yourself',
    subtitle: 'Interactive Voice Demos',
  },

  audioDemos: [
    { title: '[🇫🇷] - Barbershop Agent'},
    { title: '[🇺🇸] - Restaurant Agent'},
    { title: '[🇺🇸] - Dental Agent'},
    { title: '[🇫🇷] - Fitness Club Agent'},
  ],

  faq: {
    titlePrefix: 'Common',
    titleAccent: 'Questions',
    items: [
      {
        q: 'What if I need more minutes?',
        a: "You can adjust your plan whenever you need. Additional minutes are billed at a simple per-minute rate, and you’ll always be notified before reaching your limit to avoid any unexpected charges.",
      },
      {
        q: 'Can the AI receptionist handle multiple calls at the same time?',
        a: 'Yes. The AI receptionist can handle multiple calls simultaneously with no wait time, ensuring every caller is answered instantly, even during peak hours',
      },
      {
        q: 'Can the AI receptionist speak multiple languages?',
        a: "Yes. The AI receptionist can speak multiple languages and automatically adapt to your customer's preferred language.",
      },
      {
        q: "Can I customize the AI's responses?",
        a: 'Yes. You have full control over how the AI interacts with your callers, from greetings and qualification questions to business hours and overall tone. The system also improves continuously based on your feedback.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to Automate Your Operations?',
    subtitle:
      "Let’s optimize your business, whatever your industry, and free up time for what really matters.",
    button: 'Start Automating',
  },
},

pricingPage: {
  hero: {
    titlePrefix: 'Simple',
    titleAccent: 'Pricing',
    subtitle: 'Choose the package that fits your needs.',
    note: 'Packages are indicative — we tailor scopes to your needs',
  },

  billing: {
    btn3m: '3 months',
    btn6m: '6 months',
    btn1y: '1 year',
    billed3m: '3 month minimum commitment',
    billed6m: '6 month minimum commitment',
    billed1y: '1 year minimum commitment',
    badgeNone: 'No discount',
    badge10: 'Save 10%',
    badge20: 'Save 15%',
    off: 'OFF',
  },

  badges: {
    mostPopular: 'Most Popular',
  },

  cards: {
    enterpriseName: 'Enterprise',
    enterprisePriceLabel: 'Contact us for details. We’ll tailor scope & pricing to your needs.',
    whatsIncluded: "What’s included",
    totalLabel: 'total',
  },

  plans: {
    starter: {
      name: 'Starter',
      description: 'Perfect to test AI content production for your brand.',
      cta: 'Choose Starter',
      features: [
        '200 minutes included per month',
        '$1.33 per additional minute',
        'Basic CRM integration',
        'Email & SMS notifications',
        'Single phone number transfer',
        'One-time setup & onboarding fee: $400',
      ],
    },
    pro: {
      name: 'Pro',
      description: 'For growing teams shipping content every week.',
      cta: 'Choose Pro',
      features: [
        '475 minutes included per month',
        '$0.99 per additional minute',
        'Basic CRM integration',
        'Email & SMS notifications',
        'Double phone number transfer',
        'Call transcripts',
        'Multi-language support',
        'One-time setup & onboarding fee: $400',
      ],
    },
    business: {
      name: 'Business',
      description: 'High-volume content + stronger creative direction.',
      cta: 'Choose Business',
      features: [
        '1,100 minutes included per month',
        '$0.90 per additional minute',
        'Advanced CRM integration',
        'Email & SMS notifications',
        'Triple phone number transfer',
        'Call transcripts',
        'Multi-language support',
        'Advanced analytics & reporting',
        'One-time setup & onboarding fee: $250',
      ],
    },
    enterprise: {
      description: 'Custom volume, multi-brand, dedicated team.',
      cta: 'Contact us',
      features: ['Custom asset volume & workflow', 'Dedicated creative lead', 'And more'],
    },
  },

  comparison: {
    titlePrefix: 'Plan',
    titleAccent: 'Comparison',
    subtitle: 'A quick look at what changes as you scale.',
    headers: {
      feature: 'Feature',
      starter: 'Starter',
      pro: 'Pro',
      business: 'Business',
      enterprise: 'Enterprise',
    },
    rows: [
      ['Included minutes / month', '200', '475', '1,100', 'Custom'],
      ['Additional minutes', '$1.33 / min', '$0.99 / min', '$0.90 / min', 'Custom'],
      ['CRM integration', 'Basic', 'Basic', 'Advanced', 'Custom'],
      ['Email & SMS notifications', '__check__', '__check__', '__check__', '__check__'],
      ['Phone number transfers', '1 number', '2 numbers', '3 numbers', 'Custom'],
      ['Call transcripts', '__dash__', '__check__', '__check__', '__check__'],
      ['Multi-language support', '__dash__', '__check__', '__check__', '__check__'],
      ['Advanced analytics & reporting', '__dash__', '__dash__', '__check__', 'Custom'],
      ['Onboarding fee', '$400', '$400', '$250', 'Custom'],
    ],
  },

  finalCta: {
    title: 'Ready to start?',
    subtitle:
      'Tell us what you need (platforms, style, volume). We’ll propose the best plan for your timeline.',
    button: 'Contact us',
  },
},

contactPage: {
  hero: {
    titlePrefix: 'Get in',
    titleAccent: 'Touch',
    subtitle:
      "Ready to transform your business with AI? Let's discuss your project and explore how we can help.",
  },
  cards: {
    emailTitle: 'Email',
    phoneTitle: 'Phone',
    locationTitle: 'Location',
    locationValue: 'Montreal, QC',
  },
  form: {
    title: 'Send us a Message',
  },
  call: {
    title: 'Book a Call',
    cardTitle: 'Schedule a Consultation',
    subtitle:
      'Prefer to talk directly? Choose one of the options below to schedule a call with our team.',
    requestBtn: 'Request a Call',
    emailBtn: 'Email to Schedule',
    emailSubject: 'Call Request',
  },
  expect: {
    title: 'What to Expect',
    items: [
      'Response within 24-48 hours',
      'Free consultation call',
      'Custom solution proposal',
      'No obligation quote',
    ],
  },
  prefillMessage: 'I would like to request a call to discuss my project.',
},

aboutPage: {
  hero: {
    titlePrefix: 'About',
    titleAccent: 'Neotix AI',
    subtitle:
      "We're a team of AI specialists, developers, and strategists dedicated to transforming businesses through intelligent automation.",
  },

  who: {
    title: 'Who We Are',
    p1:
      'Founded by entrepreneurs who experienced firsthand the challenges of scaling operations, Neotix AI was born from a simple vision: make AI work for everyone.',
    p2:
      'We help businesses automate their workflows, enhance customer experiences, and unlock new growth opportunities through custom AI solutions.',
    p3:
      'From startups to enterprises, we tailor our approach to meet you where you are and take you where you want to go.',
  },

  why: {
    title: 'Why Choose Us?',
    items: [
      'End-to-end support from discovery to deployment',
      'Custom solutions tailored to your unique needs',
      'Transparent pricing and clear timelines',
    ],
  },

  values: {
    titlePrefix: 'Our',
    titleAccent: 'Values',
    subtitle: 'The principles that guide everything we do',
    items: [
      {
        title: 'Mission-Driven',
        description:
          'We believe AI should empower businesses, not complicate them. Our mission is to make advanced AI accessible and practical.',
      },
      {
        title: 'Client-Focused',
        description:
          'Your success is our success. We work closely with you to understand your needs and deliver solutions that exceed expectations.',
      },
      {
        title: 'Innovation First',
        description:
          'We stay at the cutting edge of AI technology to bring you the most effective and efficient solutions available.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to Transform Your Business?',
    subtitle:
      "Let's discuss how Neotix AI can help you achieve your goals with intelligent automation.",
    button: 'Get in Touch',
  },
},

contactForm: {
  fields: {
    name: 'Name',
    email: 'Email',
    company: 'Company',
    optional: 'optional',
    message: 'Message',
  },
  submit: 'Send Message',
  orEmail: 'Or email us directly at',
  toastSuccess: "Thanks — we'll reply within 24–48h!",
},


},

  fr: {
    nav: {
      home: 'Accueil',
      offer: 'Nos services',
      demos: 'Démos',
      pricing: 'Tarifs',
      about: 'À propos',
      contact: 'Contact',
      cta: 'Réserver',
    },

    home: {
      badge: 'Solutions IA nouvelle génération',
      titlePrefix: 'Neotix AI —  Transformez vos idées en',
      titleAccent: ' automatisation intelligente',
      subtitle:
        "On construit des assistants IA, des workflows intelligents et des produits créatifs qui font grandir ton business. Du support client aux campagnes de croissance, on livre des résultats concrets.",
      primary: 'Consultation gratuite',
      secondary: 'Découvrir nos services',
    },

    contact: {
      titlePrefix: 'Construisons quelque chose de',
      titleAccent: 'smart',
      subtitle: "Prêt à transformer ton business avec l’IA ? Contacte-nous et discutons de ton projet.",
    },

    integrations: {
      titlePrefix: 'Des intégrations qui',
      titleAccent: 'propulsent',
      titleSuffix: 'tes workflows',
    },

    process: {
      titlePrefix: 'Notre',
      titleAccent: 'Processus',
      subtitle: 'De l’idée au lancement en trois étapes simples et efficaces',
      steps: [
        { title: 'Découvrir', description: 'On analyse tes besoins et on conçoit la solution IA idéale.' },
        { title: 'Construire', description: 'On développe et on intègre des systèmes IA sur mesure.' },
        { title: 'Lancer', description: 'On déploie, optimise et fait évoluer avec un support continu.' },
      ],
    },

    solutions: {
      titlePrefix: 'Nos',
      titleAccent: 'Solutions',
      subtitle: 'Des services IA complets pour transformer tes opérations',
      items: [
        { title: 'Assistants IA', description: 'Assistants chat/voix sur mesure pour support, ventes et réservations.' },
        { title: 'Automatisation business', description: 'Workflows Make/N8N, synchro CRM, email/SMS, routage de leads.' },
        { title: 'Développement web & app', description: 'Landing pages modernes, dashboards, intégrations.' },
      ],
    },

    footer: {
      tagline: "Solutions IA nouvelle génération pour automatiser et faire grandir ton business.",
      quickLinks: 'Liens rapides',
      services: 'Services',
      connect: 'Réseaux',
      links: {
        home: 'Accueil',
        about: 'À propos',
        contact: 'Contact',
        offer: 'Nos services',
        demos: 'Démos',
      },
      rights: 'Tous droits réservés.',
    },

    offerPage: {
  hero: {
    titlePrefix: 'Automatisation & IA',
    titleSuffix: 'pour faire grandir ton business',
    subtitle:
      "Des workflows intelligents, des assistants IA et des systèmes d’automatisation qui éliminent le travail répétitif et améliorent l’expérience client.",
    cta: 'Transformer tes opérations',
  },

  solutions: {
    titlePrefix: 'Nos',
    titleAccent: 'Solutions',
    subtitle: "Des systèmes IA et d’automatisation de bout en bout pour les entreprises modernes",
    items: [
      {
        title: 'Automatisation de workflows',
        description:
          'Créer des scénarios Make/N8N avancés pour connecter tes outils et automatiser les tâches répétitives.',
      },
      {
        title: 'Automatisation des communications',
        description:
          'Automatiser des séquences email, campagnes SMS et notifications déclenchées par les actions clients.',
      },
      {
        title: 'Intégration de données',
        description:
          'Synchroniser CRM, bases de données et spreadsheets automatiquement avec des flux en temps réel.',
      },
      {
        title: 'Assistants chat',
        description:
          'Déployer des chatbots intelligents pour le support, la qualification de leads et l’aide à la vente.',
      },
      {
        title: 'Assistants vocaux',
        description:
          'Créer des assistants vocaux personnalisés pour le support téléphonique et la prise de rendez-vous.',
      },
      {
        title: 'Réservation automatique',
        description:
          'Automatiser la prise de rendez-vous et la gestion de calendrier avec des agents IA.',
      },
    ],
  },

  blocks: {
    leftTitle: 'Du chaos à la clarté',
    leftP1:
      "Arrête de perdre des heures sur des tâches répétitives. On conçoit des workflows intelligents qui se déclenchent automatiquement selon des actions, le temps ou des conditions métier.",
    leftP2:
      "Routage de leads, facturation, synchro CRM, notifications, tout tourne automatiquement en arrière-plan.",

    rightTitle: 'Des assistants IA actifs 24/7',
    rightP1:
      "Nos assistants IA gèrent le support, les conversations de vente et les flux de réservation avec une intelligence proche de l’humain.",
    rightP2:
      "Disponibles 24/7, multilingues et totalement intégrés à tes outils — sans recruter plus.",
  },

  faq: {
    titlePrefix: 'Questions',
    titleAccent: 'fréquentes',
    items: [
      {
        q: 'Quelles plateformes intégrez-vous ?',
        a: 'On intègre Make, N8N, Google Workspace, Microsoft 365, Salesforce, HubSpot, Slack, Acuity, Cal, des CRM et des centaines d’autres via API.',
      },
      {
        q: 'Combien de temps prend le déploiement ?',
        a: 'Les automations simples ou chatbots peuvent être livrés en quelques jours. Les assistants IA plus complexes prennent généralement 2 à 4 semaines.',
      },
      {
        q: 'Est-ce sécurisé ?',
        a: 'Oui. Connexions chiffrées, authentification sécurisée, et bonnes pratiques “enterprise” pour protéger tes données.',
      },
      {
        q: 'Est-ce compatible avec nos processus actuels ?',
        a: 'Absolument. On analyse tes workflows et on conçoit des systèmes IA/automation qui s’intègrent sans friction à tes opérations.',
      },
    ],
  },

  finalCta: {
    titlePrefix: 'Prêt à',
    titleAccent: 'scaler',
    titleSuffix: 'avec l’automatisation & l’IA ?',
    subtitle:
      "On élimine le travail répétitif et on construit des systèmes intelligents qui font grandir ton business.",
    button: 'Commencer maintenant',
  },
},

demosPage: {
  hero: {
    titlePrefix: 'Automatise ton business',
    titleSuffix: 'de la bonne manière',
    subtitle:
      "Connecte tes outils, réduis le travail manuel et scale tes opérations grâce à l’automatisation intelligente.",
    cta: 'Automatiser mon business',
  },

  ui: {
    selectDemo: 'Choisir une démo',
    readyToStart: 'Prêt à démarrer',

    answeringQuestions: 'Réponse aux questions des clients',

    clientInformation: 'Informations client',
    waitingClientData: 'En attente des données client...',

    aiActions: 'Actions IA',
    noActions: 'Aucune action exécutée pour le moment...',

    industries: {
      customerInquiries: 'Demandes de renseignements',
      inboundCalls: 'Gestion des commandes par téléphone',
      dentalBooking: 'Prise de rendez-vous patients automatisée',
      fitnessQuestions: 'Support client',
    } 
  },

  features: {
    titlePrefix: 'Solutions',
    titleAccent: 'd’automatisation',
    subtitle: "Des services d’automatisation de bout en bout pour les entreprises modernes",
    items: [
      {
        title: 'Ne rate plus aucun appel',
        description:
          "Ton réceptionniste IA répond à 100% des appels entrants, 24/7, même hors heures d’ouverture. N’oublie pas : 1 appel manqué est 1 client de moins.",
      },
      {
        title: 'Voix naturelle',
        description:
          'Une voix expressive et naturelle, comme une vraie réceptionniste.',
      },
      {
        title: 'Prise de rendez-vous & synchronisation',
        description:
          'Prend, annule, reporte les rendez-vous, et synchronise tout automatiquement avec tes outils.',
      },
    ],
  },

  try: {
    titlePrefix: 'Essayez par ',
    titleAccent: 'vous-même',
    subtitle: 'Démos vocales interactives',
  },

  audioDemos: [
    { title: '[🇫🇷] - Agent Barbershop'},
    { title: '[🇺🇸] - Agent Restaurant'},
    { title: '[🇺🇸] - Agent Dentaire'},
    { title: '[🇫🇷] - Agent Fitness'},
  ],
  
  faq: {
    titlePrefix: 'Questions',
    titleAccent: 'courantes',
    items: [
      {
        q: "Et si j’ai besoin de plus de minutes ?",
        a: "Tu peux ajuster ton plan à tout moment. Les minutes supplémentaires sont facturées à un tarif simple par minute, et tu es toujours averti avant d’atteindre la limite pour éviter les surprises.",
      },
      {
        q: "Est-ce que l’IA peut gérer plusieurs appels en même temps ?",
        a: "Oui. L’IA peut gérer plusieurs appels simultanément sans attente, pour que chaque appelant soit répondu instantanément, même aux heures de pointe.",
      },
      {
        q: "Est-ce que l’IA peut parler plusieurs langues ?",
        a: "Oui. L’IA peut parler plusieurs langues et s’adapter automatiquement à la langue préférée du client.",
      },
      {
        q: "Puis-je personnaliser les réponses de l’IA ?",
        a: "Oui. Tu contrôles totalement la façon dont l’IA interagit : salutations, questions de qualification, heures d’ouverture, et ton général. Le système s’améliore aussi en continu grâce à ton feedback.",
      },
    ],
  },

  finalCta: {
    title: 'Prêt à automatiser tes opérations ?',
    subtitle:
      "Optimisons ton business, peu importe ton secteur, et libérons du temps pour ce qui compte vraiment.",
    button: 'Commencer',
  },
},

pricingPage: {
  hero: {
    titlePrefix: 'Tarifs',
    titleAccent: 'simples',
    subtitle: 'Choisis le forfait qui correspond à tes besoins.',
    note: 'Les forfaits sont indicatifs — on adapte le scope à ton besoin',
  },

  billing: {
    btn3m: '3 mois',
    btn6m: '6 mois',
    btn1y: '1 an',
    billed3m: 'Engagement minimum sur 3 mois',
    billed6m: 'Engagement minimum sur 6 mois',
    billed1y: 'Engagement minimum sur 1 an',
    badgeNone: 'Aucun rabais',
    badge10: '-10%',
    badge20: '-15%',
    off: 'OFF',
  },

  badges: {
    mostPopular: 'Le plus populaire',
  },

  cards: {
    enterpriseName: 'Entreprise',
    enterprisePriceLabel: 'Contacte-nous pour les détails. On adapte le scope et le prix à ton besoin.',
    whatsIncluded: 'Inclus',
    totalLabel: 'au total',
  },

  plans: {
    starter: {
      name: 'Starter',
      description: 'Parfait pour tester une automatisation IA pour ton business.',
      cta: 'Choisir Starter',
      features: [
        '200 minutes incluses par mois',
        '1,33$ par minute additionnelle',
        'Intégration CRM basique',
        'Notifications email & SMS',
        'Transfert 1 numéro',
        'Frais de setup & onboarding : 400$',
      ],
    },
    pro: {
      name: 'Pro',
      description: 'Pour les équipes en croissance qui veulent scaler.',
      cta: 'Choisir Pro',
      features: [
        '475 minutes incluses par mois',
        '0,99$ par minute additionnelle',
        'Intégration CRM basique',
        'Notifications email & SMS',
        'Transfert 2 numéros',
        'Transcriptions d’appels',
        'Support multilingue',
        'Frais de setup & onboarding : 400$',
      ],
    },
    business: {
      name: 'Business',
      description: 'Volume élevé + intégrations plus avancées.',
      cta: 'Choisir Business',
      features: [
        '1 100 minutes incluses par mois',
        '0,90$ par minute additionnelle',
        'Intégration CRM avancée',
        'Notifications email & SMS',
        'Transfert 3 numéros',
        'Transcriptions d’appels',
        'Support multilingue',
        'Analytics & reporting avancés',
        'Frais de setup & onboarding : 250$',
      ],
    },
    enterprise: {
      description: 'Volume sur mesure, multi-marques, équipe dédiée.',
      cta: 'Nous contacter',
      features: ['Volume & workflow sur mesure', 'Lead créatif dédié', 'Et plus'],
    },
  },

  comparison: {
    titlePrefix: 'Comparaison',
    titleAccent: 'des plans',
    subtitle: "Un aperçu rapide de ce qui change quand tu scale.",
    headers: {
      feature: 'Fonctionnalité',
      starter: 'Starter',
      pro: 'Pro',
      business: 'Business',
      enterprise: 'Entreprise',
    },
    rows: [
      ['Minutes incluses / mois', '200', '475', '1 100', 'Sur mesure'],
      ['Minutes additionnelles', '1,33$ / min', '0,99$ / min', '0,90$ / min', 'Sur mesure'],
      ['Intégration CRM', 'Basique', 'Basique', 'Avancée', 'Sur mesure'],
      ['Notifications email & SMS', '__check__', '__check__', '__check__', '__check__'],
      ['Transferts de numéros', '1 numéro', '2 numéros', '3 numéros', 'Sur mesure'],
      ['Transcriptions d’appels', '__dash__', '__check__', '__check__', '__check__'],
      ['Support multilingue', '__dash__', '__check__', '__check__', '__check__'],
      ['Analytics & reporting', '__dash__', '__dash__', '__check__', 'Sur mesure'],
      ['Frais d’onboarding', '400$', '400$', '250$', 'Sur mesure'],
    ],
  },

  finalCta: {
    title: 'Prêt à commencer ?',
    subtitle:
      'Dis-nous ce dont tu as besoin (plateformes, style, volume). On te proposera le meilleur plan pour ton timing.',
    button: 'Nous contacter',
  },
},

contactPage: {
  hero: {
    titlePrefix: 'Nous',
    titleAccent: 'contacter',
    subtitle:
      "Prêt à transformer ton business avec l’IA ? Parlons de ton projet et voyons comment on peut t’aider.",
  },
  cards: {
    emailTitle: 'Email',
    phoneTitle: 'Téléphone',
    locationTitle: 'Ville',
    locationValue: 'Montréal, QC',
  },
  form: {
    title: 'Envoyer un message',
  },
  call: {
    title: 'Planifier un appel',
    cardTitle: 'Planifier une consultation',
    subtitle:
      "Tu préfères parler directement ? Choisis une option ci-dessous pour planifier un appel avec l’équipe.",
    requestBtn: 'Demander un appel',
    emailBtn: 'Envoyer un email',
    emailSubject: 'Demande d’appel',
  },
  expect: {
    title: 'À quoi t’attendre',
    items: [
      'Réponse sous 24-48h',
      'Appel de consultation gratuit',
      'Proposition de solution sur mesure',
      'Devis sans engagement',
    ],
  },
  prefillMessage: "Je souhaite demander un appel pour discuter de mon projet.",
},

aboutPage: {
  hero: {
    titlePrefix: 'À propos de',
    titleAccent: 'Neotix AI',
    subtitle:
      "Nous sommes une équipe de spécialistes IA, développeurs et stratèges dédiée à transformer les entreprises grâce à l’automatisation intelligente.",
  },

  who: {
    title: 'Qui sommes-nous',
    p1:
      "Fondée par des entrepreneurs qui ont vécu de près les défis de la croissance, Neotix AI est née d’une vision simple : offrir la technologie de l’IA pour tout le monde.",
    p2:
      "On aide les entreprises à automatiser leurs workflows, améliorer l’expérience client et débloquer de nouvelles opportunités de croissance grâce à des solutions IA sur mesure.",
    p3:
      "Des startups aux grandes entreprises, on adapte notre approche à ton contexte et on t’aide à atteindre tes objectifs.",
  },

  why: {
    title: 'Pourquoi nous choisir ?',
    items: [
      'Support complet, de la découverte au déploiement',
      'Solutions sur mesure adaptées à tes besoins',
      'Tarification transparente et délais clairs',
    ],
  },

  values: {
    titlePrefix: 'Nos',
    titleAccent: 'valeurs',
    subtitle: 'Les principes qui guident tout ce qu’on fait',
    items: [
      {
        title: 'Orientés mission',
        description:
          "On croit que l’IA doit simplifier la vie des entreprises, pas la compliquer. Notre mission : rendre l’IA avancée accessible et concrète.",
      },
      {
        title: 'Centrés client',
        description:
          "Ton succès = notre succès. On travaille avec toi pour comprendre tes besoins et livrer des solutions concrètes.",
      },
      {
        title: 'Innovation d’abord',
        description:
          "On reste à la pointe des technologies IA pour t’apporter les solutions les plus efficaces et performantes.",
      },
    ],
  },

  finalCta: {
    title: 'Prêt à transformer ton business ?',
    subtitle:
      "Parlons de ton projet et voyons comment Neotix AI peut t’aider à atteindre tes objectifs grâce à l’automatisation intelligente.",
    button: 'Nous contacter',
  },
},

contactForm: {
  fields: {
    name: 'Nom',
    email: 'Email',
    company: 'Entreprise',
    optional: 'optionnel',
    message: 'Message',
  },
  submit: 'Envoyer le message',
  orEmail: 'Ou écris-nous directement à',
  toastSuccess: 'Merci — on te répond sous 24–48h !',
},


  },
} as const;

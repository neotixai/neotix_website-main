'use client';

import Section from '@/components/shared/Section';
import { motion } from 'framer-motion';

type IntegrationItem = { src: string; label: string };

const row1: IntegrationItem[] = [
  { src: '/integrations/make.svg', label: 'Make' },
  { src: '/integrations/n8n.svg', label: 'n8n' },
  { src: '/integrations/gmail.svg', label: 'Gmail' },
  { src: '/integrations/hubspot.svg', label: 'HubSpot' },
  { src: '/integrations/stripe.svg', label: 'Stripe' },
  { src: '/integrations/twilio.svg', label: 'Twilio' },
  { src: '/integrations/whatsapp.svg', label: 'WhatsApp' },
  { src: '/integrations/telegram.svg', label: 'Telegram' },
  { src: '/integrations/zoom.svg', label: 'Zoom' },
  { src: '/integrations/clickup.svg', label: 'ClickUp' },
  { src: '/integrations/trello.svg', label: 'Trello' },
];

const row2: IntegrationItem[] = [
  { src: '/integrations/cal.svg', label: 'Google Calendar' },
  { src: '/integrations/calendly.svg', label: 'Calendly' },
  { src: '/integrations/Acuity.svg', label: 'Acuity Scheduling' },
  { src: '/integrations/paypal.svg', label: 'PayPal' },
  { src: '/integrations/monday.svg', label: 'monday.com' },
  { src: '/integrations/slack.svg', label: 'Slack' },
  { src: '/integrations/openai.svg', label: 'OpenAI' },
  { src: '/integrations/elevenlabs.png', label: 'ElevenLabs' },
  { src: '/integrations/retell.svg', label: 'Retell' },
];

function ImgIcon({ src, label }: { src: string; label: string }) {
  const keepColor = new Set([
    '/integrations/n8n.svg',
    '/integrations/make.svg',
    '/integrations/gmail.svg',
    '/integrations/hubspot.svg',
    '/integrations/monday.svg',
    '/integrations/paypal.svg',
    '/integrations/slack.svg',
    '/integrations/stripe.svg',
    '/integrations/telegram.svg',
    '/integrations/twilio.svg',
    '/integrations/whatsapp.svg',
    '/integrations/zoom.svg',
  ]);

  const isColor = keepColor.has(src);

  // Ajuste finement l’équilibre visuel (padding interne des SVG)
  const scaleMap: Record<string, string> = {
    '/integrations/telegram.svg': 'scale-[0.62]',
    '/integrations/whatsapp.svg': 'scale-[1.3]',
    '/integrations/slack.svg': 'scale-[0.92]',
    '/integrations/paypal.svg': 'scale-[1.2]',
    '/integrations/monday.svg': 'scale-[1.3]',
    '/integrations/elevenlabs.svg': 'scale-[1.2]',
  };

  const scaleClass = scaleMap[src] ?? 'scale-100';

  return (
    <div className="h-[72px] w-[72px] md:h-[84px] md:w-[84px] lg:h-[96px] lg:w-[96px] flex items-center justify-center">
      <img
        src={src}
        alt={label}
        title={label}
        draggable={false}
        className={[
          'h-full w-full object-contain',
          'opacity-80 hover:opacity-100 transition-all duration-300',
          scaleClass,
          isColor ? '' : 'grayscale hover:grayscale-0 dark:invert dark:brightness-200',
        ].join(' ')}
      />
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: IntegrationItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <div
        className={[
          'flex min-w-max items-center gap-24 md:gap-32 whitespace-nowrap will-change-transform',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]',
        ].join(' ')}
      >

        {doubled.map((it, idx) => (
          <div key={`${it.label}-${idx}`} className="flex items-center justify-center">
            <ImgIcon src={it.src} label={it.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationMarquee() {
  return (
    <Section className="bg-gradient-to-b from-violet-500/5 to-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center mb-10"
      >
        <p className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Integrations that <span className="gradient-text">power</span> your workflows
        </p>
      </motion.div>

      <div className="relative rounded-3xl overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur-xl ring-1 ring-black/15 dark:ring-white/10">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-gray-50 to-transparent dark:from-black z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-gray-50 to-transparent dark:from-black z-10" />

        <div className="space-y-8">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </Section>
  );
}
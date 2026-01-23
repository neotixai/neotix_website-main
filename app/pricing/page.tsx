'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import { Check } from 'lucide-react';

type Billing = '3m' | '6m' | '1y';

const checkIcon = (
  <Check className="w-5 h-5 mx-auto text-green-500 dark:text-[#39FF14] dark:drop-shadow-[0_0_6px_#39FF14]" />
);

const dash = <span className="text-gray-400 dark:text-white/40">—</span>;

const PRICES = {
  starter: 229.99,
  pro: 459.99,
  business: 649.99,
} as const;

const DISCOUNT = {
  '3m': 0, // no discount
  '6m': 0.1, // -10%
  '1y': 0.2 // -20%
} as const;

function getBillingLabel(billing: Billing) {
  if (billing === '3m') return 'Billed every 3 months';
  if (billing === '6m') return 'Billed every 6 months';
  return 'Billed yearly';
}

function getBadge(billing: Billing) {
  if (billing === '3m') return 'No discount';
  if (billing === '6m') return 'Save 10%';
  if (billing === '1y') return 'Save 20%';
  return '';
}

function formatTotal(total: number) {
  return `$${Math.round(total)}`;
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('3m');

  const months = billing === '3m' ? 3 : billing === '6m' ? 6 : 12;
  const discount = DISCOUNT[billing];

  const plans = useMemo(() => {
    const mkPaid = (name: string, monthly: number, description: string, highlighted: boolean, cta: string, features: string[]) => {
      const originalTotal = monthly * months; // ✅ sans discount
      const total = originalTotal * (1 - discount); // ✅ avec discount

      return {
        name,
        monthly,
        originalTotal, // ✅ NEW
        total,         // ✅ promo
        description,
        highlighted,
        cta,
        href: '/contact',
        features
      };
    };

    const paid = [
      mkPaid(
        'Starter',
        PRICES.starter,
        'Perfect to test AI content production for your brand.',
        false,
        'Choose Starter',
        ['200 minutes included per month', '$1.33 per additional minute', 'Basic CRM integration', 'Email & SMS notifications', 'Single phone number transfer', 'One-time setup & onboarding fee: $400']
      ),
      mkPaid(
        'Pro',
        PRICES.pro,
        'For growing teams shipping content every week.',
        false,
        'Choose Pro',
        ['475 minutes included per month', '$0.99 per additional minute', 'Basic CRM integration', 'Email & SMS notifications', 'Double phone number transfer', 'Call transcripts', 'Multi-language support', 'One-time setup & onboarding fee: $400']
      ),
      mkPaid(
        'Business',
        PRICES.business,
        'High-volume content + stronger creative direction.',
        true,
        'Choose Business',
        ['1,100 minutes included per month', '$0.90 per additional minute', 'Advanced CRM integration', 'Email & SMS notifications', 'Triple phone number transfer', 'Call transcripts', 'Multi-language support', 'Advanced analytics & reporting', 'Onboarding included']
      )
    ];

    const enterprise = {
      name: 'Entreprise',
      monthly: null as number | null,
      originalTotal: null as number | null,
      total: null as number | null,
      description: 'Custom volume, multi-brand, dedicated team.',
      highlighted: false,
      cta: 'Contact us',
      href: '/contact',
      features: [
        'Custom asset volume & workflow',
        'Dedicated creative lead',
        'And more'
      ]
    };

    return [...paid, enterprise];
  }, [months, discount]);


  const durationBadge = getBadge(billing);

  return (
    <>
      {/* HERO */}
      <Section className="pt-32 pb-1">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl dark:text-white/60 mb-10 max-w-3xl mx-auto">
            Choose the package that fits your needs.
            <p className="text-sm text-gray-700 dark:text-white/50">
              Packages are indicative — we tailor scopes to your needs
            </p>
          </p>

          {/* BILLING TOGGLE */}
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl glass-card ring-1 ring-black/12 dark:ring-white/10">
            <button
              onClick={() => setBilling('3m')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '3m' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              3 months
            </button>

            <button
              onClick={() => setBilling('6m')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '6m' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              6 months <span className="dark:text-white/50 ml-1">(-10%)</span>
            </button>

            <button
              onClick={() => setBilling('1y')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '1y' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              1 year <span className="dark:text-white/50 ml-1">(-20%)</span>
            </button>
          </div>

          <div className="mt-4 text-sm dark:text-white/50">
            {durationBadge ? `${durationBadge} • ` : ''}
            {getBillingLabel(billing)}
          </div>
        </motion.div>
      </Section>

      {/* PRICING CARDS */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={[
                "glass-card rounded-2xl p-8 relative overflow-visible",
                "flex flex-col h-full transition-all duration-300",

                // ✅ Premium light (sans enlever glass-card)
                "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                "hover:shadow-[0_14px_45px_rgba(0,0,0,0.10)]",
                "ring-1 ring-black/12 hover:ring-black/20",

                // ✅ Dark garde ton style actuel
                "dark:ring-white/10 dark:hover:bg-white/10 dark:hover:ring-white/20",

                // ✅ Highlighted plan
                plan.highlighted
                  ? "ring-2 ring-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.35)]"
                  : "",
              ].join(" ")}
            >
              {/* ✅ MOST POPULAR BADGE */}
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 text-xs font-semibold rounded-full
                                  bg-gradient-to-r from-violet-500 to-blue-500
                                  text-white shadow-lg
                                  border border-black/10 dark:border-white/12">
                    Most Popular
                  </div>
                </div>
              )}

              {/* TOP fixed height */}
              <div className="h-[260px] flex flex-col">
                {/* Title + description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-700 dark:text-white/60 mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* PRICE */}
                <div className="mt-auto">
                  {plan.name === "Entreprise" ? (
                    <>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        —
                      </div>
                      <div className="mt-9 text-sm text-gray-600 dark:text-white/60">
                        Contact us for details. We’ll tailor scope & pricing to your needs.
                      </div>
                    </>
                  ) : (
                    <>
                      {discount > 0 && (
                        <div className="text-gray-400 dark:text-white/40 line-through text-lg font-medium">
                          ${(plan.originalTotal! / months).toFixed(2)}/mo
                        </div>
                      )}

                      <div className="flex items-baseline gap-2 mt-1 whitespace-nowrap">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${(plan.total! / months).toFixed(2)}
                          <span className="text-lg font-medium text-gray-500 dark:text-white/60 ml-1">
                            /mo
                          </span>
                        </div>

                        {billing !== "3m" && (
                          <span className="text-[11px] px-1.5 py-[2px] rounded-full bg-black/5 text-gray-600 dark:bg-white/5 dark:text-white/50 tracking-wide">
                            {Math.round(discount * 100)}% OFF
                          </span>
                        )}
                      </div>

                      <div className="mt-9 text-sm text-gray-600 dark:text-white/60">
                        <div>{formatTotal(plan.total!)} total</div>
                        <div>{getBillingLabel(billing)}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-9">
                <div className="w-full overflow-hidden rounded-full [&>*]:w-full [&>*]:rounded-full [&>*]:py-3 [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                  <GradientButton href={plan.href}>
                    {plan.cta}
                  </GradientButton>
                </div>
              </div>

              {/* FEATURES */}
              <div className="mt-8 flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white/80 mb-3">
                  What’s included
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-700 dark:text-white/70">
                      <Check className=" w-5 h-5 flex-shrink-0 mt-[3px] text-green-500 dark:text-[#39FF14] dark:drop-shadow-[0_0_6px_#39FF14]"/>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Plan <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-xl dark:text-white/60 max-w-3xl mx-auto text-center mb-10">
            A quick look at what changes as you scale.
          </p>

          <div className="glass-card rounded-2xl p-6 overflow-x-auto ring-1 ring-black/12 dark:ring-white/10">
            <table className="min-w-[980px] w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/12 dark:border-white/10">
                  <th className="py-3 pr-4 text-left">Feature</th>
                  <th className="py-3 pr-4 text-center">Starter</th>
                  <th className="py-3 pr-4 text-center">Pro</th>
                  <th className="py-3 pr-4 text-center">Business</th>
                  <th className="py-3 pr-4 text-center">Entreprise</th>
                </tr>
              </thead>

              <tbody className="text-gray-800 dark:text-white/70 divide-y divide-black/12 dark:divide-white/10">
              {[
                ['Included minutes / month', '200', '475', '1,100', 'Custom'],
                ['Additional minutes', '$1.33 / min', '$0.99 / min', '$0.90 / min', 'Custom'],
                ['CRM integration', 'Basic', 'Basic', 'Advanced', 'Custom'],

                ['Email & SMS notifications', checkIcon, checkIcon, checkIcon, checkIcon],

                ['Phone number transfers', '1 number', '2 numbers', '3 numbers', 'Custom'],

                ['Call transcripts', dash, checkIcon, checkIcon, checkIcon],

                ['Multi-language support', dash, checkIcon, checkIcon, checkIcon],

                ['Advanced analytics & reporting', dash, dash, checkIcon, 'Custom'],

                ['Onboarding fee', '$400', '$400', '$0', 'Custom']
              ]
              .map((row) => (
                <tr>
                  <td className="py-4 pr-4 font-semibold text-gray-900 dark:text-white/80">{row[0]}</td>
                  <td className="py-4 pr-4 text-center">{row[1]}</td>
                  <td className="py-4 pr-4 text-center">{row[2]}</td>
                  <td className="py-4 pr-4 text-center">{row[3]}</td>
                  <td className="py-4 pr-4 text-center">{row[4]}</td>
                </tr>
              ))}
            </tbody>
            
            </table>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12 ring-1 ring-black/12 dark:ring-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start?</h2>
          <p className="text-xl dark:text-white/60 mb-8">
            Tell us what you need (platforms, style, volume). We’ll propose the best plan for your timeline.
          </p>
          <GradientButton href="/contact" className="w-1/3">
            Contact us
          </GradientButton>
        </motion.div>
      </Section>
    </>
  );
}

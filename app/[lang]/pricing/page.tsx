'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import GradientButton from '@/components/shared/GradientButton';
import { Check } from 'lucide-react';
import { useT } from '@/hooks/useT';
import FAQAccordion from '@/components/shared/FAQAccordion';


type Billing = '3m' | '6m' | '1y';

const PRICES = {
  starter: 229.99,
  pro: 459.99,
  business: 649.99,
} as const;

const DISCOUNT = {
  '3m': 0,
  '6m': 0.1,
  '1y': 0.15,
} as const;

function formatTotal(total: number) {
  return `$${Math.round(total)}`;
}

export default function PricingPage() {
  const { t } = useT();
  const [billing, setBilling] = useState<Billing>('3m');

  const months = billing === '3m' ? 3 : billing === '6m' ? 6 : 12;
  const discount = DISCOUNT[billing];

  const getBillingLabel = (b: Billing) => {
    if (b === '3m') return t.pricingPage.billing.billed3m;
    if (b === '6m') return t.pricingPage.billing.billed6m;
    return t.pricingPage.billing.billed1y;
  };

  const getBadge = (b: Billing) => {
    if (b === '3m') return t.pricingPage.billing.badgeNone;
    if (b === '6m') return t.pricingPage.billing.badge10;
    return t.pricingPage.billing.badge20;
  };

  const checkIcon = (
    <Check className="w-5 h-5 mx-auto text-green-500 dark:text-[#39FF14] dark:drop-shadow-[0_0_6px_#39FF14]" />
  );
  const dash = <span className="text-gray-400 dark:text-white/40">—</span>;

  const plans = useMemo(() => {
    const mkPaid = (
      name: string,
      monthly: number,
      description: string,
      highlighted: boolean,
      cta: string,
      features: readonly string[]
    ) => {
      const originalTotal = monthly * months;
      const total = originalTotal * (1 - discount);

      return {
        name,
        monthly,
        originalTotal,
        total,
        description,
        highlighted,
        cta,
        href: '/contact',
        features,
      };
    };

    const starter = t.pricingPage.plans.starter;
    const pro = t.pricingPage.plans.pro;
    const business = t.pricingPage.plans.business;

    const paid = [
      mkPaid(starter.name, PRICES.starter, starter.description, false, starter.cta, starter.features),
      mkPaid(pro.name, PRICES.pro, pro.description, false, pro.cta, pro.features),
      mkPaid(business.name, PRICES.business, business.description, true, business.cta, business.features),
    ];


    const enterprise = {
      name: t.pricingPage.cards.enterpriseName,
      monthly: null as number | null,
      originalTotal: null as number | null,
      total: null as number | null,
      description: t.pricingPage.plans.enterprise.description,
      highlighted: false,
      cta: t.pricingPage.plans.enterprise.cta,
      href: '/contact',
      features: t.pricingPage.plans.enterprise.features,
    };

    return [...paid, enterprise];
  }, [months, discount, t]);

  const durationBadge = getBadge(billing);

  return (
    <div className="relative overflow-hidden">
      {/* 
        ✨ DÉGRADÉS PRICING PAGE ✨
        Motif: Spirale élégante - évoque la croissance et l'évolution des plans
      */}
      
      {/* Dégradé Hero - Haut droite, rotation douce */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+15rem)] aspect-[1155/678] w-[40rem] translate-x-1/4 rotate-[25deg] bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 opacity-30 sm:left-[calc(50%+25rem)] sm:w-[75rem]" />
      </div>

      {/* Dégradé Plans - Gauche, rotation inverse pour équilibre */}
      <div className="absolute inset-x-0 top-[35rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-25rem)] aspect-[1155/678] w-[38rem] -translate-x-1/3 rotate-[-35deg] bg-gradient-to-tr from-blue-500 to-violet-500 opacity-20 sm:left-[calc(50%-45rem)] sm:w-[70rem]" />
      </div>

      {/* Dégradé Comparison - Droit, accent subtil */}
      <div className="absolute inset-x-0 top-[135rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[42rem] translate-x-1/5 rotate-[140deg] bg-gradient-to-tl from-violet-500 via-fuchsia-500 to-blue-500 opacity-20 sm:left-[calc(50%+30rem)] sm:w-[78rem]" />
      </div>

      {/* Dégradé Bottom - Centre, rotation circulaire */}
      <div className="absolute inset-x-0 bottom-10 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-8rem)] aspect-[1155/678] w-[36rem] -translate-x-1/6 rotate-[-50deg] bg-gradient-to-br from-blue-500 to-violet-500 opacity-30 sm:left-[calc(50%-20rem)] sm:w-[68rem]" />
      </div>

      {/* HERO */}
      <Section className="pt-32 pb-1 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t.pricingPage.hero.titlePrefix}{' '}
            <span className="gradient-text">{t.pricingPage.hero.titleAccent}</span>
          </h1>

          <div className="text-xl dark:text-white/60 mb-10 max-w-3xl mx-auto">
            <p>{t.pricingPage.hero.subtitle}</p>

            <p className="text-sm text-gray-700 dark:text-white/50 mt-2">
              {t.pricingPage.hero.note}
            </p>
          </div>

          {/* BILLING TOGGLE */}
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl glass-card ring-1 ring-black/12 dark:ring-white/10">
            <button
              onClick={() => setBilling('3m')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '3m' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              {t.pricingPage.billing.btn3m}
            </button>

            <button
              onClick={() => setBilling('6m')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '6m' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              {t.pricingPage.billing.btn6m}{' '}
              <span className="dark:text-white/50 ml-1">(-10%)</span>
            </button>

            <button
              onClick={() => setBilling('1y')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                billing === '1y' ? 'bg-white/15' : 'dark:text-white/70 hover:text-white'
              }`}
            >
              {t.pricingPage.billing.btn1y}{' '}
              <span className="dark:text-white/50 ml-1">(-15%)</span>
            </button>
          </div>

          <div className="mt-4 text-sm dark:text-white/50">
            {durationBadge ? `${durationBadge} • ` : ''}
            {getBillingLabel(billing)}
          </div>
        </motion.div>
      </Section>

      {/* PRICING CARDS */}
      <Section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={[
                'glass-card rounded-2xl p-8 relative overflow-visible',
                'flex flex-col h-full transition-all duration-300',
                'shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
                'hover:shadow-[0_14px_45px_rgba(0,0,0,0.10)]',
                'ring-1 ring-black/12 hover:ring-black/20',
                'dark:ring-white/15 dark:hover:bg-white/10 dark:hover:ring-white/20',
                plan.highlighted ? 'ring-2 ring-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.35)]' : '',
              ].join(' ')}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="px-4 py-1 text-xs font-semibold rounded-full
                                  bg-gradient-to-r from-violet-500 to-blue-500
                                  text-white shadow-lg
                                  border border-black/10 dark:border-white/12"
                  >
                    {t.pricingPage.badges.mostPopular}
                  </div>
                </div>
              )}

              <div className="h-[260px] flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-700 dark:text-white/60 mt-2">{plan.description}</p>
                </div>

                <div className="mt-auto">
                  {plan.name === t.pricingPage.cards.enterpriseName ? (
                    <>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">—</div>
                      <div className="mt-9 text-sm text-gray-600 dark:text-white/60">
                        {t.pricingPage.cards.enterprisePriceLabel}
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

                        {billing !== '3m' && (
                          <span className="text-[11px] px-1.5 py-[2px] rounded-full bg-black/5 text-gray-600 dark:bg-white/5 dark:text-white/50 tracking-wide">
                            {Math.round(discount * 100)}% {t.pricingPage.billing.off}
                          </span>
                        )}
                      </div>

                      <div className="mt-9 text-sm text-gray-600 dark:text-white/60">
                        <div>
                          {formatTotal(plan.total!)} {t.pricingPage.cards.totalLabel}
                        </div>
                        <div>{getBillingLabel(billing)}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-9">
                <div className="w-full overflow-hidden rounded-full [&>*]:w-full [&>*]:rounded-full [&>*]:py-3 [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                  <GradientButton href={plan.href}>{plan.cta}</GradientButton>
                </div>
              </div>

              <div className="mt-8 flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white/80 mb-3">
                  {t.pricingPage.cards.whatsIncluded}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-700 dark:text-white/70">
                      <Check className="w-5 h-5 flex-shrink-0 mt-[3px] text-green-500 dark:text-[#39FF14] dark:drop-shadow-[0_0_6px_#39FF14]" />
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
      <Section className="bg-gradient-to-b from-transparent via-violet-500/5 to-transparent relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {t.pricingPage.comparison.titlePrefix}{' '}
            <span className="gradient-text">{t.pricingPage.comparison.titleAccent}</span>
          </h2>
          <p className="text-xl dark:text-white/60 max-w-3xl mx-auto text-center mb-10">
            {t.pricingPage.comparison.subtitle}
          </p>

          <div className="glass-card rounded-2xl p-6 overflow-x-auto ring-1 ring-black/12 dark:ring-white/10">
            <table className="min-w-[980px] w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/12 dark:border-white/10">
                  <th className="py-3 pr-4 text-left">{t.pricingPage.comparison.headers.feature}</th>
                  <th className="py-3 pr-4 text-center">{t.pricingPage.comparison.headers.starter}</th>
                  <th className="py-3 pr-4 text-center">{t.pricingPage.comparison.headers.pro}</th>
                  <th className="py-3 pr-4 text-center">{t.pricingPage.comparison.headers.business}</th>
                  <th className="py-3 pr-4 text-center">{t.pricingPage.comparison.headers.enterprise}</th>
                </tr>
              </thead>

              <tbody className="text-gray-800 dark:text-white/70 divide-y divide-black/12 dark:divide-white/10">
                {t.pricingPage.comparison.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4 font-semibold text-gray-900 dark:text-white/80">{row[0]}</td>

                    {[row[1], row[2], row[3], row[4]].map((cell, j) => {
                      const v = cell;
                      const rendered =
                        v === '__check__' ? checkIcon : v === '__dash__' ? dash : (v as any);

                      return (
                        <td key={j} className="py-4 pr-4 text-center">
                          {rendered}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            {t.demosPage.faq.titlePrefix}{' '}
            <span className="gradient-text">
              {t.demosPage.faq.titleAccent}
            </span>
          </h2>

          <FAQAccordion
            items={t.demosPage.faq.items.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
          />
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto glass-card rounded-2xl p-12 ring-1 ring-black/12 dark:ring-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.pricingPage.finalCta.title}</h2>
          <p className="text-xl dark:text-white/60 mb-8">{t.pricingPage.finalCta.subtitle}</p>
          <GradientButton href="/contact" className="w-full sm:w-1/3">
            {t.pricingPage.finalCta.button}
          </GradientButton>
        </motion.div>
      </Section>
    </div>
  );
}

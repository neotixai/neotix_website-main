import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsRow from '@/components/shared/StatsRow';
import SolutionsSection from '@/components/home/SolutionsSection';
import ProcessSection from '@/components/home/ProcessSection';
import OfferingsSection from '@/components/home/OfferingsSection';
import TrustSection from '@/components/home/TrustSection';
import ContactSection from '@/components/home/ContactSection';
import Section from '@/components/shared/Section';

export const metadata: Metadata = {
  title: 'Neotix AI - Next-Gen AI Solutions for Business Automation',
  description: 'We build AI assistants, intelligent workflows, and creative AI products that scale your business. From customer support to growth campaigns, we deliver real outcomes.',
};

const stats = [
  { value: '500+', label: 'Automations Deployed' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Smart Support' }
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <Section>
        <StatsRow stats={stats} />
      </Section>

      <SolutionsSection />
      <ProcessSection />
      <OfferingsSection />
      <TrustSection />
      <ContactSection />
    </>
  );
}

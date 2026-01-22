import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Neotix AI - Get Your Free AI Consultation',
  description: 'Ready to transform your business with AI? Contact Neotix AI for a free consultation. We respond within 24-48 hours.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

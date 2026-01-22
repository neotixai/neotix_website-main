import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Neotix AI - AI Specialists Transforming Businesses',
  description: 'Learn about Neotix AI, a team of AI specialists, developers, and strategists dedicated to transforming businesses through intelligent automation.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistants - Custom Chat & Voice Solutions | Neotix AI',
  description: 'Custom chat and voice assistants that handle support, sales, and booking flows with human-like intelligence. Deploy AI assistants in days.',
};

export default function AIAssistantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Neotix AI',
  description: 'Transform your creative vision into stunning visuals with AI-powered design and content generation. Brand visuals, product creatives, and social content.',
};

export default function AIArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

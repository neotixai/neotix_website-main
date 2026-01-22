import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Automation Services - Workflow & CRM Integration | Neotix AI',
  description: 'Connect your tools, eliminate manual work, and scale your operations with intelligent workflow automation. Make/Zapier workflows and CRM integration.',
};

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

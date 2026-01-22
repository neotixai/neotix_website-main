'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="glass-card rounded-lg px-6 border-none"
        >
          <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 dark:text-white/60">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

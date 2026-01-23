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
          className="glass-card rounded-lg px-6 ring-1 ring-black/12 dark:ring-white/10 transition-all duration-300 hover:ring-black/20 dark:hover:ring-white/20"
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

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import GradientButton from './GradientButton';
import { useT } from '@/hooks/useT';

export default function ContactForm() {
  const { t } = useT();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success(t.contactForm.toastSuccess);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {t.contactForm.fields.name}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card ring-1 ring-black/12 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {t.contactForm.fields.email}
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card ring-1 ring-black/12 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {t.contactForm.fields.company}{' '}
          <span className="text-gray-700 dark:text-white/50">
            ({t.contactForm.fields.optional})
          </span>
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card ring-1 ring-black/12 dark:ring-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {t.contactForm.fields.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white resize-none"
        />
      </div>

      <div className="flex justify-center">
        <GradientButton type="submit" className="w-1/2" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : t.contactForm.submit}
        </GradientButton>
      </div>

      <p className="text-center text-sm text-gray-700 dark:text-white/60">
        {t.contactForm.orEmail}{' '}
        <a
          href="mailto:contact@neotix-ai.com"
          className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300"
        >
          contact@neotix-ai.com
        </a>
      </p>
    </form>
  );
}

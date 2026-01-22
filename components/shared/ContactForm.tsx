'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import GradientButton from './GradientButton';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks — we\'ll reply within 24–48h!');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Company <span className="text-gray-700 dark:text-white/50">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Message
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

      <GradientButton type="submit" className="w-full">
        Send Message
      </GradientButton>

      <p className="text-center text-sm text-gray-700 dark:text-white/60">
        Or email us directly at{' '}
        <a href="mailto:hello@neotix.ai" className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300">
          hello@neotix.ai
        </a>
      </p>
    </form>
  );
}

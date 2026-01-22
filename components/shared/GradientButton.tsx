import { ReactNode } from 'react';
import Link from 'next/link';

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
}

export default function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}: GradientButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 rounded-full';

  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50'
    : 'border-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-50 dark:hover:bg-white/5';

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

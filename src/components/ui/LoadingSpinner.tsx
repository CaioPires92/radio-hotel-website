'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'navy' | 'gold' | 'white';
}

const LoadingSpinner = ({ size = 'md', className, color = 'navy' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3 border-[1.5px]',
    md: 'w-4 h-4 border-2',
    lg: 'w-6 h-6 border-2'
  };

  const colorClasses = {
    navy: 'border-navy/30 border-t-navy',
    gold: 'border-gold/30 border-t-gold',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div 
      className={cn(
        'rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Carregando"
    />
  );
};

export default LoadingSpinner;
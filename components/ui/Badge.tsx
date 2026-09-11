import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-mono rounded-full border';
  
  const variants = {
    default: 'bg-surface border-border text-text-muted',
    secondary: 'bg-surface border-border text-text-muted',
    accent: 'bg-accent/10 border-accent/20 text-accent'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

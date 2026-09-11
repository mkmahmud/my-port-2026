import React from 'react';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function Card({ children, interactive = false, className = '' }: CardProps) {
  const baseStyles = 'bg-surface border border-border rounded-lg p-6';
  const interactiveStyles = interactive ? 'cursor-pointer hover:border-border-strong hover:-translate-y-[2px] transition-all duration-300' : '';

  return (
    <div className={`${baseStyles} ${interactiveStyles} ${className}`}>
      {children}
    </div>
  );
}

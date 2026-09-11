import React from 'react';

interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return (
    <div 
      className={`w-full h-px bg-gradient-to-r from-transparent via-border to-transparent ${className}`}
    />
  );
}

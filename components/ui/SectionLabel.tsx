import React from 'react';

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-muted">
        // {number}. {label}
      </span>
      <div className="flex-grow h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}

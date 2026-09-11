'use client';

import React from 'react';

interface StatusBadgeProps {
  text?: string;
  status?: string;
  className?: string;
}

export function StatusBadge({ text = 'Available for work', status, className = '' }: StatusBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
      </span>
      <span className="text-sm text-accent-muted font-mono uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
}

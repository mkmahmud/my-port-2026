'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="text-sm text-text-muted font-mono uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-elevated border border-border text-text rounded-md px-4 py-3 placeholder:text-text-muted/50 focus:outline-none focus:border-accent-muted focus:ring-1 focus:ring-accent-muted transition-all ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-red-400 mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

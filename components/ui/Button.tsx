'use client';

import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  withArrow?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  icon,
  withArrow,
  className = '',
  ...props
}: ButtonProps) {
  // Base styling: pill rounded-full, smooth hover transforms, click scale feedback
  const baseStyles = 
    'group relative inline-flex items-center justify-center font-heading font-bold rounded-full select-none ' +
    'transition-all duration-300 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6991A]/50';
  
  // Specific variants matching the screenshot precisely
  const variants = {
    // Solid honey orange pill with subtle shadow and brightness hover
    primary: 
      'bg-[#F6991A] text-[#181512] hover:bg-[#F2910F] hover:shadow-md hover:-translate-y-0.5 border border-transparent',
    
    // Crisp white pill with high-contrast sharp black border (clearly visible everywhere)
    outline: 
      'bg-white text-[#181512] border-[1.5px] border-[#181512] hover:bg-[#FAF6EE] hover:shadow-md hover:-translate-y-0.5',
    
    // Dark espresso pill
    secondary: 
      'bg-[#181512] text-[#FBF8F2] hover:bg-[#25201B] hover:shadow-md hover:-translate-y-0.5 border border-[#362F27]',
    
    // Elevated dark card pill
    dark: 
      'bg-[#241F1A] text-[#FBF8F2] hover:bg-[#2E2822] hover:shadow-md hover:-translate-y-0.5 border border-[#362F27]',
    
    // Ghost pill
    ghost: 
      'text-[#7A746B] hover:text-[#F6991A] bg-transparent hover:bg-black/5'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs gap-2',
    md: 'px-6 py-2.5 text-sm sm:text-base gap-2.5',
    lg: 'px-8 py-3.5 text-base sm:text-lg gap-3'
  };

  // Arrow circle with slight animated nudge on group hover
  const arrowBadge = withArrow ? (
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-105 shadow-sm flex-shrink-0 ${
      variant === 'primary' 
        ? 'bg-[#181512] text-[#FAF6EE]' 
        : 'bg-[#F6991A] text-[#181512]'
    }`}>
      ➔
    </span>
  ) : null;

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {icon && <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
          <span>{children}</span>
          {arrowBadge}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon && <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
        <span>{children}</span>
        {arrowBadge}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && <span className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
      {arrowBadge}
    </button>
  );
}

/**
 * CapsuleGroup: The exact dual pill container seen in the mockup screenshot.
 * Outer off-white pill casing containing the orange Portfolio button and the sharp outlined Hire Me button.
 */
export function CapsuleGroup({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-1 p-1.5 sm:p-2 rounded-full bg-[#FAF6EE] border border-[#E2D8C7] shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

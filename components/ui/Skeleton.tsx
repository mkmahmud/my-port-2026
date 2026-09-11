import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'title' | 'image' | 'card';
  className?: string;
}

export function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  const baseStyles = 'bg-surface animate-pulse rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    image: 'aspect-video w-full',
    card: 'h-64 w-full'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
}

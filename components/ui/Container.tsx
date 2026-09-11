import React from 'react';

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

export function Container({ children, className = '', as = 'div' }: ContainerProps) {
  const classes = `max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 ${className}`;
  if (as === 'section') return <section className={classes}>{children}</section>;
  if (as === 'article') return <article className={classes}>{children}</article>;
  if (as === 'main') return <main className={classes}>{children}</main>;
  if (as === 'header') return <header className={classes}>{children}</header>;
  if (as === 'footer') return <footer className={classes}>{children}</footer>;
  return <div className={classes}>{children}</div>;
}

'use client';
import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>('');

  // Memoize the string format of sectionIds to prevent unnecessary effect executions
  const idsString = sectionIds.join(',');

  useEffect(() => {
    const ids = idsString.split(',').filter(Boolean);
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [idsString]);

  return activeId;
}

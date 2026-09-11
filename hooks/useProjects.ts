'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/lib/types';

export interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(category?: string): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL('/api/projects', window.location.origin);
        if (category) {
          url.searchParams.set('category', category);
        }

        const response = await fetch(url.toString(), { signal });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        
        const data = await response.json();
        // Assume API returns either array of projects directly or inside a projects field
        setProjects(data.projects || data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return controller;
  }, [category]);

  useEffect(() => {
    const controller = fetchProjects();
    return () => {
      controller.abort();
    };
  }, [fetchProjects]);

  return { projects, isLoading, error, refetch: fetchProjects };
}

'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';
import { getTheme, saveTheme } from '@/lib/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadTheme = async () => {
    try {
      const loadedTheme = await getTheme();
      setThemeState(loadedTheme);
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    try {
      await saveTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return { theme, toggleTheme, isLoading };
}


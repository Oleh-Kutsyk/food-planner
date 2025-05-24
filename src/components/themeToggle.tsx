'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='p-1 pl-2 pr-2 rounded-2xl text-sm bg-main shadow dark:text-white hover:bg-gray-400'
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

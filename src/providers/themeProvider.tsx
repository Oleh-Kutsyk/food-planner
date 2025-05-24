'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider as Provider } from 'next-themes';

export const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <Provider attribute='class'>{children}</Provider>;
};

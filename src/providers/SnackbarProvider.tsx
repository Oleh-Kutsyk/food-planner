'use client';

import { SnackbarProvider as Provider } from 'notistack';
import React from 'react';

export const SnackbarProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider>{children}</Provider>;
};

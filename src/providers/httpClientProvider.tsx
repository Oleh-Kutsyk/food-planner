'use client';

import React, { useEffect } from 'react';
import { httpClientConfig } from '@/services/api';
import { localStorageService } from '@/services/localStorage';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import { enqueueSnackbar } from 'notistack';

export const HttpClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    httpClientConfig.initialize({
      getAccessToken: () =>
        localStorageService.get(LOCAL_STORAGE_KEYS.tokens.access),
      getTokenType: () => 'Bearer',
      refreshToken: () => {},
      createNotification: (message, variant) => {
        enqueueSnackbar({
          message,
          variant,
          autoHideDuration: 3000,
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
        });
      },
      logout: () => {},
    });
  }, []);

  return <>{children}</>;
};

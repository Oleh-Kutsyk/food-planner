'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore as useStoreZustand } from 'zustand';

import { AppState, createAppStore } from '@/stores';

export type StoreApi = ReturnType<typeof createAppStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAppStore({ isAuth: true });
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T,>(selector: (store: AppState) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('storeContext must be used within StoreProvider');
  }

  return useStoreZustand(storeContext, selector);
};

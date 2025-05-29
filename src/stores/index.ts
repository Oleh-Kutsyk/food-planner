import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

import { type AuthSlice, createAuthSlice } from './authSlice';
import { type UserSlice, createUserSlice } from './userSlice';

export type AppState = AuthSlice & UserSlice;

export const createAppStore = (preloadedState?: Partial<AppState>) =>
  createStore<AppState>()(
    persist(
      (...args) => ({
        ...createAuthSlice(preloadedState)(...args),
        ...createUserSlice(preloadedState)(...args),
      }),
      {
        name: 'app-storage', // Key in localStorage
        partialize: state => state, // customize persisted shape
      }
    )
  );

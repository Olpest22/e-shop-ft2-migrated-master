'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { createUsernameStore, UsernameStore } from '../store/usernameStore';
import { useStore } from 'zustand';

export type UsernameStoreApi = ReturnType<typeof createUsernameStore>;
export const UsernameStoreContext = createContext<UsernameStoreApi | undefined>(undefined);

export interface UsernameStoreProviderProps {
  children: ReactNode;
}

export const UsernameStoreProvider = ({ children }: UsernameStoreProviderProps) => {
  const storeRef = useRef<UsernameStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createUsernameStore();
  }
  return <UsernameStoreContext.Provider value={storeRef.current}>{children}</UsernameStoreContext.Provider>;
};

export const useUsernameStore = <T,>(selector: (store: UsernameStore) => T): T => {
  const context = useContext(UsernameStoreContext);
  if (!context) {
    throw new Error(`useUsernameStore must be used within UsernameStoreProvider`);
  }
  return useStore(context, selector);
};

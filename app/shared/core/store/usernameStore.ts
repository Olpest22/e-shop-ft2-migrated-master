import { createStore } from 'zustand';

export type UsernameState = {
  username: string;
};

export type UsernameActions = {
  setUsername: () => void;
};

export type UsernameStore = UsernameState & UsernameActions;

export const defaultInitState: UsernameState = {
  username: '',
};

export const createUsernameStore = (initState: UsernameState = defaultInitState) => {
  return createStore<UsernameStore>()(set => ({
    ...initState,
    setUsername: () =>
      set(() => ({
        username: 'Ivan123',
      })),
  }));
};

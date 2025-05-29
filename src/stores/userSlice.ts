import { createSlice } from '@/stores/utils/createSlice';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}

type UserActions = {
  setUser: (user: UserState) => void;
};

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
};

export const createUserSlice = (preloadedState?: Partial<UserState>) => {
  return createSlice<UserSlice, UserState, UserActions>(
    initialState,
    preloadedState,
    set => ({ setUser: data => set({ ...data }) })
  );
};

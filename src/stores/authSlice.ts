import { createSlice } from '@/stores/utils/createSlice';

interface AuthState {
  isAuth: boolean;
  isAuthChecked: boolean;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

interface AuthActions {
  setTokens: (
    tokens: Pick<AuthState, 'accessToken' | 'expiresIn' | 'refreshToken'>
  ) => void;
  setIsAuth: (isAuth: boolean) => void;
  setIsAuthChecked: (isAuthChecked: boolean) => void;
}

export type AuthSlice = AuthState & AuthActions;

const initialState: AuthState = {
  isAuth: false,
  isAuthChecked: false,
  accessToken: '',
  expiresIn: 0,
  refreshToken: '',
  tokenType: 'Bearer',
};

export const createAuthSlice = (preloadedState?: Partial<AuthState>) => {
  return createSlice<AuthSlice, AuthState, AuthActions>(
    initialState,
    preloadedState,
    _set => ({
      setIsAuth: value => _set({ isAuth: value }),
      setIsAuthChecked: value => _set({ isAuth: value }),
      setTokens: tokens => _set({ ...tokens }),
    })
  );
};

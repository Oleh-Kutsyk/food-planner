import { StateCreator } from 'zustand/index';

type ActionsCb<TActions, TSlice> = (
  set: Parameters<StateCreator<TSlice, [], [], TSlice>>[0]
) => TActions;

export const createSlice =
  <TSlice, TState, TActions>(
    defaultState: TState,
    preloadedState?: Partial<TState>,
    actions?: ActionsCb<TActions, TSlice>
  ): StateCreator<TSlice, [], [], TSlice> =>
  (_set, _get, _store) => {
    const store = {} as unknown as TState;

    for (const key in defaultState) {
      const value = defaultState[key];
      const preloadedValue = preloadedState && preloadedState[key];
      store[key] = preloadedValue || value;
    }

    return { ...store, ...actions?.(_set) } as TSlice;
  };

import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '@features/favorites';

export const setupStore = () => configureStore({
  reducer: {
    favorites: favoritesReducer,
  }
});

export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
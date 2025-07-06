import { configureStore } from '@reduxjs/toolkit';

export const setupStore = () => configureStore({ reducer: {} });

export type RootState = {};
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
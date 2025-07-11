import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavorite, IFavoritesState } from './types';
import { IBookCard } from '@entities/book';
import { getFromLocalStorage, setToLocalStorage } from '@shared/utils/local-storage';
import { localStorageKeys } from '@shared/utils/local-storage/constants';

/** Загружает избранные книги из localStorage */
const loadFavoritesFromStorage = (): IFavorite[] => {
  const stored = getFromLocalStorage<IFavorite[]>(localStorageKeys.FAVORITES, []);

  if (!stored || !Array.isArray(stored)) {
    return [];
  }

  const validFavorites = stored.filter(item =>
    item &&
    typeof item === 'object' &&
    item.book &&
    item.addedAt &&
    typeof item.book.id === 'string'
  );

  if (validFavorites.length !== stored.length) {
    setToLocalStorage(localStorageKeys.FAVORITES, validFavorites);
  }

  return validFavorites;
};

/** Сохраняет избранные книги в localStorage */
const saveFavoritesToStorage = (favorites: IFavorite[]) => {
  setToLocalStorage(localStorageKeys.FAVORITES, favorites);
};

const initialState: IFavoritesState = {
  favorites: loadFavoritesFromStorage(),
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IBookCard>) => {
      const book = action.payload;
      const exists = state.favorites.some(favorite => favorite.book.id === book.id);

      if (!exists) {
        const newFavorite: IFavorite = {
          book,
          addedAt: new Date().toISOString(),
        };
        state.favorites.push(newFavorite);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      state.favorites = state.favorites.filter(
        favorite => favorite.book.id !== bookId
      );
      saveFavoritesToStorage(state.favorites);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 